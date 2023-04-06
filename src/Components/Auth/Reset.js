import React from "react";
import { useDispatch } from "react-redux";
import { authActions, resetPassword } from "../../store/auth/auth-slice";
import { useFormik } from "formik";
import  { ForgotValidation }  from '../Global/ValidationHelper';
import { StartProcessing } from "../Global/Helper";
import { useHistory } from "react-router-dom";
import logo from "../../Assets/logos/logo_svg.svg";


const Reset = () => {
    const history 	= useHistory()
    const dispatch  = useDispatch();

    const pushToPath = (path) => {
		if(!!path)
			history.push(`/${path.toLowerCase()}`) 
		else
			history.push('/')
	};

    const formik =  useFormik({
        initialValues: { Email:'', Password:''},
        validate: ForgotValidation,
        onSubmit: (values) => {
            const btn = document.getElementById('submit-btn');
            StartProcessing(btn)
            dispatch( resetPassword( values ) ) //Forgot Action Creator 
        }
    });

    return(<>
        <div className="d-flex flex-column flex-column-fluid p-10 pt-0 pb-lg-20">
            <span className="mb-4">               
                <img alt="Logo" src={logo} className="h-100" onClick={() => pushToPath()} />
            </span>

            <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto border-r15" >	
                <div className="row mb-5">
                    <div className="col-12">
                        <div className="text-center">
                            <h2 className="text-dark"> Reset Your Password </h2>
                        </div>
                    </div>
                </div>

                <form id="forgot-form" className="p-2" onSubmit={formik.handleSubmit}>       
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
                    <div className="row mt-5">
                        <div className="col">
                            <button type="submit" id='submit-btn' className="btn btn-primary btn-sm "> Reset </button>
                        </div>
                    </div>
                </form>

                <div className="row mt-5">
                    <div className="col">
                        <div className="text-gray-400 fw-bold fs-6"> Already have an account? 
                            <span className="ms-1 link-primary fw-bolder" onClick={()=> pushToPath('login')}> Sign in here </span>
                        </div>
                    </div>
                </div>
              
            </div>
        </div>        
    </>)
}

export default Reset;