import React, { useEffect, useLayoutEffect } from "react";
import supplierImg from '../../Assets/logos/supplier.png';
import decorateImg from '../../Assets/logos/decorator.png';
import calendar from '../../Assets/logos/calendar.png';
import shopImg from '../../Assets/logos/online.png';
import event2 from '../../Assets/logos/celebration.png';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth/auth-slice";
import {  scrolltoTop } from "../Global/Helper";

import { getFeaturedServices } from "../../store/host/service-slice";


export const ServiceSection = () => {
	return (<>
		<div className="card">
			<div className="card-body p-lg-17 padding-b5">
				<div className="text-center mb-10">
					<div className="mb-13">
						<h3 className="fs-2hx text-dark mb-5">
							Plan Your Event With Us
						</h3>
						<div className="fs-5 text-muted fw-bold">
							Trendy Place, Trendy Event, Perfect Planning for Precious Moments
						</div>
					</div>
					<div className="row">

						<div className="col-md-4 col-12 text-center mb-9">
							<div className=" mx-auto mb-2 d-flex w-150px h-150px bgi-no-repeat bgi-size-contain bgi-position-center"
								style={{ backgroundImage: `url(${supplierImg})` }}></div>
							<div className="mb-0">
								<span className="text-dark fw-bolder text-hover-primary fs-3">
									Connect to a local vendor
								</span>
								<div className="text-muted fs-6 fw-bold">
									Browse Venues and Vendors
								</div>
							</div>
						</div>

						<div className="col-md-4 col-12 text-center mb-9">
							<div className=" mx-auto mb-2 d-flex w-150px h-150px bgi-no-repeat bgi-size-contain bgi-position-center"
								style={{ backgroundImage: `url(${decorateImg})` }}></div>
							<div className="mb-0">
								<span className="text-dark fw-bolder text-hover-primary fs-3">
									Discover community decorator
								</span>
								<div className="text-muted fs-6 fw-bold">
									Browse Ace Decorator's and Caterers
								</div>
							</div>
						</div>

						<div className="col-md-4 col-12 text-center mb-9">
							<div className=" mx-auto mb-2 d-flex w-150px h-150px bgi-no-repeat bgi-size-contain bgi-position-center"
								style={{ backgroundImage: `url(${calendar})` }}></div>
							<div className="mb-0">
								<span className="text-dark fw-bolder text-hover-primary fs-3">
									Save your date
								</span>
								<div className="text-muted fs-6 fw-bold">
									Hassle Free Planning & Booking at the Best Prices.
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</>)
}

const FeaturedSection = (props) => {

	const history 	   = useHistory();
	const featuredList = useSelector(state => state.serviceReducer.featuredList)

	const onRedirect = (id, serviceName) => {
		if(serviceName && id)
			history.push(`/${serviceName.toLowerCase()}/${id}`);
		else 
			history.push('/');
	}

	return (<>
		{featuredList.length > 0 && (
			<div className="card">
				<div className="card-body p-lg-20 padding-b15">
					<div className=" mb-10">
						<div className=" text-center mb-13">
							<h3 className="fs-2hx text-dark mb-5">
								Featured Vendor's
							</h3>
							<div className="fs-5 text-muted fw-bold">
								Your Event, Your Choice
							</div>
						</div>

						<div className="row">
							{featuredList.map((f, ind) => {							
								return (
									<div className="col-md-4 col-12" key={ind} >
										<div className="card-xl-stretch me-md-6 text-left " onClick={() => onRedirect(f.ID, f.serviceName)} >
											<span className="d-block overlay mb-4" data-fslightbox="lightbox-hot-sales">
												{
													Object.keys(f).find(i => i == 'Img').length > 0 &&  f.Img.map((img, index) => {

														return (<div key={index}>
															<div className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded h-200px"
																style={{ backgroundImage: `url(${img})` }}>
															</div>
															<div className="overlay-layer bg-dark card-rounded bg-opacity-25">
																<i className="bi bi-eye-fill fs-2x text-white"></i>
															</div>
														</div>)
													})
												}
											</span>

											<div className="m-0">
												<span className="fs-4 text-dark fw-bolder text-hover-primary text-dark lh-base">
													{f.Title}
												</span>

												<div className="fw-bold fs-5 text-gray-600 text-dark mt-3 mb-5">
													{f.Address}
												</div>

												<div className="fs-6 fw-bolder">
													<span className="text-gray-700 text-hover-primary">
														{f.HostName}
													</span>
												</div>
											</div>
										</div>
									</div>)
							})}
						</div>
					</div>
				</div>
			</div>
		)}
	</>)
}

export const QuestionSection = () => {

	const history     = useHistory();
	const currentUser =  useSelector(s => s.authReducer.currentUser);
	//const dispatch = useDispatch();

	const scrollToSearch = () => {
		const currentPath = window.location.pathname;
		if (currentPath != "/") history.push("/");

		const element = document.getElementById('searchBar')
		if (element) element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
	}

	//const openModal = () => dispatch(authActions.showModal('Login'));

	const onRedirect = (path) => (path && !currentUser) ? history.push(`/${path}`): history.push('/');
	
	return (<>
		<div className="card">
			<div className="card-body p-lg-17 padding-b5">
				<div className="text-center mb-10">

					<div className="row">

						<div className="col-md-6 col-12 text-center mb-9">
							<div className=" mx-auto mb-5 d-flex w-150px h-150px bgi-no-repeat bgi-size-contain bgi-position-center"
								style={{ backgroundImage: `url(${event2})` }}></div>
							<div className="mb-0">
								<span className="text-dark fw-bolder text-hover-primary fs-3">
									Hosting an event, find all you need ?
								</span>
								<div className="text-muted fs-6 fw-bold mb-5">
									Hassle Free Planning & Booking at the Best Prices.
								</div>

								<span className="btn btn-bg-light btn-active-color-warning" onClick={scrollToSearch}> Find Vendor </span>
							</div>
						</div>

						<div className="col-md-6 col-12 text-center mb-9">
							<div className=" mx-auto mb-5 d-flex w-150px h-150px bgi-no-repeat bgi-size-contain bgi-position-center"
								style={{ backgroundImage: `url(${shopImg})` }}></div>
							<div className="mb-0">
								<span className="text-dark fw-bolder text-hover-primary fs-3">
									Are you a vendor ?
								</span>
								<div className="text-muted fs-6 fw-bold  mb-5">
									List your Business and Services
								</div>

								<span className="btn btn-bg-light btn-active-color-warning" onClick={() => onRedirect("signup")}> Add Your Listing </span>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</>)
}

const Landingpage = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => scrolltoTop() ,[])

	useEffect(() => {	
		// dispatch(getFeaturedService())
		dispatch(getFeaturedServices())
	}, [])

	return (
		<>
			<div className="content d-flex flex-column flex-column-fluid" id="kt_content">
				<div className="container-xxl" id="kt_content_container">

					{/* Services Card */}
					<ServiceSection />

					{/* Feaured Card */}
					{/* {featuredList.length > 0 && ( */}
					<FeaturedSection />
					{/* )} */}

					{/* Question Card */}
					<QuestionSection />

				</div>
			</div>
		</>
	);
}

export default Landingpage;
