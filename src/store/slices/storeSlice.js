import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const storeSlice = createSlice({
    name:"stores",
    initialState:{
        stores: [],
        displayStores: [],
        provinces: [],
        contactTypes: [],
        countries: [],
        filter: ""
    },
    reducers:
    {
        // I believe this is no longer used. Will remove if nothing breaks.
        // loadStores: (state, action) => {
        //     state.stores = action.payload;
        // },
        setStoreFilter: (state,action) =>
		{
			return { ...state, filter: action.payload }
		},
        applyStoreFilter: (state) =>
		{

            // search stores
			state.displaystores =  state.stores
                .filter(store => state.filter === "" || // if there is no filter set, display everything
                    (store.storeName.toLowerCase())
                        .includes(state.filter.toLowerCase())); // if there is a filter, return matching store names
		},
    },
    extraReducers: builder => {
        builder
            .addCase(loadStoresAsync.fulfilled, (state, action) => {
                state.stores = action.payload;
            })
            .addCase(loadStoresAsync.rejected, () => {
                toast.error("Error loading stores.");
            })
            .addCase(loadContactTypesAsync.fulfilled, (state, action) => {
                state.contactTypes = action.payload;
            })
            .addCase(loadContactTypesAsync.rejected, () => {
                toast.error("Error loading contact types.");
            })
            .addCase(loadProvincesAsync.fulfilled, (state, action) => {
                state.provinces = action.payload;
            })
            .addCase(loadProvincesAsync.rejected, () => {
                toast.error("Error loading provinces.");
            })
            .addCase(loadCountriesAsync.fulfilled, (state, action) => {
                state.countries = action.payload;
            })
            .addCase(loadCountriesAsync.rejected, () => {
                toast.error("Error loading countries.");
            });
    }
});

export const { setStoreFilter, applyStoreFilter } = storeSlice.actions;

export const loadStoresAsync = createAsyncThunk("/stores/loadStoresAsync", async () => {
	try {
		const resp = await axios.get("/Store");
		return resp.data;
	} catch (err) {
		toast.error(err.toString());
	}
});

export const updateStoreAsync = createAsyncThunk("/stores/updateStoreAsync", async data => {
    try {
		axios.put(`/Store/${data.storeUpdate.businessEntityId}`, data.storeUpdate)
            .then(resp => {
                console.log(`Status: ${resp.status}`);
                data.callbacks.setStore(data.storeUpdate);
            });
	} catch (err) {
		toast.error(err.toString());
	}
});

export const updateContactAsync = createAsyncThunk("/stores/updateContactAsync", async data => {
    try {
        console.log("Running contact update");
		axios.put(`/Contact/${data.personId}/${data.businessEntityId}`, data)
            .then(resp => {
                console.log(`Status: ${resp.status}`);
            });
	} catch (err) {
		toast.error(err.toString());
	}
});


export const updateEmailAsync = createAsyncThunk("/stores/updateEmailAsync", async data => {
    try {
        console.log("Running email update");
		axios.put(`/Email/${data.emailAddressId}/${data.businessEntityId}`, data)
            .then(resp => {
                console.log(`Status: ${resp.status}`);
            });
	} catch (err) {
		toast.error(err.toString());
	}
});


export const loadContactTypesAsync = createAsyncThunk("/stores/loadContactTypesAsync", async () => {
    try {
		const resp = await axios.get("/ContactType");
		return resp.data;
	} catch (err) {
		toast.error(err.toString());
	}
});

export const loadProvincesAsync = createAsyncThunk("/stores/loadProvincesAsync", async () => {
    try {
		const resp = await axios.get("/StateProvince");
		return resp.data;
	} catch (err) {
		toast.error(err.toString());
	}
});

export const loadCountriesAsync = createAsyncThunk("/stores/loadCountriesAsync", async () => {
    try {
		const resp = await axios.get("/CountryRegion");
		return resp.data;
	} catch (err) {
		toast.error(err.toString());
	}
});

export default storeSlice.reducer;
