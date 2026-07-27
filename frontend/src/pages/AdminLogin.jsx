import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginAdmin } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await loginAdmin(username, password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-shell min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-semibold text-2xl text-ivory-50">WeddingKart</p>
          <p className="text-slate-400 text-sm mt-1">Admin Console</p>
        </div>

        <form onSubmit={handleSubmit} className="card-admin p-6 space-y-4">
          <div>
            <label className="label-admin block mb-1.5">Username</label>
            <input className="input-admin w-full" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label className="label-admin block mb-1.5">Password</label>
            <input type="password" className="input-admin w-full" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {error && (
            <p className="text-sm bg-red-500/10 border border-red-500/30 text-red-300 rounded-md px-3 py-2">{error}</p>
          )}

          <button type="submit" disabled={loading} className="btn-admin-primary w-full">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <div className="text-xs text-slate-400 border-t border-slate-700 pt-3">
            <p>Demo login: admin / admin123</p>
          </div>
        </form>

        <p className="text-center text-xs text-slate-400 mt-4">
          <Link to="/login" className="hover:text-teal-400">← Back to customer login</Link>
        </p>
      </div>
    </div>
  )
}
