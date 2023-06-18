import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const purchaseSlice = createSlice({
    name: "purchases",
    initialState: {
        purchases: [],
        displayPurchases: [],
        filter: ""
    },
    reducers: {
        setPurchasingFilter: (state,action) =>
		{
			return { ...state, filter: action.payload }
		},
        applyPurchasingFilter: (state) =>
		{
            console.log(`Applying filter of '${state.filter}' on ${state.purchases.length} purchase orders.`);
            // search purchases
			state.displayPurchases =  state.purchases
                .filter(purchase => state.filter === "" || // if there is no filter set, display everything
                    (purchase.productName.toLowerCase())
                        .includes(state.filter.toLowerCase())); // if there is a filter, search the product name
		},
    },
    extraReducers: builder => {
        builder
            .addCase(loadPurchasesAsync.fulfilled, (state, action) => {
                state.purchases = action.payload;
            })
            .addCase(loadPurchasesAsync.rejected, () => {
                toast.error("Error loading purchase orders.");
            })
    }
});

export const { setPurchasingFilter, applyPurchasingFilter } = purchaseSlice.actions;

export const loadPurchasesAsync = createAsyncThunk("/orders/loadPurchasesAsync", async () => {
	try {
		const resp = await axios.get("/Purchase");
		return resp.data;
	} catch (err) {
		toast.error(err.toString());
	}
});

export default purchaseSlice.reducer;