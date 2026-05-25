from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.utils.data_loader import load_processed_data
from app.routes import analyze, explain, metrics
from contextlib import asynccontextmanager
import joblib
import pandas as pd


from app.utils.data_loader import get_feature_names


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.model = joblib.load("models/random_forest_model.pkl")
    app.state.importance_df = pd.read_csv(
        "../data/processed/feature_importance.csv")
    app.state.feature_names = get_feature_names()  # correct order from training
    print("✅ Model and data loaded")
    print("Features:", app.state.feature_names)
    yield

app = FastAPI(
    title="FraudLens API",
    description="Fraud Pattern Explorer",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router)
app.include_router(explain.router)
app.include_router(metrics.router)


@app.get("/")
def root():
    return {"message": "FraudLens API is running 🚀"}


@app.get("/health")
def health():
    return {"status": "ok"}
