import React, { useEffect, useState } from "react";
import PageHeader from "../Global/PageHeader";
import venueBanner from "../../Assets/images/venueBanner2.jpg"

import venue1 from '../../Assets/images/venue1.jpg'
import venue2 from '../../Assets/images/venue2.jpg'
import venue3 from '../../Assets/images/venue3.jpg'

// import facebook from '../../Assets/images/facebook.png'
// import instagram from '../../Assets/images/instagram.png'
// import twitter from '../../Assets/images/twitter.png'
import userImg from '../../Assets/images/user.png'

import EnquiryModal from "../Modals/EnquiyModal";
import BookingModal from "../Modals/BookingModal";

import { useRouteMatch } from "react-router-dom";
import { uiActions } from "../../store/ui/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { getServiceByID } from "../../store/storeHelper";
import { useHistory } from "react-router-dom";
import { scrolltoTop, displayError, GetImage } from '../Global/Helper';
import Loader from '../Global/Loader';
import TopLink from "../Global/TopLink";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersLine, faIndianRupeeSign, faUser, faLocationDot, faBowlRice, faHouse, faBoltLightning, faDrumstickBite, faLeaf } from "@fortawesome/free-solid-svg-icons"


const ServicePage = () => {

    const history = useHistory();
    const match = useRouteMatch().params;
    const dispatch = useDispatch();

    const showBookingModal = useSelector(s => s.uiReducer.showBookingModal);
    const showEnquiryModal = useSelector(s => s.uiReducer.showEnquiryModal);
    const isLoading = useSelector(s => s.uiReducer.isLoading);
    const services = useSelector(s => s.searchReducer.services);

    const [serviceData, setServiceData] = useState(null)
    const [serviceLink, setServiceLink] = useState('');
    const [imageBlobs,   setImageBlobs] = useState([]);

    const openModal = (key) => dispatch(uiActions.showModal(key));

    useEffect(() => {
        let ignore = false;
        scrolltoTop();
        const fetchVenue = async () => {
            try {
                dispatch(uiActions.toggleLoading(true))
                const { serviceName, venueId } = match;
                if (services.length <= 0) return;

                let serviceExist = services.find(s => s.value.toLowerCase().replace('-','').includes( serviceName.toLowerCase()))
                
                if (!serviceExist || !venueId) return history.push('/');

                setServiceLink(serviceExist.label)
                const response = await getServiceByID(serviceExist.label, venueId);
                if (!response) return history.push('/');

                response.PriceRange = `${response.StartRange} ${response.EndRange ? ' - ' + response.EndRange : '' }`;
                if (response.MaxCapacity && response.MinCapacity) response.TotalCapacity = `${response.MinCapacity} - ${response.MaxCapacity}`
                setServiceData(response);
                dispatch(uiActions.toggleLoading(false))
            } catch (err) {
                displayError('error', err);
            }
        }
        if (!ignore) fetchVenue();
        return () => {
            ignore = true
        }
    }, [match, services])
 
    useEffect(() => {
        // console.log("serviceData", serviceData);
        if (serviceData) {
            const { serviceName } = match
            const from = (serviceName == 'venue') ? 'venues-images' : (serviceName == 'caterer') ? 'caterer-images' : (serviceName == 'photographer') ? 'photographer-images' : (serviceName == 'decorator') ? 'decorator-images' : 'service-images' 
            // console.log(serviceName)
            if(serviceData.Images) {
                const getImageUrl = async (imageName) => {
                    const imageUrl = await GetImage(`${from}/${imageName}`)
                    setImageBlobs(i => [...i, imageUrl])
                }
                for (const image of serviceData.Images) {
                    getImageUrl(image)
                }
            }
        }
    }, [serviceData]);

    return (<>
        {isLoading ? <Loader />
            : (<>
                <PageHeader bannerImage={venueBanner} bannerTitle={serviceLink}
                    imageAuthor={{ title: 'Photo by Vishnu Prasad on Unsplash', link: "https://unsplash.com/photos/CFB4YIkz_lY?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink" }}
                />

                <div className="content d-flex flex-column flex-column-fluid" id="kt_content">

                    <div className="container-xxl" id="kt_content_container">
                        {serviceData && (
                            <div className="card">
                                <div className="card-body p-lg-13 padding-b5 padding-t20">
                                    <TopLink links={[`${serviceLink}`]} />
                                    <div className="row mt-3">
                                        <div className="col-8">
                                            <div className="row ">
                                                <div className="col-12">
                                                    <div className=" text-left mb-3">
                                                        <h4 className="fs-1 text-dark mb-5">
                                                            {serviceData.Title}
                                                        </h4>
                                                        <div className="fs-5 text-muted fw-bold">
                                                            <i className="fas fa-map-marker-alt text-primary margin-r5"></i>
                                                            {serviceData.Address}
                                                        </div>
                                                    </div>

                                                    <div className="card-header card-header-stretch padding-lr0 min-h-50">
                                                        <div className="card-toolbar">
                                                            <ul className="nav nav-tabs nav-line-tabs nav-stretch fs-6 ">
                                                                <li className="nav-item">
                                                                    <h5 className="nav-link active  text-dark showPointer" data-bs-toggle="tab" href="#kt_tab_pane_photo"> Photos</h5>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <h5 className="nav-link text-dark showPointer" data-bs-toggle="tab" href="#kt_tab_pane_about"> About </h5>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <h5 className="nav-link text-dark showPointer" data-bs-toggle="tab" href="#kt_tab_pane_extra"> Amenities </h5>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="card  box-shadow-none">
                                                        <div className="card-body d-flex flex-center flex-column p-5">

                                                            <span className="fs-4 text-gray-800 text-hover-primary fw-bolder mb-0"> Price range : ₹ {serviceData.PriceRange} </span>

                                                            {serviceData.TotalCapacity && (
                                                                <span className="fs-7 text-gray-800 text-hover-primary fw-bolder mb-0"> No of guests : {serviceData.TotalCapacity} </span>
                                                            )}

                                                            {/* <div className="fw-bold text-gray-400 mb-6"> Subjected to requirment</div>                                         */}
                                                            {/* <div className="row mt-3">
                                                            <div className="col">
                                                                <span className="btn btn-dark btn-hover-scale"
                                                                    onClick={() => openModal('booking')}
                                                                > 
                                                                    Book 
                                                                </span>
                                                            </div>
                                                        </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-8 col-12">
                                            <div className="card box-shadow-none border-0">
                                                <div className="card-body px-0">
                                                    <div className="tab-content" id="myTabContent">

                                                        <div className="tab-pane fade show active" id="kt_tab_pane_photo" role="tabpanel">
                                                            <div id="kt_carousel_1_carousel" className="carousel carousel-custom slide" data-bs-ride="carousel" data-bs-interval="1000">
                                                                <div className="carousel-inner pt-8">
                                                                    {imageBlobs.length > 0 && (
                                                                        imageBlobs.map((p, i) => (
                                                                            <div className="carousel-item active" key={i}>
                                                                                <img className="h-320 card-rounded" src={p} alt="venue_image" />
                                                                            </div>
                                                                        ))
                                                                    )}
                                                                    {/* <div className="carousel-item">
                                                                        <img className="h-320 card-rounded" src={venue2} alt="venue_image" />
                                                                    </div>
                                                                    <div className="carousel-item">
                                                                        <img className="h-320 card-rounded" src={venue3} alt="venue_image" />
                                                                    </div>
                                                                    <div className="carousel-item">
                                                                        <img className="h-320 card-rounded" src={venue2} alt="venue_image" />
                                                                    </div> */}
                                                                </div>
                                                                <div className="mt-3">
                                                                    <ol className="p-0 m-0 carousel-indicators carousel-indicators-dots">
                                                                        {imageBlobs.length > 0 && (
                                                                            imageBlobs.map((p, i) => (
                                                                                <li key={i} data-bs-target="#kt_carousel_1_carousel" data-bs-slide-to={i} className={`ms-1 ${i == 0 && 'active'}`}></li>
                                                                            ))
                                                                        )}
                                                                        {/* <li data-bs-target="#kt_carousel_1_carousel" data-bs-slide-to="1" className="ms-1"></li>
                                                                        <li data-bs-target="#kt_carousel_1_carousel" data-bs-slide-to="2" className="ms-1"></li>
                                                                        <li data-bs-target="#kt_carousel_1_carousel" data-bs-slide-to="3" className="ms-1"></li> */}
                                                                    </ol>
                                                                </div>

                                                            </div>

                                                        </div>

                                                        <div className="tab-pane fade" id="kt_tab_pane_about" role="tabpanel">
                                                            <div className="text-left fs-5">
                                                                <p className="mb-3"> {serviceData.About} </p>
                                                                <p className=""> {serviceData.Overview} </p>
                                                            </div>
                                                        </div>

                                                        <div className="tab-pane fade" id="kt_tab_pane_extra" role="tabpanel">
                                                            <div className="anemities-list timeline-label">

                                                                {serviceData.Amenities && serviceData.Amenities.length > 0 ? (
                                                                    serviceData.Amenities.map((amenitie,i) => {
                                                                        return(
                                                                            <div className="timeline-item" key={i}>
                                                                                <div className="timeline-badge"> <i className="fa fa-genderless text-warning fs-1"></i> </div>
                                                                                <div className="timeline-content d-flex">
                                                                                    <span className="fw-bolder text-gray-800 ps-3">{amenitie.value} </span>
                                                                                </div>
                                                                            </div> 
                                                                        )
                                                                    }) 
                                                                ):(<>
                                                                    <div className="timeline-item" >
                                                                        <div className="timeline-badge"> <i className="fa fa-genderless text-warning fs-1"></i> </div>
                                                                        <div className="timeline-content d-flex">
                                                                            <span className="fw-bolder text-gray-800 ps-3"> 
                                                                                All standard amenities, contact for more info.
                                                                            </span>
                                                                        </div>
                                                                    </div> 
                                                                </>)}

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4 col-12">
                                            <div className="card">
                                                <div className="card-header bg-warning d-flex align-items-center" style={{
                                                    minHeight: '50px'
                                                }}>
                                                    <span className="lead fw-bold">Details & Pricing:</span>

                                                </div>
                                                <div className="card-body d-flex flex-center flex-column p-2">
                                                    {/* <div className="symbol symbol-65px symbol-circle mb-5">
                                                    <img src={userImg} alt="user-image" />
                                                </div>                        
                                                <span className="fs-4 text-gray-800 text-hover-primary fw-bolder mb-3"> {serviceData.HostName}</span> */}
                                                    {/* <div className="fw-bold text-gray-400 mb-6">Art Director at Seal Inc.</div>                                         */}
                                                    {/* <div className="d-flex flex-center flex-wrap vendor-card-social-icons">

                                                    <ul className="mt-4">
                                                        <li>
                                                            <img src={instagram} height={'30px'} alt="social_image" />
                                                        </li>
                                                        <li>
                                                            <img src={twitter} height={'30px'} alt="social_image" />
                                                        </li>
                                                        <li>
                                                            <img src={facebook} height={'30px'} alt="social_image" />
                                                        </li>
                                                    </ul>

                                                </div> */}
                                                    <div className="col-sm-12" >

                                                        <div className="row border-bottom p-3 border-dark">
                                                            <div className='d-flex justify-content-between align-items-center p-0'>
                                                                <span> <FontAwesomeIcon icon={faIndianRupeeSign} size='xl' className="" />&nbsp;&nbsp;Price Range
                                                                </span>
                                                                <span className="">
                                                                    <FontAwesomeIcon icon={faIndianRupeeSign} size={'lg'} className='text-danger' /> &nbsp;{serviceData.PriceRange}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {

                                                            serviceLink == 'Photographer' &&
                                                            <div className="row border-bottom p-3 border-dark">
                                                                <div className='d-flex justify-content-between align-items-center p-0'>
                                                                    <span> <FontAwesomeIcon icon={faLocationDot} size='xl' className="text-info" />&nbsp;&nbsp;Relocation Travel
                                                                    </span>
                                                                    <span className="">
                                                                        &nbsp;{serviceData.Travel}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        }
                                                        {

                                                            serviceLink == 'Decorators' &&
                                                            <>
                                                                <div className="row border-bottom p-3 border-dark">
                                                                    <div className='d-flex justify-content-between align-items-center p-0'>
                                                                        <span> <FontAwesomeIcon icon={faBoltLightning} size='xl' className="text-warning" />&nbsp;&nbsp;Indoor
                                                                        </span>
                                                                        <span className="">
                                                                           &nbsp;{serviceData.Indoor}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="row border-bottom p-3 border-dark">
                                                                    <div className='d-flex justify-content-between align-items-center p-0'>
                                                                        <span> <FontAwesomeIcon icon={faHouse} size='xl' className="text-info" />&nbsp;&nbsp;Outdoor
                                                                        </span>
                                                                        <span className="">
                                                                            &nbsp;{serviceData.Outdoor}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        }


                                                        {
                                                            serviceLink == 'Venues' || serviceLink == 'Caterers' ?
                                                                (
                                                                    <div className="row border-bottom p-3 border-dark">
                                                                        <div className='d-flex justify-content-between align-items-center p-0'>
                                                                            <span> <FontAwesomeIcon icon={faBowlRice} size='xl' className="" />&nbsp;Per Plate Cost
                                                                            </span>
                                                                            <span className="">
                                                                                <FontAwesomeIcon icon={faIndianRupeeSign} size={'lg'} className='text-danger' /> &nbsp;{serviceData.PriceRange}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                )
                                                                : null
                                                        }
                                                        {
                                                            serviceLink == 'Caterers' &&
                                                            <>
                                                                <div className="row border-bottom p-3 border-dark">
                                                                    <div className='d-flex justify-content-between align-items-center p-0'>
                                                                        <span> <FontAwesomeIcon icon={faDrumstickBite} size='xl' className="text-danger" />&nbsp;Non Veg
                                                                        </span>
                                                                        <span className="">
                                                                            &nbsp;{serviceData.NonVeg}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="row border-bottom p-3 border-dark">
                                                                    <div className='d-flex justify-content-between align-items-center p-0'>
                                                                        <span> <FontAwesomeIcon icon={faLeaf} size='xl' className="text-success" />&nbsp; Veg
                                                                        </span>
                                                                        <span className="">
                                                                            &nbsp;{serviceData.Veg}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        }
                                                        {
                                                            serviceLink == 'Venues' &&
                                                            <>

                                                                <div className="row border-bottom border-dark p-3">
                                                                    <div className='d-flex justify-content-between align-items-center p-0'>
                                                                        <span>
                                                                            <FontAwesomeIcon icon={faUser}
                                                                                className="text-info"
                                                                                size="xl"
                                                                            />
                                                                            &nbsp;Min Capacity
                                                                        </span>

                                                                        <span className="">
                                                                            {serviceData.MinCapacity}</span></div>
                                                                </div>


                                                                <div className="row border-bottom border-dark p-3">
                                                                    <div className='d-flex justify-content-between align-items-center p-0'>
                                                                        <span>
                                                                            <FontAwesomeIcon icon={faUsersLine}
                                                                                className="text-warning"
                                                                                size="xl"
                                                                            />
                                                                            &nbsp;Max Capacity
                                                                        </span>

                                                                        <span className="">
                                                                            {serviceData.MaxCapacity}</span></div>

                                                                </div>
                                                            </>
                                                        }


                                                    </div>

                                                </div>
                                                <div className="card-footer p-2 ">
                                                    <div className="row">
                                                        <div className="col">
                                                            <span
                                                                className="btn btn-warning btn-sm btn-hover-scale me-2"
                                                                onClick={() => openModal('enquiry')}
                                                            > Enquire </span>
                                                            {/* <span
                                                                className="btn btn-danger btn-sm btn-hover-scale"
                                                                onClick={() => openModal('booking')}
                                                            > Book </span> */}
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {showEnquiryModal && (
                    <EnquiryModal
                        show={showEnquiryModal}
                        serviceLink={serviceLink}
                        serviceData={serviceData}
                        onDismissModal={openModal}
                    />
                )}
                {showBookingModal && (
                    <BookingModal
                        show={showBookingModal}
                        onDismissModal={openModal}
                    />
                )}
            </>)
        }
    </>)
}

export default ServicePage;

