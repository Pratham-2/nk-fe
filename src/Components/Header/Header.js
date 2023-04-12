import React, { useEffect, useState }  from "react";
import logoshort from "../../Assets/logos/logo_short.png"
//import logo from "../../Assets/logos/logo_trans.png"
import logo from "../../Assets/logos/logo_svg.svg"
import { useDispatch, useSelector } from "react-redux";
import { authActions, postLogout } from '../../store/auth/auth-slice';
import { NavLink, useHistory } from "react-router-dom";
import userlogo from "../../Assets/logos/user.jpg";
import { Dropdown } from "react-bootstrap";


const Header = ({ pathName }) => {

	const history 	= useHistory()
	const dispatch 	= useDispatch();
	
	const currentUser 	 = useSelector( state => state.authReducer.currentUser);
	const globalServices = useSelector(s => s.searchReducer.services);

	const openAuthModal  = (modalName) => dispatch(authActions.showModal(modalName));
	
	const onLogout 		 = () =>{ 
		dispatch(postLogout());
		history.push('/')
		window.location.reload();
	}

	const pushToPath = (path) => {
		if(!!path)
			history.push(`/${path.toLowerCase()}`) 
		else
			history.push('/')
	};

	const [displayUserHeader, setDisplayUserHeader] = useState(true)

	// All Effects --->	
	useEffect(() => {
		if(currentUser && currentUser.Usertype == 'host' ){
			setDisplayUserHeader(false);
		}
	},[currentUser])


	return (
		<>
			<div id="kt_header" className={`bg-white align-items-stretch header ${!pathName.includes('/host') && 'header-client'}`}>	
				<div className={`container-fluid d-flex align-items-stretch justify-content-between  ${displayUserHeader ? 'bg-darkcustom':  '' }`}>
					{/*  <!--begin::Mobile logo--> */}
					<div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
						<span  className="d-lg-none">
							<img alt="Logo" src={logo} className="h-30px" />
						</span>
					</div>
					{/* <!--end::Mobile logo--> */}
					
					{displayUserHeader && (<>
						<div className="d-flex align-items-center user-header " id="kt_header_wrapper">
							<div className="page-title d-flex flex-column align-items-start justify-content-center flex-wrap me-lg-20 pb-2 pb-lg-0 header-logo" data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', lg: '#kt_header_wrapper'}">
								<img alt="Logo" src={logo} className="h-80" onClick={() => pushToPath()} />
							</div>
						</div>
					</>)}
				
					<div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1 user-header">
						<div className="d-flex align-items-stretch" id="kt_header_nav">
							{displayUserHeader && (<>
								<div className="header-menu align-items-stretch" data-kt-drawer="true" data-kt-drawer-name="header-menu" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="end" data-kt-drawer-toggle="#kt_header_menu_mobile_toggle" data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav'}" >
									<div className="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-600 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold fs-6 my-5 my-lg-0 align-items-stretch" id="#kt_header_menu" data-kt-menu="true">
										<div data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start" className="menu-item menu-lg-down-accordion me-lg-1">
											{globalServices && (globalServices.length > 0 ) && (<>
												<span className="menu-link  py-3" >
													<span className="menu-title "> Services </span>
													<span className="menu-arrow d-lg-none"></span>
												</span>
												<div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px" >
													{globalServices.map((s,i)=>{
														return(
															<div className="menu-item" key={i}>
																<span className="menu-link user-header-link  py-3" onClick={()=> pushToPath(s.value)}>
																	<span className="menu-icon"> </span>
																	<span className="menu-title"> {s.label} </span>
																</span>
															</div>
														)
													})}													
												</div>
											</>)}
										</div>
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
							</>)}	
						</div>
					
						<div className="d-flex align-items-stretch justify-self-end flex-shrink-0 user-header">
							<div className="d-flex align-items-stretch flex-shrink-0">
								<div className="d-flex align-items-center ms-1 ms-lg-3" id="kt_header_user_menu_toggle">
									{!currentUser ?(
										<div className="cursor-pointer symbol symbol-30px symbol-md-40px">

											<span className="btn btn-sm btn-light-info p-3 me-3" onClick={() => pushToPath('login')} > Login </span>
											<span className="btn btn-sm btn-warning p-3"  onClick={() => pushToPath("signup")} > Signup </span>
											{/* <span className="btn btn-sm btn-light-info p-3 me-3" onClick={() => openAuthModal('Login')} > Login </span>
											<span className="btn btn-sm btn-warning p-3"  onClick={() => openAuthModal("Signup")} > Signup </span> */}

										</div>
									):(<>

										
										<Dropdown className="dropdown user-dd" >
											<Dropdown.Toggle variant="dark" className="dropdown-toggle cursor-pointer symbol symbol-30px symbol-md-40px show menu-dropdown "  > 
												<span className="badge badge-light-info mx-2 p-3"> 
													{/* { currentUser && currentUser.Firstname.slice(0, 1)} */}
													Hi,
												</span>
												{currentUser.Firstname}
											</Dropdown.Toggle>

											<Dropdown.Menu className=" dropdown-menu menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px user-dd-menu " >
												
												<Dropdown.Item  className="menu-item px-3 dropdown-item">
													<div className="menu-content d-flex align-items-center px-3">
														<div className="symbol symbol-50px me-5">
															<img alt="Logo" src={(currentUser && currentUser.ProfileImage &&  currentUser.ProfileImage != "") ? currentUser.ProfileImage : userlogo} />
														</div>
														<div className="d-flex flex-column">
															<div className="fw-bolder d-flex align-items-center fs-5">{currentUser && (currentUser.Firstname +" "+ currentUser.Lastname )} </div>
															<span className="fw-bold text-muted text-hover-primary fs-7">{ currentUser && currentUser.Email}</span>
														</div>
													</div>
												</Dropdown.Item>
												
												<div className="separator my-2"></div>

												<Dropdown.Item className="menu-item px-5 dropdown-item" as={"span"} >
													<NavLink to = {(currentUser && currentUser.Usertype == 'host') ? '/host/profile': '/profile'} className="menu-link user-dd-link px-5">My Profile</NavLink>
												</Dropdown.Item>
												<Dropdown.Item className="menu-item px-5 dropdown-item" >
													<span className="menu-link user-dd-link px-5" onClick={onLogout}> Sign Out </span>
												</Dropdown.Item>

											</Dropdown.Menu>
										</Dropdown>


									</>)}					
								</div>
								
								<div className="d-flex align-items-center d-lg-none ms-3 me-n1" title="Show header menu">
									<div className="btn btn-icon btn-active-color-primary w-30px h-30px w-md-40px h-md-40px" id="kt_header_menu_mobile_toggle">
										<span className="svg-icon svg-icon-1">
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
												<path d="M13 11H3C2.4 11 2 10.6 2 10V9C2 8.4 2.4 8 3 8H13C13.6 8 14 8.4 14 9V10C14 10.6 13.6 11 13 11ZM22 5V4C22 3.4 21.6 3 21 3H3C2.4 3 2 3.4 2 4V5C2 5.6 2.4 6 3 6H21C21.6 6 22 5.6 22 5Z" fill="black"></path>
												<path opacity="0.3" d="M21 16H3C2.4 16 2 15.6 2 15V14C2 13.4 2.4 13 3 13H21C21.6 13 22 13.4 22 14V15C22 15.6 21.6 16 21 16ZM14 20V19C14 18.4 13.6 18 13 18H3C2.4 18 2 18.4 2 19V20C2 20.6 2.4 21 3 21H13C13.6 21 14 20.6 14 20Z" fill="black"></path>
											</svg>
										</span>	
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>		
			</div>
			{/* {showAuthModal && (
				<LoginModal 
					show = { showAuthModal }
					onDismissModal = {openAuthModal}
            	/>
			)} */}

		</>
	);
}

export default Header;

