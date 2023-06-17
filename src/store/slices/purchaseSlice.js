import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const purchaseSlice = createSlice({
    name: "purchases",
    initialState: {
        purchases: []
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadPurchasesAsync.fulfilled, (state, action) => {
                state.purchases = action.payload;
            })
    }
});

export const loadPurchasesAsync = createAsyncThunk("/orders/loadPurchasesAsync", async () => {
	try {
		const resp = await axios.get("/Purchase");
		return resp.data;
	} catch (err) {
		toast.error(err.toString());
	}
});

export default purchaseSlice.reducer;