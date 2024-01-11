import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Unauthorized } from '../../components'

const ProtectedRoute = () => {
  const { userToken } = useSelector((state) => state.auth)

  // show unauthorized screen if no user is found in redux store
  if (!userToken || userToken === "undefined") {
    return <Unauthorized />
  }
  
  // returns child route elements
  return <Outlet />
}
export default ProtectedRoute