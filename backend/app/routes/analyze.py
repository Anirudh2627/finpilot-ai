from fastapi import APIRouter
from pydantic import BaseModel

from ..agents import run_analysis

router = APIRouter()


class AnalyzeRequest(BaseModel):
    query: str


@router.post("/analyze")
def analyze(request: AnalyzeRequest):
    return run_analysis(request.query)
