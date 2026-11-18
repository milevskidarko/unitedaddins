import { useEffect, useRef, useState } from 'react'
import { Arrow, Check, Mail } from './Icons.jsx'
import { L, useT, useLang } from '../i18n.jsx'
import { PRODUCTS as MORE_PRODUCTS } from '../products.js'
import './Contact.css'

const SALES_EMAIL = 'sales@unitedaddins.com'

// Quote requests go to our own Vercel function (/api/quote → Resend e-mail, protected by
// Cloudflare Turnstile). Until that is configured (no RESEND_API_KEY on Vercel, or local
// `npm run dev` without functions), requests fall back to FormSubmit as before.
const API_ENDPOINT = '/api/quote'
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || ''
// FormSubmit sends straight to sales@ (the address is public on the site anyway). The old
// alias '29844412…' was most likely the developer's test inbox (a test landed there, Nov 2026).
// Can be overridden in .env.local (VITE_FORM_EMAIL=you@example.com) for local testing.
const FALLBACK_ENDPOINT = `https://formsubmit.co/ajax/${import.meta.env.VITE_FORM_EMAIL || SALES_EMAIL}`

// Product names are the same in every language (they are also the keys of the quote).
const PRODUCTS = [
  // perpetual: also sold as a one-time license (Windows & macOS). Prices are quoted individually.
  { name: 'Foxit PDF Editor', tone: 'orange', perpetual: true },
  { name: 'Foxit PDF Editor+', tone: 'violet' },
  { name: 'Foxit eSign', tone: 'blue' },
  { name: 'Mekko Graphics', tone: 'navy' },
  // Further products (products.js): listed under "More products" so the core ones stay up front.
  ...MORE_PRODUCTS.map((p) => ({ name: p.name, color: p.tone, more: true, notes: { en: p.en.note, de: p.de.note, fr: p.fr.note } })),
]
// Request types: the key is what the sales team receives (always English).
const TYPE_KEYS = ['New purchase', 'Renewal', 'Upgrade', 'Add seats']
const TYPE_FIELDS = {
  'New purchase': [],
  Renewal: [
    { name: 'expiryDate', type: 'date' },
    { name: 'reference', type: 'text' },
  ],
  Upgrade: [
    { name: 'currentPlan', type: 'select', options: ['Foxit PDF Editor', 'Foxit PDF Editor+', 'Foxit eSign', 'Mekko Graphics', ...MORE_PRODUCTS.map((p) => p.name), 'other'] },
    { name: 'reference', type: 'text' },
  ],
  'Add seats': [
    { name: 'currentSeats', type: 'number' },
    { name: 'reference', type: 'text' },
  ],
}
// Labels in the e-mail to the sales team (English).
const FIELD_LABELS = {
  expiryDate: 'Current subscription expires',
  reference: 'Order / license reference',
  currentPlan: 'Current plan',
  currentSeats: 'Licenses they have now',
}
const MAX_SEATS = 9999

