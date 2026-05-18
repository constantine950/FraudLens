import { useState } from "react";

interface TransactionData {
  [key: string]: number;
}

interface Props {
  onSubmit: (data: TransactionData) => void;
  loading: boolean;
}

const V_FEATURES = Array.from({ length: 28 }, (_, i) => `V${i + 1}`);

export default function TransactionForm({ onSubmit, loading }: Props) {
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState("");
  const [vValues, setVValues] = useState<{ [key: string]: string }>({});

  const handleVChange = (key: string, value: string) => {
    setVValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const data: TransactionData = {
      Amount_scaled: parseFloat(amount),
      Time_scaled: parseFloat(time),
    };
    V_FEATURES.forEach((v) => {
      data[v] = parseFloat(vValues[v] || "0");
    });
    onSubmit(data);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Transaction Input
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-gray-600">Amount (scaled)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. -0.34"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Time (scaled)</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 1.23"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {V_FEATURES.map((v) => (
          <div key={v}>
            <label className="text-xs text-gray-500">{v}</label>
            <input
              type="number"
              value={vValues[v] || ""}
              onChange={(e) => handleVChange(v, e.target.value)}
              className="w-full border rounded-lg px-2 py-1 mt-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Transaction"}
      </button>
    </div>
  );
}
