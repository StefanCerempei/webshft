import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { PROCESS } from '../data.js'
import { Label, SplitLines } from './Reveal.jsx'

export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="process wrap" id="proces">
      <div className="process-left">
        <Label>Proces</Label>
        <SplitLines lines={['Simplu.', 'Transparent.', 'Fără surprize.']} className="h2" />
        <p className="muted">Știi tot timpul în ce etapă suntem, ce urmează și cât costă.</p>
      </div>
      <div className="process-steps" ref={ref}>
        <div className="process-line"><motion.i style={{ height: h }} /></div>
        {PROCESS.map((s, i) => (
          <motion.div key={s.title} className="pstep"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.8 }}>
            <span className="pstep-num">0{i + 1}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
