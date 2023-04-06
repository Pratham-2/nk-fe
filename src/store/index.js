import { configureStore } from "@reduxjs/toolkit";
import authSlice from './auth/auth-slice';
import catererSlice from "./host/caterer-slice";
import decoratorSlice from "./host/decorator-slice";
import photographerSlice from "./host/photographer-slice";
import venueSlice from "./host/venue-slice";
import uiSlice from './ui/ui-slice';
import searchSlice from "./search/search-slice";
import quoteSlice from "./host/quote-slice";
import utilSlice from "./utils/utils-slice"
import serviceSlice from "./host/service-slice";

const store = configureStore({
    reducer: { 
        authReducer         : authSlice.reducer,
        uiReducer           : uiSlice.reducer,
        venueReducer        : venueSlice.reducer,
        searchReducer       : searchSlice.reducer,
        catererReducer      : catererSlice.reducer,
        decoratorReducer    : decoratorSlice.reducer,
        photographerReducer : photographerSlice.reducer,
        quoteReducer        : quoteSlice.reducer,
        utilReducer         : utilSlice.reducer,
        serviceReducer      : serviceSlice.reducer,
    }
});

export default store