import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";


const inventorySlice = createSlice({
    name:"inventory",
    initialState:{
        inventory: [],
        inventoryItem: {},
        displayInventory: [],
        filter: ""
    },

    reducers:
    {

        setInventoryFilter: (state,action) => {

			return { ...state, filter: action.payload }
		},

        setInventoryItem: (state,action) => {
            state.inventoryItem = action.payload;  
        },

        applyInventoryFilter: (state) => {

            console.log(`Applying filter:'${state.filter}' on ${state.inventory.length}`);

			state.displayInventory= state.inventory
                .filter(product => state.filter === "" || // if there is no filter set, display everything
                    (product.productName.toLowerCase())
                        .includes(state.filter.toLowerCase())); // if there is a filter, return matching inventory
		},
    },

    extraReducers: builder => {
        builder
            .addCase(loadInventoryAsync.fulfilled, (state, action) => {
                state.inventory = action.payload;
            })
            .addCase(loadInventoryAsync.rejected, () => {
                toast.error("Error loading inventory.");
            })
    }
});

export const { setInventoryFilter, applyInventoryFilter, setInventoryItem } = inventorySlice.actions;

export const loadInventoryAsync = createAsyncThunk("/inventory/loadInventoryAsync", async () => {
    
	try {
		const resp = await axios.get("/Inventory");
		return resp.data;
	} catch (err) {
		toast.error(err.toString());
	}
});


export default inventorySlice.reducer;
