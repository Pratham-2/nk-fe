import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions, postSignup } from "../../store/auth/auth-slice";
import { useFormik } from "formik";
import  { SignupValidation }  from '../Global/ValidationHelper';
import { StartProcessing } from "../Global/Helper";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import logo from "../../Assets/logos/logo_svg.svg"



const Signup = () =>{

    const history 	   = useHistory()
    const dispatch     = useDispatch();

    const [userType , setUserType] = useState();
    
    const globalServices = useSelector(s => s.searchReducer.services);
    const globalCities   = useSelector(s => s.searchReducer.cities);
    const currentUser    = useSelector(s => s.authReducer.currentUser);
    

    useEffect(() => {   
        if(!!currentUser) history.push("/");
    },[currentUser])

    const pushToPath = (path) => {
		if(!!path)
			history.push(`/${path.toLowerCase()}`) 
		else
			history.push('/')
	};

    const onSelectUserType = (type) => setUserType(type);      
    
    const formik =  useFormik({
        initialValues: {Firstname:'', Lastname:'', Email:'', Password:'' },
        validate: (values) => SignupValidation(values, userType),
        onSubmit: (values) => {
            const btn = document.getElementById('signup-btn');
            StartProcessing(btn)
            dispatch( postSignup({...values,  Usertype : userType }) ) //Signup Action Creator 
        }
    });  

    return(<>
        <div className="d-flex flex-column flex-column-fluid p-10 pt-0 pb-lg-20">

            <span className="mb-4">               
                <img alt="Logo" src={logo} className="h-100" onClick={() => pushToPath()} />
            </span>

            <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto border-r15" >	

                <div className="row mb-3">
                    <div className="col-10">
                        <div className="text-center">
                            <h2 className="text-dark ms-20"> SignUp to NK Mangalam </h2>
                        </div>
                    </div>                   
                </div>

                {userType?(
                <>
                    {(userType == 'host')?(<>

                        <h4 className="text-primary mb-5"> Become a host </h4>

                        <form id="signup-form" className="p-2 pt-0" onSubmit={formik.handleSubmit}>      
                           
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
                                <div className="col-12">
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
                            <div className="row mb-5">
                                <div className="col-12">
                                    <input 
                                        id ="Phone"
                                        type ="text" 
                                        name ="Phone"                                         
                                        className ={`form-control ${formik.errors.Phone && 'is-invalid'}`}
                                        placeholder ="Contact No" 
                                        value ={formik.values.Phone}
                                        onChange ={formik.handleChange}
                                    />
                                    {formik.errors.Phone && (<div className="error-message"> {formik.errors.Phone} </div>)}
                                </div>
                            </div>
                            
                            <div className="row mb-4">
                                <div className="col">
                                    <Select  className={`form-control p-0 ${formik.errors.HostType?'is-invalid': ''} text-left`} classNamePrefix ="custom-select"
                                       placeholder="Host Type"  options = {globalServices} 
                                       onChange={value => formik.setFieldValue('HostType', value.value)}
                                    /> 
                                    {(formik.errors.HostType) ? <div className="error">{formik.errors.HostType}</div> : null}
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col">
                                    <Select  className={`form-control p-0 ${formik.errors.City?'is-invalid': ''} text-left`} classNamePrefix ="custom-select"
                                       placeholder="City"  options = {globalCities} 
                                       onChange={value => formik.setFieldValue('City', value.value)}
                                    /> 
                                    {(formik.errors.City) ? <div className="error">{formik.errors.City}</div> : null}
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
                            <div className="row mb-4">
                                <div className="col">
                                    <input 
                                        type={"text"} 
                                        id="ConfirmPassword"                                         
                                        name="ConfirmPassword"                                         
                                        className={`form-control ${formik.errors.Password && 'is-invalid'}`}
                                        placeholder="Confirm Password" 
                                        value={formik.values.ConfirmPassword}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.ConfirmPassword && (<div className="error-message"> {formik.errors.ConfirmPassword} </div>)}
                                </div>
                            </div>
                        
                            <div className="row mt-5">
                                <div className="col">
                                    <span id="signup-btn" className="btn btn-primary btn-sm" onClick={formik.handleSubmit}> Signup </span>
                                </div>
                            </div>
                        </form>
                    </>):(<>

                        <h4 className="text-primary mb-5">  Signup as user </h4>

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
                    </>)}
                </>):(                    
                    <div className="row">
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

export default Signup