import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card } from "antd";
import { increment, decrement } from "../Feature/Cart/cartSlice";
import { cartAddedItems, cartRemoveItem } from "../Feature/Cart/CartItems";
import {useNavigate} from 'react-router-dom';


function Product() {
  const naviagte = useNavigate();
  const [items, setItems] = useState([]);
  const [addedItems, setAddedItems] = useState({}); // now tracks by ID correctly

  const cart = useSelector((state) => state.cart.value);
  const cartItems = useSelector((state) => state.cartItems.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:8081/api/GetItem", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) {
          // throw new Error("Failed to fetch items");
          naviagte('/login')
        };

        const data = await res.json();
        setItems(data.itemList || []);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleAddToCart = (item) => {
    setAddedItems((prev) => ({
      ...prev,
      [item._id]: true,
    }));
    dispatch(increment());
    dispatch(cartAddedItems(item));
  };

  const handleRemoveFromCart = (item) => {
    setAddedItems((prev) => ({
      ...prev,
      [item._id]: false,
    }));
    dispatch(decrement());
    dispatch(cartRemoveItem(item));
  };

  return (
    <div className="flex flex-wrap gap-4">
      {items.length === 0 ? (
        <p>Loading items...</p>
      ) : (
        items.map((item) => (
          <Card
            key={item._id}
            hoverable
            style={{ width: 240 }}
            // cover={
            //   <img
            //     alt={item.ItemName}
            //     src="https://stock.adobe.com/in/images/juice-splash-of-mixed-fruits-ai-generate/561533677https://www.istockphoto.com/photo/isolated-berries-gm182187173-10599317"
            //   />
            // }
            className="mx-2 my-2"
          >
            <div className="flex flex-row justify-between">
              <h1 className="font-semibold">{item.ItemName}</h1>
              <p className="font-semibold">MRP: ₹{item.Mrp}</p>
            </div>
            <div className="flex justify-end mt-4">
              {addedItems[item._id] ? (
                <Button type="primary" danger onClick={() => handleRemoveFromCart(item)}>
                  Remove from Cart
                </Button>
              ) : (
                <Button type="primary" onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </Button>
              )}
            </div>
          </Card>
        ))
      )}
    </div>
  );
}

export default Product;
