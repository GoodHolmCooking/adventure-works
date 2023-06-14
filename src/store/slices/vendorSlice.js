import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const vendorSlice = createSlice({
    name:"vendors",
    initialState:{
        vendors: [],
        provinces: [],
        contactTypes: []
    },
    reducers:
    {
        loadVendors: (state, action) => {
            state.vendors = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadVendorsAsync.fulfilled, (state, action) => {
                state.vendors = action.payload;
            })
            .addCase(loadVendorsAsync.rejected, () => {
                toast.error("Error loading vendors.");
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
                toast.error("Error loading contact provinces.");
            });
    }
});

export const { loadVendors } = vendorSlice.actions;

export const loadVendorsAsync = createAsyncThunk("/vendors/loadVendorsAsync", async () => {
	try {
		const resp = await axios.get("/Vendor");
		return resp.data;
	} catch (err) {
		toast.error(err.toString());
	}
});

export const updateVendorAsync = createAsyncThunk("/vendors/updateVendorAsync", async data => {
    try {
        console.log("Running vendor update");
		axios.put(`/Vendor/${data.vendorUpdate.businessEntityId}`, data.vendorUpdate)
            .then(resp => {
                console.log(`Status: ${resp.status}`);
                data.callbacks.setVendor(data.vendorUpdate);
                data.callbacks.navigate(`/vendors/${data.vendorUpdate.businessEntityId}`)
            });
	} catch (err) {
		toast.error(err.toString());
	}
});

export const loadContactTypesAsync = createAsyncThunk("/vendors/loadContactTypesAsync", async () => {
    try {
		const resp = await axios.get("/ContactType");
		return resp.data;
	} catch (err) {
		toast.error(err.toString());
	}
});

export const loadProvincesAsync = createAsyncThunk("/vendors/loadProvincesAsync", async () => {
    try {
		const resp = await axios.get("/StateProvince");
		return resp.data;
	} catch (err) {
		toast.error(err.toString());
	}
});

export const updatePhoneAsync = createAsyncThunk("/vendors/updatePhoneAsync", async data => {
    console.log("Running phone update");
    console.log(data);
});

export default vendorSlice.reducer;
