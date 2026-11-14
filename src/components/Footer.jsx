import Logo from './Logo.jsx'
import { LinkedIn, Mail } from './Icons.jsx'
import './Footer.css'

const cols = [
  { title: 'Products', links: [['Foxit PDF Editor', '#foxit'], ['Foxit PDF Editor+', '#foxit'], ['Foxit eSign', '#foxit'], ['Mekko Graphics', '#mekko']] },
  { title: 'Solutions', links: [['PDF & eSign', '#foxit'], ['Data visualization', '#mekko'], ['Volume licensing', '#why']] },
  { title: 'Company', links: [['About', '#why'], ['Partners', '#partners'], ['Contact', '#contact']] },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo tagline />
            <p>The right software. The right partnership.</p>            <div className="footer__social">
              <a
                href="https://www.linkedin.com/company/united-addins/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="United Addins on LinkedIn"
              >
                <LinkedIn />
              </a>
              <a href="mailto:sales@unitedaddins.com" aria-label="Email sales@unitedaddins.com"><Mail /></a>
            </div>
          </div>
          {cols.map((c) => (
            <nav key={c.title} className="footer__col" aria-label={c.title}>
              <h4>{c.title}</h4>
              <ul>
                {c.links.map(([l, h]) => <li key={l}><a href={h}>{l}</a></li>)}
              </ul>
            </nav>
          ))}
        </div>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} United Addins. All rights reserved.</p>
          <p className="footer__legal">
            Foxit and Mekko Graphics are trademarks of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  )
}
