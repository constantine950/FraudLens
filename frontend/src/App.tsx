import { useState } from "react";
import TransactionForm from "./components/TransactionForm";
import RiskScoreCard from "./components/RiskScoreCard";

interface Result {
  risk_score: number;
  fraud_probability: number;
  risk_level: "HIGH" | "MEDIUM" | "LOW";
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const handleSubmit = (data: { [key: string]: number }) => {
    setLoading(true);
    console.log("Transaction data:", data);

    // Mock result for now — real API call comes on Day 19
    setTimeout(() => {
      setResult({
        risk_score: 94,
        fraud_probability: 94,
        risk_level: "HIGH",
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">FraudLens 🔍</h1>
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <TransactionForm onSubmit={handleSubmit} loading={loading} />
        {result && (
          <RiskScoreCard
            riskScore={result.risk_score}
            fraudProbability={result.fraud_probability}
            riskLevel={result.risk_level}
          />
        )}
      </div>
    </div>
  );
}
