import { createSlice } from "@reduxjs/toolkit";
import fire, { db, auth } from "../../firebaseConfig/firebaseConfig";
import swal from "sweetalert2";

const decoratorSlice = createSlice({
    name : 'decoratorSlice',
    initialState : {
        showAddDecoratorModal : false,
        showEditDecoratorModal : null,
        decoratorList : [],
    },
    reducers : {
        setShowAddDecoratorModal(state) {
            state.showAddDecoratorModal = !state.showAddDecoratorModal;
        },
        setShowEditDecoratorModal(state, action) {
            state.showEditDecoratorModal = action.payload;
        },
        setDecoratorList(state, action) {
            const decoraters = action.payload;
            state.decoratorList = decoraters
            // state.venuesList = [...state.venuesList, venues]
        },
    }
});

export const postDecorator = (params) => {
    return async (dispatch) => {
        try {
            await db.collection('Decorators').doc().set(params);
            $('#add-decorator-modal').modal('toggle')
            swal.fire({
                icon              : 'success',
                title             : 'Decorator Added Successfully',
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

export const updateDecorator = (params) => {
    return async (dispatch) => {
        try {
            await db.collection('Decorators').doc(params.ID).update(params);
            $('#add-decorator-modal').modal('toggle')
            swal.fire({
                icon              : 'success',
                title             : 'Decorator Updated Successfully',
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

export const deactivateDecorator = (params) => {
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
                        await db.collection('Decorators').doc(params.ID).update(params);
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
                title             : 'Decorator Deleted Successfully',
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
export const getDecorators = (params) => {
    return async (dispatch) => {
        try {
            const res = await db.collection('Decorators').where('VendorID', '==' , params).where('Active', '==', 'Y').onSnapshot((d)=>{
                let v = [];
                d.forEach(a => v.push({ID: a.id, ...a.data()}))
                dispatch(decoratorSlice.actions.setDecoratorList(v))
            });

        } catch (err) {
            swal.fire({
                icon      : 'error',
                titleText : err.message
            })
        }
    }
}

export const decoratorActions = decoratorSlice.actions;
export default decoratorSlice;