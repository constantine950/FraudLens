import { useState } from "react";

export interface HistoryEntry {
  id: string;
  timestamp: string;
  risk_score: number;
  fraud_probability: number;
  risk_level: "HIGH" | "MEDIUM" | "LOW";
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const addEntry = (result: {
    risk_score: number;
    fraud_probability: number;
    risk_level: "HIGH" | "MEDIUM" | "LOW";
  }) => {
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toLocaleString(),
      risk_score: result.risk_score,
      fraud_probability: result.fraud_probability,
      risk_level: result.risk_level,
    };
    setHistory((prev) => [entry, ...prev]);
  };

  const clearHistory = () => setHistory([]);

  return { history, addEntry, clearHistory };
}
