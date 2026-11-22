import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

const CHARS = '!<>-_\\/[]{}—=+*^?#01'

// Text care se „decodează” când intră în ecran (sau la hover, cu trigger="hover")
export default function Scramble({ text, trigger = 'view', className, duration = 700 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const [out, setOut] = useState(trigger === 'view' ? '' : text)
  const raf = useRef(0)

  const run = () => {
    cancelAnimationFrame(raf.current)
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const reveal = Math.floor(p * text.length)
      let s = ''
      for (let i = 0; i < text.length; i++) {
        if (i < reveal || text[i] === ' ') s += text[i]
        else s += CHARS[(Math.random() * CHARS.length) | 0]
      }
      setOut(s)
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    if (trigger === 'view' && inView) run()
    return () => cancelAnimationFrame(raf.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <span ref={ref} className={className} aria-label={text}
      onMouseEnter={trigger === 'hover' ? run : undefined}>
      <span aria-hidden="true">{out || ' '}</span>
    </span>
  )
}
