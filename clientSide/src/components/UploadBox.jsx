
import { useRef } from "react";
import { toast } from "react-toastify";
import "../App.css";
import { useDispatch } from "react-redux";
import { updateImageFile } from "../features/Form/formSlice.js";

const UploadBox = ( { imgPreview } ) => {

    const dispatch = useDispatch();
    const inputRef = useRef();

    //  function to upload photo...
    const handleUploadClick = () => {
        inputRef.current.click();
    }

    // Function to change the value of File inpute element...
    const handleFileChange = (evt) => {
        const image = evt.target.files[0];        // ...In react we use event.target.files for taking files
        if (image) {
            const imgPreview = URL.createObjectURL(image);
            dispatch(updateImageFile({ image , imgPreview }))
        } else if(!image){
            toast.warn("You haven't select any file!");
        }
    };

    return (
        <div className="p-3 border-1 border-gray-300 rounded-lg mx-auto my-8 
                w-[95%] sm:w-[80%] md:w-[60%] lg:w-[70%] max-sm:h-[40dvh]
                h-[62vh] lg:h-[40dvh]  md:h-[60vh] duration-300 ease-in-out">

            <div className="border-1 border-dashed rounded-lg p-2 border-gray-300 
                            flex justify-center items-center w-full h-full">

                <div 
                    onClick={handleUploadClick} 
                    className="flex justify-center items-center flex-col cursor-pointer pb-2 
                                upload-Box mx-auto w-[90%] sm:w-[80%] md:w-[70%] my-8"
                >
                    {/* Upload Icon */}
                    <div className="icon text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-5">
                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                    </div>

                    {/* Upload Text */}
                    <div className="cursor-pointer px-2 sm:px-4 py-2 m-2 
                                    text-base sm:text-lg md:text-xl mt-[-0.5rem]">
                        Click to upload your photo
                    </div>

                    {/* File Format Info */}
                    <p className="text-[0.65rem] sm:text-xs md:text-sm mt-[-0.5rem] mb-5">
                        PNG , JPG , GIF
                    </p>

                    {/* Hidden File Input */}
                    <input 
                        type="file" 
                        name="image"
                        id="profile" 
                        ref={inputRef}
                        onChange={handleFileChange} 
                        accept="image/*" 
                        className="cursor-pointer hidden"
                    />

                    {/* Preview Image */}
                    {imgPreview && (
                        <img 
                        src={imgPreview} 
                        alt="preview" 
                        className="mt-3 rounded-md max-h-[150px] sm:max-h-[200px] object-contain" 
                        />
                    )}
                </div>

            </div>
        </div>

    );
}

export default UploadBox;
