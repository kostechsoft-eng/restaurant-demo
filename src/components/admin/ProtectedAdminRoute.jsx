import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { apiRequest } from '../../services/api'

export default function ProtectedAdminRoute() {
  const [state, setState] = useState({ loading: true, admin: null })
  const location = useLocation()
  useEffect(() => { apiRequest('/api/admin/auth/me').then(({ data }) => setState({ loading: false, admin: data })).catch(() => setState({ loading: false, admin: null })) }, [])
  if (state.loading) return <div className="admin-screen-state">Checking authentication…</div>
  if (!state.admin) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  return <Outlet context={{ admin: state.admin }} />
}
