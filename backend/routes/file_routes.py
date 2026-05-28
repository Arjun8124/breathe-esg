from typing import Annotated

import pandas as pd
from fastapi import APIRouter, HTTPException, UploadFile, File, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import NormalizedRecord, RawData
from services.SAP_service import normalize_sap
from services.Travel_service import normalize_travel
from services.Utility_Service import normalize_utility

router = APIRouter(
    prefix="/records",
    tags=["Record Routes"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@router.post("/upload/{source_type}")
def upload_files(
        db: db_dependency,
        source_type: str,
        file: UploadFile = File(...),
):
    data = pd.read_csv(file.file)

    for _, row in data.iterrows():
        try:
            rawdata = row.to_dict()
            raw = RawData(
                source_type=source_type.upper(),
                raw_data=rawdata
            )
            if source_type.lower() == "sap":
                record = normalize_sap(row)
            elif source_type.lower() == "utility":
                record = normalize_utility(row)
            elif source_type.lower() == "travel":
                record = normalize_travel(row)
            else:
                raise HTTPException(
                    status_code=400,
                    detail="Invalid source type",
                )
            db.add(record)
            db.add(raw)
            db.commit()
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=400,
                detail=str(e),
            )

    return {"message": f"{source_type} uploaded successfully!"}


@router.get("")
def get_all_records(db: db_dependency):
    return db.query(NormalizedRecord).all()


@router.get("/pending")
def get_pending_records(db: db_dependency):
    return db.query(NormalizedRecord).filter(NormalizedRecord.status == "Pending").all()


@router.get("/suspicious")
def get_suspicious_records(db: db_dependency):
    return db.query(NormalizedRecord).filter(NormalizedRecord.is_suspicious == True).all()


@router.delete("/clear")
def clear_database(db: db_dependency):
    db.query(NormalizedRecord).delete()
    db.query(RawData).delete()

    db.commit()

    return {"message": "Database cleared"}


@router.delete("/{record_id}")
def delete_record(record_id: int, db: db_dependency):
    record = db.query(NormalizedRecord).filter(NormalizedRecord.id == record_id).first()
    if not record:
        raise HTTPException(
            status_code=404,
            detail="Record not found",
        )

    db.delete(record)
    db.commit()


@router.patch("/{record_id}/approve")
def approve_record(record_id: int, db: db_dependency):
    record = db.query(NormalizedRecord).filter(NormalizedRecord.id == record_id).first()
    if not record:
        raise HTTPException(
            status_code=404,
            detail="Record not found",
        )

    record.status = "Approved"
    db.commit()
    return {"message": f"{record_id} approved!"}


@router.patch("/{record_id}/reject")
def reject_record(record_id: int, db: db_dependency):
    record = db.query(NormalizedRecord).filter(NormalizedRecord.id == record_id).first()
    if not record:
        raise HTTPException(
            status_code=404,
            detail="Record not found",
        )
    record.status = "Rejected"
    db.commit()
    return {"message": f"{record_id} rejected!"}
