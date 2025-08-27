
import { useNavigate , Link } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from 'react';
import "../App.css";
import UserdropDown from './UserdropDown';

const SidebarContents = () => {

    const [showUserMenu, setShowUserMenu] = useState(false);
    const navigateTo = useNavigate();
    const authentication = useSelector((state) => state.user);
    const cartItems = useSelector( (state) => state.cart);
    const cartItem =  cartItems.cart;
    const isLoggedIn = authentication.isAuthenticated;

    const handleUploadBtn = () => {
        if (isLoggedIn) {
        navigateTo("/upload");
        } else {
        toast.warn("First you have to login");
        navigateTo("/auth/login");
        }
    };

    const navigateCart = () => {
        <Link to={"/cart"} ></Link>
        navigateTo("/cart");
    }

    return (
        <div className="p-4 flex flex-col gap-4">
          {/* Upload Button */}
          <button
            className="upload-btn text-base cursor-pointer p-2 hover:bg-amber-300/80 flex 
                items-center gap-2 duration-300 ease-in-out border-b"
            onClick={handleUploadBtn}
          >
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
            <span>Upload</span>
          </button>

          {/* Cart Button */}
          <div
            className="hover:bg-amber-300/80 p-2 cursor-pointer border-b flex items-center gap-2 relative"
            onClick={navigateCart}
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Cart</span>
            {cartItem.length > 0 && (
              <span className="absolute right-2 top-1 bg-amber-300 text-green-800/80 rounded-full px-2 text-xs font-bold">
                {cartItem.length}
              </span>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <div
              className="hover:bg-amber-300/80 p-2 cursor-pointer border-b flex items-center gap-2"
              onClick={() => setShowUserMenu((prev) => !prev)}
            >
              <i className="fa-regular fa-user"></i>
              <span>User</span>
            </div>

            {/* Dropdown inside Sidebar */}
            {showUserMenu && (
              <div className="absolute left-0 mt-[-3rem] w-48 bg-white rounded-md shadow-lg z-50">
                <UserdropDown />
              </div>
            )}
          </div>
        </div>
    );
}

export default SidebarContents;
