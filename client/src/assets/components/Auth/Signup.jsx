import React from 'react'
import Logo from '../../images/thumbnails/Logo.svg'
import { registerUser } from '../../../Action/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useFormik } from "formik";
import * as Yup from 'yup';

function Signup() {
    //Dispatch;
    const dispatch = useDispatch();

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

    // Yup validation;
    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: Yup.string()
            .required('Please confirm your password')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    // Formik validation;
    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            dispatch(registerUser(values));
        },
    });



    const registerState = useSelector((state) => state.registerUserReducer);
    const { error, success, loading } = registerState;

    if (error) {
        Toast.fire({ icon: 'error', title: `${error.response.data.Message}` })
        window.location.reload()
    } if (success) {
        Toast.fire({ icon: 'success', title: `Welcome` })
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
                                            <div className="card_content_wrap text-center"></div>
                                            <div className="card_content_wrap text-center">
                                                <div className="logo_wrap">
                                                    <img src={Logo} alt="logo" />
                                                    <h6>Create an account</h6>
                                                </div>
                                                <form onSubmit={formik.handleSubmit}>
                                                    <div className="form_wrapper">
                                                        <div className="mb-4">
                                                            <label htmlFor="exampleFormControlInput1" className="form-label label_modify"><span className="mendatary">*</span>Email</label>
                                                            <input type="email" name="email" placeholder="demo@gmail.com" className="form-control input_modify" id="exampleFormControlInput1" value={formik.values.email} onChange={formik.handleChange} required />
                                                            {formik.errors.email && formik.touched.email && (<div style={{color:"red"}}>{formik.errors.email}</div>)}
                                                        </div>
                                                        <div className="mb-4">
                                                            <label htmlFor="exampleFormControlInput2" className="form-label label_modify"> <span className="mendatary">*</span> Password</label>
                                                            <input type="password" placeholder="*****" name="password" className="form-control input_modify" id="exampleFormControlInput2" value={formik.values.password} onChange={formik.handleChange} required />
                                                            {formik.errors.password && formik.touched.password && ( <div style={{color:"red"}}>{formik.errors.password}</div>)}
                                                        </div>
                                                        <div className="mb-4">
                                                            <label htmlFor="exampleFormControlInput3" className="form-label label_modify"> <span className="mendatary">*</span>Confirm Password</label>
                                                            <input type="password" name="confirmPassword" className="form-control input_modify" id="exampleFormControlInput3" placeholder="*****" value={formik.values.confirmPassword} onChange={formik.handleChange} />
                                                            {formik.errors.confirmPassword && formik.touched.confirmPassword && ( <div style={{color:"red"}}>{formik.errors.confirmPassword}</div>)}
                                                        </div>
                                                        <div className="mb-0 auth_btn"><button type="submit" className="theme-btn-primary theme-btn" >Sign Up</button></div>
                                                        <div className="already"> <a href="/">Already have Account</a></div>
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
        </>
    )
}

export default Signup