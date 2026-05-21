import { type HistoryEntry } from "../hooks/useHistory";

interface Props {
  history: HistoryEntry[];
  onClear: () => void;
}

const badges = {
  HIGH: "bg-red-100 text-red-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  LOW: "bg-green-100 text-green-700",
};

const emojis = {
  HIGH: "🔴",
  MEDIUM: "🟡",
  LOW: "🟢",
};

export default function HistoryTable({ history, onClear }: Props) {
  if (history.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 text-center text-gray-400 text-sm">
        No analyses yet. Submit a transaction to get started.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Previous Analyses</h2>
        <button
          onClick={onClear}
          className="text-xs text-red-500 hover:underline"
        >
          Clear history
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-2">Time</th>
              <th className="pb-2">Risk Score</th>
              <th className="pb-2">Fraud Probability</th>
              <th className="pb-2">Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr
                key={entry.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="py-3 text-gray-500">{entry.timestamp}</td>
                <td className="py-3 font-semibold text-gray-800">
                  {entry.risk_score}/100
                </td>
                <td className="py-3 text-gray-700">
                  {entry.fraud_probability}%
                </td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${badges[entry.risk_level]}`}
                  >
                    {emojis[entry.risk_level]} {entry.risk_level}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
