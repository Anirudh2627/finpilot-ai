from fastapi import FastAPI

app = FastAPI(
    title="FinPilot AI Backend",
    description="AI Financial Advisor Backend",
    version="1.0.0"
)

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
        "team": "Hackathon Team",
        "backend": "FastAPI"
    }