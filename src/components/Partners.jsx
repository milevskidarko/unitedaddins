import { Arrow, Doc, Chart, Key, Check } from './Icons.jsx'
import { L, useT } from '../i18n.jsx'
import './Partners.css'

const ICONS = [Doc, Chart, Key]
const HREFS = ['/foxit', '/mekko-graphics', '/contact']

const T = {
  en: {
    title: 'Our trusted',
    accent: 'partners',
    // Confirmed by United Addins (Nov 2026); "since 2016" per Foxit's Motor Presse Stuttgart
    // case study. Partner tier (Gold/Platinum) is intentionally not stated until Foxit confirms it.
    cred: <>Authorized distributor for <strong>Foxit</strong> (since 2016) and <strong>Mekko Graphics</strong></>,
    label: 'Explore by need',
    needs: [
      ['PDF & eSign', 'Create, edit, protect and sign documents.'],
      ['Data visualization', 'Marimekko, Bar Mekko, waterfall and more.'],
      ['Licensing & renewals', 'New licenses, renewals, upgrades and added seats.'],
    ],
  },
  de: {
    title: 'Unsere starken',
    accent: 'Partner',
    cred: <>Autorisierter Distributor für <strong>Foxit</strong> (seit 2016) und <strong>Mekko Graphics</strong></>,
    label: 'Nach Bedarf entdecken',
    needs: [
      ['PDF & eSign', 'Dokumente erstellen, bearbeiten, schützen und signieren.'],
      ['Datenvisualisierung', 'Marimekko, Bar Mekko, Wasserfall und mehr.'],
      ['Lizenzen & Verlängerungen', 'Neue Lizenzen, Verlängerungen, Upgrades und zusätzliche Plätze.'],
    ],
  },
}

export default function Partners() {
  const t = useT(T)
  return (
    <section className="partners" id="partners">
      <div className="container">
        <div className="partners__card" data-reveal>
          <div className="partners__brands">
            <h2 className="partners__title">{t.title}<br /><span className="accent grad-text">{t.accent}</span></h2>
            <div className="partners__logos">
              <L to="/foxit" className="brand brand--foxit" aria-label="Foxit">Foxit</L>
              <L to="/mekko-graphics" className="brand brand--mekko" aria-label="Mekko Graphics">
                <span>Mekko</span>
                <span>Graphics</span>
              </L>
            </div>
            <p className="partners__cred">
              <Check />
              <span>{t.cred}</span>
            </p>
          </div>

          <div className="partners__needs">
            <p className="partners__label">{t.label}</p>
            <div className="needs">
              {t.needs.map(([title, text], i) => {
                const Icon = ICONS[i]
                return (
                  <L key={i} to={HREFS[i]} className="need spot" data-reveal style={{ '--d': `${0.1 + i * 0.08}s` }}>
                    <span className="need__icon"><Icon /></span>
                    <span className="need__body">
                      <strong>{title}</strong>
                      <small>{text}</small>
                    </span>
                    <Arrow className="need__arrow" />
                  </L>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
