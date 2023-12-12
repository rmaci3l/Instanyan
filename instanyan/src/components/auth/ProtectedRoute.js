import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { NotFound } from '../../components'

const ProtectedRoute = () => {
  const { userToken } = useSelector((state) => state.auth)

  // show unauthorized screen if no user is found in redux store
  if (!userToken) {
    return (
      <div>
        <NotFound />
      </div>
    )
  }

  // returns child route elements
  return <Outlet />
}
export default ProtectedRoute