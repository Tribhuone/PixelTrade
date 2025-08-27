import "../App.css";

const Hero = () => {
  return (
    <>
      <div className="flex justify-center items-center hero-section flex-col 
                      h-auto sm:h-[22vh] m-4 text-center px-4 sm:px-6 md:px-10">
        <div className="text-center w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-snug">
            Discover Your Next Masterpiece
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-[1.1rem] mt-2">
            Explore a universe of stunning visuals. High-quality, royalty-free photos from the world's
            most talented photographers, ready for your next project.
          </p>
        </div>
      </div>
    </>
  );
};

export default Hero;
