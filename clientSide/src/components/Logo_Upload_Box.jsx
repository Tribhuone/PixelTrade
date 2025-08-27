
import { useNavigate } from "react-router";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const LogoUploadBox = () => {

    const navigateTo = useNavigate();
    const authentication = useSelector((state) => state.user);
    const isLoggedIn =  authentication.isAuthenticated;

    const handleUploadBtn = () => {
        if(isLoggedIn){
            navigateTo("/upload");
        }
        else if(!isLoggedIn){
            toast.warn("First you have to login");
            navigateTo("/auth/login");
        }
    }

    return (
        <div className="flex justify-between items-center 2xl:w-[22%] xl:w-[25%] md:w-[32%] sm:w-[40%]" >

            <div className="logo xl:text-4xl cursor-pointer lg:text-3xl md:text-3xl max-sm:text-2xl sm:text-2xl " 
                onClick={() => navigateTo("/")}
            >
                <i className="fa-regular fa-camera"></i>
                <span>PixelTrade</span>
            </div>

            <button className="upload-btn xl:text-md cursor-pointer p-2 hover:bg-amber-300/80 inline-block rounded-md 
                lg:text-md  max-sm:hidden sm:inline lg:inline xl:inline 2xl:inline md:text-md duration-300 ease-in-out "
                onClick={handleUploadBtn}
            >
                <i className="fa-solid fa-arrow-up-from-bracket"></i>
                <span className=" max-sm:hidden sm:hidden md:inline lg:inline xl:inline" > Upload </span>
            </button>

        </div>
    );
}

export default LogoUploadBox;
