import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";
import getConfig from "../../utils/getConfig";
export const cartSlice = createSlice({
  name: "Cart",
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },
  },
});
export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;

export const getProductCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));

  axios
    .get("https://e-commerce-api-v2.academlo.tech/api/v1/cart", getConfig())
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((error) => console.error(error))
    .finally(() => dispatch(setIsLoading(false)));
};
