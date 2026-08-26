import { FiStar } from 'react-icons/fi'
import { testimonials } from '../data/restaurantData'

export default function Testimonials() {
  return <section className="section testimonials"><div className="container"><div className="section-heading"><span className="eyebrow">Guest stories</span><h2>Our happy <em>customers</em></h2></div><div className="testimonial-grid">{testimonials.map((item) => <article className="testimonial-card" key={item.name}><span className="quote">“</span><div className="stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <FiStar key={index} fill="currentColor" />)}</div><p>{item.review}</p><div className="guest"><span>{item.name.charAt(0)}</span><div><strong>{item.name}</strong><small>{item.location}</small></div></div></article>)}</div></div></section>
}
