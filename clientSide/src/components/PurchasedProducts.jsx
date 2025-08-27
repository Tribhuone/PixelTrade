
import PurchasedTable from "./PurchasedTable";

const PurchasedProducts = () => {
    return (
        <>
            <div className="h-full w-full border-2 border-gray-300/90 rounded-lg my-3 p-3 " >
                <h2 className="mx-4 text-xl text-green-900 font-bold new-Font" >My Purchases</h2>
                <p className="new-Font mx-4 text-sm my-1" >Photos you have bought from other creators.</p>
                <br />
                <PurchasedTable/>
            </div>  
        </>
    );
}

export default PurchasedProducts;
