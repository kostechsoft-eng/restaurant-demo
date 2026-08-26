const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers },
  })
  const payload = await response.json().catch(() => ({ success: false, message: 'The server returned an invalid response.' }))
  if (!response.ok) {
    const error = new Error(payload.message || 'Request failed.')
    error.status = response.status
    error.fields = payload.errors || {}
    throw error
  }
  return payload
}
