
import "../App.css";
import { useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from 'react-redux';
import { userAuthentication , updateUser } from "../features/User/userSlice.js";

const OtpVerification = () => {

    const { email ,phone } = useParams();
    const [otp , setOtp] = useState(["" , "" , "" , "" , ""]);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const handleChange = (value , index) => {
        if(!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if(value && index < otp.length - 1){
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    }

    const handleKeyDown = (evt , index) => {
        if(evt.key === "Backspace" && otp[index] === "" && index > 0){
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    }

    const handleOtpVerification = async(evt) => {
        evt.preventDefault();
        const enteredOtp = otp.join("");
        console.log(enteredOtp);
        const data = {
            email : email,
            otp: enteredOtp,
            phone : phone,
        }

        await axios.post(`${import.meta.env.VITE_USER_SERVICE_URL}/api/user/otp` , data , {
            withCredentials: true,
            headers : {"Content-Type" : "application/json"},
        })
        .then( (res) => {
            toast.success(res.data.message);
            dispatch(userAuthentication(true));
            dispatch(updateUser(res.data.user));
            navigateTo("/");
        })
        .catch( (err) => {
            toast.error(err.response.data.message);
            dispatch(userAuthentication(false));
            dispatch(updateUser(null));
        });
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-xs sm:max-w-md md:max-w-lg border border-gray-200 rounded-xl p-6 sm:p-8 shadow-lg bg-white">
                
                    {/* Title */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center">
                        OTP Verification
                    </h1>
                    <p className="text-center text-gray-700 mt-2 text-sm sm:text-base md:text-lg">
                        Enter the 5-Digit OTP sent to your Registered Email or Phone.
                    </p>

                    {/* Form */}
                    <form className="my-6 text-center" onSubmit={handleOtpVerification}>
                        
                        {/* OTP Inputs */}
                        <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                            {otp.map((digit, index) => (
                                <input
                                    id={`otp-input-${index}`}
                                    type="text"
                                    maxLength="1"
                                    key={index}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="otp-input border-2 border-green-700 
                                        w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 
                                        text-center text-base sm:text-lg md:text-xl 
                                        rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            ))}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="px-4 py-2 sm:py-3 text-sm sm:text-base md:text-lg bg-amber-300 w-full mt-6 rounded-lg cursor-pointer 
                                duration-300 ease-in-out hover:bg-amber-400"
                        >
                            Verify
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default OtpVerification;
