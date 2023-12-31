import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        displayProducts: [],
        filter: ""
    },

    reducers: {

        setProductFilter: (state, action) =>
		{
			return { ...state, filter: action.payload }
		},

        applyProductFilter: (state) =>
		{
            console.log(`Applying filter: '${state.filter}' on ${state.products.length} products.`);

			state.displayProducts =  state.products
                .filter(product => state.filter === "" || // if there is no filter set, display everything
                    (product.name.toLowerCase())
                        .includes(state.filter.toLowerCase())); // if there is a filter, search the product name
		},
    },

    extraReducers: builder => {
        builder
            .addCase(loadProductsAsync.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(loadProductsAsync.rejected, () => {
                toast.error("Error loading products.");
            })
    }
});

export const { setProductFilter, applyProductFilter } = productSlice.actions;

export const loadProductsAsync = createAsyncThunk("/products/loadProductsAsync", async () => {
	try {
		const resp = await axios.get("/Product");
		return resp.data;
	} catch (err) {
		toast.error(err.toString());
	}
});

export const updateProductAsync = createAsyncThunk("/products/updateProductAsync", async data => {
    try {
		axios.put(`/Product/${data.productUpdate.productId}`, data.productUpdate)
            .then(resp => {
                console.log(`Status: ${resp.status}`);
                data.callbacks.setProduct(data.productUpdate);
            });
	} catch (err) {
		toast.error(err.toString());
	}
});

export default productSlice.reducer;