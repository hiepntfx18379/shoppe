import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "condition",
  initialState: {
    size: [],
    price: [],
    brand: [],
    listProduct: [],
  },
  reducers: {
    filterFollowSize: (state, action) => {
      if (action.payload.checked) {
        state.size.push(action.payload.checkedValue);
      } else {
        const i = state.size.indexOf(action.payload.checkedValue);
        state.size.splice(i, 1);
      }
    },
    filterFollowPrice: (state, action) => {
      if (action.payload.checked) {
        state.price.push(action.payload.checkedValue);
      } else {
        const i = state.price.indexOf(action.payload.checkedValue);
        state.price.splice(i, 1);
      }
    },
    filterFollowBrand: (state, action) => {
      if (action.payload.checked) {
        state.brand.push(action.payload.checkedValue);
      } else {
        const i = state.brand.indexOf(action.payload.checkedValue);
        state.brand.splice(i, 1);
      }
    },
    getAllProducts: (state, action) => {
      state.listProduct = [...action.payload.products];
    },
  },
});

export const {
  filterFollowSize,
  filterFollowBrand,
  filterFollowPrice,
  getAllProducts,
} = filterSlice.actions;
export default filterSlice;

export const allProducts = (state) => state.products.listProduct;
export const getConditionSize = (state) => state.products.size;
export const getConditionPrice = (state) => state.products.price;
export const getConditionBrand = (state) => state.products.brand;

export const filterProductsFollowConditions = createSelector(
  allProducts,
  getConditionSize,
  getConditionBrand,
  getConditionPrice,
  (allPro, sizes, prices, brands) => {
    /*
    if (sizes.length > 0) {
      for (let pro of allPro) {
        for (let size of sizes) {
          if (pro.list_size.includes(size)) {
            listAfter.push(pro);
            break;
          } else {
            continue;
          }
        }
      }
    } else if (prices.length > 0) {
      for (let pro of allPro) {
        for (let price of prices) {
          if (pro.list_size.includes(price)) {
            listAfter.push(pro);
            break;
          } else {
            continue;
          }
        }
      }
    } else if (brands.length > 0) {
      for (let pro of allPro) {
        for (let brand of brands) {
          if (pro.list_size.includes(brand)) {
            listAfter.push(pro);
            break;
          } else {
            continue;
          }
        }
      }
    }
    */
    if (sizes.length === 0 && prices.length === 0 && brands.length === 0) {
      return allPro;
    } else {
      let listAfter = [];
      let arange = [
        { sizes: "sizes", value: sizes.length },
        { prices: "prices", value: prices.length },
        { brands: "brands", value: brands.length },
      ];

      let index = arange.find((x) => x.value !== 0);
      for (let pro of allPro) {
        for (let price of Object.keys(arange[index])[0]) {
          if (pro.list_size.includes(price)) {
            listAfter.push(pro);
            break;
          } else {
            continue;
          }
        }

        return listAfter;
      }
    }
  },
);
