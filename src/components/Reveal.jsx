import { motion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1]

// Text care apare linie cu linie, din spatele unei măști
export function SplitLines({ lines, className, delay = 0, animate, as = 'h2', children }) {
  const Tag = motion[as]
  const trigger = animate === undefined
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.3 } }
    : { initial: 'hidden', animate: animate ? 'show' : 'hidden' }
  return (
    <Tag className={className} aria-label={lines.join(' ')} {...trigger}>
      {lines.map((l, i) => (
        <span className="line-mask" key={i} aria-hidden="true">
          <motion.span
            className="line"
            variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
            transition={{ duration: 1, ease, delay: delay + i * 0.08 }}
          >
            {l}{i === lines.length - 1 && children}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export function FadeUp({ children, delay = 0, className, as = 'div', ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export function Label({ children }) {
  return <span className="label"><i />{children}</span>
}
