import { motion } from 'motion/react'
import { scrollTo } from '../utils.js'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  return (
    <section className="hero wrap" id="top">
      <motion.p className="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <i className="dot" />Disponibil pentru proiecte noi
      </motion.p>
      <motion.h1 className="hero-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
        Site-uri și aplicații web care mută businessul înainte.
      </motion.h1>
      <motion.div className="hero-bottom" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.15 }}>
        <p className="lead">
          Site-uri de prezentare, magazine online și aplicații web — rapide, clare și construite
          să transforme vizitatorii în clienți.
        </p>
        <div className="cta">
          <a href="#contact" className="btn" onClick={(e) => scrollTo(e, '#contact')}>Cere o ofertă <Arrow /></a>
          <a href="#proiecte" className="link" onClick={(e) => scrollTo(e, '#proiecte')}>Vezi proiectele</a>
        </div>
      </motion.div>
    </section>
  )
}

export function Arrow() {
  return (
    <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  )
}
