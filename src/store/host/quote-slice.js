import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebaseConfig/firebaseConfig";
import swal from "sweetalert2";
import moment from "moment";


const quoteSlice = createSlice({
    name : 'quoteSlice',
    initialState : {
        quoteList : [],
    },
    reducers : {
        setQuoteList(state, action) {
            const Quotes = action.payload;
            state.quoteList = Quotes
        },
    }
});

export const getQuotes = (typeOfQuote) => {
    return  (dispatch, getState) => {
        try {
            const { authReducer }  = getState();
            const { currentUser }  = authReducer;
            
            if( currentUser && currentUser.ID) {
                let type = (!typeOfQuote || typeOfQuote == 'new') ? 'Unread' : 'Read';
                
                db.collection('ServiceQuote').where('VendorID','==', currentUser.ID)
                .where('Status', '==', type).onSnapshot(d => {
                    let quotes = [];
                    d.forEach(a => {
                        const data = a.data();
                        data.CreatedDate = moment(a.data().CreatedDate.toDate()).format('DD-MM-YYYY');
                        quotes.push({ID: a.id, ...data})
                    })

                    dispatch(quoteSlice.actions.setQuoteList(quotes))
                })
            } 

        } catch (err) {
            swal.fire({
                icon      : 'error',
                titleText : err.message
            })
        }
    }
}


export const updateQuoteStatus = (docId) => {
    return  async(dispatch) => {
        try {
            if(!!docId){
                await db.collection("ServiceQuote").doc(docId).update({ Status : "Read"});

                swal.fire({
                    icon      : 'success',
                    titleText : 'Quote marked as read..!',
                    timer     : 1000,
                    showConfirmButton :false
                })
                $('#quoteDetail-modal').modal('toggle');
            }
           
        } catch (err) {
            swal.fire({
                icon      : 'error',
                titleText : err.message
            })
        }
    }
}

export const deleteQuote = (docId) => {
    return  async(dispatch) => {
        try {
            if(!!docId){
                await db.collection("ServiceQuote").doc(docId).delete();
                
                swal.fire({
                    icon      : 'success',
                    titleText : 'Quote deleted..!',
                    timer     : 1000,
                    showConfirmButton :false
                })
            }
        } catch (err) {
            swal.fire({
                icon      : 'error',
                titleText : err.message
            })
        }
    }
}


export const quoteActions = quoteSlice.actions;
export default quoteSlice;