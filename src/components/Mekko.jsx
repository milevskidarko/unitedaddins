import { useState } from 'react'
import { Arrow, Check } from './Icons.jsx'
import { L, useT } from '../i18n.jsx'
import './Mekko.css'

// Illustrative data only — shows what each Mekko Graphics chart type is for.
// Visitors can edit it in the data sheet under the chart (like Mekko's own Excel data sheet).
const DEFAULTS = {
  // Marimekko: column width = market size, stacks = each player's share within the segment.
  marimekko: [
    { w: 34, parts: [42, 28, 18, 12] },
    { w: 26, parts: [30, 34, 22, 14] },
    { w: 22, parts: [24, 26, 32, 18] },
    { w: 18, parts: [36, 20, 24, 20] },
  ],
  // Bar Mekko: column width = market size, bar height = growth.
  barmekko: [
    { w: 34, growth: 6 },
    { w: 26, growth: 4 },
    { w: 22, growth: 11 },
    { w: 18, growth: 8 },
  ],
  // Waterfall: start value, then the steps that move it.
  waterfall: { start: 100, steps: [18, 12, -14, -6] },
}
const LIMITS = { w: [1, 999], part: [0, 999], growth: [0, 60], start: [1, 999], step: [-200, 200] }
const clamp = (v, [lo, hi]) => Math.max(lo, Math.min(hi, Number.isFinite(v) ? v : 0))
const rnd = (lo, hi) => Math.round(lo + Math.random() * (hi - lo))

