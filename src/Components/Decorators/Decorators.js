import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deactivateDecorator, decoratorActions, getDecorators } from '../../store/host/decorator-slice';
import AddDecoratorModal from '../Modals/AddDecoratorModal';
import { venueActions } from '../../store/host/venue-slice';
import ShowDetailModal from '../Modals/ShowDetailsModal';
import { CustomSwiper } from '../Venues/Venues';
import noresult from "../../Assets/images/addService.png";

const Decorators = () =>  {

    const dispatch = useDispatch();

    const showEditDecoratorModal = useSelector(state => state.decoratorReducer.showEditDecoratorModal);
    const showAddDecoratorModal  = useSelector(state => state.decoratorReducer.showAddDecoratorModal);

    const currentUser     = useSelector(state => state.authReducer.currentUser);
    const decorator       = useSelector(state => state.decoratorReducer.decoratorList);
    const showDetailModal = useSelector(state => state.venueReducer.showDetailModal);

    const [filteredDecorator, setFilteredDecorator] = useState([]);
    const [searchString, setSearchString]           = useState('');

    useEffect(() => {
        if(decorator.length > 0)
            filterDecorator();
        else 
            setFilteredDecorator([])
    }, [decorator, searchString]);

    const filterDecorator = async () => {
        if (searchString === '') {
            setFilteredDecorator(decorator);
        } else {
            const matchedDecorator = decorator.filter((v) => {
                let matchString = `${v.Title} ${v.Host} ${v.Address}`;
                let matchFound  = 0;
                const searchArr = searchString.split(' ');
                searchArr.forEach((term) => matchFound += matchString.toLowerCase().includes(term.toLowerCase()) ? 1 : 0 );
                return matchFound === searchArr.length;
            });
            setFilteredDecorator(matchedDecorator);
        }
    };

    const openDecoratorModal = () => {
        dispatch(decoratorActions.setShowAddDecoratorModal());
    };

    const dismissEditModal = () => {
        dispatch(decoratorActions.setShowEditDecoratorModal(null));
    }

    const openEditDecoratorModal = (c) => {
        dispatch(decoratorActions.setShowEditDecoratorModal(c))
    }

    const openDetailsModal = (v) => {
        dispatch(venueActions.setShowDetailModal(v))
    }

    const deleteDecorator = (v) => {
        dispatch(deactivateDecorator({ ...v, Active: 'N'}))
    }

    useEffect(() => {
        let maxHeightAddress = Math.max.apply(null, $(".address-height").map(function () { return $(this).height() }).get());
        let maxHeight = Math.max.apply(null, $(".title-height").map(function () { return $(this).height() }).get());
        $('.title-height').css('height', maxHeight)
        $('.address-height').css('height', maxHeightAddress)
    })

    useEffect(() => {
        if (currentUser.ID) dispatch(getDecorators(currentUser.ID))
    }, [currentUser]);

    return (
        <>
            <div className="card margin-l25 margin-r25">
                <div className="card-header">
                    <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder">
                        <li className="nav-item mt-2">
                            <NavLink className="nav-link text-active-primary ms-0 me-10 py-5" to="/host/decorators/all">
                                <span>Decorators</span>
                            </NavLink>
                        </li>
                        {/* <li className="nav-item mt-2">
                            <NavLink className="nav-link text-active-primary ms-0 me-10 py-5" to="/host/decorators/booking">
                                <span>Booking</span>
                            </NavLink>
                        </li> */}
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
                        <div>
                            <button className="btn btn-primary btn-sm" style={{display: 'inline'}} 
                                onClick={openDecoratorModal}
                            >
                                <i className="la la-plus"></i>
                                New Decorator
                            </button>
                        </div>
                    </div>                   
                </div>
            </div>
            {(  <div className="margin-l25 margin-r25 margin-t20 row padding-0">
                    {filteredDecorator.length > 0 ? (
                        filteredDecorator.map((v, i) => (
                            <div className="col-md-3 col-12 padding-l0 padding-r0" key={i} >
                                <div className="card me-md-6 text-left mb-4" >
                                    <div className="card-body padding-10">
                                        <div className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover  min-h-200px">
                                            <CustomSwiper images={v.Images} from='decorator-images'/>
                                        </div>
                                        <div className="m-0 mt-4 padding-lr15">
                                            <div className="fs-4 text-dark fw-bolder text-hover-primary text-dark lh-base title-height">
                                                {v.Title}
                                            </div>
                                            
                                            <div className="fw-bold fs-5 text-gray-600 text-dark mt-3 mb-5 address-height">
                                                {v.Address}
                                            </div>
                                        
                                            <div className='row mt-5'>
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
                                                            <li><a className="dropdown-item" onClick={() => openDetailsModal(v)}>Show Details</a></li>
                                                            <li><a className="dropdown-item" onClick={() => openEditDecoratorModal(v)}>Edit Decorator</a></li>
                                                            <li><a className="dropdown-item" onClick={() => deleteDecorator(v)}>Delete Decorator</a></li>
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
            )}
            
            {showAddDecoratorModal && ( <AddDecoratorModal show={showAddDecoratorModal} onDismissModal={openDecoratorModal} /> )}

            {showEditDecoratorModal && (
                <AddDecoratorModal
                    decoratorDetails={showEditDecoratorModal}
                    show={showEditDecoratorModal}
                    onDismissModal={dismissEditModal}
                />
            )}
            {showDetailModal && (
                <ShowDetailModal
                    decoratorDetails={showDetailModal}       
                    show={showDetailModal}
                    from='Decorator'
                    onDismissModal={() => dispatch(venueActions.setShowDetailModal(null))}
                />
            )}
        </>
    )
}

export default Decorators