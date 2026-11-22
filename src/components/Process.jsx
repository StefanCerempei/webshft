import { PROCESS } from '../data.js'
import { FadeUp, SecHead } from './Reveal.jsx'

export default function Process() {
  return (
    <section className="section wrap" id="proces">
      <SecHead label="Proces" title="Simplu. Transparent. Fără surprize." />
      <ol className="grid4">
        {PROCESS.map((s, i) => (
          <FadeUp as="li" key={s.title} className="cell" delay={i * 0.05}>
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </FadeUp>
        ))}
      </ol>
    </section>
  )
}
