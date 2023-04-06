import { createSlice } from "@reduxjs/toolkit";
import fire, { db, auth } from "../../firebaseConfig/firebaseConfig";
import swal from "sweetalert2";

const catererSlice = createSlice({
    name : 'catererSlice',
    initialState : {
        showAddCatererModal : false,
        showEditCatererModal : null,
        catererList : [],
    },
    reducers : {
        setShowAddCatererModal(state) {
            state.showAddCatererModal = !state.showAddCatererModal;
        },
        setShowEditCatererModal(state, action) {
            state.showEditCatererModal = action.payload;
        },
        setCatererList(state, action) {
            const caterers = action.payload;
            state.catererList = caterers
            // state.venuesList = [...state.venuesList, venues]
        },
    }
});

export const postCaterer = (params) => {
    return async (dispatch) => {
        try {
            await db.collection('Caterers').doc().set(params);
            $('#add-caterer-modal').modal('toggle')
            swal.fire({
                icon              : 'success',
                title             : 'Caterer Added Successfully',
                showConfirmButton : false,
                timer              : 1500
            });
        } catch (err) {
            swal.fire({
                icon      : 'error',
                titleText : err.message
            })
        }
    }
}

export const updateCaterer = (params) => {
    return async (dispatch) => {
        try {
            await db.collection('Caterers').doc(params.ID).update(params);
            $('#add-caterer-modal').modal('toggle')
            swal.fire({
                icon              : 'success',
                title             : 'Caterer Updated Successfully',
                showConfirmButton : false,
                timer              : 1500
            });
        } catch (err) {
            swal.fire({
                icon      : 'error',
                titleText : err.message
            })
        }
    }
}

export const deactivateCaterer = (params) => {
    return async (dispatch) => {
        try {
            const swalResult = await swal.fire({
                title               : 'Are you sure?',
                text                : "You won't be able to revert this!",
                icon                : 'warning',
                showCancelButton    : true,
                buttonsStyling      : false,
                reverseButtons      : true,
                showLoaderOnConfirm : true,
                confirmButtonClass  : 'btn btn-primary',
                cancelButtonClass   : 'btn btn-secondary',
                confirmButtonText   : 'Delete',
                preConfirm: async () => {
                    try {
                        await db.collection('Caterers').doc(params.ID).update(params);
                        return;
                    } catch (err) {
                        swal.fire({
                        icon                : 'error',
                        titleText           : 'Error!',
                        text                : err.message,
                        buttonsStyling      : false,
                        confirmButtonClass  : 'btn btn-brand',
                        });
                        return;
                    }
                },
            });
            if (!swalResult.value) return;
            swal.fire({
                icon              : 'success',
                title             : 'Caterer Deleted Successfully',
                showConfirmButton : false,
                timer              : 1500
            });
        } catch (err) {
            swal.fire({
                icon      : 'error',
                titleText : err.message
            })
        }
    }
}

export const getCaterers = (params) => {
    return async (dispatch) => {
        try {
            const res = await db.collection('Caterers').where('VendorID', '==' , params).where('Active', '==', 'Y').onSnapshot(d => {
                let caterer = [];
                d.forEach(a => caterer.push({ID: a.id, ...a.data()}))
                // if(res.docs.length > 0) res.forEach( vn => v.push(vn.data())) ;
                dispatch(catererSlice.actions.setCatererList(caterer))
            })
        } catch (err) {
            swal.fire({
                icon      : 'error',
                titleText : err.message
            })
        }
    }
}

export const catererActions = catererSlice.actions;
export default catererSlice;