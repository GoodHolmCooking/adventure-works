import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const vendorSlice = createSlice({
    name:"vendors",
    initialState:{
        vendors: [],
        provinces: [],
        contactTypes: [],
        countries: []
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
		axios.put(`/Vendor/${data.vendorUpdate.businessEntityId}`, data.vendorUpdate)
            .then(resp => {
                console.log(`Status: ${resp.status}`);
                data.callbacks.setVendor(data.vendorUpdate);
            });
	} catch (err) {
		toast.error(err.toString());
	}
});

export const updateContactAsync = createAsyncThunk("/vendors/updateContactAsync", async data => {
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


export const updateEmailAsync = createAsyncThunk("/vendors/updateEmailAsync", async data => {
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

export const updateAddressAsync = createAsyncThunk("/vendors/updateAddressAsync", async data => {
    try {
        console.log("Running address update");
		axios.put(`/Address/${data.addressId}`, data)
            .then(resp => {
                console.log(`Status: ${resp.status}`);
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

export const loadCountriesAsync = createAsyncThunk("/vendors/loadCountriesAsync", async () => {
    try {
		const resp = await axios.get("/CountryRegion");
		return resp.data;
	} catch (err) {
		toast.error(err.toString());
	}
});

export default vendorSlice.reducer;