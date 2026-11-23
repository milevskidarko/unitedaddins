import { useState } from 'react'
import { Arrow, Check } from './Icons.jsx'
import { L, useT } from '../i18n.jsx'
import './Mekko.css'
import './EfficientElements.css'

// Efficient Elements for presentations — the add-in for PowerPoint by Efficient Elements GmbH.
// Facts checked against efficient-elements.com (/, /powerpoint/, /shop/, /deployment/), Nov 2026.
// The slide demo is illustrative: it mimics three of the add-in's tools (alignment, Smart Elements,
// Check Presentations) so visitors can feel what they do. No prices on purpose, like Mekko.

// Messy and tidy positions of the four boxes on the demo slide (percent of the slide).
const MESSY = [
  { x: 6, y: 34, w: 19, h: 30 },
  { x: 29, y: 39, w: 22, h: 26 },
  { x: 54, y: 31, w: 17, h: 36 },
  { x: 75, y: 42, w: 20, h: 24 },
]
const ALIGNED = {
  top: (b) => b.map((r) => ({ ...r, y: 31 })),
  size: (b) => b.map((r) => ({ ...r, w: 19, h: 32 })),
  spread: (b) => {
    // Same gaps between the boxes, from the left edge of the first to the right edge of the last.
    const left = b[0].x
    const right = b[b.length - 1].x + b[b.length - 1].w
    const total = b.reduce((s, r) => s + r.w, 0)
    const gap = (right - left - total) / (b.length - 1)
    let x = left
    return b.map((r) => {
      const n = { ...r, x }
      x += r.w + gap
      return n
    })
  },
}
const ISSUES = ['font', 'space', 'color', 'footnote']

