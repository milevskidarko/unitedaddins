import { useState } from 'react'
import { Arrow, Check } from './Icons.jsx'
import './Mekko.css'

// Facts verified against mekkographics.com (Nov 2026).
const chartTypes = [
  'Marimekko', 'Bar Mekko', 'Waterfall', 'Bubble', 'Gantt', 'Bar',
  'Line', 'Area', 'Scatter', 'Pie / Doughnut', 'Table', 'Dashboard',
]

// Illustrative data only — shows what each Mekko Graphics chart type is for.
// Marimekko: column width = market size, stacks = share within the segment.
const columns = [
  { w: 34, label: 'North', parts: [42, 28, 18, 12] },
  { w: 26, label: 'Europe', parts: [30, 34, 22, 14] },
  { w: 22, label: 'APAC', parts: [24, 26, 32, 18] },
  { w: 18, label: 'LATAM', parts: [36, 20, 24, 20] },
]
// Bar Mekko: column width = market size, bar height = growth.
const barMekko = [
  { w: 34, label: 'North', size: '$34B', growth: 6 },
  { w: 26, label: 'Europe', size: '$26B', growth: 4 },
  { w: 22, label: 'APAC', size: '$22B', growth: 11 },
  { w: 18, label: 'LATAM', size: '$18B', growth: 8 },
]
// Waterfall: how revenue moved from one year to the next.
const waterfall = (() => {
  const steps = [
    { label: '2024', v: 100, total: true },
    { label: 'Price', v: 18 },
    { label: 'Volume', v: 12 },
    { label: 'Costs', v: -14 },
    { label: 'FX', v: -6 },
  ]
  let run = 0
  const bars = steps.map((s) => {
    if (s.total) { run = s.v; return { ...s, base: 0, h: s.v } }
    const base = s.v >= 0 ? run : run + s.v
    run += s.v
    return { ...s, base, h: Math.abs(s.v) }
  })
  bars.push({ label: '2025', v: run, total: true, base: 0, h: run })
  return bars
})()
const WF_MAX = 135

const VIEWS = {
  marimekko: {
    tab: 'Marimekko',
    file: 'Market share by region.pptx',
    caption: 'Width = market size · Height = share of each player',
    label: 'Illustrative Marimekko chart: four regions of different market size, each split into four competitor shares.',
  },
  barmekko: {
    tab: 'Bar Mekko',
    file: 'Market size vs. growth.pptx',
    caption: 'Width = market size · Height = growth rate',
    label: 'Illustrative Bar Mekko chart: bar width shows market size and bar height shows growth for four regions.',
  },
  waterfall: {
    tab: 'Waterfall',
    file: 'Revenue bridge 2024–2025.xlsx',
    caption: 'How revenue moved from 2024 to 2025, step by step',
    label: 'Illustrative waterfall chart: revenue from 100 in 2024, plus price and volume, minus costs and FX, to 110 in 2025.',
  },
}

function Chart({ view }) {
  if (view === 'barmekko') {
    const max = Math.max(...barMekko.map((b) => b.growth))
    return (
      <div className="mekko__chart mekko__chart--bar">
        {barMekko.map((c, ci) => (
          <div key={c.label} className="mk-col" style={{ flexGrow: c.w }}>
            <div className="mk-stack mk-stack--bottom">
              <span
                className="mk-seg mk-seg--1"
                style={{ height: `${(c.growth / max) * 88}%`, '--delay': `${0.1 * ci}s` }}
              >
                <b>+{c.growth}%</b>
              </span>
            </div>
            <small>{c.label} <i>{c.size}</i></small>
          </div>
        ))}
      </div>
    )
  }

  if (view === 'waterfall') {
    return (
      <div className="mekko__chart mekko__chart--wf">
        {waterfall.map((b, i) => (
          <div key={b.label} className="mk-col" style={{ flexGrow: 1 }}>
            <div className="mk-stack mk-stack--wf">
              <span
                className={`mk-seg ${b.total ? 'mk-seg--0' : b.v >= 0 ? 'mk-seg--up' : 'mk-seg--down'}`}
                style={{
                  bottom: `${(b.base / WF_MAX) * 100}%`,
                  height: `${(b.h / WF_MAX) * 100}%`,
                  '--delay': `${0.1 * i}s`,
                }}
              >
                <b>{b.total ? b.v : b.v > 0 ? `+${b.v}` : b.v}</b>
              </span>
            </div>
            <small>{b.label}</small>
          </div>
        ))}
      </div>
    )
  }

  return (
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
  )
}

export default function Mekko({ onAddToQuote }) {
  const [view, setView] = useState('marimekko')
  const v = VIEWS[view]

  return (
    <section className="section mekko" id="mekko">
      <div className="container mekko__inner">
        <div className="mekko__visual" data-reveal>
          <div className="mekko__frame">
            <div className="mekko__bar" aria-hidden="true">
              <span /><span /><span />
              <em>{v.file}</em>
            </div>
            <div className="mekko__tabs" role="tablist" aria-label="Example chart type">
              {Object.entries(VIEWS).map(([key, t]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  id={`mk-tab-${key}`}
                  aria-selected={view === key}
                  aria-controls="mk-panel"
                  className={view === key ? 'is-active' : ''}
                  onClick={() => setView(key)}
                >
                  {t.tab}
                </button>
              ))}
            </div>
            <div id="mk-panel" role="tabpanel" aria-labelledby={`mk-tab-${view}`}>
              <div role="img" aria-label={v.label} key={view}>
                <Chart view={view} />
              </div>
              <p className="mekko__caption">{v.caption}</p>
            </div>
          </div>
          <div className="mekko__badge" aria-hidden="true">
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
