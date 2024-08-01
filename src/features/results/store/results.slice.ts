import { IGetResponseData } from '@/features/tests/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IResult } from '../types'
import { getAllResults } from './results.action'

interface IInitialState {
	results: IResult[]
	isLoadingResults: boolean
	isPassed?: string
	test?: string
	language?: string
	area?: string
	totalPages: number
	resultsPage: 1
}

const initialState: IInitialState = {
	results: [],
	isLoadingResults: false,
	language: '',
	isPassed: '',
	test: '',
	area: '',
	totalPages: 1,
	resultsPage: 1,
}

export const resultSlice = createSlice({
	name: 'results',
	initialState,
	reducers: {
		setResultFilter: (
			state,
			{
				payload,
			}: PayloadAction<{
				language?: string
				isPassed?: string
				test?: string
				area?: string
			}>
		) => {
			state.area = payload.area === 'all' ? '' : payload.area
			state.language = payload.language === 'all' ? '' : payload.language
			state.isPassed = payload.isPassed === 'all' ? '' : payload.isPassed
			state.test = payload.test === 'all' ? '' : payload.test
		},
		setResultsPage: (state, action) => {
			state.resultsPage = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getAllResults.pending, state => {
				state.isLoadingResults = true
			})
			.addCase(
				getAllResults.fulfilled,
				(state, action: PayloadAction<IGetResponseData<IResult>>) => {
					state.isLoadingResults = false
					state.results = action.payload.data
					state.totalPages = action.payload.totalPages
				}
			)
			.addCase(getAllResults.rejected, state => {
				state.results = []
				state.isLoadingResults = false
			})
	},
})

export const { setResultFilter, setResultsPage } = resultSlice.actions
