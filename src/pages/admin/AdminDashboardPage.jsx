import { useEffect, useState } from 'react'
import { apiRequest } from '../../services/api'

export default function AdminDashboardPage() {
  const [state, setState] = useState({ loading: true, data: null, error: '' })
  useEffect(() => { apiRequest('/api/admin/dashboard').then(({ data }) => setState({ loading: false, data, error: '' })).catch((error) => setState({ loading: false, data: null, error: error.message })) }, [])
  if (state.loading) return <div className="admin-screen-state">Loading dashboard…</div>
  if (state.error) return <div className="admin-screen-state error">{state.error}</div>
  const { bookings, enquiries, recentBookings, recentEnquiries } = state.data
  return <><header className="admin-header"><div><span className="eyebrow">Overview</span><h1>Dashboard</h1></div></header><div className="stat-grid">{[['Total bookings', bookings.total], ['Pending bookings', bookings.pending], ['Confirmed bookings', bookings.confirmed], ['New enquiries', enquiries.new]].map(([label, value]) => <article key={label}><span>{value}</span><p>{label}</p></article>)}</div><div className="admin-recent-grid"><section><h2>Recent bookings</h2>{recentBookings.length ? recentBookings.map((item) => <div className="recent-row" key={item.id}><span><strong>{item.name}</strong><small>{item.dealType}</small></span><b className={`status ${item.status.toLowerCase()}`}>{item.status}</b></div>) : <p className="empty-state">No bookings found.</p>}</section><section><h2>Recent enquiries</h2>{recentEnquiries.length ? recentEnquiries.map((item) => <div className="recent-row" key={item.id}><span><strong>{item.name}</strong><small>{item.subject}</small></span><b className={`status ${item.status.toLowerCase()}`}>{item.status}</b></div>) : <p className="empty-state">No enquiries found.</p>}</section></div></>
}
