// src/store/cart-slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let initialState =JSON.parse( localStorage.getItem('cart')) ||{
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  loading: false,
  error: null,
  success: false
};

// Async thunk for submitting form
export let submitForm = createAsyncThunk(
  'cart/submitForm',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch('https://ecommerce-37527-default-rtdb.firebaseio.com/orders.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('Failed to submit order');
      }

      const data = await res.json();
      return data; // بيرجع للـ fulfilled
    } catch (err) {
      return rejectWithValue(err.message); // بيرجع للـ rejected
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const index = state.items.findIndex((item) => item.id === newItem.id);

      if (index === -1) {
        state.items.push({
          item: newItem,
          quantity: 1,
          id: newItem.id
        });
      } else {
        state.items[index].quantity += 1;
      }

      state.totalQuantity++;
      state.totalPrice += newItem.price;
      localStorage.setItem('cart',JSON.stringify(state))
    },

    removeItem(state, action) {
      const id = action.payload;
      const index = state.items.findIndex((item) => item.id === id);

      if (index !== -1) {
        state.items[index].quantity -= 1;
        state.totalQuantity--;
        state.totalPrice -= state.items[index].item.price;

        if (state.items[index].quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        }
      }
            localStorage.setItem('cart',JSON.stringify(state))


    },

    updateQuantity(state, action) {
      const newQuantity = action.payload.quantity;
      const index = state.items.findIndex((item) => item.id === action.payload.id);

      if (index !== -1) {
        state.totalQuantity += (newQuantity - state.items[index].quantity);
        state.totalPrice += Number(
          (state.items[index].item.price * (newQuantity - state.items[index].quantity)).toFixed(2)
        );
        state.items[index].quantity = newQuantity;
        state.items = state.items.filter(item => item.quantity !== 0);
      }
                  localStorage.setItem('cart',JSON.stringify(state))


    },

    addItemWithQuantity(state, action) {
      const newItem = action.payload.newItem;
      const quantity = action.payload.quantity;
      const index = state.items.findIndex((item) => item.id === newItem.id);

      if (index === -1) {
        state.items.push({
          item: newItem,
          quantity: quantity,
          id: newItem.id
        });
      } else {
        state.items[index].quantity += quantity;
      }

      state.totalQuantity += quantity;
      state.totalPrice += (quantity * newItem.price);
                  localStorage.setItem('cart',JSON.stringify(state))


    },
  clearCart(state,action){
    console.log('a')
    initialState={
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  loading: false,
  error: null,
  success: false
}
      localStorage.setItem('cart',JSON.stringify(initialState))

    return initialState

  }
  }
    ,
  

  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { addItem, removeItem, updateQuantity, addItemWithQuantity,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
