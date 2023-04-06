import React, { useState, useEffect, useLayoutEffect } from "react";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchActions, getStatesAndCitiesAndServices , onSearchService} from "../../store/search/search-slice";
import banner from "../../Assets/images/bannerdec1.jpg"

const Search = () => {

    const history         = useHistory();
    const dispatch        = useDispatch();
    const searchData      = useSelector(s => s.searchReducer.searchData);
    const globalCities    = useSelector(s => s.searchReducer.cities);
    const globalServices  = useSelector(s => s.searchReducer.services);
    const onSearchChange  = (key,value) => dispatch(searchActions.setSearchData({ key, value}));
    
    const onSearch = () => {
        //push user to particular serivce or city or both
        if(Object.keys(searchData).length > 0){
            const {service, city} = searchData;
            const redirectUrl = `${(service ? `/${service.toLowerCase()}`:"")}${(city ? `/${city}`:"")}`;  
            history.push(redirectUrl);
        }
    }
    
    useLayoutEffect(() => {
        const bannerElement = document.getElementById('searchBar');
        if(bannerElement){
            setInterval(() => {
                if(bannerElement.className.includes('bg-')){
                    const classNames = bannerElement.className.split('bg-');

                    if(!classNames|| classNames.length == 0) return bannerElement.className = 'card rounded-0 bgi-no-repeat bgi-position-x-end bgi-size-cover banner-card bg-1'
                    
                    if(classNames[1] == '4')
                        bannerElement.className = `${classNames[0]} bg-1`;
                    else
                        bannerElement.className = `${classNames[0]} bg-${parseInt(classNames[1]) + 1}`;
                }
            }, 10000);             
        }       
    },[]);

    //useEffect(()=> dispatch(getStatesAndCitiesAndServices()) , []);
    useEffect(() => dispatch(searchActions.resetSearchData()) , []);

	return(<>
        <div className="card rounded-0 bgi-no-repeat bgi-position-x-end bgi-size-cover banner-card bg-1" id='searchBar'
            style={{ backgroundPosition:'center' }} title="Photo by viresh studio from Pexels">

            <div className="card-body container-xxl pt-10 pb-8 banner-card-body">
                <div className="d-flex align-items-center">
                    <h1 className="fw-bold me-3 text-white banner-title">We plan like it’s ours</h1>
                </div>
                
                <div className="d-flex flex-column">
                    <div className="d-lg-flex align-lg-items-center">
                        <div className="rounded d-flex flex-column flex-lg-row align-items-lg-center bg-white p-5 w-xl-700px w-md-600px h-lg-60px me-lg-10 my-5">
                            <div className="row flex-grow-1 mb-5 mb-lg-0">
                            
                                <div className="col-lg-6 d-flex align-items-center mb-5 mb-lg-0">
                                    <Select className="custom-select-container border-0 flex-grow-1 " classNamePrefix ="custom-select"
                                       placeholder="City"  options = {globalCities} 
                                       onChange={v => onSearchChange('city', v.value) }
                                    />
                                </div>

                                <div className="col-lg-6 d-flex align-items-center mb-5 mb-lg-0">
                                    <Select className="custom-select-container border-0 flex-grow-1 " classNamePrefix ="custom-select"
                                       placeholder="Service"  options = {globalServices} maxMenuHeight={200}
                                       onChange={v => onSearchChange('service', v.value) }
                                    />      
                                </div>
                            
                            </div>
                            
                            <div className="min-w-150px text-end">
                                <button type="button" className="btn btn-dark" id="kt_advanced_search_button_1" onClick={onSearch} >Find Vendor</button>
                            </div>
                        
                        </div>
                    </div>
                </div>  

                {/* <div className="row w-lg-100 text-right">
                    <div className="col">
                        <a href="https://www.pexels.com/photo/person-wearing-gold-and-red-bracelets-6593858/" target="_blank" rel="noreferrer noopener" className="text-muted" >
                            Photo by viresh studio from Pexels
                        </a>
                    </div>
                </div> */}
            </div>           
        </div>
    </>)
}

export default Search;