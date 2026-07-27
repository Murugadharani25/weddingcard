import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function AdminNavbar({ onMenuClick }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/admin-login')
  }

  return (
    <header className="h-16 border-b border-slate-700 bg-slate-900/60 backdrop-blur flex items-center justify-between px-4 md:px-6">
      <button className="md:hidden text-ivory-50 text-xl" onClick={onMenuClick} aria-label="Open menu">☰</button>
      <div className="hidden md:block" />
      <div className="flex items-center gap-3">
        <p className="text-sm text-ivory-50">{user?.name}</p>
        <button onClick={handleLogout} className="btn-admin-secondary text-sm py-1.5 px-3">Logout</button>
      </div>
    </header>
  )
}
