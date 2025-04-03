# schemas.py
from pydantic import BaseModel
from datetime import date
from typing import Optional

class JobApplicationBase(BaseModel):
    title: str
    company: str
    date_applied: date
    start_date: str 
    type: str                          
    status: str
    link: Optional[str] = None

class JobApplicationCreate(JobApplicationBase):
    pass

class JobApplication(JobApplicationBase):
    id: int

    class Config:
        orm_mode = True
