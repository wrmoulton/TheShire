# models.py
from sqlalchemy import Column, Integer, String, Date, Text
from database import Base

class JobApplication(Base):
    __tablename__ = "job_applications"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    company = Column(String)
    date_applied = Column(Date)
    start_date = Column(String, nullable=True)
    type = Column(String) 
    status = Column(String)
    link = Column(String, nullable=True)
