import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { PLANS } from '../data.js'
import { Label, SplitLines } from './Reveal.jsx'
import { scrollTo } from '../utils.js'

function Plan({ p, i }) {
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const rx = useSpring(0, { stiffness: 150, damping: 15 })
  const ry = useSpring(0, { stiffness: 150, damping: 15 })
  const glow = useMotionTemplate`radial-gradient(400px circle at ${mx}% ${my}%, var(--glow), transparent 60%)`

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    mx.set(px * 100); my.set(py * 100)
    rx.set((0.5 - py) * 8); ry.set((px - 0.5) * 8)
  }
  const leave = () => { rx.set(0); ry.set(0) }

  const choose = (e) => {
    const msg = document.getElementById('f-msg')
    if (msg) msg.value = `Sunt interesat de pachetul ${p.name}. `
    scrollTo(e, '#contact')
  }

  return (
    <motion.div className={`plan ${p.hot ? 'hot' : ''}`} onMouseMove={move} onMouseLeave={leave}
      style={{ rotateX: rx, rotateY: ry }}
      initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: i * 0.1 }}>
      <motion.div className="plan-glow" style={{ background: glow }} />
      {p.hot && <span className="plan-badge">Cel mai ales</span>}
      <h3>{p.name}</h3>
      <p className="plan-for">{p.for}</p>
      <div className="plan-price"><small>de la</small><b>€{p.price}</b></div>
      <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
      <a href="#contact" className={`btn ${p.hot ? 'btn-dark' : 'btn-ghost'}`} onClick={choose}>Alege {p.name}</a>
    </motion.div>
  )
}

export default function Pricing() {
  return (
    <section className="pricing wrap" id="preturi">
      <div className="sec-head">
        <Label>Prețuri</Label>
        <SplitLines lines={['Pachete clare,', 'pentru orice etapă.']} className="h2" />
      </div>
      <div className="plans">{PLANS.map((p, i) => <Plan key={p.name} p={p} i={i} />)}</div>
      <p className="muted center small">Prețuri de pornire, fără TVA. Mentenanță lunară de la €39/lună.</p>
    </section>
  )
}
