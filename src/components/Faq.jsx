import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FAQ } from '../data.js'
import { Label, SplitLines } from './Reveal.jsx'

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="faq wrap" id="faq">
      <div className="faq-head">
        <Label>FAQ</Label>
        <SplitLines lines={['Întrebări', 'frecvente.']} className="h2" />
      </div>
      <div className="faq-list">
        {FAQ.map((f, i) => (
          <div key={f.q} className={`faq-item ${open === i ? 'open' : ''}`}>
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span>{f.q}</span><i className="plus" />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}>
                  <p>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
