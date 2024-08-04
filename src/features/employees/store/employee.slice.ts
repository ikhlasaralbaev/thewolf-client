import { createSlice } from '@reduxjs/toolkit'
import { IEmployee } from '../types'
import { getAllEmployees } from './employees.action'

interface IEmployeeIState {
	employees: IEmployee[]
	isEmployeesLoading: boolean
	totalPage: number
}

const initialState: IEmployeeIState = {
	employees: [],
	isEmployeesLoading: false,
	totalPage: 10,
}

export const employeeSlice = createSlice({
	name: 'employees',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getAllEmployees.pending, state => {
				state.isEmployeesLoading = true
			})
			.addCase(getAllEmployees.fulfilled, (state, action) => {
				state.employees = action.payload.data
				state.isEmployeesLoading = false
			})
			.addCase(getAllEmployees.rejected, state => {
				state.isEmployeesLoading = false
			})
	},
})