const T = {
  en: {
    eyebrow: 'Build your quote',
    title: 'Let’s find the right software for',
    accent: 'your team.',
    lead: 'Pick your products and number of licenses — we’ll come back with a tailored quote.',
    list: ['Subscription and perpetual licensing for any team size', 'Renewals, upgrades and added seats', 'Advice on the right plan for your needs'],
    nextLabel: 'What happens next',
    // No response times promised on purpose — add one only if the team commits to it.
    next: [
      ['We review your request', 'A licensing specialist checks your products, seats and current setup.'],
      ['You get a tailored quote', 'Clear pricing for your team, with options if there is a better fit.'],
      ['Licensing & onboarding', 'We deliver your licenses and help you get up and running.'],
    ],
    types: {
      'New purchase': { label: 'New purchase', hint: 'Buying licenses for the first time.', legend: 'Products & licenses', unit: ['license', 'licenses'] },
      Renewal: { label: 'Renewal', hint: 'Renew your existing subscription — we will review your current terms.', legend: 'Products to renew', unit: ['license to renew', 'licenses to renew'] },
      Upgrade: { label: 'Upgrade', hint: 'Move to a higher plan, for example from PDF Editor to PDF Editor+.', legend: 'Upgrade to', unit: ['license to upgrade', 'licenses to upgrade'] },
      'Add seats': { label: 'Add seats', hint: 'Add licenses to the subscription you already have.', legend: 'Products & additional licenses', unit: ['additional license', 'additional licenses'] },
    },
    fields: {
      expiryDate: 'Current subscription expires',
      reference: 'Order or license reference (optional)',
      currentPlan: 'Current plan',
      currentSeats: 'Licenses you have now',
      other: 'Other / not sure',
      select: 'Select',
    },
    notes: {
      'Foxit PDF Editor': 'Windows, macOS, Web',
      'Foxit PDF Editor+': '+ mobile, Smart Redact, eSign',
      'Foxit eSign': 'Templates, bulk send, audit trails',
      'Mekko Graphics': 'Add-in for PowerPoint & Excel',
    },
    perpetualNote: 'Windows & macOS · one-time license',
    moreProducts: (n) => `More products (${n})`,
    fewerProducts: 'Fewer products',
    licenseType: 'license type',
    subscription: 'Subscription',
    perpetual: 'Perpetual (one-time)',
    fewer: 'Fewer licenses',
    more: 'More licenses',
    number: (p) => `Number of ${p} licenses`,
    step1: '1. Request type',
    step3: '3. Your details',
    none: 'No products selected yet.',
    notSure: 'Not sure? Find your plan →',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Work email',
    company: 'Company',
    message: 'Message (optional)',
    submit: 'Request a quote',
    sending: 'Sending…',
    pickProduct: 'Please select at least one product for your quote.',
    verify: 'Please wait a moment — we are checking that you are not a robot.',
    error: `Something went wrong. Please try again or email us at ${SALES_EMAIL}.`,
    doneTitle: 'Thank you!',
    doneText: 'Your quote request has been received. A licensing specialist will get back to you by e-mail.',
    doneSummary: 'Your request',
    again: 'Send another request',
    explore: 'Back to home',
  },
  de: {
    eyebrow: 'Angebot zusammenstellen',
    title: 'Finden wir die richtige Software für',
    accent: 'Ihr Team.',
    lead: 'Wählen Sie Produkte und Anzahl der Lizenzen — wir melden uns mit einem individuellen Angebot.',
    list: ['Abonnement- und Dauerlizenzen für jede Teamgröße', 'Verlängerungen, Upgrades und zusätzliche Lizenzen', 'Beratung zum passenden Plan für Ihren Bedarf'],
    nextLabel: 'So geht es weiter',
    next: [
      ['Wir prüfen Ihre Anfrage', 'Ein Lizenzspezialist prüft Produkte, Lizenzanzahl und Ihre aktuelle Umgebung.'],
      ['Sie erhalten ein individuelles Angebot', 'Klare Preise für Ihr Team — mit Alternativen, falls es eine bessere Lösung gibt.'],
      ['Lizenzierung & Einführung', 'Wir liefern Ihre Lizenzen und helfen Ihnen beim Start.'],
    ],
    types: {
      'New purchase': { label: 'Neukauf', hint: 'Sie kaufen zum ersten Mal Lizenzen.', legend: 'Produkte & Lizenzen', unit: ['Lizenz', 'Lizenzen'] },
      Renewal: { label: 'Verlängerung', hint: 'Verlängern Sie Ihr bestehendes Abonnement — wir prüfen Ihre aktuellen Konditionen.', legend: 'Zu verlängernde Produkte', unit: ['Lizenz zu verlängern', 'Lizenzen zu verlängern'] },
      Upgrade: { label: 'Upgrade', hint: 'Wechsel in einen höheren Plan, z. B. von PDF Editor zu PDF Editor+.', legend: 'Upgrade auf', unit: ['Lizenz für Upgrade', 'Lizenzen für Upgrade'] },
      'Add seats': { label: 'Mehr Lizenzen', hint: 'Fügen Sie Ihrem bestehenden Abonnement Lizenzen hinzu.', legend: 'Produkte & zusätzliche Lizenzen', unit: ['zusätzliche Lizenz', 'zusätzliche Lizenzen'] },
    },
    fields: {
      expiryDate: 'Aktuelles Abonnement läuft ab am',
      reference: 'Bestell- oder Lizenznummer (optional)',
      currentPlan: 'Aktueller Plan',
      currentSeats: 'Aktuelle Anzahl Lizenzen',
      other: 'Anderer / unsicher',
      select: 'Auswählen',
    },
    notes: {
      'Foxit PDF Editor': 'Windows, macOS, Web',
      'Foxit PDF Editor+': '+ Mobil, Smart Redact, eSign',
      'Foxit eSign': 'Vorlagen, Massenversand, Prüfprotokolle',
      'Mekko Graphics': 'Add-in für PowerPoint & Excel',
    },
    perpetualNote: 'Windows & macOS · Einmallizenz',
    moreProducts: (n) => `Weitere Produkte (${n})`,
    fewerProducts: 'Weniger Produkte',
    licenseType: 'Lizenztyp',
    subscription: 'Abonnement',
    perpetual: 'Dauerlizenz (einmalig)',
    fewer: 'Weniger Lizenzen',
    more: 'Mehr Lizenzen',
    number: (p) => `Anzahl der Lizenzen für ${p}`,
    step1: '1. Art der Anfrage',
    step3: '3. Ihre Angaben',
    none: 'Noch keine Produkte ausgewählt.',
    notSure: 'Unsicher? Plan finden →',
    firstName: 'Vorname',
    lastName: 'Nachname',
    email: 'Geschäftliche E-Mail',
    company: 'Unternehmen',
    message: 'Nachricht (optional)',
    submit: 'Angebot anfordern',
    sending: 'Wird gesendet…',
    pickProduct: 'Bitte wählen Sie mindestens ein Produkt für Ihr Angebot aus.',
    verify: 'Einen Moment bitte — wir prüfen, dass Sie kein Roboter sind.',
    error: `Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns an ${SALES_EMAIL}.`,
    doneTitle: 'Vielen Dank!',
    doneText: 'Ihre Angebotsanfrage ist eingegangen. Ein Lizenzspezialist meldet sich per E-Mail bei Ihnen.',
    doneSummary: 'Ihre Anfrage',
    again: 'Weitere Anfrage senden',
    explore: 'Zur Startseite',
  },
  fr: {
    eyebrow: 'Composez votre devis',
    title: 'Trouvons le bon logiciel pour',
    accent: 'votre équipe.',
    lead: 'Choisissez vos produits et le nombre de licences — nous revenons vers vous avec un devis sur mesure.',
    list: ['Abonnements et licences perpétuelles pour toutes les tailles d’équipe', 'Renouvellements, mises à niveau et postes supplémentaires', 'Conseils sur l’offre adaptée à vos besoins'],
    nextLabel: 'Les étapes suivantes',
    next: [
      ['Nous étudions votre demande', 'Un spécialiste des licences vérifie vos produits, le nombre de postes et votre configuration actuelle.'],
      ['Vous recevez un devis sur mesure', 'Des prix clairs pour votre équipe, avec des alternatives s’il existe une meilleure option.'],
      ['Licences et mise en route', 'Nous livrons vos licences et vous aidons à démarrer.'],
    ],
    types: {
      'New purchase': { label: 'Nouvel achat', hint: 'Vous achetez des licences pour la première fois.', legend: 'Produits et licences', unit: ['licence', 'licences'] },
      Renewal: { label: 'Renouvellement', hint: 'Renouvelez votre abonnement existant — nous examinerons vos conditions actuelles.', legend: 'Produits à renouveler', unit: ['licence à renouveler', 'licences à renouveler'] },
      Upgrade: { label: 'Mise à niveau', hint: 'Passez à une offre supérieure, par exemple de PDF Editor à PDF Editor+.', legend: 'Mise à niveau vers', unit: ['licence à mettre à niveau', 'licences à mettre à niveau'] },
      'Add seats': { label: 'Postes supplémentaires', hint: 'Ajoutez des licences à votre abonnement existant.', legend: 'Produits et licences supplémentaires', unit: ['licence supplémentaire', 'licences supplémentaires'] },
    },
    fields: {
      expiryDate: 'Expiration de l’abonnement actuel',
      reference: 'Référence de commande ou de licence (facultatif)',
      currentPlan: 'Offre actuelle',
      currentSeats: 'Nombre de licences actuel',
      other: 'Autre / je ne sais pas',
      select: 'Choisir',
    },
    notes: {
      'Foxit PDF Editor': 'Windows, macOS, Web',
      'Foxit PDF Editor+': '+ mobile, Smart Redact, eSign',
      'Foxit eSign': 'Modèles, envoi en masse, pistes d’audit',
      'Mekko Graphics': 'Complément pour PowerPoint et Excel',
    },
    perpetualNote: 'Windows et macOS · licence à achat unique',
    moreProducts: (n) => `Autres produits (${n})`,
    fewerProducts: 'Moins de produits',
    licenseType: 'type de licence',
    subscription: 'Abonnement',
    perpetual: 'Perpétuelle (achat unique)',
    fewer: 'Moins de licences',
    more: 'Plus de licences',
    number: (p) => `Nombre de licences ${p}`,
    step1: '1. Type de demande',
    step3: '3. Vos coordonnées',
    none: 'Aucun produit sélectionné.',
    notSure: 'Vous hésitez ? Trouver votre offre →',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'E-mail professionnel',
    company: 'Entreprise',
    message: 'Message (facultatif)',
    submit: 'Demander un devis',
    sending: 'Envoi…',
    pickProduct: 'Veuillez sélectionner au moins un produit pour votre devis.',
    verify: 'Un instant — nous vérifions que vous n’êtes pas un robot.',
    error: `Une erreur s’est produite. Veuillez réessayer ou nous écrire à ${SALES_EMAIL}.`,
    doneTitle: 'Merci !',
    doneText: 'Votre demande de devis a bien été reçue. Un spécialiste des licences vous répondra par e-mail.',
    doneSummary: 'Votre demande',
    again: 'Envoyer une autre demande',
    explore: 'Retour à l’accueil',
  },
}

