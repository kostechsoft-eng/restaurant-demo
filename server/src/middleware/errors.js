export function notFound(req, res) {
  res.status(404).json({ success: false, message: 'API route not found.' })
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error)
  if (process.env.NODE_ENV !== 'production') console.error(error)
  if (error.type === 'entity.parse.failed') return res.status(400).json({ success: false, message: 'Invalid JSON request body.' })
  const known = error.status && error.status >= 400 && error.status < 500
  res.status(known ? error.status : 500).json({ success: false, message: known ? error.message : 'An unexpected server error occurred.' })
}
