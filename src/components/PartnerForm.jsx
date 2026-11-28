import { useState } from 'react'
import { Arrow, Check, Mail } from './Icons.jsx'
import { L, useT, useLang } from '../i18n.jsx'
import { PRODUCTS as MORE_PRODUCTS } from '../products.js'
import { SALES_EMAIL, TURNSTILE_SITE_KEY, CONFETTI, sendForm, useTurnstile } from '../sendForm.js'
import './Contact.css'

// "Become a partner": partnership type, products of interest and the company. Sent to sales like a
// quote request (api/quote.js with kind: 'partner'); the e-mail is always in English.
const TYPE_KEYS = ['Reseller', 'IT services / integrator', 'Referral partner', 'Software vendor']
// Product names stay the same in every language; 'Not sure yet' is translated (t.notSure).
const INTEREST = ['Foxit PDF Editor', 'Foxit eSign', 'Mekko Graphics', 'Efficient Elements', ...MORE_PRODUCTS.map((p) => p.name)]
const SIZES = ['1–10', '11–50', '51–200', '201–1,000', '1,000+']

const T = {
  en: {
    eyebrow: 'Become a partner',
    title: 'Grow your business with',
    accent: 'United Addins.',
    lead: 'Resell, implement or recommend the software we distribute — with an authorized Foxit distributor behind you.',
    list: ['Authorized Foxit distributor since 2012', 'Foxit, Mekko Graphics and more from one distributor', 'Licensing and pre-sales support from our team'],
    nextLabel: 'What happens next',
    next: [
      ['We review your application', 'Our team looks at your business and the products you are interested in.'],
      ['We get in touch', 'We set up a call to find the partnership model that fits.'],
      ['Start working together', 'Onboarding, product information and licensing support.'],
    ],
    step1: '1. Type of partnership',
    types: {
      Reseller: ['Reseller', 'You sell software to your own customers.'],
      'IT services / integrator': ['IT services', 'You deploy and support software for your clients.'],
      'Referral partner': ['Referral', 'You recommend us — we handle the sale.'],
      'Software vendor': ['Software vendor', 'You make software and want us to distribute it.'],
    },
    step2: '2. Products you are interested in',
    notSure: 'Not sure yet',
    step3: '3. Your company',
    company: 'Company',
    website: 'Website (optional)',
    country: 'Country',
    size: 'Employees',
    select: 'Select',
    step4: '4. Your details',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Work email',
    phone: 'Phone (optional)',
    role: 'Job title (optional)',
    message: 'Tell us about your business, customers and markets (optional)',
    submit: 'Send application',
    sending: 'Sending…',
    verify: 'Please wait a moment — we are checking that you are not a robot.',
    error: `Something went wrong. Please try again or email us at ${SALES_EMAIL}.`,
    doneTitle: 'Thank you!',
    doneText: 'Your partner application has been received. Our team will get back to you by e-mail.',
    again: 'Send another application',
    explore: 'Back to home',
  },
  de: {
    eyebrow: 'Partner werden',
    title: 'Wachsen Sie mit',
    accent: 'United Addins.',
    lead: 'Verkaufen, implementieren oder empfehlen Sie die Software, die wir vertreiben — mit einem autorisierten Foxit-Distributor an Ihrer Seite.',
    list: ['Autorisierter Foxit-Distributor seit 2012', 'Foxit, Mekko Graphics und mehr von einem Distributor', 'Lizenz- und Pre-Sales-Support durch unser Team'],
    nextLabel: 'So geht es weiter',
    next: [
      ['Wir prüfen Ihre Bewerbung', 'Unser Team sieht sich Ihr Unternehmen und die gewünschten Produkte an.'],
      ['Wir melden uns', 'In einem Gespräch finden wir das passende Partnermodell.'],
      ['Zusammenarbeit starten', 'Onboarding, Produktinformationen und Lizenzsupport.'],
    ],
    step1: '1. Art der Partnerschaft',
    types: {
      Reseller: ['Reseller', 'Sie verkaufen Software an Ihre eigenen Kunden.'],
      'IT services / integrator': ['IT-Dienstleister', 'Sie implementieren und betreuen Software für Ihre Kunden.'],
      'Referral partner': ['Empfehlung', 'Sie empfehlen uns — wir übernehmen den Verkauf.'],
      'Software vendor': ['Softwarehersteller', 'Sie entwickeln Software und möchten, dass wir sie vertreiben.'],
    },
    step2: '2. Produkte, die Sie interessieren',
    notSure: 'Noch unsicher',
    step3: '3. Ihr Unternehmen',
    company: 'Unternehmen',
    website: 'Website (optional)',
    country: 'Land',
    size: 'Mitarbeitende',
    select: 'Auswählen',
    step4: '4. Ihre Angaben',
    firstName: 'Vorname',
    lastName: 'Nachname',
    email: 'Geschäftliche E-Mail',
    phone: 'Telefon (optional)',
    role: 'Position (optional)',
    message: 'Erzählen Sie uns von Ihrem Unternehmen, Ihren Kunden und Märkten (optional)',
    submit: 'Bewerbung senden',
    sending: 'Wird gesendet…',
    verify: 'Einen Moment bitte — wir prüfen, dass Sie kein Roboter sind.',
    error: `Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns an ${SALES_EMAIL}.`,
    doneTitle: 'Vielen Dank!',
    doneText: 'Ihre Partnerbewerbung ist eingegangen. Unser Team meldet sich per E-Mail bei Ihnen.',
    again: 'Weitere Bewerbung senden',
    explore: 'Zur Startseite',
  },
  fr: {
    eyebrow: 'Devenir partenaire',
    title: 'Développez votre activité avec',
    accent: 'United Addins.',
    lead: 'Revendez, déployez ou recommandez les logiciels que nous distribuons — avec un distributeur agréé Foxit à vos côtés.',
    list: ['Distributeur agréé Foxit depuis 2012', 'Foxit, Mekko Graphics et plus auprès d’un seul distributeur', 'Support licences et avant-vente par notre équipe'],
    nextLabel: 'Les étapes suivantes',
    next: [
      ['Nous étudions votre candidature', 'Notre équipe examine votre activité et les produits qui vous intéressent.'],
      ['Nous vous contactons', 'Un échange pour trouver le modèle de partenariat adapté.'],
      ['Nous démarrons ensemble', 'Intégration, informations produits et support licences.'],
    ],
    step1: '1. Type de partenariat',
    types: {
      Reseller: ['Revendeur', 'Vous vendez des logiciels à vos propres clients.'],
      'IT services / integrator': ['Services IT', 'Vous déployez et maintenez des logiciels pour vos clients.'],
      'Referral partner': ['Apporteur d’affaires', 'Vous nous recommandez — nous nous occupons de la vente.'],
      'Software vendor': ['Éditeur de logiciels', 'Vous développez un logiciel et souhaitez que nous le distribuions.'],
    },
    step2: '2. Produits qui vous intéressent',
    notSure: 'Je ne sais pas encore',
    step3: '3. Votre entreprise',
    company: 'Entreprise',
    website: 'Site web (facultatif)',
    country: 'Pays',
    size: 'Salariés',
    select: 'Choisir',
    step4: '4. Vos coordonnées',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'E-mail professionnel',
    phone: 'Téléphone (facultatif)',
    role: 'Fonction (facultatif)',
    message: 'Parlez-nous de votre activité, de vos clients et de vos marchés (facultatif)',
    submit: 'Envoyer la candidature',
    sending: 'Envoi…',
    verify: 'Un instant — nous vérifions que vous n’êtes pas un robot.',
    error: `Une erreur s’est produite. Veuillez réessayer ou nous écrire à ${SALES_EMAIL}.`,
    doneTitle: 'Merci !',
    doneText: 'Votre candidature de partenaire a bien été reçue. Notre équipe vous répondra par e-mail.',
    again: 'Envoyer une autre candidature',
    explore: 'Retour à l’accueil',
  },
  es: {
    eyebrow: 'Hágase partner',
    title: 'Haga crecer su negocio con',
    accent: 'United Addins.',
    lead: 'Revenda, implemente o recomiende el software que distribuimos — con un distribuidor autorizado de Foxit a su lado.',
    list: ['Distribuidor autorizado de Foxit desde 2012', 'Foxit, Mekko Graphics y más con un solo distribuidor', 'Soporte de licencias y preventa de nuestro equipo'],
    nextLabel: 'Próximos pasos',
    next: [
      ['Revisamos su solicitud', 'Nuestro equipo analiza su empresa y los productos que le interesan.'],
      ['Nos ponemos en contacto', 'Una llamada para encontrar el modelo de colaboración adecuado.'],
      ['Empezamos a trabajar juntos', 'Incorporación, información de producto y soporte de licencias.'],
    ],
    step1: '1. Tipo de colaboración',
    types: {
      Reseller: ['Revendedor', 'Vende software a sus propios clientes.'],
      'IT services / integrator': ['Servicios IT', 'Implanta y da soporte a software para sus clientes.'],
      'Referral partner': ['Recomendación', 'Nos recomienda — nosotros nos encargamos de la venta.'],
      'Software vendor': ['Fabricante de software', 'Desarrolla software y quiere que lo distribuyamos.'],
    },
    step2: '2. Productos que le interesan',
    notSure: 'Aún no lo sé',
    step3: '3. Su empresa',
    company: 'Empresa',
    website: 'Sitio web (opcional)',
    country: 'País',
    size: 'Empleados',
    select: 'Seleccionar',
    step4: '4. Sus datos',
    firstName: 'Nombre',
    lastName: 'Apellidos',
    email: 'Correo electrónico de empresa',
    phone: 'Teléfono (opcional)',
    role: 'Cargo (opcional)',
    message: 'Háblenos de su empresa, sus clientes y sus mercados (opcional)',
    submit: 'Enviar solicitud',
    sending: 'Enviando…',
    verify: 'Un momento — estamos comprobando que no es un robot.',
    error: `Algo ha fallado. Inténtelo de nuevo o escríbanos a ${SALES_EMAIL}.`,
    doneTitle: '¡Gracias!',
    doneText: 'Hemos recibido su solicitud de partner. Nuestro equipo le responderá por correo electrónico.',
    again: 'Enviar otra solicitud',
    explore: 'Volver al inicio',
  },
  nl: {
    eyebrow: 'Partner worden',
    title: 'Laat uw bedrijf groeien met',
    accent: 'United Addins.',
    lead: 'Verkoop, implementeer of beveel de software aan die wij distribueren — met een geautoriseerd Foxit-distributeur achter u.',
    list: ['Geautoriseerd Foxit-distributeur sinds 2012', 'Foxit, Mekko Graphics en meer bij één distributeur', 'Licentie- en pre-salesondersteuning door ons team'],
    nextLabel: 'Zo gaat het verder',
    next: [
      ['Wij bekijken uw aanmelding', 'Ons team bekijkt uw bedrijf en de producten die u interesseren.'],
      ['Wij nemen contact op', 'In een gesprek zoeken we het partnermodel dat past.'],
      ['Samen aan de slag', 'Onboarding, productinformatie en licentieondersteuning.'],
    ],
    step1: '1. Soort partnerschap',
    types: {
      Reseller: ['Reseller', 'U verkoopt software aan uw eigen klanten.'],
      'IT services / integrator': ['IT-dienstverlener', 'U implementeert en ondersteunt software voor uw klanten.'],
      'Referral partner': ['Doorverwijzing', 'U beveelt ons aan — wij regelen de verkoop.'],
      'Software vendor': ['Softwareleverancier', 'U maakt software en wilt dat wij die distribueren.'],
    },
    step2: '2. Producten die u interesseren',
    notSure: 'Weet ik nog niet',
    step3: '3. Uw bedrijf',
    company: 'Bedrijf',
    website: 'Website (optioneel)',
    country: 'Land',
    size: 'Medewerkers',
    select: 'Kiezen',
    step4: '4. Uw gegevens',
    firstName: 'Voornaam',
    lastName: 'Achternaam',
    email: 'Zakelijk e-mailadres',
    phone: 'Telefoon (optioneel)',
    role: 'Functie (optioneel)',
    message: 'Vertel ons over uw bedrijf, klanten en markten (optioneel)',
    submit: 'Aanmelding versturen',
    sending: 'Verzenden…',
    verify: 'Een ogenblik — we controleren of u geen robot bent.',
    error: `Er is iets misgegaan. Probeer het opnieuw of mail ons via ${SALES_EMAIL}.`,
    doneTitle: 'Bedankt!',
    doneText: 'Uw partneraanmelding is ontvangen. Ons team neemt per e-mail contact met u op.',
    again: 'Nog een aanmelding versturen',
    explore: 'Terug naar de startpagina',
  },
  it: {
    eyebrow: 'Diventa partner',
    title: 'Fai crescere la tua attività con',
    accent: 'United Addins.',
    lead: 'Rivendi, implementa o raccomanda il software che distribuiamo — con un distributore autorizzato Foxit al tuo fianco.',
    list: ['Distributore autorizzato Foxit dal 2012', 'Foxit, Mekko Graphics e altro da un unico distributore', 'Supporto licenze e pre-vendita dal nostro team'],
    nextLabel: 'Cosa succede dopo',
    next: [
      ['Esaminiamo la tua candidatura', 'Il nostro team valuta la tua attività e i prodotti che ti interessano.'],
      ['Ti contattiamo', 'Una chiamata per trovare il modello di partnership più adatto.'],
      ['Iniziamo a collaborare', 'Onboarding, informazioni sui prodotti e supporto licenze.'],
    ],
    step1: '1. Tipo di partnership',
    types: {
      Reseller: ['Rivenditore', 'Vendi software ai tuoi clienti.'],
      'IT services / integrator': ['Servizi IT', 'Implementi e supporti software per i tuoi clienti.'],
      'Referral partner': ['Segnalatore', 'Ci raccomandi — noi gestiamo la vendita.'],
      'Software vendor': ['Produttore di software', 'Sviluppi software e vuoi che lo distribuiamo.'],
    },
    step2: '2. Prodotti che ti interessano',
    notSure: 'Non lo so ancora',
    step3: '3. La tua azienda',
    company: 'Azienda',
    website: 'Sito web (facoltativo)',
    country: 'Paese',
    size: 'Dipendenti',
    select: 'Seleziona',
    step4: '4. I tuoi dati',
    firstName: 'Nome',
    lastName: 'Cognome',
    email: 'E-mail aziendale',
    phone: 'Telefono (facoltativo)',
    role: 'Ruolo (facoltativo)',
    message: 'Raccontaci della tua attività, dei tuoi clienti e mercati (facoltativo)',
    submit: 'Invia candidatura',
    sending: 'Invio in corso…',
    verify: 'Un momento — stiamo verificando che tu non sia un robot.',
    error: `Qualcosa è andato storto. Riprova o scrivici a ${SALES_EMAIL}.`,
    doneTitle: 'Grazie!',
    doneText: 'Abbiamo ricevuto la tua candidatura come partner. Il nostro team ti risponderà via e-mail.',
    again: 'Invia un’altra candidatura',
    explore: 'Torna alla home',
  },
  pl: {
    eyebrow: 'Zostań partnerem',
    title: 'Rozwijaj swój biznes z',
    accent: 'United Addins.',
    lead: 'Sprzedawaj, wdrażaj lub polecaj oprogramowanie, które dystrybuujemy — z autoryzowanym dystrybutorem Foxit u boku.',
    list: ['Autoryzowany dystrybutor Foxit od 2012 roku', 'Foxit, Mekko Graphics i inne od jednego dystrybutora', 'Wsparcie licencyjne i przedsprzedażowe naszego zespołu'],
    nextLabel: 'Co dalej',
    next: [
      ['Analizujemy zgłoszenie', 'Nasz zespół zapoznaje się z Twoją firmą i produktami, które Cię interesują.'],
      ['Kontaktujemy się z Tobą', 'Podczas rozmowy dobieramy odpowiedni model współpracy.'],
      ['Zaczynamy współpracę', 'Onboarding, informacje o produktach i wsparcie licencyjne.'],
    ],
    step1: '1. Rodzaj partnerstwa',
    types: {
      Reseller: ['Reseller', 'Sprzedajesz oprogramowanie własnym klientom.'],
      'IT services / integrator': ['Usługi IT', 'Wdrażasz i wspierasz oprogramowanie u swoich klientów.'],
      'Referral partner': ['Polecenia', 'Polecasz nas — my zajmujemy się sprzedażą.'],
      'Software vendor': ['Producent oprogramowania', 'Tworzysz oprogramowanie i chcesz, żebyśmy je dystrybuowali.'],
    },
    step2: '2. Produkty, które Cię interesują',
    notSure: 'Jeszcze nie wiem',
    step3: '3. Twoja firma',
    company: 'Firma',
    website: 'Strona internetowa (opcjonalnie)',
    country: 'Kraj',
    size: 'Liczba pracowników',
    select: 'Wybierz',
    step4: '4. Twoje dane',
    firstName: 'Imię',
    lastName: 'Nazwisko',
    email: 'Służbowy e-mail',
    phone: 'Telefon (opcjonalnie)',
    role: 'Stanowisko (opcjonalnie)',
    message: 'Opowiedz nam o swojej firmie, klientach i rynkach (opcjonalnie)',
    submit: 'Wyślij zgłoszenie',
    sending: 'Wysyłanie…',
    verify: 'Chwileczkę — sprawdzamy, czy nie jesteś robotem.',
    error: `Coś poszło nie tak. Spróbuj ponownie lub napisz do nas na ${SALES_EMAIL}.`,
    doneTitle: 'Dziękujemy!',
    doneText: 'Otrzymaliśmy Twoje zgłoszenie partnerskie. Nasz zespół odpowie Ci e-mailem.',
    again: 'Wyślij kolejne zgłoszenie',
    explore: 'Wróć na stronę główną',
  },
}

