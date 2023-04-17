import React from "react";
import { Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";


const RightSideDrawer = (props) => {
	
	const { pushToPath, onToggle } = props;

	const globalServices = useSelector(s => s.searchReducer.services);

	return(
		<> 
            {/* this class shows drawer -> drawer-on */}
			<div id="kt_activities" className="bg-body drawer drawer-end drawer-on w-150" data-kt-drawer="true" data-kt-drawer-name="activities" 
				data-kt-drawer-activate="true" data-kt-drawer-overlay="true" 
				data-kt-drawer-width="{default:'200px'}" 
				data-kt-drawer-direction="end" data-kt-drawer-toggle="#kt_activities_toggle"
				data-kt-drawer-close="#kt_activities_close" 
				style={{width: '900px !important'}}
			>
				<div className="card shadow-none rounded-0 flex-grow-1">
					<div className="card-header aside-header" id="kt_activities_header">
						{/* <h3 className="card-title fw-bolder text-dark me-4"> Aside Menu</h3> */}
						<div className="card-toolbar aside-toolbar mb-0">
							<button type="button" onClick={() => onToggle(false) } className="btn btn-sm btn-icon btn-active-light-primary me-n5" id="kt_activities_close">
								<span className="svg-icon svg-icon-1">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
										<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black"></rect>
										<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black"></rect>
									</svg>
								</span>
							</button>
						</div>
					</div>
					
					<div className="card-body position-relative p-2" id="kt_activities_body">
						{/* <div className="d-flex align-items-stretch" id="kt_header_nav"> */}
						<div className="" id="kt_header_nav">														
							<div className="header-menu align-items-stretch"  >
							
								<div className="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-600 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold fs-6 my-1 my-lg-0 align-items-stretch asideHeaderMenu" id="#kt_header_menu">
									<Accordion alwaysOpen={false}  className="menu-item menu-lg-down-accordion me-lg-1">
										<Accordion.Item class="py-3">
											<Accordion.Header variant="light" className=""  > 											
													<span className="menu-title "> Services </span>													
											</Accordion.Header>
											<Accordion.Body className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px">
												{globalServices.map((s,i)=>{
													return(
														<div className="menu-item" key={i}>
															<span className="menu-link user-header-link " onClick={()=> pushToPath(s.value)}>															
																<span className="menu-title"> {s.label} </span>
															</span>
														</div>												
													)
												})}		
											</Accordion.Body>
										</Accordion.Item>
									</Accordion>									
									<div className="menu-item menu-lg-down-accordion me-lg-1">											
										<span className="menu-link py-3" onClick={()=> pushToPath('comingsoon')}>
											<span className="menu-title "> Photos </span>
										</span>
									</div>
									<div className="menu-item menu-lg-down-accordion me-lg-1">
										<span className="menu-link py-3" onClick={()=> pushToPath('comingsoon')}>
											<span className="menu-title "> Blogs </span>
										</span>
									</div>
									<div className="menu-item menu-lg-down-accordion me-lg-1">
										<span className="menu-link py-3" onClick={()=> pushToPath('aboutus')}>
											<span className="menu-title "> About </span>
										</span>
									</div>
									<div className="menu-item menu-lg-down-accordion me-lg-1">
										<span className="menu-link py-3" onClick={()=> pushToPath('contactus')}>
											<span className="menu-title "> Contact Us </span>
										</span>
									</div>
								</div>
							</div>						
						</div>						
					</div>									
				</div>
			</div>
		</>
	)
}

export default RightSideDrawer;





{/* <div data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start" className="menu-item menu-lg-down-accordion me-lg-1">
	{globalServices && (globalServices.length > 0 ) && (<>
		<span className="menu-link  py-3" >
			<span className="menu-title "> Services </span>
			<span className="menu-arrow d-lg-none"></span>
		</span>
		<div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px" >
			{globalServices.map((s,i)=>{
				return(
					<div className="menu-item" key={i}>
						<span className="menu-link user-header-link py-3" onClick={()=> pushToPath(s.value)}>
							<span className="menu-icon"> </span>
							<span className="menu-title"> {s.label} </span>
						</span>
					</div>
				)
			})}													
		</div>
	</>)}
</div> */}