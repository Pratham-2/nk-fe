import { createSlice } from '@reduxjs/toolkit';
import { db } from "../../firebaseConfig/firebaseConfig";
import swal from "sweetalert2";
import { getServiceByID, getImageBucket } from '../storeHelper';
import { GetImage } from '../../Components/Global/Helper';
import defaultImg from '../../Assets/images/imgPlaceHolder.jpg';
// import defaultImg from '../../Assets/images/defaultImg.png';


const serviceSlice = createSlice({
    name: 'serviceSlice',
    initialState: {
        serviceList: [],
        mehndiList: [],
        musicianList: [],
        featuredList: [],

    },
    reducers: {
        setServiceList(state, action) {
            let newList = action.payload;
            state.serviceList = newList;
        },
        setMehndiList(state, action) {
            let newList = action.payload;
            state.mehndiList = newList;
        },
        setMusicianList(state, action) {
            let newList = action.payload;
            state.musicianList = newList;
        },
        setFeaturedList(state, action) {
           state.featuredList = [...state.featuredList, action.payload];
            // state.featuredList = action.payload;
        }
    }
});

const dbCollection = {
    beauty: 'Beauticians',
    mehndi: 'Mehndi-artist',
    music: 'Musicians',
};

const redirectLinks = [ 'venue','caterer','photographer','decorator','beautician','mehndiArtist','musician'];


export const postService = (params) => {
    const { serviceData, serviceName } = params;

    return async (dispatch) => {
        try {
            if (serviceName == "Beautician") {
                await db.collection(dbCollection.beauty).doc().set(serviceData);
            }

            if (serviceName == "Mehndi Artist") {
                await db.collection(dbCollection.mehndi).doc().set(serviceData);
            }

            if (serviceName == "Musician") {
                await db.collection(dbCollection.music).doc().set(serviceData);
            }


            $('#add-service-modal').modal('hide')
            swal.fire({
                icon: 'success',
                title: `${serviceName} added successfully`,
                showConfirmButton: false,
                timer: 1500
            });
        } catch (err) {
            swal.fire({
                icon: 'error',
                titleText: err.message
            })
        }
    }
}

export const getService = (params) => {
    const { serviceName, vendorID } = params

    return async (dispatch) => {
        try {
            if (!!serviceName) {

                if (serviceName == "Beautician") {
                    await db.collection(dbCollection.beauty).where('VendorID', '==', vendorID).where('Active', '==', 'Y').onSnapshot(d => {
                        let list = [];

                        if (d.docs.length <= 0) {
                            dispatch(serviceSlice.actions.setServiceList(list));
                            return;
                        }

                        d.forEach(a => list.push({ ID: a.id, ...a.data() }));
                        dispatch(serviceSlice.actions.setServiceList(list));
                    });
                }

                if (serviceName == "Mehndi Artist") {
                    await db.collection(dbCollection.mehndi).where('VendorID', '==', vendorID).where('Active', '==', 'Y').onSnapshot(d => {
                        let list = [];

                        if (d.docs.length <= 0) {
                            //dispatch(serviceSlice.actions.setServiceList(list));
                            dispatch(serviceSlice.actions.setMehndiList(list));
                            return;
                        }

                        d.forEach(a => list.push({ ID: a.id, ...a.data() }));
                        dispatch(serviceSlice.actions.setMehndiList(list));
                        //dispatch(serviceSlice.actions.setServiceList(list));
                    });
                }


                if (serviceName == "Musician") {
                    await db.collection(dbCollection.music).where('VendorID', '==', vendorID).where('Active', '==', 'Y').onSnapshot(d => {
                        let list = [];

                        if (d.docs.length <= 0) {
                            //dispatch(serviceSlice.actions.setServiceList(list));
                            dispatch(serviceSlice.actions.setMusicianList(list));
                            return;
                        }

                        d.forEach(a => list.push({ ID: a.id, ...a.data() }));
                        dispatch(serviceSlice.actions.setMusicianList(list));
                        //dispatch(serviceSlice.actions.setServiceList(list));
                    });
                }
            }
        } catch (err) {
            swal.fire({
                icon: 'error',
                titleText: err.message
            })
        }
    }
}

