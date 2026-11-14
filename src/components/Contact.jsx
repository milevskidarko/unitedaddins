import { useState } from 'react'
import { Arrow, Check } from './Icons.jsx'
import './Contact.css'

const products = ['Foxit PDF Editor', 'Foxit PDF Editor+', 'Foxit eSign', 'Mekko Graphics', 'Not sure yet']

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: connect to a form backend / email service.
    setSent(true)
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
                <button type="submit" className="btn btn-primary form__submit">
                  Request a quote <Arrow />
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
