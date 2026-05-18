from fastapi import APIRouter, Request
from app.ml.scorer import score_transaction
from app.ml.explainer import explain_transaction

router = APIRouter()


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