export const updateService = (params) => {
    const { serviceName, serviceData } = params

    return async (dispatch) => {
        try {
            if (!!serviceName) {
                if (serviceName == "Beautician") {
                    await db.collection(dbCollection.beauty).doc(serviceData.ID).update(serviceData);
                }

                if (serviceName == "Mehndi Artist") {
                    await db.collection(dbCollection.mehndi).doc(serviceData.ID).update(serviceData);
                }

                if (serviceName == "Musician") {
                    await db.collection(dbCollection.mehndi).doc(serviceData.ID).update(serviceData);
                }

                $('#add-service-modal').modal('hide');
                swal.fire({
                    icon: 'success',
                    title: `${serviceName} Updated Successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (err) {
            swal.fire({
                icon: 'error',
                titleText: err.message
            })
        }
    }
}

export const getFeaturedServices = () => {
    return async(dispatch, getState) => {
        try {           

            const { serviceReducer }  = getState();
            const { featuredList }  = serviceReducer;

            if(featuredList.length !== 0 ) return;

            //Fetch All Featured Service --> 
            const res = await db.collection('FeaturedService').get();
            
            if(res.size === 0 ) return;
                    
            res.forEach(async(doc) => {
               
                const {serviceName , serviceId} = doc.data();
                
                const serviceData = await getServiceByID(serviceName, serviceId);                
                
                if (serviceData) {                  
                    let Img  = [defaultImg];
                    const from = getImageBucket(serviceName);                                      

                    if(serviceData.Images) {                        
                        const imageUrl = await GetImage(`${from}/${serviceData.Images[0]}`);
                        Img = [imageUrl]                        
                    }
                    
                    var sName = redirectLinks.find( s => serviceName.toLowerCase().replace('-','').includes(s));

                    serviceData.serviceName = sName;
                    serviceData.Img = Img;            

                    dispatch(serviceActions.setFeaturedList(serviceData));
                }
            });            
        } catch (err) {
            swal.fire({
                icon: 'error',
                titleText: err.message
            })
        }        
    }
}


export const getFeaturedService = () => {
    return async (dispatch) => {
        let array = [], temp = []
        let response = await db.collection('FeaturedService').get()
        response.forEach(i => array.push(i.data()))

        array.map(i => {
            let obj = {}
            obj.serviceId = i.serviceId
            obj.serviceName = i.serviceName
            temp.push(obj)
        })


        let promiseArray = temp.map(async (i) => {
            return getServiceByID(i.serviceName, i.serviceId)
        })


        return Promise.all(promiseArray).then(async (values) => {
            let data = [...values], ImageArray = []
            // Adding ServiceName:'xyz'
            temp.map(i => {
                data.map(j => {
                    if (i.serviceId == j.ID) {
                        j.serviceName = i.serviceName
                    }
                })
            })
            [1, 2, 3]
            let im
            data.map((i, index) => {
                let path = `${i.serviceName.toLowerCase()}` == 'decorators' ? 'decorator' : `${i.serviceName.toLowerCase()}`

                // if(i.Images && i.Images.length > 0){}
                GetImage(`${path}-images/${i.Images[0]}`).then(image => {
                    return new Promise((resolve, reject) => {
                        im = im || []
                        i.Img = i.Img || []
                        i.Img.push(image)
                        im.push(image)
                        return resolve(im)
                    })
                }).then(res => {
                    if (data.length == res.length) {
                        dispatch(serviceActions.setFeaturedList(data))
                    }

                })

            })

        })
    }

}

export const deactivateService = (params) => {

    const { serviceName, serviceID } = params;

    return async (dispatch) => {
        try {
            const swalResult = await swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                buttonsStyling: false,
                reverseButtons: true,
                showLoaderOnConfirm: true,
                confirmButtonClass: 'btn btn-primary',
                cancelButtonClass: 'btn btn-secondary',
                confirmButtonText: 'Delete',
                preConfirm: async () => {
                    try {
                        if (serviceName == "Beautician") {
                            await db.collection(dbCollection.beauty).doc(serviceID).set({ Active: 'N' }, { merge: true });
                        }

                        if (serviceName == "Mehndi Artist") {
                            await db.collection(dbCollection.mehndi).doc(serviceID).set({ Active: 'N' }, { merge: true });
                        }

                        if (serviceName == "Musician") {
                            await db.collection(dbCollection.mehndi).doc(serviceID).set({ Active: 'N' }, { merge: true });
                        }

                        return;
                    } catch (err) {
                        swal.fire({
                            icon: 'error',
                            titleText: 'Error!',
                            text: err.message,
                            buttonsStyling: false,
                            confirmButtonClass: 'btn btn-brand',
                        });
                        return;
                    }
                },
            });
            if (!swalResult.value) return;
            swal.fire({
                icon: 'success',
                title: `${serviceName} Deleted Successfully`,
                showConfirmButton: false,
                timer: 1500
            });
        } catch (err) {
            swal.fire({
                icon: 'error',
                titleText: err.message
            })
        }
    }
}

export const serviceActions = serviceSlice.actions;
export default serviceSlice;