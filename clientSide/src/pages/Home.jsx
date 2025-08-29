
import "../App.css";
import axios from 'axios';
import { useState , useEffect } from "react";
import SkeletonCard from "../components/ImgCardLoader";
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ImageCard from '../components/ImgCard';
import Footer from "../components/Footer";

const Home = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect( () => {
        axios.get(`${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/product`)
        .then( (res) => {
            setItems(res.data);
            setLoading(false);
        })
        .catch( (er) => {
            console.log(er.response.message);
            setLoading(false);
        });
    }, []);

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar/>
                <main className=" flex-grow p-4 max-sm:px-0">
                    <Hero/>
                    <div className="flex justify-evenly items-center flex-wrap xl:px-20 2xl:px-20 md: max-sm:px-0 all-Img-Cards drop-shadow-md" >
                        {loading
                            ? // show 4 skeletons while loading
                              Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={idx} />)
                            : // show real images
                                <ImageCard items={items}/>
                        }
                    </div>
                </main>
                <Footer/>
            </div>
        </>
    );
}

export default Home;

