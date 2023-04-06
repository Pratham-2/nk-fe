import React, { useEffect } from "react";



const BookingModal = (props) => {

    useEffect(() => {
        $('#enquiry-modal').modal({ backdrop: 'static' });
        $('#enquiry-modal').on('hidden.bs.modal', () => props.onDismissModal("booking"));
        $('#enquiry-modal').modal('toggle');
    }, [props.show])

    return (<>
        <div className="modal fade " tabIndex="-1" id="enquiry-modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"> Booking </h5>

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

                        <div className="row mb-4">
                            <div className="col">
                                <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                    <span className="required">Name</span>
                                </label>

                                <input
                                    type="text"
                                    name="Name"
                                    className="form-control "
                                    placeholder="Your Name"
                                />
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
                                    className="form-control"
                                    placeholder="Your Email"
                                />
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
                                    className="form-control "
                                    placeholder="Contact No"
                                />
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col">
                                <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                    <span className="required"> Enquiry Details </span>
                                </label>
                                <textarea
                                    className="form-control "
                                    rows="3"
                                    name="target_details"
                                    placeholder="Type Target Details" />
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col ">
                                <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                    <span className="required"> Select Date</span>
                                </label>
                                <input type='date' className="form-control" />

                            </div>

                        </div>

                        <div className="row">
                            <div className="col">
                                <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                    <span className=""> Send me info via </span>
                                </label>



                                <div className="d-flex align-items-center pt-2">
                                    <div className="form-check form-check-custom form-check-solid me-5">
                                        <input className="form-check-input" type="checkbox" value="email" />
                                        <span className="form-check-label" >
                                            Email
                                        </span>
                                    </div>
                                    <div className="form-check form-check-custom form-check-solid">
                                        <input className="form-check-input" type="checkbox" value="phone" />
                                        <span className="form-check-label" >
                                            Phone
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Send Enquiry</button>
                    </div>
                </div>
            </div>
        </div>

    </>)
}


export default BookingModal