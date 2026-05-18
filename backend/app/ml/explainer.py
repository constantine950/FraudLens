import pandas as pd
import numpy as np
import shap

_explainer = None


def get_explainer(model):
    global _explainer
    if _explainer is None:
        _explainer = shap.TreeExplainer(model)
    return _explainer


def explain_transaction(transaction: dict, model, importance_df: pd.DataFrame, top_n=5):
    explanation = []
    for _, row in importance_df.head(top_n).iterrows():
        feature = row['feature']
        importance = row['importance']
        value = transaction.get(feature, 0)

        explanation.append({
            'feature': feature,
            'value': round(value, 4),
            'importance': round(importance, 4),
        })
    return explanation


def explain_with_shap(transaction: dict, model, feature_names: list):
    explainer = get_explainer(model)
    df = pd.DataFrame([transaction])[feature_names]
    shap_values = explainer.shap_values(df)
    values = shap_values[:, :, 1][0]

    result = []
    for name, value in zip(feature_names, values):
        result.append({
            'feature': name,
            'shap_value': round(float(value), 4)
        })

    return sorted(result, key=lambda x: abs(x['shap_value']), reverse=True)[:5]


def compute_risk_score(fraud_prob: float) -> float:
    return round(fraud_prob * 100, 2)


def get_risk_level(risk_score: float) -> str:
    if risk_score >= 70:
        return "HIGH"
    elif risk_score >= 40:
        return "MEDIUM"
    else:
        return "LOW"
