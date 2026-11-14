import { useState } from 'react'
import { Arrow, Check, Mail } from './Icons.jsx'
import './Contact.css'

const SALES_EMAIL = 'sales@unitedaddins.com'
// FormSubmit forwards the form to SALES_EMAIL (first submission sends a one-time activation email).
const ENDPOINT = `https://formsubmit.co/ajax/${SALES_EMAIL}`

const products = ['Foxit PDF Editor', 'Foxit PDF Editor+', 'Foxit eSign', 'Mekko Graphics', 'Not sure yet']

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (data._honey) return // spam bot

    setSending(true)
    setError('')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New quote request — ${data.product || 'General'} (${data.company || data.email})`,
          _replyto: data.email,
          _template: 'table',
          _captcha: 'false',
          'First name': data.firstName,
          'Last name': data.lastName,
          Email: data.email,
          Company: data.company,
          'Number of licenses': data.licenses,
          Product: data.product,
          Message: data.message,
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || json.success === 'false' || json.success === false) throw new Error(json.message)
      form.reset()
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
            <span className="eyebrow eyebrow--light">Talk to our team</span>
            <h2 className="section-title">Let&apos;s find the right software for your team.</h2>
            <p className="contact__lead">
              Tell us what you need and how many licenses — we&apos;ll come back with a recommendation
              and a quote.
            </p>
            <ul className="contact__list">
              <li><Check /> Volume &amp; multi-year licensing</li>
              <li><Check /> Trials and product demos</li>
              <li><Check /> Renewals and upgrades handled for you</li>
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
                <p>Your request has been received. Our team will get back to you shortly.</p>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSent(false)}>
                  Send another request
                </button>
              </div>
            ) : (
              <>
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
                <label>
                  <span>Work email</span>
                  <input type="email" name="email" required autoComplete="email" />
                </label>
                <div className="form__row">
                  <label>
                    <span>Company</span>
                    <input name="company" autoComplete="organization" />
                  </label>
                  <label>
                    <span>Number of licenses</span>
                    <input type="number" name="licenses" min="1" inputMode="numeric" />
                  </label>
                </div>
                <label>
                  <span>Product of interest</span>
                  <select name="product" defaultValue="">
                    <option value="" disabled>Select a product</option>
                    {products.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </label>
                <label>
                  <span>Message</span>
                  <textarea name="message" rows="3" />
                </label>
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
