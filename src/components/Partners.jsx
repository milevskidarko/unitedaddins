import { Arrow, Doc, Chart, Cubes, Check } from './Icons.jsx'
import './Partners.css'

const needs = [
  { icon: Doc, title: 'PDF & eSign', text: 'Create, edit, protect and sign documents.', href: '#foxit' },
  { icon: Chart, title: 'Data visualization', text: 'Marimekko, Bar Mekko, waterfall and more.', href: '#mekko' },
  { icon: Cubes, title: 'Business software', text: 'Curated add-ins for every team.', href: '#contact' },
]

export default function Partners() {
  return (
    <section className="partners" id="partners">
      <div className="container">
        <div className="partners__card" data-reveal>
          <div className="partners__brands">
            <h2 className="partners__title">Our trusted<br /><span className="accent grad-text">partners</span></h2>
            <div className="partners__logos">
              <a href="#foxit" className="brand brand--foxit" aria-label="Foxit">Foxit</a>
              <a href="#mekko" className="brand brand--mekko" aria-label="Mekko Graphics">
                <span>Mekko</span>
                <span>Graphics</span>
              </a>
            </div>
            {/* Confirmed by United Addins (Nov 2026); "since 2016" per Foxit's Motor Presse Stuttgart
                case study. Partner tier (Gold/Platinum) is intentionally not stated until Foxit confirms it. */}
            <p className="partners__cred">
              <Check />
              <span>
                Authorized distributor for <strong>Foxit</strong> (since 2016) and <strong>Mekko Graphics</strong>
              </span>
            </p>
          </div>

          <div className="partners__needs">
            <p className="partners__label">Explore by need</p>
            <div className="needs">
              {needs.map((n, i) => (
                <a key={n.title} href={n.href} className="need spot" data-reveal style={{ '--d': `${0.1 + i * 0.08}s` }}>
                  <span className="need__icon"><n.icon /></span>
                  <span className="need__body">
                    <strong>{n.title}</strong>
                    <small>{n.text}</small>
                  </span>
                  <Arrow className="need__arrow" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
