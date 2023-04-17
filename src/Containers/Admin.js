import React, { useEffect, useLayoutEffect, useState } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebaseConfig/firebaseConfig";
//import RightSideDrawer from "../Components/Global/RightSideDrawer";
import Header from "../Components/Header/Header"; 
import Search from "../Components/Global/Search";
import Landingpage from "../Components/LandingPage/Landingpage";
import Footer from "../Components/Footer/Footer";
import HostAdmin from "./HostAdmin";
import ServicePage from "../Components/VenuePage/ServicePage";
import { setUser } from "../store/auth/auth-slice";
import { getStatesAndCitiesAndServices } from "../store/search/search-slice";
import VenueList from "../Components/VenuePage/VenueList";
import CatererList from "../Components/CatererPage/CatererList";
import PhotographerList from "../Components/PhotographerPage/PhotographerList";
import DecoratorList from "../Components/DecoratorPage/DecoratorList";
import MusicianList from "../Components/MusicianPage/MusicianList";
import MendiArtistList from "../Components/MendiArtistPage/MendiArtistList";
import BeauticianList from "../Components/BeauticianPage/BeauticianList";
import Profile from "../Components/Global/Profile";
import AboutUs from "../Components/Global/About";
import Contact from "../Components/Global/Contact";
import Terms from "../Components/Global/Terms";
import Login from "../Components/Auth/Login";
import Signup from "../Components/Auth/Signup";
import Reset from "../Components/Auth/Reset";
import Soon from "../Components/Global/Soon";

const authRoute = ['/login','/signup', '/reset'];

const Admin = () => {
	const history 	  = useHistory();
	const dispatch	  = useDispatch();
	const currentUser = useSelector(s => s.authReducer.currentUser);
	
	const [pathName, setPathName] = useState(window.location.pathname);

	useEffect(() => {
		history.listen( location => {
			var cPath = location.pathname;
			setPathName(cPath);
			if(authRoute.includes(cPath))
				document.getElementById('kt_wrapper').classList.add('pt-5');
			else			
				document.getElementById('kt_wrapper').classList.remove('pt-5');						
		})		
		auth.onAuthStateChanged( u => { if(u) dispatch(setUser(u.uid)) });
	}, []);

	useLayoutEffect(() => { dispatch(getStatesAndCitiesAndServices())  }, []);

	useLayoutEffect(() => {
		let ignore  = false;
		const redirectUser = () => {			
			if(currentUser && currentUser.Usertype == 'host' ) 		
				history.push('/host');
			else
				history.push('/');			
		}
		if(!ignore) redirectUser();
		return () => { ignore = true }
	}, [currentUser]);

	return (
		<>
			<div id='kt_wrapper' className={`d-flex flex-column flex-row-fluid wrapper ${!pathName.includes('/host') && 'padding-l0'}`}>			
				{!authRoute.includes(pathName) && ( <Header pathName={pathName} /> )}
					<Switch>
						
						<Route path ='/reset'>
							<Reset />
						</Route>
						
						<Route path ='/signup'>
							<Signup />
						</Route>
	
						<Route path ='/login'>
							<Login/>
						</Route>
													
						<Route path='/host'>
							<HostAdmin/>
						</Route>

						<Route path='/comingsoon'>
							<Soon/>
						</Route>

						<Route path='/termsofuse'>
							<Terms/>
						</Route>
						
						<Route path='/profile' >
							<Profile />
						</Route>

						<Route path='/contactus'>
							<Contact />
						</Route>
						
						<Route path='/aboutus'>
							<AboutUs/>
						</Route>
						
						<Route path='/beauticians/:cityId?' >
							<BeauticianList />
						</Route>

						<Route path='/caterers/:cityId?' >
							<CatererList />
						</Route>

						<Route path='/decorators/:cityId?' >
							<DecoratorList />
						</Route>
						
						<Route path='/mehndi-artist/:cityId?' >
							<MendiArtistList />
						</Route>
						
						<Route path='/musicians/:cityId?' >
							<MusicianList />
						</Route>
						
						<Route path='/photographer/:cityId?' >
							<PhotographerList />
						</Route>
					
						<Route path='/venues/:cityId?' >
							<VenueList />
						</Route>
						
						<Route path='/:serviceName/:venueId' >
							<ServicePage />
						</Route>

						<Route exact path='/'>
							<Search />
							<Landingpage />
						</Route>  
						
						<Redirect to='/' />
					</Switch>
				{!authRoute.includes(pathName) && ( <Footer pathName={pathName}/> )}				
			</div>
			{/* <RightSideDrawer /> */}
        </>
	);
}

export default Admin;