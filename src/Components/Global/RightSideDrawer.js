import React from "react";


const RightSideDrawer = () =>{
	return(
		<> 
            {/* this class shows drawer -> drawer-on */}
			<div id="kt_activities" className="bg-body drawer drawer-end " data-kt-drawer="true" data-kt-drawer-name="activities" data-kt-drawer-activate="true" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'300px', 'lg': '900px'}" data-kt-drawer-direction="end" data-kt-drawer-toggle="#kt_activities_toggle" data-kt-drawer-close="#kt_activities_close" 
				style={{width: '900px !important'}}>
				<div className="card shadow-none rounded-0">
					<div className="card-header" id="kt_activities_header">
						<h3 className="card-title fw-bolder text-dark">Activity Logs</h3>
						<div className="card-toolbar">
							<button type="button" className="btn btn-sm btn-icon btn-active-light-primary me-n5" id="kt_activities_close">
								<span className="svg-icon svg-icon-1">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
										<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black"></rect>
										<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black"></rect>
									</svg>
								</span>
							</button>
						</div>
					</div>
					
					<div className="card-body position-relative" id="kt_activities_body">
						<div id="kt_activities_scroll" className="position-relative scroll-y me-n5 pe-5" data-kt-scroll="true" data-kt-scroll-height="auto" data-kt-scroll-wrappers="#kt_activities_body" data-kt-scroll-dependencies="#kt_activities_header, #kt_activities_footer" data-kt-scroll-offset="5px" style={{height: "509px"}}>
							
						</div>
					</div>
					
					<div className="card-footer py-5 text-center" id="kt_activities_footer">
						<span className="btn btn-bg-body text-primary">
							View All Activities
							<span className="svg-icon svg-icon-3 svg-icon-primary">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
									<rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black"></rect>
									<path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black"></path>
								</svg>
							</span>
						</span>
					</div>	
				</div>
			</div>
		</>
	)
}

export default RightSideDrawer;