// Loads Cloudflare Turnstile once and renders the (mostly invisible) check into `el`.
let turnstileScript
function useTurnstile(enabled, lang) {
  const ref = useRef(null)
  const widget = useRef(null)
  const [token, setToken] = useState('')
  useEffect(() => {
    if (!enabled || !TURNSTILE_SITE_KEY || !ref.current) return
    let cancelled = false
    turnstileScript ||= new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      s.async = true
      s.onload = resolve
      s.onerror = reject
      document.head.appendChild(s)
    })
    turnstileScript
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile) return
        widget.current = window.turnstile.render(ref.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
          language: lang,
          appearance: 'interaction-only',
          callback: setToken,
          'expired-callback': () => setToken(''),
          'error-callback': () => setToken(''),
        })
      })
      .catch(() => { /* blocked by an extension: the server decides */ })
    return () => {
      cancelled = true
      if (widget.current != null && window.turnstile) window.turnstile.remove(widget.current)
      widget.current = null
      setToken('')
    }
  }, [enabled, lang])
  const reset = () => {
    setToken('')
    if (widget.current != null && window.turnstile) window.turnstile.reset(widget.current)
  }
  return { ref, token, reset }
}

// A short burst of confetti behind the success check (skipped with reduced motion via CSS).
function Confetti() {
  const pieces = Array.from({ length: 28 }, (_, i) => {
    const angle = (i / 28) * Math.PI * 2
    const dist = 90 + ((i * 37) % 70)
    return {
      '--x': `${Math.cos(angle) * dist}px`,
      '--y': `${Math.sin(angle) * dist - 30}px`,
      '--r': `${(i * 67) % 360}deg`,
      '--c': ['#2449e8', '#60a5fa', '#7c5cff', '#22c55e', '#ff5f1f', '#ffc145'][i % 6],
      '--delay': `${(i % 5) * 0.03}s`,
    }
  })
  return (
    <span className="confetti" aria-hidden="true">
      {pieces.map((style, i) => <i key={i} style={style} />)}
    </span>
  )
}

