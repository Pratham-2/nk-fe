import { createSlice } from '@reduxjs/toolkit';
import { db } from "../../firebaseConfig/firebaseConfig";
import swal from "sweetalert2";
import { States, Cities } from '../utils/data';

const venueSlice = createSlice({
    name        : 'venueSlice',
    initialState: {
        showAddVenueModal : false,
        showEditVenueModal: null,
        venuesList : [],
        cities : [],
        showDetailModal : null,
        amenities : [],
        loading : false
    },
    reducers: {
        setShowAddVenueModal(state) {
            state.showAddVenueModal = !state.showAddVenueModal;
        },
        setShowEditVenueModal(state, action) {
            state.showEditVenueModal = action.payload;
        },
        setVenueList(state, action) {
            const venues = action.payload;
            state.venuesList = venues
            // state.venuesList = [...state.venuesList, venues]
        },
        setCities(state, action) {
            const city = action.payload;
            state.cities = city;
        },
        setAmenities(state, action) {
            const amenity = action.payload;
            state.amenities = amenity;
        },
        setShowDetailModal(state, action) {
            state.showDetailModal = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload
        }
    }
});

export const postVenue = (params) => {
    return async (dispatch) => { 
        try {
            await db.collection('Venues').doc().set(params);
            $('#add-venue-modal').modal('hide')
            swal.fire({
                icon              : 'success',
                title             : 'Venue Added Successfully',
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

export const updateVenue = (params) => {
    return async (dispatch) => {
        try {
            await db.collection('Venues').doc(params.ID).update(params);
            $('#add-venue-modal').modal('hide')
            // dispatch(getVenues(params.ID))
            swal.fire({
                icon              : 'success',
                title             : 'Venue Updated Successfully',
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

export const getAmenities = () => {
    return async (dispatch) => {
        try {
            const response = await db.collection('Amenities').doc('AmenitiesDoc').get();   
            var list = [];
                
            if(response.exists){           
                dispatch(venueSlice.actions.setAmenities(response.data().AmenitiesList))
            } else{
                dispatch(list)
            }
        } catch (err) {
            swal.fire({
                icon      : 'error',
                titleText : err.message
            })
        }
    }
}

export const getCities = () => {
    return async (dispatch) => {
        try {
            let initialCities = [];

            Cities.sort((a,b) => { 
                if(a.Name < b.Name) return -1 
                if(a.Name > b.Name) return 1 
                return 0;
            }).forEach(c => initialCities.push({ value: c.Name, label: c.Name, ...c}));

            dispatch(venueSlice.actions.setCities(initialCities))           
        } catch (err) {
            swal.fire({
                icon      : 'error',
                titleText : err.message
            })
        }
    }
}

export const deactivateVenue = (params) => {
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
                        await db.collection('Venues').doc(params.ID).update(params);
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
                title             : 'Venue Deleted Successfully',
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

export const getVenues = (params) => {

    return async (dispatch) => {        
        try {
            dispatch(venueActions.setLoading(true))
            await db.collection('Venues').where('VendorID', '==' , params).where('Active', '==', 'Y').onSnapshot((d) => {
                let v = [];                           
                d.forEach(a => v.push({ID: a.id, ...a.data()}))                                          
                dispatch(venueSlice.actions.setVenueList(v))
            });
            dispatch(venueActions.setLoading(false))
        } catch (err) {
            dispatch(venueActions.setLoading(false))
            swal.fire({
                icon      : 'error',
                titleText : err.message
            })
        }
    }
}

export const venueActions = venueSlice.actions;
export default venueSlice;