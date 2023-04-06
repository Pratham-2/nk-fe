import React, { useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getQuotes, updateQuoteStatus, deleteQuote } from "../../store/host/quote-slice";
import moment from "moment";
import Swal from "sweetalert2";


const DetailModal = (props) => {

    const { selectedQuote } = props
    const dispatch          = useDispatch();
    
    const [quoteData, setQuoteData] = useState();

    const markQuote = () => {
        if(!!quoteData) dispatch(updateQuoteStatus(quoteData.ID));
    }

    useEffect(() => {
        $('#quoteDetail-modal').modal({ backdrop: 'static'});
        $('#quoteDetail-modal').on('hidden.bs.modal',() => props.onDismissModal());
        $('#quoteDetail-modal').modal('toggle');
    }, [props.show])

    useEffect(() => {
        if(!!selectedQuote){
            setQuoteData(selectedQuote);
        }
    },[selectedQuote])
    return(<>
        <div className="modal fade "  tabIndex="-1" id="quoteDetail-modal"  style={{display:'block'}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"> Quote Details </h5>
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
                        {quoteData &&  (<>
                            <div className="card card-flush mb-5">
                                <div className="card-body p-0">
                                    <div className="d-flex align-items-center mb-5">
                                        <div className="symbol symbol-60px symbol-circle me-1 d-flex align-items-center justify-content-center">
                                            <span className="badge badge-primary badge-circle badge-lg badge-45"> {quoteData.Name.slice(0,1)} </span>
                                        </div>
                                        <div className="d-flex flex-column flex-grow-1 text-left">
                                            <span  className="fs-4 fw-bolder text-gray-900 "> {quoteData.Name } </span>
                                            <span  className="fw-bold text-gray-600 "> {quoteData.Email} </span>
                                        </div>
                                        <div className="d-flex flex-column pe-4 text-left">
                                            <span  className="fw-bolder text-gray-900  "> 
                                                Contact: {quoteData.Contact }
                                            </span>
                                            <span  className="fw-bold text-gray-600 text-hover-primary">
                                                Date : {moment(quoteData.CreatedDate, 'DD-MM-YYYY').format('MMMM Do YYYY')}
                                            </span>
                                        </div>
                                    </div>		

                                    <div className="row mb-5">
                                        <div className="col text-left ps-4">
                                            <h4> Service Name : {quoteData.ServiceName}  </h4>
                                            <p className="fs-6 fw-bold text-gray-600 mb-1 "> 
                                                Service Type : {quoteData.ServiceType } 
                                            </p>
                                            <p className="fs-6 fw-bold text-gray-600 mb-3 "> 
                                                Contact Requested : {`${quoteData.EmailContact ? 'Email, ' : ''}${quoteData.PhoneContact ? 'Phone': ''} `}
                                            </p>
                                            <p className="fs-6 fw-bold text-gray-600">
                                                Quote Details : {quoteData.EnquiryDetails }
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </>)}
                    </div>
                    <div className="modal-footer">
                        <div className="row">
                            <div className="col">
                                <button data-bs-dismiss="modal" aria-label="Close" type="button" className="btn btn-secondary"> Close </button>
                            </div>
                            { ( !!quoteData && quoteData.Status == "Unread" ) && (
                                <div className="col">
                                    <span className="btn btn-primary btn-maxcontent" onClick={ markQuote } > Mark as read </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}


const QuotePage = () => {
    
    const param     = useParams();
    const dispatch  = useDispatch();
    const QuoteList = useSelector(state => state.quoteReducer.quoteList);

    const [showDetails, setShowDetails] = useState(false);

    const removeQuote = (doc) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#207fc3',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
               dispatch( deleteQuote(doc.ID));
            } 
        })

    }


    useEffect(() => {
        if(param){ dispatch( getQuotes( param.typeofQuote) ) }
    },[param])

    return (  <>  
        <div className="card margin-l25 margin-r25">
            <div className="card-header">
                <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder">
                    <li className="nav-item mt-2">
                        <NavLink className="nav-link text-active-primary ms-0 me-10 py-5" to="/host/quotes/new">
                            <span>  New Quotes</span>
                        </NavLink>
                    </li>
                    <li className="nav-item mt-2">
                        <NavLink className="nav-link text-active-primary ms-0 me-10 py-5" to="/host/quotes/history">
                            <span> Quote History </span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="card-body py-3">
                <div className="table-responsive">
                    <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                        <thead>
                            <tr className="fw-bolder text-muted">
                                <th className="min-w-150px"> Service </th>
                                <th className="min-w-140px"> User</th>
                                <th className="min-w-120px"> Contact</th>
                                <th className="min-w-120px"> Type </th>
                                <th className="min-w-120px"> Date </th>
                                <th className="min-w-100px text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            { (QuoteList.length > 0 )?(<>
                               {QuoteList.map((q,i) => {
                                    return (<tr key={i}>
                                        <td>
                                            <span className="text-dark fw-bolder text-hover-primary fs-6"> {q.ServiceName} </span>
                                        </td>
                                        <td>
                                            <span className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6"> {q.Name} </span>
                                            <span className="text-muted fw-bold text-muted d-block fs-7"> {q.Email} </span>
                                        </td>
                                        <td>
                                            <span className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6">{q.Contact} </span>
                                        </td>
                                        <td>
                                            <span className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6"> {q.ServiceType} </span>
                                        </td>
                                        <td>
                                            <span className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6"> {q.CreatedDate} </span>
                                        </td>
                                        <td className="text-end">
                                            <span  className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" 
                                                onClick={() => setShowDetails(q)}
                                            >
                                                <span className="svg-icon svg-icon-3" >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M21.7 18.9L18.6 15.8C17.9 16.9 16.9 17.9 15.8 18.6L18.9 21.7C19.3 22.1 19.9 22.1 20.3 21.7L21.7 20.3C22.1 19.9 22.1 19.3 21.7 18.9Z" fill="currentColor"/>
                                                        <path opacity="0.3" d="M11 20C6 20 2 16 2 11C2 6 6 2 11 2C16 2 20 6 20 11C20 16 16 20 11 20ZM11 4C7.1 4 4 7.1 4 11C4 14.9 7.1 18 11 18C14.9 18 18 14.9 18 11C18 7.1 14.9 4 11 4ZM8 11C8 9.3 9.3 8 11 8C11.6 8 12 7.6 12 7C12 6.4 11.6 6 11 6C8.2 6 6 8.2 6 11C6 11.6 6.4 12 7 12C7.6 12 8 11.6 8 11Z" fill="currentColor"/>
                                                    </svg>
                                                </span>
                                                
                                            </span>
                                            <span className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                                                onClick={() => removeQuote(q)}
                                            >    
                                                <span className="svg-icon svg-icon-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="black"></path>
                                                        <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="black"></path>
                                                        <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="black"></path>
                                                    </svg>
                                                </span>
                                                
                                            </span>
                                        </td>
                                    </tr>)
                               })} 
                            </>): (
                                <tr>
                                    <td colSpan={6} > 
                                        <div className="card-body py-12">
                                            <div className="text-center">
                                                <h4> No Quotes </h4>
                                            </div>											
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
                            
        {!!showDetails && (
            <DetailModal 
                show = {!!showDetails}
                selectedQuote = {showDetails}
                onDismissModal ={ () => setShowDetails(false)}
            />
        )}                        


    </>)
}

export default QuotePage;