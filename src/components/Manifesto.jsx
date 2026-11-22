import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Label } from './Reveal.jsx'

const TEXT = 'Nu facem site-uri doar ca să arate bine. Construim experiențe digitale rapide, clare și memorabile — care îți aduc clienți, nu doar vizite.'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [8, 0])
  return <motion.span style={{ opacity, y }} className="mw">{children}</motion.span>
}

export default function Manifesto() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = TEXT.split(' ')

  return (
    <section className="manifesto wrap" id="manifest">
      <Label>Manifest</Label>
      <p ref={ref} className="manifesto-text">
        {words.map((w, i) => {
          const start = i / words.length
          const hl = /clienți|memorabile/.test(w)
          return (
            <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
              <span className={hl ? 'accent' : ''}>{w}</span>
            </Word>
          )
        })}
      </p>
      <div className="stats">
        {[['<1s', 'timp de încărcare țintă'], ['95+', 'scor Lighthouse'], ['100%', 'cod custom, fără șabloane'], ['24h', 'răspuns la orice cerere']].map(([n, l], i) => (
          <motion.div key={l} className="stat" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8 }}>
            <b>{n}</b><span>{l}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
