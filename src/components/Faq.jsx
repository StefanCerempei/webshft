import { FAQ } from '../data.js'
import { SecHead } from './Reveal.jsx'

export default function Faq() {
  return (
    <section className="section wrap faq" id="faq">
      <SecHead label="FAQ" title="Întrebări frecvente" />
      <div className="faq-list">
        {FAQ.map((f, i) => (
          <details key={f.q} open={i === 0}>
            <summary>{f.q}<i className="plus" aria-hidden="true" /></summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
