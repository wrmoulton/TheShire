# crud.py
from sqlalchemy.orm import Session
import models, schemas

def create_job(db: Session, job: schemas.JobApplicationCreate):
    db_job = models.JobApplication(**job.dict())
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job

def get_jobs(db: Session):
    return db.query(models.JobApplication).all()