export default function PartnerForm() {
  const t = useT(T)
  const lang = useLang()
  const [type, setType] = useState(TYPE_KEYS[0])
  const [interest, setInterest] = useState([]) // product names, or 'Not sure yet'
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const turnstile = useTurnstile(!sent, lang)

  const toggle = (name) =>
    setInterest((list) => {
      if (list.includes(name)) return list.filter((x) => x !== name)
      // "Not sure yet" and specific products exclude each other.
      if (name === 'Not sure yet') return [name]
      return [...list.filter((x) => x !== 'Not sure yet'), name]
    })

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (data._honey) return // spam bot
    if (turnstile.pending()) {
      setError(t.verify)
      return
    }
    const details = {
      'Partnership type': type,
      'Interested in': interest.length ? interest.join(', ') : 'Not specified',
      Company: data.company,
      Website: data.website,
      Country: data.country,
      Employees: data.size,
      'First name': data.firstName,
      'Last name': data.lastName,
      Email: data.email,
      Phone: data.phone,
      'Job title': data.role,
      Message: data.message,
      Language: lang.toUpperCase(),
    }
    setSending(true)
    setError('')
    try {
      await sendForm({
        kind: 'partner',
        subject: `Partner application — ${type} (${data.company}, ${data.country})`,
        replyTo: data.email,
        details,
        turnstileToken: turnstile.token,
        honey: data._honey,
      })
      form.reset()
      setInterest([])
      setSent(true)
    } catch {
      setError(t.error)
      turnstile.reset()
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="section contact" id="partner">
      <div className="container">
        <div className="contact__card" data-reveal>
          <div className="contact__copy">
            <span className="eyebrow eyebrow--light">{t.eyebrow}</span>
            <h1 className="section-title">{t.title} <span className="accent">{t.accent}</span></h1>
            <p className="contact__lead">{t.lead}</p>
            <ul className="contact__list">
              {t.list.map((x) => <li key={x}><Check /> {x}</li>)}
            </ul>
            <a className="contact__mail" href={`mailto:${SALES_EMAIL}?subject=Partnership%20inquiry`}>
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

          <form className="form" id="apply" onSubmit={onSubmit}>
            {sent ? (
              <div className="form__done" role="status" aria-live="polite">
                <span className="form__done-badge">
                  <span className="confetti" aria-hidden="true">
                    {CONFETTI.map((style, i) => <i key={i} style={style} />)}
                  </span>
                  <svg viewBox="0 0 52 52" aria-hidden="true">
                    <circle className="form__done-circle" cx="26" cy="26" r="24" />
                    <path className="form__done-check" d="M15 27l7 7 15-16" />
                  </svg>
                </span>
                <h2>{t.doneTitle}</h2>
                <p>{t.doneText}</p>
                <div className="form__done-actions">
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSent(false)}>{t.again}</button>
                  <L to="/" className="btn btn-primary btn-sm">{t.explore} <Arrow /></L>
                </div>
              </div>
            ) : (
              <>
                <fieldset className="qb">
                  <legend>{t.step1}</legend>
                  <div className="qb__types qb__types--wrap" role="radiogroup" aria-label={t.step1}>
                    {TYPE_KEYS.map((k) => (
                      <button
                        key={k}
                        type="button"
                        role="radio"
                        aria-checked={type === k}
                        className={`qb__type ${type === k ? 'is-active' : ''}`}
                        onClick={() => setType(k)}
                      >
                        {t.types[k][0]}
                      </button>
                    ))}
                  </div>
                  <p className="qb__hint" key={type}>{t.types[type][1]}</p>
                </fieldset>

                <fieldset className="qb">
                  <legend>{t.step2}</legend>
                  <div className="pchips">
                    {[...INTEREST, 'Not sure yet'].map((name) => {
                      const on = interest.includes(name)
                      return (
                        <button key={name} type="button" className={`pchip ${on ? 'is-on' : ''}`} aria-pressed={on} onClick={() => toggle(name)}>
                          {on && <Check />} {name === 'Not sure yet' ? t.notSure : name}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                <fieldset className="qb">
                  <legend>{t.step3}</legend>
                  <div className="qb__fields">
                    <div className="form__row">
                      <label>
                        <span>{t.company}</span>
                        <input name="company" required autoComplete="organization" />
                      </label>
                      <label>
                        <span>{t.website}</span>
                        <input name="website" inputMode="url" autoComplete="url" />
                      </label>
                    </div>
                    <div className="form__row">
                      <label>
                        <span>{t.country}</span>
                        <input name="country" required autoComplete="country-name" />
                      </label>
                      <label>
                        <span>{t.size}</span>
                        <select name="size" defaultValue="">
                          <option value="" disabled>{t.select}</option>
                          {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </label>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="qb">
                  <legend>{t.step4}</legend>
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
                        <span>{t.phone}</span>
                        <input type="tel" name="phone" autoComplete="tel" />
                      </label>
                    </div>
                    <label>
                      <span>{t.role}</span>
                      <input name="role" autoComplete="organization-title" />
                    </label>
                    <label>
                      <span>{t.message}</span>
                      <textarea name="message" rows="3" />
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
