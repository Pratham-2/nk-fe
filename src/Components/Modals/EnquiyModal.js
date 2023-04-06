import React,{ useEffect } from "react";
import { useFormik } from 'formik'
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import { onPostQuote } from "../../store/utils/utils-slice";
import { StartProcessing } from "../Global/Helper";

const EnquiryModal = (props) => {

    const dispatch = useDispatch();

    const {serviceData, serviceLink } = props;

    const initialValues = {
        Name: '', Email:  '', Contact: '', EnquiryDetails: '',
        EmailContact : false, PhoneContact : false,
    }

    const validationSchema = Yup.object({
        Name            : Yup.string().required('Please enter your name'),
        Email           : Yup.string().email('Invalid email').required('Please enter your email'),
        Contact         : Yup.string().required(' Contact required ').min(10).max(10),
        EnquiryDetails  : Yup.string().required(' Please specify your requirements'),
    })

    const onSubmit = (values) => {
        const btn = document.getElementById('btnPostQuote');

        const quoteData = {...values, 
            ServiceType : serviceLink , 
            ServiceID   : serviceData.ID, 
            VendorID    : serviceData.VendorID, 
            ServiceName : serviceData.Title, 
        }

        StartProcessing(btn); 
        dispatch( onPostQuote({data : quoteData, btn}))
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    useEffect(() => {
        $('#enquiry-modal').modal({ backdrop: 'static'});
        $('#enquiry-modal').on('hidden.bs.modal',() => props.onDismissModal("enquiry"));
        $('#enquiry-modal').modal('toggle');
    }, [props.show])

    return(<>
        <div className="modal fade "  tabIndex="-1" id="enquiry-modal"  style={{display:'block'}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"> Request Quote </h5>
                            
                        <div className="btn btn-icon btn-sm btn-active-light-warning ms-2" data-bs-dismiss="modal" aria-label="Close">
                            <span className="svg-icon svg-icon-1">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
									<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black"></rect>
									<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black"></rect>
								</svg>
							</span>
                        </div>
                    
                    </div>

                    <div className="modal-body">
                        <form id="enquiry-form" onSubmit={formik.handleSubmit}>     
                                    
                            <div className="row mb-4">
                                <div className="col">
                                    <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                        <span className="required">Name</span>
                                    </label>
                                
                                    <input 
                                        type="text" 
                                        name="Name"                                         
                                        className={`form-control ${(formik.touched.Name && formik.errors.Name) && 'is-invalid' }`}
                                        placeholder="Your Name" 
                                        value={formik.values.Name}
                                        onBlur={formik.handleBlur}           
                                        onChange={formik.handleChange}
                                    />
                                    {(formik.touched.Name && formik.errors.Name) ? <div className="error">{formik.errors.Name}</div> : null}
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-6 col-12">
                                    <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                        <span className="required">Email</span>
                                    </label>
                                
                                    <input 
                                        type="email" 
                                        name="Email"                                         
                                        placeholder="Your Email"
                                        className={`form-control ${(formik.touched.Email && formik.errors.Email) && 'is-invalid' }`} 
                                        value={formik.values.Email}
                                        onBlur={formik.handleBlur}           
                                        onChange={formik.handleChange}
                                    />
                                    {(formik.touched.Email && formik.errors.Email) ? <div className="error">{formik.errors.Email}</div> : null}
                                </div>
                                <div className="col-md-6 col-12 ">
                                    <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                        <span className="required">Contact No</span>
                                    </label>
                                
                                    <input 
                                        type="tel"
                                        name="Contact"                                         
                                        maxLength={10} 
                                        minLength={10} 
                                        placeholder="Contact No"  
                                        className={`form-control ${(formik.touched.Contact && formik.errors.Contact) && 'is-invalid' }`} 
                                        value={formik.values.Contact}
                                        onBlur={formik.handleBlur}           
                                        onChange={formik.handleChange}
                                    />
                                    {(formik.touched.Contact && formik.errors.Contact) ? <div className="error">{formik.errors.Contact}</div> : null}
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                        <span className="required"> Enquiry Details </span>
                                    </label>
                                    <textarea
                                    rows="3" 
                                    name="EnquiryDetails" 
                                    placeholder="Enter your requirements"
                                    className={`form-control ${(formik.touched.EnquiryDetails && formik.errors.EnquiryDetails) && 'is-invalid' }`} 
                                    value={formik.values.EnquiryDetails}
                                    onBlur={formik.handleBlur}           
                                    onChange={formik.handleChange}
                                    />
                                    {(formik.touched.EnquiryDetails && formik.errors.EnquiryDetails) ? <div className="error">{formik.errors.EnquiryDetails}</div> : null}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                        <span className=""> Send me info via </span>
                                    </label>

                                    <div className="d-flex align-items-center pt-2">
                                        <div className="form-check form-check-custom form-check-solid me-5">
                                            <input className="form-check-input" type="checkbox" name="EmailContact" 
                                                checked={formik.values.EmailContact}
                                                onChange={formik.handleChange}
                                            />
                                            <span className="form-check-label" >
                                            Email
                                            </span>
                                        </div>
                                        <div className="form-check form-check-custom form-check-solid">
                                            <input className="form-check-input" type="checkbox" name="PhoneContact"
                                                checked={formik.values.PhoneContact}
                                                onChange={formik.handleChange}
                                            />
                                            <span className="form-check-label" >
                                                Phone
                                            </span>
                                        </div>
                                            
                                    </div>
                                </div>
                            </div>
						
                        </form>    
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                        <button type="button" id="btnPostQuote" className="btn btn-primary" onClick={formik.handleSubmit}> Request Quote </button>
                    </div>
                </div>
            </div>
        </div>
       
    </>)
}


export default EnquiryModal