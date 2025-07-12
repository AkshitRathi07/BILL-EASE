import React, { useState } from "react";
import { Button } from "antd";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Add() {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("Pieces");
  const [mrp, setMrp] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");

  const AddItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8081/api/NewItem", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          ItemName: itemName,
          BrandName: brandName,
          Quantity: quantity,
          Unit: unit,
          Mrp: mrp,
          ExpiryDate: expiryDate,
          Category: category,
          // Notes:  notes ,
        }),
      });

      if (!token) {
        navigate("/login");
        return;
      }

      const data = await response.json();
      console.log(data);
      toast(" Item Added Successfully");
      setItemName("");

      setBrandName("");
      setQuantity("");
      setUnit("");
      setMrp("");
      setExpiryDate("");
      setCategory("");
      setNotes("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" w-full -x-hidden ">
        <div className=" w-full flex justify-center items-center bg-purple-700S">
          <div className="bg-white flex items-center  justify-center">
            <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-lg">
              <h1 className="text-2xl font-bold mb-4">Add Grocery Item</h1>
              <p className="text-gray-600 mb-6">
                Enter the details of the grocery item you want to add to your
                list.
              </p>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="item-name" className="block text-gray-700">
                      Item Name
                    </label>
                    <input
                      type="text"
                      id="item-name"
                      placeholder="e.g. Apples"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="brandName" className="block text-gray-700">
                      Brand (Optional)
                    </label>
                    <input
                      type="text"
                      id="brandName"
                      placeholder="e.g. Organic Farms"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label htmlFor="quantity" className="block text-gray-700">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="unit" className="block text-gray-700">
                      Unit
                    </label>
                    <select
                      id="unit"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                      <option>Pieces</option>
                      <option>Kg</option>
                      <option>Liters</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      id="mrp"
                      value={mrp}
                      onChange={(e) => setMrp(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="category" className="block text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  >
                    <option>Select category</option>
                    <option>Fruits</option>
                    <option>Vegetables</option>
                    <option>Dairy</option>
                    <option>Meat</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="expiryDate" className="block text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    id="expiryDate"
                    value={expiryDate} // ✅ Bind value to state
                    onChange={(e) => setExpiryDate(e.target.value)} // ✅ Update state
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div className="flex justify-center">
                  <Toaster />
                  <Button
                    onClick={() => AddItems()}
                    className="my-2 "
                    type="primary"
                  >
                    Add Product
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Add;
