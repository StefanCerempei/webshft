import { SERVICES } from '../data.js'
import { FadeUp, SecHead } from './Reveal.jsx'

export default function Services() {
  return (
    <section className="section wrap" id="servicii">
      <SecHead label="Servicii" title="Ce facem" />
      <div className="grid3">
        {SERVICES.map((s, i) => (
          <FadeUp key={s.title} className="cell" delay={(i % 3) * 0.05}>
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <p className="tags">{s.tags.join(' · ')}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
