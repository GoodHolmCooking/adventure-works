import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const storeSlice = createSlice({
    name:"stores",
    initialState:{
        stores: [],
        displayStores: [],
        contactTypes: [],
        filter: ""
    },
    reducers:
    {
        setStoreFilter: (state,action) =>
		{
			return { ...state, filter: action.payload }
		},
        applyStoreFilter: (state) =>
		{
            console.log(`Applying filter of '${state.filter}' on ${state.stores.length} stores.`);
            // search stores
			state.displayStores =  state.stores
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

    }
});

export const { setStoreFilter, applyStoreFilter } = storeSlice.actions;

export const loadStoresAsync = createAsyncThunk("/stores/loadStoresAsync", async () => {
	try {
		const resp = await axios.get("/Order/store");
		return resp.data;
	} catch (err) {
		toast.error(err.toString());
	}
});

export const updateStoreAsync = createAsyncThunk("/stores/updateStoreAsync", async data => {
    try {
		axios.put(`/Store/${data.storeUpdate.id}`, data.storeUpdate)
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
		axios.put(`/Contact/${data.personId}/${data.Id}`, data)
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
		axios.put(`/Email/${data.emailAddressId}/${data.Id}`, data)
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

export default storeSlice.reducer;
