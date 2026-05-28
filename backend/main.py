from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import models
from database import engine
from routes.file_routes import router as file_router

app = FastAPI()
models.Base.metadata.create_all(engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://breathe-esg-wheat.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Backend is running!"}


app.include_router(file_router)
