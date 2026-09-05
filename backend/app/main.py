from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app.models.portfolio import Portfolio

from app.routes.portfolio import router as portfolio_router
from app.routes.stock import router as stock_router
from app.routes.analyze import router as analyze_router

# Create database tables
Portfolio.metadata.create_all(bind=engine)

app = FastAPI(
    title="FinPilot AI Backend",
    description="AI Financial Advisor Backend",
    version="1.0.0"
)

# -------------------------------
# CORS
# -------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# Routes
# -------------------------------
app.include_router(portfolio_router)
app.include_router(stock_router)
app.include_router(analyze_router)


@app.get("/")
def home():
    return {
        "status": "running",
        "message": "Welcome to FinPilot AI Backend!"
    }


@app.get("/about")
def about():
    return {
        "project": "FinPilot AI",
        "description": "AI Financial Advisor Backend",
        "team": "Hackathon Team",
        "backend": "FastAPI"
    }