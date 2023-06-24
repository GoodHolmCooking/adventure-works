import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
    name: "navigation",
    initialState: {
        expanded: false
    },
    reducers: {
        setExpanded: (state,action) =>
		{
            console.log("set expanded run");
			state.expanded = action.payload;
		}
    }
});

export const { setExpanded } = navigationSlice.actions;

export default navigationSlice.reducer;