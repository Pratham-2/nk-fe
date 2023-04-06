import { GetImage } from "../Components/Global/Helper";
import fire, { auth, db } from "../firebaseConfig/firebaseConfig";
import swal from "sweetalert2";

//Helper Functions
export const getUserDataByID = async (id) => {
    try {
        let userData = false;
        const response = await db.collection('Users').doc(id).get();
        userData = { ...response.data(), ID: response.id }
        return userData
    } catch (err) {
        console.log(err);
        swal.fire({
            icon: 'error',
            titleText: err.message,
        })
    }
}

export const getServiceByID = async (service, serviceId) => {
    try {
        let serviceData;

        const response = await db.collection(service).doc(serviceId).get();
        if (response && response.data()) serviceData = { ID: response.id, ...response.data() };

        return serviceData;
    } catch (err) {
        swal.fire({
            icon: 'error',
            titleText: err.message,
        });
    }
}

export const getServiceByName = async (service) => {
    try {
        let serviceData = [];

        const serviceRes = await db.collection(service).where('Active', '==', 'Y').get();
        if (serviceRes.docs.length > 0) serviceRes.forEach(s => serviceData.push({ ID: s.id, ...s.data() }));

        return serviceData
    } catch (err) {
        swal.fire({
            icon: 'error',
            titleText: err.message,
        })
    }
}

export const getServiceByNameAndCity = async (service, city) => {
    try {
        let serviceData = [];

        const response = await db.collection(service).where("City", '==', city).where('Active', '==', 'Y').get();
        if (response.docs.length > 0) response.forEach(s => serviceData.push({ ID: s.id, ...s.data() }));
        return serviceData
    } catch (err) {
        swal.fire({
            icon: 'error',
            titleText: err.message,
        })
    }
}

export const getServiceByLocality = async (service, locality) => {
    try {
        let serviceData = [];

        const response = await db.collection(service).where('Locality', 'array-contains', locality).get();
        if (response.docs.length > 0) response.forEach(s => serviceData.push({ ID: s.id, ...s.data() }));
        return serviceData
    } catch (err) {
        swal.fire({
            icon: 'error',
            titleText: err.message,
        })
    }
}

export const getService = async (serviceName, locality, city, serviceId, price) => {

    try {
        let serviceRes;
        let serviceData = [];

        if (serviceName && serviceName.length > 0) {
            serviceRes = await db.collection(serviceName)
        }
        if (city && city.length > 0) {
            serviceRes = serviceRes.where("City", '==', city)
        }
        if (locality && locality.length > 0) {
            serviceRes = serviceRes.where('Locality', 'array-contains', locality)
        }
        if (serviceId && serviceId.length > 0) {
            serviceRes = serviceRes.doc(serviceId)
        }
        if (price) {
            serviceRes = serviceRes.where('StartRange', '<=', price)
        }
        const response = await serviceRes.where('Active', '==', 'Y').get()
        if (response.docs.length > 0) response.forEach(s => serviceData.push({ ID: s.id, ...s.data() }));
        return serviceData
    }  catch (err) {
        swal.fire({
            icon: 'error',
            titleText: err.message,
        })
    }

}

export const getImageBucket = ( tag ) => {
    
    var bucketName = 'service-images';

    switch (tag.toLowerCase()) {
        case 'venue':
        case 'venues':
            bucketName = 'venues-images'
            break;
        case 'caterer':
        case 'Caterers':
            bucketName = 'caterer-images'
            break;
        case 'photographer':
            bucketName = 'photographer-images'
            break;
        case 'decorator':
        case 'decorators':
            bucketName = 'decorator-images'
            break;
        default:
            bucketName = 'service-images'
            break;
    }

    return bucketName;
}

// export const fetchService = async (service,match) => {
//     try {
//         dispatch(uiActions.toggleLoading(true))
//         const { cityId } = match;

//         //call get venues api as per url parameters ->
//         if(cityId && globalCities.length > 0){
//             const response = await getServiceByNameAndCity(service, cityId);
//             if(response.length > 0) setFeaturedList(response);
//             else setFeaturedList([]);

//             //set city filter dd value from globalcities
//             const selectedCity = globalCities.find(c => c.value === cityId);
//             setFilters({...filters, selectedCity});    
//             dispatch(uiActions.toggleLoading(false))           
//         }else{
//             // sort as per city -> 
//             const response = await getServiceByName('Venues');
//             if(response.length > 0) setFeaturedList(response);
//             dispatch(uiActions.toggleLoading(false))
//         }

//     } catch (err) {
//         displayError('error', err);
//     }
// }
