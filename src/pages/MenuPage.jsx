import { useState } from 'react'
import { FiMaximize2, FiX } from 'react-icons/fi'
import PageHero from '../components/PageHero'

const menuPages = [
  { src: '/images/menu/menu-1.webp', title: 'Dal & Rice', description: 'Dal, biryani, pulao and rice favourites.' },
  { src: '/images/menu/menu-2.webp', title: 'Tandoori', description: 'Rotis, parathas, naan and tandoor favourites.' },
  { src: '/images/menu/menu-3.webp', title: 'Kathiyawadi', description: 'Traditional Gujarati and Kathiyawadi specialities.' },
  { src: '/images/menu/menu-4.webp', title: 'Kadhi & Khichdi', description: 'Comforting kadhi, khichdi and tava roti selections.' },
  { src: '/images/menu/menu-5.webp', title: 'Pasta, Sandwich & Ice Cream', description: 'Pasta, sandwiches and dessert favourites.' },
]

export default function MenuPage() {
  const [selected, setSelected] = useState(null)

  return <>
    <PageHero
      title="Our Menu"
      subtitle="Explore the Bagh-One menu, with traditional Indian favourites and more."
      backgroundImage="/images/menu/menu-3.webp"
    />

    <section className="section menu-page">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Fresh from Bagh-One</span>
          <h2>Explore our <em>menu</em></h2>
          <p>Browse the restaurant's menu pages below. Tap any page to view it in a larger format.</p>
        </div>

        <div className="menu-book">
          {menuPages.map((page, index) => (
            <article className="menu-page-card" key={page.src}>
              <button
                className="menu-page-image"
                type="button"
                onClick={() => setSelected(page)}
                aria-label={`Open ${page.title} menu page`}
              >
                <img src={page.src} alt={`${page.title} menu`} loading={index < 2 ? 'eager' : 'lazy'} />
                <span><FiMaximize2 /> View menu</span>
              </button>
              <div className="menu-page-caption">
                <span className="eyebrow">Menu {String(index + 1).padStart(2, '0')}</span>
                <h3>{page.title}</h3>
                <p>{page.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="menu-bottom-note">
          <strong>Menu prices are shown in the original menu pages.</strong>
          <span>Availability and final pricing may vary at the restaurant.</span>
        </div>
      </div>
    </section>

    {selected && (
      <div className="menu-lightbox" role="dialog" aria-modal="true" aria-label={`${selected.title} menu`}>
        <button className="menu-lightbox-close" type="button" onClick={() => setSelected(null)} aria-label="Close menu">
          <FiX />
        </button>
        <img src={selected.src} alt={`${selected.title} menu enlarged`} />
      </div>
    )}
  </>
}
