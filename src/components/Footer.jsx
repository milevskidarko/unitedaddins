import { useRef } from 'react'
import Logo from './Logo.jsx'
import { LinkedIn, Mail, Arrow, Check } from './Icons.jsx'
import './Footer.css'

const SALES_EMAIL = 'sales@unitedaddins.com'

const cols = [
  { title: 'Products', links: [['Foxit PDF Editor', '#foxit'], ['Foxit PDF Editor+', '#foxit'], ['Foxit eSign', '#foxit'], ['Mekko Graphics', '#mekko']] },
  { title: 'Solutions', links: [['PDF & eSign', '#foxit'], ['Data visualization', '#mekko'], ['Find your plan', '#plan'], ['Volume licensing', '#why']] },
  { title: 'Company', links: [['About', '#why'], ['Partners', '#partners'], ['Request a quote', '#contact']] },
]

export default function Footer() {
  const mega = useRef(null)

  // The giant wordmark lights up under the cursor.
  const onMove = (e) => {
    const el = mega.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <footer className="footer" onPointerMove={onMove}>
      <span className="footer__glow" aria-hidden="true" />
      <div className="container">
        {/* Statement + direct contact */}
        <div className="footer__cta">
          <p className="footer__statement">
            The right software.
            <br />
            The right <span className="accent grad-text">partnership.</span>
          </p>
          <div className="footer__cta-actions">
            <a href={`mailto:${SALES_EMAIL}`} className="footer__mail">
              <span className="footer__mail-ic"><Mail /></span>
              <span>
                <small>Talk to our team</small>
                <strong>{SALES_EMAIL}</strong>
              </span>
              <Arrow className="footer__mail-arrow" />
            </a>
          </div>
        </div>

        <div className="footer__top">
          <div className="footer__brand">
            <Logo tagline light />
            <p className="footer__badge">
              <Check /> Authorized Foxit &amp; Mekko Graphics distributor
            </p>
            <div className="footer__social">
              <a
                href="https://www.linkedin.com/company/united-addins/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="United Addins on LinkedIn"
              >
                <LinkedIn />
              </a>
              <a href={`mailto:${SALES_EMAIL}`} aria-label={`Email ${SALES_EMAIL}`}><Mail /></a>
            </div>
          </div>
          {cols.map((c) => (
            <nav key={c.title} className="footer__col" aria-label={c.title}>
              <h4>{c.title}</h4>
              <ul>
                {c.links.map(([l, h]) => (
                  <li key={l}>
                    <a href={h}><span>{l}</span></a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} United Addins. All rights reserved.</p>
          <p className="footer__legal">Foxit and Mekko Graphics are trademarks of their respective owners.</p>
          <a href="#top" className="footer__top-btn" aria-label="Back to top">
            <Arrow />
          </a>
        </div>
      </div>
      <div className="footer__mega" ref={mega} aria-hidden="true">United Addins</div>
      <span className="noise" aria-hidden="true" />
    </footer>
  )
}
