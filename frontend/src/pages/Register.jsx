import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Register() {
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { registerCustomer } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await registerCustomer(form)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Registration failed')
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
          <p className="text-ink-500 text-sm mt-3">Create your account to start shopping.</p>
        </div>

        <form onSubmit={handleSubmit} className="card-storefront p-6 space-y-4">
          <div>
            <label className="label block mb-1.5">Full Name</label>
            <input className="input w-full" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label className="label block mb-1.5">Username</label>
            <input className="input w-full" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          </div>
          <div>
            <label className="label block mb-1.5">Email</label>
            <input type="email" className="input w-full" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label className="label block mb-1.5">Password</label>
            <input type="password" className="input w-full" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>

          {error && (
            <p className="text-wine-600 text-sm bg-wine-50 border border-wine-500/30 rounded-md px-3 py-2">{error}</p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Creating account…' : 'Create account'}
          </button>

          <p className="text-sm text-ink-500 text-center">
            Already have an account? <Link to="/login" className="text-wine-500 font-medium">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
