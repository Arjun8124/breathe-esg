from fastapi import FastAPI

import models
from database import engine
from routes.file_routes import router as file_router

app = FastAPI()
models.Base.metadata.create_all(engine)


@app.get("/")
def root():
    return {"message": "Backend is running!"}


app.include_router(file_router)
