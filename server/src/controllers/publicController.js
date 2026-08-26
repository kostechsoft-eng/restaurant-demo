import { prisma } from '../config/prisma.js'
import { dateOnlyUtc, validateBooking, validateEnquiry } from '../utils/validation.js'

export async function createBooking(req, res) {
  const { data, errors } = validateBooking(req.body)
  if (Object.keys(errors).length) return res.status(400).json({ success: false, message: 'Please correct the booking details.', errors })
  const booking = await prisma.booking.create({ data: { ...data, bookingDate: dateOnlyUtc(data.bookingDate) } })
  res.status(201).json({ success: true, message: 'Booking enquiry saved successfully.', data: booking })
}

export async function createEnquiry(req, res) {
  const { data, errors } = validateEnquiry(req.body)
  if (Object.keys(errors).length) return res.status(400).json({ success: false, message: 'Please correct the enquiry details.', errors })
  const enquiry = await prisma.contactEnquiry.create({ data })
  res.status(201).json({ success: true, message: 'Contact enquiry saved successfully.', data: enquiry })
}
