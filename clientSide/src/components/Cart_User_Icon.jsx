
// Cart & User Icon box for Navbar...

import { useNavigate , Link } from "react-router";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import "../App.css";
import UserdropDown from './UserdropDown';

const CartUserBox = () => {

    const navigateTo = useNavigate();
    const cartItems = useSelector( (state) => state.cart);
    const cartItem =  cartItems.cart;
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    if(isHovered){
        setTimeout( () => {
            setIsHovered(false);
        }, 120000);
    }

    const navigateCart = () => {
        <Link to={"/cart"} ></Link>
        navigateTo("/cart");
    }

    return (
        <>
            <div className="flex justify-between items-center  lg:w-[8%]  sm:w-[15%]  max-sm:hidden xl:w-[10%] " >

                <div className="hover:bg-amber-300/80 p-2 cursor-pointer rounded-md duration-300 ease-in-out "
                    onClick={navigateCart} >
                    <button className="shoping-cart xl:text-md cursor-pointer max-sm:text-sm md:text-[1.07rem] " >
                        <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                        { cartItem.length > 0  && (
                            <div className="absolute top-[0.5rem] xl:right-[6.9rem] bg-amber-300 text-green-800/80 inline-block "
                                style={{
                                    borderRadius: '50%',
                                    padding: '2px 6px',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                }}
                            >
                                {cartItem.length}
                            </div>
                        ) }
                </div>

                <div 
                    className="hover:bg-amber-300/80 p-2 cursor-pointer ml-2 rounded-md mr-6 duration-300 ease-in-out " 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleMouseEnter}
                >
                    <button className="user xl:text-md cursor-pointer  max-sm:text-sm  md:text-[1.07rem]" >
                        <i className="fa-regular fa-user"></i>
                    </button>
                    {isHovered && <UserdropDown/>}
                </div>
            </div>

        </>
    );
}

export default CartUserBox;
