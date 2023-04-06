import { createSlice } from '@reduxjs/toolkit';


const uiSlice = createSlice({
    name         : 'uiState',
    initialState : {
        showUserMenu     : false,
        signUpUser       : false,
        showBookingModal : false,
        showEnquiryModal : false,
        isLoading        : false,
    },
    reducers : {
        showUserMenu(state){
            state.showUserMenu = !state.showUserMenu;
        },
        toggleLoading(state, action){
            state.isLoading = action.payload;
        },
        setsignUpUser(state, action){
            state.signUpUser = action.payload;
        },
        showModal(state, action){
            let type = action.payload;
            switch(type){
                case 'booking':
                    state.showBookingModal = !state.showBookingModal;
                    break;
                case 'enquiry':
                    state.showEnquiryModal = !state.showEnquiryModal;
                    break;
                default:
                    break;
            }
        }
    }
})

// Action Creators ---->


export const uiActions = uiSlice.actions;
export default uiSlice;