import React, { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartEmpty } from "../Feature/Cart/CartItems";
import { resetValue } from "../Feature/Cart/cartSlice";
// const jwt = require('jsonwebtoken');

export default function GroceryReceipt() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartItems.items);
  const total = useSelector((state) => state.cartItems.cartTotal);

  useEffect(() => {
    console.log("YOUR CART ITEMS ARE", cart);
  }, []);

  const currentDate = new Date();

  const sendNotification = async (phoneNumber) => {
    try {
      // customer phone number
      // const total = total;
      // const phoneNumber = phoneNumber;
      const token = localStorage.getItem("token");
      const makeReq = await fetch(
        "http://localhost:8081/api/SendNotification",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: phoneNumber,
            message: `your Cart Total is ${total}`,
          }),
        }
      );

      const data = await makeReq.json();
      console.log(data, " the notification data");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrint = async () => {
    try {
      const token = localStorage.getItem("token");
      const number = localStorage.getItem("PhoneNumber");
      const CustomerName = "Devi Lal";
      const PhoneNumber = `+91${number}`; // make it dynamic
      const Address = "Sonipat";

      const response = await fetch("http://localhost:8081/api/saveBill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          CustomerName,
          PhoneNumber,
          Address,
          Cart: cart,
          Mrp: total,
          // user: userId,
        }),
      });

      const data = await response.json();
      console.log("Saved bill data:", data);

      // Success actions
      dispatch(cartEmpty());
      dispatch(resetValue());
      toast.success("Collect Your Bill");
      toast.success("Notification Sent Successfully");
      sendNotification(PhoneNumber);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Bill save error:", error);
      toast.error("Failed to save the bill");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
        <div className="bg-white w-80 font-mono text-xs border-2 border-dashed border-gray-400 shadow-lg">
          {/* Header */}
          <div className="text-center py-4 border-b border-gray-300">
            <h1 className="text-lg font-bold">SONIPAT GROCERY</h1>
            <p className="text-xs">1234 Market Street</p>
            <p className="text-xs">Springfield, IL 62701</p>
            <p className="text-xs">Phone: +91 7497057346 </p>
            <p className="text-xs mt-2">★ Thank You For Shopping With Us! ★</p>
          </div>

          {/* Store Info */}
          <div className="px-4 py-2 text-xs">
            <div className="flex justify-between">
              <span>Store #: 0247</span>
              <span>Terminal: 03</span>
            </div>
            <div className="flex justify-between">
              <span>Cashier: Sarah M.</span>
              <span>ID: 4829</span>
            </div>
          </div>

          {/* Date and Time */}
          <div className="px-4 py-2 border-b border-gray-300">
            <div className="flex justify-between">
              <span>{currentDate.toLocaleDateString()}</span>
              <span>{currentDate.toLocaleTimeString()}</span>
            </div>
            <p className="text-xs">Receipt #: 2024-0615-1547</p>
          </div>

          {/* Items */}
          <div className="px-4 py-2">
            {cart.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between">
                  <span className="flex-1">{item.ItemName}</span>
                  <span className="ml-2">${item.Mrp}</span>
                </div>
                <div className="text-gray-600 text-xs ml-2">
                  Quantity{item.Quantity}
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="px-4 py-2 border-t border-gray-400">
            {/* <div className="flex justify-between py-1">
            <span>SUBTOTAL:</span>
            <span>${subtotal}</span>
          </div> */}
            {/* <div className="flex justify-between py-1">
            <span>TAX (8.25%):</span>
            <span>${tax}</span>
          </div> */}
            <div className="flex justify-between py-2 font-bold text-sm border-t border-gray-300">
              <span>TOTAL:</span>
              <span>${total}</span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="px-4 py-2 border-t border-gray-300">
            <div className="flex justify-between">
              <span>PAYMENT METHOD:</span>
              <span>VISA ****1234</span>
            </div>
            <div className="flex justify-between">
              <span>APPROVAL CODE:</span>
              <span>078456</span>
            </div>
            <div className="flex justify-between">
              <span>REFERENCE #:</span>
              <span>240615154729</span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="px-4 py-2 border-t border-gray-300">
            <p className="font-bold">CUSTOMER INFORMATION:</p>
            <p>Name: John Smith</p>
            <p>Member ID: FM789456123</p>
            <p>Email: j.smith@email.com</p>
            <p>Points Earned: 52</p>
            <p>Total Points: 1,847</p>
          </div>

          {/* Savings */}
          <div className="px-4 py-2 border-t border-gray-300">
            <p className="font-bold">YOUR SAVINGS TODAY:</p>
            <div className="flex justify-between">
              <span>Store Discounts:</span>
              <span>$3.47</span>
            </div>
            <div className="flex justify-between">
              <span>Member Savings:</span>
              <span>$2.15</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total Saved:</span>
              <span>$5.62</span>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-4 text-center border-t border-gray-300">
            <p className="text-xs mb-2">Return Policy: 30 days with receipt</p>
            <p className="text-xs mb-2">Customer Service: 1-800-FRESH-01</p>
            <p className="text-xs mb-2">Visit us online: www.freshmart.com</p>
            <p className="text-xs font-bold">
              THANK YOU FOR SHOPPING FRESHMART!
            </p>
            <p className="text-xs">Have a Fresh Day! 🛒</p>
          </div>
        </div>
      </div>

      <Toaster></Toaster>
      <button
        onClick={() => handlePrint()}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
      >
        Print the Bill
      </button>
    </>
  );
}
