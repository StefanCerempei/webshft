import { useState } from 'react'
import { CONTACT } from '../data.js'
import { Label, SplitLines } from './Reveal.jsx'
import Magnetic from './Magnetic.jsx'
import { Arrow } from './Hero.jsx'

const TYPES = ['Site de prezentare', 'Magazin online', 'Aplicație web', 'Redesign', 'SEO / Mentenanță']
const BUDGETS = ['< €500', '€500–1.500', '€1.500–3.000', '€3.000+']

export default function Contact() {
  const [types, setTypes] = useState([])
  const [budget, setBudget] = useState(BUDGETS[1])
  const [status, setStatus] = useState('')

  const toggle = (t) => setTypes((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]))

  // TODO: conectează la un serviciu de formulare (Formspree, Resend, API propriu)
  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = f.get('name')?.trim(), email = f.get('email')?.trim()
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) { setStatus('Completează numele și un email valid.'); return }
    const body = `Nume: ${name}\nEmail: ${email}\nServicii: ${types.join(', ') || '—'}\nBuget: ${budget}\n\n${f.get('msg')}`
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Proiect nou – ' + name)}&body=${encodeURIComponent(body)}`
    setStatus('Mulțumim! Se deschide aplicația de email.')
  }

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <Label>Contact</Label>
        <SplitLines lines={['Hai să construim', 'ceva ']} className="contact-title">
          <em className="accent">memorabil.</em>
        </SplitLines>

        <div className="contact-grid">
          <div className="contact-info">
            <p className="muted">Spune-ne pe scurt ce ai nevoie. Revenim în maximum 24 de ore cu o propunere și o estimare gratuită.</p>
            <Magnetic href={`mailto:${CONTACT.email}`} className="contact-mail" strength={0.15}>{CONTACT.email}</Magnetic>
            <a className="contact-link" href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a>
            <div className="socials">
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
              <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>

          <form className="form" onSubmit={submit} noValidate>
            <fieldset>
              <legend>De ce ai nevoie?</legend>
              <div className="chips">
                {TYPES.map((t) => (
                  <button type="button" key={t} className={types.includes(t) ? 'on' : ''} onClick={() => toggle(t)}>{t}</button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Buget estimat</legend>
              <div className="chips">
                {BUDGETS.map((b) => (
                  <button type="button" key={b} className={budget === b ? 'on' : ''} onClick={() => setBudget(b)}>{b}</button>
                ))}
              </div>
            </fieldset>
            <div className="row2">
              <label className="field"><input name="name" placeholder=" " /><span>Nume</span></label>
              <label className="field"><input name="email" type="email" placeholder=" " /><span>Email</span></label>
            </div>
            <label className="field"><textarea id="f-msg" name="msg" rows="4" placeholder=" " /><span>Despre proiect</span></label>
            <div className="form-foot">
              <Magnetic as="button" type="submit" className="btn btn-accent btn-lg">Trimite mesajul <Arrow /></Magnetic>
              <p className="form-status" role="status">{status}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
