import "../App.css";
import { useState } from 'react';
import { useDispatch , useSelector } from "react-redux";
import { updateField , addKeywords , removeKeywords } from "../features/Form/formSlice.js";

const UploadForm = () => {
    const [text , setText] = useState("");
    const dispatch = useDispatch();
    const formData = useSelector( (state) => state.form);

    const handleChange = (evt) => {
        const { name , value } = evt.target;
        dispatch(updateField({name , value}));
    }

    const handleKeywords = () => {
        if(text.trim() !== ""){
            dispatch(addKeywords(text));
            setText("");
        }
    };

    const handleRemoveKeyword = (index) => {
        dispatch(removeKeywords(index));
    }

    return (
        <div className="w-full flex flex-col items-center">
            {/* Title Input */}
            <div className="w-full sm:w-[95%] m-3">
                <h3 className="text-black sm:text-lg font-semibold mb-1">Photo Title</h3>
                <input 
                    type="text" 
                    placeholder="eg., 'Sunrise over the Highway'" 
                    className="w-full text-sm sm:text-md p-2 rounded-md border border-gray-300 outline-none"
                    name="title"
                    required
                    onChange={handleChange}
                />
            </div>

            {/* Description Input */}
            <div className="w-full sm:w-[95%] m-3">
                <h3 className="text-black sm:text-lg font-semibold mb-1">Description</h3>
                <textarea 
                    name="description"
                    id="pic-details" 
                    placeholder="Describe your photo in max 300 characters." 
                    maxLength={300}
                    required
                    onChange={handleChange}
                    className="w-full text-sm sm:text-md p-2 rounded-md border border-gray-300 outline-none min-h-[100px] sm:min-h-[100px]"
                />
            </div>

            {/* Keywords Input */}
            <div className="w-full sm:w-[95%] m-3">
                <h3 className="text-black sm:text-lg font-semibold mb-2">Keywords</h3>
                
                {/* Selected Keywords */}
                <div className="flex flex-wrap gap-2 mb-2">
                    { formData.keywords.map((word, index) => (
                        <div 
                            key={index}
                            className="bg-gray-200 text-sm px-2 py-1 rounded-lg flex items-center"
                        >
                            <span 
                                className="bg-green-800/80 text-white text-xs px-1 py-0.5 rounded cursor-pointer mr-1"
                                onClick={() => handleRemoveKeyword(index)}
                            >
                                <i className="fa-solid fa-x"></i>
                            </span>
                            {word}
                        </div>
                    ))}
                </div>

                {/* Input + Add Btn */}
                <div className="flex items-center gap-2">
                    <input 
                        type="text" 
                        placeholder="Add or select keywords for your photo..." 
                        className="w-[80%] text-sm sm:text-md p-2 rounded-md border border-gray-300 outline-none"
                        name="keyword"
                        id="keywordInput"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <button 
                        type="button"
                        className="w-[20%] bg-amber-300 text-sm sm:text-md font-semibold rounded-md py-2 hover:bg-amber-300/90 
                            duration-200 cursor-pointer"
                        onClick={handleKeywords} 
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Price Input */}
            <div className="w-full sm:w-[95%] m-3">
                <h3 className="text-black sm:text-lg font-semibold mb-1">Price</h3>
                <div className="flex items-center border border-gray-300 rounded-md p-2">
                    <span className="text-sm sm:text-md">₹</span>
                    <input 
                        type="number" 
                        placeholder="Enter price" 
                        className="w-full text-sm sm:text-md pl-2 outline-none"
                        name="price"
                        required
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default UploadForm;
