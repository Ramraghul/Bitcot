import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from "@redux-devtools/extension";
import { loginUserReducer, registerUserReducer } from '../Reducer/UserReducer';//User Reducers;
import { getAllProductReducer,addProductReducer,getProductByIdReducer } from '../Reducer/ProductReducer';//Product Reducers;


const rootReducer = combineReducers({
  //User combine;
  loginUserReducer: loginUserReducer,
  registerUserReducer: registerUserReducer,
  //product Combine;
  getAllProductReducer: getAllProductReducer,
  addProductReducer:addProductReducer,
  getProductByIdReducer:getProductByIdReducer
});


const initialState = {
  getAllProductReducer: {
    products: [],
  },
  // getProduct: {
  //   product: {}
  // },
};

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
