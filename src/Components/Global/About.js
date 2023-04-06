import React, { useLayoutEffect } from "react";
import {scrolltoTop} from "../Global/Helper";
//import banner from "../../Assets/images/es-banner.png"
import banner from "../../Assets/logos/main_banner.png"
import supplierImg from '../../Assets/images/supplier.png'; 
import decorateImg from '../../Assets/images/decorate.png'; 
import calendar from '../../Assets/images/calendar.png';
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth/auth-slice";
import SocialComp from "./SocialComp";

const AboutUs = () => {

    const dispatch  = useDispatch();
	const openModal = () => dispatch(authActions.showModal('Login'));
    
    useLayoutEffect(() => {
        scrolltoTop();
    },[])
    
    return(<>
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
						
            <div className="container-xxl" id="kt_content_container">
                
                <div className="card">
                    
                    <div className="card-body p-lg-17">
                        
                        <div className="mb-18">
                            
                            <div className="mb-10">
                                
                                <div className="text-center mb-15">
                                    
                                    <h3 className="fs-2hx text-dark mb-5">About Us</h3>
                                
                                    <div className="fs-5 text-muted fw-bold">
                                        Within the last 10 years, we have sold over 100,000 admin theme copies that have been
                                        <br /> successfully deployed by small businesses to global enterprises
                                    </div>
                                    
                                </div>
                                
                                <div className="overlay">
                                    <img className="w-100 card-rounded h-450px" src={banner} alt="banner-img" />
                                    
                                    <div className="overlay-layer card-rounded bg-dark bg-opacity-25">
                                        <span className="btn btn-light-primary ms-3" onClick={openModal}> Join Us </span>
                                    </div>                   
                                </div>                                
                            </div>

                            <div className="fs-5 fw-bold text-gray-600">
                                <p className="mb-8">  
                                    At NK Mangalam, our aim is to offer you best services that show you that we really care! Not only have we got the trendiest
                                    Vendor's / Host's, but we can also guarantee that they are of the finest quality. 
                                    Our aim is to continue providing our customers with services that keep them happy, at prices that keep them happy. 
                                </p>
                        
                                <p className="mb-17">
                                    Our customers are our top priority and through our services we work hard towards building long-lasting and meaningful relations with them.
                                </p>
                            </div>
                        </div>
                        
                        
                        <div className="card bg-light mb-18">
                            <div className="card-body py-15">
                                <div className="text-center mb-10">
                                    <div className="row">
                                        <div className="col-md-4 col-12 text-center mb-9">	
                                            <div className=" mx-auto mb-2 d-flex w-150px h-150px bgi-no-repeat bgi-size-contain bgi-position-center" 
                                                style={{backgroundImage:`url(${supplierImg})`}}></div>
                                            <div className="mb-0">
                                                <span className="text-dark fw-bolder text-hover-primary fs-3">
                                                    Find local vendor
                                                </span>
                                                <div className="text-muted fs-6 fw-bold">
                                                    Browse Venues and Vendors
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4 col-12 text-center mb-9">	
                                            <div className=" mx-auto mb-2 d-flex w-150px h-150px bgi-no-repeat bgi-size-contain bgi-position-center" 
                                                style={{backgroundImage:`url(${decorateImg})`}}></div>
                                            <div className="mb-0">
                                                <span className="text-dark fw-bolder text-hover-primary fs-3">
                                                    Discover community decorator
                                                </span>
                                                <div className="text-muted fs-6 fw-bold">
                                                    Browse Ace Decorator's and Caterers
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4 col-12 text-center mb-9">	
                                            <div className=" mx-auto mb-2 d-flex w-150px h-150px bgi-no-repeat bgi-size-contain bgi-position-center" 
                                                style={{backgroundImage:`url(${calendar})`}}></div>
                                            <div className="mb-0">
                                                <span className="text-dark fw-bolder text-hover-primary fs-3">
                                                    Save your date
                                                </span>
                                                <div className="text-muted fs-6 fw-bold">
                                                    Hassle Free Planning & Booking at the Best Prices.
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            
                                <div className="fs-2 fw-bold text-muted text-center mb-3">
                                <span className="fs-1 lh-1 text-gray-600">“ Life is an event. Make it memorable “</span></div>
                            </div>
                        </div>

                        <SocialComp />
                    </div>
                </div>
            </div>
        </div>


    </>)
}

export default AboutUs;