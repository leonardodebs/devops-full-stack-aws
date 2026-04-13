from fastapi.testclient import TestClient
from app.main import app
import pytest

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["message"] == "DevOps Stack Running"

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
    assert "timestamp" in response.json()

def test_get_info():
    response = client.get("/api/info")
    assert response.status_code == 200
    assert "environment" in response.json()
    assert "aws_region" in response.json()
