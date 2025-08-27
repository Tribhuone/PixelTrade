import { useState } from "react";
import LogoUploadBox from "./Logo_Upload_Box";
import CartUserBox from "./Cart_User_Icon";
import SidebarContents from './Sidebar_Contents';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="p-2 flex items-center justify-between w-full nav-bar sticky top-0 h-[8vh] bg-white shadow-md z-50">
        {/* Left (Logo + Upload button for desktop/tablet) */}
        <LogoUploadBox />

        {/* Right (Cart + User for desktop/tablet) */}
        <div className="hidden sm:flex items-center gap-4">
          <CartUserBox />
        </div>

        {/* Hamburger (mobile only) */}
        <div
          className="menu-bar p-2 cursor-pointer rounded-md mr-3 hover:bg-amber-300/80 sm:hidden"
          onClick={() => setIsOpen(true)}
        >
          <i className="fa-solid fa-bars"></i>
        </div>
      </nav>

      {/* Sidebar (Mobile) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">Menu</h2>
          <button
            className="p-2 rounded-md hover:bg-amber-300/80"
            onClick={() => setIsOpen(false)}
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* Sidebar Content */}
        <SidebarContents/>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
