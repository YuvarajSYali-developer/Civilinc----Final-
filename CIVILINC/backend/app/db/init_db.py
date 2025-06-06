from sqlalchemy.orm import Session
from app.db.session import engine
from app.models import models
from app.core.config import settings
from app.core.logging import Logger

logger = Logger()

def init_db():
    try:
        # Create database tables
        models.Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
        
        # Create initial admin user if not exists
        from app.core.auth import get_password_hash
        from app.models.models import User
        
        with Session(engine) as db:
            admin = db.query(User).filter(User.email == "admin@civilinc.com").first()
            if not admin:
                admin_user = User(
                    email="admin@civilinc.com",
                    hashed_password=get_password_hash("admin123"),  # Change in production
                    is_active=True,
                    is_superuser=True
                )
                db.add(admin_user)
                db.commit()
                logger.info("Initial admin user created")
    except Exception as e:
        logger.error(f"Database initialization failed: {str(e)}")
        raise 