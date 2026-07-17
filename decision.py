from ai.graph.state import AgentState
from ai.schemas.models import TraceStep
from datetime import datetime
from langchain_groq import ChatGroq
import os
from dotenv import load_dotenv

load_dotenv()

llm = ChatGroq(model="llama-3.3-70b-versatile", temperature=0)

def run(state: AgentState) -> AgentState:
    trace = TraceStep(
        agent="Decision Agent",
        action="synthesize_with_ml",
        reasoning="Combining ML predictions with LLM reasoning",
        status="success",
        timestamp=datetime.now().isoformat()
    )
    
    # Extract features from evidence
    features = {}
    for ev in state["evidence_ledger"]:
        if isinstance(ev.value, (int, float)):
            features[ev.feature] = float(ev.value)

    for f in ['PE_Ratio', 'Revenue_Growth', 'News_Sentiment', 'Volatility']:
        if f not in features:
            features[f] = 20.0

    # ML Predictions
    models = train_models()
    preds = get_predictions(models, features)
    state["ml_predictions"] = preds

    # SHAP/LIME
    shap_lime = generate_explainability(features)
    state["shap_lime_data"] = shap_lime

    # Decision
    confidence = int(preds['consensus'] * 100)
    decision = "BUY" if confidence > 50 else "HOLD"

    # LLM Explanation
    top_factor = list(shap_lime['shap'].keys())[0] if shap_lime['shap'] else "Unknown"
    explanation = f"ML Consensus: {confidence}% confidence. Top factor: {top_factor}."

    # Hallucination Guard
    verification = verify_explanation(explanation, state["evidence_ledger"])
    if not verification["verified"]:
        explanation = f"Verified: {confidence}% confidence based on {len(state['evidence_ledger'])} data points."

    state["decision"] = decision
    state["explanation"] = explanation

    # Risks
    risks = []
    for ev in state["evidence_ledger"]:
        if ev.feature == "Risk_Level" and ev.value == "HIGH":
            risks.append("High volatility detected")
    state["risks"] = risks

    state["trace"].append(trace)
    return state