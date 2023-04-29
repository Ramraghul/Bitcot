import axios from "axios";
import Swal from 'sweetalert2';
import { getProductData, addNewProduct, getProductId, updatesProduct, deleteProduct } from './../Utils/APIRoutes'

//conformation;
//Alert function;
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


//Get all Product Action;
export const getAllProduct = () => async (dispatch) => {
    dispatch({ type: "GET_PRODUCT_REQUEST" });
    try {
        const response = await axios.get(getProductData);
        dispatch({ type: "GET_PRODUCT_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "GET_PRODUCT_FAIL", payload: error });
    }
};

const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
};

//Create New product;
export const addProduct = (product) => async (dispatch) => {
    dispatch({ type: "ADD_PRODUCT_REQUEST" });
    try {
        const response = await axios.post(addNewProduct, { product }, config);
        dispatch({ type: "ADD_PRODUCT_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "ADD_PRODUCT_FAIL", payload: error });
    }
};

//Get particular product using By ID;
export const getProductById = (productId) => async (dispatch) => {
    dispatch({ type: "GET_PRODUCTBYID_REQUEST" });
    try {
        const response = await axios.post(getProductId, { productId });
        dispatch({ type: "GET_PRODUCTBYID_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "GET_PRODUCTBYID_FAIL", payload: error });
    }
};


export const updateProduct = (updatedProduct) => async (dispatch) => {
    dispatch({ type: "UPDATE_PRODUCTBYID_REQUEST" });
    try {
        const response = await axios.put(updatesProduct, { updatedProduct });
        dispatch({ type: "UPDATE_PRODUCTBYID_SUCCESS", payload: response.data });
        // window.location.href = "/admin/pizzalist";
    } catch (error) {
        dispatch({ type: "UPDATE_PRODUCTBYID_FAIL", payload: error });
    }
};

export const deleteProductById = (productId) => async (dispatch) => {
    try {
        let responce = await axios.post(deleteProduct, { id: productId });
        if (responce.data) {
            Toast.fire({ icon: 'success', title: `successfully product deleted` })
            setTimeout(() => {
                window.location.href = "/portal";
            }, 1000);
        }

    } catch (error) {
        Toast.fire({ icon: 'error', title: `something went wrong` })
    }
};