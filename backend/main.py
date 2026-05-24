from typing import Annotated

import pandas as pd
from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session

import models
from database import engine, SessionLocal
from models import NormalizedRecord

app = FastAPI()
models.Base.metadata.create_all(engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@app.get("/")
def root():
    return {"message": "Backend is running!"}


@app.post("/upload/{source_type}")
def upload_files(
        db: db_dependency,
        source_type: str,
        file: UploadFile = File(...),
):
    data = pd.read_csv(file.file)

    for _, row in data.iterrows():
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

    db.commit()
    return {"message": f"{source_type} uploaded successfully!"}


def normalize_sap(row):
    sus = row["quantity"] < 0
    return NormalizedRecord(
        source_type="SAP",
        activity_type=row["Fuel Type"],
        quantity=row["Quantity"],
        unit=row["Unit"],
        is_suspicious=sus
    )


def normalize_utility(row):
    sus = row["quantity"] < 0
    return NormalizedRecord(
        source_type="Utility",
        activity_type="Electricity",
        quantity=row["kWh"],
        unit="kWh",
        is_suspicious=sus
    )


def normalize_travel(row):
    sus = row["quantity"] < 0
    return NormalizedRecord(
        source_type="Travel",
        activity_type=row["mode"],
        quantity=1,
        unit="trip",
        is_suspicious=sus
    )
