import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions, postLogin } from "../../store/auth/auth-slice";
import { useFormik } from "formik";
import  { LoginValidation }  from '../Global/ValidationHelper';
import { StartProcessing } from "../Global/Helper";


const LoginModal = (props) => {

    const dispatch     = useDispatch();
    const showPassword =  useSelector( s => s.authReducer.showPassword);
    // const loginData    = useSelector( s => s.authReducer.loginData );

    const openModal = (modal) => {
        $('#login-modal').modal('toggle');
        dispatch(authActions.showModal(modal));
    }

    const formik =  useFormik({
        initialValues: { Email:'', Password:''},
        validate: LoginValidation,
        onSubmit: (values) => {
            const btn = document.getElementById('login-btn');
            StartProcessing(btn)
            const {Email, Password} = values;
            dispatch( postLogin( {data : {Email, Password}, btn} ) ) //Login Action Creator 
        }
    });

    const setShowPassword = () => dispatch(authActions.showPassword());    
    // const setLoginDetails = (key , value) =>{ dispatch(authActions.setLoginDetails({ key, value }))}

    useEffect(() => {
        $('#login-modal').modal({ backdrop: 'static'});
        $('#login-modal').on('hidden.bs.modal',function(){ 
            props.onDismissModal( 'Login' )
        })
        $('#login-modal').modal('toggle');
    }, [props.show])

    return(<>
        <div className="modal fade"  tabIndex="-1" id="login-modal"  style={{display:'block'}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="row mb-3">
                            <div className="col-10">
                                <div className="text-center">
                                    <h2 className="text-dark ms-20"> Sign In to NK Mangalam </h2>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="btn btn-icon btn-sm btn-active-light-warning ms-2" data-bs-dismiss="modal" aria-label="Close">
                                    <span className="svg-icon svg-icon-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black"></rect>
                                            <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black"></rect>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <form id="login-form" className="p-2" onSubmit={formik.handleSubmit}>       
                            <div className="row mb-5">
                                <div className="col">
                                    <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                        <span className="required"> Email </span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="Email"
                                        name="Email"                                         
                                        className={`form-control ${formik.errors.Email && 'is-invalid'}`}
                                        placeholder="Your email" 
                                        value={formik.values.Email}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.Email && (<div className="error-message"> {formik.errors.Email} </div>)}
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                        <span className="required"> Password </span>
                                    </label>
                                    <input 
                                        type={!showPassword ? "password" : "text"} 
                                        id="Password"                                         
                                        name="Password"                                         
                                        className={`form-control ${formik.errors.Password && 'is-invalid'}`}
                                        placeholder="Your password" 
                                        value={formik.values.Password}
                                        onChange={formik.handleChange}
                                    />
                                    <span className="btn btn-sm btn-icon position-absolute translate-middle top-54 end-0 me-3" onClick={setShowPassword}>
                                        {!showPassword ? <i className="bi bi-eye-slash fs-2"/> : <i className="bi bi-eye fs-2 "/>}
                                    </span>
                                    {formik.errors.Password && (<div className="error-message"> {formik.errors.Password} </div>)}
                                    
                                </div>
                            </div>
                            <div className="row mt-5 text-right">
                                <div className="col">
                                    <div className="text-gray-400 fw-bold fs-6">
                                        <span className="ms-1 link-hover-primary fw-bolder" onClick={()=> openModal('Forgot-Password')} > Forgot password ?</span>
                                    </div>
                                </div>
                            </div>
                           
                            <div className="row mt-5">
                                <div className="col">
                                    <button type="submit" id='login-btn' className="btn btn-primary btn-sm "> Login </button>
                                </div>
                            </div>
                        </form>
                        <div className="row mt-5">
                            <div className="col">
                                <div className="text-gray-400 fw-bold fs-6"> Don't have an account yet ?
                                    <span className=" ms-1 link-primary fw-bolder showPointer" onClick={()=> openModal('Signup')}> Create an Account</span>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    </>)
}


export default LoginModal;