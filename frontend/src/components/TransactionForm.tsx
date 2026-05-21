import { useState } from "react";

interface TransactionData {
  [key: string]: number;
}

interface Props {
  onSubmit: (data: TransactionData) => void;
  loading: boolean;
}

const SAMPLES = {
  fraud: {
    V1: -3.0435,
    V2: -3.1572,
    V3: -1.3971,
    V4: 2.3459,
    V5: -2.194,
    V6: -1.8637,
    V7: -3.9738,
    V8: 0.9458,
    V9: -1.1775,
    V10: -4.8811,
    V11: 2.0351,
    V12: -4.6864,
    V13: 0.4865,
    V14: -6.1743,
    V15: 0.1912,
    V16: -3.2128,
    V17: -6.5365,
    V18: -2.4257,
    V19: 0.8483,
    V20: 0.4527,
    V21: 0.7627,
    V22: 0.1992,
    V23: -0.3674,
    V24: 0.1374,
    V25: -0.3674,
    V26: 0.2341,
    V27: 0.5731,
    V28: 0.2341,
    Amount_scaled: 3.2,
    Time_scaled: -1.4,
  },
  legit: {
    V1: 1.1919,
    V2: 0.2662,
    V3: 0.1665,
    V4: 0.4482,
    V5: 0.06,
    V6: -0.0824,
    V7: -0.0788,
    V8: 0.0851,
    V9: -0.2554,
    V10: -0.1669,
    V11: 1.6127,
    V12: 1.0651,
    V13: 0.4896,
    V14: -0.1432,
    V15: 0.6353,
    V16: 0.4632,
    V17: -0.114,
    V18: -0.1836,
    V19: -0.1458,
    V20: -0.0691,
    V21: -0.2258,
    V22: -0.6387,
    V23: 0.1013,
    V24: -0.3398,
    V25: 0.1672,
    V26: 0.1259,
    V27: -0.009,
    V28: 0.0147,
    Amount_scaled: -0.34,
    Time_scaled: 0.12,
  },
};

const V_FEATURES = Array.from({ length: 28 }, (_, i) => `V${i + 1}`);

export default function TransactionForm({ onSubmit, loading }: Props) {
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState("");
  const [vValues, setVValues] = useState<{ [key: string]: string }>({});

  const handleVChange = (key: string, value: string) => {
    setVValues((prev) => ({ ...prev, [key]: value }));
  };

  const loadSample = (type: "fraud" | "legit") => {
    const sample = SAMPLES[type];
    setAmount(String(sample.Amount_scaled));
    setTime(String(sample.Time_scaled));
    const newV: { [key: string]: string } = {};
    V_FEATURES.forEach((v) => {
      newV[v] = String(sample[v as keyof typeof sample]);
    });
    setVValues(newV);
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
          className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 rounded-lg text-sm border border-red-200 transition"
        >
          🔴 Load Fraud Sample
        </button>
        <button
          onClick={() => loadSample("legit")}
          className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 font-semibold py-2 rounded-lg text-sm border border-green-200 transition"
        >
          🟢 Load Legit Sample
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
