import React, { useEffect, useState } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { getCities } from "../../store/host/venue-slice";
import { DeleteImage, getFileExt, GetImage, getString, FileUploadHelper, StartProcessing } from "../Global/Helper";
import CustomSelect from "./CustomSelect";
import ImageCropper from "../Global/ImageCropper";

const AddServiceModal = (props) => {

    const { serviceName, AddService, UpdateService, serviceDetails } = props;

    const [cropperData,         setCropperData]      = useState(null);
    const [ImageBlobs,          setImageBlobs]       = useState([]);
    const [editImageCropper,    setEditImageCropper] = useState(null);
    const [deletedImages,       setDeletedImages]    = useState([])
    const [addedImages,         setAddedImages]      = useState([]);

    const dispatch    = useDispatch();

    const cities      = useSelector(state => state.venueReducer.cities);
    const currentUser = useSelector(state => state.authReducer.currentUser);

    let initialValues = {
        HostName    : serviceDetails.HostName   || '',
        Title       : serviceDetails.Title      || '',
        City        : serviceDetails.City       || '',
        Locality    : serviceDetails.Locality   || '',
        Contact     : serviceDetails.Contact    || '',
        Address     : serviceDetails.Address    || '',
        Overview    : serviceDetails.Overview   || '',
        About       : serviceDetails.About      || '',
        PriceRange  : serviceDetails.PriceRange || '',
        // StartRange  : serviceDetails.StartRange || '',
        // EndRange    : serviceDetails.EndRange   || '',
    }

    const validationSchema = Yup.object({
        HostName    : Yup.string().required('This field is required'),
        Title       : Yup.string().required('This field is required'),
        PriceRange  : Yup.string().required('Please provide price range'),
        City        : Yup.string().required('Please select city'),
        Locality    : Yup.string().required('This field is required'),
        Contact     : Yup.string().required('This field is required').min(10).max(10),
        Address     : Yup.string().required('This field is required'),
        Overview    : Yup.string(),
        About       : Yup.string().required('This field is required'),    
        // StartRange  : Yup.number().integer().required('Required'),
        // EndRange    : Yup.number().integer().required('Required'), 
    });

    useEffect(() => {
        dispatch(getCities())
    }, [dispatch]);

    useEffect(() => {
        $('#add-service-modal').modal({ backdrop: 'static'});
        $('#add-service-modal').on('hidden.bs.modal',function() { props.onDismissModal( false ) })
        $('#add-service-modal').modal('toggle');
    }, [props.show]);

    useEffect(() => {
        if(serviceDetails && serviceDetails.Images.length > 0){
            const getImageUrl = async (path) => {
                const imageUrl = await GetImage(`service-images/${path}`);
                if(imageUrl != 'ImageNotFound') setImageBlobs( d => [ ...d, imageUrl]);
            }
            
            for (const img of serviceDetails.Images) { getImageUrl(img) }
        }
    }, [serviceDetails])


    const onSubmit = async(values) => {
        const btn = document.getElementById('add-service');
        
        if (ImageBlobs.length == 0) {
            return Swal.fire({
                icon                : "warning",
                text                : 'Add Atleast One Image',
                buttonsStyling      : false,
                confirmButtonClass  : "btn btn-primary",
            });
        }

        StartProcessing(btn)

        if (serviceDetails) {
            if (deletedImages && deletedImages.length > 0) {
                for (const image of deletedImages) {
                    await DeleteImage(`service-images/${image}`)
                }
            }
            
            let fileList = [];
            for(const image of addedImages) {
                const ext           = getFileExt(image.name)
                const fileName      = getString(20);
                const fileFullName  = Date.now() + `${fileName}.${ext}`
                FileUploadHelper('service-images', fileFullName, image);
                fileList.push(fileFullName);
            }

            let oldImage = [];

            for (const image of ImageBlobs) {
                if (typeof(image) == 'string') {
                    const imageWithUrl   = image.split('%2F')[1];
                    const finalImageName = imageWithUrl.split('?alt')[0];
                    oldImage.push(finalImageName);
                }
            }

            const updatedImageList = [...oldImage, ...fileList]

            // UPDATE ACTION CREATOR
            UpdateService ({ ID: serviceDetails.ID, ...values, VendorID : currentUser.ID, Images : updatedImageList });
        }
        else {

            let fileList = [];
            for(const venueBlob of ImageBlobs) {
                const ext           = getFileExt(venueBlob.name)
                const fileName      = getString(20);
                const fileFullName  = Date.now() + `${fileName}.${ext}`
                FileUploadHelper('service-images', fileFullName, venueBlob);
                fileList = [...fileList, fileFullName]
            }
            
            //ADD ACTION CREATOR
            AddService({ ...values, Active: 'Y', VendorID : currentUser.ID, Images: fileList });
        }
    }

    const formik = useFormik({ initialValues, validationSchema, onSubmit });

    const openImageModal = (e) => {
        if (ImageBlobs && ImageBlobs.length > 0) {
            setEditImageCropper({
                ImageBlobs   : ImageBlobs,
                imageRatio  : { width : 1000, height : 500},
                dataHandler : (val) =>  setImageBlobs(val),
                header      : 'Edit Image'
            });
        } else {
            setCropperData({
                imageRatio  : { width : 1000, height : 500},
                dataHandler : (val) =>  setImageBlobs(val),
                header      : 'Add Image'
            });
        }
    }

    return (
        <>
            <div className="modal fade"  tabIndex="-1" id="add-service-modal"  style={{display:'block'}}>
                <div className="modal-dialog mw-900px">
                    <div className="modal-content">
                        <div className="modal-header py-2">
                            <h5 className="modal-title"> { serviceDetails ? 'Edit' : 'Add'} {serviceName ? serviceName : ''}</h5>   
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
                                    <div className="col-md-6 col-12">
                                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span className="required">  Display Name  </span>
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
                                    <div className="col-md-6 col-12">
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
                                  
                                </div>
                                <div className="row mb-5">
                                    <div className="col-md-4 col-6">
                                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span className="required"> Contact No. </span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="Contact"                   
                                            value={formik.values.Contact}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}                
                                            className={`form-control ${(formik.touched.Contact && formik.errors.Contact) && 'is-invalid' }`}
                                        />
                                        {(formik.touched.Contact && formik.errors.Contact) ? <div className="error">{formik.errors.Contact}</div> : null}
                                    </div>
                                    <div className="col-md-4 col-6">
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
                                    {/* <div className="col-md-4 col-6">
                                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span className="required"> Price Range ₹</span>
                                        </label>
                                        <div className="input-group">
                                            <input 
                                                type="number" 
                                                name="StartRange"
                                                value={formik.values.StartRange}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}                
                                                className={`form-control ${(formik.touched.StartRange && formik.errors.StartRange) && 'is-invalid' }`}
                                            />
                                             <span className="input-group-text"> - </span>
                                            <input 
                                                type="number" 
                                                name="EndRange"
                                                value={formik.values.EndRange}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}                
                                                className={`form-control ${(formik.touched.EndRange && formik.errors.EndRange) && 'is-invalid' }`}
                                            />
                                        </div>
                                        {( (formik.touched.StartRange && formik.errors.StartRange) || (formik.touched.EndRange && formik.errors.EndRange) ) ? <div className="error">{ formik.errors.StartRange  || formik.errors.EndRange}</div> : null}
                                    </div> */}
                                    
                                    <div className="col-md-4 col-12">
                                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span className="required"> Upload Image </span>
                                        </label>
                                        <span className='btn btn-light form-control' onClick={openImageModal} ><i className='fa fa-upload'></i>{`${ImageBlobs.length == 0 ? "Upload Images" : ImageBlobs.length + " Images Upload"}`}</span>
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div   div className="col-md-6 col-12">
                                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span className="required"> City </span>
                                        </label>
                                        <CustomSelect
                                            options         = { cities.map(c => ({ label : c.Name, value : c.Name }))}
                                            classNamePrefix = "custom-select"
                                            value           = { formik.values.City}
                                            onChange        = { value => formik.setFieldValue('City', value.value)}
                                        />
                                        {(formik.touched.City && formik.errors.City) ? <div className="error">{formik.errors.City}</div> : null}                                        
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span className="required"> Locality </span>
                                        </label>
                                        <input 
                                            type     = "text" 
                                            name     = "Locality"            
                                            value    = { formik.values.Locality}
                                            onChange = { formik.handleChange}
                                            onBlur   = { formik.handleBlur}                
                                            className= {`form-control ${(formik.touched.Locality && formik.errors.Locality) && 'is-invalid' }`}
                                        />
                                        {(formik.touched.Locality && formik.errors.Locality) ? <div className="error">{formik.errors.Locality}</div> : null}
                                    </div>                                   
                                </div>
                                <div className="row mb-5">
                                    <div className="col">
                                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span className="required">Address </span>
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
                                            <span > Overview </span>
                                        </label>
                                        <textarea 
                                            type="text"
                                            rows='5' 
                                            name="Overview"           
                                            value={formik.values.Overview}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}                
                                            className="form-control"
                                        />
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
                                        <button type="submit" id="add-service" className="btn btn-primary" onClick={formik.handleSubmit}> { serviceDetails ? 'Edit' : 'Add'} </button>
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
                    from           = '#add-service-modal'
                />
            )}
            {editImageCropper && (
                <ImageCropper
                    show           = {editImageCropper}
                    header         = {editImageCropper.header}   
                    imageRatio     = {editImageCropper.imageRatio}
                    imageBlobs     = {editImageCropper.ImageBlobs}
                    dataHandler    = {editImageCropper.dataHandler}
                    deletedImages  = {setDeletedImages}
                    addedImages    = {setAddedImages}
                    onDismissModal = {() => setEditImageCropper(null)}
                    from           = '#add-service-modal'

                />
            )}
        </>
    )

}

export default AddServiceModal;