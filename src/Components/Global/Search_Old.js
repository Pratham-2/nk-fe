import React from "react";

const Search = () =>{
	return(
		<>
            <div className="card rounded-0 bgi-no-repeat bgi-position-x-end bgi-size-cover" style={{backgroundColor: '#663259', backgroundSize: 'auto 100%', backgroundImage: 'url(assets/media/misc/taieri.svg)'}}>
					
                <div className="card-body container-xxl pt-10 pb-8">
                
                    <div className="d-flex align-items-center">
                        <h1 className="fw-bold me-3 text-white">We plan like it’s ours</h1>
                        {/* <span className="fw-bold text-white opacity-50"> We plan like it’s ours</span> */}
                    </div>
                
                    <div className="d-flex flex-column">
                        
                        <div className="d-lg-flex align-lg-items-center">
                            
                            <div className="rounded d-flex flex-column flex-lg-row align-items-lg-center bg-white p-5 w-xxl-850px h-lg-60px me-lg-10 my-5">
                            
                                <div className="row flex-grow-1 mb-5 mb-lg-0">
                                    
                                    <div className="col-lg-4 d-flex align-items-center mb-3 mb-lg-0">
                                        
                                        <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black"></rect>
                                                <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black"></path>
                                            </svg>
                                        </span>
                                        
                                        <input type="text" className="form-control form-control-flush flex-grow-1" name="search" value="" placeholder="Your Search" />
                                        
                                    </div>
                                    
                                    <div className="col-lg-4 d-flex align-items-center mb-5 mb-lg-0">
                                    
                                        <div className="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5"></div>
                                    
                                        <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <rect x="2" y="2" width="9" height="9" rx="2" fill="black"></rect>
                                                <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="black"></rect>
                                                <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="black"></rect>
                                                <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="black"></rect>
                                            </svg>
                                        </span>
                                        
                                        <select className="form-select border-0 flex-grow-1 select2-hidden-accessible" data-control="select2" data-placeholder="Category" data-hide-search="true" data-select2-id="select2-data-7-4a8m" tabindex="-1" aria-hidden="true">
                                            <option value=""></option>
                                            <option value="1" selected="selected" data-select2-id="select2-data-9-sw87">Category</option>
                                            <option value="2">In Progress</option>
                                            <option value="3">Done</option>
                                        </select>
                                        <span className="select2 select2-container select2-container--bootstrap5" dir="ltr" data-select2-id="select2-data-8-j44e" style={{width: '100%'}}>
                                            <span className="selection">
                                                <span className="select2-selection select2-selection--single form-select border-0 flex-grow-1" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-wisb-container" aria-controls="select2-wisb-container">
                                                    <span className="select2-selection__rendered" id="select2-wisb-container" role="textbox" aria-readonly="true" title="Category">
                                                        Category
                                                    </span>
                                                    <span className="select2-selection__arrow" role="presentation">
                                                        <b role="presentation"></b>
                                                    </span>
                                                </span>
                                            </span>
                                            <span className="dropdown-wrapper" aria-hidden="true"></span>
                                        </span>
                                    
                                    </div>
                                
                                    <div className="col-lg-4 d-flex align-items-center">
                                        
                                        <div className="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5"></div>
                                        
                                        <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" fill="black"></path>
                                                <path d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" fill="black"></path>
                                            </svg>
                                        </span>
                                    
                                        <a href="#" className="btn btn-color-muted px-0 text-start rounded-0 py-1" id="kt_modal_select_location_target" data-bs-toggle="modal" data-bs-target="#kt_modal_select_location">Location</a>
                                        
                                    </div>
                                </div>
                                
                                <div className="min-w-150px text-end">
                                    <button type="submit" className="btn btn-dark" id="kt_advanced_search_button_1">Search</button>
                                </div>
                            
                            </div>
                        
                            
                        </div>
                        
                    </div>
                    
                </div>
            
            </div>
			
		</>
	)
}

export default Search;