
import "../App.css";
import axios from "axios";  
import { useParams } from "react-router";
import { useEffect , useState } from 'react';
import { useDispatch , useSelector } from "react-redux";
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import { toast } from 'react-toastify';
import { updateCart } from "../features/Cart/cartSlice.js";

const EachImage = () => {

    const [item , setItem] = useState(null);
    const [loading , setLoading] = useState(false);
    const cartItems = useSelector( (state) => state.cart);      // get the cart details...
    const dispatch = useDispatch();
    const { id } = useParams();

    // function to get the data from database...
    useEffect( () => {
        const getSingleImgData = async () => {  
            await axios.get(`${import.meta.env.VITE_PRODUCT_SERVICE_URL}/img/:id`)
                .then ( (res) => {
                    setLoading(true);
                    setItem(res.data.photo);
                    console.log(res.data);
                })
                .catch( (er) => {
                    console.log(er.response.data.message);
                })
        }

        getSingleImgData();
        setLoading(false);
    }, [id]);

    if (!item) return <p>Loading...</p>;

    const keyword = item.keywords[0];

    const addToCart = () => {
        const alreadyExists = cartItems.cart.some( cartItem => cartItem._id === item._id);
        
        if(alreadyExists){
            toast("This item is already in your cart!", {
                style: {
                    backgroundColor: "#3a3a3a75",
                    color: "#fff",
                }
            });
        }
        else{
            dispatch(updateCart(item));
            toast("Picture added to cart",{
                style: {
                    backgroundColor: "#3a3a3a75",
                    color: "#ffffffff",
                }
            });
        }
    }

    return (
        <>
            <div className="flex flex-col min-h-screen">
                {/* Header/Navbar */}
                <Navbar/>

                {/* Main content (will grow & push footer down) */}
                <main className="flex-grow p-4 w-full flex flex-col lg:flex-row justify-evenly items-center m-auto min-h-[78dvh] gap-6">
                    {
                        !loading ? (
                            <>
                                {/* Image Section */}
                                <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] h-[35dvh] sm:h-[45dvh] lg:h-fit md:h-fit
                                    p-2 image-box bg-gray-200 rounded-xl"
                                >
                                    <img
                                        src={item.path}
                                        alt={item.title}
                                        className="w-full h-full object-contain photo-card"
                                    />
                                </div>

                                {/* Info Section */}
                                <div className="flex justify-around items-start flex-col w-full sm:w-[90%] md:w-[80%] lg:w-[53%] py-4 sm:py-6 px-2 sm:px-4 h-auto lg:h-[40dvh]">
                                    
                                    {/* Title + Username */}
                                    <div className="flex flex-col items-start gap-1">
                                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                                            {item.title}
                                        </h1>
                                        <h3 className="text-sm text-black sm:text-base md:text-lg m-1">{item.userName}</h3>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-justify bg-white p-2 rounded-md my-2">
                                        {item.description}
                                    </p>

                                    {/* Price + Add to Cart */}
                                    <div className="flex justify-between items-center w-full sm:w-[90%] p-2 sm:p-3">
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                                            <span>₹</span> {item.price}
                                        </h2>

                                        <div
                                            className="px-3 py-2 rounded-md border border-gray-300 add-cart-btn cursor-pointer 
                                                text-sm sm:text-base duration-300 ease-in-out hover:bg-amber-300/80"
                                            onClick={addToCart}
                                        >
                                            <i className="fa-solid fa-cart-shopping"></i>
                                                &nbsp; 
                                                Add to Cart
                                        </div>
                                    </div>

                                    {/* Keywords */}
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {keyword.split(",").map((word, index) => (
                                            <p
                                                key={index}
                                                className="text-xs sm:text-sm md:text-md bg-gray-200/80 rounded-xl px-3 py-1"
                                            >
                                                {word}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )
                    }
                </main>

                {/* Footer (always bottom) */}
                <Footer />
            </div>
        </>
    );
}

export default EachImage;

