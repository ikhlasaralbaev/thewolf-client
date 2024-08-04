import * as yup from 'yup'

export const candidateCreateValidator = yup.object({
	fullName: yup.string().required(),
	phone: yup.string().required(),
	birthdate: yup.string().required(),
	area: yup.string().required(),
	district: yup.string().required(),
	lastJob: yup.string().required(),
	experience: yup.string().required(),
	direction: yup.string().required(),
	languages: yup.array().min(1).required(),
	resumeUrl: yup.string().required(),
})
