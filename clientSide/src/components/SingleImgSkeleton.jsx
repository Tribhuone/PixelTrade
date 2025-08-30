
// components/LoaderSkeleton.js

const LoaderSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-evenly items-center m-auto min-h-[78dvh] gap-6 animate-pulse w-full p-4">
      
      {/* Left: Image skeleton */}
      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] h-[35dvh] sm:h-[45dvh] lg:h-fit bg-gray-300 rounded-xl"></div>

      {/* Right: Info skeleton */}
      <div className="flex flex-col w-full sm:w-[90%] md:w-[80%] lg:w-[53%] py-4 sm:py-6 px-2 sm:px-4 gap-4">
        
        {/* Title + Username */}
        <div className="h-8 sm:h-10 w-2/3 bg-gray-300 rounded-md"></div>
        <div className="h-4 sm:h-5 w-1/3 bg-gray-300 rounded-md"></div>

        {/* Description */}
        <div className="h-16 sm:h-20 w-full bg-gray-300 rounded-md"></div>

        {/* Price + Add to Cart */}
        <div className="flex justify-between items-center w-full sm:w-[90%] gap-4">
          <div className="h-8 w-20 bg-gray-300 rounded-md"></div>
          <div className="h-10 w-32 bg-gray-300 rounded-md"></div>
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="h-6 w-12 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-14 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoaderSkeleton;
