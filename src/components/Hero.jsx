import { Arrow, Shield, Bolt, Headset, Check, Sign } from './Icons.jsx'
import './Hero.css'

const bars = [38, 52, 46, 64, 58, 78, 72, 92]

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

        <div className="hero__visual" aria-hidden="true">
          <div className="glass card-doc float-a">
            <div className="card-doc__head">
              <span className="sq" />
              <span className="ln ln--w60" />
            </div>
            <span className="ln ln--w90" />
            <span className="ln ln--w75" />
            <span className="ln ln--w80" />
            <svg className="wave" viewBox="0 0 300 110" preserveAspectRatio="none">
              <defs>
                <linearGradient id="wv1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#3b82f6" stopOpacity=".55" />
                  <stop offset="1" stopColor="#3b82f6" stopOpacity=".05" />
                </linearGradient>
                <linearGradient id="wv2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#2449e8" stopOpacity=".8" />
                  <stop offset="1" stopColor="#2449e8" stopOpacity=".2" />
                </linearGradient>
              </defs>
              <path d="M0 70 C50 30 90 40 140 55 S230 20 300 35 V110 H0Z" fill="url(#wv1)" />
              <path d="M0 90 C60 60 110 85 160 72 S250 50 300 62 V110 H0Z" fill="url(#wv2)" />
            </svg>
          </div>

          <div className="glass card-bars float-b">
            <div className="card-bars__top">
              <span>
                <small>License usage</small>
                <strong>+128%</strong>
              </span>
              <em>Q4</em>
            </div>
            <div className="bars">
              {bars.map((h, i) => (
                <span key={i} style={{ '--h': `${h}%`, '--i': i }} />
              ))}
            </div>
          </div>

          <div className="glass card-donut float-c">
            <svg viewBox="0 0 42 42" className="donut">
              <circle cx="21" cy="21" r="15.9" fill="none" stroke="#e3e9ff" strokeWidth="6" />
              <circle cx="21" cy="21" r="15.9" fill="none" stroke="url(#dg)" strokeWidth="6"
                strokeDasharray="72 28" strokeDashoffset="25" strokeLinecap="round" className="donut__ring" />
              <defs>
                <linearGradient id="dg"><stop offset="0" stopColor="#2449e8" /><stop offset="1" stopColor="#60a5fa" /></linearGradient>
              </defs>
            </svg>
            <div>
              <strong>72%</strong>
              <small>Seats active</small>
            </div>
          </div>

          <div className="glass chip-sign float-d">
            <span className="chip-sign__ic"><Sign /></span>
            <span>
              <strong>Contract signed</strong>
              <small>via Foxit eSign · just now</small>
            </span>
            <Check className="chip-sign__ok" />
          </div>
        </div>
      </div>
    </section>
  )
}
