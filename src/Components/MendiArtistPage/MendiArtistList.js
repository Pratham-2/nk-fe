import React, { useEffect, useState } from "react";
import { NavLink, useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';

import Loader from '../Global/Loader';
import TopLink from "../Global/TopLink";
import PageHeader from "../Global/PageHeader";

import bannerImg from "../../Assets/images/mehndiArtist.jpg"
import noresult from "../../Assets/images/noresult.png";

import { displayError } from "../Global/Helper";
import { getServiceByName, getServiceByNameAndCity } from "../../store/storeHelper";
import { uiActions } from "../../store/ui/ui-slice";
import { CustomSwiper } from "../Venues/Venues";


const MendiArtistList = () => {

    const history   = useHistory();
    const dispatch  = useDispatch();
    const match     = useRouteMatch().params;

    const globalCities  = useSelector(s => s.searchReducer.cities);
    const isLoading     = useSelector(s => s.uiReducer.isLoading);

    const [featuredList, setFeaturedList]  = useState([]);
    const [selectedCity,  setSelectedCity] = useState([]);

    const serviceClick       = (id) => history.push(`/mehndiArtist/${id}`);
    const onChangeCityFilter = (cityId) => history.push(`/mehndi-artist/${cityId}`)
      
    useEffect(() => {
        let ignore = false;
        const fetchMehendiArtists = async () => {
            try {
                dispatch(uiActions.toggleLoading(true))
                const { cityId } = match;

                if(cityId){
                    const response = await getServiceByNameAndCity('Mehndi-artist', cityId);
                 
                    if(response.length > 0) setFeaturedList(response);
                    else setFeaturedList([]);
                    
                    const selectedCity = globalCities.find(c => c.value === cityId);
                    if(selectedCity) setSelectedCity(selectedCity);
                }else{
                    const response = await getServiceByName('Mehndi-artist');

                    if(response.length > 0) setFeaturedList(response);
                    else setFeaturedList([]);
                }

                setTimeout(() => dispatch(uiActions.toggleLoading(false)), 200);
                dispatch(uiActions.toggleLoading(false)) 

            } catch (err) {
                displayError('error', err);
            }
        }

        if (!ignore) fetchMehendiArtists();

        return () => {ignore = true }
    }, [match, globalCities])

    return (<>
        {isLoading ? <Loader/> 
      :(<>
        <PageHeader bannerImage={bannerImg} bannerTitle={'Mehndi-artist'}
            imageAuthor={{ title: 'Photos by kinnari kurani on pexels', link: "https://www.pexels.com/photo/women-s-red-and-gold-dress-2857306/" }}
        />

        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="container-xxl" id="kt_content_container">

                {/* Search Filter Bar */}
                <div className="card">
                    <div className="card-body">

                        <TopLink links={["Mehndi-artist"]} />
                        <div className="row mt-3">
                            <div className="col-3">
                                <Select className="text-left " 
                                    value = {selectedCity || ''}
                                    placeholder="City"  options = {globalCities} 
                                    onChange={v => onChangeCityFilter(v.value) }
                                />
                            </div>   
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    {featuredList.length == 0 ?
                        <div className="col-12">
                            <div className="card me-md-6 text-left mb-4" >
                                <div className="card-body padding-10 text-center">
                                    <img src={noresult} alt='no-result-image' height={350} />
                                    <h2 className="fw-bolder text-dark lh-base"> No Mendi-artists found </h2>
                                    <NavLink to={'/'}>
                                        <h4 className="fw-bolder text-dark lh-base" > Try another search ? </h4>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        : featuredList.map((f, i) => {
                            return (
                                <div className="col-md-4 col-12" key={f.ID} >
                                    <div className="card me-md-6 text-left mb-4 card-hover" >
                                        <div className="card-body padding-10 ">                                        
                                            <div className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover  min-h-200px">
                                                <CustomSwiper images={f.Images} from='service-images' />
                                            </div>                                         

                                            <div className="m-0 my-4 padding-lr15 cursor-pointer" onClick={() => serviceClick(f.ID)}>
                                                <span className="fs-4 text-dark fw-bolder text-hover-primary text-dark lh-base">
                                                    {f.Title}
                                                </span>

                                                <div className="fw-bold fs-5 text-gray-600 text-dark mt-3 mb-5">
                                                    {f.Address}
                                                </div>

                                                <div className="fs-6 fw-bolder">
                                                    <span className="text-gray-700 text-hover-primary">
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
        </>)}
    </>);
}

export default MendiArtistList;
