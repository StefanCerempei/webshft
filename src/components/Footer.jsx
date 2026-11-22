import { CONTACT } from '../data.js'
import { scrollTo } from '../utils.js'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer wrap">
      <span>© {YEAR} webshft</span>
      <div className="footer-links">
        <a href={CONTACT.instagram} target="_blank" rel="noreferrer">Instagram</a>
        <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="#top" onClick={(e) => scrollTo(e, '#top')}>Sus ↑</a>
      </div>
    </footer>
  )
}
