import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { CONTACT, NAV } from '../data.js'
import { scrollTo } from '../utils.js'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-40%', '0%'])

  return (
    <footer className="footer" ref={ref}>
      <div className="wrap footer-top">
        <div>
          <span className="mono muted">Navigare</span>
          {NAV.map((n) => <a key={n.href} href={n.href} onClick={(e) => scrollTo(e, n.href)}>{n.label}</a>)}
        </div>
        <div>
          <span className="mono muted">Contact</span>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a>
        </div>
        <div>
          <span className="mono muted">Social</span>
          <a href={CONTACT.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
      <div className="footer-logo-wrap">
        <motion.div className="footer-logo" style={{ y }} aria-hidden="true">web<span>shft</span></motion.div>
      </div>
      <div className="wrap footer-bottom mono">
        <span>© {YEAR} webshft</span>
        <span>Făcut cu ♥ și mult cod</span>
        <a href="#top" onClick={(e) => scrollTo(e, '#top')}>↑ Înapoi sus</a>
      </div>
    </footer>
  )
}
