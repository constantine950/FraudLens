import pandas as pd
import numpy as np


def explain_transaction(transaction: dict, model, importance_df: pd.DataFrame, top_n=5):
    feature_names = importance_df['feature'].tolist()
    values = [transaction[f] for f in feature_names[:top_n]]

    explanation = []
    for i, row in importance_df.head(top_n).iterrows():
        feature = row['feature']
        importance = row['importance']
        value = transaction.get(feature, 0)

        explanation.append({
            'feature': feature,
            'value': round(value, 4),
            'importance': round(importance, 4),
        })

    return explanation


def compute_risk_score(fraud_prob: float) -> float:
    return round(fraud_prob * 100, 2)


def get_risk_level(risk_score: float) -> str:
    if risk_score >= 70:
        return "HIGH"
    elif risk_score >= 40:
        return "MEDIUM"
    else:
        return "LOW"
