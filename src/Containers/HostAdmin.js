import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SideMenu from "../Components/Host/sideMenu";
import Venues from "../Components/Venues/Venues";
import { useDispatch, useSelector } from "react-redux";
import Caterers from "../Components/Caterers/Caterers";
import Decorators from "../Components/Decorators/Decorators";
import Photographers from "../Components/Photographer/Photographers";
import QuotePage from "../Components/Host/QuotePage";
import BeauticianHost from "../Components/BeauticianPage/BeauticianHost";
import MendiArtistHost from "../Components/MendiArtistPage/MendiArtistHost";
import MusicianHost from "../Components/DjPage/MusicianHost";
import HostProfile from '../Components/Host/HostProfile';
import AboutUs from "../Components/Global/About";
import Contact from "../Components/Global/Contact";

const HostAdmin = () => {
    
	//const dispatch = useDispatch();
    const currentUser = useSelector( s => s.authReducer.currentUser );

    return (
        <>  
            <SideMenu  currentUser = {currentUser} />
            <div className="content d-flex flex-column flex-column-fluid padding-t25" id="kt_content">
                {/* {!currentUser.isApproved && (<div className="mx-5 text-center">
                    <div className="alert alert-danger d-flex align-items-center  justify-content-center p-5 mb-5">				
                        <span className="svg-icon svg-icon-2hx svg-icon-warning me-4"></span>
                        
                        <div className="d-flex flex-column">
                            <h4 className="mb-1 text-danger"> Welcome to Event Shine..!</h4>
                            <span> Your Account  is under review, Once approved your services will be available for users.</span>
                        </div>
                    </div>
                </div>)} */}
                <Switch>

                    <Route path='/host/contactus'>
                        <Contact />
                    </Route>

                    <Route path='/host/aboutus'>
                        <AboutUs/>
                    </Route>

                    <Route  path='/host/quotes/:typeofQuote'>
                        <QuotePage />
                    </Route>
                    <Route exact path='/host/venues/:typeOfVenue'>
                        <Venues />
                    </Route>
                    <Route exact path='/host/caterers/:typeOfCaterer'>
                        <Caterers />
                    </Route>
                    <Route exact path='/host/photographer/:typeOfPhotographer'>
                        <Photographers />
                    </Route>
                    <Route exact path='/host/decorators/:typeOfDecorator'>
                        <Decorators />
                    </Route>
                    <Route exact path='/host/beauticians/:tab'>
                        <BeauticianHost />
                    </Route>
                    <Route exact path='/host/mehndi-artist/:tab'>
                        <MendiArtistHost />
                    </Route>
                    <Route exact path='/host/musicians/:tab'>
                        <MusicianHost />
                    </Route>
                    <Route  path='/host/profile'>
                        <HostProfile />
                    </Route>
                    <Redirect to="/host/venues/all" />
                </Switch>
            </div>
        </>
    )
}

export default HostAdmin;