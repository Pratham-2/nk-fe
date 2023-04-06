import React, { useEffect ,useState } from "react";
import {  NavLink, useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';

import PageHeader from "../Global/PageHeader";
import bannerVenue from "../../Assets/images/bannerVenue.jpg"
import decorater from '../../Assets/images/decorater.jpg'
import noresult from "../../Assets/images/noresult.png";
import { displayError } from "../Global/Helper";
import { getServiceByName, getServiceByNameAndCity,getServiceByLocality, getService } from "../../store/storeHelper";
import { getAllLocality, getLocalityByCity,getPriceFilter,getStatesAndCitiesAndServices } from "../../store/search/search-slice";
import { uiActions } from '../../store/ui/ui-slice';
import Loader from '../Global/Loader';
import TopLink from "../Global/TopLink";

import moment from 'moment';
import { searchActions } from "../../store/search/search-slice";
import { CustomSwiper } from "../Venues/Venues";
// import venue1 from '../../Assets/images/venue1.jpg'
// import birthday from '../../Assets/images/birthday.jpg'
// import { db } from "../../firebaseConfig/firebase";


const VenueList = () => {

    const history 	  	                                  = useHistory();
    const dispatch                                        = useDispatch();
    const match                                           = useRouteMatch().params;
    const globalCities                                    = useSelector(s => s.searchReducer.cities);
    const isLoading                                       = useSelector(s => s.uiReducer.isLoading);
    const locality                                        = useSelector(s => s.searchReducer.locality);
    const price                                           = useSelector(s => s.searchReducer.price);
    const serviceClick                                    = (venueId) =>  history.push(`/venue/${venueId}`);
    const onChangeCityFilter                              = (cityId)  => {history.push(`/venues/${cityId}`);setdefaultLocalityValue('');setSelectedLocality(''); }
    const [featuredList , setFeaturedList]                = useState([])
    const [filters,   setFilters]                         = useState({});
    const [selectedLocality, setSelectedLocality]          = useState([]);
    const [defaultLocalityValue, setdefaultLocalityValue]  = useState('');
    const [priceValue, setPriceValue]       = useState('')
    
    const onChangeLocalityFilter = (locality) => {setdefaultLocalityValue({label:locality,value:locality});setSelectedLocality(locality)}
    const onChangePriceFilter = (price) => {
        setPriceValue({ value: price, label: `Upto ${price}` })
    }
    useEffect(() => {
        let ignore = false;
        const fetchServiceList = async() => {
            try {

                dispatch(uiActions.toggleLoading(true))
                const { serviceName , cityId } = match;

                console.log("match", match);
                
                //call get venues api as per url parameters ->
                // if(cityId && globalCities.length > 0) dispatch( getLocalityByCity( match.cityId))
                // else dispatch(getAllLocality())

                const response = await getServiceByNameAndCity('Venues', cityId);
             
                if(response.length > 0) setFeaturedList(response);
                else setFeaturedList([]);

                //set city filter dd value from globalcities
                const selectedCity = globalCities.find(c => c.value === cityId);

                dispatch(uiActions.toggleLoading(false))           

            } catch (err) {
                displayError('error', err);
            }
        }
       
         if(!ignore) {
            fetchServiceList();
        }
        return () => { 
           ignore = true 
        }
    },[match, globalCities])

	return (<>
         {isLoading ? <Loader/> 
        :(<>
            <PageHeader bannerImage = { bannerVenue } bannerTitle ={'Venues'}
                imageAuthor = {{ title : '  Photos by Lanty on Unsplash', link  : "https://unsplash.com/photos/dcb2pog89fQ?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink" }}
            />

            <div className="content d-flex flex-column flex-column-fluid" id="kt_content">				
                <div className="container-xxl" id="kt_content_container">	

                    {/* Search Filter Bar */}
                    <div className ="card">
                        <div className ="card-body">
                            
                            <TopLink links={["Venues"]} />

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
                                        value = { defaultLocalityValue }
                                        placeholder="Locality"
                                        options = {locality} 
                                        onChange={v => onChangeLocalityFilter(v.value) }
                                    />
                                </div>
                                <div className="col-3">
                               
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        {featuredList.length == 0 ?(
                            <div className="col-12">	
                                <div className="card me-md-6 text-left mb-4" >
                                    <div className="card-body padding-10 text-center">
                                        <img src={noresult} alt='no-result-image' height={350} />
                                        <h2 className="fw-bolder text-dark lh-base"> No Venues found </h2>
                                        <NavLink to={'/'}>
                                            <h4 className="fw-bolder text-dark lh-base" > Try another search ? </h4>
                                        </NavLink>
                                    </div>	
                                </div>
                            </div>
                        ):(featuredList.map((f, i) => {
                            return(
                                <div className="col-md-4 col-12" key={f.ID} >	
                                    <div className="card me-md-6 text-left mb-4 card-hover" >
                                        <div className="card-body padding-10 " >
                                            {/* <span className="d-block overlay mb-4" data-fslightbox="lightbox-hot-sales"> */}
                                                <div className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover  min-h-200px">
                                                    <CustomSwiper images={f.Images} from='venues-images'/>
                                                </div>
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
                        }))}		
                    </div>			
                </div>
            </div> 
        </>)}
    </>);
}

export default VenueList;


