import { useEffect, useState } from 'react'
import { FiX, FiZoomIn } from 'react-icons/fi'
import { galleryImages } from '../data/restaurantData'

export default function Gallery() {
  const [selected, setSelected] = useState(null)
  useEffect(() => {
    if (!selected) return undefined
    const close = (event) => event.key === 'Escape' && setSelected(null)
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [selected])
  return <section className="section gallery-section" id="gallery"><div className="container"><div className="section-heading left"><span className="eyebrow">A glimpse inside</span><h2>Our <em>gallery</em></h2></div><div className="gallery-grid">{galleryImages.map((image) => <button type="button" key={image.id} onClick={() => setSelected(image)} aria-label={`Enlarge ${image.alt}`}><img src={image.src} alt={image.alt} loading="lazy" /><span><FiZoomIn /></span></button>)}</div></div>{selected && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={() => setSelected(null)}><button type="button" aria-label="Close image viewer"><FiX /></button><img src={selected.src} alt={selected.alt} onClick={(event) => event.stopPropagation()} /></div>}</section>
}
