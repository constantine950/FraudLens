from fastapi import APIRouter, Request
from app.ml.explainer import explain_with_shap

router = APIRouter()


@router.post("/explain")
def explain(request: Request, transaction: dict):
    model = request.app.state.model
    feature_names = request.app.state.feature_names

    shap_explanation = explain_with_shap(transaction, model, feature_names)

    return {
        "shap_explanation": shap_explanation
    }
