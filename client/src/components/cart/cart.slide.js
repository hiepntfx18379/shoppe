import { createSlice } from "@reduxjs/toolkit";

const confirmCartSlide = createSlice({
  name: "confirm",
  initialState: {
    checkoutCart: [],
  },
  reducers: {
    addToCartCheckOut: (state, { payload }) => {
      state.checkoutCart = payload;
    },
  },
});

export default confirmCartSlide;
export const infoCheckout = (state) => state.checkout.checkoutCart;
