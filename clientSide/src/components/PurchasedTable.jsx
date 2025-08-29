
import { Download } from "lucide-react";
import { useEffect , useState } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function PurchasedTable() {
  const [products, setProducts] = useState([]);
  const authorize = useSelector( (state) => state.user);
  let token = authorize.token;        // access the token

  useEffect( () => {

    const getPurchasedItems = async () => {
      await axios.get(`${import.meta.env.VITE_ORDER_SERVICE_URL}/api/order/purchased`, {
        headers: {
          Authorization : `Bearer ${token}`,
        }
      })
      .then( (res) => {
        setProducts(res.data.userProduct);
      })
      .catch( (er) => {
        console.log(er);
      })
    }

    getPurchasedItems();
  } , [token]);

  // ✅ Download function
  const handleDownload = async (item) => {
    try {
      const response = await fetch(item.imagePath, {
        headers: {
          Authorization: `Bearer ${token}`, // if your backend protects the file
        },
      });
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${item.title || "image"}-${item._id}.jpg`; // unique name
      document.body.appendChild(link);
      link.click();

      // cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="overflow-x-auto rounded-lg shadow-sm">
        {/* Desktop Table */}
        <table className="hidden md:table w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Price</th>
              <th className="p-3">Artist</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={item.path}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3">{item.title}</td>
                <td className="p-3">{item.price}</td>
                <td className="p-3">{item.userName}</td>
                <td className="p-3 text-center">

                  <button 
                    className="p-2 bg-green-700 text-white rounded-lg hover:bg-green-800 cursor-pointer "
                    onClick={() => handleDownload(item)}
                  >
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {products.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={item.imagePath}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.userName}</p>
                  <p className="font-medium text-black ">{item.price}</p>
                </div>
              </div>
              <button 
                className="p-2 bg-green-700 text-white rounded-lg hover:bg-green-800 cursor-pointer"
                onClick={() => handleDownload(item)}
              >
                <Download size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
