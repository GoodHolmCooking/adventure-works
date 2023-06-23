import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const customerSlice = createSlice({
    name: "customers",
    initialState: {
        customers: [],
        displayCustomers: [],
        filter: ""
    },
    reducers: {
        setSalesFilter: (state,action) =>
		{
			return { ...state, filter: action.payload }
		},
        applySalesFilter: (state) =>
		{
            console.log(`Applying filter of '${state.filter}' on ${state.customers.length} customers.`);
            // search customers
			state.displayCustomers =  state.customers
                .filter(customer => state.filter === "" || // if there is no filter set, display everything
                    (customer.firstName + " " + customer.lastName.toLowerCase())
                        .includes(state.filter.toLowerCase())); // if there is a filter, search the customer
		},
    },
    extraReducers: builder => {
        builder
            .addCase(loadSalesAsync.fulfilled, (state, action) => {
                state.customers = action.payload;
            })
            .addCase(loadSalesAsync.rejected, () => {
                toast.error("Error loading customers.");
            })
    }
});

export const { setSalesFilter, applySalesFilter } = customerSlice.actions;

export const loadSalesAsync = createAsyncThunk("/orders/loadSalesAsync", async () => {
	try {
		const resp = await axios.get("/Order/customer");
		return resp.data;
	} catch (err) {
		toast.error(err.toString());
	}
});

export default customerSlice.reducer;