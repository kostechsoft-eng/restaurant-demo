import { prisma } from '../config/prisma.js'
import { idFromParam } from '../utils/validation.js'

const bookingStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']
const enquiryStatuses = ['NEW', 'READ', 'REPLIED', 'CLOSED']
const getId = (req, res) => {
  const id = idFromParam(req.params.id)
  if (!id) res.status(400).json({ success: false, message: 'Invalid record identifier.' })
  return id
}

export async function listBookings(req, res) { res.json({ success: true, data: await prisma.booking.findMany({ orderBy: { createdAt: 'desc' } }) }) }
export async function getBooking(req, res) {
  const id = getId(req, res); if (!id) return
  const record = await prisma.booking.findUnique({ where: { id } })
  if (!record) return res.status(404).json({ success: false, message: 'Booking not found.' })
  res.json({ success: true, data: record })
}
export async function updateBookingStatus(req, res) {
  const id = getId(req, res); if (!id) return
  const status = String(req.body.status || '').toUpperCase()
  if (!bookingStatuses.includes(status)) return res.status(400).json({ success: false, message: 'Invalid booking status.' })
  const exists = await prisma.booking.findUnique({ where: { id }, select: { id: true } })
  if (!exists) return res.status(404).json({ success: false, message: 'Booking not found.' })
  res.json({ success: true, data: await prisma.booking.update({ where: { id }, data: { status } }) })
}
export async function deleteBooking(req, res) {
  const id = getId(req, res); if (!id) return
  const result = await prisma.booking.deleteMany({ where: { id } })
  if (!result.count) return res.status(404).json({ success: false, message: 'Booking not found.' })
  res.json({ success: true, message: 'Booking deleted.' })
}
export async function listEnquiries(req, res) { res.json({ success: true, data: await prisma.contactEnquiry.findMany({ orderBy: { createdAt: 'desc' } }) }) }
export async function getEnquiry(req, res) {
  const id = getId(req, res); if (!id) return
  const record = await prisma.contactEnquiry.findUnique({ where: { id } })
  if (!record) return res.status(404).json({ success: false, message: 'Enquiry not found.' })
  res.json({ success: true, data: record })
}
export async function updateEnquiryStatus(req, res) {
  const id = getId(req, res); if (!id) return
  const status = String(req.body.status || '').toUpperCase()
  if (!enquiryStatuses.includes(status)) return res.status(400).json({ success: false, message: 'Invalid enquiry status.' })
  const exists = await prisma.contactEnquiry.findUnique({ where: { id }, select: { id: true } })
  if (!exists) return res.status(404).json({ success: false, message: 'Enquiry not found.' })
  res.json({ success: true, data: await prisma.contactEnquiry.update({ where: { id }, data: { status } }) })
}
export async function deleteEnquiry(req, res) {
  const id = getId(req, res); if (!id) return
  const result = await prisma.contactEnquiry.deleteMany({ where: { id } })
  if (!result.count) return res.status(404).json({ success: false, message: 'Enquiry not found.' })
  res.json({ success: true, message: 'Enquiry deleted.' })
}
export async function dashboard(req, res) {
  const [bookings, enquiries, recentBookings, recentEnquiries] = await prisma.$transaction([
    prisma.booking.groupBy({ by: ['status'], _count: true }), prisma.contactEnquiry.groupBy({ by: ['status'], _count: true }),
    prisma.booking.findMany({ take: 5, orderBy: { createdAt: 'desc' } }), prisma.contactEnquiry.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
  ])
  const bookingCounts = Object.fromEntries(bookings.map((item) => [item.status.toLowerCase(), item._count]))
  const enquiryCounts = Object.fromEntries(enquiries.map((item) => [item.status.toLowerCase(), item._count]))
  res.json({ success: true, data: { bookings: { total: bookings.reduce((sum, item) => sum + item._count, 0), pending: bookingCounts.pending || 0, confirmed: bookingCounts.confirmed || 0, cancelled: bookingCounts.cancelled || 0, completed: bookingCounts.completed || 0 }, enquiries: { total: enquiries.reduce((sum, item) => sum + item._count, 0), new: enquiryCounts.new || 0 }, recentBookings, recentEnquiries } })
}
