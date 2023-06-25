import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const vendorSlice = createSlice({
    name:"vendors",
    initialState:{
        vendors: [],
        displayVendors: [],
        limitedVendor: {},
        provinces: [],
        contactTypes: [],
        countries: [],
        filter: ""
    },
    reducers:
    {
        // I believe this is no longer used. Will remove if nothing breaks.
        // loadVendors: (state, action) => {
        //     state.vendors = action.payload;
        // },
        setVendorFilter: (state, action) =>
		{
			return { ...state, filter: action.payload }
		},
        applyVendorFilter: (state) =>
		{
            // search vendors
			state.displayVendors =  state.vendors
                .filter(vendor => state.filter === "" || // if there is no filter set, display everything
                    (vendor.vendorName.toLowerCase())
                        .includes(state.filter.toLowerCase())); // if there is a filter, return matching vendor names
		},
        setLimitedVendor: (state, action) => {
            state.limitedVendor = action.payload;
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

export const { setVendorFilter, applyVendorFilter, setLimitedVendor } = vendorSlice.actions;

export const loadVendorsAsync = createAsyncThunk("/vendors/loadVendorsAsync", async () => {
	try {
		let resp = await axios.get("/Vendor");
		return resp.data;
	} catch (err) {
		toast.error(err.toString());
	}
});

export const updateVendorAsync = createAsyncThunk("/vendors/updateVendorAsync", async data => {
    try {
		axios.put(`/Vendor/${data.businessEntityId}`, data);
	} catch (err) {
		toast.error(err.toString());
	}
});

export const updateContactAsync = createAsyncThunk("/vendors/updateContactAsync", async data => {
    try {
		axios.put(`/Contact/${data.contactInfo.personId}/${data.vendorId}`, data.contactInfo);
	} catch (err) {
		toast.error(err.toString());
	}
});


export const updateEmailAsync = createAsyncThunk("/vendors/updateEmailAsync", async data => {
    try {
		axios.put(`/Email/${data.emailAddressId}/${data.businessEntityId}`, data);
	} catch (err) {
		toast.error(err.toString());
	}
});

export const updatePhoneAsync = createAsyncThunk("/vendors/updatePhoneAsync", async data => {
    try {
        console.log("Atemmpting phone update. Using data:");
        console.log(data);
		axios.put(`/Phone/${data.businessEntityId}`, data);
	} catch (err) {
		toast.error(err.toString());
	}
});

export const updateAddressAsync = createAsyncThunk("/vendors/updateAddressAsync", async data => {
    try {
		axios.put(`/Address/${data.addressId}`, data);
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
