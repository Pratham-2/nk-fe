import React, { useState } from 'react';
import * as Yup            from 'yup';
import { useDispatch }     from "react-redux";
import { useFormik }       from 'formik'
import { QuestionSection } from '../LandingPage/Landingpage';
import { StartProcessing } from "./Helper";
import SocialComp          from './SocialComp';
import { onPostContact } from '../../store/utils/utils-slice';

const Contact = () => {

    const dispatch = useDispatch();
    
    const initialValues = { Name: '', Email:  '', Subject: '', Message: '' }

    const validationSchema = Yup.object({
        Name    : Yup.string().required('Please enter your name'),
        Email   : Yup.string().email('Invalid email').required('Please enter your email'),
        Subject : Yup.string().required('Please enter the subject'),
        Message : Yup.string().required('Please specify your message'),
    })

    const onSubmit = (values) => {
        const btn  = document.getElementById('btnPostContact');
        StartProcessing(btn); 
        
        dispatch( onPostContact({data : values, btn}))
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    return(<>
    <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
        <div className="container-xxl" id="kt_content_container">
            <div className="card">
                <div className="card-body p-lg-17">
                    <div className="row mb-3">
                        <div className="col-md-12 pe-lg-10">
                            
                            <form className="form mb-15 fv-plugins-bootstrap5 fv-plugins-framework text-left" id="contactForm"  onSubmit={formik.handleSubmit}>
                                <h1 className="fw-bolder text-dark mb-9"> Send Us Email </h1>
                                
                                <div className="row mb-5">
                                    <div className="col-md-6 fv-row fv-plugins-icon-container">
                                        <label className="fs-5 fw-bold mb-2"> <span className='required'> Name</span> </label>
                                        <input type="text"  name="Name" 
                                            className={`form-control form-control-solid ${(formik.touched.Name && formik.errors.Name) && 'is-invalid' }`}
                                            placeholder="Your Name" 
                                            value={formik.values.Name}
                                            onBlur={formik.handleBlur}           
                                            onChange={formik.handleChange}
                                        />
                                        {(formik.touched.Name && formik.errors.Name) ? <div className="error">{formik.errors.Name}</div> : null}
                                    </div>
                                    
                                    <div className="col-md-6 fv-row fv-plugins-icon-container">
                                        <label className="fs-5 fw-bold mb-2"> <span className='required'> Email </span> </label>
                                        <input type="email"  name="Email" 
                                            className={`form-control form-control-solid ${(formik.touched.Email && formik.errors.Email) && 'is-invalid' }`}
                                            placeholder="Your Email" 
                                            value={formik.values.Email}
                                            onBlur={formik.handleBlur}           
                                            onChange={formik.handleChange}
                                        />
                                        {(formik.touched.Email && formik.errors.Email) ? <div className="error">{formik.errors.Email}</div> : null}
                                    </div>
                                </div>
                                
                                <div className="d-flex flex-column mb-5 fv-row">
                                    <label className="fs-5 fw-bold mb-2"> <span className='required'> Subject </span> </label>
                                    <input type="text"  name="Subject" 
                                        className={`form-control form-control-solid ${(formik.touched.Subject && formik.errors.Subject) && 'is-invalid' }`}
                                        placeholder="Your Subject" 
                                        value={formik.values.Subject}
                                        onBlur={formik.handleBlur}           
                                        onChange={formik.handleChange}
                                    />
                                    {(formik.touched.Subject && formik.errors.Subject) ? <div className="error">{formik.errors.Subject}</div> : null}
                                </div>
                                
                                <div className="d-flex flex-column mb-10 fv-row fv-plugins-icon-container">
                                    <label className="fs-6 fw-bold mb-2">  <span className='required'> Message </span> </label>
                                    <textarea  rows="6" name="Message" placeholder=""
                                        className={`form-control form-control-solid ${(formik.touched.Message && formik.errors.Message) && 'is-invalid' }`}
                                        value={formik.values.Message}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    ></textarea>
                                    {(formik.touched.Message && formik.errors.Message) ? <div className="error">{formik.errors.Message}</div> : null}
                                </div>
                                
                                <button type="button" className="btn btn-primary" id="btnPostContact" onClick={formik.handleSubmit}>
                                   Send Feedback 
                                </button>
                                
                                <div></div>
                            </form>

                        </div>
                    </div>
                    
                    <QuestionSection />

                    {/* <div className="row g-5 mb-5 mb-lg-15">
                        <div className="col-sm-6 pe-lg-10">
                            <div className="text-center bg-light card-rounded d-flex flex-column justify-content-center p-10 h-lg-100">
                                <h1 className="text-dark fw-bolder my-5">Let’s Speak</h1>
                                <div className="text-gray-700 fw-bold fs-2">1 (833) 597-7538</div>
                            </div>
                        </div>
                        
                        <div className="col-sm-6 ps-lg-10">
                            <div className="text-center bg-light card-rounded d-flex flex-column justify-content-center p-10 h-lg-100">
                                <span className="svg-icon svg-icon-3tx svg-icon-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" fill="black"></path>
                                        <path d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" fill="black"></path>
                                    </svg>
                                </span>
                                
                                <h1 className="text-dark fw-bolder my-5">Our Head Office</h1>
                                <div className="text-gray-700 fs-3 fw-bold">Churchill-laan 16 II, 1052 CD, Amsterdam</div>
                            </div>
                        </div>
                    </div> */}
                    
                    <SocialComp />
                    
                </div>
                
            </div>
            
        </div>
	
    </div>
    </>)
}


export default Contact