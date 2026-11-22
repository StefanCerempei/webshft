import { motion } from 'motion/react'

// Apariție discretă la scroll
export function FadeUp({ children, delay = 0, className, as = 'div', ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export function SecHead({ label, title, children }) {
  return (
    <FadeUp className="sec-head">
      <span className="label">{label}</span>
      <h2 className="h2">{title}</h2>
      {children}
    </FadeUp>
  )
}
