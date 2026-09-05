from ai.graph.state import AgentState
from ai.schemas.models import TraceStep, EvidenceEntry
from datetime import datetime
import random

def run(state: AgentState) -> AgentState:
    symbol = state["stock_symbol"]
    
    # Mock Risk Metrics
    volatility = round(random.uniform(15, 40), 2)
    beta = round(random.uniform(0.8, 1.5), 2)
    
    # Determine Risk Level
    if volatility > 30:
        risk_level = "HIGH"
        suitability = "Aggressive investors only"
    elif volatility > 20:
        risk_level = "MEDIUM"
        suitability = "Balanced portfolios"
    else:
        risk_level = "LOW"
        suitability = "Conservative investors"
    
    trace = TraceStep(
        agent="Risk Agent",
        action="assess_volatility",
        reasoning=f"{symbol} has {volatility}% volatility ({risk_level} risk). {suitability}",
        status="success",
        timestamp=datetime.now().isoformat()
    )
    
    # Add to Evidence Ledger
    evidence = EvidenceEntry(
        id=f"EV-RISK-{datetime.now().timestamp()}",
        agent="Risk Agent",
        feature="Risk_Level",
        value=risk_level,
        source="Volatility Analysis",
        confidence=0.90,
        timestamp=datetime.now().isoformat()
    )
    state["evidence_ledger"].append(evidence)
    state["trace"].append(trace)
    return state