import { useState } from "react";
import TransactionForm from "./components/TransactionForm";

export default function App() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (data: { [key: string]: number }) => {
    setLoading(true);
    console.log("Transaction data:", data);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">FraudLens 🔍</h1>
      <TransactionForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
