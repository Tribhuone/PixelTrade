
import { useNavigate } from 'react-router';

const EmptyCart = () => {

    const navigateTo = useNavigate();
    const handleBrowsing = () => {      // navigate user to home page...
        navigateTo("/");
    }

    return (
        <div className="w-[90%] rounded-xl h-[59.8dvh] border-1 border-gray-200 p-15 my-5 mx-auto flex justify-evenly items-center
            flex-col " >
            <i className="fa-solid fa-cart-plus text-7xl "></i>

            <p className="text-xl font-semibold my-1 text-black cart-Tag" >Your cart is empty.</p>
            <p>Looks like you havn't added any photos yet.</p>

            <button className='bg-green-800/90 text-md cursor-pointer text-white hover:bg-green-800/70 my-2 px-3 rounded-lg 
                font-semibold py-1' onClick={handleBrowsing} > 
                Start Browsing 
            </button>
        </div>
    );
}

export default EmptyCart;
