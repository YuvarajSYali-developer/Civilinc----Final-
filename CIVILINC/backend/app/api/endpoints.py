from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from app.db.session import get_db
from app.models import models
from app.schemas import schemas

router = APIRouter()

# Project endpoints
@router.post("/projects/", response_model=schemas.Project)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    db_project = models.Project(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.get("/projects/", response_model=List[schemas.Project])
def get_projects(
    skip: int = 0,
    limit: int = 100,
    status: Optional[models.ProjectStatus] = None,
    location: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Project)
    if status:
        query = query.filter(models.Project.status == status)
    if location:
        query = query.filter(models.Project.location.ilike(f"%{location}%"))
    return query.offset(skip).limit(limit).all()

@router.get("/projects/{project_id}", response_model=schemas.Project)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.put("/projects/{project_id}", response_model=schemas.Project)
def update_project(project_id: int, project: schemas.ProjectUpdate, db: Session = Depends(get_db)):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    
    update_data = project.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_project, field, value)
    
    db.commit()
    db.refresh(db_project)
    return db_project

@router.delete("/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return {"message": "Project deleted successfully"}

# Complaint endpoints
@router.post("/complaints/", response_model=schemas.Complaint)
def create_complaint(complaint: schemas.ComplaintCreate, db: Session = Depends(get_db)):
    db_complaint = models.Complaint(**complaint.dict())
    db.add(db_complaint)
    db.commit()
    db.refresh(db_complaint)
    return db_complaint

@router.get("/complaints/", response_model=List[schemas.Complaint])
def get_complaints(
    skip: int = 0,
    limit: int = 100,
    status: Optional[models.ComplaintStatus] = None,
    location: Optional[str] = None,
    project_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Complaint)
    if status:
        query = query.filter(models.Complaint.status == status)
    if location:
        query = query.filter(models.Complaint.location.ilike(f"%{location}%"))
    if project_id:
        query = query.filter(models.Complaint.project_id == project_id)
    return query.offset(skip).limit(limit).all()

@router.get("/complaints/{complaint_id}", response_model=schemas.Complaint)
def get_complaint(complaint_id: int, db: Session = Depends(get_db)):
    complaint = db.query(models.Complaint).filter(models.Complaint.id == complaint_id).first()
    if complaint is None:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return complaint

@router.put("/complaints/{complaint_id}", response_model=schemas.Complaint)
def update_complaint(complaint_id: int, complaint: schemas.ComplaintUpdate, db: Session = Depends(get_db)):
    db_complaint = db.query(models.Complaint).filter(models.Complaint.id == complaint_id).first()
    if db_complaint is None:
        raise HTTPException(status_code=404, detail="Complaint not found")
    
    update_data = complaint.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_complaint, field, value)
    
    db.commit()
    db.refresh(db_complaint)
    return db_complaint

# City Service endpoints
@router.get("/services/", response_model=List[schemas.CityService])
def get_services(
    skip: int = 0,
    limit: int = 100,
    department: Optional[str] = None,
    location: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.CityService)
    if department:
        query = query.filter(models.CityService.department.ilike(f"%{department}%"))
    if location:
        query = query.filter(models.CityService.location.ilike(f"%{location}%"))
    return query.offset(skip).limit(limit).all()

# Local Event endpoints
@router.get("/events/", response_model=List[schemas.LocalEvent])
def get_events(
    skip: int = 0,
    limit: int = 100,
    location: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.LocalEvent)
    if location:
        query = query.filter(models.LocalEvent.location.ilike(f"%{location}%"))
    if start_date:
        query = query.filter(models.LocalEvent.event_date >= start_date)
    if end_date:
        query = query.filter(models.LocalEvent.event_date <= end_date)
    return query.offset(skip).limit(limit).all() 