
import { useState} from 'react';
import { useParams , useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { userAuthentication , updateUser } from "../features/User/userSlice.js";

const ResetPassword = () => {

    const { token } = useParams();
    const [pass , setPass] = useState("");
    const [confirmPass , setConfirmPass] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleResetPassword = async (evt) => {
        evt.preventDefault();
        await axios.put(`${import.meta.env.VITE_API_URL}password/reset/${token}`, 
        { password : pass , confirmPassword : confirmPass }, 
        {
            withCredentials : true,
            header: {
                "Content-Type": "application/json"
            },
        }).then( (res) => {
            toast.success(res.message);
            dispatch(userAuthentication(true));
            dispatch(updateUser(res.data.user));
            navigate("/");
        }).catch( (err) => {
            toast.error(err.response.message);
        })
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl">
                    {/* Title */}
                    <h2 className="text-2xl font-semibold text-center mb-2">Reset Password</h2>
                    <p className="text-gray-600 text-center mb-6">Enter your new password</p>

                    {/* Form */}
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <input
                            type="password"
                            placeholder="New Password"
                            required
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            required
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <button
                            type="submit"
                            className="w-full bg-green-700 text-white text-lg rounded-lg py-2 hover:bg-green-800 transition duration-300"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;