const T = {
  en: {
    eyebrow: 'Presentation productivity',
    title: 'Better slides in less time with',
    lead: 'The add-in for Microsoft PowerPoint that puts agendas, a slide library, Harvey balls and traffic lights, smart alignment tools and a presentation checker one click away — so your team builds consistent, on-brand slides faster.',
    chips: ['Agenda Wizard', 'Slide library', 'Smart Elements', 'Harvey balls', 'Alignment tools', 'Map Wizard', 'Color palettes', 'Check Presentations'],
    points: ['For Windows and macOS · PowerPoint 2021, 2024 and Microsoft 365', 'Your corporate template and colors built in, updated for every user'],
    add: 'Add Efficient Elements to quote',
    tablist: 'Example tool',
    file: 'Project update.pptx',
    tabs: { align: 'Align', smart: 'Smart Elements', check: 'Check' },
    align: {
      caption: 'Messy boxes? Align, resize and space them in one click each.',
      top: 'Align top',
      size: 'Same size',
      spread: 'Equal spacing',
      reset: 'Mess it up',
      boxes: ['Analyze', 'Design', 'Build', 'Launch'],
      label: 'Illustrative slide with four process boxes that can be aligned with the buttons below.',
    },
    smart: {
      caption: 'Click a Harvey ball or a traffic light to change its status.',
      head: ['Workstream', 'Progress', 'Status'],
      rows: ['Market analysis', 'Pricing model', 'IT integration', 'Training'],
      ball: (n) => `Progress ${n * 25}% — click to change`,
      light: ['On track', 'At risk', 'Off track'],
      lightHint: 'click to change',
    },
    check: {
      caption: 'Check Presentations finds what breaks your corporate design — more than 25 rules.',
      run: 'Check presentation',
      fixAll: 'Fix all',
      fix: 'Fix',
      clean: 'No issues found — ready to send.',
      slideTitle: 'Q3 results  and outlook',
      slideText: 'Revenue grew in all regions',
      issues: {
        font: 'Font is not a corporate font',
        space: 'Double space in title',
        color: 'Color is not in the corporate palette',
        footnote: 'Footnote marker without footnote',
      },
    },
    badge: <>Add-in for <strong>PowerPoint</strong></>,
  },
  de: {
    eyebrow: 'Produktivität für Präsentationen',
    title: 'Bessere Folien in kürzerer Zeit mit',
    lead: 'Das Add-in für Microsoft PowerPoint, das Agenden, eine Folienbibliothek, Harvey Balls und Ampeln, smarte Ausrichtungswerkzeuge und eine Präsentationsprüfung mit einem Klick verfügbar macht — damit Ihr Team schneller einheitliche Folien im Corporate Design erstellt.',
    chips: ['Agenda Wizard', 'Folienbibliothek', 'Smart Elements', 'Harvey Balls', 'Ausrichtungswerkzeuge', 'Map Wizard', 'Farbpaletten', 'Check Presentations'],
    points: ['Für Windows und macOS · PowerPoint 2021, 2024 und Microsoft 365', 'Ihre Firmenvorlage und Farben integriert und für alle Nutzer aktuell'],
    add: 'Efficient Elements zum Angebot hinzufügen',
    tablist: 'Beispielwerkzeug',
    file: 'Projektstand.pptx',
    tabs: { align: 'Ausrichten', smart: 'Smart Elements', check: 'Prüfen' },
    align: {
      caption: 'Unordentliche Kästen? Ausrichten, angleichen und verteilen — mit je einem Klick.',
      top: 'Oben ausrichten',
      size: 'Gleiche Größe',
      spread: 'Gleiche Abstände',
      reset: 'Durcheinander',
      boxes: ['Analyse', 'Konzept', 'Umsetzung', 'Launch'],
      label: 'Beispielfolie mit vier Prozesskästen, die sich mit den Schaltflächen darunter ausrichten lassen.',
    },
    smart: {
      caption: 'Klicken Sie auf einen Harvey Ball oder eine Ampel, um den Status zu ändern.',
      head: ['Arbeitspaket', 'Fortschritt', 'Status'],
      rows: ['Marktanalyse', 'Preismodell', 'IT-Integration', 'Schulung'],
      ball: (n) => `Fortschritt ${n * 25} % — klicken zum Ändern`,
      light: ['Im Plan', 'Gefährdet', 'Kritisch'],
      lightHint: 'klicken zum Ändern',
    },
    check: {
      caption: 'Check Presentations findet, was Ihr Corporate Design verletzt — mit über 25 Regeln.',
      run: 'Präsentation prüfen',
      fixAll: 'Alle beheben',
      fix: 'Beheben',
      clean: 'Keine Probleme gefunden — bereit zum Versand.',
      slideTitle: 'Q3-Ergebnisse  und Ausblick',
      slideText: 'Umsatzwachstum in allen Regionen',
      issues: {
        font: 'Schriftart ist keine Firmenschrift',
        space: 'Doppeltes Leerzeichen im Titel',
        color: 'Farbe ist nicht in der Firmenpalette',
        footnote: 'Fußnotenzeichen ohne Fußnote',
      },
    },
    badge: <>Add-in für <strong>PowerPoint</strong></>,
  },
  fr: {
    eyebrow: 'Productivité des présentations',
    title: 'De meilleures diapositives en moins de temps avec',
    lead: 'Le complément pour Microsoft PowerPoint qui met à portée de clic agendas, bibliothèque de diapositives, Harvey balls et feux tricolores, outils d’alignement intelligents et vérification des présentations — pour que votre équipe crée plus vite des diapositives cohérentes et conformes à votre charte.',
    chips: ['Agenda Wizard', 'Bibliothèque de diapositives', 'Smart Elements', 'Harvey balls', 'Outils d’alignement', 'Map Wizard', 'Palettes de couleurs', 'Check Presentations'],
    points: ['Pour Windows et macOS · PowerPoint 2021, 2024 et Microsoft 365', 'Votre modèle et vos couleurs d’entreprise intégrés, à jour pour chaque utilisateur'],
    add: 'Ajouter Efficient Elements au devis',
    tablist: 'Exemple d’outil',
    file: 'Point projet.pptx',
    tabs: { align: 'Aligner', smart: 'Smart Elements', check: 'Vérifier' },
    align: {
      caption: 'Des formes en désordre ? Alignez, redimensionnez et espacez-les en un clic.',
      top: 'Aligner en haut',
      size: 'Même taille',
      spread: 'Espacement égal',
      reset: 'Tout déranger',
      boxes: ['Analyse', 'Conception', 'Réalisation', 'Lancement'],
      label: 'Diapositive illustrative avec quatre étapes de processus à aligner avec les boutons ci-dessous.',
    },
    smart: {
      caption: 'Cliquez sur un Harvey ball ou un feu pour changer son statut.',
      head: ['Chantier', 'Avancement', 'Statut'],
      rows: ['Analyse de marché', 'Modèle de prix', 'Intégration IT', 'Formation'],
      ball: (n) => `Avancement ${n * 25} % — cliquez pour changer`,
      light: ['Dans les temps', 'À risque', 'En retard'],
      lightHint: 'cliquez pour changer',
    },
    check: {
      caption: 'Check Presentations repère ce qui enfreint votre charte graphique — plus de 25 règles.',
      run: 'Vérifier la présentation',
      fixAll: 'Tout corriger',
      fix: 'Corriger',
      clean: 'Aucun problème détecté — prêt à envoyer.',
      slideTitle: 'Résultats T3  et perspectives',
      slideText: 'Chiffre d’affaires en hausse dans toutes les régions',
      issues: {
        font: 'Police hors charte',
        space: 'Double espace dans le titre',
        color: 'Couleur hors palette de l’entreprise',
        footnote: 'Appel de note sans note de bas de page',
      },
    },
    badge: <>Complément pour <strong>PowerPoint</strong></>,
  },
  es: {
    eyebrow: 'Productividad en presentaciones',
    title: 'Mejores diapositivas en menos tiempo con',
    lead: 'El complemento para Microsoft PowerPoint que pone a un clic agendas, una biblioteca de diapositivas, Harvey balls y semáforos, herramientas de alineación inteligentes y un verificador de presentaciones — para que su equipo cree antes diapositivas coherentes y fieles a su imagen corporativa.',
    chips: ['Agenda Wizard', 'Biblioteca de diapositivas', 'Smart Elements', 'Harvey balls', 'Herramientas de alineación', 'Map Wizard', 'Paletas de colores', 'Check Presentations'],
    points: ['Para Windows y macOS · PowerPoint 2021, 2024 y Microsoft 365', 'Su plantilla y colores corporativos integrados y actualizados para cada usuario'],
    add: 'Añadir Efficient Elements al presupuesto',
    tablist: 'Herramienta de ejemplo',
    file: 'Estado del proyecto.pptx',
    tabs: { align: 'Alinear', smart: 'Smart Elements', check: 'Revisar' },
    align: {
      caption: '¿Formas desordenadas? Alinéelas, iguale su tamaño y espaciado con un clic.',
      top: 'Alinear arriba',
      size: 'Mismo tamaño',
      spread: 'Espaciado igual',
      reset: 'Desordenar',
      boxes: ['Análisis', 'Diseño', 'Desarrollo', 'Lanzamiento'],
      label: 'Diapositiva ilustrativa con cuatro pasos de un proceso que se pueden alinear con los botones de abajo.',
    },
    smart: {
      caption: 'Haga clic en un Harvey ball o un semáforo para cambiar su estado.',
      head: ['Línea de trabajo', 'Avance', 'Estado'],
      rows: ['Análisis de mercado', 'Modelo de precios', 'Integración de TI', 'Formación'],
      ball: (n) => `Avance ${n * 25} % — haga clic para cambiar`,
      light: ['En plazo', 'En riesgo', 'Retrasado'],
      lightHint: 'haga clic para cambiar',
    },
    check: {
      caption: 'Check Presentations detecta lo que rompe su imagen corporativa — más de 25 reglas.',
      run: 'Revisar presentación',
      fixAll: 'Corregir todo',
      fix: 'Corregir',
      clean: 'Sin problemas — lista para enviar.',
      slideTitle: 'Resultados T3  y previsiones',
      slideText: 'Los ingresos crecieron en todas las regiones',
      issues: {
        font: 'La fuente no es corporativa',
        space: 'Doble espacio en el título',
        color: 'Color fuera de la paleta corporativa',
        footnote: 'Llamada de nota sin nota al pie',
      },
    },
    badge: <>Complemento para <strong>PowerPoint</strong></>,
  },
  nl: {
    eyebrow: 'Productiviteit voor presentaties',
    title: 'Betere dia’s in minder tijd met',
    lead: 'De invoegtoepassing voor Microsoft PowerPoint die agenda’s, een diabibliotheek, Harvey balls en stoplichten, slimme uitlijntools en een presentatiecontrole binnen één klik brengt — zodat uw team sneller consistente dia’s in de huisstijl maakt.',
    chips: ['Agenda Wizard', 'Diabibliotheek', 'Smart Elements', 'Harvey balls', 'Uitlijntools', 'Map Wizard', 'Kleurenpaletten', 'Check Presentations'],
    points: ['Voor Windows en macOS · PowerPoint 2021, 2024 en Microsoft 365', 'Uw huisstijlsjabloon en kleuren ingebouwd en actueel voor elke gebruiker'],
    add: 'Efficient Elements toevoegen aan offerte',
    tablist: 'Voorbeeldtool',
    file: 'Projectstatus.pptx',
    tabs: { align: 'Uitlijnen', smart: 'Smart Elements', check: 'Controleren' },
    align: {
      caption: 'Rommelige vormen? Uitlijnen, even groot maken en verdelen — met één klik.',
      top: 'Boven uitlijnen',
      size: 'Zelfde grootte',
      spread: 'Gelijke afstand',
      reset: 'Door elkaar',
      boxes: ['Analyse', 'Ontwerp', 'Bouw', 'Lancering'],
      label: 'Illustratieve dia met vier processtappen die u met de knoppen hieronder kunt uitlijnen.',
    },
    smart: {
      caption: 'Klik op een Harvey ball of stoplicht om de status te wijzigen.',
      head: ['Werkstroom', 'Voortgang', 'Status'],
      rows: ['Marktanalyse', 'Prijsmodel', 'IT-integratie', 'Training'],
      ball: (n) => `Voortgang ${n * 25}% — klik om te wijzigen`,
      light: ['Op schema', 'Risico', 'Achter op schema'],
      lightHint: 'klik om te wijzigen',
    },
    check: {
      caption: 'Check Presentations vindt wat uw huisstijl breekt — met meer dan 25 regels.',
      run: 'Presentatie controleren',
      fixAll: 'Alles herstellen',
      fix: 'Herstellen',
      clean: 'Geen problemen gevonden — klaar om te versturen.',
      slideTitle: 'Resultaten Q3  en vooruitblik',
      slideText: 'Omzet gegroeid in alle regio’s',
      issues: {
        font: 'Lettertype is geen huisstijllettertype',
        space: 'Dubbele spatie in de titel',
        color: 'Kleur valt buiten het huisstijlpalet',
        footnote: 'Voetnootverwijzing zonder voetnoot',
      },
    },
    badge: <>Invoegtoepassing voor <strong>PowerPoint</strong></>,
  },
}

