import { useEffect, useRef } from 'react'

// Literele din apropierea cursorului devin mai subțiri și se ridică (font variabil Syne 400–800)
export default function useLetterProximity(containerRef, enabled) {
  const raf = useRef(0)
  useEffect(() => {
    if (!enabled || !window.matchMedia('(pointer: fine)').matches) return
    const el = containerRef.current
    const letters = [...el.querySelectorAll('.ch')]
    let mx = -9999, my = -9999
    const onMove = (e) => { mx = e.clientX; my = e.clientY }
    const loop = () => {
      const rects = letters.map((l) => l.getBoundingClientRect())
      letters.forEach((l, i) => {
        const r = rects[i]
        const dx = mx - (r.left + r.width / 2)
        const dy = my - (r.top + r.height / 2)
        const f = Math.max(0, 1 - Math.hypot(dx, dy) / 260)
        const k = f * f * (3 - 2 * f)
        l.style.fontVariationSettings = `'wght' ${800 - k * 400}`
        l.style.transform = `translateY(${-k * 14}px)`
      })
      raf.current = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', onMove)
    raf.current = requestAnimationFrame(loop)
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf.current) }
  }, [containerRef, enabled])
}
