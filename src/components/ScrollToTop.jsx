import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    const target = new URLSearchParams(search).get('scroll')
    if (target) requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView())
    else window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, search])
  return null
}
