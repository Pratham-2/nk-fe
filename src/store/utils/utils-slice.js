import { createSlice } from '@reduxjs/toolkit';
import { db, serverTimeStamp } from '../../firebaseConfig/firebaseConfig';
import { StopProcessing } from '../../Components/Global/Helper';

const utilSlice = createSlice({
    name         : 'utilSlice',
    initialState : {
        
    },
    reducers : {
        
    }
})

// Action Creators ---->
export const onPostQuote = (params) => {
    return async(dispatch) => {
        const { data, btn } = params;
    
        try {
            //Add Data to collection -> 
            const quoteData = { ...data, CreatedDate: serverTimeStamp , Status : "Unread" }

            await db.collection("ServiceQuote").add(quoteData);
            StopProcessing(btn); 
            $('#enquiry-modal').modal('toggle')
            swal.fire({
                icon              : 'success',
                title             : 'Request Sent ..!',
                text              : 'Our host will contact you shortly.',
                showConfirmButton : false,
                timer              : 1800
            });
        } catch (err) {
            StopProcessing(btn); 
            swal.fire({
                icon: 'error',
                titleText: err.message,
            })
        }
    }
}

export const onPostContact = (params) => {
    return async(dispatch) => {
        const { data, btn } = params;
    
        try {
            //Add Data to collection -> 
            await db.collection("ContactUs").add(data);
           
            StopProcessing(btn); 
            swal.fire({
                icon              : 'success',
                title             : 'Feedback Sent ..!',
                text              : 'Our allies will contact you shortly.',
                showConfirmButton : false,
                timer              : 1800
            });
            window.location.replace("/");

        } catch (err) {
            StopProcessing(btn); 
            swal.fire({
                icon: 'error',
                titleText: err.message,
            })
        }
    }
}


export const utilActions = utilSlice.actions;
export default utilSlice;