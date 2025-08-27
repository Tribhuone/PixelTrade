
import { useSelector } from 'react-redux';
import axios from "axios";
import {loadStripe} from '@stripe/stripe-js';


const CartPriceBox = () => {
    const cartItems = useSelector( (state) => state.cart);
    const authorize = useSelector( (state) => state.user);
    const cartItem = cartItems.cart;
    
    // Here we calculate total price of cart items using reduce method...
    const totalPrice = cartItem.reduce( (acc , item) => {
        return acc + item.price;
    }, 0);      // Here 0 is initial value of accumulator...

    const handlePayment = async () => {
        const token = authorize.token;
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_LOAD);
        try{
            const data = await axios.post(`${import.meta.env.VITE_ORDER_SERVICE_URL}/api/order/payment-checkout` ,
                cartItem,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,  // send token
                        "Content-Type": "application/json"
                    }
                }
            );

            const session = data;
            const result = await stripe.redirectToCheckout({
                sessionId : session.data.id,
            });

            if(result.error){
                console.log(result.error.message);
            }

        }
        catch(err){
            console.log("Error during checkout" , err);
        }
    }

    return (
        <>
            <div
                className="w-full sm:w-[70%] lg:w-[40%] border border-gray-200 mx-auto p-4 my-5 
                flex flex-col justify-around rounded-lg shadow-md"
            >
                <h2 className="text-lg sm:text-xl font-semibold my-3 sm:my-4 text-center sm:text-left">
                Order Summary
                </h2>
                <hr />

                <div className="flex justify-between items-center text-black my-4">
                    <h3 className="text-base sm:text-lg">Total</h3>
                    <h3 className="font-medium text-base sm:text-lg">
                        {totalPrice.toFixed(2)}
                    </h3>
                </div>

                <button
                    className="w-full p-2 text-sm sm:text-base font-medium text-black 
                        bg-amber-300/90 rounded-lg hover:bg-amber-300/70 cursor-pointer 
                        duration-300 ease-in-out"
                    onClick={handlePayment}
                >
                    Proceed to Checkout
                </button>
            </div>
        </>

    );
}

export default CartPriceBox;
