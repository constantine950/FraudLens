from fastapi import APIRouter, Request
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from app.utils.data_loader import load_processed_data
import time

router = APIRouter()

_metrics_cache = None
_cache_timestamp = None
CACHE_TTL = 3600  # 1 hour


@router.get("/metrics")
def metrics(request: Request):
    global _metrics_cache, _cache_timestamp

    # Return cached metrics if still valid
    if _metrics_cache and _cache_timestamp:
        if time.time() - _cache_timestamp < CACHE_TTL:
            return {**_metrics_cache, "cached": True}

    model = request.app.state.model
    feature_names = request.app.state.feature_names

    _, _, X_test, y_test = load_processed_data()
    X_test = X_test[feature_names]
    y_pred = model.predict(X_test)
    y_true = y_test.values.ravel()

    _metrics_cache = {
        "accuracy": round(accuracy_score(y_true, y_pred), 4),
        "precision": round(precision_score(y_true, y_pred), 4),
        "recall": round(recall_score(y_true, y_pred), 4),
        "f1_score": round(f1_score(y_true, y_pred), 4),
        "cached": False
    }
    _cache_timestamp = time.time()

    return _metrics_cache
