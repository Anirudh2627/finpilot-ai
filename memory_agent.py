from ai.graph.state import AgentState
from ai.schemas.models import TraceStep
from datetime import datetime
import sqlite3

DB_PATH = "memory.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS preferences
        (user_id TEXT PRIMARY KEY, risk_tolerance TEXT, horizon TEXT)
    ''')
    conn.commit()
    conn.close()

def run(state: AgentState) -> AgentState:
    init_db()
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    
    user_id = "demo_user"
    c.execute("SELECT * FROM preferences WHERE user_id=?", (user_id,))
    row = c.fetchone()
    
    trace = TraceStep(
        agent="Memory Agent",
        action="retrieve_preferences",
        reasoning="Checking user history",
        status="success",
        timestamp=datetime.now().isoformat()
    )
    
    if row:
        state["user_risk"] = row[1]
        state["user_horizon"] = row[2]
        trace.reasoning = f"Found: Risk={row[1]}, Horizon={row[2]}"
    else:
        c.execute("INSERT OR REPLACE INTO preferences VALUES (?, ?, ?)", 
                  (user_id, "medium", "long"))
        conn.commit()
        state["user_risk"] = "medium"
        state["user_horizon"] = "long"
        trace.reasoning = "New user. Set defaults."
    
    conn.close()
    state["trace"].append(trace)
    return state