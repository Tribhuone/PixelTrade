
import { useState } from 'react';
import { Link , useNavigate } from "react-router";
import axios from "axios";
import { toast } from 'react-toastify';
import { userAuthentication , updateUser } from "../features/User/userSlice.js";
import { useDispatch } from 'react-redux';

const Login = () => {

    const [email , setEmail] = useState("");
    const [pass , setPass] = useState("");
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        await axios.post( `${import.meta.env.VITE_USER_SERVICE_URL}/api/user/login` , { email : email , password : pass } , {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then( (res) => {
            toast(res.data.message,{
                    style: {
                        backgroundColor: "#3a3a3a75",
                        color: "#ffffffff",
                    }
                });
            dispatch(userAuthentication(true));
            dispatch(updateUser({
                user : res.data.user,
                token : res.data.token
            }));
            navigateTo(`/`);
        })
        .catch( (err) => {
            toast.error(err.response.data.message);
        });
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="w-full max-w-md p-6 sm:p-8 rounded-lg shadow-xl/10"
                >
                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
                        Login
                    </h2>

                    {/* Email */}
                    <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        name="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 rounded-md border border-gray-300 outline-none"
                    />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        name="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        className="w-full p-3 rounded-md border border-gray-300 outline-none"
                    />
                    </div>

                    {/* Forgot password link */}
                    <p className="text-right mb-4">
                    <Link
                        to={"/password/forgot"}
                        className="text-sm sm:text-base hover:underline"
                    >
                        Forgot Password?
                    </Link>
                    </p>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full bg-green-800/90 text-white text-lg font-medium py-2 sm:py-3 rounded-lg 
                            hover:bg-green-700 transition duration-300 cursor-pointer "
                    >
                        Login
                    </button>
                </form>
            </div>
        </>
    );
}

export default Login;
