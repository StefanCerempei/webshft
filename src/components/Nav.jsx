import { useEffect, useState } from 'react'
import { NAV } from '../data.js'
import { scrollTo } from '../utils.js'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const go = (e, href) => { setOpen(false); scrollTo(e, href) }

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''} ${open ? 'open' : ''}`}>
      <div className="wrap nav-inner">
        <a href="#top" className="logo" onClick={(e) => go(e, '#top')}>webshft</a>
        <nav className="nav-links">
          {NAV.map((n) => <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)}>{n.label}</a>)}
        </nav>
        <button className="burger" aria-label="Meniu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? 'Închide' : 'Meniu'}
        </button>
      </div>
    </header>
  )
}
