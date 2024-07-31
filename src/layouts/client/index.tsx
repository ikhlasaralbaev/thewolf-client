import { FC, ReactNode } from 'react'

const ClientLayout: FC<{ children: ReactNode }> = ({ children }) => {
	return <div>{children}</div>
}

export default ClientLayout

export const withClientLayout = (Component: FC) => {
	const L = (props: any) => {
		return (
			<ClientLayout>
				<Component {...props} />
			</ClientLayout>
		)
	}

	return L
}
