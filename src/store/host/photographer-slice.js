import { createSlice } from "@reduxjs/toolkit";
import fire, { db, auth } from "../../firebaseConfig/firebaseConfig";
import swal from "sweetalert2";

const photographerSlice = createSlice({
    name : 'photographerSlice',
    initialState : {
        showAddPhotographerModal : false,
        showEditPhotographerModal : null,
        photographerList : [],
    },
    reducers : {
        setShowAddPhotographerModal(state) {
            state.showAddPhotographerModal = !state.showAddPhotographerModal;
        },
        setShowEditPhotographerModal(state, action) {
            state.showEditPhotographerModal = action.payload;
        },
        setPhotographerList(state, action) {
            const photographers = action.payload;
            state.photographerList = photographers
            // state.venuesList = [...state.venuesList, venues]
        },
    }
});

export const postPhotographer = (params) => {
    return async (dispatch) => {
        try {
            await db.collection('Photographer').doc().set(params);
            $('#add-photographer-modal').modal('toggle')
            swal.fire({
                icon              : 'success',
                title             : 'Photographer Added Successfully',
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

export const updatePhotographer = (params) => {
    return async (dispatch) => {
        try {
            await db.collection('Photographer').doc(params.ID).update(params);
            $('#add-photographer-modal').modal('toggle')
            swal.fire({
                icon              : 'success',
                title             : 'Photographer Updated Successfully',
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

export const deactivatePhotographer = (params) => {
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
                        await db.collection('Photographer').doc(params.ID).update(params);
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
                title             : 'Photographer Deleted Successfully',
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

export const getPhotographers = (params) => {
    return async (dispatch) => {
        try {
            const res = await db.collection('Photographer').where('VendorID', '==' , params).where('Active', '==', 'Y').onSnapshot((d)=>{
                let v = [];
                d.forEach(a => v.push({ID: a.id, ...a.data()}))
                dispatch(photographerSlice.actions.setPhotographerList(v))
            });

        } catch (err) {
            swal.fire({
                icon      : 'error',
                titleText : err.message
            })
        }
    }
}

export const photographerActions = photographerSlice.actions;
export default photographerSlice;