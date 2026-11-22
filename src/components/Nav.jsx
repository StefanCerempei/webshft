import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { NAV } from '../data.js'
import Magnetic from './Magnetic.jsx'
import { scrollTo } from '../utils.js'

export default function Nav() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(v > prev && v > 400 && !open)
    setScrolled(v > 40)
  })

  const go = (e, href) => { setOpen(false); scrollTo(e, href) }

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'scrolled' : ''}`}
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#top" className="logo" onClick={(e) => go(e, '#top')}>web<span>shft</span></a>
        <nav className="nav-links">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)}>
              <span className="roll"><span data-text={n.label}>{n.label}</span></span>
            </a>
          ))}
        </nav>
        <Magnetic href="#contact" className="btn btn-accent nav-cta" onClick={(e) => go(e, '#contact')}>
          Hai să vorbim
        </Magnetic>
        <button className={`burger ${open ? 'open' : ''}`} aria-label="Meniu" onClick={() => setOpen(!open)}>
          <i /><i />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            {NAV.map((n, i) => (
              <motion.a
                key={n.href} href={n.href} onClick={(e) => go(e, n.href)}
                initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.6 }}
              >
                <small>0{i + 1}</small>{n.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
