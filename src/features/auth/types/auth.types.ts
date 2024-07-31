export interface ILoginReqType {
	email: string
	password: string
}

export interface ILoginResType {
	message: string
	user: IUser
	accessToken: string
	refreshToken: string
}

export interface IUser {
	id: number
	email: string
	password: string
	role: string
}
