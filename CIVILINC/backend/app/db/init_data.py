from datetime import datetime, timedelta
from app.db.session import SessionLocal
from app.models.models import Project, Complaint, CityService, LocalEvent, ProjectStatus, ComplaintStatus

def init_db():
    db = SessionLocal()
    
    # Create sample projects
    projects = [
        Project(
            title="Shivamogga Smart City Development",
            description="Development of smart city infrastructure including IoT sensors and digital services",
            location="Shivamogga City Center",
            budget=50000000.00,
            status=ProjectStatus.IN_PROGRESS,
            start_date=datetime.now(),
            end_date=datetime.now() + timedelta(days=365)
        ),
        Project(
            title="Road Widening Project",
            description="Widening of main roads in Shivamogga for better traffic management",
            location="Main Market Road",
            budget=20000000.00,
            status=ProjectStatus.PLANNED,
            start_date=datetime.now() + timedelta(days=30),
            end_date=datetime.now() + timedelta(days=180)
        )
    ]
    
    # Create sample complaints
    complaints = [
        Complaint(
            title="Street Light Not Working",
            description="Street light at Main Road junction has been not working for 3 days",
            location="Main Road Junction",
            status=ComplaintStatus.PENDING,
            project_id=1
        ),
        Complaint(
            title="Garbage Collection Issue",
            description="Garbage not being collected regularly in Ward 5",
            location="Ward 5, Shivamogga",
            status=ComplaintStatus.IN_PROGRESS,
            project_id=2
        )
    ]
    
    # Create sample city services
    services = [
        CityService(
            name="Municipal Corporation Office",
            description="Main administrative office for city services",
            department="Administration",
            contact_number="08182-123456",
            email="info@shivamogga.gov.in",
            location="City Center, Shivamogga"
        ),
        CityService(
            name="Public Works Department",
            description="Handles all public infrastructure projects",
            department="Infrastructure",
            contact_number="08182-234567",
            email="pwd@shivamogga.gov.in",
            location="PWD Complex, Shivamogga"
        )
    ]
    
    # Create sample local events
    events = [
        LocalEvent(
            title="Shivamogga Literature Festival",
            description="Annual literature festival featuring local and national authors",
            event_date=datetime.now() + timedelta(days=30),
            location="City Library, Shivamogga",
            organizer="Shivamogga Cultural Society",
            contact_number="08182-345678"
        ),
        LocalEvent(
            title="City Clean-up Drive",
            description="Community initiative for city cleanliness",
            event_date=datetime.now() + timedelta(days=7),
            location="Various locations in Shivamogga",
            organizer="Municipal Corporation",
            contact_number="08182-456789"
        )
    ]
    
    # Add all items to database
    for project in projects:
        db.add(project)
    for complaint in complaints:
        db.add(complaint)
    for service in services:
        db.add(service)
    for event in events:
        db.add(event)
    
    # Commit all changes
    db.commit()
    db.close()

if __name__ == "__main__":
    init_db() 