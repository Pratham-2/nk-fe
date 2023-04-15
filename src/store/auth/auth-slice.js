import { createSlice } from '@reduxjs/toolkit';
import fire, { db, auth } from "../../firebaseConfig/firebaseConfig";
import firebase from "firebase/app"
import swal from "sweetalert2";
import resetEmail from '../../Assets/images/resetEmail.png';
import greetImg from '../../Assets/images/greeting.png';
import { StopProcessing } from '../../Components/Global/Helper';

//Helper Functions
import { getUserDataByID } from '../storeHelper';

const authSlice = createSlice({
    name        : 'authState',
    initialState: {
        currentUser         : false,
        showAuthModal       : false,
        showSignupModal     : false,
        showResetPassword   : false,
        showPassword        : false,
        loginData           : {}
    },
    reducers : {
        setLoginDetails(state, action){
            const { key, value } = action.payload;
            state.loginData = {...state.loginData, [key] : value };
        },
        setUserData(state, action){
            state.currentUser = action.payload;
            // window.location.reload();
        },
        showModal(state, action){
            const type  = action.payload;
            switch(type){
                case 'Login':
                    state.showAuthModal = !state.showAuthModal;
                    break;
                case 'Signup':
                    state.showSignupModal = !state.showSignupModal;
                    break;
                case 'Forgot-Password':
                    state.showResetPassword = !state.showResetPassword;
                    break;
                default:
                    break
            }
        },
        showPassword(state){
            state.showPassword = !state.showPassword;
        }
    }
})

// Action Creators ---->
export const postLogin  = (params) => {
    return async(dispatch) => {
        const { data, btn } = params;
        try {  
            const{ Email, Password } = data;
            //Logout when tab is closed -->
			await fire.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
            const authState =  await auth.signInWithEmailAndPassword(Email, Password);
            let userData = await getUserDataByID(authState.user.uid);
            if(userData) { 
                dispatch(authSlice.actions.setUserData(userData));
                //$('#login-modal').modal('toggle');
            }
        } catch (err) {
            StopProcessing(btn);
            switch (err.code) {
                case "auth/invalid-email":
                case "auth/user-not-found":
                    swal.fire({
                        icon: 'error',
                        title: 'Please Signup',
                        text: 'User not found!',
                    })
                  break;
                case "auth/wrong-password":
                    swal.fire({
                        icon: 'error',
                        title: 'Invalid Password',
                        text: 'Check your password!',
                    })
                  break;
                default: {
                    swal.fire({
                        icon: 'error',
                        title: 'Something Went Wrong',
                        text: 'Please try after sometime!',
                    })
                }
            }
        }
    }
}

export const postLogout = () => {
    return async(dispatch) => {
        try {
            await fire.auth().signOut();
            dispatch(authSlice.actions.setUserData(false));
        } catch (err) {
            swal.fire({
                icon: 'error',
                titleText: err.message,
            })
        }
    }
}

export const setUser = (params) => {
    return async(dispatch) => {
        try {  
            let userData = await getUserDataByID(params);
            if(userData) dispatch(authSlice.actions.setUserData(userData));
        } catch (err) {
            swal.fire({
                icon: 'error',
                titleText: err.message,
            })
        }
    }
}

export const postSignup = (params) => {
    return async(dispatch) => {
        try {
            //Create and login new user -> 
            const credentials = await fire.auth().createUserWithEmailAndPassword(params.Email, params.Password);
            if(credentials){
                delete params.Password;
                const userID = credentials.user.uid;
                // @todo send Email verification Mail --> 
                credentials.user.sendEmailVerification();
                
                //Create a doc for that user with uid
                if(params.Usertype == 'host'){ 
                    params.isApproved = false;
                    
                    //Create and Array of this as it will require to add new Services later -->
                    params.HostType = [params.HostType];

                    delete params.ConfirmPassword;
                }
                
                await db.collection('Users').doc(userID).set({ ...params })
                
                swal.fire({
                    imageUrl:greetImg,
                    imageHeight:80,
                    imageAlt: 'Welcome Image',
                    html:
                    `<i>We are glad that you joined us.</i>`+ '<br/>'+
                        `<i>Hope you find all your need..!</i>`,
                        confirmButtonText:
                        '<i class="fa fa-thumbs-up text-white"></i> Great!',
                        confirmButtonAriaLabel: 'Thumbs up, great!',
                });

                //$('#signup-modal').modal('toggle');
            }
            
        } catch (err) {
            StopProcessing(  document.getElementById('signup-btn'));
            
            switch (err.code) {
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    swal.fire({
                        icon: 'error',
                        title: 'Please signin',
                        text: err.message,
                    })
                  break;
                case "auth/weak-password":
                    swal.fire({
                        icon: 'error',
                        title: 'Please check the password',
                        text: err.message,
                    })
                  break;
                default: {
                    swal.fire({
                        icon: 'error',
                        title: 'Please Try Again',
                        text: err.message,
                    })
                }
            }
        }
    }
}

export const resetPassword =  (params) => {
    return async(dispatch)=>{
        try {

            await fire.auth().sendPasswordResetEmail(params.Email, { url:'http://localhost:3000' });
            StopProcessing(document.getElementById('resetBtn'));
            
            swal.fire({
                imageUrl:resetEmail,
                imageHeight:80,
                imageAlt: 'Reset Email Image',
                html:
                `<i>Password Reset Email Sent.</i>`+ '<br/>'+
                `<i>Check your email for futher Instructions..!</i>`, 
            });

            //$('#forgot-modal').modal('toggle'); 
        } catch (err) {
            StopProcessing(  document.getElementById('resetBtn'));
            switch (err.code) {
                case "auth/user-not-found":
                    swal.fire({
                        icon: 'error',
                        title: 'Please Signup',
                        text: 'User not found!',
                    })
                  break;
                default:
                    swal.fire({
                        icon: 'error',
                        titleText: err.message,
                    })
                break;
            }
        }
    }
}

export const UpdateProfile = (params) => {
    return async(dispatch) => {
        try {   
            const { data, btn } = params;
            
            await db.collection('Users').doc(data.ID).update(data);
            let userData = await getUserDataByID(data.ID);
            if(userData) { 
                dispatch(authSlice.actions.setUserData(userData));
            }

            swal.fire({
                icon              : 'success',
                text              : 'Profile Updated Successfully',
                showConfirmButton : false,
                timer             : 1800,
                //title             : 'Profile Updated',
            });

            StopProcessing(btn);
        } catch (err) {
            swal.fire({
                icon: 'error',
                titleText: err.message,
            })
        }
    }
}


export const authActions = authSlice.actions;
export default authSlice;