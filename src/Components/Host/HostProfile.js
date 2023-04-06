import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultimg from '../../Assets/images/defaultProfile.png'
import { useFormik } from "formik";
import * as Yup from 'yup'
import Swal from "sweetalert2";
import { FileUploadHelper, StartProcessing, StopProcessing } from "../Global/Helper";
import { UpdateProfile } from "../../store/auth/auth-slice";
import ProfileImageCropper from "../Global/ProfileImageCropper";
import { useHistory } from "react-router-dom";


// const getYupValidationRule =(cuser) => {
//     let defaultRule = {
//         Firstname : Yup.string().required('Enter firstname'),
//         Lastname  : Yup.string().required('Enter lastename'),
//         Email     : Yup.string().required('Email is required'),
//         Phone     : Yup.string(),
//     }

//     if(cuser && cuser.Usertype == 'host') 
//         defaultRule.Phone =  Yup.string().required('Required');

//     return defaultRule; 
// }


const HostProfile = () => {
    
    const dispatch = useDispatch();
    const history  = useHistory();
    
    const currentUser = useSelector( state => state.authReducer.currentUser);

    const [userImage, setUserImage] = useState(defaultimg);
    const [showCropper, setShowCropper] = useState(false);

    const [userData, setUserData] = useState(currentUser);

    let initialValues = {
        Firstname : userData.Firstname  || '',
        Lastname  : userData.Lastname   || '',
        Email     : userData.Email      || '',
        Phone     : userData.Phone      || '',
    };

    const validationSchema = Yup.object({
        Firstname : Yup.string().required('Enter firstname'),
        Lastname  : Yup.string().required('Enter lastename'),
        Email     : Yup.string().email().required('Email is required'),
        Phone     : Yup.string().required('Required'),
    });

    // const validationSchema = Yup.object(getYupValidationRule(currentUser));

    const onSubmitHandler = async(values) => {
        const btn = document.getElementById('kt_account_profile_details_submit');
        try {
            StartProcessing(btn)

            const newData = {ID: currentUser.ID, ...values }
            
            if(userImage && (typeof(userImage) == 'object')){
                const fileName =  currentUser.ID + userImage.name.trim();
                const imageUrl =  await FileUploadHelper('profile-images',fileName, userImage);
                newData.ProfileImage = imageUrl
            }else if(userImage && (userImage != defaultimg)){
                newData.ProfileImage = userData.ProfileImage
            }

            //update Action Creator 
            dispatch(UpdateProfile({ data: newData, btn}));

        } catch (error) {
            StopProcessing(btn);
            Swal.fire({
                icon: 'error',
                titleText: error.message,
            })
        }
    }

    const openCropperHandler = (ImageBlob) =>{
        setUserImage(ImageBlob)
    }

    const formik =  useFormik({
        initialValues,
        validationSchema,
        onSubmit: onSubmitHandler,
    });  

    useEffect(() => {
        let ignore = false;
        const setUser = async() => {
            if(!!currentUser){ 
                if(currentUser.Usertype != 'host') history.push('/host');
                setUserData(currentUser);
                if(currentUser.ProfileImage) setUserImage(currentUser.ProfileImage);
            }
        }

        if(!ignore) setUser();
        return () => {
            ignore = true
        }
    },[currentUser])

    return (<>
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">				
            <div className="container-xxl" id="kt_content_container">	
                
                <div className="card mb-5 mb-xl-10">
                    
                    <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                        <div className="card-title m-0">
                            <h3 className="fw-bolder m-0">Profile Details</h3>
                        </div>
                    </div>
                    
                    
                    <div id="kt_account_settings_profile_details" className="collapse show">
                        
                        <form id="kt_account_profile_details_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={formik.handleSubmit} >
                            <div className="card-body border-top p-9">
                                <div className="row mb-6">
                                    <label className="col-lg-4 col-form-label fw-bold fs-6"> Picture</label>                                       
                                    <div className="col-lg-8">
                                        <div className="image-input image-input-outline image-input-empty" data-kt-image-input="true" 
                                            //style="background-image: url(assets/media/avatars/blank.png)"
                                        >
                                            {userImage && typeof(userImage) == 'object' ?(
                                                <img className="image-input-wrapper w-125px h-125px" src={URL.createObjectURL(userImage)} />
                                            ):(
                                                <img className="image-input-wrapper w-125px h-125px" src={userImage} />
                                            )}
                                            
                                            <label className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" title="" data-bs-original-title="Change avatar"
                                                onClick={() => setShowCropper(true)}
                                            >
                                                <i className="bi bi-pencil-fill fs-7"></i>
                                                
                                                {/* <input type="file" name="avatar" accept=".png, .jpg, .jpeg" onChange={({target}) => onImageUpdate(target.files[0])} />
                                                <input type="hidden" name="avatar_remove" value="1" /> */}
                                            </label>
                                            
                                            <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title="" data-bs-original-title="Cancel avatar">
                                                <i className="bi bi-x fs-2"></i>
                                            </span>
                                            
                                            <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="remove" data-bs-toggle="tooltip" title="" data-bs-original-title="Remove avatar">
                                                <i className="bi bi-x fs-2"></i>
                                            </span>
                                            
                                        </div>
                                        <div className="form-text">Allowed file types: png, jpg, jpeg.</div>
                                        <div className="form-text"> (400 X 400 px ).</div>
                                    </div>
                                </div>
                                
                                
                                <div className="row mb-6">
                                    <label className="col-lg-4 col-form-label required fw-bold fs-6">Full Name</label>
                                    <div className="col-lg-8">
                                        <div className="row">
                                            <div className="col-lg-6 fv-row fv-plugins-icon-container">
                                                <input type="text" name="Firstname" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="First name" 
                                                    value={formik.values.Firstname}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.errors.Firstname && (
                                                    <div className="fv-plugins-message-container invalid-feedback error-message"> {formik.errors.Firstname} </div>
                                                )} 
                                            </div>
                                            <div className="col-lg-6 fv-row fv-plugins-icon-container">
                                                <input type="text" name="Lastname" className="form-control form-control-lg form-control-solid" placeholder="Last name"
                                                    value={formik.values.Lastname}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.errors.Lastname && (
                                                    <div className="fv-plugins-message-container invalid-feedback error-message"> {formik.errors.Lastname} </div>
                                                    )} 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                                <div className="row mb-6">
                                    <label className="col-lg-4 col-form-label required fw-bold fs-6"> Email </label>                                        
                                    <div className="col-lg-8 fv-row fv-plugins-icon-container">
                                        <input type="email" name="Email" className="form-control form-control-lg form-control-solid" placeholder="Enter your email" 
                                            value={formik.values.Email}
                                            disabled = 'disabled' //onChange={formik.handleChange}
                                        />
                                        {formik.errors.Email && (
                                            <div className="fv-plugins-message-container invalid-feedback error-message"> 
                                                {formik.errors.Email} 
                                            </div>
                                        )} 
                                    </div>
                                </div>
                                
                                <div className="row mb-6">
                                    <label className="col-lg-4 col-form-label fw-bold fs-6">
                                        <span className="required">Contact Phone</span>
                                    </label>
                                
                                    <div className="col-lg-8 fv-row fv-plugins-icon-container">
                                        <input type="tel" name="Phone" className="form-control form-control-lg form-control-solid" placeholder="Phone number"
                                            value={formik.values.Phone}
                                            onChange={formik.handleChange} 
                                        />
                                        {formik.errors.Phone && (
                                            <div className="fv-plugins-message-container invalid-feedback error-message"> 
                                                {formik.errors.Phone} 
                                            </div>
                                        )} 
                                    </div>
                                </div>
                            </div>
                            
                            <div className="card-footer d-flex justify-content-end py-6 px-9">
                                <button type="button" className="btn btn-primary" id="kt_account_profile_details_submit"
                                    onClick={formik.handleSubmit}
                                > Save </button>
                            </div>
                        </form>
                    </div>
                </div>
               
            </div>
        </div>

        {!!showCropper &&(
            <ProfileImageCropper
                show            = {showCropper}
                header          = {'Profile Image'}
                imageRatio      = {{width : 400, height : 400}}
                dataHandler     = {openCropperHandler}
                onDismissModal  = {() => setShowCropper(false)}
            />
        )}                                   
        
    </>)
}

export default HostProfile




