import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { PROJECTS } from '../data.js'
import { Label } from './Reveal.jsx'

function Mock({ p }) {
  return (
    <div className="mock">
      <div className="mock-bar"><i /><i /><i /><span>{p.title.toLowerCase().replace(/\s/g, '')}.ro</span></div>
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
    <a href="#contact" className="work-card" data-cursor="view">
      <div className="work-media" style={{ '--from': p.from, '--to': p.to }}>
        {p.image ? <img src={p.image} alt={p.title} /> : <Mock p={p} />}
      </div>
      <div className="work-info">
        <span className="mono muted">0{i + 1}</span>
        <h3>{p.title}</h3>
        <span className="mono muted">{p.type} · {p.year}</span>
      </div>
    </a>
  )
}

export default function Work() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-72%'])
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="work" id="proiecte" ref={ref} style={{ height: `${PROJECTS.length * 80}vh` }}>
      <div className="work-sticky">
        <div className="wrap work-head">
          <Label>Proiecte selectate</Label>
          <h2 className="h2">Lucrări <span className="outline">recente</span></h2>
          <div className="work-progress"><motion.i style={{ scaleX: progress }} /></div>
        </div>
        <motion.div className="work-track" style={{ x }}>
          {PROJECTS.map((p, i) => <Card key={p.title} p={p} i={i} />)}
          <a href="#contact" className="work-card work-next" data-cursor="hover">
            <span>Proiectul tău<br />poate fi<br /><em>următorul</em> →</span>
          </a>
        </motion.div>
      </div>
      {/* pe mobil: listă verticală */}
      <div className="work-mobile wrap">
        {PROJECTS.map((p, i) => <Card key={p.title} p={p} i={i} />)}
      </div>
    </section>
  )
}
