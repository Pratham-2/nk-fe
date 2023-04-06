import React, { useEffect, useState } from 'react'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import DashboardImg from '../../Assets/images/dashboard.svg'
import { db } from '../../firebaseConfig/firebaseConfig';
import venue1 from '../../Assets/images/venue1.jpg'
import decorater from '../../Assets/images/decorater.jpg'
import birthday from '../../Assets/images/birthday.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { deactivateVenue, getVenues, venueActions } from '../../store/host/venue-slice';
import AddVenueModal from '../Modals/AddVenueModal';
import ImageCropper from '../Global/ImageCropper';
import ShowDetailModal from '../Modals/ShowDetailsModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from "swiper";
import venue2 from '../../Assets/images/venue2.jpg'
import { GetImage } from '../Global/Helper';
import noresult from "../../Assets/images/addService.png";
import Loader from '../Global/Loader';

export const CustomSwiper = (props) => {
    const dispatch = useDispatch();

    const [venueBlobs, setVenueBlobs] = useState([]);
    const loading = useSelector(state => state.venueReducer.loading)

    useEffect(() => {
        if (props.images) {
            dispatch(venueActions.setLoading(true))
            const getImageUrl = async (path) => {
                // const imageUrl = await GetImage(`${props.from == 'venueDetails' ? 'venues-images' : props.from == 'decoratorDetails' ? 'decorator-images' : props.from == 'photographerDetails' ? 'photographer-images' : 'caterer-images'}/${path}`);
                const imageUrl = await GetImage(`${props.from}/${path}`);
                setVenueBlobs(d => [...d, imageUrl]);
            }
            for (const venueBlob of props.images) {
                getImageUrl(venueBlob);
            }
            dispatch(venueActions.setLoading(false))
        }
    }, [props.images]);

    return (
        <>
            <Swiper
                effect={"fade"}
                navigation={true}
                modules={[Navigation, Autoplay, EffectFade]}
                className="mySwiper"
                loop={true}
                autoplay={{
                    delay: 2000
                }}
            >
                {venueBlobs.length > 0 && (
                    venueBlobs.map((v, i) => (
                        <SwiperSlide key={i}>
                            <img className="d-block w-100" style={{ height: '200px' }} src={v} alt="Second slide" />
                        </SwiperSlide>
                    ))
                )}
            </Swiper>
        </>
    )
}

