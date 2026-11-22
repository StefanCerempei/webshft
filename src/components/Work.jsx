import { PROJECTS } from '../data.js'
import { FadeUp, SecHead } from './Reveal.jsx'
import { Arrow } from './Hero.jsx'

const host = (u) => new URL(u).hostname.replace(/^www\./, '')

export default function Work() {
  return (
    <section className="section wrap" id="proiecte">
      <SecHead label="Proiecte" title="Lucrări recente" />
      <ul className="work-list">
        {PROJECTS.map((p, i) => (
          <FadeUp as="li" key={p.url} delay={i * 0.04}>
            <a className="work-item" href={p.url} target="_blank" rel="noreferrer">
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <div className="work-main">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
              <div className="work-meta">
                <span>{p.type}</span>
                <span className="muted">{p.place}</span>
              </div>
              <span className="work-link">{host(p.url)} <Arrow /></span>
              {p.image && <img className="work-img" src={p.image} alt={p.title} loading="lazy" />}
            </a>
          </FadeUp>
        ))}
      </ul>
    </section>
  )
}
