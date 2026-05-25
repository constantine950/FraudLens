import { useState, useEffect, useCallback } from "react";
import { fetchHistory } from "../utils/api";

export interface HistoryEntry {
  id: string;
  timestamp: string;
  risk_score: number;
  fraud_probability: number;
  risk_level: "HIGH" | "MEDIUM" | "LOW";
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const loadHistory = useCallback(async () => {
    try {
      const data = await fetchHistory();
      setHistory(data);
    } catch (error) {
      console.error("Failed to load history", error);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const getHistory = async () => {
      try {
        const data = await fetchHistory();

        if (mounted) {
          setHistory(data);
        }
      } catch (error) {
        console.error("Failed to load history", error);
      }
    };

    getHistory();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    history,
    refresh: loadHistory,
  };
}
