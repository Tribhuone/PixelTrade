
// Here we render all uploaded files by a single user...

import "../App.css";
import ProductTable from './UploadedTable';

const UploadedProducts = () => {

    return (
        <>
            <div className="h-full w-full border-2 border-gray-300/90 rounded-lg my-3 p-3 " >
                <h2 className="mx-4 text-xl text-green-900 font-bold new-Font" >My Photo Listings</h2>
                <p className="new-Font mx-4 text-sm my-1" >The photos you have uploaded for sale.</p>
                <br />
                <ProductTable/>
            </div>  
        </>
    );
}

export default UploadedProducts;
