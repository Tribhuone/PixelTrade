const Footer = () => {
  return (
    <>
      <footer className="bg-gray-200 w-full relative bottom-0 p-4 flex flex-col md:flex-row justify-between items-center md:items-start md:pl-10 md:pr-10 flex-wrap gap-4 md:gap-0">
        
        {/* Logo Section */}
        <div className="logo text-center md:text-left md:w-[20%] text-xl sm:text-2xl font-medium flex justify-center md:justify-start items-center gap-2">
          <i className="fa-regular fa-camera"></i>
          <span>PixelTrade</span>
        </div>

        {/* Links + Copyright */}
        <div className="flex flex-col md:w-[70%] lg:w-[60%] text-sm sm:text-base md:text-[1rem] text-center md:text-right gap-2">
          
          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>

          {/* Copyright */}
          <p className="text-xs sm:text-sm md:text-base">
            &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
