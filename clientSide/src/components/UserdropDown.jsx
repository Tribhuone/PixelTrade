
import { useState } from 'react';
import { useNavigate , Link } from "react-router";
import { useDispatch , useSelector } from 'react-redux';
import { logoutUser } from "../features/User/userSlice.js";
import axios from "axios";
import { toast } from 'react-toastify';

const UserdropDown = () => {

    const authentication = useSelector( (state) => state.user);
    // const authentication = useSelector( (state) => state.user);

    const [isHovered, setIsHovered] = useState(false);
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleSignUp = () => {
        <Link to={"/auth/signup"} />
        navigateTo("/auth/signup");
    }

    const handleLogin = () => {
        <Link to={"/auth/login"} />
        navigateTo("/auth/login");
    }

    const handleDashboard = () => {
        <Link to={`/user/dashboard`} ></Link>
        navigateTo(`/user/dashboard`);
    }

    const handleLogout = async () => {
        <Link to={`/`} ></Link>
        await axios.get(`${import.meta.env.VITE_USER_SERVICE_URL}/api/user/logout` , { withCredentials : true})
            .then( (res) => {
                dispatch(logoutUser());
                navigateTo("/");
                toast(res.data.message,{
                    style: {
                        backgroundColor: "#3a3a3a75",
                        color: "#ffffffff",
                    }
                });
            })
            .catch( (err) => {
                console.log(err);
                toast.error(err.response.message);
            })
    }

    return (
        <>
            <div 
                className="absolute top-[3rem] right-[2.4rem] py-2 text-green-800/80 w-[9rem]
                    rounded-lg duration-300 ease-in-out drop-shadow-md bg-white "
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {authentication.isAuthenticated ? (
                    <ul className="my-List" >
                        <li 
                            className="py-1 hover:bg-amber-300/70 px-3 duration-300 ease-in-out " 
                            onClick={handleDashboard}
                        >
                            Dashboard
                        </li>

                        <li 
                            className="py-1 hover:bg-amber-300/70 px-3 duration-300 ease-in-out " 
                            onClick={handleLogout}
                        >
                            Logout
                        </li> 
                    </ul>
                ) : (
                    <ul className="my-List" >
                        <li 
                            className="py-1 hover:bg-amber-300/70 px-3 duration-300 ease-in-out " 
                            onClick={handleLogin}
                        >
                            Login
                        </li>

                        <li 
                            className="py-1 hover:bg-amber-300/70 px-3 duration-300 ease-in-out " 
                            onClick={handleSignUp}
                        >
                            SignUp
                        </li>
                    </ul>
                )}
            </div>
        </>
    );
}

export default UserdropDown;
