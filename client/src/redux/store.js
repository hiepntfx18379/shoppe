import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "../components/see_more/left/filterSlice";
import addToCartSlice from "../components/home/product/product.slide";
import confirmCartSlide from "../components/cart/cart.slide";
import userSlide from "../components/user/user.slide";
import productsHomeSlide from "../components/home/productsHome.slide";

export const store = configureStore({
  reducer: {
    products: filterSlice.reducer,
    cart: addToCartSlice.reducer,
    checkout: confirmCartSlide.reducer,
    user: userSlide.reducer,
    productsHome: productsHomeSlide.reducer,
  },
});
