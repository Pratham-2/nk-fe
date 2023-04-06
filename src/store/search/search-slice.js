import { createSlice } from '@reduxjs/toolkit';
import fire, { db, auth } from "../../firebaseConfig/firebaseConfig";
import firebase from "firebase/app"
import swal from "sweetalert2";
import { States, Cities } from "../utils/data";


const searchSlice = createSlice({
    name: 'searchState',
    initialState: {
        searchData: {},
        searchedContent: [],
        states: [],
        cities: [],
        services: [],
        locality: [],
        price: []
    },
    reducers: {
        setSearchData(state, action) {
            const { key, value } = action.payload;
            state.searchData = { ...state.searchData, [key]: value };
        },
        resetSearchData(state) {
            state.searchData = {};
        },
        setSearchedContent(state, action) {
            state.searchedContent = action.payload;
        },
        setStatesAndCities(state, action) {
            const { type, dataArr } = action.payload;
            if (dataArr.length > 0) {
                if (type === 'states') state.states = dataArr;
                else state.cities = dataArr;
            }
        },
        setServices(state, action) {
            const { services } = action.payload;
            let serviceArr = []
            if (services.length > 0) services.sort().forEach(a => serviceArr.push({ label: a, value: a }))
            state.services = serviceArr;
        },
        setLocality(state, action) {
            let locality = []
            action.payload.length > 0 && action.payload.forEach(i => locality.push({ value: i, label: i }))
            state.locality = locality
        },
        setPrice(state, action) {
            let price = []
            action.payload.length > 0 && action.payload.forEach(i => price.push({ value: i, label: `Upto ${i}` }))
            state.price = price
        }
    }
})

// Action Creators ---->
// export const setUser = (params) => {
//     return async(dispatch) => {
//         try {  
//             let userData = await getUserDataByID(params);
//             if(userData) dispatch(authSlice.actions.setUserData(userData));
//         } catch (error) {
//             swal.fire({
//                 icon: 'error',
//                 titleText: err.message,
//             })
//         }
//     }
// }

export const getStatesAndCitiesAndServices = () => {
    return async (dispatch) => {
        try {
            let initialStates = [];
            let initialCities = [];

            //const stateRes = await db.collection('State').get();
            // stateRes.forEach(s => initialStates.push({ ID:s.id , ...s.data()}));

            // stateRes.forEach(s => initialStates.push({ value: s.id, label: s.data().Name }));
            // dispatch(searchActions.setStatesAndCities({ type: 'states', dataArr: initialStates }));

            // const cityRes = await db.collection('City').get();
            // cityRes.forEach(c => initialCities.push({ value: c.id, label: c.data().Name, ...c.data() }));

            Cities.sort((a,b) => { 
                if(a.Name < b.Name) return -1 
                if(a.Name > b.Name) return 1 
                return 0;
            }).forEach(c => initialCities.push({ value: c.Name, label: c.Name, ...c}));
            dispatch(searchActions.setStatesAndCities({ type: 'cities', dataArr: initialCities }));

            const serviceRes = await db.collection('Services').doc('services').get();
            dispatch(searchActions.setServices(serviceRes.data()));

        } catch (err) {
            console.log("err", err)

            swal.fire({
                icon: 'error',
                titleText: err.message,
            })
        }
    }
}

export const getLocalityByCity = (city) => {
    return async (dispatch) => {
        try {
            const response = await db.collection('City').doc(city).get();
            dispatch(searchActions.setLocality(response.data().Locality))
        }
        catch (error) {
            swal.fire({
                icon: 'error',
                titleText: error.message,
            })
        }
    }
}

export const getAllLocality = () => {
    return async (dispatch) => {
        try {
            let localityArray = []
            const response = await db.collection('City').get()
            // console.log(response)
            response.forEach(i => localityArray.push(i.data().Locality))
            localityArray = [...new Set(localityArray.flat())]   //remove duplicates from array if present
            dispatch(searchActions.setLocality(localityArray))

        } catch (error) {
            swal.fire({
                icon: 'error',
                titleText: error.message,
            })
            // console.log(error)
        }
    }
}

export const getPriceFilter = (serviceName) => {
    return async (dispatch) => {
        try {
            let priceArray = []
            const response = await db.collection(serviceName).where('Active', '==', 'Y').get()
            response.forEach(i => priceArray.push(i.data().StartRange))
            // response.forEach(i => priceArray.push(i.data().EndRange))
            priceArray = priceArray.map(Number) //Parsing to int
            priceArray = [...new Set(priceArray)]; //Removing Duplicates
            priceArray.sort((a, b) => a - b) //Sorting Array 
            dispatch(searchActions.setPrice(priceArray))

        } catch (error) {
            swal.fire({
                icon: 'error',
                titleText: error.message,
            })
        }
    }
}

export const onSearchService = () => {
    return async (dispatch, getState) => {
        try {
            let filteredResult = [];
            const { searchReducer } = getState();
            const { searchData, services } = searchReducer;

            if (searchData.city && searchData.service) {

                const res = await db.collection(searchData.service).where("City", '==', searchData.city).get();
                res.forEach(s => filteredResult.push({ ID: s.id, ...s.data() }));

            } else if (searchData.service) {

                const serviceRes = await db.collection(searchData.service).get();
                serviceRes.forEach(s => filteredResult.push({ ID: s.id, ...s.data() }));

            } else if (searchData.city) {
                //Get All service from that city -> create array of object as per service in result
                for (const { value } of services) {
                    const resultArr = [];
                    const response = await db.collection(value).where("City", '==', searchData.city).get();
                    if (response.docs.length > 0) {
                        response.forEach(d => resultArr.push({ ID: d.id, ...d.data() }));
                        filteredResult.push({ [value]: resultArr });
                    }
                }
            }
            if (filteredResult.length > 0) dispatch(searchSlice.actions.setSearchedContent(filteredResult))
        } catch (err) {
            swal.fire({
                icon: 'error',
                titleText: err.message,
            })
        }
    }
}


export const searchActions = searchSlice.actions;
export default searchSlice;