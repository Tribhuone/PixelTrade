// SkeletonCard.jsx
export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white shadow-md rounded-2xl p-4 h-80 flex flex-col space-y-3 2xl:w-[22.6%] xl:w-[22%] max-sm:w-[100%] m-4 mt-10">
      <div className="bg-gray-300 h-40 w-full rounded-lg"></div>
      <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
      <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
    </div>
  );
}
