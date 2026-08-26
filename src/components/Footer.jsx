import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { FiMapPin, FiPhone } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { contactInfo } from '../data/restaurantData'

const footerLinks = [['Home', '/'], ['About Us', '/about'], ['Menu', '/menu'], ['Gallery', '/gallery'], ['Contact', '/contact']]

export default function Footer() {
  return <footer id="contact"><div className="container footer-grid"><div><img className="footer-logo" src="https://www.baghonerestaurant.com/images/logo.png" alt="Bagh-One Restaurant" /><h3>Why Bagh-One?</h3><p>Bagh-One is a mode of care and hospitality. We feed the minds, bodies and souls of our guests through an attitude of serving delicious food.</p><p>We are committed to bringing together the diverse food cultures of regions around the world.</p></div><div><h3>Quick links</h3><nav>{footerLinks.map(([name, path]) => <Link key={path} to={path}>{name}</Link>)}</nav></div><div><h3>Get latest news</h3><div className="socials"><a href={contactInfo.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a><a href={contactInfo.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a><a href={contactInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a></div></div><div><h3>Get in touch</h3><address><FiMapPin /><span>Opp. Swaminarayan School,<br />Hathijan, Mahemdabad Road,<br />Ahmedabad, Gujarat 382445</span></address><div className="phone"><FiPhone /><span><a href={contactInfo.phonePrimaryHref}>{contactInfo.phonePrimary}</a><a href={contactInfo.phoneSecondaryHref}>{contactInfo.phoneSecondary}</a></span></div></div></div><div className="footer-bottom"><div className="container"><span>2019 © Bagh-One Restaurant. All Rights Reserved.</span><span>Developed by Aintiqaa Technologies</span></div></div></footer>
}
