import { Arrow, Shield, Bolt, Headset, Check, Sign, Key } from './Icons.jsx'
import './Hero.css'

// Illustrative Marimekko for the Mekko Graphics window: column width = segment size.
const mekko = [
  { w: 34, parts: [40, 30, 18, 12] },
  { w: 26, parts: [28, 34, 24, 14] },
  { w: 22, parts: [22, 26, 34, 18] },
  { w: 18, parts: [34, 22, 24, 20] },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <span className="ribbon ribbon--1" />
        <span className="ribbon ribbon--2" />
        <span className="blob blob--1" />
        <span className="blob blob--2" />
        <span className="hero__grid" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="pill" data-reveal>
            <span className="pill__dot" /> Software licensing &amp; distribution partner
          </span>
          <h1 className="hero__title" data-reveal style={{ '--d': '0.08s' }}>
            The right software.
            <br />
            The right <span className="grad-text">partnership.</span>
          </h1>
          <p className="hero__lead" data-reveal style={{ '--d': '0.16s' }}>
            We help organizations find, license and get the most from trusted software
            solutions — from PDF &amp; eSign to consulting-grade data visualization.
          </p>
          <div className="hero__ctas" data-reveal style={{ '--d': '0.24s' }}>
            <a href="#partners" className="btn btn-primary">Explore our solutions <Arrow /></a>
            <a href="#contact" className="btn btn-ghost">Talk to our team</a>
          </div>
          <ul className="hero__trust" data-reveal style={{ '--d': '0.32s' }}>
            <li><Shield /><span><strong>Secure &amp; reliable</strong><small>Enterprise-grade</small></span></li>
            <li><Bolt /><span><strong>Flexible licensing</strong><small>For any team size</small></span></li>
            <li><Headset /><span><strong>Expert support</strong><small>When you need us</small></span></li>
          </ul>
        </div>

        {/* Stylized, illustrative product windows: a PDF being redacted & signed, and a Mekko chart. */}
        <div className="hero__visual" aria-hidden="true">
          <div className="glass win win--pdf float-a">
            <div className="win__bar">
              <span className="win__app win__app--pdf">PDF</span>
              <em>Service agreement.pdf</em>
            </div>
            <div className="win__page">
              <span className="ln ln--h ln--w60" />
              <span className="ln ln--w90" />
              <span className="ln ln--w75" />
              <span className="redact-row">
                <span className="ln ln--w30" />
                <span className="redact" />
                <span className="ln ln--w20" />
              </span>
              <span className="ln ln--w80" />
              <span className="ln ln--w60" />
              <div className="sig">
                <svg viewBox="0 0 160 44">
                  <path d="M6 30c10-14 18-22 22-18s-8 22-2 22 14-26 22-24-4 20 2 20 10-12 16-12 4 10 10 10 12-8 20-10 16 2 26-2 14-6 26-6" />
                </svg>
                <small>Signed</small>
              </div>
            </div>
          </div>

          <div className="glass win win--mekko float-b">
            <div className="win__bar">
              <span className="win__app win__app--mekko">M</span>
              <em>Market share.pptx</em>
            </div>
            <div className="mini-mekko">
              {mekko.map((c, ci) => (
                <span key={ci} className="mini-mekko__col" style={{ flexGrow: c.w }}>
                  {c.parts.map((p, pi) => (
                    <span
                      key={pi}
                      className={`mini-mekko__seg mini-mekko__seg--${pi}`}
                      style={{ flexGrow: p, '--delay': `${0.5 + 0.12 * ci + 0.06 * pi}s` }}
                    />
                  ))}
                </span>
              ))}
            </div>
          </div>

          <div className="glass chip chip--quote float-c">
            <span className="chip__ic chip__ic--blue"><Key /></span>
            <span>
              <strong>Quote request sent</strong>
              <small>Foxit PDF Editor+ × 25 licenses</small>
            </span>
          </div>

          <div className="glass chip chip--sign float-d">
            <span className="chip__ic chip__ic--orange"><Sign /></span>
            <span>
              <strong>Contract signed</strong>
              <small>via Foxit eSign · just now</small>
            </span>
            <Check className="chip__ok" />
          </div>
        </div>
      </div>
    </section>
  )
}
