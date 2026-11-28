import { useState } from 'react'
import { Arrow, Check, Mail } from './Icons.jsx'
import { L, useT, useLang } from '../i18n.jsx'
import { PRODUCTS as MORE_PRODUCTS } from '../products.js'
import { SALES_EMAIL, TURNSTILE_SITE_KEY, CONFETTI, sendForm, useTurnstile } from '../sendForm.js'
import './Contact.css'

// Product names are the same in every language (they are also the keys of the quote).
const PRODUCTS = [
  // perpetual: also sold as a one-time license (Windows & macOS). Prices are quoted individually.
  { name: 'Foxit PDF Editor', tone: 'orange', perpetual: true },
  { name: 'Foxit PDF Editor+', tone: 'violet' },
  { name: 'Foxit eSign', tone: 'blue' },
  { name: 'Mekko Graphics', tone: 'navy' },
  { name: 'Efficient Elements', color: '#0f8f7e' },
  // Further products (products.js): listed under "More products" so the core ones stay up front.
  ...MORE_PRODUCTS.map((p) => ({ name: p.name, color: p.tone, more: true, source: p })),
]
// The web form is for new purchases only: renewals, upgrades and added seats come from existing
// customers, who contact their account manager directly (feedback from sales, Nov 2026).
const REQUEST_TYPE = 'New purchase'
const MAX_SEATS = 9999

