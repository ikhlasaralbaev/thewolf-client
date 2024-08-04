import authSlice from '@/features/auth/store/auth.slice'
import { candidateSlice } from '@/features/candidate/store/candidate.slice'
import { employeeSlice } from '@/features/employees/store/employee.slice'
import { resultSlice } from '@/features/results/store/results.slice'
import testsSlice from '@/features/tests/store/tests.slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		auth: authSlice,
		tests: testsSlice,
		candidate: candidateSlice.reducer,
		results: resultSlice.reducer,
		employees: employeeSlice.reducer,
	},
	devTools: false,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
