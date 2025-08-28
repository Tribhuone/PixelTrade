
import { useSelector , useDispatch } from "react-redux";
import UploadForm from "./UploadForm";
import UploadBox from './UploadBox';
import "../App.css";
import axios from "axios";
import { toast } from "react-toastify";
import { resetAllValues } from "../features/Form/formSlice.js";

const UploadAll = () => {

    const totalData = useSelector((state) => state.form);
    const authorize = useSelector( (state) => state.user);
    const dispatch = useDispatch();

    // function to send input data to server...
    const handleSubmitAll = async (evt) => {
        evt.preventDefault();

        const token = authorize.token;        // access the token

        // set all data on FormData
        const formData = new FormData();
        formData.append("image", totalData.imgFile);
        formData.append('title', totalData.title);
        formData.append('description', totalData.description);
        formData.append('keywords', totalData.keywords);
        formData.append('price', totalData.price);

        try {
            await axios.post(`${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/product/upload`,
                formData ,
                { headers: {
                    Authorization: `Bearer ${token}`,  // send token
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then( (res) => {
                toast(res.data.message,{
                    style: {
                        backgroundColor: "#3a3a3a75",
                        color: "#ffffffff",
                    }
                });
                dispatch(resetAllValues());
            })
            .catch( (err) => {
                toast(err.response.data.message,{
                    style: {
                        backgroundColor: "#3a3a3a75",
                        color: "#ffffffff",
                    }
                });
            })
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
             <form 
                onSubmit={handleSubmitAll} 
                className="flex flex-col lg:flex-row justify-between items-center w-[80%] max-sm:mb-8 sm:mb-10 md:mb-15 lg:mb-22 mx-auto space-y-6 lg:space-y-0 lg:space-x-6"
            >
                {/* Upload Box - Mobile pe upar, Desktop pe left */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <UploadBox imgPreview={totalData.imgPreview} />
                </div>

                {/* Form + Button - Mobile pe neeche, Desktop pe right */}
                <div className="flex flex-col justify-evenly items-center w-full lg:w-1/2 h-auto lg:h-[71vh] space-y-4 px-2 ">
                    <UploadForm />

                    <button 
                        type="submit" 
                        className="font-semibold text-base sm:text-lg text-black bg-amber-300 
                            w-[95%] sm:w-[80%] md:w-[70%] p-2 sm:p-3 rounded-xl 
                            hover:bg-amber-300/90 hover:text-green-800/80 
                            duration-300 ease-in-out cursor-pointer"
                    >
                        Submit for Review
                    </button>
                </div>
            </form>
        </>
    );
}

export default UploadAll;
