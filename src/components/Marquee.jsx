import { useT } from '../i18n.jsx'
import './Marquee.css'

const T = {
  en: {
    label: 'What we cover',
    words: ['Edit', 'Convert', 'Redact', 'eSign', 'Marimekko', 'Bar Mekko', 'Waterfall', 'Licensing', 'Renewals', 'Upgrades', 'Support'],
  },
  de: {
    label: 'Was wir abdecken',
    words: ['Bearbeiten', 'Konvertieren', 'Schwärzen', 'eSign', 'Marimekko', 'Bar Mekko', 'Wasserfall', 'Lizenzen', 'Verlängerungen', 'Upgrades', 'Support'],
  },
  fr: {
    label: 'Ce que nous couvrons',
    words: ['Modifier', 'Convertir', 'Caviarder', 'eSign', 'Marimekko', 'Bar Mekko', 'Cascade', 'Licences', 'Renouvellements', 'Mises à niveau', 'Support'],
  },
  es: {
    label: 'Lo que cubrimos',
    words: ['Editar', 'Convertir', 'Censurar', 'eSign', 'Marimekko', 'Bar Mekko', 'Cascada', 'Licencias', 'Renovaciones', 'Actualizaciones', 'Soporte'],
  },
  nl: {
    label: 'Wat wij bieden',
    words: ['Bewerken', 'Converteren', 'Redigeren', 'eSign', 'Marimekko', 'Bar Mekko', 'Waterval', 'Licenties', 'Verlengingen', 'Upgrades', 'Support'],
  },
}

// Endless, slowly scrolling band of what we cover. The list is rendered twice so the
// loop is seamless; the copy is hidden from screen readers.
export default function Marquee() {
  const t = useT(T)
  const row = (hidden) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {t.words.map((w, i) => (
        <li key={w} className={i % 2 ? 'is-alt' : ''}>
          {w}
          <span className="marquee__star" aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="marquee" role="region" aria-label={t.label}>
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
