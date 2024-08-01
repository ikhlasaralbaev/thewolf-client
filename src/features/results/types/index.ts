export interface IResult {
	id: number
	correctAnswers: number
	correctAnswersInPercent: number
	totalQuestions: number
	isPassed: boolean
	candidate: Candidate
	test: Test
	createdAt: string
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
