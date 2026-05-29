import joblib
import os
from app.config import MODEL_DIR

_model_cache = None


def save_model(model, filename="fraud_model.pkl"):
    os.makedirs(MODEL_DIR, exist_ok=True)
    path = os.path.join(MODEL_DIR, filename)
    joblib.dump(model, path)
    print(f"✅ Model saved to {path}")


def load_model(filename="random_forest_model.pkl"):
    global _model_cache
    if _model_cache is not None:
        return _model_cache
    path = os.path.join(MODEL_DIR, filename)
    if not os.path.exists(path):
        raise FileNotFoundError(f"No model found at {path}")
    _model_cache = joblib.load(path)
    return _model_cache
