interface Props {
  riskScore: number;
  fraudProbability: number;
  riskLevel: "HIGH" | "MEDIUM" | "LOW";
}

const colors = {
  HIGH: {
    bg: "bg-red-50",
    border: "border-red-400",
    text: "text-red-600",
    badge: "bg-red-100 text-red-700",
    emoji: "🔴",
  },
  MEDIUM: {
    bg: "bg-yellow-50",
    border: "border-yellow-400",
    text: "text-yellow-600",
    badge: "bg-yellow-100 text-yellow-700",
    emoji: "🟡",
  },
  LOW: {
    bg: "bg-green-50",
    border: "border-green-400",
    text: "text-green-600",
    badge: "bg-green-100 text-green-700",
    emoji: "🟢",
  },
};

export default function RiskScoreCard({
  riskScore,
  fraudProbability,
  riskLevel,
}: Props) {
  const c = colors[riskLevel];

  return (
    <div className={`rounded-2xl shadow border-l-4 p-6 ${c.bg} ${c.border}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Analysis Result</h2>
        <span
          className={`text-sm font-semibold px-3 py-1 rounded-full ${c.badge}`}
        >
          {c.emoji} {riskLevel} RISK
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">Risk Score</p>
          <p className={`text-5xl font-extrabold ${c.text}`}>
            {riskScore}
            <span className="text-xl font-normal text-gray-400">/100</span>
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Fraud Probability</p>
          <p className={`text-5xl font-extrabold ${c.text}`}>
            {fraudProbability}
            <span className="text-xl font-normal text-gray-400">%</span>
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              riskLevel === "HIGH"
                ? "bg-red-500"
                : riskLevel === "MEDIUM"
                  ? "bg-yellow-500"
                  : "bg-green-500"
            }`}
            style={{ width: `${riskScore}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
}
