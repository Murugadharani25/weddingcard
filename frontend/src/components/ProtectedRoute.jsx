import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute({ children, role, redirectTo = '/login' }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-ivory-50 text-ink-500">
        Loading…
      </div>
    )
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />
  }

  if (role && user.role !== role) {
    return (
      <div className="h-screen flex items-center justify-center bg-ivory-50">
        <div className="text-center">
          <p className="font-display text-xl mb-2">Not authorized</p>
          <p className="text-ink-500 text-sm">This area isn't available for your account type.</p>
        </div>
      </div>
    )
  }

  return children
}
