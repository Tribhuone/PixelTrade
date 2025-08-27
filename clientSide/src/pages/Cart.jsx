
import "../App.css";
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import EmptyCart from './../components/Cart_onEmpty';
import ProductCart from './../components/Cart_onProduct';
import CartPriceBox from "../components/Cart_PriceBox";
import { useSelector } from 'react-redux';

const Cart = () => {

    const cartItem = useSelector((state) => state.cart);       

    return (
        <>
            <div className="flex flex-col min-h-screen">
                {/* Header/Navbar */}
                <Navbar/>

                {/* Main content (will grow & push footer down) */}
                <main className="flex-grow p-4 w-[100%] ">
                    <h1 className=" m-5 text-4xl font-semibold " >Your Shoping Cart</h1>  

                    {cartItem.cart.length === 0 ? (
                        <EmptyCart/>
                    ) : (
                        <div
                            className="flex flex-col sm:flex-row justify-between items-start gap-4 max-w-[80%] mx-auto"
                        >
                            <ProductCart cartItem={cartItem.cart} />

                            {/* On mobile → stacks column (CartPriceBox first, ProductCart second) */}
                            <CartPriceBox />
                        </div>

                    )}
                </main>

                {/* Footer (always bottom) */}
                <Footer />
            </div>
        </>
    );
}

export default Cart;

