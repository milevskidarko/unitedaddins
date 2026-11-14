import { useState } from 'react'
import { Arrow, Check, Mail } from './Icons.jsx'
import './Contact.css'

const SALES_EMAIL = 'sales@unitedaddins.com'
// TEMPORARY: until the site is approved for go-live, quote requests are delivered to the developer's
// inbox. The UI still shows SALES_EMAIL. Before going live, set this back to SALES_EMAIL.
const DELIVERY_EMAIL = 'milevskidarko89@gmail.com'
// Where quote requests are delivered. Can also be overridden in .env.local (VITE_FORM_EMAIL=you@example.com).
// FormSubmit sends a one-time activation email to each new address.
const FORM_EMAIL = import.meta.env.VITE_FORM_EMAIL || DELIVERY_EMAIL
const ENDPOINT = `https://formsubmit.co/ajax/${FORM_EMAIL}`

const PRODUCTS = [
  { name: 'Foxit PDF Editor', note: 'Windows, macOS, Web', tone: 'orange' },
  { name: 'Foxit PDF Editor+', note: '+ mobile, Smart Redact, eSign', tone: 'violet' },
  { name: 'Foxit eSign', note: 'eSignature workflows', tone: 'blue' },
  { name: 'Mekko Graphics', note: 'Charts in PowerPoint & Excel', tone: 'navy' },
]
// Each request type changes the wording and the extra fields of the form.
const TYPES = {
  'New purchase': {
    hint: 'Buying licenses for the first time.',
    productsLegend: 'Products & licenses',
    unit: 'licenses',
    fields: [],
  },
  Renewal: {
    hint: 'Renew your existing subscription — we will review your current terms.',
    productsLegend: 'Products to renew',
    unit: 'licenses to renew',
    fields: [
      { name: 'expiryDate', label: 'Current subscription expires', type: 'date' },
      { name: 'reference', label: 'Order or license reference (optional)', type: 'text' },
    ],
  },
  Upgrade: {
    hint: 'Move to a higher plan, for example from PDF Editor to PDF Editor+.',
    productsLegend: 'Upgrade to',
    unit: 'licenses to upgrade',
    fields: [
      {
        name: 'currentPlan',
        label: 'Current plan',
        type: 'select',
        options: ['Foxit PDF Editor', 'Foxit PDF Editor+', 'Foxit eSign', 'Mekko Graphics', 'Other / not sure'],
      },
      { name: 'reference', label: 'Order or license reference (optional)', type: 'text' },
    ],
  },
  'Add seats': {
    hint: 'Add licenses to the subscription you already have.',
    productsLegend: 'Products & additional licenses',
    unit: 'additional licenses',
    fields: [
      { name: 'currentSeats', label: 'Licenses you have now', type: 'number' },
      { name: 'reference', label: 'Order or license reference (optional)', type: 'text' },
    ],
  },
}
const FIELD_LABELS = {
  expiryDate: 'Current subscription expires',
  reference: 'Order / license reference',
  currentPlan: 'Current plan',
  currentSeats: 'Licenses they have now',
}
const MAX_SEATS = 9999

