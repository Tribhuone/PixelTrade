
import "../App.css";
import { useDispatch , useSelector } from 'react-redux';
import { Link , useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { updateCart } from "../features/Cart/cartSlice.js";

const ImageCard = ({ items }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector( (state) => state.cart);

    // Function to disable right click...
    const handleContextMenu = (evt) => {
        evt.preventDefault();
    }

    const handleImagePage = (item , evt) => {
        if(evt.target.tagName === "BUTTON"){
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
        else{
            <Link to={`/img/${item._id}`} />
            navigate(`/img/${item._id}`);
        }
    }

    return (
        <>
            {
                items.map( (item) => (
                    <div
                        key={item._id}
                        onClick={(evt) => handleImagePage(item, evt)}
                        className="2xl:w-[22.6%] xl:w-[22%] max-sm:w-[100%] h-fit m-4 mt-10 img-card border border-gray-300 hover:border-gray-400 
                            flex flex-col justify-between items-center "
                    >
                        {/* Image */}
                        <div className="w-full bg-gray-200 img-box h-[31dvh] rounded-tl-xl rounded-tr-xl overflow-hidden">
                            <img
                                src={item.path}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                id="picture"
                                onContextMenu={handleContextMenu}
                            />
                        </div>


                        {/* Info Section */}
                        <div className="w-full p-3 flex flex-col justify-between h-auto ">
                            <h3 className="title text-lg sm:text-xl font-semibold mb-1.5 text-center sm:text-left">
                                <a href="#">{item.title}</a>
                            </h3>
                            <p className="text-xs sm:text-sm text-black font-sans text-center sm:text-left">
                                {item.userName}
                            </p>

                            {/* Price + Cart Button */}
                            <div className="flex justify-between items-center p-2 mt-2">
                                <p className="text-base sm:text-lg font-semibold">
                                    <span>₹</span>&nbsp;<span>{item.price}</span>
                                </p>

                                {/* Add to Cart button → hidden on mobile */}
                                <button
                                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md 
                                            border border-gray-300 add-cart-btn text-sm font-medium
                                            duration-300 ease-in-out hover:bg-amber-300/80"
                                >
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
}

export default ImageCard;
