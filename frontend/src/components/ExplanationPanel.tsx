interface Explanation {
  feature: string;
  value: number;
  importance: number;
}

interface Props {
  explanations: Explanation[];
  riskLevel: "HIGH" | "MEDIUM" | "LOW";
}

const reasons: { [key: string]: string } = {
  V14: "Transaction pattern deviates strongly from normal",
  V10: "Unusual activity pattern detected",
  V4: "Merchant category shows elevated risk",
  V17: "Behavioral signature matches fraud profile",
  V12: "Transaction timing and amount are anomalous",
  V11: "Account activity pattern is suspicious",
  V3: "Transaction sequence is irregular",
  V7: "Spending pattern is abnormal",
  V2: "Account behavior deviates from baseline",
  V16: "Risk indicator threshold exceeded",
};

export default function ExplanationPanel({ explanations, riskLevel }: Props) {
  const borderColor =
    riskLevel === "HIGH"
      ? "border-red-400"
      : riskLevel === "MEDIUM"
        ? "border-yellow-400"
        : "border-green-400";

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Why is this suspicious?
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Top features that contributed to this prediction
      </p>

      <div className="flex flex-col gap-3">
        {explanations.map((exp, idx) => (
          <div
            key={idx}
            className={`border-l-4 ${borderColor} pl-4 py-2 rounded-r-lg bg-gray-50`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-gray-800 text-sm">
                {exp.feature}
              </span>
              <span className="text-xs text-gray-500">
                importance: {(exp.importance * 100).toFixed(1)}%
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {reasons[exp.feature] ?? "Anomalous value detected"}
            </p>
            <p className="text-xs text-gray-400 mt-1">value: {exp.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
