
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import "../App.css";
import { useState } from 'react';
import Listings from '../components/UploadedProducts.jsx';
import Purchases from '../components/PurchasedProducts.jsx';

const UserDashboard = () => {

    const [changePage , setChangePage] = useState(true);

    return (
        <>
            <div className="flex flex-col min-h-screen">
                {/* Header/Navbar */}
                <Navbar/>

                {/* Main content (will grow & push footer down) */}
                <main className="w-[84%] p-3 mx-auto my-10 max-sm:p-0 flex-grow ">
                            <div className="rounded-md bg-gray-200 flex justify-evenly items-center md:w-[30%] xl:w-[25%] 2xl:w-[22%]
                                text-[.9rem] font-semibold p-2">

                                <button 
                                    className={`toggle-btn-${changePage ? "active" : ""}`}
                                    onClick={() => setChangePage(true)}
                                >
                                    My Listings
                                </button>

                                <button 
                                    className={`toggle-btn-${!changePage ? "active" : ""}`}
                                    onClick={() => setChangePage(false)}
                                >
                                    My Purchases
                                </button>
                            </div>

                            {changePage ? <Listings/> : <Purchases/>}
                </main>

                {/* Footer (always bottom) */}
                <Footer />
            </div>
        </>
    );
}

export default UserDashboard;
