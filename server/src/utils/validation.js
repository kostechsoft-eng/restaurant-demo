const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^\+?[0-9\s()-]{8,25}$/

export const cleanString = (value) => typeof value === 'string' ? value.trim() : ''
export const optionalString = (value) => cleanString(value) || null
export const validEmail = (value) => !value || emailPattern.test(value)
export const validPhone = (value) => phonePattern.test(value)
export const validDateInput = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value || '')
export const todayString = () => new Date().toISOString().slice(0, 10)
export const dateOnlyUtc = (value) => new Date(`${value}T12:00:00.000Z`)
export const idFromParam = (value) => {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

export function validateBooking(body) {
  const data = {
    name: cleanString(body.name), email: optionalString(body.email), phone: cleanString(body.phone),
    dealType: cleanString(body.dealType || body.deal), bookingDate: cleanString(body.bookingDate || body.date),
    guests: body.guests === '' || body.guests == null ? null : Number(body.guests), message: optionalString(body.message),
  }
  const errors = {}
  if (!data.name || data.name.length > 120) errors.name = 'Name is required and must be 120 characters or fewer.'
  if (!validPhone(data.phone)) errors.phone = 'A valid phone number is required.'
  if (!['Restaurant', 'Banquet', 'Party Plot'].includes(data.dealType)) errors.dealType = 'Select a valid deal type.'
  if (!validDateInput(data.bookingDate) || data.bookingDate < todayString()) errors.bookingDate = 'Select today or a future booking date.'
  if (data.email && (!validEmail(data.email) || data.email.length > 254)) errors.email = 'Enter a valid email address.'
  if (data.guests !== null && (!Number.isInteger(data.guests) || data.guests < 1 || data.guests > 10000)) errors.guests = 'Guests must be a positive whole number.'
  if (data.message && data.message.length > 2000) errors.message = 'Message must be 2000 characters or fewer.'
  return { data, errors }
}

export function validateEnquiry(body) {
  const data = { name: cleanString(body.name), phone: cleanString(body.phone), email: optionalString(body.email), subject: cleanString(body.subject), message: cleanString(body.message) }
  const errors = {}
  if (!data.name || data.name.length > 120) errors.name = 'Name is required and must be 120 characters or fewer.'
  if (!validPhone(data.phone)) errors.phone = 'A valid phone number is required.'
  if (data.email && (!validEmail(data.email) || data.email.length > 254)) errors.email = 'Enter a valid email address.'
  if (!data.subject || data.subject.length > 180) errors.subject = 'Subject is required and must be 180 characters or fewer.'
  if (!data.message || data.message.length > 3000) errors.message = 'Message is required and must be 3000 characters or fewer.'
  return { data, errors }
}
