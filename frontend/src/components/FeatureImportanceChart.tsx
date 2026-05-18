import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Feature {
  feature: string;
  importance: number;
}

interface Props {
  features: Feature[];
}

const COLORS = [
  "#1d4ed8",
  "#2563eb",
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
  "#bfdbfe",
  "#dbeafe",
];

interface BarShapeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
}

function ColoredBar({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  index = 0,
}: BarShapeProps) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={COLORS[index % COLORS.length]}
      rx={6}
      ry={6}
    />
  );
}

export default function FeatureImportanceChart({ features }: Props) {
  const data = features.map((f) => ({
    feature: f.feature,
    importance: parseFloat((f.importance * 100).toFixed(2)),
  }));

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Feature Importance
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            type="category"
            dataKey="feature"
            tick={{ fontSize: 12 }}
            width={40}
          />
          <Tooltip
            formatter={(value) => [`${value ?? 0}%`, "Importance"]}
            contentStyle={{ borderRadius: "8px", fontSize: "13px" }}
          />
          <Bar dataKey="importance" shape={<ColoredBar />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
