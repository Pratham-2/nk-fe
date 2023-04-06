import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions, postLogin } from "../../store/auth/auth-slice";
import { useFormik } from "formik";
import  { LoginValidation }  from '../Global/ValidationHelper';
import { StartProcessing } from "../Global/Helper";
import { useHistory } from "react-router-dom";
import logo from "../../Assets/logos/logo_svg.svg";


const Login = () =>{

    const history 	   = useHistory()
    const dispatch     = useDispatch();

    const showPassword =  useSelector( s => s.authReducer.showPassword);
    // const loginData    = useSelector( s => s.authReducer.loginData );

    // const openModal = (modal) => {
    //     $('#login-modal').modal('toggle');
    //     dispatch(authActions.showModal(modal));
    // }

    const pushToPath = (path) => {
		if(!!path)
			history.push(`/${path.toLowerCase()}`) 
		else
			history.push('/')
	};

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

    return(<>
        <div className="d-flex flex-column flex-column-fluid p-10 pt-0 pb-lg-20">

            <span className="mb-4">               
                <img alt="Logo" src={logo} className="h-100" onClick={() => pushToPath()} />
            </span>

            <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto border-r15" >	

                <div className="row mb-3">
                    <div className="col-10">
                        <div className="text-center">
                            <h2 className="text-dark ms-20"> Sign In to NK Mangalam </h2>
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
                            <div className="input-group mb-5">                                
                                <input 
                                    type={!showPassword ? "password" : "text"} 
                                    id="Password"                                         
                                    name="Password"                                         
                                    className={`form-control ${formik.errors.Password && 'is-invalid'}`}
                                    placeholder="Your password" 
                                    value={formik.values.Password}
                                    onChange={formik.handleChange}
                                />
                                <span className="input-group-text " onClick={setShowPassword}>
                                    {!showPassword ? <i className="bi bi-eye-slash fs-2"/> : <i className="bi bi-eye fs-2 "/>}
                                </span>
                            </div>
                            {formik.errors.Password && (<div className="error-message"> {formik.errors.Password} </div>)}
                            
                        </div>
                    </div>
                    <div className="row mt-5 text-right">
                        <div className="col">
                            <div className="text-gray-400 fw-bold fs-6">
                                <span className="ms-1 link-hover-primary fw-bolder" onClick={()=> pushToPath('reset')} > Forgot password ?</span>
                                {/* <span className="ms-1 link-hover-primary fw-bolder" onClick={()=> openModal('Forgot-Password')} > Forgot password ?</span> */}
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
                            <span className=" ms-1 link-primary fw-bolder showPointer" onClick={()=> pushToPath('Signup')}> Create an Account</span>
                        </div>
                    </div>
                </div>


            </div>
        </div>        
    </>)
}

export default Login