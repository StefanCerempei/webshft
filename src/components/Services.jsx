import { useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { SERVICES } from '../data.js'
import { Label, SplitLines } from './Reveal.jsx'

export default function Services() {
  const [active, setActive] = useState(null)
  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
  }

  return (
    <section className="services wrap" id="servicii">
      <div className="sec-head">
        <Label>Servicii</Label>
        <SplitLines lines={['Tot ce-ți trebuie', 'ca să ieși în față.']} className="h2" />
      </div>

      <div className="service-list" onMouseMove={onMove} onMouseLeave={() => setActive(null)}>
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            className={`service ${active !== null && active !== i ? 'dim' : ''}`}
            onMouseEnter={() => setActive(i)}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, delay: i * 0.05 }}
            style={{ '--c': s.color }}
          >
            <span className="service-num mono">0{i + 1}</span>
            <h3>{s.title}</h3>
            <div className="service-body">
              <p>{s.desc}</p>
              <div className="tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
            <span className="service-arrow">→</span>
          </motion.div>
        ))}

        <AnimatePresence>
          {active !== null && (
            <motion.div
              className="service-preview"
              style={{ x, y, background: SERVICES[active].color }}
              initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <AnimatePresence mode="popLayout">
                <motion.span key={active} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }}>
                  0{active + 1}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
