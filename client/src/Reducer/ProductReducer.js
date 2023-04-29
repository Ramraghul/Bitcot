//Get all Product Reducer;
export const getAllProductReducer = (state = { product: [] }, action) => {
    switch (action.type) {
        case "GET_PRODUCT_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_PRODUCT_SUCCESS":
            return {
                product: action.payload,
                loading: false,
            };
        case "GET_PRODUCT_FAIL":
            return {
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};


//Add new product Reducer;
export const addProductReducer = (state = {}, action) => {
    switch (action.type) {
        case "ADD_PRODUCT_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "ADD_PRODUCT_SUCCESS":
            return {
                success: true,
                loading: false,
            };
        case "ADD_PRODUCT_FAIL":
            return {
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};


//Get product by ID;
export const getProductByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_PRODUCTBYID_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_PRODUCTBYID_SUCCESS":
            return {
                product: action.payload,
                loading: false,
            };
        case "GET_PRODUCTBYID_FAIL":
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export const updateProductByIdReducer = (state = {},action) => {
    switch (action.type) {
        case "UPDATE_PRODUCTBYID_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "UPDATE_PRODUCTBYID_SUCCESS":
            return{
                updatesuccess: true,
                updateloading: false,
            };
        case "UPDATE_PRODUCTBYID_FAIL":
            return {
                updateloading: false,
                updateerror : action.payload,
            };
        default: 
        return state;
    }
};