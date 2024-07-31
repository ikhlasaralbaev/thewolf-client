export interface ICandidate {
	fullName: string
	phone: string
	birthdate: string
	area: string
	district: string
	lastJob: string
	experience: number
	test: number
	id: number
}

export interface ICandidateCreateResponse {
	candidate: ICandidate
	test: ITest
}

export interface ITest {
	id: number
	title: string
	language: string
	steps: IStep[]
}

export interface IStep {
	id: number
	title: string
	minPercent: number
	questions: any[]
}

export interface ICompleteStepRequest {
	step_id: number
	candidate_id: number
	answers: Answer[]
}

export interface Answer {
	question_id: number
	answers: number[]
}

export interface ICompleteStepResponse {
	isPassed: boolean
	correctAnswers: number
	totalQuestions: number
	resultInPercent: null
	minPercentOfStep: number
}

export interface IResult {
	correctAnswers: number
	correctAnswersInPercent: number
	candidate: Candidate
	test: Test
	totalQuestions: number
	id: number
}

export interface Candidate {
	id: number
	fullName: string
	phone: string
	birthdate: Date
	area: string
	district: string
	lastJob: string
	experience: number
}

export interface Test {
	id: number
	title: string
	language: string
}

export interface ICreateResult {
	correctAnswers: number
	correctAnswersInPercent: number
	candidate: number
	test: number
	totalQuestions: number
}
