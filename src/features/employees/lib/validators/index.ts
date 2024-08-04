import * as yup from 'yup'

export const createEmployeeValidator = yup.object({
	email: yup.string().required().email(),
	password: yup.string().required().min(6),
})

export const updateEmployeeValidator = yup.object({
	email: yup.string().required().email(),
	password: yup.string().optional(),
})
