import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const employeeSlice = createSlice({
    name:"employees",
    initialState:{
        employees:[],
		displayEmployees:[],
		filter:"",
    },
    reducers:
    {
        storeEmployees: (state,action) => {
            state.employees = action.payload;
			state.displayEmployees = action.payload;
        },
		setFilter: (state,action) =>
		{
			return { ...state, filter: action.payload }
		},
		applyFilter: (state) =>
		{
			state.displayEmployees =  state.employees.filter(elt => state.filter === "" || (elt.firstName.toLowerCase() + " " + elt.lastName.toLowerCase()).includes(state.filter.toLowerCase()) || elt.shift.toLowerCase().includes(state.filter.toLowerCase()) || elt.department.toLowerCase().includes(state.filter.toLowerCase()) || elt.employeeId === +state.filter || elt.start === state.filter || elt.title === state.filter)
		},
		updateEmployee: (state,action) =>
		{		
			const updateIndex = state.employees.findIndex(member => member.id === +action.payload.id)
			if(updateIndex !== -1)
			{
				const newState = {...state}
				const newEmp = [...state.employees]
				newEmp[updateIndex] = action.payload
				newState.employees = newEmp;
				return newState;
			}
		},
    },
    extraReducers: builder => {
		builder
			.addCase(loadEmployeesAsync.fulfilled, (state, action) => {
				state.employees = action.payload;
			})
			.addCase(loadEmployeesAsync.rejected, () => {
				toast.error("Sorry, there was a server error, try again");
			})
			// .addCase(addEmployeeAsync.fulfilled, (state, action) => {
			// 	state.employees = state.employees.concat(action.payload);
			// })
			.addCase(deleteEmployeeAsync.fulfilled, (state, action) => {
				const newemployees = state.employees.filter(employee => employee.employeeId !== action.payload.employeeId);
				state.employees = newemployees;
			});
	},

});

export const {updateEmployee, setFilter, applyFilter} = employeeSlice.actions;

export const loadEmployeesAsync = createAsyncThunk("/employees/loadEmployeesAsync", async () => {
	try {
		const resp = await axios.get("/Employee");
		return resp.data;
	} catch (err) {
		toast.error(err.toString());
	}
});

// export const addEmployeeAsync = createAsyncThunk("/employees/addEmployeeAsync", async newEmployee => {
// 	try {
// 		const resp = await axios.post("https://api.bootcampcentral.com/api/Employee", newEmployee);
// 		return resp.data;
// 	} catch (err) {
// 		toast.error(err.toString());
// 	}
// });

export const deleteEmployeeAsync = createAsyncThunk("/employees/deleteEmployeeAsync", async employee => {

	//  	 	// if(resp2)
    //           // {
                   return employee;
});

export default employeeSlice.reducer;
