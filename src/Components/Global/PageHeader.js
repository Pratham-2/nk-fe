import React from "react";
// import { useHistory } from "react-router-dom";

const PageHeader = (props) => {

    const { bannerImage, bannerTitle, imageAuthor, position } = props
    // const history 	  	= useHistory();
    // const serviceClick  = ()=> history.push(`/${bannerTitle.toLowerCase()}`);

	return (<>

          <div className="card rounded-0 bgi-no-repeat bgi-position-x-end bgi-size-cover service-card" 
            style={{ backgroundImage: `url(${bannerImage})`, backgroundPosition:`${position ? position : 'center'}`}} >

            <div className="card-body container-xxl pt-10 pb-8 service-card-body">
                {bannerTitle && ( 
                    <div className="d-flex align-items-center">
                        <h1 className="fw-bold me-3 text-white service-title clickable"> {bannerTitle} </h1>
                    </div>
                )}
                
            </div>           

            {imageAuthor && (
                <div className="row w-lg-100 text-right">
                    <div className="col">
                        <a href={ imageAuthor.link} target="_blank" rel="noreferrer noopener" className="text-muted" >
                            {imageAuthor.title}
                        </a>
                    </div>
                </div>                  
            )}          
        </div>


    </>);
}

export default PageHeader;