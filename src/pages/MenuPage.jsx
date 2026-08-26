import { useState } from 'react'
import { FiMaximize2, FiX } from 'react-icons/fi'
import PageHero from '../components/PageHero'

const menuPages = [
  {
    src: '/images/menu/menu-1.avif',
    title: 'Welcome to Bagh-One',
    description: 'Restaurant, banquet and party plot information.',
  },
  {
    src: '/images/menu/menu-2.avif',
    title: 'Starters & Accompaniments',
    description:
      'Tandoori starters, Chinese and Mexican favourites, accompaniments and diet choices.',
  },
  {
    src: '/images/menu/menu-3.avif',
    title: 'Sizzler, Oven Baked & Pizza',
    description:
      'Sizzlers, oven-baked dishes and pizza selections.',
  },
  {
    src: '/images/menu/menu-4.avif',
    title: 'Chinese, Pasta & Indian Veg.',
    description:
      'Chinese favourites, pasta and a wide selection of Indian vegetarian dishes.',
  },
  {
    src: '/images/menu/menu-5.avif',
    title: 'Paneer, Kofta & Kathiyawadi',
    description:
      'Paneer specialities, kofta and traditional Kathiyawadi dishes.',
  },
  {
    src: '/images/menu/menu-6.avif',
    title: 'Dal, Rice, Tandoori & Kadhi',
    description:
      'Dal, rice, biryani, tandoori breads, kadhi, khichdi and tava roti.',
  },
  {
    src: '/images/menu/menu-7.avif',
    title: 'Milk Shake, Sandwich & Banquet',
    description:
      'Milk shakes, lassi, sandwiches, desserts and banquet information.',
  },
  {
    src: '/images/menu/menu-8.avif',
    title: 'Refreshments & Soup',
    description:
      'Refreshments, mocktails, juices, mineral water and soup selections.',
  },
]

export default function MenuPage() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <PageHero
        title="Our Menu"
        subtitle="Explore the complete Bagh-One menu."
        backgroundImage="/images/menu/menu-2.jpg"
      />

      <section className="section menu-page">
        <div className="container">

          <div className="section-heading">
            <span className="eyebrow">Bagh-One Restaurant</span>

            <h2>
              Explore our <em>menu</em>
            </h2>

            <p>
              Browse the complete Bagh-One menu below.
              Click any page to view it in a larger format.
            </p>
          </div>

          <div className="menu-book">

            {menuPages.map((page, index) => (
              <article
                className="menu-page-card"
                key={page.src}
              >

                <button
                  className="menu-page-image"
                  type="button"
                  onClick={() => setSelected(page)}
                  aria-label={`Open ${page.title} menu page`}
                >

                  <img
                    src={page.src}
                    alt={`${page.title} menu page`}
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />

                  <span>
                    <FiMaximize2 />
                    View Menu
                  </span>

                </button>

                <div className="menu-page-caption">

                  <span className="eyebrow">
                    Menu {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3>{page.title}</h3>

                  <p>{page.description}</p>

                </div>

              </article>
            ))}

          </div>

          <div className="menu-bottom-note">

            <strong>
              Menu prices are shown in the original menu pages.
            </strong>

            <span>
              Availability and final pricing may vary at the restaurant.
            </span>

          </div>

        </div>
      </section>

      {selected && (
        <div
          className="menu-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.title} menu`}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelected(null)
            }
          }}
        >

          <button
            className="menu-lightbox-close"
            type="button"
            onClick={() => setSelected(null)}
            aria-label="Close menu"
          >
            <FiX />
          </button>

          <img
            src={selected.src}
            alt={`${selected.title} menu enlarged`}
          />

        </div>
      )}

    </>
  )
}