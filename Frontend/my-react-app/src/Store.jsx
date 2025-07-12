// CREATE THE STORE 
import { configureStore } from "@reduxjs/toolkit";


import cartReducer from './Feature/Cart/cartSlice'
import cartItemsReducer from './Feature/Cart/CartItems'
export default configureStore({
  reducer: {
    cart: cartReducer,
    cartItems : cartItemsReducer
  },
});
