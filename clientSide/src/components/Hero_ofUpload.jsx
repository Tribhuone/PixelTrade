
const UploadHero = () => {
    return (
        <div className="flex justify-center items-center hero-section flex-col 
                        h-auto sm:h-[22vh] m-4 text-center px-3 sm:px-6">
            
            <div className="text-center w-[95%] sm:w-[80%] md:w-[65%] lg:w-[50%]">
                
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
                    Share Your Vision
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base md:text-lg lg:text-[1.1rem] mt-2">
                    Upload your photo and fill out the details to list it on the marketplace.
                </p>
            </div>
        </div>
    );
};

export default UploadHero;
