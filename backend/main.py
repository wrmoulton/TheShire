# main.py
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from fastapi import HTTPException, Path
import models, schemas, crud
from database import engine, SessionLocal
from datetime import datetime, date
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow frontend to call the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, lock this down
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to The Shire"}

@app.get("/jobs", response_model=list[schemas.JobApplication])
def read_jobs(db: Session = Depends(get_db)):
    return crud.get_jobs(db)

@app.post("/jobs", response_model=schemas.JobApplication)
def create_job(job: schemas.JobApplicationCreate, db: Session = Depends(get_db)):
    return crud.create_job(db, job)

@app.patch("/jobs/{job_id}", response_model=schemas.JobApplication)
def update_job_status(job_id: int, job_update: dict, db: Session = Depends(get_db)):
    db_job = db.query(models.JobApplication).filter(models.JobApplication.id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Job not found")

    # Convert date strings to date objects if present
    if "date_applied" in job_update and isinstance(job_update["date_applied"], str):
        job_update["date_applied"] = datetime.strptime(job_update["date_applied"], "%Y-%m-%d").date()

    for key, value in job_update.items():
        setattr(db_job, key, value)

    db.commit()
    db.refresh(db_job)
    return db_job

@app.delete("/jobs/{job_id}", status_code=204)
def delete_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(models.JobApplication).filter(models.JobApplication.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    db.delete(job)
    db.commit()
