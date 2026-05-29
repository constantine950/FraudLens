import { useState } from "react";
import { analyzeTransaction } from "../utils/api";
import axios from "axios";

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
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 422) {
          setError(`Validation error: ${err.response.data.detail}`);
        } else if (err.response?.status === 500) {
          setError("Server error. Please try again.");
        } else if (!err.response) {
          setError("Cannot connect to backend. Is the server running?");
        } else {
          setError("Something went wrong. Please try again.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, analyze };
}
