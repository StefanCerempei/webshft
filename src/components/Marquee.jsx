import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import { MARQUEE } from '../data.js'

const wrap = (min, max, v) => ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min

// Bandă care accelerează și își schimbă direcția în funcție de scroll
function Row({ base = -2, children, className }) {
  const x = useMotionValue(0)
  const { scrollY } = useScroll()
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(vel, [0, 1000], [0, 5], { clamp: false })
  const dir = useRef(1)
  const pos = useTransform(x, (v) => `${wrap(-50, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    let move = dir.current * base * (delta / 1000)
    if (factor.get() < 0) dir.current = -1
    else if (factor.get() > 0) dir.current = 1
    move += dir.current * move * factor.get()
    x.set(x.get() + move)
  })

  return (
    <div className={`marquee-row ${className ?? ''}`}>
      <motion.div className="marquee-track" style={{ x: pos }}>
        {children}{children}
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  const items = MARQUEE.map((m) => <span key={m}>{m}<b>✦</b></span>)
  return (
    <div className="marquee" aria-hidden="true">
      <Row base={-2.5} className="m1">{items}</Row>
      <Row base={2.5} className="m2">{items}</Row>
    </div>
  )
}
