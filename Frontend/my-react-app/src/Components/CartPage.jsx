import { useSelector, useDispatch } from "react-redux";
import { cartRemoveItem } from "../Feature/Cart/CartItems";
import { decrement } from "../Feature/Cart/cartSlice";
import React, { useState } from "react";
import { Button, Space, Table } from "antd";
const { Column } = Table;
import { useNavigate } from "react-router-dom";


function CartPage() {
  const [open, setOpen] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [mode, setMode] = useState("");

  const items = useSelector((state) => state.cartItems.items);
  const mrp = useSelector((state) => state.cartItems.cartTotal);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(items);

  const handleDelete = (item) => {
    dispatch(cartRemoveItem(item));
    dispatch(decrement());
  };

  const handlePrintPopOver = () => {
    try {
      if (open) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    } catch (error) {}
  };

  const CustomerAPI = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch("http://localhost:8081/api/AddCustomer", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        CustomerName: customerName,
        PhoneNumber: phoneNumber,
        Address: address,
        Mode: mode,
      }),
    });

    if(!response.ok){
      navigate('/login')
    }
    const data = await response.json();
    console.log(data);
    const id = localStorage.setItem("userId" , data.newCustomer._id )
    console.log("your _id is " , data.newCustomer._id )
    JSON.stringify(localStorage.setItem("PhoneNumber",data.newCustomer.PhoneNumber ));
    
  };

  const handlePrint = () => {
    CustomerAPI();
    navigate('/PrintBill');
  };
  return (
    <>
      <div className="flex flex-col w-full min-h-min space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          <div className="text-sm text-gray-500">
            {items.length} {items.length === 1 ? 'item' : 'items'} in cart
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <Table
            dataSource={items}
            rowKey="_id"
            className="w-full"
            pagination={false}
            size="large"
            style={{
              backgroundColor: 'white',
            }}
          >
            <Column 
              title={<span className="font-semibold text-gray-700">Category</span>} 
              dataIndex="Category" 
              key="category"
              render={(text) => (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {text}
                </span>
              )}
            />
            <Column 
              title={<span className="font-semibold text-gray-700">Name</span>} 
              dataIndex="ItemName" 
              key="name"
              render={(text) => (
                <span className="font-medium text-gray-800">{text}</span>
              )}
            />
            <Column 
              title={<span className="font-semibold text-gray-700">Price</span>} 
              dataIndex="Mrp" 
              key="price"
              render={(text) => (
                <span className="font-semibold text-green-600">₹{text}</span>
              )}
            />
            <Column
              title={<span className="font-semibold text-gray-700">Quantity</span>}
              key="quantity"
              render={(text, record) => (
                <input
                  type="number"
                  min={1}
                  defaultValue={1}
                  className="w-20 text-center border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              )}
            />
            <Column
              title={<span className="font-semibold text-gray-700">Action</span>}
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  <button
                    onClick={() => handleDelete(record)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 font-medium text-sm flex items-center space-x-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Remove</span>
                  </button>
                </Space>
              )}
            />
          </Table>
        </div>

        {/* Total and Actions */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col items-end space-y-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">
                Total: <span className="text-green-600">₹{mrp}</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">Including all taxes</div>
            </div>
            
            <div className="flex space-x-4">
              {items && items.length > 0 ? (
                <Button
                  type="primary"
                  size="large"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-none shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-8 py-3 h-auto"
                  onClick={handlePrintPopOver}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Generate Bill</span>
                  </div>
                </Button>
              ) : (
                <Button
                  disabled
                  size="large"
                  className="bg-gray-300 text-gray-500 border-none font-semibold px-8 py-3 h-auto cursor-not-allowed"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Generate Bill</span>
                  </div>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="flex w-full justify-between items-center mb-6">
              <div className="font-bold text-2xl text-gray-800">Customer Details</div>
              <button
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                onClick={handlePrintPopOver}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                <input
                  type="text"
                  placeholder="Enter customer name"
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  placeholder="Enter address"
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Mode</label>
                <select 
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  onChange={(e) => setMode(e.target.value)}
                >
                  <option value="CASH">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="CARD">Card</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Total Amount:</span>
                <span className="font-bold text-2xl text-green-600">₹{mrp}</span>
              </div>
              
              <Button 
                type="primary"
                size="large"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-none shadow-lg hover:shadow-xl transition-all duration-300 font-semibold py-3 h-auto"
                onClick={handlePrint}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span>Print Bill</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CartPage;
