export function scrollTo(e, href) {
  if (!href?.startsWith('#')) return
  e.preventDefault()
  const el = document.querySelector(href)
  if (window.__lenis) window.__lenis.scrollTo(el ?? 0, { offset: 0, duration: 1.4 })
  else (el ?? document.body).scrollIntoView({ behavior: 'smooth' })
}
