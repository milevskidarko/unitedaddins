import { useState } from 'react'
import { Arrow, Check, Sign, Phone, Shield, Key } from './Icons.jsx'
import './PlanFinder.css'

// Recommendation rules are based on verified Foxit plan contents (foxit.com, Nov 2026):
// PDF Editor   = Windows, macOS, Web; fill-and-sign only; AI Assistant (300 credits/month)
// PDF Editor+  = + iOS & Android apps, Smart Redact, Foxit eSign with 150 envelopes/year
// Foxit eSign  = dedicated eSignature workflows for higher volumes
const QUESTIONS = [
  {
    id: 'esign',
    short: 'E-signature needs',
    icon: Sign,
    title: 'Do you need to send documents for e-signature?',
    hint: 'Contracts, approvals, HR forms sent to others to sign.',
    options: [
      { value: 'no', label: 'No, I just fill & sign myself' },
      { value: 'some', label: 'Yes, occasionally' },
      { value: 'lots', label: 'Yes, it is a core team workflow' },
    ],
  },
  {
    id: 'mobile',
    short: 'Working on mobile',
    icon: Phone,
    title: 'Do you work with PDFs on mobile?',
    hint: 'Editing or reviewing on iPhone, iPad or Android.',
    options: [
      { value: 'no', label: 'No, desktop & web is enough' },
      { value: 'yes', label: 'Yes, on iOS or Android' },
    ],
  },
  {
    id: 'sensitive',
    short: 'Sensitive data',
    icon: Shield,
    title: 'Do you handle sensitive data that must be removed?',
    hint: 'Personal data, financial or legal information to redact.',
    options: [
      { value: 'no', label: 'Rarely or never' },
      { value: 'yes', label: 'Yes, regularly' },
    ],
  },
  {
    id: 'payment',
    short: 'How you prefer to pay',
    icon: Key,
    title: 'How would you prefer to license it?',
    hint: 'A perpetual license is a one-time purchase for Windows & macOS.',
    options: [
      { value: 'sub', label: 'Subscription — always the latest version' },
      { value: 'once', label: 'One-time purchase (perpetual license)' },
    ],
  },
]

// Perpetual licenses exist for PDF Editor only (Windows & macOS, no AI Assistant or
// cloud features). PDF Editor+ and Foxit eSign are subscription-only.
function recommend(a) {
  const reasons = []
  const lots = a.esign === 'lots'
  const once = a.payment === 'once'
  // Mobile or Smart Redact always need Editor+. Occasional signing is covered by
  // the 150 envelopes in Editor+. High-volume signing is covered by standalone
  // Foxit eSign, so it does not require Editor+ by itself.
  const plus = a.mobile === 'yes' || a.sensitive === 'yes' || a.esign === 'some'

  const perpetualReasons = [
    'One-time purchase — no yearly renewal',
    'Desktop editing on Windows & macOS',
    'Create, edit, convert and fill & sign PDFs',
  ]
  const perpetualNote =
    'The perpetual license does not include AI Assistant, Smart Redact, DMS or cloud features.'

  if (!plus && lots) {
    return {
      products: ['Foxit PDF Editor', 'Foxit eSign'],
      perpetual: once,
      title: once ? 'Foxit PDF Editor (perpetual) & Foxit eSign' : 'Foxit PDF Editor & Foxit eSign',
      tone: 'blue',
      text: once
        ? 'A one-time PDF Editor license for desktop editing, plus a Foxit eSign subscription for team-wide, high-volume signature workflows.'
        : 'PDF Editor for desktop & web editing, plus Foxit eSign for team-wide, high-volume signature workflows.',
      reasons: once
        ? ['Foxit eSign for team-wide, high-volume signing', ...perpetualReasons.slice(0, 2)]
        : [
            'Foxit eSign for team-wide, high-volume signing',
            'Desktop & web editing on Windows, macOS & Web',
            'AI Assistant with 300 free credits per month',
          ],
      note: once ? `${perpetualNote} Foxit eSign is available as a subscription only.` : null,
    }
  }

  if (!plus) {
    if (once) {
      return {
        products: ['Foxit PDF Editor'],
        perpetual: true,
        title: 'Foxit PDF Editor — perpetual license',
        tone: 'orange',
        text: 'Buy once and keep it — professional PDF editing on Windows and macOS without a yearly subscription.',
        reasons: perpetualReasons,
        note: perpetualNote,
      }
    }
    return {
      products: ['Foxit PDF Editor'],
      title: 'Foxit PDF Editor',
      tone: 'orange',
      text: 'Professional PDF editing for Windows, macOS and Web — everything you need to create, edit, convert and fill & sign PDFs.',
      reasons: [
        'Desktop & web editing covers your workflow',
        'Fill & sign included',
        'AI Assistant with 300 free credits per month',
        'Simple per-user subscription',
      ],
    }
  }

  const plusNote = once
    ? 'PDF Editor+ is available as a subscription only — your answers need features (mobile apps, Smart Redact or eSign) that the perpetual license does not include.'
    : null

  if (a.esign === 'some') reasons.push('Includes Foxit eSign with 150 envelopes per year')
  if (a.mobile === 'yes') reasons.push('Mobile apps for iOS & Android')
  if (a.sensitive === 'yes') reasons.push('Smart Redact for removing sensitive data')
  reasons.push('Everything in PDF Editor on Windows, macOS & Web')

  if (lots) {
    return {
      products: ['Foxit PDF Editor+', 'Foxit eSign'],
      title: 'Foxit PDF Editor+ & Foxit eSign',
      tone: 'violet',
      text: 'PDF Editor+ for your team, plus Foxit eSign for high-volume signature workflows beyond the 150 envelopes included with Editor+.',
      reasons: ['Foxit eSign for team-wide, high-volume signing', ...reasons.filter((r) => !r.startsWith('Includes Foxit eSign'))],
      note: plusNote,
    }
  }

  return {
    products: ['Foxit PDF Editor+'],
    title: 'Foxit PDF Editor+',
    tone: 'violet',
    text: 'Everything in PDF Editor, plus the extras your answers call for.',
    reasons,
    note: plusNote,
  }
}

