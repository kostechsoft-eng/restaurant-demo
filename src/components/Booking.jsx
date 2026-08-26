import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiCalendar, FiCheckCircle } from 'react-icons/fi'
import { contactInfo } from '../data/restaurantData'
import { apiRequest } from '../services/api'

const initialForm = { deal: '', name: '', email: '', phone: '', date: '', guests: '', message: '' }

export default function Booking() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const update = ({ target }) => {
    setForm({ ...form, [target.name]: target.value })
    setErrors({ ...errors, [target.name]: '' })
    setSubmitted(null)
    setApiError('')
  }
  const submit = async (event) => {
    event.preventDefault()
    const next = {}
    if (!form.deal) next.deal = 'Please select a deal type.'
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.phone.trim()) next.phone = 'Please enter your phone number.'
    else if (!/^\+?[0-9\s-]{8,15}$/.test(form.phone.trim())) next.phone = 'Please enter a valid phone number.'
    if (!form.date) next.date = 'Please choose a date.'
    if (form.guests && Number(form.guests) < 1) next.guests = 'Guests must be at least 1.'
    setErrors(next)
    if (Object.keys(next).length) return
    setLoading(true); setApiError('')
    try {
      await apiRequest('/api/bookings', { method: 'POST', body: JSON.stringify({ ...form, dealType: form.deal, bookingDate: form.date }) })
      setSubmitted(form)
      setForm(initialForm)
    } catch (error) {
      setErrors(error.fields || {})
      setApiError(error.message)
    } finally { setLoading(false) }
  }
  const today = new Date().toISOString().split('T')[0]
  const field = (name, label, type = 'text') => {
    const error = errors[name] || (name === 'date' ? errors.bookingDate : '')
    return <label>{label}{error && <span className="field-error">{error}</span>}<input type={type} name={name} value={form[name]} onChange={update} min={type === 'date' ? today : type === 'number' ? '1' : undefined} aria-invalid={Boolean(error)} /></label>
  }
  const whatsappUrl = submitted ? `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(`Hello Bagh-One Restaurant, I would like to confirm a booking enquiry.\nName: ${submitted.name}\nDeal type: ${submitted.deal}\nDate: ${submitted.date}\nGuests: ${submitted.guests || 'Not specified'}\nPhone: ${submitted.phone}`)}` : ''
  return <section className="section booking" id="booking"><div className="container booking-grid"><div className="booking-copy"><span className="eyebrow light">Online booking</span><h2>Let’s plan something<br /><em>unforgettable.</em></h2><p>Send us an enquiry for your next visit or celebration. Our team will contact you to confirm availability.</p><div className="booking-detail"><FiCalendar /><span><strong>Plan ahead</strong>Share your preferred date and group size.</span></div></div><form onSubmit={submit} noValidate><div className="form-grid"><label>Deal Type{(errors.deal || errors.dealType) && <span className="field-error">{errors.deal || errors.dealType}</span>}<select name="deal" value={form.deal} onChange={update} aria-invalid={Boolean(errors.deal || errors.dealType)}><option value="">Select Deal</option><option>Restaurant</option><option>Banquet</option><option>Party Plot</option></select></label>{field('name', 'Name')}{field('email', 'Email', 'email')}{field('phone', 'Phone', 'tel')}{field('date', 'Date', 'date')}{field('guests', 'Number of Guests', 'number')}<label className="full">Message<textarea name="message" value={form.message} onChange={update} rows="4" /></label></div><button className="button" type="submit" disabled={loading}>{loading ? 'Sending…' : 'Send booking enquiry'}</button>{apiError && <p className="api-error" role="alert">{apiError}</p>}{submitted && <div className="booking-success" role="status"><p className="success-message"><FiCheckCircle /> Thank you! Your booking enquiry has been saved.</p><a className="whatsapp-continue" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><FaWhatsapp /> Continue on WhatsApp</a></div>}</form></div></section>
}
