
import { useState } from 'react';
import { useNavigate } from "react-router";
import axios from  "axios";
import { toast } from "react-toastify";

const Signup = () => {
    const navigateTo = useNavigate();
    const [email , setEmail] = useState("");
    const [phone , setPhone] = useState("");
    const [fullName , setFullName] = useState("");
    const [pass , setPass] = useState("");
    const[method , setMethod] = useState("");

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const validatePhone = `+91${phone}`;
        await axios.post(`${import.meta.env.VITE_USER_SERVICE_URL}/api/user/register`,
                {
                    name : fullName,
                    email : email,
                    phone : validatePhone,
                    password : pass,
                    verificationMethod : method,
                }, 
                {
                    withCredentials : true,
                    headers: { "Content-Type": "application/json" },
        })
        .then( (res) => {
            toast(res.data.message,{
                    style: {
                        backgroundColor: "#3a3a3a75",
                        color: "#ffffffff",
                    }
                });
            navigateTo(`/otp-verification/${email}/${phone}`); 
        })
        .catch( (err) => {
            toast.error(err.response.data.message);
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
            <form
                className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl/10"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-semibold text-center my-5">Register</h2>

                {/* Name */}
                <div className="mb-4">
                <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    required
                    className="w-full text-md p-3 outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    value={fullName}
                    onChange={(evt) => setFullName(evt.target.value)}
                />
                </div>

                {/* Email */}
                <div className="mb-4">
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    className="w-full text-md p-3 outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                />
                </div>

                {/* Phone */}
                <div className="flex items-center mb-4 border border-gray-300 rounded-md overflow-hidden">
                <span className="px-4 text-gray-700">+91</span>
                <input
                    type="number"
                    placeholder="Phone"
                    name="phone"
                    required
                    className="w-full text-md p-3 outline-none"
                    value={phone}
                    onChange={(evt) => setPhone(evt.target.value)}
                />
                </div>

                {/* Password */}
                <div className="mb-4">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    className="w-full text-md p-3 outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    value={pass}
                    onChange={(evt) => setPass(evt.target.value)}
                />
                </div>

                {/* Verification Method */}
                <div className="mb-6">
                <p className="text-lg mb-2">Select Verification Method</p>
                <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="verificationMethod"
                        checked={method === "email"}
                        onChange={() => setMethod("email")}
                        className="accent-green-500"
                    />
                    Email
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="verificationMethod"
                        checked={method === "phone"}
                        onChange={() => setMethod("phone")}
                        className="accent-green-500"
                    />
                    Phone
                    </label>
                </div>
                </div>

                {/* Button */}
                <button
                    type="Submit"
                    className="w-full bg-green-700 text-white text-lg rounded-lg py-2 cursor-pointer
                        hover:bg-green-800 transition duration-300"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Signup;
