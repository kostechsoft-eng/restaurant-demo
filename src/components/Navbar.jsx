import { useEffect, useState } from 'react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { FiMenu, FiX } from 'react-icons/fi'
import { Link, NavLink } from 'react-router-dom'
import { contactInfo } from '../data/restaurantData'

const links = [['Home', '/'], ['About', '/about'], ['Menu', '/menu'], ['Gallery', '/gallery'], ['Contact', '/contact']]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
    <Link className="brand" to="/" aria-label="Bagh-One home">
      <img src="https://www.baghonerestaurant.com/images/logo.png" alt="Bagh-One Restaurant" />
    </Link>

    <button className="menu-toggle" type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
      {open ? <FiX /> : <FiMenu />}
    </button>

    <nav className={open ? 'open' : ''} aria-label="Main navigation">
      {links.map(([label, path]) => <NavLink key={path} to={path} end={path === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}

      <div className="nav-socials" aria-label="Social media">
        <a href={contactInfo.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
        <a href={contactInfo.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
      </div>

      <Link className="button button-small" to="/?scroll=booking" onClick={() => setOpen(false)}>Book now</Link>
    </nav>
  </header>
}
