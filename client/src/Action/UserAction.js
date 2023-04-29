import axios from "axios";
import { loginRoute, registerRoute } from './../Utils/APIRoutes';


export const registerUser = (user) => async (dispatch) => {
    dispatch({ type: "USER_REGISTER_REQUEST" });
    try {
        let userCheck = await axios.post(registerRoute, user);
        if (userCheck.data.Message) {
            dispatch({ type: "USER_REGISTER_SUCCESS" });
            window.location.href = "/";
        }
    } catch (error) {
        dispatch({ type: "USER_REGISTER_FAIL", payload: error });
    }
};


export const loginUser = (user) => async (dispatch) => {
    dispatch({ type: "USER_LOGIN_REQUEST" });
    try {
        const response = await axios.post(loginRoute, user);
        dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
        localStorage.setItem("UserToken", JSON.stringify(response.data));
    } catch (error) {
        dispatch({ type: "USER_LOGIN_FAIL", payload: error });
    }
};

