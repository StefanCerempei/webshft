export function scrollTo(e, href) {
  if (!href?.startsWith('#')) return
  e.preventDefault()
  const el = document.querySelector(href)
  ;(el ?? document.body).scrollIntoView({ behavior: 'smooth' })
}
