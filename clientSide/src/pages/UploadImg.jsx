
import "../App.css";
import Navbar from '../components/Navbar';
import ErrorBoundary from '../ErrorBoundary';
import Footer from "../components/Footer";
import UploadHero from '../components/Hero_ofUpload';
import UploadAll from '../components/UploadAll';

const UploadImg = () => {

    return (
        <>
            <div className="flex flex-col min-h-screen">
                {/* Header/Navbar */}
                <Navbar/>

                {/* Main content (will grow & push footer down) */}
                <main className="flex-grow p-4 w-[100%] ">
                    <UploadHero/>
                    <ErrorBoundary>
                        <UploadAll/>
                    </ErrorBoundary>
                </main>

                {/* Footer (always bottom) */}
                <Footer />
            </div>
        </>
    );
}

export default UploadImg;
