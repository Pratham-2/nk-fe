import React from "react";
import commingSoon from "../../Assets/images/comingSoon.png";
import SocialComp from "./SocialComp";

const Soon = () => {
    return(<>
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">						
            <div className="container-xxl" id="kt_content_container">                
                <div className="card">                    
                    <div className="card-body p-lg-17">                        
                        <div className="mb-18">                            
                            <div className="mb-10">                                
                                <div className="text-center mb-15">                                    
                                    {/* <h3 className="fs-2hx text-dark mb-5">About Us</h3> */}
                                    <div className="fs-5 text-muted fw-bold">
                                        Thank you for using our platform. We're constantly working to improve our services and add new features to enhance your experience.  <br />  
                                        We have some exciting new features in the works that will be available soon, so please stay tuned for updates.   <br /> 
                                        Thank you for your patience and understanding.                              
                                    </div>                                    
                                </div>
                                
                                <div className="overlay">
                                    <img className="card-rounded h-200px" src={commingSoon} alt="commingsoon-img" />
                                    
                                    {/* <div className="overlay-layer card-rounded bg-dark bg-opacity-25">
                                        <span className="btn btn-light-primary ms-3" > Go back </span>
                                    </div> */}
                                </div>                                
                            </div>

                            <div className="fs-5 fw-bold text-gray-600">                                
                            </div>
                        </div>
                        
                        <SocialComp />
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Soon;