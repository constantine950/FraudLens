import { useState } from "react";
import { fetchSample } from "../utils/api";

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
  const [sampleLoading, setSampleLoading] = useState(false);

  const handleVChange = (key: string, value: string) => {
    setVValues((prev) => ({ ...prev, [key]: value }));
  };

  const loadSample = async (type: "fraud" | "legit") => {
    setSampleLoading(true);
    try {
      const sample = await fetchSample(type);
      setAmount(String(sample.Amount_scaled));
      setTime(String(sample.Time_scaled));
      const newV: { [key: string]: string } = {};
      V_FEATURES.forEach((v) => {
        newV[v] = String(sample[v] ?? "0");
      });
      setVValues(newV);
    } catch {
      alert("Failed to load sample. Is the backend running?");
    } finally {
      setSampleLoading(false);
    }
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

      <div className="flex gap-3 mb-4">
        <button
          onClick={() => loadSample("fraud")}
          disabled={sampleLoading}
          className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 rounded-lg text-sm border border-red-200 transition disabled:opacity-50"
        >
          {sampleLoading ? "Loading..." : "🔴 Load Fraud Sample"}
        </button>
        <button
          onClick={() => loadSample("legit")}
          disabled={sampleLoading}
          className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 font-semibold py-2 rounded-lg text-sm border border-green-200 transition disabled:opacity-50"
        >
          {sampleLoading ? "Loading..." : "🟢 Load Legit Sample"}
        </button>
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
