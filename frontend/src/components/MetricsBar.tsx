import { useEffect, useState } from "react";
import { fetchMetrics } from "../utils/api";

interface Metrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
}

export default function MetricsBar() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    fetchMetrics().then(setMetrics).catch(console.error);
  }, []);

  if (!metrics) return null;

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <p className="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wide">
        Model Performance
      </p>
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Accuracy", value: metrics.accuracy },
          { label: "Precision", value: metrics.precision },
          { label: "Recall", value: metrics.recall },
          { label: "F1 Score", value: metrics.f1_score },
        ].map((m) => (
          <div key={m.label} className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {(m.value * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500 mt-1">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
