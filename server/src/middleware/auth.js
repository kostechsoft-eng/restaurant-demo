import jwt from 'jsonwebtoken'
import { prisma } from '../config/prisma.js'

export async function requireAdmin(req, res, next) {
  try {
    const token = req.cookies.bagh_admin_token
    if (!token) return res.status(401).json({ success: false, message: 'Authentication required.' })
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const admin = await prisma.admin.findUnique({ where: { id: Number(payload.sub) }, select: { id: true, email: true, name: true } })
    if (!admin) return res.status(401).json({ success: false, message: 'Authentication is no longer valid.' })
    req.admin = admin
    next()
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired authentication.' })
  }
}
