import React, { useEffect, useState } from "react";
import {  NavLink, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from 'react-select';
import TopLink from "../Global/TopLink";
import PageHeader from "../Global/PageHeader";
import bannerImg from "../../Assets/images/dj.jpg"
import decorater from '../../Assets/images/decorater.jpg'
import noresult from "../../Assets/images/noresult.png";
import { displayError } from "../Global/Helper";
import { getServiceByName, getServiceByNameAndCity } from "../../store/storeHelper";
import { CustomSwiper } from "../Venues/Venues";

const DecoratorList = () => {

    const [featuredList , setFeaturedList] = useState([])
    const history 	  	= useHistory();
    const match         = useRouteMatch().params;
    const globalCities  = useSelector(s => s.searchReducer.cities);
    
    const [filters, setFilters] = useState({});
    
    const onChangeCityFilter = (cityId) => {
        history.push(`/musicians/${cityId}`)
    }

    const serviceClick  = (Id) =>  history.push(`/musician/${Id}`);

    useEffect(() => {
        let ignore = false;
        const fetchVenues = async() => {
            try {
                const { cityId } = match;
                //call get venues api as per url parameters ->
                if(cityId && globalCities.length > 0){
                    
                    const response = await getServiceByNameAndCity('Dj', cityId);
                    if(response.length > 0) setFeaturedList(response);
                    else setFeaturedList([]);

                    //set city filter dd value from globalcities
                    const selectedCity = globalCities.find(c => c.value === cityId);
                    setFilters({...filters, selectedCity});               
                }else{
                    // sort as per city -> 
                    const response = await getServiceByName('Dj');
                    if(response.length > 0) setFeaturedList(response);
                }

            } catch (err) {
                displayError('error', err);
            }
        }
        if(!ignore) fetchVenues();
        return () => { 
           ignore = true 
        }
    },[match, globalCities])
    
	return (<>
        <PageHeader bannerImage= { bannerImg } bannerTitle ={'Musician'}
            imageAuthor = {{ title: 'Photos by francesco paggiaro on pexels', link: "https://www.pexels.com/photo/shallow-focus-of-food-served-on-dining-table-5774927/" }}
        />

        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">				
            <div className="container-xxl" id="kt_content_container">	

                {/* Search Filter Bar */}
                <div className="card">
                    <div className="card-body">

                        <TopLink links={["Musicians"]} />
                        <div className="row mt-3">
                            <div className="col-3">
                                <Select className="text-left " 
                                    value = {filters.selectedCity || ''}
                                    placeholder="City"  options = {globalCities} 
                                    onChange={v => onChangeCityFilter(v.value) }
                                />
                            </div>
                            <div className="col-3">
                                <Select className="text-left " 
                                    placeholder="Locality"  options = {globalCities} 
                                    // onChange={v => onSearchChange('city', v.value) }
                                />
                            </div>
                            {/* <div className="col-3">
                                <Select className="text-left" 
                                    placeholder=""  options = {globalCities} 
                                    // onChange={v => onSearchChange('city', v.value) }
                                />
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    {featuredList.length == 0 ?
                        <div className="col-12">	
                            <div className="card me-md-6 text-left mb-4" >
                                <div className="card-body padding-10 text-center">
                                    <img src={noresult} alt='no-result-image' height={350} />
                                    <h2 className="fw-bolder text-dark lh-base"> No Musician found </h2>
                                    <NavLink to={'/'}>
                                        <h4 className="fw-bolder text-dark lh-base" > Try another search ? </h4>
                                    </NavLink>
                                </div>	
                            </div>
                        </div>
                    :featuredList.map((f, i) => {
                        return(
                            <div className="col-md-4 col-12" key={f.ID} >	
                                <div className="card me-md-6 text-left mb-4 card-hover" >
                                    <div className="card-body padding-10 " >
                                        {/* <span className="d-block overlay mb-4" data-fslightbox="lightbox-hot-sales"> */}
                                            <div className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover  min-h-200px">
                                                <CustomSwiper images={f.Images} from='service-images'/>
                                            </div>
                                            {/* <div className="overlay-layer bg-dark card-rounded bg-opacity-25">
                                                <i className="bi bi-eye-fill fs-2x text-white"></i>
                                            </div>				 */}
                                        {/* </span> */}

                                        <div className="m-0 my-4 padding-lr15 cursor-pointer" onClick={() => serviceClick(f.ID)}>
                                            <span className="fs-4 text-dark fw-bolder text-hover-primary text-dark lh-base">
                                                    {f.Title}
                                            </span>
                                            
                                            <div className="fw-bold fs-5 text-gray-600 text-dark mt-3 mb-5">
                                                {f.Address}
                                            </div>
                                        
                                            <div className="fs-6 fw-bolder">
                                                <span  className="text-gray-700 text-hover-primary">
                                                    {f.HostName}
                                                </span>
                                            </div>	
                                        </div>	
                                    </div>	
                                </div>
                            </div>
                        )
                    })}		
				</div>			
            </div>
        </div> 
    </>);
}

export default DecoratorList;
