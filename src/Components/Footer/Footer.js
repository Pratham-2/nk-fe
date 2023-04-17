import React from "react";
import { Link } from "react-router-dom";
import facebook from '../../Assets/images/facebook.png'
import instagram from '../../Assets/images/instagram.png'
import twitter from '../../Assets/images/twitter.png'
import { scrollToSearch } from '../Global/Helper';

const Footer = ({ pathName }) => {
	
	return (
		<>
			{!pathName.includes('host') ? (
				<div className="footer py-4 d-flex flex-lg-column bg-darkcustom" id="kt_footer">

					<div className="container-xxl d-flex flex-column flex-md-row flex-stack p-lg-17">
						
						<div className="row text-left text-white">

							<div className="col-md-5 ft-aboutus">
								<h2 className="text-white"> NK Mangalam </h2>
								<p>
									At NK Mangalam we provide new idea to plan a event to help people 
									find the best event suppliers, because you should enjoy every moment.
								</p>
								<span className="btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary mt-5 mb-2"
									onClick={scrollToSearch}
								>
									Find a Vendor
								</span>
							</div>

							<div className="col-md-3 ft-link">
								<h2> Useful links </h2>
								<ul>
									<li> <Link to={'/aboutus'}> About Us </Link> </li>
									<li> <span > Privacy Policy </span></li>
									<li> <Link to="/termsofuse" > Terms of Use </Link> </li>
								</ul>
							</div>

							<div className="col-md-4">
								<div className="social-icon">
									<h2> Be Social &amp; Stay Connected </h2>
									<ul className="mt-4">
										<li>
											<img src={instagram} height={'30px'} alt="social_image" />
										</li>
										<li>
											<img src={twitter} height={'30px'} alt="social_image" />
										</li>
										<li>
											<img src={facebook} height={'30px'} alt="social_image" />
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>	
				</div>
			) : (
				<div className="footer py-4 d-flex flex-lg-column bg-hostFooterColor" id="kt_footer">
					<div className="d-flex flex-column flex-md-row flex-stack ft-link padding-lr25">
						<div className="order-2 order-md-1" style={{ color: '#595d6e' }}>
							2023 &nbsp;&copy;&nbsp;<span  style={{ color: '#595d6e' }}> NK Mangalam </span>
						</div>
						{/* <ul className="menu fw-bold order-1">
							<li className="menu-item">
								<Link to={'/aboutus'} className="menu-link px-2" style={{ color: '#595d6e' }}> About </Link>
							</li>
							<li className="menu-item">
								<Link to="/termsofuse"  className="menu-link px-2" style={{ color: '#595d6e' }}> Contact </Link>
							</li>
						</ul> */}
					</div>
				</div>
			)}
		</>
	);
}

export default Footer;
