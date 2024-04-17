import { configureStore } from '@reduxjs/toolkit';
import userProgressSlice from './userProgress';
import cartSlice from './cartSlice';

const store = configureStore({
  reducer: { cart: cartSlice.reducer, userProgress: userProgressSlice.reducer },
});

export default store;
