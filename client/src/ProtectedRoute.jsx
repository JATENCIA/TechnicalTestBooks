import { useAuth } from './context/AuthContex'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { isAuthenticating, loading } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!loading && !isAuthenticating) return <Navigate to='/login' replace />

  return <Outlet />
}

export default ProtectedRoute
