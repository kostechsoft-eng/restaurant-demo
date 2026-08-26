import { Router } from 'express'
import { createBooking, createEnquiry } from '../controllers/publicController.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = Router()
router.post('/bookings', asyncHandler(createBooking))
router.post('/contact', asyncHandler(createEnquiry))
export default router
