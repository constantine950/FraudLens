import joblib
import os
from app.config import MODEL_DIR


def save_model(model, filename="fraud_model.pkl"):
    os.makedirs(MODEL_DIR, exist_ok=True)
    path = os.path.join(MODEL_DIR, filename)
    joblib.dump(model, path)
    print(f"✅ Model saved to {path}")


def load_model(filename="fraud_model.pkl"):
    path = os.path.join(MODEL_DIR, filename)
    if not os.path.exists(path):
        raise FileNotFoundError(f"No model found at {path}")
    return joblib.load(path)