export default function PlanFinder({ onAddToQuote }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const done = step >= QUESTIONS.length
  const result = done ? recommend(answers) : null

  const choose = (id, value) => {
    setAnswers((a) => ({ ...a, [id]: value }))
    setTimeout(() => setStep((s) => s + 1), 180)
  }
  const restart = () => {
    setAnswers({})
    setStep(0)
  }

  const q = QUESTIONS[step]

  return (
    <section className="section finder" id="plan">
      <div className="container finder__inner">
        <div className="finder__copy">
          <span className="eyebrow" data-reveal>Find your plan</span>
          <h2 className="section-title" data-reveal style={{ '--d': '0.06s' }}>
            Not sure which Foxit plan fits? <span className="accent grad-text">Answer 4 questions.</span>
          </h2>
          <p className="section-lead" data-reveal style={{ '--d': '0.12s' }}>
            We&apos;ll recommend the right subscription and add it to your quote request — no need
            to compare feature lists.
          </p>
          <ol className="finder__progress" data-reveal style={{ '--d': '0.18s' }} aria-label="Progress">
            {QUESTIONS.map((qq, i) => (
              <li key={qq.id} className={i < step ? 'is-done' : i === step ? 'is-current' : ''}>
                <span>{i < step ? <Check /> : i + 1}</span>
                {qq.short}
              </li>
            ))}
          </ol>
        </div>

        <div className="finder__card" data-reveal style={{ '--d': '0.1s' }}>
          {!done ? (
            <div className="finder__q" key={q.id}>
              <div className="finder__qhead">
                <span className="finder__qicon"><q.icon /></span>
                <small>Question {step + 1} of {QUESTIONS.length}</small>
              </div>
              <h3>{q.title}</h3>
              <p className="finder__hint">{q.hint}</p>
              <div className="finder__options" role="radiogroup" aria-label={q.title}>
                {q.options.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    role="radio"
                    aria-checked={answers[q.id] === o.value}
                    className={`finder__opt ${answers[q.id] === o.value ? 'is-selected' : ''}`}
                    onClick={() => choose(q.id, o.value)}
                  >
                    <span className="finder__radio" />
                    {o.label}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button type="button" className="finder__back" onClick={() => setStep((s) => s - 1)}>
                  ← Back
                </button>
              )}
            </div>
          ) : (
            <div className={`finder__result finder__result--${result.tone}`}>
              <small>We recommend</small>
              <h3>{result.title}</h3>
              <p>{result.text}</p>
              <ul>
                {result.reasons.map((r) => <li key={r}><Check /> {r}</li>)}
              </ul>
              {result.note && <p className="finder__note">{result.note}</p>}
              <div className="finder__actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onAddToQuote(result.products, { perpetual: Boolean(result.perpetual) })}
                >
                  Add to my quote <Arrow />
                </button>
                <button type="button" className="btn btn-ghost" onClick={restart}>Start over</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
