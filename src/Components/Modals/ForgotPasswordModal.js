import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions, resetPassword } from "../../store/auth/auth-slice";
import { useFormik } from "formik";
import  { ForgotValidation }  from '../Global/ValidationHelper';
import { StartProcessing } from "../Global/Helper";


const ForgotPasswordModal = (props) => {

    const dispatch   = useDispatch();
   
    const openModal = () => {
        $('#forgot-modal').modal('toggle');
        dispatch(authActions.showModal('Login'));
    }

    const formik =  useFormik({
        initialValues: { Email:'', Password:''},
        validate: ForgotValidation,
        onSubmit: (values) => {
            const btn = document.getElementById('submit-btn');
            StartProcessing(btn)
            dispatch( resetPassword( values ) ) //Forgot Action Creator 
        }
    });

    useEffect(() => {
        $('#forgot-modal').modal({ backdrop: 'static'});
        $('#forgot-modal').on('hidden.bs.modal',function(){ 
            props.onDismissModal( 'Forgot-Password' )
        })
        $('#forgot-modal').modal('toggle');
    }, [props.show])

    return(<>
        <div className="modal fade "  tabIndex="-1" id="forgot-modal"  style={{display:'block'}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="row mb-3">
                            <div className="col-10">
                                <div className="text-center">
                                    <h2 className="text-dark ms-20"> Reset Your Password </h2>
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
                                    <span className=" ms-1 link-primary fw-bolder showPointer" onClick={openModal}> Sign in here </span>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    </>)
}


export default ForgotPasswordModal;