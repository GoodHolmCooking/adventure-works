import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
    name: "navigation",
    initialState: {
        expanded: false
    },
    reducers: {
        setExpanded: (state,action) =>
		{
			state.expanded = action.payload;
		}
    }
});

export const { setExpanded } = navigationSlice.actions;

export default navigationSlice.reducer;