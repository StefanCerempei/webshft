import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Magnetic from './Magnetic.jsx'
import { scrollTo } from '../utils.js'

// Textul „SHIFT” crește până când intrăm prin litera I și ecranul devine verde
export default function ShiftZoom() {
  const ref = useRef(null)
  const textRef = useRef(null)
  const iRef = useRef(null)
  const [origin, setOrigin] = useState('50% 50%')
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useLayoutEffect(() => {
    const measure = () => {
      const t = textRef.current.getBoundingClientRect()
      const i = iRef.current.getBoundingClientRect()
      const x = ((i.left + i.width / 2 - t.left) / t.width) * 100
      const y = ((i.top + i.height * 0.55 - t.top) / t.height) * 100
      setOrigin(`${x}% ${y}%`)
    }
    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const scale = useTransform(p, [0, 0.55], [1, 90], { ease: (v) => v * v * v })
  const hintOpacity = useTransform(p, [0, 0.1], [1, 0])
  const fill = useTransform(p, [0.5, 0.56], [0, 1])
  const msgOpacity = useTransform(p, [0.6, 0.72], [0, 1])
  const msgY = useTransform(p, [0.6, 0.8], [80, 0])
  const msgScale = useTransform(p, [0.6, 0.85], [0.85, 1])

  return (
    <section className="zoom" ref={ref}>
      <div className="zoom-stage">
        <motion.div className="zoom-text" ref={textRef} style={{ scale, transformOrigin: origin }} aria-hidden="true">
          SH<span ref={iRef}>I</span>FT
        </motion.div>
        <motion.p className="zoom-hint mono" style={{ opacity: hintOpacity }}>continuă să derulezi ↓</motion.p>
        <motion.div className="zoom-fill" style={{ opacity: fill }} />
        <motion.div className="zoom-msg" style={{ opacity: msgOpacity, y: msgY, scale: msgScale }}>
          <span className="mono">// ești pregătit?</span>
          <h2>Gata de<br /><em>shift?</em></h2>
          <p>De la idee la un site care vinde — în câteva săptămâni, nu luni.</p>
          <Magnetic href="#contact" className="btn btn-dark btn-lg" onClick={(e) => scrollTo(e, '#contact')}>
            Începe proiectul →
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
