import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions, postSignup } from "../../store/auth/auth-slice";
import { useFormik } from "formik";
import { SignupValidation } from "../Global/ValidationHelper";
import { StartProcessing, StopProcessing } from "../Global/Helper";
import { uiActions } from "../../store/ui/ui-slice";


const SignupModal = (props) => {

    const dispatch     = useDispatch();
    const userType   = useSelector(s => s.uiReducer.signUpUser);

    const openLoginModal = () => {
        $('#signup-modal').modal('toggle');
        dispatch(authActions.showModal('Login'))
    }

    const onSelectUserType = (type) =>{
        dispatch(uiActions.setsignUpUser(type));
    }

    const formik =  useFormik({
        initialValues: {Firstname:'', Lastname:'', Email:'', Password:''},
        validate: (values) => SignupValidation(values, userType),
        onSubmit: (values) => {
            const btn = document.getElementById('signup-btn');
            StartProcessing(btn)
            dispatch( postSignup({...values,  Usertype : userType }) ) //Signup Action Creator 
        }
    });  

    useEffect(() => {
        $('#signup-modal').modal({ backdrop: 'static'});
        $('#signup-modal').on('hidden.bs.modal',function(){ 
            props.onDismissModal('Signup')
            onSelectUserType(false);
        })
        $('#signup-modal').modal('toggle');
    }, [props.show])

    return(<>
        <div className="modal fade "  tabIndex="-1" id="signup-modal"  style={{display:'block'}}>
            <div className="modal-dialog mw-600px">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="row mb-3">
                            <div className="col-10">
                                <div className="text-center">
                                    <h2 className="text-dark ms-20"> Create an Account </h2>
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
                        {userType?(
                        <>
                            {(userType == 'host')?(
                                <form id="signup-form" className="p-2 pt-0" onSubmit={formik.handleSubmit}>      
                                    <div className="row mb-5">
                                        <div className="col">
                                            <div className="fs-5 text-muted fw-bold">
                                                "Your vision. Our innovation: NK Mangalam"
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-md-6 col-12">
                                            <input 
                                                type="text" 
                                                id="Firstname"
                                                name="Firstname"                                         
                                                className={`form-control ${formik.errors.Firstname && 'is-invalid'}`}
                                                placeholder="Firstname" 
                                                value={formik.values.Firstname}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.Firstname && (<div className="error-message"> {formik.errors.Firstname} </div>)}
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <input 
                                                type="text" 
                                                id="Lastname"
                                                name="Lastname"                                         
                                                className={`form-control ${formik.errors.Lastname && 'is-invalid'}`}
                                                placeholder="Lastname" 
                                                value={formik.values.Lastname}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.Lastname && (<div className="error-message"> {formik.errors.Lastname} </div>)}
                                        </div>
                                    </div>
                                    <div className="row mb-5">
                                        <div className="col-md-6 col-12">
                                            <input 
                                                type="text" 
                                                id="Email"
                                                name="Email"                                         
                                                className={`form-control ${formik.errors.Email && 'is-invalid'}`}
                                                placeholder="Email" 
                                                value={formik.values.Email}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.Email && (<div className="error-message"> {formik.errors.Email} </div>)}
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <input 
                                                type="text" 
                                                id="Phone"
                                                name="Phone"                                         
                                                className={`form-control ${formik.errors.Phone && 'is-invalid'}`}
                                                placeholder="Contact No" 
                                                value={formik.values.Phone}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.Phone && (<div className="error-message"> {formik.errors.Phone} </div>)}
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col">
                                            <input 
                                                type={"text"} 
                                                id="Password"                                         
                                                name="Password"                                         
                                                className={`form-control ${formik.errors.Password && 'is-invalid'}`}
                                                placeholder="Create Password" 
                                                value={formik.values.Password}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.Password && (<div className="error-message"> {formik.errors.Password} </div>)}
                                        </div>
                                    </div>

                                    {/* <div className="row">
                                        <div className="col">
                                            <div className="d-flex align-items-center pt-2">
                                                <div className="form-check form-check-custom form-check-solid me-5">
                                                    <input className="form-check-input" type="checkbox" value="email" />
                                                    <span className="form-check-label" >
                                                    Remember
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="row mt-5">
                                        <div className="col">
                                            <span id="signup-btn" className="btn btn-primary btn-sm" onClick={formik.handleSubmit}> Signup </span>
                                        </div>
                                    </div>
                                </form>
                            ):(
                                <form id="signup-form" className="p-2" onSubmit={formik.handleSubmit}>       
                                    <div className="row mb-5">
                                        <div className="col-md-6 col-12">
                                        
                                            <input 
                                                type="text" 
                                                id="Firstname"
                                                name="Firstname"                                         
                                                className={`form-control ${formik.errors.Firstname && 'is-invalid'}`}
                                                placeholder="Firstname" 
                                                value={formik.values.Firstname}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.Firstname && (<div className="error-message"> {formik.errors.Firstname} </div>)}
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <input 
                                                type="text" 
                                                id="Lastname"
                                                name="Lastname"                                         
                                                className={`form-control ${formik.errors.Lastname && 'is-invalid'}`}
                                                placeholder="Lastname" 
                                                value={formik.values.Lastname}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.Lastname && (<div className="error-message"> {formik.errors.Lastname} </div>)}
                                        </div>
                                    </div>
                                    <div className="row mb-5">
                                        <div className="col">
                                            <input 
                                                type="text" 
                                                id="Email"
                                                name="Email"                                         
                                                className={`form-control ${formik.errors.Email && 'is-invalid'}`}
                                                placeholder="Email" 
                                                value={formik.values.Email}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.Email && (<div className="error-message"> {formik.errors.Email} </div>)}
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col">
                                            <input 
                                                type={"text"} 
                                                id="Password"                                         
                                                name="Password"                                         
                                                className={`form-control ${formik.errors.Password && 'is-invalid'}`}
                                                placeholder="Create Password" 
                                                value={formik.values.Password}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.Password && (<div className="error-message"> {formik.errors.Password} </div>)}
                                        </div>
                                    </div>

                                    {/* <div className="row">
                                        <div className="col">
                                            <div className="d-flex align-items-center pt-2">
                                                <div className="form-check form-check-custom form-check-solid me-5">
                                                    <input className="form-check-input" type="checkbox" value="email" />
                                                    <span className="form-check-label" >
                                                    Remember
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="row mt-5">
                                        <div className="col">
                                            <span id="signup-btn" className="btn btn-primary btn-sm" onClick={formik.handleSubmit} > Signup </span>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </>):(
                            <div className="row p-5 ">
                                <div className="col"></div>
                                <div className="col-5">
                                    <div className="card card-signup text-center">
                                        <div className="card-body " onClick={()=> onSelectUserType('host')}>
                                            <h6  className="text-primary"> Become a host </h6>
                                            <p className="text-muted mb-0"> List your services </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="card card-signup text-center">
                                        <div className="card-body" onClick={()=> onSelectUserType('user')}>
                                            <h6 className="text-primary"> Signup as user </h6>
                                            <p className="text-muted mb-0"> Find services </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col"></div>
                            </div>
                        )}
                        <div className="row mt-10">
                            <div className="col">
                                <div className="text-gray-400 fw-bold fs-6"> Already have an account?
                                    <span className="ms-1 link-primary fw-bolder" onClick={openLoginModal}> Sign in here </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}


export default SignupModal;