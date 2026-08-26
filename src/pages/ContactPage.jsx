import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiCheckCircle, FiMapPin, FiPhone } from 'react-icons/fi'
import PageHero from '../components/PageHero'
import { contactInfo } from '../data/restaurantData'
import { apiRequest } from '../services/api'

const initial = { name: '', phone: '', email: '', subject: '', message: '' }

export default function ContactPage() {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const update = ({ target }) => { setForm({ ...form, [target.name]: target.value }); setSent(false); setApiError('') }
  const submit = async (event) => {
    event.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.phone.trim()) next.phone = 'Phone is required.'
    if (!form.subject.trim()) next.subject = 'Subject is required.'
    if (!form.message.trim()) next.message = 'Message is required.'
    setErrors(next)
    if (Object.keys(next).length) return
    setLoading(true); setApiError('')
    try {
      await apiRequest('/api/contact', { method: 'POST', body: JSON.stringify(form) })
      setForm(initial); setSent(true)
    } catch (error) {
      setErrors(error.fields || {})
      setApiError(error.message)
    } finally { setLoading(false) }
  }
  const input = (name, label, type = 'text') => <label>{label}{errors[name] && <span className="field-error">{errors[name]}</span>}<input name={name} type={type} value={form[name]} onChange={update} aria-invalid={Boolean(errors[name])} /></label>
  return <><PageHero title="Contact Us" subtitle="Plan a meal, celebration or event with our hospitality team." backgroundImage="https://www.baghonerestaurant.com/images/gallery/gallery19.webp" /><section className="section contact-page"><div className="container"><div className="contact-cards"><article><FiMapPin /><h3>Visit us</h3><p>{contactInfo.address}</p><a href={contactInfo.mapUrl} target="_blank" rel="noopener noreferrer">Get directions</a></article><article><FiPhone /><h3>Call us</h3><a href={contactInfo.phonePrimaryHref}>{contactInfo.phonePrimary}</a><a href={contactInfo.phoneSecondaryHref}>{contactInfo.phoneSecondary}</a></article><article><FaWhatsapp /><h3>WhatsApp</h3><p>Ask about a table or event at your convenience.</p><a href={contactInfo.whatsappUrl} target="_blank" rel="noopener noreferrer">Start conversation</a></article></div><div className="contact-grid"><form onSubmit={submit} noValidate><span className="eyebrow">Send an enquiry</span><h2>We’d love to<br /><em>hear from you.</em></h2><div className="form-grid">{input('name', 'Name')}{input('phone', 'Phone', 'tel')}{input('email', 'Email', 'email')}{input('subject', 'Subject')}<label className="full">Message{errors.message && <span className="field-error">{errors.message}</span>}<textarea name="message" value={form.message} onChange={update} rows="5" aria-invalid={Boolean(errors.message)} /></label></div><button className="button" type="submit" disabled={loading}>{loading ? 'Sending…' : 'Send enquiry'}</button>{apiError && <p className="api-error" role="alert">{apiError}</p>}{sent && <p className="contact-success" role="status"><FiCheckCircle /> Thank you! Your enquiry has been saved.</p>}</form><div className="map-wrap"><iframe title="Map showing Bagh-One Restaurant" src={contactInfo.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a href={contactInfo.mapUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a></div></div></div></section></>
}
