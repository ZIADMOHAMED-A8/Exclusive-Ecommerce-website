import { configureStore, createSlice } from '@reduxjs/toolkit';
import cartReducer from './components/cart-slice';
import productsReducer from './components/products-slice';

import { authApiSlice } from '../auth/authApiSlice';
import { apiSlice } from '../auth/apiSlice';
import authreducer from '../auth/authSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product:productsReducer,
    auth:authreducer,
     [apiSlice.reducerPath]:apiSlice.reducer,
     
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;