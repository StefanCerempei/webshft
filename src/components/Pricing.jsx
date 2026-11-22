import { PLANS } from '../data.js'
import { FadeUp, SecHead } from './Reveal.jsx'
import { scrollTo } from '../utils.js'

function Plan({ p, i }) {
  const choose = (e) => {
    const msg = document.getElementById('f-msg')
    if (msg) msg.value = `Sunt interesat de pachetul ${p.name}. `
    scrollTo(e, '#contact')
  }

  return (
    <FadeUp className={`plan ${p.hot ? 'hot' : ''}`} delay={i * 0.05}>
      <div className="plan-head">
        <h3>{p.name}</h3>
        {p.hot && <span className="badge">Recomandat</span>}
      </div>
      <p className="muted">{p.for}</p>
      <p className="plan-price"><small>de la</small> €{p.price}</p>
      <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
      <a href="#contact" className={p.hot ? 'btn' : 'btn btn-ghost'} onClick={choose}>Alege {p.name}</a>
    </FadeUp>
  )
}

export default function Pricing() {
  return (
    <section className="section wrap" id="preturi">
      <SecHead label="Prețuri" title="Pachete clare, pentru orice etapă." />
      <div className="plans">{PLANS.map((p, i) => <Plan key={p.name} p={p} i={i} />)}</div>
      <p className="muted small note">Prețuri de pornire, fără TVA. Mentenanță lunară de la €39/lună.</p>
    </section>
  )
}