function AlignDemo({ t }) {
  const [boxes, setBoxes] = useState(MESSY)
  const [done, setDone] = useState({})
  const apply = (key) => {
    setBoxes((b) => ALIGNED[key](b))
    setDone((d) => ({ ...d, [key]: true }))
  }
  return (
    <>
      <div className="ee-slide" role="img" aria-label={t.label}>
        <span className="ee-slide__title" />
        {boxes.map((r, i) => (
          <span
            key={i}
            className={`ee-box ee-box--${i}`}
            style={{ left: `${r.x}%`, top: `${r.y}%`, width: `${r.w}%`, height: `${r.h}%` }}
          >
            {t.boxes[i]}
          </span>
        ))}
      </div>
      <div className="ee-actions">
        {['top', 'size', 'spread'].map((k) => (
          <button key={k} type="button" className={done[k] ? 'is-done' : ''} onClick={() => apply(k)}>
            {done[k] && <Check />} {t[k]}
          </button>
        ))}
        <button type="button" className="ee-actions__reset" onClick={() => { setBoxes(MESSY); setDone({}) }}>
          {t.reset}
        </button>
      </div>
    </>
  )
}

function SmartDemo({ t }) {
  const [balls, setBalls] = useState([4, 3, 1, 0])
  const [lights, setLights] = useState([0, 1, 2, 0])
  const cycle = (set, i, n) => set((a) => a.map((v, j) => (j === i ? (v + 1) % n : v)))
  return (
    <div className="ee-slide ee-slide--table">
      <table className="ee-table">
        <thead>
          <tr>{t.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
        </thead>
        <tbody>
          {t.rows.map((row, i) => (
            <tr key={row}>
              <th scope="row">{row}</th>
              <td>
                <button
                  type="button"
                  className="ee-ball"
                  style={{ '--p': `${balls[i] * 25}%` }}
                  aria-label={`${row}: ${t.ball(balls[i])}`}
                  onClick={() => cycle(setBalls, i, 5)}
                />
              </td>
              <td>
                <button
                  type="button"
                  className={`ee-light ee-light--${lights[i]}`}
                  aria-label={`${row}: ${t.light[lights[i]]} — ${t.lightHint}`}
                  onClick={() => cycle(setLights, i, 3)}
                >
                  <span /><span /><span />
                </button>
                <small>{t.light[lights[i]]}</small>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CheckDemo({ t }) {
  const [ran, setRan] = useState(false)
  const [fixed, setFixed] = useState({})
  const open = ISSUES.filter((k) => !fixed[k])
  const fixAll = () => setFixed(Object.fromEntries(ISSUES.map((k) => [k, true])))
  return (
    <>
      <div className={`ee-slide ee-slide--check ${ran ? 'is-checked' : ''}`}>
        <p className={`ee-check__title ${fixed.font ? '' : 'is-bad-font'}`}>
          {fixed.space ? t.slideTitle.replace(/ {2,}/g, ' ') : t.slideTitle}
          {ran && !fixed.font && <i className="ee-flag" aria-hidden="true">1</i>}
          {ran && !fixed.space && <i className="ee-flag" aria-hidden="true">2</i>}
        </p>
        <p className="ee-check__text">
          <span className={fixed.color ? '' : 'is-bad-color'}>{t.slideText}</span>
          {!fixed.footnote && <sup>1</sup>}
          {ran && !fixed.color && <i className="ee-flag" aria-hidden="true">3</i>}
          {ran && !fixed.footnote && <i className="ee-flag" aria-hidden="true">4</i>}
        </p>
        <span className="ee-check__bars" aria-hidden="true"><span /><span /><span /></span>
      </div>
      <div className="ee-check" aria-live="polite">
        {!ran ? (
          <button type="button" className="mk-tools__toggle" onClick={() => setRan(true)}>
            <Check /> {t.run}
          </button>
        ) : open.length === 0 ? (
          <p className="ee-check__ok"><Check /> {t.clean}</p>
        ) : (
          <>
            <ol className="ee-issues">
              {ISSUES.map((k, i) => !fixed[k] && (
                <li key={k}>
                  <span className="ee-issues__n">{i + 1}</span>
                  <span>{t.issues[k]}</span>
                  <button type="button" onClick={() => setFixed((f) => ({ ...f, [k]: true }))}>{t.fix}</button>
                </li>
              ))}
            </ol>
            <button type="button" className="ee-check__all" onClick={fixAll}>{t.fixAll}</button>
          </>
        )}
      </div>
    </>
  )
}

export default function EfficientElements({ onAddToQuote }) {
  const t = useT(T)
  const [view, setView] = useState('align')
  const Demo = view === 'smart' ? SmartDemo : view === 'check' ? CheckDemo : AlignDemo

  return (
    <section className="section mekko ee" id="efficient-elements">
      <div className="container mekko__inner">
        <div className="mekko__copy">
          <span className="eyebrow" data-reveal>{t.eyebrow}</span>
          <h1 className="section-title" data-reveal style={{ '--d': '0.06s' }}>
            {t.title} <span className="grad-text">Efficient Elements</span>
          </h1>
          <p className="section-lead" data-reveal style={{ '--d': '0.12s' }}>{t.lead}</p>

          <ul className="mekko__types" data-reveal style={{ '--d': '0.18s' }}>
            {t.chips.map((x) => <li key={x}>{x}</li>)}
          </ul>

          <ul className="mekko__points" data-reveal style={{ '--d': '0.24s' }}>
            {t.points.map((p) => <li key={p}><Check /> {p}</li>)}
          </ul>

          <div data-reveal style={{ '--d': '0.3s' }}>
            <L
              to="/contact#quote"
              className="btn btn-primary"
              onClick={(e) => { e.preventDefault(); onAddToQuote(['Efficient Elements']) }}
            >
              {t.add} <Arrow />
            </L>
          </div>
        </div>

        <div className="mekko__visual" data-reveal>
          <div className="mekko__frame">
            <div className="mekko__bar" aria-hidden="true">
              <span /><span /><span />
              <em>{t.file}</em>
            </div>
            <div className="mekko__tabs" role="tablist" aria-label={t.tablist}>
              {Object.entries(t.tabs).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  id={`ee-tab-${key}`}
                  aria-selected={view === key}
                  aria-controls="ee-panel"
                  className={view === key ? 'is-active' : ''}
                  onClick={() => setView(key)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div id="ee-panel" role="tabpanel" aria-labelledby={`ee-tab-${view}`} className="ee-panel">
              <Demo key={view} t={t[view]} />
              <p className="mekko__caption">{t[view].caption}</p>
            </div>
          </div>
          <div className="mekko__badge" aria-hidden="true">{t.badge}</div>
        </div>
      </div>
    </section>
  )
}
