# CivilInc ML API Backend

This is the backend service for the CivilInc ML API, providing endpoints for ML model interactions, project management, and complaint handling.

## Features

- ML Model Integration
  - Model prediction endpoints
  - Model health monitoring
  - Caching system for predictions
  - Support for multiple model types

- Project Management
  - CRUD operations for projects
  - Project status tracking
  - File upload support
  - Project categorization

- Complaint Management
  - Complaint submission and tracking
  - Status updates
  - Priority handling
  - Response management

- Security
  - JWT Authentication
  - Role-based access control
  - Secure password handling
  - CORS protection

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your settings
```

4. Install and start Redis:
```bash
# On Windows: Download and install from https://redis.io/download
# On Linux:
sudo apt-get install redis-server
sudo systemctl start redis
```

5. Run the application:
```bash
uvicorn app.main:app --reload
```

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Testing

Run tests with:
```bash
pytest
```

## Project Structure

```
backend/
├── app/
│   ├── api/            # API endpoints
│   ├── core/           # Core functionality
│   ├── models/         # Database models
│   ├── schemas/        # Pydantic schemas
│   └── main.py         # Application entry point
├── tests/              # Test files
├── models/             # ML model files
├── .env.example        # Example environment variables
├── requirements.txt    # Project dependencies
└── README.md          # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 