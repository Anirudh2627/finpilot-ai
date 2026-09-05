from ai.graph.state import AgentState
from ai.schemas.models import TraceStep
from datetime import datetime

def run(state: AgentState) -> AgentState:
    trace = TraceStep(
        agent="Planner",
        action="validate_input",
        reasoning=f"Validating request for {state['stock_symbol']}",
        status="success",
        timestamp=datetime.now().isoformat()
    )
    
    if not state["stock_symbol"]:
        trace.status = "error"
        trace.error = "No stock symbol provided"
        state["errors"].append("No stock symbol provided")
    
    state["trace"].append(trace)
    return state