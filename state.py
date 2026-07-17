from typing import TypedDict, List, Annotated, Dict, Optional
from langgraph.graph.message import add_messages
from ai.schemas.models import EvidenceEntry, TraceStep
from langchain_core.messages import BaseMessage

class AgentState(TypedDict):
    messages: Annotated[List[BaseMessage], add_messages]
    stock_symbol: str
    user_query: str
    user_risk: Optional[str]
    user_horizon: Optional[str]
    evidence_ledger: List[EvidenceEntry]
    trace: List[TraceStep]
    decision: str
    explanation: str
    ml_predictions: Optional[Dict]
    shap_lime_data: Optional[Dict]
    errors: List[str]