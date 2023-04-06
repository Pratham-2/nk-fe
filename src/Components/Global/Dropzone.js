import React from 'react';
import './dropzone.css';
import $ from 'jquery';
import swal from 'sweetalert2';
import * as helper from '../Global/Helper';
import { getFileExt } from "../Global/Helper";

const Dropzone = (props) => {
  const {imageOnly} = props;

  const dragoverHandler = (e) => {
    e.preventDefault();
    $('.drop-zone').addClass('file-on');
  };

  const dragLeaveHandler = () => $('.drop-zone').removeClass('file-on');

  const uploadHandler = (f) => {

    const supportedTypes = !imageOnly ? ['pdf', 'jpg', 'jpeg', 'png', 'xls', 'xlsx', 'csv'] : ["jpg", "jpeg", "png"] ;
    const ext = getFileExt(f.name); 

    if (supportedTypes.includes(ext)) {
      if (f.size > (1024 * 1024 * 5)) {
        swal.fire({
          icon                : 'warning',
          titleText           : 'File size is too large!',
          html                : 'The file size is exceeding maximum limit of <strong>5 MB</strong>',
          buttonsStyling      : false,
          confirmButtonClass  : 'btn btn-primary'
        });
      }else{
        props.fileHandler(f)
      }
    }else{ 
      const htmlString = imageOnly ? "Only <strong>image</strong> files are allowed for upload" : 'Only <strong>image</strong>, <strong>pdf</strong> and <strong>excel</strong> files are allowed for upload';
      swal.fire({
        icon                : 'warning',
        titleText           : 'File not supported!',
        html                : htmlString,
        buttonsStyling      : false,
        confirmButtonClass  : 'btn btn-primary'
      });  
    }  
  };

  /**
   *
   * @param {Event} e
   */
  const dropHandler = (e) => {
    e.preventDefault();
    if (
      e.dataTransfer &&
      e.dataTransfer.files &&
      e.dataTransfer.files.length > 0
    ) {
      uploadHandler(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="drop-zone" onClick={() => $('#drop-zone-input').trigger('click')} onDragOver={dragoverHandler} onDragLeave={dragLeaveHandler} onDragEnd={dragLeaveHandler} onDrop={dropHandler}>
      <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon" id="drop-zone-icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <rect x="0" y="0" width="24" height="24" />
          <path d="M2,13 C2,12.5 2.5,12 3,12 C3.5,12 4,12.5 4,13 C4,13.3333333 4,15 4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 C2,15 2,13.3333333 2,13 Z" fill="#000000" fillRule="nonzero" opacity="0.3"/>
          <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 8.000000) rotate(-180.000000) translate(-12.000000, -8.000000) " x="11" y="1" width="2" height="14" rx="1"/>
          <path d="M7.70710678,15.7071068 C7.31658249,16.0976311 6.68341751,16.0976311 6.29289322,15.7071068 C5.90236893,15.3165825 5.90236893,14.6834175 6.29289322,14.2928932 L11.2928932,9.29289322 C11.6689749,8.91681153 12.2736364,8.90091039 12.6689647,9.25670585 L17.6689647,13.7567059 C18.0794748,14.1261649 18.1127532,14.7584547 17.7432941,15.1689647 C17.3738351,15.5794748 16.7415453,15.6127532 16.3310353,15.2432941 L12.0362375,11.3779761 L7.70710678,15.7071068 Z" fill="#000000" fillRule="nonzero" transform="translate(12.000004, 12.499999) rotate(-180.000000) translate(-12.000004, -12.499999) "/>
        </g>
      </svg>
      <h3 className="dropzone-msg-title">{props.prompt || 'Drop a file here or click to select'}</h3>
      { imageOnly ? 
        <span className="dropzone-msg-desc"> Only <strong>image</strong> files are allowed for upload</span>
        :<span className="dropzone-msg-desc">Only <strong>image</strong>, <strong>pdf</strong> and <strong>excel</strong> files are allowed for upload</span>
      }
      <span className="dropzone-msg-desc">Max file size is <strong>5 MB</strong></span>
      <input id="drop-zone-input" type="file" accept="image/*, .pdf, .xlsx, .xls, .csv" hidden onChange={({ target: { files } }) => uploadHandler(files[0])}/>
    </div>
  );
};

export default Dropzone;
