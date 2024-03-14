import { createSlice } from "@reduxjs/toolkit";

const productsHomeSlide = createSlice({
  name: "products",
  initialState: {
    all: [],
    resultFollowFilter: [],
    seenProducts: [],
  },
  reducers: {
    setAll: (state, action) => {
      state.all = action.payload;
    },
    setResultFilter: (state, action) => {
      state.resultFollowFilter = action.payload;
    },
    setSeenPro: (state, action) => {
      const check = state.seenProducts.findIndex(
        (e) => e._id === action.payload.product._id,
      );
      if (check === -1) state.seenProducts.push(action.payload.product);
    },
  },
});

export default productsHomeSlide;

export const { setAll, setResultFilter, setSeenPro } =
  productsHomeSlide.actions;

export const getAllPros = (state) => state.productsHome.all;
export const getResultFilter = (state) => state.productsHome.resultFollowFilter;
export const getSeenProducts = (state) => state.productsHome.seenProducts;
