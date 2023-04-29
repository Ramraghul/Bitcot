export const host = "http://localhost:7000";

// Product Routes
export const getProductData = `${host}/product/product_data`;
export const addNewProduct = `${host}/product/new_product`;
export const getProductId = `${host}/product/product_data_by_ID`;
export const updatesProduct = `${host}/product/update_product`;
export const deleteProduct = `${host}/product/delete_product`;



// User Route
export const registerRoute = `${host}/user/new_user`;
export const loginRoute = `${host}/user/login`;