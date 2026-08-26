import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return <section className="not-found"><div><span>404</span><h1>Page Not Found</h1><p>The page you’re looking for is not on our menu.</p><Link className="button" to="/">Back to home</Link></div></section>
}
