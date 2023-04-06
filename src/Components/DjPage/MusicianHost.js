import React, { useEffect, useState }  from 'react'
import { NavLink, useParams } from 'react-router-dom';
import noresult from "../../Assets/images/addService.png";
import { useDispatch, useSelector } from 'react-redux';
import AddServiceModal from '../Modals/AddServiceModal';
import { getService, deactivateService, postService, updateService } from "../../store/host/service-slice";  
import venue1 from '../../Assets/images/venue1.jpg'
import ServiceDetailModal from '../Modals/ServiceDetailModal';
import { CustomSwiper } from '../Venues/Venues';


const MusicianHost = () => {

    const serviceName = 'Musician';
    const dispatch    = useDispatch();
    const param       = useParams();

    const currentUser    = useSelector(state => state.authReducer.currentUser);
    const musicianList   = useSelector( s => s.serviceReducer.musicianList);

    const [serviceList    ,     setserviceList]     = useState([]);
    const [showAddModal   ,     setShowModal]       = useState(false);
    const [selectedService,     setSelectedService] = useState();
    const [editService    ,     setEditService]     = useState();
    const [filteredMusician,    setFilteredMusician]   = useState([]);
    const [searchString,        setSearchString]    = useState('');

    useEffect(() => {
        if(serviceList.length > 0)
            filterMusician();
        else 
            setFilteredMusician([])
    }, [serviceList, searchString]);

    const filterMusician = async () => {

        if (searchString === '') {
            setFilteredMusician(serviceList);
        } else {
            const matchedMusician = serviceList.filter((v) => {
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
            setFilteredMusician(matchedMusician);
        }
    };

    const onOpenModal = () => setShowModal(true); 

    const postMusician = ( params ) => {
        if(!!params) dispatch(postService( { serviceData : params , serviceName } ));
    };

    const updateMusician = ( params ) => {
        if(!!params) dispatch(updateService( { serviceData : params , serviceName } ));
    }
    
    const deleteMusician = (service) => {
        dispatch(deactivateService({ serviceName, serviceID : service.ID }))
    }

    const openDetailsModal = (v) => { setSelectedService(v) };
    
    const onEditService = (v) => { setEditService(v) };

    useEffect(() => {
        if (currentUser.ID)
            dispatch(getService({ serviceName , vendorID : currentUser.ID}))
    }, [currentUser]);


    useEffect( () => {   
        if(musicianList.length > 0){
            setserviceList(musicianList);
        }
    }, [musicianList])

    useEffect(() => {
        let maxHeightAddress = Math.max.apply(null, $(".address-height").map(function ()
        {
            return $(this).height();
        }).get());
        let maxHeight = Math.max.apply(null, $(".title-height").map(function ()
        {
            return $(this).height();
        }).get());
        $('.title-height').css('height', maxHeight)
        $('.address-height').css('height', maxHeightAddress)
    })

    return (
        <>
            <div className="card margin-l25 margin-r25">
                <div className="card-header">
                    <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder">
                        <li className="nav-item mt-2">
                            <NavLink className="nav-link text-active-primary ms-0 me-10 py-5" to="/host/musicians/all">
                                <span> Musician </span>
                            </NavLink>
                        </li>
                        
                    </ul>
                  
                    <div className='card-toolbar'>
                        <div className="position-relative text-left me-3">
                            <span className="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black"></rect>
                                    <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black"></path>
                                </svg>
                            </span>
                            <input type="text" className="form-control form-control-solid ps-10" name="search" onChange={(e) => setSearchString(e.target.value)} value={searchString || ''} placeholder="Search"/>
                        </div>
                        <div >
                            <span className="btn btn-primary btn-sm" style={{display: 'inline'}} onClick={onOpenModal} >
                                <i className="la la-plus"></i> Add New
                            </span>
                        </div>
                    </div>
                 
                </div>
            </div>
            {param.tab === 'booking' ? (
                <div>

                </div>
            ) : (
                <div className="margin-l25 margin-r25 margin-t20 row padding-0">
                    { (filteredMusician.length > 0 ) ? (
                        filteredMusician.map((v, i) => (
                            <div className="col-md-4 col-12 padding-l0 padding-r0" key={i} >
                                <div className="card me-md-6 text-left mb-4" >
                                    <div className="card-body padding-10">
                                    
                                        <div className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover  min-h-200px"
                                        >
                                            <CustomSwiper images={v.Images} from='service-images'/>
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
                                                        <span  className="text-gray-700 text-hover-primary">
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
                                                            <li><a className="dropdown-item" onClick={() => openDetailsModal(v)}> Show Details</a></li>
                                                            <li><a className="dropdown-item" onClick={() => onEditService(v)} > Edit </a> </li>
                                                            <li><a className="dropdown-item" onClick={() => deleteMusician(v)}> Delete </a></li>
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
                     ):(<>
                        <div className="col-12">	
                            <div className="card me-md-6 text-left mb-4" >
                                <div className="card-body padding-10 text-center">
                                    <img src={noresult} alt='no-result-image' height={250} />
                                    <h2 className="fw-bolder text-dark lh-base"> List Your Service ..! </h2>
                                </div>	
                            </div>
                        </div>
                     </>)
                    }
                </div>
            )}

            {showAddModal && (
                <AddServiceModal
                    show            = {showAddModal}
                    onDismissModal  = {() => setShowModal(false)}
                    serviceName     = {serviceName}
                    serviceDetails  = {false}
                    AddService      = {postMusician}
                    UpdateService   = {updateMusician}
                />
            )}

            
            {!!editService && (
                <AddServiceModal
                    show            = {!!editService}
                    onDismissModal  = {() => setEditService(false)}
                    serviceName     = {serviceName}
                    serviceDetails  = {editService}
                    AddService      = {postMusician}
                    UpdateService   = {updateMusician}
                />
            )}

            {!!selectedService && (
                <ServiceDetailModal 
                    show            = {!!selectedService}
                    selectedService = {selectedService}       
                    pathPrefix      = "service-images"
                    onDismissModal  = {() => setSelectedService(false) }
                />
            )}
        </>
    )
}

export default MusicianHost;