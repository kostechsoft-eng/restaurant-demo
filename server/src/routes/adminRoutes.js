import { Router } from 'express'
import { login, logout, me } from '../controllers/authController.js'
import { dashboard, deleteBooking, deleteEnquiry, getBooking, getEnquiry, listBookings, listEnquiries, updateBookingStatus, updateEnquiryStatus } from '../controllers/adminController.js'
import { requireAdmin } from '../middleware/auth.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = Router()
router.post('/auth/login', asyncHandler(login))
router.get('/auth/me', requireAdmin, me)
router.post('/auth/logout', requireAdmin, logout)
router.use(requireAdmin)
router.get('/dashboard', asyncHandler(dashboard))
router.get('/bookings', asyncHandler(listBookings))
router.get('/bookings/:id', asyncHandler(getBooking))
router.patch('/bookings/:id/status', asyncHandler(updateBookingStatus))
router.delete('/bookings/:id', asyncHandler(deleteBooking))
router.get('/enquiries', asyncHandler(listEnquiries))
router.get('/enquiries/:id', asyncHandler(getEnquiry))
router.patch('/enquiries/:id/status', asyncHandler(updateEnquiryStatus))
router.delete('/enquiries/:id', asyncHandler(deleteEnquiry))
export default router
