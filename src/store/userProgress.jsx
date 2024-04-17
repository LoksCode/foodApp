import { createSlice } from '@reduxjs/toolkit';

const progressInitialState = {
  progress: '',
};

const userProgressSlice = createSlice({
  name: 'userProgress',
  initialState: progressInitialState,
  reducers: {
    showCart(state) {
      state.progress = 'cart';
    },

    hideCart(state) {
      state.progress = '';
    },
    showCheckout(state) {
      state.progress = 'checkout';
    },
    hideCheckout(state) {
      state.progress = '';
    },
  },
});

export const userProgressActions = userProgressSlice.actions;
export default userProgressSlice;
