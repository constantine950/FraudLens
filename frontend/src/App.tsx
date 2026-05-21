import TransactionForm from "./components/TransactionForm";
import RiskScoreCard from "./components/RiskScoreCard";
import FeatureImportanceChart from "./components/FeatureImportanceChart";
import ExplanationPanel from "./components/ExplanationPanel";
import HistoryTable from "./components/HistoryTable";
import { useAnalyze } from "./hooks/useAnalyze";
import { useHistory } from "./hooks/useHistory";

export default function App() {
  const { result, loading, error, analyze } = useAnalyze();
  const { history, addEntry, clearHistory } = useHistory();

  const handleAnalyze = async (data: { [key: string]: number }) => {
    await analyze(data);
    if (result) addEntry(result);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">FraudLens 🔍</h1>
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <TransactionForm onSubmit={handleAnalyze} loading={loading} />

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {result && (
          <>
            <RiskScoreCard
              riskScore={result.risk_score}
              fraudProbability={result.fraud_probability}
              riskLevel={result.risk_level}
            />
            <FeatureImportanceChart features={result.explanation} />
            <ExplanationPanel
              explanations={result.explanation}
              riskLevel={result.risk_level}
            />
          </>
        )}

        <HistoryTable history={history} onClear={clearHistory} />
      </div>
    </div>
  );
}
