import React, {useEffect, useLayoutEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { Accordion } from "react-bootstrap";
// import logo from '../../Assets/logos/logo_short.png'; 
import logo from "../../Assets/logos/logo_svg.svg"

const SideMenu = (props) => {

	const {currentUser} = props;

	const [HostType, setHostType] = useState([]);

	useEffect(() => {
		if(currentUser && currentUser.HostType && currentUser.HostType.lenght != 0){
			console.log("currentUser", currentUser);
			setHostType(currentUser.HostType);
		}
	},[currentUser]);

	useLayoutEffect(() => {
		$(document).ready(function() {
			$('[data-bs-toggle="tooltip"]').tooltip();
		});
	}, []);

	return (
		<>
			<div id="kt_aside" className="aside bg-darkcustom" data-kt-drawer="true" data-kt-drawer-name="aside" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="auto" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_toggle" style={{}}>
				{/* <!--begin::Logo--> */}
				<div className="aside-logo d-none d-lg-flex flex-column align-items-center flex-column-auto py-5" id="kt_aside_logo">
					<NavLink to="/host">
						<img alt="Logo" src={logo} className="h-50px" />
					</NavLink>
				</div>
				{/*<!--end::Logo-->*/}
			
				<div className="aside-nav d-flex flex-column align-lg-center flex-column-fluid w-100 pt-5 pt-lg-0" id="kt_aside_nav">			
					<div id="kt_aside_menu" className="menu menu-column menu-title-gray-600 menu-state-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500 fw-bold fs-6 pt-7" data-kt-menu="true">

						<div className="menu-item py-3">
							<NavLink className="menu-link menu-center" to="/host/quotes/new" title="" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss="click" data-bs-placement="right" data-bs-original-title="Quotes">
								<span className="menu-icon me-0 flex-column">
									<i className ="bi bi-card-list fs-2"></i> 
									<span className="m-0"> Quotes </span>
								</span>
							</NavLink>
						</div>						

						<Accordion className="custom-accordion" flush >
							<Accordion.Item eventKey="0">
								<Accordion.Header className="bg-dark"> Services </Accordion.Header>
								<Accordion.Body>

									{(HostType.length != 0) && HostType.map((s, i) => {

										const serviceLink = `/host/${s.toLowerCase()}/all`;

										return(
											<div className="menu-item" key={i}>
												<NavLink className="menu-link menu-center" to={serviceLink} title="" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss="click" data-bs-placement="right" data-bs-original-title="Venue">
													<span className="menu-icon me-0 flex-column">
														<i className="fa fa-hotel"></i>
														<span className="m-0"> {s} </span>
													</span>
												</NavLink>
											</div>
										)
									})} 

									{/* <div className="menu-item">
										<NavLink className="menu-link menu-center" to="/host/venues/all" title="" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss="click" data-bs-placement="right" data-bs-original-title="Venue">
											<span className="menu-icon me-0 flex-column">
												<i className="fa fa-hotel"></i>
												<span className="m-0"> Venue </span>
											</span>
										</NavLink>
									</div>

									<div className="menu-item">
										<NavLink className="menu-link menu-center flex-column" to="/host/caterers/all" title="" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss="click" data-bs-placement="right" data-bs-original-title="Caterer">
											<span className="menu-icon me-0 flex-column">
												<i className="bi bi-credit-card-fill fs-2"></i>
												<span className="m-0"> Caterer </span>
											</span>
										</NavLink>
									</div>
									
									<div className="menu-item">
										<NavLink className="menu-link menu-center" to="/host/photographers/all" title="" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss="click" data-bs-placement="right" data-bs-original-title="Photographer">
											<span className="menu-icon me-0 flex-column">
												<i className="bi bi-camera2 fs-2"></i>
												<span className="m-0"> Photographer </span>
											</span>
										</NavLink>
									</div>
								
									<div className="menu-item">
										<NavLink className="menu-link menu-center" to="/host/decorators/all" title="" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss="click" data-bs-placement="right" data-bs-original-title="Decorator">
											<span className="menu-icon me-0 flex-column">
												<i className="bi bi-flower1 fs-2"></i>
												<span className="m-0"> Decorator </span>
											</span>
										</NavLink>
									</div>
									

									<div className="menu-item">
										<NavLink className="menu-link menu-center" to="/host/beautician/all" title="" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss="click" data-bs-placement="right" data-bs-original-title="Beautician">
											<span className="menu-icon me-0 flex-column">
												<i className="bi bi-palette fs-2"></i>
												<span className="m-0"> Beautician </span>
											</span>
										</NavLink>
									</div>

									<div className="menu-item">
										<NavLink className="menu-link menu-center" to="/host/mehndi-artist/all" title="" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss="click" data-bs-placement="right" data-bs-original-title="Mehndi Artist">
											<span className="menu-icon me-0 flex-column">
												<i className="bi bi-flower3 fs-1"></i>
												<span className="m-0"> Mehndi </span>
											</span>
										</NavLink>
									</div>

									<div className="menu-item">
										<NavLink className="menu-link menu-center" to="/host/musician/all" title="" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss="click" data-bs-placement="right" data-bs-original-title="Musician">
											<span className="menu-icon me-0 flex-column">
												<i className="bi bi-music-note-beamed fs-1"></i>
												<span className="m-0"> Musician </span>
											</span>
										</NavLink>
									</div> */}


								</Accordion.Body>
							</Accordion.Item>
							
						</Accordion>

					</div>

				</div>
				
			</div>
		</>
	)
}

export default SideMenu;