import { Arrow, Check } from './Icons.jsx'
import './Mekko.css'

// Facts verified against mekkographics.com (Nov 2026).
const chartTypes = [
  'Marimekko', 'Bar Mekko', 'Waterfall', 'Bubble', 'Gantt', 'Bar',
  'Line', 'Area', 'Scatter', 'Pie / Doughnut', 'Table', 'Dashboard',
]

// Illustrative Marimekko: column width = segment size, stacks = share.
const columns = [
  { w: 34, label: 'North', parts: [42, 28, 18, 12] },
  { w: 26, label: 'Europe', parts: [30, 34, 22, 14] },
  { w: 22, label: 'APAC', parts: [24, 26, 32, 18] },
  { w: 18, label: 'LATAM', parts: [36, 20, 24, 20] },
]

export default function Mekko({ onAddToQuote }) {
  return (
    <section className="section mekko" id="mekko">
      <div className="container mekko__inner">
        <div className="mekko__visual" data-reveal aria-hidden="true">
          <div className="mekko__frame">
            <div className="mekko__bar">
              <span /><span /><span />
              <em>Market share by region.pptx</em>
            </div>
            <div className="mekko__chart">
              {columns.map((c, ci) => (
                <div key={c.label} className="mk-col" style={{ flexGrow: c.w }}>
                  <div className="mk-stack">
                    {c.parts.map((p, pi) => (
                      <span
                        key={pi}
                        className={`mk-seg mk-seg--${pi}`}
                        style={{ flexGrow: p, '--delay': `${0.15 * ci + 0.08 * pi}s` }}
                      >
                        <b>{p}%</b>
                      </span>
                    ))}
                  </div>
                  <small>{c.label}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="mekko__badge">
            <strong>PowerPoint</strong> &amp; <strong>Excel</strong>
          </div>
        </div>

        <div className="mekko__copy">
          <span className="eyebrow" data-reveal>Data visualization partner</span>
          <h2 className="section-title" data-reveal style={{ '--d': '0.06s' }}>
            Create compelling charts with <span className="grad-text">Mekko Graphics</span>
          </h2>
          <p className="section-lead" data-reveal style={{ '--d': '0.12s' }}>
            An add-in for PowerPoint and Excel that builds the charts consultants rely on —
            Marimekko, Bar Mekko, waterfall and more — to show market size and share in a single
            view. Spend less time editing slides and keep every chart consistent with saved
            preferences.
          </p>

          <ul className="mekko__types" data-reveal style={{ '--d': '0.18s' }}>
            {chartTypes.map((t) => <li key={t}>{t}</li>)}
          </ul>

          <ul className="mekko__points" data-reveal style={{ '--d': '0.24s' }}>
            <li><Check /> Built for strategy, marketing and finance professionals</li>
            <li><Check /> Chart automation and centralized license management</li>
          </ul>

          <div data-reveal style={{ '--d': '0.3s' }}>
            <a
              href="#contact"
              className="btn btn-primary"
              onClick={(e) => { e.preventDefault(); onAddToQuote(['Mekko Graphics']) }}
            >
              Add Mekko Graphics to quote <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
