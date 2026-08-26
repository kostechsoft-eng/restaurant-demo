import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { apiRequest } from '../../services/api'

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate(); const location = useLocation()
  useEffect(() => { apiRequest('/api/admin/auth/me').then(() => navigate('/admin', { replace: true })).catch(() => {}) }, [navigate])
  const submit = async (event) => {
    event.preventDefault(); setLoading(true); setError('')
    try { await apiRequest('/api/admin/auth/login', { method: 'POST', body: JSON.stringify(form) }); navigate(location.state?.from || '/admin', { replace: true }) }
    catch (requestError) { setError(requestError.message) }
    finally { setLoading(false) }
  }
  return <main className="admin-login"><form onSubmit={submit}><span className="eyebrow">Secure administration</span><h1>Welcome back.</h1><p>Sign in to manage restaurant bookings and enquiries.</p><label>Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="username" required /></label><label>Password<input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} autoComplete="current-password" required /></label>{error && <p className="api-error" role="alert">{error}</p>}<button className="button" type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Login'}</button></form></main>
}
