import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICandidate, ICompleteStepResponse, ITest } from '../types'
import {
	completeStepAction,
	createCandidate,
	createResult,
} from './candidate.actions'

export interface IAnswerType {
	question_id: number | string
	answers: (number | string)[]
}

interface IInitialState {
	candidate: ICandidate | null
	completedStep: number | null
	allSteps: number | null
	isCreatingCandidate: boolean
	test: ITest | null
	currentStep: number | null
	answers: IAnswerType[]
	stepResults: ICompleteStepResponse[]
	isCompletingStep: boolean
}

const initialState: IInitialState = {
	candidate: null,
	completedStep: null,
	allSteps: null,
	isCreatingCandidate: false,
	test: null,
	currentStep: null,
	answers: [],
	stepResults: [],
	isCompletingStep: false,
}

export const candidateSlice = createSlice({
	name: 'candidate',
	initialState,
	reducers: {
		onAnswer: (state, action: PayloadAction<IAnswerType[]>) => {
			state.answers = action.payload
		},
		backToRegister: state => {
			state.candidate = null
			state.test = null
			state.currentStep = null
			state.answers = []
		},
		setStep: (state, action) => {
			state.currentStep = action.payload
			state.answers = []
		},
	},
	extraReducers: builder => {
		builder
			.addCase(createCandidate.pending, state => {
				state.isCreatingCandidate = true
			})
			.addCase(createCandidate.fulfilled, (state, action) => {
				state.isCreatingCandidate = false
				state.candidate = action.payload.candidate
				state.test = action.payload.test
				state.completedStep = null
				state.currentStep = 0
			})
			.addCase(createCandidate.rejected, state => {
				state.isCreatingCandidate = false
			})
			.addCase(completeStepAction.pending, state => {
				state.isCompletingStep = true
			})
			.addCase(completeStepAction.fulfilled, (state, action) => {
				state.isCompletingStep = false
				state.stepResults = [...state.stepResults, action.payload]
			})
			.addCase(completeStepAction.rejected, state => {
				state.isCompletingStep = false
			})
			.addCase(createResult.pending, state => {
				state.isCompletingStep = true
			})
			.addCase(createResult.fulfilled, state => {
				state.isCompletingStep = false
			})
			.addCase(createResult.rejected, state => {
				state.isCompletingStep = false
			})
	},
})

export const { onAnswer, backToRegister, setStep } = candidateSlice.actions
