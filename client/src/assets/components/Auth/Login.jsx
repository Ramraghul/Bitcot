import React from 'react';
import Logo from '../../images/thumbnails/Logo.svg'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../Action/UserAction';
import { useFormik } from "formik";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function Login() {
    //Dispatch
    const dispatch = useDispatch();

    //Navigation
    const navigation = useNavigate()

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

    //Login validation using Formik;
    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate: (values) => {
            let errors = {};

            if (values.email === "") {
                errors.email = "Please enter email";
            }
            if (values.password === "") {
                errors.password = "Please enter password";
            }

            return errors;
        },

        onSubmit: async (values) => {
            dispatch(loginUser(values));
        },
    });


    //Login reducer 
    const loginState = useSelector(state => state.loginUserReducer)
    const { loading, success, error } = loginState

    if(error){
        Toast.fire({ icon: 'error', title: `${error.response.data.Message}` })
        window.location.reload()
    }if(success){
        Toast.fire({ icon: 'success', title: `Welcome` })
        navigation('/portal')
    }
    


    return (
        <>
            <div className="App">
                <div id="wrapper">
                    <div className="page-wrapper auth_wrapper">
                        <div className="content-area-wrapper">
                            <div className="content-wrapper">
                                <div className="container">
                                    <div className="card products_blc">
                                        <div className="card-body">
                                            <div className="card_content_wrap text-center">
                                                <div className="card_content_wrap text-center">
                                                    <div className="logo_wrap">
                                                        <img src={Logo} alt="logo" />
                                                        <h6>Don’t have an account yet?<a className="signUpSpan" href="/Signup"> Sign Up</a></h6>
                                                    </div>
                                                    <form onSubmit={formik.handleSubmit}>
                                                        <div className="form_wrapper">
                                                            <div className="mb-4">
                                                                <label htmlFor="exampleFormControlInput1" className="form-label label_modify">
                                                                    <span className="mendatary">*</span>
                                                                    Email</label>
                                                                <input type="email" className={`form-control input_modify${formik.errors.email ? "border-danger" : ""}`} id="exampleFormControlInput1" name="email" placeholder="demo@demo.com" value={formik.values.email}  onChange={formik.handleChange} required />
                                                            </div>
                                                            <div className="mb-4"><label htmlFor="exampleFormControlInput2" className="form-label label_modify">
                                                                <span className="mendatary">*</span>
                                                                Password</label>
                                                                <input type="password" className={`form-control input_modify${formik.errors.password ? "border-danger" : ""}`}name="password" id="exampleFormControlInput2" placeholder="********" value={formik.values.password}  onChange={formik.handleChange} required />
                                                            </div>
                                                            <div className="mb-0 auth_btn"><button type="submit" className="theme-btn-primary theme-btn">Sign In</button></div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login