const Venues = () => {

    const dispatch = useDispatch();
    const showAddVenueModal = useSelector(state => state.venueReducer.showAddVenueModal);
    const showEditVenueModal = useSelector(state => state.venueReducer.showEditVenueModal);
    const currentUser = useSelector(state => state.authReducer.currentUser);
    const venue = useSelector(state => state.venueReducer.venuesList);
    const loading = useSelector(state => state.venueReducer.loading);
    const showDetailModal = useSelector(state => state.venueReducer.showDetailModal);

    const [cropperData, setCropperData] = useState(null);
    const [filteredVenue, setFilteredVenue] = useState([]);
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        if (venue.length > 0)
            filterVenue();
        else
            setFilteredVenue([])
    }, [venue, searchString]);

    const param = useParams();

    useEffect(() => {
        let maxHeightAddress = Math.max.apply(null, $(".address-height").map(function () {
            return $(this).height();
        }).get());
        let maxHeight = Math.max.apply(null, $(".title-height").map(function () {
            return $(this).height();
        }).get());
        $('.title-height').css('height', maxHeight)
        $('.address-height').css('height', maxHeightAddress)
    })

    useEffect(() => {
        if (currentUser.ID)
            dispatch(getVenues(currentUser.ID))
    }, [currentUser]);

    // useEffect(() => {
    //     let ignore = false;
    //     const fetchData = async( ) => {
    //         const response = await db.collection('Venues').get()

    //         // response.forEach( a => console.log(a.data()) )
    //         response.forEach( a => setVenues( b => [...b, {...a.data()}]) );

    //     }
    //     if(!ignore) fetchData()
    //     return () => {
    //         ignore = true;
    //     }
    // }, []);

    const filterVenue = async () => {

        if (searchString === '') {
            setFilteredVenue(venue);
        } else {
            const matchedVenues = venue.filter((v) => {
                let matchString = `${v.Title} ${v.Host} ${v.Address}`;
                let matchFound = 0;
                const searchArr = searchString.split(' ');
                searchArr.forEach((term) => {
                    matchFound += matchString.toLowerCase().includes(term.toLowerCase())
                        ? 1
                        : 0;
                });
                return matchFound === searchArr.length;
            });
            setFilteredVenue(matchedVenues);
        }
    };

    const openVenueModal = () => {
        dispatch(venueActions.setShowAddVenueModal());
    }

    const dismissEditModal = () => {
        dispatch(venueActions.setShowEditVenueModal(null));
    }

    const deleteVenue = (v) => {
        dispatch(deactivateVenue({ ...v, Active: 'N' }))
    }

    const openEditVenueModal = (v) => {
        dispatch(venueActions.setShowEditVenueModal(v))
    }

    const openDetailsModal = (v) => {
        dispatch(venueActions.setShowDetailModal(v))
    }

    const openImageModal = (e) => {
        e.preventDefault();
        setCropperData({
            imageRatio: { width: 260, height: 260 },
            // dataHandler : (val) =>  setClubLogoBlob(val),
            header: 'Venue Image'
        })
    }

    return (
        <>
            <div className="card margin-l25 margin-r25">
                <div className="card-header">
                    <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder">
                        <li className="nav-item mt-2">
                            <NavLink className="nav-link text-active-primary ms-0 me-10 py-5" to="/host/venues/all">
                                <span>Venues</span>
                            </NavLink>
                        </li>
                        {/* <li className="nav-item mt-2">
                            <NavLink className="nav-link text-active-primary ms-0 me-10 py-5" to="/host/venues/booking">
                                <span>Booking</span>
                            </NavLink>
                        </li> */}
                    </ul>
                    {param.typeOfVenue === 'all' && (
                        <div className='card-toolbar'>
                            <div className="position-relative me-3 text-left">
                                <span className="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black"></rect>
                                        <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black"></path>
                                    </svg>
                                </span>
                                <input type="text" className="form-control form-control-solid ps-10" name="search" onChange={(e) => setSearchString(e.target.value)} value={searchString || ''} placeholder="Search" />
                            </div>
                            <div>
                                <button className="btn btn-primary btn-sm" style={{ display: 'inline' }} onClick={openVenueModal}>
                                    <i className="la la-plus"></i>
                                    New Venue
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {param.typeOfVenue === 'booking' ? (
                <div>

                </div>
            ) : (
                (loading ? <Loader /> : (
                    <div className="margin-l25 margin-r25 margin-t20 row padding-0">
                        {filteredVenue.length > 0 ? (
                            filteredVenue.map((v, i) => (
                                <div className="col-md-4 col-12 padding-l0 padding-r0" key={i} >
                                    <div className="card me-md-6 text-left mb-4" >
                                        <div className="card-body padding-10">
                                            <div className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover  min-h-200px"
                                            >
                                                {loading ? <Loader /> : <CustomSwiper images={v.Images} from='venues-images' />}
                                            </div>

                                            <div className="m-0 my-4 padding-lr15">
                                                <div className="fs-4 text-dark fw-bolder text-hover-primary text-dark lh-base title-height">
                                                    {v.Title}
                                                </div>

                                                <div className="fw-bold fs-5 text-gray-600 text-dark mt-3 mb-5 address-height">
                                                    {v.Address}
                                                </div>

                                                <div className='row' style={{ marginTop: '50px' }}>
                                                    <div className='col-sm-8'>
                                                        <div className="fs-6 fw-bolder">
                                                            <span className="text-gray-700 text-hover-primary">
                                                                {v.HostName}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className='col-sm-4'>
                                                        <span className='text-right'>
                                                            <div className="dropdown">
                                                                <button className="btn btn-bg-light" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i className='bi bi-three-dots'></i>
                                                                </button>
                                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                    <li><a className="dropdown-item" onClick={() => openDetailsModal(v)}>Show Details</a></li>
                                                                    <li><a className="dropdown-item" onClick={() => openEditVenueModal(v)}>Edit Venue</a></li>
                                                                    <li><a className="dropdown-item" onClick={() => deleteVenue(v)}>Delete Venue</a></li>
                                                                </ul>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12">
                                <div className="card me-md-6 text-left mb-4" >
                                    <div className="card-body padding-10 text-center">
                                        <img src={noresult} alt='no-result-image' height={250} />
                                        <h2 className="fw-bolder text-dark lh-base"> List Your Service ..! </h2>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}
            {showAddVenueModal && (
                <AddVenueModal
                    show={showAddVenueModal}
                    onDismissModal={openVenueModal}
                />
            )}
            {showEditVenueModal && (
                <AddVenueModal
                    venueDetails={showEditVenueModal}
                    show={showEditVenueModal}
                    onDismissModal={dismissEditModal}
                    action='e'
                />
            )}
            {showDetailModal && (
                <ShowDetailModal
                    venueDetails={showDetailModal}
                    from='Venue'
                    show={showDetailModal}
                    onDismissModal={() => dispatch(venueActions.setShowDetailModal(null))}
                />
            )}
        </>
    )
}

export default Venues;