// Facts verified against mekkographics.com (Nov 2026).
const T = {
  en: {
    eyebrow: 'Data visualization partner',
    title: 'Create compelling charts with',
    lead: 'An add-in for PowerPoint and Excel that builds the charts consultants rely on — Marimekko, Bar Mekko, waterfall and more — to show market size and share in a single view. Spend less time editing slides and keep every chart consistent with saved preferences.',
    types: ['Marimekko', 'Bar Mekko', 'Waterfall', 'Bubble', 'Gantt', 'Bar', 'Line', 'Area', 'Scatter', 'Pie / Doughnut', 'Table', 'Dashboard'],
    points: ['Built for strategy, marketing and finance professionals', 'Chart automation and centralized license management'],
    add: 'Add Mekko Graphics to quote',
    tablist: 'Example chart type',
    regions: ['North', 'Europe', 'APAC', 'LATAM'],
    players: ['Player A', 'Player B', 'Player C', 'Player D'],
    stepLabels: ['Price', 'Volume', 'Costs', 'FX'],
    years: ['2024', '2025'],
    size: 'Market size ($B)',
    growth: 'Growth (%)',
    value: 'Value',
    region: 'Region',
    step: 'Step',
    tryIt: 'Try it — edit the data',
    hide: 'Hide data sheet',
    shuffle: 'Shuffle',
    reset: 'Reset',
    sheetHint: 'Change any number — the chart redraws instantly, just like in PowerPoint.',
    total: 'Result',
    views: {
      marimekko: {
        tab: 'Marimekko',
        file: 'Market share by region.pptx',
        caption: 'Width = market size · Height = share of each player',
        label: 'Illustrative Marimekko chart: regions of different market size, each split into competitor shares.',
      },
      barmekko: {
        tab: 'Bar Mekko',
        file: 'Market size vs. growth.pptx',
        caption: 'Width = market size · Height = growth rate',
        label: 'Illustrative Bar Mekko chart: bar width shows market size and bar height shows growth per region.',
      },
      waterfall: {
        tab: 'Waterfall',
        file: 'Revenue bridge 2024–2025.xlsx',
        caption: 'How revenue moved from 2024 to 2025, step by step',
        label: 'Illustrative waterfall chart: revenue in 2024, the steps that changed it, and the result in 2025.',
      },
    },
    badge: <><strong>PowerPoint</strong> &amp; <strong>Excel</strong></>,
  },
  de: {
    eyebrow: 'Partner für Datenvisualisierung',
    title: 'Überzeugende Diagramme mit',
    lead: 'Ein Add-in für PowerPoint und Excel, das die Diagramme erstellt, auf die sich Berater verlassen — Marimekko, Bar Mekko, Wasserfall und mehr —, um Marktgröße und Marktanteil in einer Ansicht zu zeigen. Weniger Zeit für die Folienbearbeitung und einheitliche Diagramme dank gespeicherter Voreinstellungen.',
    types: ['Marimekko', 'Bar Mekko', 'Wasserfall', 'Blasen', 'Gantt', 'Balken', 'Linie', 'Fläche', 'Streudiagramm', 'Kreis / Ring', 'Tabelle', 'Dashboard'],
    points: ['Entwickelt für Strategie-, Marketing- und Finanzprofis', 'Diagrammautomatisierung und zentrale Lizenzverwaltung'],
    add: 'Mekko Graphics zum Angebot hinzufügen',
    tablist: 'Beispiel-Diagrammtyp',
    regions: ['Nord', 'Europa', 'APAC', 'LATAM'],
    players: ['Anbieter A', 'Anbieter B', 'Anbieter C', 'Anbieter D'],
    stepLabels: ['Preis', 'Volumen', 'Kosten', 'Währung'],
    years: ['2024', '2025'],
    size: 'Marktgröße (Mrd. $)',
    growth: 'Wachstum (%)',
    value: 'Wert',
    region: 'Region',
    step: 'Schritt',
    tryIt: 'Ausprobieren — Daten bearbeiten',
    hide: 'Datenblatt ausblenden',
    shuffle: 'Zufallswerte',
    reset: 'Zurücksetzen',
    sheetHint: 'Ändern Sie eine beliebige Zahl — das Diagramm aktualisiert sich sofort, wie in PowerPoint.',
    total: 'Ergebnis',
    views: {
      marimekko: {
        tab: 'Marimekko',
        file: 'Marktanteile nach Region.pptx',
        caption: 'Breite = Marktgröße · Höhe = Anteil jedes Anbieters',
        label: 'Beispielhaftes Marimekko-Diagramm: Regionen unterschiedlicher Marktgröße, jeweils aufgeteilt in Wettbewerberanteile.',
      },
      barmekko: {
        tab: 'Bar Mekko',
        file: 'Marktgröße vs. Wachstum.pptx',
        caption: 'Breite = Marktgröße · Höhe = Wachstumsrate',
        label: 'Beispielhaftes Bar-Mekko-Diagramm: Balkenbreite zeigt die Marktgröße, Balkenhöhe das Wachstum je Region.',
      },
      waterfall: {
        tab: 'Wasserfall',
        file: 'Umsatzbrücke 2024–2025.xlsx',
        caption: 'Wie sich der Umsatz von 2024 bis 2025 Schritt für Schritt verändert hat',
        label: 'Beispielhaftes Wasserfalldiagramm: Umsatz 2024, die Veränderungsschritte und das Ergebnis 2025.',
      },
    },
    badge: <><strong>PowerPoint</strong> &amp; <strong>Excel</strong></>,
  },
  fr: {
    eyebrow: 'Partenaire en visualisation de données',
    title: 'Des graphiques percutants avec',
    lead: 'Un complément pour PowerPoint et Excel qui crée les graphiques sur lesquels comptent les consultants — Marimekko, Bar Mekko, cascade et plus — pour montrer taille et parts de marché en une seule vue. Passez moins de temps à retoucher vos diapositives et gardez des graphiques cohérents grâce aux préférences enregistrées.',
    types: ['Marimekko', 'Bar Mekko', 'Cascade', 'Bulles', 'Gantt', 'Barres', 'Courbes', 'Aires', 'Nuage de points', 'Secteurs / Anneau', 'Tableau', 'Tableau de bord'],
    points: ['Conçu pour les professionnels de la stratégie, du marketing et de la finance', 'Automatisation des graphiques et gestion centralisée des licences'],
    add: 'Ajouter Mekko Graphics au devis',
    tablist: 'Exemple de type de graphique',
    regions: ['Nord', 'Europe', 'APAC', 'LATAM'],
    players: ['Acteur A', 'Acteur B', 'Acteur C', 'Acteur D'],
    stepLabels: ['Prix', 'Volume', 'Coûts', 'Change'],
    years: ['2024', '2025'],
    size: 'Taille du marché (Md$)',
    growth: 'Croissance (%)',
    value: 'Valeur',
    region: 'Région',
    step: 'Étape',
    tryIt: 'Essayez — modifiez les données',
    hide: 'Masquer la feuille de données',
    shuffle: 'Mélanger',
    reset: 'Réinitialiser',
    sheetHint: 'Modifiez un chiffre — le graphique se redessine instantanément, comme dans PowerPoint.',
    total: 'Résultat',
    views: {
      marimekko: {
        tab: 'Marimekko',
        file: 'Parts de marché par région.pptx',
        caption: 'Largeur = taille du marché · Hauteur = part de chaque acteur',
        label: 'Graphique Marimekko illustratif : des régions de tailles de marché différentes, chacune répartie entre les parts des concurrents.',
      },
      barmekko: {
        tab: 'Bar Mekko',
        file: 'Taille du marché vs croissance.pptx',
        caption: 'Largeur = taille du marché · Hauteur = taux de croissance',
        label: 'Graphique Bar Mekko illustratif : la largeur des barres montre la taille du marché et leur hauteur la croissance par région.',
      },
      waterfall: {
        tab: 'Cascade',
        file: 'Pont de chiffre d’affaires 2024–2025.xlsx',
        caption: 'Comment le chiffre d’affaires a évolué de 2024 à 2025, étape par étape',
        label: 'Graphique en cascade illustratif : le chiffre d’affaires 2024, les étapes qui l’ont modifié et le résultat 2025.',
      },
    },
    badge: <><strong>PowerPoint</strong> &amp; <strong>Excel</strong></>,
  },
}

