import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginCustomer } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await loginCustomer(username, password)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-display text-3xl text-wine-500">Wedding<span className="text-gold-500">Kart</span></p>
          <div className="gold-rule mx-auto mt-2" />
          <p className="text-ink-500 text-sm mt-3">Welcome back — sign in to continue shopping.</p>
        </div>

        <form onSubmit={handleSubmit} className="card-storefront p-6 space-y-4">
          <div>
            <label className="label block mb-1.5">Username</label>
            <input className="input w-full" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label className="label block mb-1.5">Password</label>
            <input type="password" className="input w-full" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {error && (
            <p className="text-wine-600 text-sm bg-wine-50 border border-wine-500/30 rounded-md px-3 py-2">{error}</p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <p className="text-sm text-ink-500 text-center">
            New here? <Link to="/register" className="text-wine-500 font-medium">Create an account</Link>
          </p>

          <div className="text-xs text-ink-500 border-t border-ink-900/10 pt-3">
            <p>Demo login: priya / priya123</p>
          </div>
        </form>

        <p className="text-center text-xs text-ink-500 mt-4">
          <Link to="/admin-login" className="hover:text-wine-500">Admin login →</Link>
        </p>
      </div>
    </div>
  )
}
