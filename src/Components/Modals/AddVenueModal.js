import React, { useEffect, useState } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { getAmenities, getCities, postVenue, updateVenue, venueActions } from "../../store/host/venue-slice";
import { auth } from "../../firebaseConfig/firebaseConfig";
import { DeleteImage, getFileExt, GetImage, getString, StartProcessing } from "../Global/Helper";
import Select from "react-select";
import CustomSelect from "./CustomSelect";
import ImageCropper from "../Global/ImageCropper";
import { uiActions } from "../../store/ui/ui-slice";
import Swal from "sweetalert2";
import { FileUploadHelper } from '../../Components/Global/Helper';

const AddVenueModal = (props) => {

    const [cropperData,         setCropperData]      = useState(null);
    const [venueBlobs,          setVenueBlobs]       = useState([]);
    const [editImageCropper,    setEditImageCropper] = useState(null);
    const [deletedImages,       setDeletedImages]    = useState([])
    const [addedImages,         setAddedImages]      = useState([]);

    const dispatch      = useDispatch();
    const currentUser   = useSelector(state => state.authReducer.currentUser);
    const cities        = useSelector(state => state.venueReducer.cities);
    const amenities     = useSelector(state => state.venueReducer.amenities);

    const initialValues = {
        HostName    : props.show.HostName || '',
        Title       : props.show.Title || '',       
        PriceRange  : props.show.PriceRange || '',
        MinCapacity : props.show.MinCapacity || '',
        MaxCapacity : props.show.MaxCapacity || '',
        City        : props.show.City || '',
        Locality    : props.show.Locality || '',
        Contact     : props.show.Contact || '',
        Address     : props.show.Address || '',
        Overview    : props.show.Overview ||'',
        About       : props.show.About ||'',
        Amenities   : props.show.Amenities || '',
    }

    const onSubmit = async (values) => {
        const btn = document.getElementById('add-venue');

        if (venueBlobs.length == 0) {
            return Swal.fire({
                icon                : "warning",                
                text                : 'Add Atleast One Image',
                buttonsStyling      : false,
                confirmButtonClass  : "btn btn-primary",
            });
        }
        StartProcessing(btn);

        if (props.venueDetails) {
            if (deletedImages && deletedImages.length > 0) {              
                for (const image of deletedImages) {
                    await DeleteImage(`venues-images/${image}`)
                }
            }

            let fileList = [];

            for(const image of addedImages) {
                const ext = getFileExt(image.name)
                const fileName = getString(20);
                const fileFullName = Date.now() + `${fileName}.${ext}`
                FileUploadHelper('venues-images', fileFullName, image);
                fileList = [...fileList, fileFullName]
            }

            let oldImage = [];

            for (const image of venueBlobs) {
                if (typeof(image) === 'string') {
                    const imageWithUrl = image.split('%2F')[1];
                    const finalImageName = imageWithUrl.split('?alt')[0];
                    oldImage = [...oldImage, finalImageName]
                }
            }

            const updatedImageList = [...oldImage, ...fileList]
            dispatch(updateVenue({ ID: props.venueDetails.ID, ...values, VendorID : currentUser.ID, Images: updatedImageList })) // Venue Action Creator

        } else {

            let fileList = [];
            for(const venueBlob of venueBlobs) {
                const ext = getFileExt(venueBlob.name)
                const fileName = getString(20);
                const fileFullName = Date.now() + `${fileName}.${ext}`
                FileUploadHelper('venues-images', fileFullName, venueBlob);
                fileList = [...fileList, fileFullName]
            }
            dispatch(postVenue({ ...values, Active: 'Y', VendorID : currentUser.ID, Images: fileList })) // Venue Action Creator
        }
    }

    const openImageModal = (e) => {
        if (venueBlobs && venueBlobs.length > 0) {
            setEditImageCropper({
                venueBlobs   : venueBlobs,
                imageRatio  : { width : 1000, height : 500},
                dataHandler : (val) =>  setVenueBlobs(val),
                header      : 'Edit Venue Image'
            });
        } else {
            setCropperData({
                imageRatio  : { width : 1000, height : 500},
                dataHandler : (val) =>  setVenueBlobs(val),
                header      : 'Venue Image'
            });
        }
    }

    const validationSchema = Yup.object({
        HostName    : Yup.string().required('Please enter hostname'),
        Title       : Yup.string().required('Please enter title'),      
        PriceRange  : Yup.string().required('Please provide price range'),
        MinCapacity : Yup.string().required('Please enter min capacity'),
        MaxCapacity : Yup.number().integer().required('Please enter max capacity').moreThan(Yup.ref('MinCapacity'), 'Max Capacity should be greater than Min Capacity'),
        City        : Yup.string().required('Please select city'),
        Locality    : Yup.string().required('This field is required'),
        Contact     : Yup.string().required('This field is required').min(10).max(10),
        Address     : Yup.string().required('This field is required'),
        About       : Yup.string().required('This field is required'),
        Amenities   : Yup.array().min(1, 'Please select aleast 1 amenitie').required("Provide at least one amenitie"),        
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    useEffect(() => {
        dispatch(getCities())
        dispatch(getAmenities())
    }, [dispatch]);

    useEffect(() => {
        if (props.venueDetails) {
            const getImageUrl = async (path) => {
                const imageUrl = await GetImage(`venues-images/${path}`);
                setVenueBlobs( d => [...d, imageUrl]);
            }
            for (const venueBlob of props.venueDetails.Images) {
                getImageUrl(venueBlob);
            }
        }
    }, [props.venueDetails]);

    useEffect(() => {
        $('#add-venue-modal').modal({ backdrop: 'static'});
        $('#add-venue-modal').on('hidden.bs.modal',function() { props.onDismissModal( false ) })
        $('#add-venue-modal').modal('toggle');
    }, [props.show])

    return (
        <>
            <div className="modal fade"  tabIndex="-1" id="add-venue-modal"  style={{display:'block'}}>
                <div className="modal-dialog mw-900px">
                    <div className="modal-content">
                        <div className="modal-header py-2">
                            <h5 className="modal-title">{props.venueDetails ? 'Edit Venue' : 'Add Venue'}</h5>   
                            <div className="btn btn-icon btn-sm btn-active-light-warning ms-2" data-bs-dismiss="modal" aria-label="Close">
                                <span className="svg-icon svg-icon-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black"></rect>
                                        <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black"></rect>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <form id="add-venue-form" onSubmit={formik.handleSubmit}>       
                            <div className="modal-body">
                                <div className="row mb-5">
                                    <div className="col-4">
                                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span className="required"> Host Name </span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="HostName" 
                                            value={formik.values.HostName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}           
                                            className={`form-control ${(formik.touched.HostName && formik.errors.HostName) && 'is-invalid' }`}
                                        />
                                        {(formik.touched.HostName && formik.errors.HostName) ? <div className="error">{formik.errors.HostName}</div> : null}
                                    </div>
                                    <div className="col-4">
                                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span className="required"> Venue Name </span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="Title"  
                                            onChange={formik.handleChange}
                                            value={formik.values.Title}
                                            onBlur={formik.handleBlur}                
                                            className={`form-control ${(formik.touched.Title && formik.errors.Title) && 'is-invalid' }`}
                                        />
                                        {(formik.touched.Title && formik.errors.Title) ? <div className="error">{formik.errors.Title}</div> : null}
                                    </div>
                                    <div className="col-4">
                                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span className="required"> Upload Image </span>
                                        </label>
                                        <span className='btn btn-secondary form-control' onClick={openImageModal} ><i className='fa fa-upload'></i>{`${venueBlobs.length == 0 ? "Upload Venue Images" : venueBlobs.length + " Images Upload"}`}</span>
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-4">
                                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span className="required"> Price Range </span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="PriceRange"
                                            value={formik.values.PriceRange}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}                
                                            className={`form-control ${(formik.touched.PriceRange && formik.errors.PriceRange) && 'is-invalid' }`}
                                        />
                                        {(formik.touched.PriceRange && formik.errors.PriceRange) ? <div className="error">{formik.errors.PriceRange}</div> : null}
                                    </div>
                                    <div className="col-4">
                                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span className="required"> Min Capacity </span>
                                        </label>
                                        <input 
                                            type="number" 
                                            name="MinCapacity"             
                                            value={formik.values.MinCapacity}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}                
                                            className={`form-control ${(formik.touched.MinCapacity && formik.errors.MinCapacity) && 'is-invalid' }`} 
                                        />
                                        {(formik.touched.MinCapacity && formik.errors.MinCapacity) ? <div className="error">{formik.errors.MinCapacity}</div> : null}
                                    </div>
                                    <div className="col-4">
                                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span className="required"> Max Capacity </span>
                                        </label>
                                        <input 
                                            type="number" 
                                            name="MaxCapacity"   
                                            value={formik.values.MaxCapacity}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}                
                                            className={`form-control ${(formik.touched.MaxCapacity && formik.errors.MaxCapacity) && 'is-invalid' }`}
                                        />
                                        {(formik.touched.MaxCapacity && formik.errors.MaxCapacity) ? <div className="error">{formik.errors.MaxCapacity}</div> : null}
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-4">
                                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span className="required"> City </span>
                                        </label>
                                        <CustomSelect
                                            options={cities.map(c => ({
                                                label : c.Name,
                                                value : c.Name
                                            }))}
                                            classNamePrefix="custom-select"
                                            value={formik.values.City}
                                            onChange={value => formik.setFieldValue('City', value.value)}
                                        />
                                       
                                        {(formik.touched.City && formik.errors.City) ? <div className="error">{formik.errors.City}</div> : null}                                      
                                    </div>
                                    <div className="col-4">
                                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span className="required"> Locality </span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="Locality"            
                                            value={formik.values.Locality}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}                
                                            className={`form-control ${(formik.touched.Locality && formik.errors.Locality) && 'is-invalid' }`}
                                        />
                                        {(formik.touched.Locality && formik.errors.Locality) ? <div className="error">{formik.errors.Locality}</div> : null}
                                    </div>
                                    <div className="col-4">
                                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span className="required"> Contact No. </span>
                                        </label>
                                        <input 
                                            type="number" 
                                            name="Contact"                   
                                            value={formik.values.Contact}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}                
                                            className={`form-control ${(formik.touched.Contact && formik.errors.Contact) && 'is-invalid' }`}
                                        />
                                        {(formik.touched.Contact && formik.errors.Contact) ? <div className="error">{formik.errors.Contact}</div> : null}
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col">
                                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span className="required"> Amenities </span>
                                        </label>    
                                        <Select
                                            className="amenities text-left"
                                            isMulti
                                            onChange={value => formik.setFieldValue('Amenities', value)}
                                            placeholder='Select Amenities'
                                            name="Amenities"
                                            options={amenities.map(a => ({
                                                label: a,
                                                value: a
                                            }))}
                                            value={formik.values.Amenities}
                                        />
                                        {(formik.touched.Amenities && formik.errors.Amenities) ? <div className="error">{formik.errors.Amenities}</div> : null}                                      
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col">
                                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span className="required"> Venue Address </span>
                                        </label>
                                        <textarea 
                                            type="text"
                                            rows='2' 
                                            name="Address"        
                                            value={formik.values.Address}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}                
                                            className={`form-control ${(formik.touched.Address && formik.errors.Address) && 'is-invalid' }`}
                                        />
                                        {(formik.touched.Address && formik.errors.Address) ? <div className="error">{formik.errors.Address}</div> : null}
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-6">
                                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span> Overview </span>
                                        </label>
                                        <textarea 
                                            type="text"
                                            rows='5' 
                                            name="Overview"           
                                            value={formik.values.Overview}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}                
                                            className={`form-control ${(formik.touched.Overview && formik.errors.Overview) && 'is-invalid' }`}
                                        />
                                        {(formik.touched.Overview && formik.errors.Overview) ? <div className="error">{formik.errors.Overview}</div> : null}
                                    </div>
                                    <div className="col-6">
                                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span className="required"> About </span>
                                        </label>
                                        <textarea 
                                            type="text"
                                            rows='5' 
                                            name="About"             
                                            value={formik.values.About}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}                
                                            className={`form-control ${(formik.touched.About && formik.errors.About) && 'is-invalid' }`}
                                        />
                                        {(formik.touched.About && formik.errors.About) ? <div className="error">{formik.errors.About}</div> : null}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="row">
                                    <div className="col">
                                        <button data-bs-dismiss="modal" aria-label="Close" type="button" className="btn btn-secondary"> Close </button>
                                    </div>
                                    <div className="col">
                                        <span id="add-venue" className="btn btn-primary" 
                                            onClick={formik.handleSubmit}
                                        >{props.venueDetails ? 'Update' : 'Add'}</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {cropperData && (
                <ImageCropper
                    show           = {cropperData}
                    header         = {cropperData.header}   
                    imageRatio     = {cropperData.imageRatio}
                    dataHandler    = {cropperData.dataHandler}
                    onDismissModal = {() => setCropperData(null)}
                    from           = '#add-venue-modal'
                />
            )}
            {editImageCropper && (
                <ImageCropper
                    show           = {editImageCropper}
                    header         = {editImageCropper.header}   
                    imageRatio     = {editImageCropper.imageRatio}
                    imageBlobs     = {editImageCropper.venueBlobs}
                    dataHandler    = {editImageCropper.dataHandler}
                    deletedImages  = {setDeletedImages}
                    addedImages    = {setAddedImages}
                    onDismissModal = {() => setEditImageCropper(null)}
                    from           = '#add-venue-modal'
                />
            )}
        </>
    )
}


export default AddVenueModal;