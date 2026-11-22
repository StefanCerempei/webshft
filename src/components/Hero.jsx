import { lazy, Suspense, useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import useLetterProximity from '../hooks/useLetterProximity.js'

const LiquidBg = lazy(() => import('./LiquidBg.jsx'))

function hasWebGL() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2')) } catch { return false }
}
const WEBGL = typeof window !== 'undefined' && hasWebGL()
import Magnetic from './Magnetic.jsx'
import { scrollTo } from '../utils.js'

const ease = [0.22, 1, 0.36, 1]

function Word({ children, delay, ready, className = '' }) {
  return (
    <span className="line-mask">
      <motion.span
        className={`line ${className}`}
        initial={{ y: '115%', rotate: 4 }}
        animate={ready ? { y: '0%', rotate: 0 } : {}}
        transition={{ duration: 1.2, ease, delay }}
      >
        {typeof children === 'string'
          ? children.split('').map((c, i) => <span className="ch" key={i}>{c === ' ' ? '\u00a0' : c}</span>)
          : children}
      </motion.span>
    </span>
  )
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const titleRef = useRef(null)
  const inView = useInView(ref)
  useLetterProximity(titleRef, ready)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yTitle = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  // blob-urile urmăresc mouse-ul
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const bx = useSpring(useTransform(mx, [0, 1], ['-15%', '15%']), { stiffness: 40, damping: 20 })
  const by = useSpring(useTransform(my, [0, 1], ['-15%', '15%']), { stiffness: 40, damping: 20 })
  const bx2 = useSpring(useTransform(mx, [0, 1], ['12%', '-12%']), { stiffness: 30, damping: 20 })
  const by2 = useSpring(useTransform(my, [0, 1], ['10%', '-10%']), { stiffness: 30, damping: 20 })

  useEffect(() => {
    const move = (e) => { mx.set(e.clientX / innerWidth); my.set(e.clientY / innerHeight) }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [mx, my])

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-bg" aria-hidden="true">
        <motion.div className="blob b1" style={{ x: bx, y: by }} />
        <motion.div className="blob b2" style={{ x: bx2, y: by2 }} />
        <motion.div className="blob b3" style={{ x: by, y: bx2 }} />
        {WEBGL && (
          <Suspense fallback={null}>
            <motion.div className="liquid-wrap" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 1.6 }}>
              <LiquidBg active={inView} />
            </motion.div>
          </Suspense>
        )}
        <div className="hero-grid" />
      </div>

      <motion.div className="hero-inner" style={{ y: yTitle, opacity, scale }}>
        <motion.div className="hero-top"
          initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 0.9, duration: 1 }}>
          <span className="pill"><i className="pulse" />Disponibil pentru proiecte noi</span>
        </motion.div>

        <h1 ref={titleRef} className="hero-title" aria-label="Facem shift-ul către un web care vinde.">
          <span className="row"><Word ready={ready} delay={0.1}>Facem</Word> <Word ready={ready} delay={0.18} className="outline">shift-ul</Word></span>
          <span className="row"><Word ready={ready} delay={0.26}>către un web</Word></span>
          <span className="row"><Word ready={ready} delay={0.34}>care</Word> <Word ready={ready} delay={0.42} className="accent italic">vinde.</Word></span>
        </h1>

        <motion.div className="hero-bottom"
          initial={{ opacity: 0, y: 30 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8, duration: 1, ease }}>
          <p className="hero-lead">
            Site-uri de prezentare, magazine online și aplicații web — rapide, memorabile și construite
            să transforme vizitatorii în clienți.
          </p>
          <div className="hero-cta">
            <Magnetic href="#contact" className="btn btn-accent btn-lg" onClick={(e) => scrollTo(e, '#contact')}>
              Cere o ofertă gratuită <Arrow />
            </Magnetic>
            <Magnetic href="#proiecte" className="btn btn-ghost btn-lg" onClick={(e) => scrollTo(e, '#proiecte')}>
              Vezi proiectele
            </Magnetic>
          </div>
        </motion.div>
      </motion.div>

      <motion.a href="#manifest" className="scroll-badge" onClick={(e) => scrollTo(e, '#manifest')}
        initial={{ opacity: 0, scale: 0.6 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1.1, duration: 0.8, ease }}>
        <svg viewBox="0 0 100 100" className="spin">
          <defs><path id="circ" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" /></defs>
          <text><textPath href="#circ">scroll • webshft • scroll • webshft • </textPath></text>
        </svg>
        <span>↓</span>
      </motion.a>
    </section>
  )
}

export function Arrow() {
  return (
    <svg className="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  )
}
