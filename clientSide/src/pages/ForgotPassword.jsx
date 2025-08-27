import { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (evt) => {
    evt.preventDefault();
    await axios.post(`${import.meta.env.VITE_USER_SERVICE_URL}/api/user/password/forgot`, { email }, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      },
    }).then((res) => {
      toast.success(res.data.message);
      setEmail("");
    }).catch((err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    })
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xs sm:max-w-md md:max-w-lg p-6 sm:p-8 rounded-xl shadow-xl bg-white">
          
          {/* Title */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-2">
            Forgot Password
          </h2>
          <p className="text-center text-xs sm:text-sm md:text-base mb-6 text-gray-600">
            Enter your email address to receive a password reset link
          </p>

          {/* Form */}
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-md border border-gray-300 outline-none 
                         focus:ring-2 focus:ring-green-400"
              required
            />

            <button
              className="w-full text-sm sm:text-base md:text-lg text-white bg-green-800 font-medium py-2 sm:py-3 rounded-lg 
                         hover:bg-green-700 transition duration-300 ease-in-out cursor-pointer"
              type="submit"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
