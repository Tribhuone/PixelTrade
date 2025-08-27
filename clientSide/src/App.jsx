
import './App.css'
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import UploadImg from "./pages/UploadImg.jsx";
import EachImage from './pages/EachImage';
import Cart from "./pages/Cart";
import Signup from './pages/Signup';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import OtpVerification from "./pages/OtpVerification";
import ForgotPassword from './pages/ForgotPassword';
import { useDispatch } from 'react-redux';
import { userAuthentication } from "./features/User/userSlice.js";
import UserDashboard from './pages/UserDashboard';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentCancel from './components/PaymentCancel';

function App() {

  const dispatch = useDispatch();

  useEffect( () => {
    const getUser = async () => {
      const tokn = localStorage.getItem("authToken");
      if(tokn){
        dispatch(userAuthentication(true));
        return JSON.parse(true);
      }
      else if(tokn === null){
        return undefined;
      }
    }

    getUser();
  } , []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/upload" element={<UploadImg/>}/>
          <Route path="/img/:id" element={<EachImage/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/auth/signup" element={<Signup/>} />
          <Route path="/auth/login" element={<Login/>} />
          <Route path="/password/forgot" element={<ForgotPassword/>} />
          <Route path="/otp-verification/:email/:phone" element={<OtpVerification/>} />
          <Route path="/password/reset/:token" element={<ResetPassword/>} />
          <Route path="/user/dashboard" element={<UserDashboard/>} />
          <Route path="/success" element={<PaymentSuccess/>} />
          <Route path="/cancel" element={<PaymentCancel/>} />
        </Routes>

        <ToastContainer 
            theme="colored" 
            position="top-center"
            autoClose={1300}
        />
      </Router>
    </>
  )
}

export default App
