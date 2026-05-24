from typing import Annotated

import pandas as pd
from fastapi import FastAPI, UploadFile, File, Depends
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


@app.post("/upload/sap")
def upload_sap(
        db: db_dependency,
        file: UploadFile = File(...),
):
    data = pd.read_csv(file.file)

    for _, row in data.iterrows():
        record = NormalizedRecord(
            source_type="SAP",
            activity_type=row["Fuel Type"],
            quantity=row["Quantity"],
            unit=row["Unit"],
        )
        db.add(record)

    db.commit()
    return {"message": "Sap Uploaded!"}
