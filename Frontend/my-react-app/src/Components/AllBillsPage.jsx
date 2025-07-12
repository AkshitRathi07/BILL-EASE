import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllBillsPage() {
  const naviagte = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllBills = async () => {
      try {
        const token = localStorage.getItem('token');
        const gettingBills = await fetch("http://localhost:8081/api/getBill", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if(!token){
          naviagte('/login')
        }

        const response = await gettingBills.json();
        setData(response.data || []); // assuming response = { success: true, data: [...] }
      } catch (error) {
        console.error("Failed to fetch bills:", error);
      }
    };

    getAllBills();
  }, []);

  return (
    <div className=" w-full border-2 bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🧾 All Bills
        </h2>

        {/* Bills List */}
        <div className="space-y-6">
          {data.map((items, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200"
            >
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600">👤</span>
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold text-gray-800">{items.CustomerName}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">📞</span>
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-semibold text-gray-800">{items.PhoneNumber}</span>
                </div>
                
                <div className="flex items-center space-x-2 md:col-span-2">
                  <span className="text-purple-600">🏠</span>
                  <span className="text-gray-600">Address:</span>
                  <span className="font-semibold text-gray-800">{items.Address}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-600">💰</span>
                  <span className="text-gray-600">Total MRP:</span>
                  <span className="font-bold text-green-600 text-lg">₹{items.Mrp}</span>
                </div>
              </div>

              {/* Cart Items */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-orange-600">🛒</span>
                  <span className="font-semibold text-gray-700">Cart item(s):</span>
                </div>
                
                <div className="bg-gray-50 rounded-md p-4 space-y-2">
                  {Array.isArray(items.Cart) ? (
                    items.Cart.map((prod, pIndex) => (
                      <div
                        key={pIndex}
                        className="flex items-center justify-between bg-white rounded p-3 shadow-sm"
                      >
                        <span className="text-gray-800 font-medium">{prod.ItemName}</span>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            ₹{prod.Mrp}
                          </span>
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            × {prod.quantity}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : items.Cart && typeof items.Cart === "object" ? (
                    <div className="flex items-center justify-between bg-white rounded p-3 shadow-sm">
                      <span className="text-gray-800 font-medium">{items.Cart.ItemName}</span>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          ₹{items.Cart.Mrp}
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          × {items.Cart.quantity}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <span className="text-gray-500 italic">No cart item found.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllBillsPage;