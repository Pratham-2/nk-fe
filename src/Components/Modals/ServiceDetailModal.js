import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig/firebaseConfig';
import venue1 from '../../Assets/images/venue1.jpg'
import venue2 from '../../Assets/images/venue2.jpg'
import venue3 from '../../Assets/images/venue3.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import "../../../node_modules/swiper/modules/effect-fade/effect-fade.min.css"
import 'swiper/css';
import 'swiper/css/bundle';
import { Navigation, Autoplay, EffectFade, } from "swiper";
import { GetImage } from '../Global/Helper';
import swal from 'sweetalert2';

const ServiceDetailModal = (props) => {

    const { show, selectedService, onDismissModal, pathPrefix } = props;

    // const [cityName, setCityName] = useState('');
    const [serviceData, setServiceData] = useState();

    // const fetchCity = async () => {
    //     try {
    //         const response = await db.collection('City').doc(selectedService.City).get();
    //         if (response) setCityName(response.data());
    //     } catch (err) {
    //         swal.fire({ icon: 'error', titleText: err.message })
    //     }
    // }

    useEffect(() => {
        const setData = async () => {
            try {
                let Images = [];

                for (const image of selectedService.Images) {
                    const imageUrl = await GetImage(`${pathPrefix}/${image}`);

                    if (imageUrl != 'ImageNotFound')
                        Images.push(imageUrl);
                }
                setServiceData({ ...selectedService, Images });

                $('[data-toggle="popover"]').popover({
                    placement: 'left',
                    title: 'Address',
                    content: selectedService.Address,
                    trigger: 'click hover'
                })
            } catch (err) {
                swal.fire({
                    icon: 'error',
                    titleText: err.message
                })
            }
        }

        if (!!selectedService) setData();
    }, [selectedService])

    useEffect(() => {
        $('#ServiceDetailModal').modal({ backdrop: 'static' });
        $('#ServiceDetailModal').on('hidden.bs.modal', function () { onDismissModal() })
        $('#ServiceDetailModal').modal('toggle');

       // fetchCity();
    }, [show]);

    return (
        <>
            <div className="modal fade" tabIndex="-1" id="ServiceDetailModal" style={{ display: 'block' }}>
                <div className="modal-dialog mw-900px">
                    <div className="modal-content">
                        <div className="modal-header py-2">
                            <h5 className="modal-title"> Details </h5>
                            <div className="btn btn-icon btn-sm btn-active-light-warning ms-2" data-bs-dismiss="modal" aria-label="Close">
                                <span className="svg-icon svg-icon-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black"></rect>
                                        <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black"></rect>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        {serviceData && (<>
                            <div className="modal-body grey-background">
                                <div className='card'>
                                    <div className='card-body p-0'>

                                        <Swiper
                                            effect     ={"fade"}
                                            navigation ={true}
                                            modules    ={[Navigation, Autoplay, EffectFade]}
                                            className  ="mySwiper"
                                            loop       ={true}
                                            autoplay   ={{ delay: 2000 }}
                                        >
                                            {serviceData.Images.length > 0 && (
                                                serviceData.Images.map((p, i) => (
                                                    <SwiperSlide key={i}>
                                                        <img className="d-block w-100" style={{ height: '400px' }} src={p} alt="First slide" />
                                                    </SwiperSlide>
                                                ))
                                            )}
                                        </Swiper>
                                    </div>
                                </div>
                                <div className='card margin-t20'>
                                    <div className='card-body'>
                                        <div className='row mb-4'>
                                            <div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
                                                <div className="d-flex align-items-center">
                                                    <div className="symbol symbol-35px symbol-60px symbol-circle">
                                                        <span className="symbol-label bg-primary text-white fw-bold fontSize-20">{serviceData.Title.slice(0, 1)}</span>
                                                    </div>
                                                    <div className="ms-6">
                                                        <span className="d-flex align-items-center fs-5 fw-bolder text-dark text-hover-primary">{serviceData.Title}</span>
                                                        <div className="fw-bold text-muted text-left">
                                                            <span className='margin-r10'>
                                                                <i className="las la-user"></i>{serviceData.HostName}
                                                            </span>
                                                            <i className="las la-phone"></i>{serviceData.Contact}
                                                        </div>
                                                        <div className="fw-bold text-muted text-left">
                                                            <span className='margin-r10'>
                                                                <i className="las la-building"></i>{serviceData.Locality}
                                                            </span>
                                                            <i className="las la-city"></i>{serviceData.City}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex">
                                                    <div className="text-end">
                                                        <span className='border-0 bg-transparent me-3' data-toggle="popover">
                                                            <i className='bi bi-geo-alt-fill fs-1 text-hover-primary'></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 text-left'>

                                                <div className="ms-1 mb-3 fw-bold fs-4">
                                                    <div className=''>Price Range :
                                                        <span className='text-gray-400'>  {serviceData.PriceRange}</span>
                                                        {/* <span className='text-gray-400'>  {serviceData.StartRange} - {serviceData.EndRange} </span> */}
                                                    </div>
                                                </div>
                                                {serviceData.Overview && (
                                                    <div className="ms-1 mb-3 fw-bold fs-4">
                                                        <div className=''> Overview :
                                                            <span className='text-gray-400'>  {serviceData.Overview}  </span>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="ms-1 mb-3 fw-bold fs-4">
                                                    <div className=''> About :
                                                        <span className='text-gray-400'>  {serviceData.About}  </span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceDetailModal;