import { cuisines, foodCategories } from '../data/restaurantData'
import { Link } from 'react-router-dom'

export default function Cuisine() {
  return <section className="section cuisine" id="menu"><div className="container"><div className="section-heading"><span className="eyebrow">Taste the world</span><h2>Our <em>cuisine</em></h2><p>From vibrant Indian classics to global favourites, discover dishes made for sharing.</p></div><div className="cuisine-grid">{cuisines.map((item) => <Link className="image-card" key={item.name} to={`/menu?category=${item.name.toLowerCase()}`}><img src={item.image} alt={`${item.name} cuisine at Bagh-One`} loading="lazy" /><div><span>Explore</span><h3>{item.name}</h3></div></Link>)}</div><div className="category-row" aria-label="Food categories">{foodCategories.map((category) => <span key={category}>{category}</span>)}</div></div></section>
}
