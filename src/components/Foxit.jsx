import { Arrow, Shield, Pen, Sign, Bolt, Check, Key } from './Icons.jsx'
import CountUp from './CountUp.jsx'
import ProductPreview from './ProductPreview.jsx'
import './Foxit.css'

// Product copy verified against foxit.com (Nov 2026).
const products = [
  {
    name: 'Foxit PDF Editor',
    text: 'Professional PDF editing for Windows, macOS and Web. Create, edit, convert, organize, fill and sign PDFs — with built-in AI Assistant.',
    tone: 'orange',
    preview: 'editor',
    platforms: ['Windows', 'macOS', 'Web'],
    // PDF Editor is the only Foxit plan also sold as a one-time license. Exclusions as worded by Foxit.
    perpetual: true,
    note: { icon: Key, text: 'Perpetual license available: one-time purchase for Windows & macOS, without AI Assistant, DMS or cloud features.' },
  },
  {
    name: 'Foxit PDF Editor+',
    text: 'The complete package: everything in PDF Editor, plus AI-powered Smart Redact and mobile apps for iOS & Android.',
    tone: 'violet',
    preview: 'editorPlus',
    platforms: ['Windows', 'macOS', 'Web', 'iOS', 'Android'],
    note: { icon: Sign, text: 'Includes Foxit eSign with 150 envelopes per year.' },
    badge: 'Most complete',
  },
  {
    name: 'Foxit eSign',
    text: 'Standalone electronic signatures for individuals and teams — reusable templates, signing workflows, audit trails and signature certificates. ESIGN, UETA and eIDAS aligned.',
    tone: 'blue',
    preview: 'esign',
    platforms: ['Web', 'Mobile app'],
    note: { icon: Sign, text: 'Essentials: 250 envelopes/year, 10 templates · Business: unlimited envelopes & templates (5+ users).' },
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
            <a href="#plan" className="foxit__finder">Not sure which plan? Take the 4-question quiz <Arrow /></a>
          </div>
        </div>

        <div className="foxit__grid">
          {products.map((p, i) => (
            <article
              key={p.name}
              className={`product product--${p.tone} spot ${p.badge ? 'product--featured' : ''}`}
              data-reveal
              style={{ '--d': `${i * 0.08}s` }}
            >
              {p.badge && <span className="product__badge">{p.badge}</span>}
              <ProductPreview kind={p.preview} />
              <h3>{p.name}</h3>
              <p>{p.text}</p>
              <ul className="product__platforms">
                {p.platforms.map((pl) => <li key={pl}>{pl}</li>)}
              </ul>
              {p.note && (
                <p className="product__perpetual">
                  <p.note.icon /> <span>{p.note.text}</span>
                </p>
              )}
              <div className="product__links">
                <a
                  href="#contact"
                  className="product__link"
                  onClick={(e) => { e.preventDefault(); onAddToQuote([p.name], p.perpetual ? { perpetual: false } : {}) }}
                >
                  Add to quote <Arrow />
                </a>
                {p.perpetual && (
                  <a
                    href="#contact"
                    className="product__link product__link--alt"
                    onClick={(e) => { e.preventDefault(); onAddToQuote([p.name], { perpetual: true }) }}
                  >
                    Add perpetual <Arrow />
                  </a>
                )}
              </div>
              <span className="product__glow" aria-hidden="true" />
            </article>
          ))}

          <aside className="stats" data-reveal style={{ '--d': '0.24s' }}>
            <h3>Proven business value</h3>
            <p className="stats__sub">Forrester Total Economic Impact™ study of Foxit PDF Editor</p>
            <dl className="stats__list">
              <div><dt><CountUp to={284} suffix="%" /></dt><dd>ROI</dd></div>
              <div><dt><CountUp to={6} from={24} prefix="<" suffix="mo" duration={1100} /></dt><dd>Payback period</dd></div>
              <div><dt><CountUp to={2001} from={1980} duration={1200} /></dt><dd>Foxit founded</dd></div>
            </dl>
            <p className="stats__foot">
              <Check />
              <span>
                Study commissioned by Foxit (2022). Results are based on a modeled composite
                organization and are not a guarantee of individual results.{' '}
                <a
                  href="https://cdn01.foxitsoftware.com/pub/foxit/whitepaper/general/en_us/tei-of-foxit-pdf-editor.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the study
                </a>
              </span>
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
