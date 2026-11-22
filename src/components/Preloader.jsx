import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(true)
  const done = useRef(onDone)

  useEffect(() => {
    let n = 0
    const id = setInterval(() => {
      n = Math.min(100, n + Math.ceil(Math.random() * 9))
      setCount(n)
      if (n === 100) {
        clearInterval(id)
        setTimeout(() => { setVisible(false); done.current() }, 350)
      }
    }, 45)
    return () => clearInterval(id)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="preloader-logo">web<span>shft</span></div>
          <div className="preloader-bar"><motion.i style={{ scaleX: count / 100 }} /></div>
          <div className="preloader-count">{String(count).padStart(3, '0')}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
