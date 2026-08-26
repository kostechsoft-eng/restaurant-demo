import { FiBookOpen, FiHome, FiInbox, FiLogOut } from 'react-icons/fi'
import { Link, NavLink, Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import { apiRequest } from '../../services/api'

export default function AdminLayout() {
  const { admin } = useOutletContext()
  const navigate = useNavigate()
  const logout = async () => { try { await apiRequest('/api/admin/auth/logout', { method: 'POST' }) } finally { navigate('/admin/login', { replace: true }) } }
  return <div className="admin-shell"><aside><Link className="admin-brand" to="/admin">Bagh-One <small>Administration</small></Link><nav><NavLink to="/admin" end><FiHome /> Dashboard</NavLink><NavLink to="/admin/bookings"><FiBookOpen /> Bookings</NavLink><NavLink to="/admin/enquiries"><FiInbox /> Enquiries</NavLink></nav><div className="admin-account"><span>{admin.name}</span><small>{admin.email}</small><Link to="/">View website</Link><button type="button" onClick={logout}><FiLogOut /> Logout</button></div></aside><main className="admin-main"><Outlet context={{ admin }} /></main></div>
}
