import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/sidebar'

type Props = {}

const AdminLayout: FC<Props> = () => {
	return (
		<div>
			<Sidebar />
			<div style={{ width: `calc(100% - 100px`, minHeight: '100vh' }}>
				<Outlet />
			</div>
		</div>
	)
}
export default AdminLayout
