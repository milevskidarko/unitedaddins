import { Arrow, Shield, Pen, Sign, Bolt, Check } from './Icons.jsx'
import CountUp from './CountUp.jsx'
import './Foxit.css'

// Product copy verified against foxit.com (Nov 2026).
const products = [
  {
    name: 'Foxit PDF Editor',
    text: 'Professional PDF editing for Windows, macOS and Web — create, edit, convert, fill & sign and securely manage PDFs, with AI Assistant included.',
    tone: 'orange',
    platforms: ['Windows', 'macOS', 'Web'],
  },
  {
    name: 'Foxit PDF Editor+',
    text: 'Everything in PDF Editor, plus mobile apps for iOS & Android, Smart Redact and Foxit eSign with 150 envelopes per year.',
    tone: 'violet',
    platforms: ['Desktop', 'Web', 'iOS', 'Android'],
  },
  {
    name: 'Foxit eSign',
    text: 'Send, sign and manage agreements through secure eSignature workflows.',
    tone: 'blue',
    platforms: ['Cloud'],
  },
]

const features = [
  { icon: Pen, label: 'Create, edit & convert' },
  { icon: Shield, label: 'Smart Redact (Editor+)' },
  { icon: Bolt, label: 'AI Assistant' },
  { icon: Sign, label: 'eSign workflows' },
]

export default function Foxit({ onAddToQuote }) {
  return (
    <section className="section foxit" id="foxit">
      <div className="container">
        <div className="foxit__head">
          <div data-reveal>
            <span className="eyebrow">Featured partner</span>
            <h2 className="section-title">
              Power your business with <span className="foxit__word">Foxit</span>
            </h2>
            <p className="section-lead">
              The leading alternative to Adobe Acrobat for creating, editing, converting, signing
              and securely managing PDFs across desktop, mobile and web — licensed and supported
              by United Addins.
            </p>
          </div>
          <div className="foxit__side" data-reveal style={{ '--d': '0.1s' }}>
            <ul className="foxit__features">
              {features.map((f) => (
                <li key={f.label}><f.icon /> {f.label}</li>
              ))}
            </ul>
            <a href="#plan" className="foxit__finder">Not sure which plan? Take the 3-question quiz <Arrow /></a>
          </div>
        </div>

        <div className="foxit__grid">
          {products.map((p, i) => (
            <article key={p.name} className={`product product--${p.tone}`} data-reveal style={{ '--d': `${i * 0.08}s` }}>
              <span className="product__icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="currentColor" opacity=".25" />
                  <path d="M14 2v6h6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <text x="12" y="17.5" textAnchor="middle" fontSize="6" fontWeight="800" fill="currentColor" fontFamily="inherit">PDF</text>
                </svg>
              </span>
              <h3>{p.name}</h3>
              <p>{p.text}</p>
              <ul className="product__platforms">
                {p.platforms.map((pl) => <li key={pl}>{pl}</li>)}
              </ul>
              <a
                href="#contact"
                className="product__link"
                onClick={(e) => { e.preventDefault(); onAddToQuote([p.name]) }}
              >
                Add to quote <Arrow />
              </a>
              <span className="product__glow" aria-hidden="true" />
            </article>
          ))}

          <aside className="stats" data-reveal style={{ '--d': '0.24s' }}>
            <h3>Proven business value</h3>
            <dl className="stats__list">
              <div><dt><CountUp to={284} suffix="%" /></dt><dd>ROI</dd></div>
              <div><dt><CountUp to={6} from={24} prefix="<" suffix="mo" duration={1100} /></dt><dd>Payback period</dd></div>
              <div><dt><CountUp to={2001} from={1980} duration={1200} /></dt><dd>Innovating since</dd></div>
            </dl>
            <p className="stats__foot"><Check /> Forrester Total Economic Impact™ study commissioned by Foxit (2022)</p>
          </aside>
        </div>
      </div>
    </section>
  )
}
