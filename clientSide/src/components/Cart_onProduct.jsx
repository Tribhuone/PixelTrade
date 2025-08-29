
import { clearCart , removeCart } from '../features/Cart/cartSlice.js';
import { useDispatch } from 'react-redux';
import "../App.css";

const ProductCart = ( { cartItem } ) => {

    const dispatch = useDispatch();         // used to send values to redux reducers as action.payload...
    // here we access the redux-store of cart state to store values on cart...
    const handleClearCart = () => {     // function to clear the cart
        dispatch(clearCart());
    }

    const removeFromCart = (index) => {
        dispatch(removeCart(index));
    }

    return (
        <>
            <div
                className="w-full h-[57dvh] rounded-xl border border-gray-300 p-2 my-5 mx-auto 
                flex flex-col justify-start items-center"
            >
                {/* Cart items container */}
                <div className="grid gap-3 h-[48dvh] w-full overflow-auto">
                    {cartItem.map((item, index) => (
                        <div
                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center 
                                p-3 w-[97%] border border-gray-200 rounded-lg shadow-sm min-h-[6.5rem]"
                            key={index}
                        >
                        {/* Left side: Image + Details */}
                        <div className="flex w-full sm:w-auto">
                            {/* Image */}
                            <div className="w-[6rem] h-[5rem] flex-shrink-0">
                                <img
                                    src={item.path}
                                    alt={item.title}
                                    className="w-full h-full rounded-lg object-cover"
                                />
                            </div>

                                {/* Title + Artist + Price/Delete (on mobile stacked) */}
                                <div className="flex flex-col justify-between w-full ml-3">
                                {/* Top row: Title + Artist */}
                                    <div className="flex flex-col sm:justify-start">
                                        <h3 className="font-semibold text-black text-base sm:text-lg line-clamp-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-700 line-clamp-1">
                                            {item.userName}
                                        </p>
                                    </div>

                                    {/* Bottom row (mobile): Price + Delete */}
                                    <div className="flex justify-between items-center sm:hidden mt-2">
                                        <h3 className="font-semibold text-sm">${item.price}</h3>
                                        <div
                                            className="text-red-500 cursor-pointer hover:scale-110 duration-300 ease-in-out text-lg"
                                            onClick={() => removeFromCart(index)}
                                        >
                                            <i className="fa-regular fa-trash-can"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right side (desktop only) */}
                            <div className="hidden sm:flex justify-end items-center gap-4">
                                <h3 className="font-semibold text-base">${item.price}</h3>
                                <div
                                    className="text-red-500 cursor-pointer hover:scale-110 duration-300 ease-in-out text-lg"
                                    onClick={() => removeFromCart(index)}
                                >
                                    <i className="fa-regular fa-trash-can"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <hr className="w-full my-2" />

                {/* Clear Cart button */}
                <button
                    onClick={handleClearCart}
                    className="px-3 py-2 text-sm sm:text-lg border border-gray-400 rounded-lg 
                    cursor-pointer m-3 hover:bg-green-700 hover:text-white duration-300 ease-in-out 
                    h-[5dvh] w-[12rem] sm:w-[10rem]"
                >
                    Clear my cart!
                </button>
            </div>
        </>
    );
}

export default ProductCart;