function Marimekko({ data, t }) {
  return (
    <>
      <div className="mekko__chart">
        {data.map((c, ci) => {
          const sum = c.parts.reduce((a, b) => a + b, 0) || 1
          return (
            <div key={ci} className="mk-col" style={{ flexGrow: c.w }}>
              <div className="mk-stack">
                {c.parts.map((p, pi) => {
                  const share = Math.round((p / sum) * 100)
                  return (
                    <span
                      key={pi}
                      className={`mk-seg mk-seg--${pi}`}
                      style={{ flexGrow: p, '--delay': `${0.15 * ci + 0.08 * pi}s` }}
                      title={`${t.regions[ci]} · ${t.players[pi]}: ${share}%`}
                    >
                      {share >= 7 && <b>{share}%</b>}
                    </span>
                  )
                })}
              </div>
              <small>{t.regions[ci]} <i>${c.w}B</i></small>
            </div>
          )
        })}
      </div>
      <ul className="mk-legend">
        {t.players.map((p, i) => <li key={p}><span className={`mk-seg--${i}`} />{p}</li>)}
      </ul>
    </>
  )
}

function BarMekko({ data, t }) {
  const max = Math.max(...data.map((b) => b.growth), 1)
  return (
    <div className="mekko__chart mekko__chart--bar">
      {data.map((c, ci) => (
        <div key={ci} className="mk-col" style={{ flexGrow: c.w }}>
          <div className="mk-stack mk-stack--bottom">
            <span
              className="mk-seg mk-seg--1"
              style={{ height: `${(c.growth / max) * 88}%`, '--delay': `${0.1 * ci}s` }}
            >
              <b>+{c.growth}%</b>
            </span>
          </div>
          <small>{t.regions[ci]} <i>${c.w}B</i></small>
        </div>
      ))}
    </div>
  )
}

function waterfallBars({ start, steps }, t) {
  let run = start
  const bars = [{ label: t.years[0], v: start, total: true, from: 0, to: start }]
  steps.forEach((v, i) => {
    bars.push({ label: t.stepLabels[i], v, from: run, to: run + v })
    run += v
  })
  bars.push({ label: t.years[1], v: run, total: true, from: 0, to: run })
  return bars
}

