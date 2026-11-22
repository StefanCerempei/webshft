import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import { PROJECTS } from '../data.js'
import { Label } from './Reveal.jsx'

const host = (u) => new URL(u).hostname.replace(/^www\./, '')

function Mock({ p }) {
  return (
    <div className="mock">
      <div className="mock-bar"><i /><i /><i /><span>{host(p.url)}</span></div>
      <div className="mock-body">
        <div className="mock-nav"><b>{p.title}</b><span /><span /><span /></div>
        <div className="mock-hero"><i className="t1" /><i className="t2" /><i className="btn" /></div>
        <div className="mock-cards"><i /><i /><i /></div>
      </div>
    </div>
  )
}

function Card({ p, i }) {
  return (
    <a href={p.url} target="_blank" rel="noreferrer" className="work-card">
      <div className="work-media" style={{ '--from': p.from, '--to': p.to }}>
        {p.image ? <img src={p.image} alt={p.title} /> : <Mock p={p} />}
      </div>
      <div className="work-info">
        <span className="mono muted">0{i + 1}</span>
        <h3>{p.title}</h3>
        <span className="mono muted">{p.type} · {p.place}</span>
      </div>
    </a>
  )
}

export default function Work() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-72%'])
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])
  const { scrollY } = useScroll()
  const vel = useSpring(useVelocity(scrollY), { stiffness: 300, damping: 50 })
  const skew = useTransform(vel, [-2500, 2500], [7, -7], { clamp: true })

  return (
    <section className="work" id="proiecte" ref={ref} style={{ height: `${PROJECTS.length * 80}vh` }}>
      <div className="work-sticky">
        <div className="wrap work-head">
          <Label>Proiecte selectate</Label>
          <h2 className="h2">Lucrări <span className="outline">recente</span></h2>
          <div className="work-progress"><motion.i style={{ scaleX: progress }} /></div>
        </div>
        <motion.div className="work-track" style={{ x, skewX: skew }}>
          {PROJECTS.map((p, i) => <Card key={p.url} p={p} i={i} />)}
          <a href="#contact" className="work-card work-next">
            <span>Proiectul tău<br />poate fi<br /><em>următorul</em> →</span>
          </a>
        </motion.div>
      </div>
      {/* pe mobil: listă verticală */}
      <div className="work-mobile wrap">
        {PROJECTS.map((p, i) => <Card key={p.url} p={p} i={i} />)}
      </div>
    </section>
  )
}
