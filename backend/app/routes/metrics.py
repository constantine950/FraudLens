from fastapi import APIRouter, Request
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from app.utils.data_loader import load_processed_data

router = APIRouter()


@router.get("/metrics")
def metrics(request: Request):
    model = request.app.state.model
    feature_names = request.app.state.feature_names

    _, _, X_test, y_test = load_processed_data()
    X_test = X_test[feature_names]
    y_pred = model.predict(X_test)
    y_true = y_test.values.ravel()

    return {
        "accuracy": round(accuracy_score(y_true, y_pred), 4),
        "precision": round(precision_score(y_true, y_pred), 4),
        "recall": round(recall_score(y_true, y_pred), 4),
        "f1_score": round(f1_score(y_true, y_pred), 4)
    }
