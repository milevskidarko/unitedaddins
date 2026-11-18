import { Pen, Doc, Sign, Check } from './Icons.jsx'
import { useT } from '../i18n.jsx'

const T = {
  en: { edit: 'Edit', steps: ['Sent', 'Viewed', 'Signed'], sign: 'Sign here' },
  de: { edit: 'Bearbeiten', steps: ['Gesendet', 'Geöffnet', 'Signiert'], sign: 'Hier signieren' },
}

// Small, stylized (illustrative) UI previews — one per Foxit product — so the three
// cards show what each product does instead of repeating the same PDF icon.
export default function ProductPreview({ kind }) {
  const t = useT(T)
  if (kind === 'editor') {
    return (
      <div className="pv pv--editor" aria-hidden="true">
        <div className="pv__toolbar">
          <span className="is-active"><Pen /></span>
          <span><Doc /></span>
          <span><Sign /></span>
          <em>{t.edit}</em>
        </div>
        <div className="pv__doc">
          <span className="pv__ln pv__ln--h" style={{ width: '55%' }} />
          <span className="pv__ln" style={{ width: '90%' }} />
          <span className="pv__ln pv__ln--hl" style={{ width: '70%' }} />
          <span className="pv__ln" style={{ width: '80%' }}>
            <i className="pv__caret" />
          </span>
        </div>
      </div>
    )
  }

  if (kind === 'editorPlus') {
    return (
      <div className="pv pv--plus" aria-hidden="true">
        <div className="pv__doc">
          <span className="pv__row">
            <span className="pv__ln" style={{ width: '30%' }} />
            <span className="pv__redact" style={{ width: '40%' }} />
          </span>
          <span className="pv__ln" style={{ width: '85%' }} />
          <span className="pv__row">
            <span className="pv__redact" style={{ width: '35%', '--rd': '0.5s' }} />
            <span className="pv__ln" style={{ width: '45%' }} />
          </span>
          <span className="pv__ln" style={{ width: '70%' }} />
          <span className="pv__chip">Smart Redact</span>
        </div>
        <div className="pv__phone">
          <span className="pv__ln" style={{ width: '80%' }} />
          <span className="pv__redact" style={{ width: '60%', '--rd': '0.8s' }} />
          <span className="pv__ln" style={{ width: '70%' }} />
          <span className="pv__ln" style={{ width: '50%' }} />
        </div>
      </div>
    )
  }

  // eSign: envelope status + signature
  return (
    <div className="pv pv--esign" aria-hidden="true">
      <ol className="pv__steps">
        {t.steps.map((s, i) => (
          <li key={s} style={{ '--sd': `${0.4 + i * 0.35}s` }}>
            <span><Check /></span>
            {s}
          </li>
        ))}
      </ol>
      <div className="pv__sig">
        <svg viewBox="0 0 160 40">
          <path d="M6 28c10-14 18-20 22-16s-8 20-2 20 14-24 22-22-4 18 2 18 10-10 16-10 4 8 10 8 12-6 20-8 16 2 26-2 14-4 26-4" />
        </svg>
        <small>{t.sign}</small>
      </div>
    </div>
  )
}