export default function Contact({ quote, setQuote }) {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const items = quote.items
  const type = TYPES[quote.type]
  const selected = PRODUCTS.filter((p) => items[p.name])
  const summary = selected.map((p) => `${p.name} × ${items[p.name]} ${type.unit}`).join(', ')

  const toggle = (name) =>
    setQuote((q) => {
      const next = { ...q.items }
      if (next[name]) delete next[name]
      else next[name] = 1
      return { ...q, items: next }
    })

  const setSeats = (name, value) => {
    const n = Math.max(1, Math.min(MAX_SEATS, Number.parseInt(value, 10) || 1))
    setQuote((q) => ({ ...q, items: { ...q.items, [name]: n } }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (data._honey) return // spam bot
    if (!selected.length) {
      setError('Please select at least one product for your quote.')
      return
    }

    setSending(true)
    setError('')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `${quote.type} — ${summary} (${data.company || data.email})`,
          _replyto: data.email,
          _template: 'table',
          _captcha: 'false',
          'Request type': quote.type,
          Products: summary,
          ...Object.fromEntries(
            type.fields
              .filter((f) => data[f.name])
              .map((f) => [FIELD_LABELS[f.name], data[f.name]])
          ),
          'First name': data.firstName,
          'Last name': data.lastName,
          Email: data.email,
          Company: data.company,
          Message: data.message,
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || json.success === 'false' || json.success === false) throw new Error(json.message)
      form.reset()
      setQuote({ items: {}, type: 'New purchase' })
      setSent(true)
    } catch {
      setError(`Something went wrong. Please try again or email us at ${SALES_EMAIL}.`)
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact__card" data-reveal>
          <div className="contact__copy">
            <span className="eyebrow eyebrow--light">Build your quote</span>
            <h2 className="section-title">Let&apos;s find the right software for your team.</h2>
            <p className="contact__lead">
              Pick your products and number of licenses — we&apos;ll come back with a tailored quote.
            </p>
            <ul className="contact__list">
              <li><Check /> Subscription licensing for any team size</li>
              <li><Check /> Renewals, upgrades and added seats</li>
              <li><Check /> Advice on the right plan for your needs</li>
            </ul>
            <a className="contact__mail" href={`mailto:${SALES_EMAIL}`}>
              <Mail /> {SALES_EMAIL}
            </a>
          </div>

          <form className="form" onSubmit={onSubmit}>
            {sent ? (
              <div className="form__done" role="status">
                <span><Check /></span>
                <h3>Thank you!</h3>
                <p>Your quote request has been received. Our team will get back to you shortly.</p>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSent(false)}>
                  Send another request
                </button>
              </div>
            ) : (
              <>
                <fieldset className="qb">
                  <legend>1. Request type</legend>
                  <div className="qb__types" role="radiogroup">
                    {Object.keys(TYPES).map((t) => (
                      <button
                        key={t}
                        type="button"
                        role="radio"
                        aria-checked={quote.type === t}
                        className={`qb__type ${quote.type === t ? 'is-active' : ''}`}
                        onClick={() => setQuote((q) => ({ ...q, type: t }))}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <p className="qb__hint" key={quote.type}>{type.hint}</p>
                  {type.fields.length > 0 && (
                    <div className="qb__extra form__row" key={`f-${quote.type}`}>
                      {type.fields.map((f) => (
                        <label key={f.name}>
                          <span>{f.label}</span>
                          {f.type === 'select' ? (
                            <select name={f.name} defaultValue="">
                              <option value="" disabled>Select</option>
                              {f.options.map((o) => <option key={o}>{o}</option>)}
                            </select>
                          ) : (
                            <input
                              name={f.name}
                              type={f.type}
                              min={f.type === 'number' ? 1 : undefined}
                              inputMode={f.type === 'number' ? 'numeric' : undefined}
                            />
                          )}
                        </label>
                      ))}
                    </div>
                  )}
                </fieldset>

                <fieldset className="qb">
                  <legend>2. {type.productsLegend}</legend>
                  <div className="qb__products">
                    {PRODUCTS.map((p) => {
                      const on = Boolean(items[p.name])
                      return (
                        <div key={p.name} className={`qb__item qb__item--${p.tone} ${on ? 'is-on' : ''}`}>
                          <button
                            type="button"
                            className="qb__toggle"
                            aria-pressed={on}
                            onClick={() => toggle(p.name)}
                          >
                            <span className="qb__check">{on && <Check />}</span>
                            <span className="qb__name">
                              <strong>{p.name}</strong>
                              <small>{p.note}</small>
                            </span>
                          </button>
                          {on && (
                            <div className="qb__seats" aria-label={`${p.name} ${type.unit}`} title={type.unit}>
                              <button type="button" onClick={() => setSeats(p.name, items[p.name] - 1)} aria-label="Fewer licenses">−</button>
                              <input
                                type="number"
                                inputMode="numeric"
                                min="1"
                                max={MAX_SEATS}
                                value={items[p.name]}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => setSeats(p.name, e.target.value)}
                                aria-label={`Number of ${p.name} licenses`}
                              />
                              <button type="button" onClick={() => setSeats(p.name, items[p.name] + 1)} aria-label="More licenses">+</button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <p className={`qb__summary ${summary ? 'has-items' : ''}`}>
                    {summary ? <><strong>{quote.type}:</strong> {summary}</> : 'No products selected yet.'}
                    {' '}<a href="#plan">Not sure? Find your plan →</a>
                  </p>
                </fieldset>

                <fieldset className="qb">
                  <legend>3. Your details</legend>
                  <div className="qb__fields">
                    <div className="form__row">
                      <label>
                        <span>First name</span>
                        <input name="firstName" required autoComplete="given-name" />
                      </label>
                      <label>
                        <span>Last name</span>
                        <input name="lastName" required autoComplete="family-name" />
                      </label>
                    </div>
                    <div className="form__row">
                      <label>
                        <span>Work email</span>
                        <input type="email" name="email" required autoComplete="email" />
                      </label>
                      <label>
                        <span>Company</span>
                        <input name="company" autoComplete="organization" />
                      </label>
                    </div>
                    <label>
                      <span>Message (optional)</span>
                      <textarea name="message" rows="2" />
                    </label>
                  </div>
                </fieldset>

                <input type="text" name="_honey" tabIndex="-1" autoComplete="off" className="form__hp" aria-hidden="true" />
                {error && <p className="form__error" role="alert">{error}</p>}
                <button type="submit" className="btn btn-primary form__submit" disabled={sending}>
                  {sending ? 'Sending…' : <>Request a quote <Arrow /></>}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