export default function Contact({ quote, setQuote }) {
  const t = useT(T)
  const lang = useLang()
  const [sent, setSent] = useState(null) // summary of the sent request
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [showMore, setShowMore] = useState(false)
  const turnstile = useTurnstile(!sent, lang)

  const items = quote.items
  const typeKey = quote.type
  const type = t.types[typeKey]
  const fields = TYPE_FIELDS[typeKey]
  const selected = PRODUCTS.filter((p) => items[p.name])
  // Extra products are folded away unless opened or already picked (e.g. from a product page).
  const moreCount = PRODUCTS.filter((p) => p.more).length
  const visibleProducts = PRODUCTS.filter((p) => !p.more || showMore || items[p.name])
  const noteFor = (p) => (p.notes ? p.notes[lang] || p.notes.en : t.notes[p.name])
  const isPerpetual = (p) => p.perpetual && quote.perpetual
  const unitFor = (n) => type.unit[n === 1 ? 0 : 1]
  const summary = selected
    .map((p) => `${p.name}${isPerpetual(p) ? ` (${t.perpetual})` : ''} × ${items[p.name]} ${unitFor(items[p.name])}`)
    .join(', ')
  // The sales team always gets the request in English.
  const enType = T.en.types[typeKey]
  const summaryEn = selected
    .map((p) => `${p.name}${isPerpetual(p) ? ' (perpetual)' : ''} × ${items[p.name]} ${enType.unit[items[p.name] === 1 ? 0 : 1]}`)
    .join(', ')
  const perpetualProduct = selected.find((p) => p.perpetual)

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
      setError(t.pickProduct)
      return
    }
    if (TURNSTILE_SITE_KEY && window.turnstile && !turnstile.token) {
      setError(t.verify)
      return
    }

    const details = {
      'Request type': typeKey,
      Products: summaryEn,
      ...(perpetualProduct && {
        [`${perpetualProduct.name} license`]: quote.perpetual ? 'Perpetual (one-time purchase)' : 'Subscription',
      }),
      ...Object.fromEntries(
        fields
          .filter((f) => data[f.name])
          .map((f) => [FIELD_LABELS[f.name], data[f.name] === 'other' ? 'Other / not sure' : data[f.name]])
      ),
      'First name': data.firstName,
      'Last name': data.lastName,
      Email: data.email,
      Company: data.company,
      Message: data.message,
      Language: lang.toUpperCase(),
    }
    const subject = `${typeKey} — ${summaryEn} (${data.company || data.email})`

    setSending(true)
    setError('')
    try {
      let res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ subject, replyTo: data.email, details, turnstileToken: turnstile.token, website: data._honey }),
      }).catch(() => null)
      const isJson = res?.headers.get('content-type')?.includes('application/json')
      let json = isJson ? await res.json().catch(() => ({})) : {}

      // Our function is not deployed/configured yet → send through FormSubmit instead.
      if (!res || !isJson || json.fallback) {
        res = await fetch(FALLBACK_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ _subject: subject, _replyto: data.email, _template: 'table', _captcha: 'false', ...details }),
        })
        json = await res.json().catch(() => ({}))
      }
      if (!res.ok || json.success === 'false' || json.success === false || json.ok === false) throw new Error(json.message)

      form.reset()
      setSent({ type: type.label, summary })
      setQuote({ items: {}, type: 'New purchase', perpetual: false })
    } catch {
      setError(t.error)
      turnstile.reset()
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact__card" data-reveal>
          <div className="contact__copy">
            <span className="eyebrow eyebrow--light">{t.eyebrow}</span>
            <h1 className="section-title">{t.title} <span className="accent">{t.accent}</span></h1>
            <p className="contact__lead">{t.lead}</p>
            <ul className="contact__list">
              {t.list.map((x) => <li key={x}><Check /> {x}</li>)}
            </ul>
            <a className="contact__mail" href={`mailto:${SALES_EMAIL}`}>
              <Mail /> {SALES_EMAIL}
            </a>

            <div className="next">
              <h2 className="next__label">{t.nextLabel}</h2>
              <ol className="next__steps">
                {t.next.map(([title, text], i) => (
                  <li key={title}>
                    <span className="next__n">{i + 1}</span>
                    <span>
                      <strong>{title}</strong>
                      <small>{text}</small>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <form className="form" id="quote" onSubmit={onSubmit} noValidate={false}>
            {sent ? (
              <div className="form__done" role="status" aria-live="polite">
                <span className="form__done-badge">
                  <Confetti />
                  <svg viewBox="0 0 52 52" aria-hidden="true">
                    <circle className="form__done-circle" cx="26" cy="26" r="24" />
                    <path className="form__done-check" d="M15 27l7 7 15-16" />
                  </svg>
                </span>
                <h2>{t.doneTitle}</h2>
                <p>{t.doneText}</p>
                {sent.summary && (
                  <div className="form__done-summary">
                    <small>{t.doneSummary} · {sent.type}</small>
                    <strong>{sent.summary}</strong>
                  </div>
                )}
                <div className="form__done-actions">
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSent(null)}>
                    {t.again}
                  </button>
                  <L to="/" className="btn btn-primary btn-sm">{t.explore} <Arrow /></L>
                </div>
              </div>
            ) : (
              <>
                <fieldset className="qb">
                  <legend>{t.step1}</legend>
                  <div className="qb__types" role="radiogroup" aria-label={t.step1}>
                    {TYPE_KEYS.map((k) => (
                      <button
                        key={k}
                        type="button"
                        role="radio"
                        aria-checked={typeKey === k}
                        className={`qb__type ${typeKey === k ? 'is-active' : ''}`}
                        onClick={() => setQuote((q) => ({ ...q, type: k }))}
                      >
                        {t.types[k].label}
                      </button>
                    ))}
                  </div>
                  <p className="qb__hint" key={typeKey}>{type.hint}</p>
                  {fields.length > 0 && (
                    <div className="qb__extra form__row" key={`f-${typeKey}`}>
                      {fields.map((f) => (
                        <label key={f.name}>
                          <span>{t.fields[f.name]}</span>
                          {f.type === 'select' ? (
                            <select name={f.name} defaultValue="">
                              <option value="" disabled>{t.fields.select}</option>
                              {f.options.map((o) => <option key={o} value={o}>{o === 'other' ? t.fields.other : o}</option>)}
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
                  <legend>2. {type.legend}</legend>
                  <div className="qb__products">
                    {visibleProducts.map((p) => {
                      const on = Boolean(items[p.name])
                      return (
                        <div
                          key={p.name}
                          className={`qb__item ${p.tone ? `qb__item--${p.tone}` : ''} ${on ? 'is-on' : ''}`}
                          style={p.color ? { '--tone': p.color } : undefined}
                        >
                          <button
                            type="button"
                            className="qb__toggle"
                            aria-pressed={on}
                            onClick={() => toggle(p.name)}
                          >
                            <span className="qb__check">{on && <Check />}</span>
                            <span className="qb__name">
                              <strong>{p.name}</strong>
                              <small>{isPerpetual(p) ? t.perpetualNote : noteFor(p)}</small>
                            </span>
                          </button>
                          {on && p.perpetual && (
                            <div className="qb__license" role="radiogroup" aria-label={`${p.name} ${t.licenseType}`}>
                              {[[t.subscription, false], [t.perpetual, true]].map(([label, value]) => (
                                <button
                                  key={label}
                                  type="button"
                                  role="radio"
                                  aria-checked={quote.perpetual === value}
                                  className={quote.perpetual === value ? 'is-active' : ''}
                                  onClick={() => setQuote((q) => ({ ...q, perpetual: value }))}
                                >
                                  {label}
                                </button>
                              ))}
                            </div>
                          )}
                          {on && (
                            <div className="qb__seats" title={type.unit[1]}>
                              <button type="button" onClick={() => setSeats(p.name, items[p.name] - 1)} aria-label={t.fewer}>−</button>
                              <input
                                type="number"
                                inputMode="numeric"
                                min="1"
                                max={MAX_SEATS}
                                value={items[p.name]}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => setSeats(p.name, e.target.value)}
                                aria-label={t.number(p.name)}
                              />
                              <button type="button" onClick={() => setSeats(p.name, items[p.name] + 1)} aria-label={t.more}>+</button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <button
                    type="button"
                    className="qb__more"
                    aria-expanded={showMore}
                    onClick={() => setShowMore((v) => !v)}
                  >
                    {showMore ? t.fewerProducts : t.moreProducts(moreCount)}
                  </button>
                  <p className={`qb__summary ${summary ? 'has-items' : ''}`}>
                    {summary ? <><strong>{type.label}:</strong> {summary}</> : t.none}
                    {' '}<L to="/foxit#plan">{t.notSure}</L>
                  </p>
                </fieldset>

                <fieldset className="qb">
                  <legend>{t.step3}</legend>
                  <div className="qb__fields">
                    <div className="form__row">
                      <label>
                        <span>{t.firstName}</span>
                        <input name="firstName" required autoComplete="given-name" />
                      </label>
                      <label>
                        <span>{t.lastName}</span>
                        <input name="lastName" required autoComplete="family-name" />
                      </label>
                    </div>
                    <div className="form__row">
                      <label>
                        <span>{t.email}</span>
                        <input type="email" name="email" required autoComplete="email" />
                      </label>
                      <label>
                        <span>{t.company}</span>
                        <input name="company" autoComplete="organization" />
                      </label>
                    </div>
                    <label>
                      <span>{t.message}</span>
                      <textarea name="message" rows="2" />
                    </label>
                  </div>
                </fieldset>

                {/* Spam trap: hidden from people, bots fill it in. */}
                <input type="text" name="_honey" tabIndex="-1" autoComplete="off" className="form__hp" aria-hidden="true" />
                {TURNSTILE_SITE_KEY && <div className="form__turnstile" ref={turnstile.ref} />}
                {error && <p className="form__error" role="alert">{error}</p>}
                <button type="submit" className="btn btn-primary form__submit" disabled={sending}>
                  {sending ? t.sending : <>{t.submit} <Arrow /></>}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
