import './Marquee.css'

const WORDS = [
  'Edit', 'Convert', 'Redact', 'eSign', 'Marimekko', 'Bar Mekko', 'Waterfall',
  'Licensing', 'Renewals', 'Upgrades', 'Support',
]

// Endless, slowly scrolling band of what we cover. The list is rendered twice so the
// loop is seamless; the copy is hidden from screen readers.
export default function Marquee() {
  const row = (hidden) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {WORDS.map((w, i) => (
        <li key={w} className={i % 2 ? 'is-alt' : ''}>
          {w}
          <span className="marquee__star" aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="marquee" role="region" aria-label="What we cover">
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
