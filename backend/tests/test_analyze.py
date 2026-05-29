from app.main import app
import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock, patch
import pandas as pd
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


client = TestClient(app)

VALID_TRANSACTION = {
    "V1": -3.0435, "V2": -3.1572, "V3": -1.3971, "V4": 2.3459, "V5": -2.194,
    "V6": -1.8637, "V7": -3.9738, "V8": 0.9458, "V9": -1.1775, "V10": -4.8811,
    "V11": 2.0351, "V12": -4.6864, "V13": 0.4865, "V14": -6.1743, "V15": 0.1912,
    "V16": -3.2128, "V17": -6.5365, "V18": -2.4257, "V19": 0.8483, "V20": 0.4527,
    "V21": 0.7627, "V22": 0.1992, "V23": -0.3674, "V24": 0.1374, "V25": -0.3674,
    "V26": 0.2341, "V27": 0.5731, "V28": 0.2341,
    "Amount_scaled": 3.2, "Time_scaled": -1.4
}


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["message"] == "FraudLens API is running 🚀"


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_analyze_valid_transaction():
    response = client.post("/analyze", json=VALID_TRANSACTION)
    assert response.status_code == 200
    data = response.json()
    assert "risk_score" in data
    assert "fraud_probability" in data
    assert "risk_level" in data
    assert "explanation" in data
    assert data["risk_level"] in ["HIGH", "MEDIUM", "LOW"]
    assert 0 <= data["risk_score"] <= 100


def test_analyze_missing_fields():
    response = client.post("/analyze", json={"V1": 1.0})
    assert response.status_code == 422
    assert "Missing fields" in response.json()["detail"]


def test_analyze_empty_body():
    response = client.post("/analyze", json={})
    assert response.status_code == 422


def test_sample_fraud():
    response = client.get("/sample/fraud")
    assert response.status_code == 200
    data = response.json()
    assert "sample" in data
    assert "V1" in data["sample"]
    assert "Amount_scaled" in data["sample"]


def test_sample_legit():
    response = client.get("/sample/legit")
    assert response.status_code == 200
    data = response.json()
    assert "sample" in data


def test_sample_invalid_label():
    response = client.get("/sample/random")
    assert response.status_code == 400


def test_history():
    response = client.get("/history")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_fraud_sample_gives_high_risk():
    response = client.post("/analyze", json=VALID_TRANSACTION)
    assert response.status_code == 200
    data = response.json()
    assert data["risk_level"] == "HIGH"
    assert data["risk_score"] >= 70
