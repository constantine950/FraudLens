from fastapi import APIRouter, Request
from app.ml.scorer import score_transaction
from app.ml.explainer import explain_transaction
from app.utils.data_loader import load_processed_data
import numpy as np

router = APIRouter()

_X_test = None
_y_test = None


def get_test_data():
    global _X_test, _y_test
    if _X_test is None:
        _, _, _X_test, _y_test = load_processed_data()
    return _X_test, _y_test


@router.post("/analyze")
def analyze(request: Request, transaction: dict):
    model = request.app.state.model
    importance_df = request.app.state.importance_df
    feature_names = request.app.state.feature_names

    score = score_transaction(transaction, model, feature_names)
    explanation = explain_transaction(transaction, model, importance_df)

    return {
        "risk_score": score['risk_score'],
        "fraud_probability": score['fraud_probability'],
        "risk_level": score['risk_level'],
        "explanation": explanation
    }


@router.get("/sample/{label}")
def get_sample(label: str):
    X_test, y_test = get_test_data()
    y = y_test.values.ravel()

    if label == "fraud":
        indices = np.where(y == 1)[0]
    else:
        indices = np.where(y == 0)[0]

    idx = np.random.choice(indices)
    transaction = X_test.iloc[idx].to_dict()

    return {"sample": transaction}
