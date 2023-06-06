import { createSlice } from "@reduxjs/toolkit";
import {setIsLoading} from "./isLoading.slice"
import axios from "axios";

export const productsSlice = createSlice({
  name: "product",
  initialState: [],
  reducers: {
    setproducts: (state, action) => {
      return action.payload;
    },
  },
});

export const { setproducts } = productsSlice.actions;

export default productsSlice.reducer;

// redux thunk / middlewares
// se ejecutan entre el dispatch y la accion, permiten ejecutar dentro de ellos varios dispatch

/*export const myFunctionThunk = () => (dispatch) => {};

//tareas a realizar
dispatch(actionName1())
//Mas tareas
dispatch(actionName2())
dispatch(actionName3())
dispatch(actionName4())
dispatch(actionName5())*/

export const getProductThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/products")
    .then(resp =>{
      dispatch(setproducts(resp.data))
      console.log(resp.data)
    })
    .catch( error => console.error(error))
    .finally(() =>dispatch(setIsLoading(false)))//-> metodo qeu se ejecuta cuando la promesa es resuelta (no importa si fue satisfactoria o no)
}

export const filterProductThunk = (id) => dispatch =>{
  dispatch(setIsLoading(true))
  axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
  .then(resp => dispatch(setproducts(resp.data)))
  .catch( error => console.error(error))
  .finally(() =>dispatch(setIsLoading(false)))
}

export const filterNameProduct = (value) => dispatch =>{
  dispatch(setIsLoading(true))
  axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${value}`)
  .then(resp => dispatch(setproducts(resp.data)))
  .catch( error => console.error(error))
  .finally(() =>dispatch(setIsLoading(false)))
}