import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:8000/api/v1"

def test_endpoints():
    # Test 1: Get all projects
    print("\n1. Testing GET /projects/")
    response = requests.get(f"{BASE_URL}/projects/")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

    # Test 2: Get all services
    print("\n2. Testing GET /services/")
    response = requests.get(f"{BASE_URL}/services/")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

    # Test 3: Get all events
    print("\n3. Testing GET /events/")
    response = requests.get(f"{BASE_URL}/events/")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

    # Test 4: Create a new project
    print("\n4. Testing POST /projects/")
    new_project = {
        "title": "Test Project",
        "description": "This is a test project",
        "location": "Shivamogga Test Location",
        "budget": 1000000.00,
        "status": "planned",
        "start_date": datetime.now().isoformat(),
        "end_date": datetime.now().isoformat()
    }
    response = requests.post(f"{BASE_URL}/projects/", json=new_project)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

if __name__ == "__main__":
    test_endpoints() 