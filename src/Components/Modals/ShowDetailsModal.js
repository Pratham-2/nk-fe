import React, { useEffect, useState } from 'react'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import DashboardImg from '../../Assets/images/dashboard.svg'
import { db } from '../../firebaseConfig/firebaseConfig';
import venue1 from '../../Assets/images/venue1.jpg'
import venue2 from '../../Assets/images/venue2.jpg'
import venue3 from '../../Assets/images/venue3.jpg'
import decorater from '../../Assets/images/decorater.jpg'
import birthday from '../../Assets/images/birthday.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { deactivateVenue, getVenues, venueActions } from '../../store/host/venue-slice';
import AddVenueModal from '../Modals/AddVenueModal';
import ImageCropper from '../Global/ImageCropper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "../../../node_modules/swiper/modules/effect-fade/effect-fade.min.css"
import 'swiper/css';
import 'swiper/css/bundle';
import { Navigation, Autoplay, EffectFade } from "swiper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { GetImage } from '../Global/Helper';
// import '../../../node_modules/bootstrap/js/dist/popover'

const ShowDetailModal = (props) => {
    const [venueBlobs, setVenueBlobs] = useState([]);

    useEffect(() => {
        $('[data-bs-toggle="popover"]').popover()
    })

    const [cityName, setCityName] = useState('')

    useEffect(() => {
        $('#details-modal').modal({ backdrop: 'static' });
        $('#details-modal').on('hidden.bs.modal', function () { props.onDismissModal() })
        $('#details-modal').modal('toggle');
        fetchCity();
        if (props.show) {
            const getImageUrl = async (path) => {
                const imageUrl = await GetImage(`${props.venueDetails ? 'venues-images' : props.decoratorDetails ? 'decorator-images' : props.photographerDetails ? 'photographer-images' : 'caterer-images'}/${path}`);
                setVenueBlobs(d => [...d, imageUrl]);
            }
            for (const venueBlob of props.show.Images) {
                getImageUrl(venueBlob);
            }
        }
    }, [props.show]);

    const fetchCity = async () => {
        try {
            const response = await db.collection('City').doc(props.show.City).get();
            if (response) setCityName(response.data())
        } catch (err) {
            swal.fire({
                icon: 'error',
                titleText: err.message
            })
        }
    }

    return (
        <>
            <div className="modal fade" tabIndex="-1" id="details-modal" style={{ display: 'block' }}>
                <div className="modal-dialog mw-900px">
                    <div className="modal-content">
                        <div className="modal-header py-2">
                            <h5 className="modal-title">{props.from} Details</h5>
                            <div className="btn btn-icon btn-sm btn-active-light-warning ms-2" data-bs-dismiss="modal" aria-label="Close">
                                <span className="svg-icon svg-icon-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black"></rect>
                                        <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black"></rect>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className="modal-body grey-background">
                            {venueBlobs.length > 0 && (
                                <div className='card'>
                                    <div className='card-body p-0'>

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
                                            {venueBlobs.length > 0 ? (
                                                venueBlobs.map((v, i) => (
                                                    <SwiperSlide key={i}>
                                                        <img className="d-block w-100" style={{ height: '300px' }} src={v} alt="Second slide" />
                                                    </SwiperSlide>
                                                ))
                                            ) : (
                                                <SwiperSlide>
                                                    <img className="d-block w-100" style={{ height: '300px' }} src={venue2} alt="Second slide" />
                                                </SwiperSlide>
                                            )}
                                        </Swiper>
                                    </div>
                                </div>
                            )}
                            <div className='card margin-t20'>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
                                            <div className="d-flex align-items-center">
                                                <div className="symbol symbol-35px symbol-60px symbol-circle">
                                                    <span className="symbol-label bg-primary text-white fw-bold fontSize-20">{props.show.Title.slice(0, 1)}</span>
                                                </div>
                                                <div className="ms-6">
                                                    <span className="d-flex align-items-center fs-5 fw-bolder text-dark text-hover-primary">{props.show.Title}</span>
                                                    <div className="fw-bold text-muted text-left"><span className='margin-r10'><i className="las la-user"></i>{props.show.HostName}</span><i className="las la-phone"></i>{props.show.Contact}</div>
                                                    <div className="fw-bold text-muted text-left"><span className='margin-r10'><i className="las la-building"></i>{props.show.Locality}</span><i className="las la-city"></i>{cityName.Name}</div>
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="text-end">
                                                    {/* <div className="fs-5 fw-bolder text-dark">$50,500</div>
                                                    <div className="fs-7 text-muted">Sales</div> */}

                                                    <button className='border-0 bg-transparent '
                                                        data-bs-toggle="popover"
                                                        data-bs-placement='left'
                                                        data-bs-original-title='Address'
                                                        data-bs-content={props.show.Address}
                                                        data-bs-trigger='click hover'
                                                    >
                                                        <i className='bi bi-geo-alt-fill fs-1 text-hover-primary'></i>
                                                    </button>
                                                    <button className='border-0 bg-transparent '
                                                        data-bs-toggle="popover"
                                                        data-bs-placement='left'
                                                        data-bs-original-title='About'
                                                        data-bs-content={props.show.About}
                                                        data-bs-trigger='click hover'
                                                    >
                                                        <FontAwesomeIcon className='text-primary' icon={faInfoCircle} size={"2x"} />
                                                    </button>
                                                    {props.show.Overview && <button className='border-0 bg-transparent '
                                                        data-bs-toggle="popover"
                                                        data-bs-placement='left'
                                                        data-bs-original-title='Overview'
                                                        data-bs-content={props.show.Overview}
                                                        data-bs-trigger='click hover'
                                                    >
                                                        <FontAwesomeIcon className='text-primary' icon={faInfoCircle} size={"2x"} />
                                                    </button>}

                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="d-flex flex-wrap">
                                            <div className='col-3'>
                                                <div className="border border-dashed border-gray-300 w-150px rounded my-3 p-4 me-6">
                                                    <span className="fs-1 fw-bolder text-gray-800 lh-1">
                                                        <span data-kt-countup="true" data-kt-countup-value="6,840" data-kt-countup-prefix="$" className="counted">$6,840</span>
                                                    </span>
                                                    <span className="fs-6 fw-bold text-muted d-block lh-1 pt-2">Price Start</span>
                                                </div>
                                            </div>
                                            <div className='col-3'>
                                                <div className="border border-dashed border-gray-300 w-150px rounded my-3 p-4 me-6">
                                                    <span className="fs-1 fw-bolder text-gray-800 lh-1">
                                                        <span data-kt-countup="true" data-kt-countup-value="6,840" data-kt-countup-prefix="$" className="counted">$6,840</span>
                                                    </span>
                                                    <span className="fs-6 fw-bold text-muted d-block lh-1 pt-2">Price End</span>
                                                </div>
                                            </div>
                                            <div className='col-3'>
                                                <div className="border border-dashed border-gray-300 w-150px rounded my-3 p-4 me-6">
                                                    <span className="fs-1 fw-bolder text-gray-800 lh-1">
                                                        <span data-kt-countup="true" data-kt-countup-value="6,840" data-kt-countup-prefix="$" className="counted">$6,840</span>
                                                    </span>
                                                    <span className="fs-6 fw-bold text-muted d-block lh-1 pt-2">Capacity Start</span>
                                                </div>
                                            </div>
                                            <div className='col-3'>
                                                <div className="border border-dashed border-gray-300 w-150px rounded my-3 p-4 me-6">
                                                    <span className="fs-1 fw-bolder text-gray-800 lh-1">
                                                        <span data-kt-countup="true" data-kt-countup-value="6,840" data-kt-countup-prefix="$" className="counted">$6,840</span>
                                                    </span>
                                                    <span className="fs-6 fw-bold text-muted d-block lh-1 pt-2">Capacity End</span>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className='row margin-20'>
                                        <div className={`${(props.catererDetails || props.venueDetails) ? 'col-4' : 'col-6'}`}>
                                            <div className="d-flex flex-aligns-center">
                                                <i className='fas fa-coins margin-tr5' style={{ fontSize: '30px' }}></i>
                                                <div className="ms-1 fw-bold">
                                                    <div className=''>Price</div>
                                                    <div className="text-gray-400 text-left">{props.show.StartRange}</div>
                                                </div>
                                            </div>
                                        </div>
                                        {props.catererDetails && (
                                            <>
                                                <div className='col-4'>
                                                    <div className="d-flex flex-aligns-center">
                                                        <i className="fa-solid fa-bowl-rice fa-md" style={{ fontSize: '28px' }}></i>
                                                        <div className="ms-1 fw-bold">
                                                            <div className=''>Price Per Plate</div>
                                                            <div className="text-gray-400 text-left">{props.show.PricePerPlate}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-4'>
                                                    <div className="d-flex flex-aligns-center">
                                                        <i className='fas fa-users margin-tr5' style={{ fontSize: '28px' }}></i>
                                                        <div className="ms-1 fw-bold">
                                                            <div className=''>Menu</div>
                                                            <div className="text-gray-400 text-left">
                                                                {props.show.Menu.map(m => (
                                                                    <span> {m.label} </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {props.venueDetails && (
                                            <>
                                                <div className='col-4'>
                                                    <div className="d-flex flex-aligns-center">
                                                        <i className='fas fa-users margin-tr5' style={{ fontSize: '30px' }}></i>
                                                        <div className="ms-1 fw-bold">
                                                            <div className=''>Min Capacity</div>
                                                            <div className="text-gray-400 text-left">{props.show.MinCapacity}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-4'>
                                                    <div className="d-flex flex-aligns-center">
                                                        <i className='fas fa-users margin-tr5' style={{ fontSize: '30px' }}></i>
                                                        <div className="ms-1 fw-bold">
                                                            <div className=''>Max Capacity</div>
                                                            <div className="text-gray-400 text-left">{props.show.MaxCapacity}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {props.photographerDetails && (
                                            <div className='col-6'>
                                                <div className="d-flex flex-aligns-center">
                                                    <i className='fas fa-users margin-tr5' style={{ fontSize: '30px' }}></i>
                                                    <div className="ms-1 fw-bold">
                                                        <div className=''>Travelling</div>
                                                        <div className="text-gray-400 text-left">{props.show.Travelling}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {props.decoratorDetails && (
                                            <div className='col-6'>
                                                <div className="d-flex flex-aligns-center">
                                                    <i className='fas fa-users margin-tr5' style={{ fontSize: '30px' }}></i>
                                                    <div className="ms-1 fw-bold">
                                                        <div className=''>Type of Decoration</div>
                                                        <div className="text-gray-400 text-left">{props.show.Type.map(t => t.label + ' | ')}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {!props.decoratorDetails && (
                                        <div className='row margin-20'>
                                            <div className='col ms-1 fw-bold'>
                                                <div className='text-left fs-5 margin-b10'>Amenities</div>
                                                <div className="anemities-list timeline-label d-flex justify-content-start">

                                                    {props.show.Amenities.map((c, i) => (
                                                        <span key={i} className="timeline-item me-5 mb-2" >
                                                            <span className="timeline-badge"><i className="fa fa-genderless text-warning fs-1"></i></span>
                                                            <span className="timeline-content text-left"><span className="fw-bolder text-gray-800 ps-3">{c.label}</span></span>
                                                        </span>
                                                    ))}

                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowDetailModal;