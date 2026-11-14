import { Award, Key, Headset, Handshake } from './Icons.jsx'
import './WhyUs.css'

const items = [
  { icon: Award, title: 'Product expertise', text: 'Trusted advice on the best solutions for your needs — before and after you buy.' },
  { icon: Key, title: 'Licensing support', text: 'Flexible licensing options for organizations of any size, from a single seat to enterprise.' },
  { icon: Headset, title: 'Partner-first service', text: 'Responsive support every step of the way — onboarding, renewals and upgrades.' },
  { icon: Handshake, title: 'One trusted contact', text: 'Multiple vendors, one partner. Simplify procurement and keep everything in one place.' },
]

const steps = [
  { n: '01', title: 'Tell us your needs', text: 'Share your team size, workflows and goals.' },
  { n: '02', title: 'Get the right fit', text: 'We recommend the products and licenses that match.' },
  { n: '03', title: 'Deploy & grow', text: 'Fast licensing, onboarding and ongoing support.' },
]

export default function WhyUs() {
  return (
    <section className="section why" id="why">
      <div className="why__bg" aria-hidden="true">
        <span /><span />
        <i className="noise" />
      </div>
      <div className="container why__inner">
        <div className="why__head">
          <div data-reveal>
            <span className="eyebrow eyebrow--light">Why United Addins</span>
            <h2 className="section-title">
              Software distribution built around <span className="accent grad-text why__accent">your business</span>
            </h2>
          </div>
          <p className="section-lead why__lead" data-reveal style={{ '--d': '0.1s' }}>
            With deep product knowledge and a partner-first approach, United Addins helps you get
            more from the software you trust.
          </p>
        </div>

        <div className="why__grid">
          {items.map((it, i) => (
            <article key={it.title} className="why-card spot" data-reveal style={{ '--d': `${i * 0.08}s` }}>
              <span className="why-card__icon"><it.icon /></span>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </article>
          ))}
        </div>

        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.n} className="step" data-reveal style={{ '--d': `${i * 0.1}s` }}>
              <span className="step__n">{s.n}</span>
              <div>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
