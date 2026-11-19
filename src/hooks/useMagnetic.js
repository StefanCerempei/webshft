import { useRef } from 'react'
import { useMotionValue, useSpring } from 'motion/react'

// Elementul este "atras" ușor de cursor
export default function useMagnetic(strength = 0.35) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.3 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.3 })

  const onMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onMouseLeave = () => { x.set(0); y.set(0) }

  return { ref, style: { x, y }, onMouseMove, onMouseLeave }
}
