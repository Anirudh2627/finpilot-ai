from typing import List, Dict
from ai.schemas.models import EvidenceEntry
import re

def verify_explanation(explanation: str, evidence_ledger: List[EvidenceEntry]) -> Dict:
    report = {
        "verified": True,
        "claims_checked": 0,
        "mismatches": []
    }
    
    numbers = re.findall(r'\d+\.?\d*%?', explanation)
    
    for num in numbers:
        report["claims_checked"] += 1
        found = False
        
        for ev in evidence_ledger:
            if isinstance(ev.value, (int, float)):
                if str(round(ev.value, 1)) in num or num.replace('%', '') in str(ev.value):
                    found = True
                    break
        
        if not found:
            report["verified"] = False
            report["mismatches"].append({"claim": num, "issue": "No matching evidence"})
    
    return report