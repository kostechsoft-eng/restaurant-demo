import { FiArrowUpRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { services } from '../data/restaurantData'

export default function Services() {
  return <section className="section services">
    <div className="container">
      <div className="section-heading">
        <span className="eyebrow">Celebrate with us</span>
        <h2>Our <em>services</em></h2>
        <p>Thoughtfully hosted occasions, from intimate dinners to grand celebrations.</p>
      </div>
      <div className="services-grid">
        {services.map((service) => <article className="service-card" key={service.title}>
          <div className="service-image-wrap">
            <img
              src={service.image}
              alt={`${service.title} at Bagh-One`}
              loading="eager"
              onError={(event) => {
                if (event.currentTarget.dataset.fallbackApplied) return
                event.currentTarget.dataset.fallbackApplied = 'true'
                event.currentTarget.src = service.fallbackImage
              }}
            />
            <span className="service-image-label">Bagh-One Events</span>
          </div>
          <div>
            <h3>{service.title}</h3>
            <Link to="/?scroll=booking">Book event <FiArrowUpRight /></Link>
          </div>
        </article>)}
      </div>
    </div>
  </section>
}
