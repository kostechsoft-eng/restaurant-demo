export default function PageHero({ title, subtitle, backgroundImage }) {
  return <section className="page-hero" style={{ '--page-hero-image': `url(${backgroundImage})` }}><div><span className="eyebrow light">Bagh-One Restaurant</span><h1>{title}</h1><p>{subtitle}</p></div></section>
}
