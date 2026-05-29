from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.utils.data_loader import get_feature_names
from app.routes import analyze, explain, metrics
from app.database import init_db
from contextlib import asynccontextmanager
import joblib
import pandas as pd
import time


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.model = joblib.load("models/random_forest_model.pkl")
    app.state.importance_df = pd.read_csv(
        "../data/processed/feature_importance.csv")
    app.state.feature_names = get_feature_names()
    init_db()
    print("✅ Model, data and database loaded")
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


@app.middleware("http")
async def log_response_time(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    duration = round((time.time() - start) * 1000, 2)
    print(f"⏱ {request.method} {request.url.path} — {duration}ms")
    return response

app.include_router(analyze.router)
app.include_router(explain.router)
app.include_router(metrics.router)


@app.get("/")
def root():
    return {"message": "FraudLens API is running 🚀"}


@app.get("/health")
def health():
    return {"status": "ok"}
