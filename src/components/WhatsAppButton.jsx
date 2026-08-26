import { FaWhatsapp } from 'react-icons/fa'
import { contactInfo } from '../data/restaurantData'

export default function WhatsAppButton() {
  return <a className="whatsapp-float" href={contactInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Contact Bagh-One on WhatsApp"><FaWhatsapp /></a>
}
