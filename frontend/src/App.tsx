import Navbar from "./components/Navbar";
import TransactionForm from "./components/TransactionForm";
import RiskScoreCard from "./components/RiskScoreCard";
import FeatureImportanceChart from "./components/FeatureImportanceChart";
import ExplanationPanel from "./components/ExplanationPanel";
import HistoryTable from "./components/HistoryTable";
import MetricsBar from "./components/MetricsBar";
import Skeleton from "./components/Skeleton";
import { useAnalyze } from "./hooks/useAnalyze";
import { useHistory } from "./hooks/useHistory";

export default function App() {
  const { result, loading, error, analyze } = useAnalyze();
  const { history, refresh } = useHistory();

  const handleAnalyze = async (data: { [key: string]: number }) => {
    await analyze(data);
    refresh();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6">
        <MetricsBar />

        <TransactionForm onSubmit={handleAnalyze} loading={loading} />

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {loading && <Skeleton />}

        {!loading && result && (
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

        <HistoryTable history={history} onClear={() => {}} />
      </div>
    </div>
  );
}
