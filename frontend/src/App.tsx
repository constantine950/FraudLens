import { useState } from "react";
import TransactionForm from "./components/TransactionForm";
import RiskScoreCard from "./components/RiskScoreCard";
import FeatureImportanceChart from "./components/FeatureImportanceChart";

interface Result {
  risk_score: number;
  fraud_probability: number;
  risk_level: "HIGH" | "MEDIUM" | "LOW";
  explanation: { feature: string; importance: number }[];
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const handleSubmit = (data: { [key: string]: number }) => {
    setLoading(true);
    console.log("Transaction data:", data);

    setTimeout(() => {
      setResult({
        risk_score: 94,
        fraud_probability: 94,
        risk_level: "HIGH",
        explanation: [
          { feature: "V14", importance: 0.2219 },
          { feature: "V10", importance: 0.1092 },
          { feature: "V4", importance: 0.1076 },
          { feature: "V17", importance: 0.0828 },
          { feature: "V12", importance: 0.0817 },
          { feature: "V11", importance: 0.0722 },
          { feature: "V3", importance: 0.0706 },
        ],
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
          <>
            <RiskScoreCard
              riskScore={result.risk_score}
              fraudProbability={result.fraud_probability}
              riskLevel={result.risk_level}
            />
            <FeatureImportanceChart features={result.explanation} />
          </>
        )}
      </div>
    </div>
  );
}