function Waterfall({ data, t }) {
  const bars = waterfallBars(data, t)
  const lo = Math.min(0, ...bars.map((b) => Math.min(b.from, b.to)))
  const hi = Math.max(...bars.map((b) => Math.max(b.from, b.to))) * 1.12 || 1
  const pos = (v) => ((v - lo) / (hi - lo)) * 100
  return (
    <div className="mekko__chart mekko__chart--wf">
      {bars.map((b, i) => (
        <div key={i} className="mk-col" style={{ flexGrow: 1 }}>
          <div className="mk-stack mk-stack--wf">
            <span
              className={`mk-seg ${b.total ? 'mk-seg--0' : b.v >= 0 ? 'mk-seg--up' : 'mk-seg--down'}`}
              style={{
                bottom: `${pos(Math.min(b.from, b.to))}%`,
                height: `${Math.abs(pos(b.to) - pos(b.from))}%`,
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

// Number cell of the data sheet. Keeps what is being typed (e.g. a lone "-") as a draft
// and updates the chart whenever it is a valid number.
function Cell({ value, onChange, limits, label }) {
  const [draft, setDraft] = useState(null)
  return (
    <td>
      <input
        type="number"
        inputMode={limits[0] < 0 ? 'text' : 'numeric'}
        min={limits[0]}
        max={limits[1]}
        value={draft ?? value}
        aria-label={label}
        onFocus={(e) => e.target.select()}
        onChange={(e) => {
          setDraft(e.target.value)
          const n = Number.parseInt(e.target.value, 10)
          if (Number.isFinite(n)) onChange(clamp(n, limits))
        }}
        onBlur={() => setDraft(null)}
      />
    </td>
  )
}

function DataSheet({ view, data, setData, t }) {
  if (view === 'marimekko') {
    const set = (ci, pi, v) =>
      setData((d) => d.map((c, i) => (i !== ci ? c : pi === 'w' ? { ...c, w: v } : { ...c, parts: c.parts.map((p, j) => (j === pi ? v : p)) })))
    return (
      <table className="mk-sheet">
        <thead>
          <tr>
            <th scope="col">{t.region}</th>
            <th scope="col">{t.size}</th>
            {t.players.map((p, i) => <th key={p} scope="col"><span className={`mk-dot mk-seg--${i}`} />{p}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((c, ci) => (
            <tr key={ci}>
              <th scope="row">{t.regions[ci]}</th>
              <Cell value={c.w} limits={LIMITS.w} label={`${t.regions[ci]} — ${t.size}`} onChange={(v) => set(ci, 'w', v)} />
              {c.parts.map((p, pi) => (
                <Cell key={pi} value={p} limits={LIMITS.part} label={`${t.regions[ci]} — ${t.players[pi]}`} onChange={(v) => set(ci, pi, v)} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  if (view === 'barmekko') {
    const set = (ci, key, v) => setData((d) => d.map((c, i) => (i === ci ? { ...c, [key]: v } : c)))
    return (
      <table className="mk-sheet">
        <thead>
          <tr>
            <th scope="col">{t.region}</th>
            <th scope="col">{t.size}</th>
            <th scope="col">{t.growth}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((c, ci) => (
            <tr key={ci}>
              <th scope="row">{t.regions[ci]}</th>
              <Cell value={c.w} limits={LIMITS.w} label={`${t.regions[ci]} — ${t.size}`} onChange={(v) => set(ci, 'w', v)} />
              <Cell value={c.growth} limits={LIMITS.growth} label={`${t.regions[ci]} — ${t.growth}`} onChange={(v) => set(ci, 'growth', v)} />
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  const end = data.start + data.steps.reduce((a, b) => a + b, 0)
  return (
    <table className="mk-sheet">
      <thead>
        <tr>
          <th scope="col">{t.step}</th>
          <th scope="col">{t.value}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{t.years[0]}</th>
          <Cell value={data.start} limits={LIMITS.start} label={t.years[0]} onChange={(v) => setData((d) => ({ ...d, start: v }))} />
        </tr>
        {data.steps.map((s, i) => (
          <tr key={i}>
            <th scope="row">{t.stepLabels[i]}</th>
            <Cell
              value={s}
              limits={LIMITS.step}
              label={t.stepLabels[i]}
              onChange={(v) => setData((d) => ({ ...d, steps: d.steps.map((x, j) => (j === i ? v : x)) }))}
            />
          </tr>
        ))}
        <tr className="mk-sheet__total">
          <th scope="row">{t.years[1]} · {t.total}</th>
          <td><output>{end}</output></td>
        </tr>
      </tbody>
    </table>
  )
}

function shuffled(view) {
  if (view === 'marimekko') return DEFAULTS.marimekko.map(() => ({ w: rnd(10, 40), parts: [0, 0, 0, 0].map(() => rnd(8, 45)) }))
  if (view === 'barmekko') return DEFAULTS.barmekko.map(() => ({ w: rnd(10, 40), growth: rnd(2, 18) }))
  return { start: rnd(80, 120), steps: [rnd(5, 25), rnd(-5, 20), rnd(-25, -4), rnd(-12, 6)] }
}

export default function Mekko({ onAddToQuote }) {
  const t = useT(T)
  const [view, setView] = useState('marimekko')
  const [data, setAll] = useState(DEFAULTS)
  const [sheet, setSheet] = useState(false)
  const v = t.views[view]
  const setData = (fn) => setAll((all) => ({ ...all, [view]: typeof fn === 'function' ? fn(all[view]) : fn }))
  const Chart = view === 'barmekko' ? BarMekko : view === 'waterfall' ? Waterfall : Marimekko

  return (
    <section className="section mekko" id="mekko">
      <div className="container mekko__inner">
        <div className="mekko__copy">
          <span className="eyebrow" data-reveal>{t.eyebrow}</span>
          <h1 className="section-title" data-reveal style={{ '--d': '0.06s' }}>
            {t.title} <span className="grad-text">Mekko Graphics</span>
          </h1>
          <p className="section-lead" data-reveal style={{ '--d': '0.12s' }}>{t.lead}</p>

          <ul className="mekko__types" data-reveal style={{ '--d': '0.18s' }}>
            {t.types.map((x) => <li key={x}>{x}</li>)}
          </ul>

          <ul className="mekko__points" data-reveal style={{ '--d': '0.24s' }}>
            {t.points.map((p) => <li key={p}><Check /> {p}</li>)}
          </ul>

          <div data-reveal style={{ '--d': '0.3s' }}>
            <L
              to="/contact#quote"
              className="btn btn-primary"
              onClick={(e) => { e.preventDefault(); onAddToQuote(['Mekko Graphics']) }}
            >
              {t.add} <Arrow />
            </L>
          </div>
        </div>

        <div className="mekko__visual" data-reveal>
          <div className="mekko__frame">
            <div className="mekko__bar" aria-hidden="true">
              <span /><span /><span />
              <em>{v.file}</em>
            </div>
            <div className="mekko__tabs" role="tablist" aria-label={t.tablist}>
              {Object.entries(t.views).map(([key, tv]) => (
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
                  {tv.tab}
                </button>
              ))}
            </div>
            <div id="mk-panel" role="tabpanel" aria-labelledby={`mk-tab-${view}`}>
              <div role="img" aria-label={v.label} key={view}>
                <Chart data={data[view]} t={t} />
              </div>
              <p className="mekko__caption">{v.caption}</p>

              <div className={`mk-tools ${sheet ? 'is-open' : ''}`}>
                <div className="mk-tools__bar">
                  <button
                    type="button"
                    className="mk-tools__toggle"
                    aria-expanded={sheet}
                    aria-controls="mk-sheet"
                    onClick={() => setSheet((s) => !s)}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3zM3 10h18M3 15h18M9 5v14" /></svg>
                    {sheet ? t.hide : t.tryIt}
                  </button>
                  <div className="mk-tools__actions">
                    <button type="button" onClick={() => { setData(shuffled(view)); setSheet(true) }}>{t.shuffle}</button>
                    <button type="button" onClick={() => setData(DEFAULTS[view])}>{t.reset}</button>
                  </div>
                </div>
                <div className="mk-tools__sheet" id="mk-sheet" hidden={!sheet}>
                  <p className="mk-tools__hint">{t.sheetHint}</p>
                  <div className="mk-sheet__wrap">
                    <DataSheet view={view} data={data[view]} setData={setData} t={t} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mekko__badge" aria-hidden="true">{t.badge}</div>
        </div>
      </div>
    </section>
  )
}