const T = {
  en: {
    eyebrow: 'Build your quote',
    title: 'Let’s find the right software for',
    accent: 'your team.',
    lead: 'Pick your products and number of licenses — we’ll come back with a tailored quote.',
    list: ['Subscription and perpetual licensing for any team size', 'One contact for Foxit, Mekko Graphics and more', 'Advice on the right plan for your needs'],
    nextLabel: 'What happens next',
    // No response times promised on purpose — add one only if the team commits to it.
    next: [
      ['We review your request', 'A licensing specialist checks your products, seats and current setup.'],
      ['You get a tailored quote', 'Clear pricing for your team, with options if there is a better fit.'],
      ['Licensing & onboarding', 'We deliver your licenses and help you get up and running.'],
    ],
    legend: '1. Products & licenses',
    unit: ['license', 'licenses'],
    notes: {
      'Foxit PDF Editor': 'Windows, macOS, Web',
      'Foxit PDF Editor+': '+ mobile, Smart Redact, eSign',
      'Foxit eSign': 'Templates, bulk send, audit trails',
      'Mekko Graphics': 'Add-in for PowerPoint & Excel',
      'Efficient Elements': 'Add-in for PowerPoint',
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
    step2: '2. Your details',
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
    list: ['Abonnement- und Dauerlizenzen für jede Teamgröße', 'Ein Ansprechpartner für Foxit, Mekko Graphics und mehr', 'Beratung zum passenden Plan für Ihren Bedarf'],
    nextLabel: 'So geht es weiter',
    next: [
      ['Wir prüfen Ihre Anfrage', 'Ein Lizenzspezialist prüft Produkte, Lizenzanzahl und Ihre aktuelle Umgebung.'],
      ['Sie erhalten ein individuelles Angebot', 'Klare Preise für Ihr Team — mit Alternativen, falls es eine bessere Lösung gibt.'],
      ['Lizenzierung & Einführung', 'Wir liefern Ihre Lizenzen und helfen Ihnen beim Start.'],
    ],
    legend: '1. Produkte & Lizenzen',
    unit: ['Lizenz', 'Lizenzen'],
    notes: {
      'Foxit PDF Editor': 'Windows, macOS, Web',
      'Foxit PDF Editor+': '+ Mobil, Smart Redact, eSign',
      'Foxit eSign': 'Vorlagen, Massenversand, Prüfprotokolle',
      'Mekko Graphics': 'Add-in für PowerPoint & Excel',
      'Efficient Elements': 'Add-in für PowerPoint',
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
    step2: '2. Ihre Angaben',
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
    list: ['Abonnements et licences perpétuelles pour toutes les tailles d’équipe', 'Un seul interlocuteur pour Foxit, Mekko Graphics et plus', 'Conseils sur l’offre adaptée à vos besoins'],
    nextLabel: 'Les étapes suivantes',
    next: [
      ['Nous étudions votre demande', 'Un spécialiste des licences vérifie vos produits, le nombre de postes et votre configuration actuelle.'],
      ['Vous recevez un devis sur mesure', 'Des prix clairs pour votre équipe, avec des alternatives s’il existe une meilleure option.'],
      ['Licences et mise en route', 'Nous livrons vos licences et vous aidons à démarrer.'],
    ],
    legend: '1. Produits et licences',
    unit: ['licence', 'licences'],
    notes: {
      'Foxit PDF Editor': 'Windows, macOS, Web',
      'Foxit PDF Editor+': '+ mobile, Smart Redact, eSign',
      'Foxit eSign': 'Modèles, envoi en masse, pistes d’audit',
      'Mekko Graphics': 'Complément pour PowerPoint et Excel',
      'Efficient Elements': 'Complément pour PowerPoint',
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
    step2: '2. Vos coordonnées',
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
  es: {
    eyebrow: 'Prepare su presupuesto',
    title: 'Encontremos el software adecuado para',
    accent: 'su equipo.',
    lead: 'Elija sus productos y el número de licencias — le enviaremos un presupuesto a medida.',
    list: ['Licencias por suscripción y perpetuas para equipos de cualquier tamaño', 'Un solo contacto para Foxit, Mekko Graphics y más', 'Asesoramiento sobre el plan adecuado para sus necesidades'],
    nextLabel: 'Próximos pasos',
    next: [
      ['Revisamos su solicitud', 'Un especialista en licencias comprueba sus productos, puestos y configuración actual.'],
      ['Recibe un presupuesto a medida', 'Precios claros para su equipo, con alternativas si hay una opción mejor.'],
      ['Licencias y puesta en marcha', 'Le entregamos las licencias y le ayudamos a empezar.'],
    ],
    legend: '1. Productos y licencias',
    unit: ['licencia', 'licencias'],
    notes: {
      'Foxit PDF Editor': 'Windows, macOS, Web',
      'Foxit PDF Editor+': '+ móvil, Smart Redact, eSign',
      'Foxit eSign': 'Plantillas, envío masivo, registros de auditoría',
      'Mekko Graphics': 'Complemento para PowerPoint y Excel',
      'Efficient Elements': 'Complemento para PowerPoint',
    },
    perpetualNote: 'Windows y macOS · licencia de pago único',
    moreProducts: (n) => `Más productos (${n})`,
    fewerProducts: 'Menos productos',
    licenseType: 'tipo de licencia',
    subscription: 'Suscripción',
    perpetual: 'Perpetua (pago único)',
    fewer: 'Menos licencias',
    more: 'Más licencias',
    number: (p) => `Número de licencias de ${p}`,
    step2: '2. Sus datos',
    none: 'Aún no ha seleccionado productos.',
    notSure: '¿No está seguro? Encuentre su plan →',
    firstName: 'Nombre',
    lastName: 'Apellidos',
    email: 'Correo electrónico de empresa',
    company: 'Empresa',
    message: 'Mensaje (opcional)',
    submit: 'Solicitar presupuesto',
    sending: 'Enviando…',
    pickProduct: 'Seleccione al menos un producto para su presupuesto.',
    verify: 'Un momento — estamos comprobando que no es un robot.',
    error: `Algo ha fallado. Inténtelo de nuevo o escríbanos a ${SALES_EMAIL}.`,
    doneTitle: '¡Gracias!',
    doneText: 'Hemos recibido su solicitud de presupuesto. Un especialista en licencias le responderá por correo electrónico.',
    doneSummary: 'Su solicitud',
    again: 'Enviar otra solicitud',
    explore: 'Volver al inicio',
  },
  nl: {
    eyebrow: 'Stel uw offerte samen',
    title: 'Laten we de juiste software vinden voor',
    accent: 'uw team.',
    lead: 'Kies uw producten en het aantal licenties — wij komen terug met een offerte op maat.',
    list: ['Abonnementen en eeuwigdurende licenties voor elke teamgrootte', 'Eén aanspreekpunt voor Foxit, Mekko Graphics en meer', 'Advies over het juiste abonnement voor uw behoeften'],
    nextLabel: 'Zo gaat het verder',
    next: [
      ['Wij bekijken uw aanvraag', 'Een licentiespecialist controleert uw producten, aantal gebruikers en huidige situatie.'],
      ['U ontvangt een offerte op maat', 'Duidelijke prijzen voor uw team, met alternatieven als er een betere optie is.'],
      ['Licenties en implementatie', 'Wij leveren uw licenties en helpen u op weg.'],
    ],
    legend: '1. Producten en licenties',
    unit: ['licentie', 'licenties'],
    notes: {
      'Foxit PDF Editor': 'Windows, macOS, Web',
      'Foxit PDF Editor+': '+ mobiel, Smart Redact, eSign',
      'Foxit eSign': 'Sjablonen, bulkverzending, audittrails',
      'Mekko Graphics': 'Invoegtoepassing voor PowerPoint en Excel',
      'Efficient Elements': 'Invoegtoepassing voor PowerPoint',
    },
    perpetualNote: 'Windows en macOS · eenmalige licentie',
    moreProducts: (n) => `Meer producten (${n})`,
    fewerProducts: 'Minder producten',
    licenseType: 'licentietype',
    subscription: 'Abonnement',
    perpetual: 'Eeuwigdurend (eenmalig)',
    fewer: 'Minder licenties',
    more: 'Meer licenties',
    number: (p) => `Aantal licenties voor ${p}`,
    step2: '2. Uw gegevens',
    none: 'Nog geen producten geselecteerd.',
    notSure: 'Twijfelt u? Vind uw abonnement →',
    firstName: 'Voornaam',
    lastName: 'Achternaam',
    email: 'Zakelijk e-mailadres',
    company: 'Bedrijf',
    message: 'Bericht (optioneel)',
    submit: 'Offerte aanvragen',
    sending: 'Verzenden…',
    pickProduct: 'Selecteer ten minste één product voor uw offerte.',
    verify: 'Een ogenblik — we controleren of u geen robot bent.',
    error: `Er is iets misgegaan. Probeer het opnieuw of mail ons via ${SALES_EMAIL}.`,
    doneTitle: 'Bedankt!',
    doneText: 'Uw offerteaanvraag is ontvangen. Een licentiespecialist neemt per e-mail contact met u op.',
    doneSummary: 'Uw aanvraag',
    again: 'Nog een aanvraag versturen',
    explore: 'Terug naar de startpagina',
  },
  it: {
    eyebrow: 'Componi il tuo preventivo',
    title: 'Troviamo il software giusto per',
    accent: 'il tuo team.',
    lead: 'Scegli i prodotti e il numero di licenze — ti risponderemo con un preventivo su misura.',
    list: ['Licenze in abbonamento e perpetue per team di ogni dimensione', 'Un unico referente per Foxit, Mekko Graphics e altro', 'Consulenza sul piano più adatto alle tue esigenze'],
    nextLabel: 'Cosa succede dopo',
    next: [
      ['Esaminiamo la tua richiesta', 'Uno specialista delle licenze verifica prodotti, numero di utenti e configurazione attuale.'],
      ['Ricevi un preventivo su misura', 'Prezzi chiari per il tuo team, con alternative se esiste una soluzione migliore.'],
      ['Licenze e avvio', 'Consegniamo le licenze e ti aiutiamo a partire.'],
    ],
    legend: '1. Prodotti e licenze',
    unit: ['licenza', 'licenze'],
    notes: {
      'Foxit PDF Editor': 'Windows, macOS, Web',
      'Foxit PDF Editor+': '+ mobile, Smart Redact, eSign',
      'Foxit eSign': 'Modelli, invio massivo, audit trail',
      'Mekko Graphics': 'Componente aggiuntivo per PowerPoint ed Excel',
      'Efficient Elements': 'Componente aggiuntivo per PowerPoint',
    },
    perpetualNote: 'Windows e macOS · licenza una tantum',
    moreProducts: (n) => `Altri prodotti (${n})`,
    fewerProducts: 'Meno prodotti',
    licenseType: 'tipo di licenza',
    subscription: 'Abbonamento',
    perpetual: 'Perpetua (una tantum)',
    fewer: 'Meno licenze',
    more: 'Più licenze',
    number: (p) => `Numero di licenze ${p}`,
    step2: '2. I tuoi dati',
    none: 'Nessun prodotto selezionato.',
    notSure: 'Non sei sicuro? Trova il tuo piano →',
    firstName: 'Nome',
    lastName: 'Cognome',
    email: 'E-mail aziendale',
    company: 'Azienda',
    message: 'Messaggio (facoltativo)',
    submit: 'Richiedi un preventivo',
    sending: 'Invio in corso…',
    pickProduct: 'Seleziona almeno un prodotto per il preventivo.',
    verify: 'Un momento — stiamo verificando che tu non sia un robot.',
    error: `Qualcosa è andato storto. Riprova o scrivici a ${SALES_EMAIL}.`,
    doneTitle: 'Grazie!',
    doneText: 'Abbiamo ricevuto la tua richiesta di preventivo. Uno specialista delle licenze ti risponderà via e-mail.',
    doneSummary: 'La tua richiesta',
    again: 'Invia un’altra richiesta',
    explore: 'Torna alla home',
  },
  pl: {
    eyebrow: 'Przygotuj wycenę',
    title: 'Znajdźmy odpowiednie oprogramowanie dla',
    accent: 'Twojego zespołu.',
    lead: 'Wybierz produkty i liczbę licencji — przygotujemy dla Ciebie indywidualną wycenę.',
    list: ['Licencje subskrypcyjne i wieczyste dla zespołów każdej wielkości', 'Jeden kontakt dla Foxit, Mekko Graphics i innych', 'Doradztwo w wyborze planu dopasowanego do Twoich potrzeb'],
    nextLabel: 'Co dalej',
    next: [
      ['Analizujemy zapytanie', 'Specjalista ds. licencji sprawdza produkty, liczbę stanowisk i obecne środowisko.'],
      ['Otrzymujesz indywidualną wycenę', 'Przejrzyste ceny dla Twojego zespołu, z alternatywami, jeśli istnieje lepsze rozwiązanie.'],
      ['Licencje i wdrożenie', 'Dostarczamy licencje i pomagamy w szybkim starcie.'],
    ],
    legend: '1. Produkty i licencje',
    // Polish has three plural forms; the form shows the count next to it, so "licencja / licencje" reads fine.
    unit: ['licencja', 'licencje'],
    notes: {
      'Foxit PDF Editor': 'Windows, macOS, Web',
      'Foxit PDF Editor+': '+ mobilne, Smart Redact, eSign',
      'Foxit eSign': 'Szablony, wysyłka masowa, ścieżki audytu',
      'Mekko Graphics': 'Dodatek do PowerPoint i Excel',
      'Efficient Elements': 'Dodatek do PowerPoint',
    },
    perpetualNote: 'Windows i macOS · licencja jednorazowa',
    moreProducts: (n) => `Więcej produktów (${n})`,
    fewerProducts: 'Mniej produktów',
    licenseType: 'typ licencji',
    subscription: 'Subskrypcja',
    perpetual: 'Wieczysta (jednorazowo)',
    fewer: 'Mniej licencji',
    more: 'Więcej licencji',
    number: (p) => `Liczba licencji ${p}`,
    step2: '2. Twoje dane',
    none: 'Nie wybrano jeszcze produktów.',
    notSure: 'Nie wiesz, co wybrać? Znajdź swój plan →',
    firstName: 'Imię',
    lastName: 'Nazwisko',
    email: 'Służbowy e-mail',
    company: 'Firma',
    message: 'Wiadomość (opcjonalnie)',
    submit: 'Poproś o wycenę',
    sending: 'Wysyłanie…',
    pickProduct: 'Wybierz co najmniej jeden produkt do wyceny.',
    verify: 'Chwileczkę — sprawdzamy, czy nie jesteś robotem.',
    error: `Coś poszło nie tak. Spróbuj ponownie lub napisz do nas na ${SALES_EMAIL}.`,
    doneTitle: 'Dziękujemy!',
    doneText: 'Otrzymaliśmy Twoje zapytanie o wycenę. Specjalista ds. licencji odpowie Ci e-mailem.',
    doneSummary: 'Twoje zapytanie',
    again: 'Wyślij kolejne zapytanie',
    explore: 'Wróć na stronę główną',
  },
}

function Confetti() {
  return (
    <span className="confetti" aria-hidden="true">
      {CONFETTI.map((style, i) => <i key={i} style={style} />)}
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
  const selected = PRODUCTS.filter((p) => items[p.name])
  // Extra products are folded away unless opened or already picked (e.g. from a product page).
  const moreCount = PRODUCTS.filter((p) => p.more).length
  const visibleProducts = PRODUCTS.filter((p) => !p.more || showMore || items[p.name])
  const noteFor = (p) => (p.source ? (p.source[lang] || p.source.en).note : t.notes[p.name])
  const isPerpetual = (p) => p.perpetual && quote.perpetual
  const unitFor = (n) => t.unit[n === 1 ? 0 : 1]
  const summary = selected
    .map((p) => `${p.name}${isPerpetual(p) ? ` (${t.perpetual})` : ''} × ${items[p.name]} ${unitFor(items[p.name])}`)
    .join(', ')
  // The sales team always gets the request in English.
  const summaryEn = selected
    .map((p) => `${p.name}${isPerpetual(p) ? ' (perpetual)' : ''} × ${items[p.name]} ${T.en.unit[items[p.name] === 1 ? 0 : 1]}`)
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
    if (turnstile.pending()) {
      setError(t.verify)
      return
    }

    const details = {
      'Request type': REQUEST_TYPE,
      Products: summaryEn,
      ...(perpetualProduct && {
        [`${perpetualProduct.name} license`]: quote.perpetual ? 'Perpetual (one-time purchase)' : 'Subscription',
      }),
      'First name': data.firstName,
      'Last name': data.lastName,
      Email: data.email,
      Company: data.company,
      Message: data.message,
      Language: lang.toUpperCase(),
    }

    setSending(true)
    setError('')
    try {
      await sendForm({
        kind: 'quote',
        subject: `${REQUEST_TYPE} — ${summaryEn} (${data.company || data.email})`,
        replyTo: data.email,
        details,
        turnstileToken: turnstile.token,
        honey: data._honey,
      })
      form.reset()
      setSent({ summary })
      setQuote({ items: {}, perpetual: false })
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
                    <small>{t.doneSummary}</small>
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
                  <legend>{t.legend}</legend>
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
                            <div className="qb__seats" title={t.unit[1]}>
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
                    {summary || t.none}
                    {' '}<L to="/foxit#plan">{t.notSure}</L>
                  </p>
                </fieldset>

                <fieldset className="qb">
                  <legend>{t.step2}</legend>
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
