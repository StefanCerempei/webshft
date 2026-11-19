import { motion } from 'motion/react'
import useMagnetic from '../hooks/useMagnetic.js'

export default function Magnetic({ as = 'a', strength, className, children, ...props }) {
  const m = useMagnetic(strength)
  const Comp = motion[as]
  return (
    <Comp ref={m.ref} style={m.style} onMouseMove={m.onMouseMove} onMouseLeave={m.onMouseLeave}
      className={className} data-cursor="hover" {...props}>
      {children}
    </Comp>
  )
}
