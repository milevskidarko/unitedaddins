import { useState } from 'react'
import { Arrow, Check, Sign, Phone, Shield } from './Icons.jsx'
import './PlanFinder.css'

// Recommendation rules are based on verified Foxit plan contents (foxit.com, Nov 2026):
// PDF Editor   = Windows, macOS, Web; fill-and-sign only
// PDF Editor+  = + iOS & Android apps, AI Smart Redact, Foxit eSign with 150 envelopes/year
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
]

function recommend(a) {
  const reasons = []
  const plus = a.esign !== 'no' || a.mobile === 'yes' || a.sensitive === 'yes'

  if (!plus) {
    return {
      products: ['Foxit PDF Editor'],
      title: 'Foxit PDF Editor',
      tone: 'orange',
      text: 'Professional PDF editing for Windows, macOS and Web — everything you need to create, edit, convert and fill & sign PDFs.',
      reasons: ['Desktop & web editing covers your workflow', 'Fill & sign included', 'Simple per-user subscription'],
    }
  }

  if (a.esign === 'some') reasons.push('Includes Foxit eSign with 150 envelopes per year')
  if (a.mobile === 'yes') reasons.push('Mobile apps for iOS & Android')
  if (a.sensitive === 'yes') reasons.push('AI Smart Redact for removing sensitive data')
  reasons.push('Everything in PDF Editor on Windows, macOS & Web')

  if (a.esign === 'lots') {
    return {
      products: ['Foxit PDF Editor+', 'Foxit eSign'],
      title: 'Foxit PDF Editor+ & Foxit eSign',
      tone: 'violet',
      text: 'PDF Editor+ for your team, plus Foxit eSign for high-volume signature workflows beyond the 150 envelopes included with Editor+.',
      reasons: ['Foxit eSign for team-wide, high-volume signing', ...reasons.filter((r) => !r.startsWith('Includes Foxit eSign'))],
    }
  }

  return {
    products: ['Foxit PDF Editor+'],
    title: 'Foxit PDF Editor+',
    tone: 'violet',
    text: 'Everything in PDF Editor, plus the extras your answers call for.',
    reasons,
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
            Not sure which Foxit plan fits? <span className="grad-text">Answer 3 questions.</span>
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
              <div className="finder__actions">
                <button type="button" className="btn btn-primary" onClick={() => onAddToQuote(result.products)}>
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
