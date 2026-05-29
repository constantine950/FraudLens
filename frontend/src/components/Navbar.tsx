export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🔍</span>
        <span className="text-xl font-bold text-gray-900">FraudLens</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Fraud Pattern Explorer</span>
        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
          ● Live
        </span>
      </div>
    </nav>
  );
}
