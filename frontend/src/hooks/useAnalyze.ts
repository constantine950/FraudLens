import { useState } from "react";
import { analyzeTransaction } from "../utils/api";

interface Result {
  risk_score: number;
  fraud_probability: number;
  risk_level: "HIGH" | "MEDIUM" | "LOW";
  explanation: { feature: string; value: number; importance: number }[];
}

export function useAnalyze() {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (transaction: { [key: string]: number }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeTransaction(transaction);
      setResult(data);
    } catch (err) {
      setError(
        "Failed to connect to backend. Is the server running?" +
          (err instanceof Error ? err.message : "Unknown error"),
      );
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, analyze };
}
