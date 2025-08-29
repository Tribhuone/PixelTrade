// SkeletonCard.jsx
export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white shadow-md rounded-2xl p-4 w-60 h-72 flex flex-col space-y-3">
      <div className="bg-gray-300 h-40 w-full rounded-lg"></div>
      <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
      <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
    </div>
  );
}
