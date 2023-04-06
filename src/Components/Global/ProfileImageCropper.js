import React, { useState, useEffect } from "react";
import Dropzone from "./Dropzone";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Swal from "sweetalert2";
import { StartProcessing, StopProcessing } from "../Global/Helper";


const ProfileImageCropper = (props) => {

    const { dataHandler, imageRatio, header } = props;
    
    const [file,         setFile]         = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [image,        setImage]        = useState(null);
    const [cropSetting,  setCropSetting]  = useState({ x : 0, y : 0, unit : 'px', width : imageRatio.width, height : imageRatio.height });
    

   //Modal Show /Blur Other modals
    useEffect(() => {
        $("#single-image-cropper-modal").modal({ backdrop: "static" });
       
        $("#single-image-cropper-modal").on("hidden.bs.modal", function () {
            props.onDismissModal();
        });
        
        $('#single-image-cropper-modal').modal('toggle');
    }, [props.show]);


    const AdjustCropper = (img) => {
        setImage(img);
        if (img) {
            if (img.width < imageRatio.width || img.height < imageRatio.height) {
                if (img.height < imageRatio.height && img.width < imageRatio.width) {
                    setCropSetting({
                        x     : 0,
                        y     : 0,
                        unit  :'px',
                        width : img.width,
                        height:img.height
                    })
                } else if(img.height < imageRatio.height ){
                    setCropSetting({
                        x      : 0,
                        y      : 0,
                        unit   :'px',
                        width  : imageRatio.width,
                        height :img.height
                    })
                } else{
                    setCropSetting({
                        x     : 0,
                        y     : 0,
                        unit  :'px',
                        width : img.width,
                        height:imageRatio.height
                    })
                }   
            };
        }
        return(false)
    }

    const getCroppedImg = (image, crop) => { 
        return new Promise((resolve, reject)=>{
            if (image) {

                const canvas              = document.createElement("canvas");
                const scaleX              = image.naturalWidth / image.width;
                const scaleY              = image.naturalHeight / image.height;
                canvas.width              = crop.width;
                canvas.height             = crop.height;
                const ctx                 = canvas.getContext("2d");
                ctx.fillStyle             = "#FFF";
                ctx.imageSmoothingQuality = 'high';
                ctx.strokeStyle           = '#ffffff';
                ctx.shadowColor           = "rgba(255, 255, 255, 0.5)"

                ctx.drawImage(
                    image,
                    crop.x * scaleX,
                    crop.y * scaleY,
                    crop.width * scaleX,
                    crop.height * scaleY,
                    0,
                    0,
                    crop.width,
                    crop.height
                );

                canvas.toBlob(
                    (blob) => {
                        if (blob !== null) {
                            blob.name = file.FileName;
                            //CROPPED IMAGE BLOB
                            resolve(blob)
                            setCroppedImage( blob );
                        }
                    },
                    "image/png",
                    1
                )
            };
        })
    }

    const CropImageHandler = async() => {
        const btn = document.getElementById('crop-btn');

        
        if(!image) {
            return Swal.fire({
                icon                    : "error",
                titleText               : "Error!",
                text                    : "Please select image!",
                buttonsStyling          : false,
                confirmButtonClass      : "btn btn-primary",
            });
        }
        try {
            StartProcessing(btn);
            const ImageBlob = await getCroppedImg(image, cropSetting)
            //console.log(ImageBlob)
            if(ImageBlob) {
                setFile(null);
                setCroppedImage(null)
                dataHandler(ImageBlob)
                $('#single-image-cropper-modal').modal('hide');
                StopProcessing(btn);
            }
        } catch (err) {
            StopProcessing(btn);
            Swal.fire({
                icon                : "error",
                titleText           : "Error!",
                text                : err.message,
                buttonsStyling      : false,
                confirmButtonClass  : "btn btn-primary",
            });
        }
    };

    return (
        <div className="modal fade" id="single-image-cropper-modal" tabIndex="-1" role="dialog"
            aria-hidden="true"
        >
            {/* Header Starts */}
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"> { header && header } </h5>
                        <div className="btn btn-icon btn-sm btn-active-light-warning ms-2" data-bs-dismiss="modal" aria-label="Close">
                            <span className="svg-icon svg-icon-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black"></rect>
                                    <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black"></rect>
                                </svg>
                            </span>
                        </div>
                    </div>
                    {/* Header Ends */}


                    {/* Body  Starts*/}
                    <div className="modal-body">
                        <>
                            {croppedImage ? (<img src = {window.URL.createObjectURL(croppedImage)} className="img-fluid"></img>)
                                : file ? (
                                    <div className="d-flex justify-content-center align-items-center"
                                        style={{ minHeight: "25rem", minWidth: "25rem"  }}
                                    >
                                        <ReactCrop
                                            src={file.FileUrl} 
                                            onImageLoaded={AdjustCropper}
                                            onChange={setCropSetting}
                                            crop={cropSetting}
                                            minWidth={1000}
                                            minHeight={500}
                                            // maxWidth={1000}
                                            // maxHeight={500}
                                            keepSelection={true}
                                        />
                                    </div>
                                ) : (
                                    <Dropzone
                                        imageOnly = {true}
                                        fileHandler={(f) => {setFile({FileUrl: window.URL.createObjectURL(f), FileName: f.name})}}
                                        accept="image/*"
                                    />
                                )
                            }
                        </>
                        
                    </div>
                    {/* Body Ends */}

                    {/* Footer Starts */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary margin-0 margin-r5" data-bs-dismiss="modal" >
                            Close
                        </button>
                        <button id="crop-btn" type="button" className="btn btn-success margin-r5"
                            onClick={CropImageHandler}
                        >
                            Crop
                        </button>
                    </div>
                    {/* Footer Ends */}
                </div>
            </div>
        </div>
    );
};

export default ProfileImageCropper;
