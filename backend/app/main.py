from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.utils.data_loader import load_processed_data

app = FastAPI(
    title="FraudLens API",
    description="Fraud Pattern Explorer — analyze and explain suspicious transactions",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    X_train, y_train, X_test, y_test = load_processed_data()
    print(f"✅ Data loaded — Train: {X_train.shape}, Test: {X_test.shape}")


@app.get("/")
def root():
    return {"message": "FraudLens API is running 🚀"}


@app.get("/health")
def health():
    return {"status": "ok"}
