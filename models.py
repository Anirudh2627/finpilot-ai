from pydantic import BaseModel, ConfigDict
from typing import List, Dict, Optional, Literal, Any

class EvidenceEntry(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    id: str
    agent: str
    feature: str
    value: Any
    source: str
    confidence: float
    timestamp: str = ""

class TraceStep(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    agent: str
    action: str
    reasoning: str
    status: Literal["success", "error", "skipped"]
    timestamp: str
    error: Optional[str] = None

class ModelPrediction(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    model_name: str
    action: Literal["BUY", "HOLD", "SELL"]
    confidence: float
    shap_values: Optional[Dict] = None

class FinalResponse(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    decision: str
    confidence: int
    summary: str
    evidence_ledger: List[EvidenceEntry]
    trace: List[TraceStep]
    ml_predictions: Optional[Dict] = None
    shap_lime_data: Optional[Dict] = None
    risks: List[str] = []
    execution_time: float