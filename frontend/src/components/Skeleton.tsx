export default function Skeleton() {
  return (
    <div className="flex flex-col gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-2xl shadow p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      ))}
    </div>
  );
}
