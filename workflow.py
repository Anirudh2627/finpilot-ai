from langgraph.graph import StateGraph, END
from ai.graph.state import AgentState
from ai.agents import memory_agent, planner, analyst, news, risk, decision

def create_workflow():
    workflow = StateGraph(AgentState)
    
    workflow.add_node("memory", memory_agent.run)
    workflow.add_node("planner", planner.run)
    workflow.add_node("analyst", analyst.run)
    workflow.add_node("news", news.run)
    workflow.add_node("risk", risk.run)
    workflow.add_node("decision", decision.run)
    
    workflow.set_entry_point("memory")
    workflow.add_edge("memory", "planner")
    workflow.add_edge("planner", "analyst")
    workflow.add_edge("analyst", "news")
    workflow.add_edge("news", "risk")
    workflow.add_edge("risk", "decision")
    workflow.add_edge("decision", END)
    
    return workflow.compile()

app = create_workflow()