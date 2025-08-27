
// Payment Success component...
import { useDispatch , useSelector } from 'react-redux';
import { clearCart } from '../features/Cart/cartSlice.js';
import { useEffect } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import Footer from './Footer';

const PaymentSuccess = () => {
    const dispatch = useDispatch();
    const products = useSelector( (state) => state.cart.cart);
    const authorize = useSelector( (state) => state.user);          // we have to send the token to check user authorized or not...

    useEffect( () => {
        const dataStore = async () => {
            const token = authorize.token;
            await axios.post(`${import.meta.env.VITE_ORDER_SERVICE_URL}/api/order/ordered-products` ,
                products , 
                {
                    headers : {
                        Authorization: `Bearer ${token}`,  // send token
                        "Content-Type": "application/json"
                    }
                }
            )
            .then( (res) => {
                console.log(res.data.message);
            })
            .catch( (er) => {
                console.log(er);
            })
        }

        dataStore();
        dispatch(clearCart());
    }, []);

    return (
        <>
            <Navbar/>
            <h1>Your Payment Successfully Completed!</h1>
            <Footer/>
        </>
    );
}

export default PaymentSuccess;
