import { createSlice } from "@reduxjs/toolkit";

export const cartItemsSlice = createSlice({
    name: "cartItems",
    initialState: {
        items: [],
        cartQuantity: 0,
        cartTotal: 0,
    },
    reducers: {
        cartAddedItems: (state, action) => {
            const newItem = action.payload;
            state.items.push({ ...newItem });

            state.cartQuantity += 1; // Properly update cartQuantity
            state.cartTotal = state.cartTotal+ (newItem.Mrp * 1) ; // Update cartTotal

            console.log("Your cart quantity is", state.cartQuantity);
            console.log("Updated cart items:", state.items);
            console.log("Updated cart expense:", state.cartTotal);
        },

        cartRemoveItem :(state , action)=>{
            const RemovedItem = action.payload;
            console.log(RemovedItem)
            const updatedCartItems = state.items.filter((i)=>i._id !== RemovedItem._id )
            state.items = updatedCartItems;
            state.cartQuantity -= 1;
            console.log(updatedCartItems)
            state.cartTotal -= RemovedItem.Mrp ;
            console.log("Updated cart expense:", state.cartTotal);

        },

        cartEmpty :(state ) =>{
            state.items = []

        }

        
    }
});

// Export actions and reducer
export const { cartEmpty , cartAddedItems , cartRemoveItem } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
