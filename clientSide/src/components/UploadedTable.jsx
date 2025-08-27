
// Here we render all files in form of table...

import { useState , useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify';


export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const authorize = useSelector( (state) => state.user);

  const token = authorize.token;        // access the token

  useEffect(  () => {
    const getUserProduct = async () => {
      await axios.get(`${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/product/uploaded` , {
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

    getUserProduct();
  }, [])

  const handleDelete = async (_id) => {
    setProducts(products.filter((p) => p._id !== _id));
    await axios.delete(`${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/product/delete/post/${_id}`)
      .then( (res) => {
        toast(res.data.message,{
            style: {
                backgroundColor: "#3a3a3a75",
                color: "#ffffffff",
            }
          });
      })
      .catch( (err) => {
        console.log(err);
      });
  };

  return (
    <div className="p-6 bg-[#f9f8f4] rounded-lg min-h-[50dvh] max-h-auto ">

      {/* Table for large screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse text-left">

          {/* Table Head */}
          <thead>
            <tr className="border-b">
              <th className="pb-3 font-medium text-green-900">Title</th>
              <th className="pb-3 font-medium text-green-900">Price</th>
              <th className="pb-3 font-medium text-green-900">Sales</th>
              <th className="pb-3"></th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-green-50/50">

                <td className="py-4 flex items-center gap-4">
                  <img
                    src={product.imagePath}
                    alt={product.title}
                    className="w-16 h-12 rounded object-cover"
                  />
                  <span className="text-gray-800 font-medium">{product.title}</span>
                </td>

                <td className="py-4 text-gray-700">${product.price.toFixed(2)}</td>

                <td className="py-4 text-gray-700">{product.sales}</td>

                <td className="py-4 flex gap-2">
                  <button className="p-2 rounded-lg bg-white border hover:bg-amber-200 transition cursor-pointer duration-300 ease-in-out ">
                    <Pencil className="w-5 h-5 text-green-900" />
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="p-2 rounded-lg bg-red-500 hover:bg-red-600 transition cursor-pointer  duration-300 ease-in-out "
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="grid gap-4 md:hidden">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow p-4 flex flex-col gap-3"
          >
            <div className="flex items-center gap-4">
              <img
                src={product.imagePath}
                alt={product.title}
                className="w-20 h-16 rounded object-cover"
              />
              <h3 className="text-gray-800 font-semibold">{product.title}</h3>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Price:</span>
              <span className="font-medium">₹{product.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Sales:</span>
              <span className="font-medium">{product.sales}</span>
            </div>
            <div className="flex gap-2 justify-end">
              <button className="p-2 rounded-lg bg-white border hover:bg-amber-200 transition cursor-pointer ">
                <Pencil className="w-5 h-5 text-green-900" />
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="p-2 rounded-lg bg-red-500 hover:bg-red-600 transition cursor-pointer "
              >
                <Trash2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
