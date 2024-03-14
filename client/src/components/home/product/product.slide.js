import { createSlice } from "@reduxjs/toolkit";

const addToCartSlice = createSlice({
  name: "addToCard",
  initialState: {
    productsCart: [],
  },
  reducers: {
    addItem: (state, { payload }) => {
      const check = state.productsCart.findIndex((e) => e._id === payload._id); // tim ra phan tu dung dau tien
      if (check === -1) {
        state.productsCart.push(payload);
      } else {
        // tim phtu dung trong cac phan tu cung id
        /*
        - cung size
        - khac size
        */
        const id = state.productsCart.findIndex(
          (e) => e._id === payload._id && e.size === payload.size,
        );
        if (id === -1) {
          state.productsCart.push(payload);
        } else {
          const pro = state.productsCart[id];
          pro.quantity += payload.quantity;
        }
      }
    },
    increQuantity: (state, { payload }) => {
      const index = state.productsCart.findIndex(
        (e) => e._id === payload._id && e.size === payload.size,
      );
      const pro = state.productsCart[index];
      if (pro.stock > pro.quantity) pro.quantity += 1;
    },
    decreQuantity: (state, { payload }) => {
      const index = state.productsCart.findIndex(
        (e) => e._id === payload._id && e.size === payload.size,
      );
      const pro = state.productsCart[index];

      if (pro.quantity > 1) pro.quantity -= 1;
    },
    removeItem: (state, { payload }) => {
      const index = state.productsCart.findIndex(
        (e) => e._id === payload._id && e.size === payload.size,
      );
      state.productsCart.splice(index, 1);
    },
  },
});

export default addToCartSlice;
export const { addItem, removeItem, increQuantity, decreQuantity } =
  addToCartSlice.actions;

export const allItemsCart = (state) => state.cart.productsCart;
