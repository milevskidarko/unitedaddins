import { Fragment, useEffect, useRef } from 'react'
import { Arrow, Shield, Bolt, Headset, Check, Sign, Key, Award, Handshake } from './Icons.jsx'
import { L, useT, useLang } from '../i18n.jsx'
import './Hero.css'

// Illustrative Marimekko for the Mekko Graphics window: column width = segment size.
const mekko = [
  { w: 34, parts: [40, 30, 18, 12] },
  { w: 26, parts: [28, 34, 24, 14] },
  { w: 22, parts: [22, 26, 34, 18] },
  { w: 18, parts: [34, 22, 24, 20] },
]

// Headline, split into words so each one can rise in on load.
const T = {
  en: {
    title: [
      ['The', 'right', 'software.'],
      ['The', 'right', { accent: 'partnership.' }],
    ],
    pill: 'Software licensing & distribution partner',
    lead: 'We help organizations find, license and get the most from trusted software solutions — from PDF & eSign to consulting-grade data visualization.',
    explore: 'Explore our solutions',
    talk: 'Talk to our team',
    trust: [
      ['Secure & reliable', 'Enterprise-grade'],
      ['Flexible licensing', 'For any team size'],
      ['Expert support', 'When you need us'],
    ],
    contract: 'Service agreement.pdf',
    signed: 'Signed',
    market: 'Market share.pptx',
    quoteSent: 'Quote request sent',
    quoteText: 'Foxit PDF Editor+ × 25 licenses',
    contractSigned: 'Contract signed',
    via: 'via Foxit eSign · just now',
    caseTitle: '~650 users on Foxit',
    caseText: 'Motor Presse Stuttgart · case study',
    sinceTitle: 'Since 2012',
    sinceText: 'Authorized Foxit distributor',
  },
  de: {
    title: [
      ['Die', 'richtige', 'Software.'],
      ['Die', 'richtige', { accent: 'Partnerschaft.' }],
    ],
    pill: 'Partner für Softwarelizenzierung & -vertrieb',
    lead: 'Wir helfen Unternehmen, bewährte Softwarelösungen zu finden, zu lizenzieren und optimal zu nutzen — von PDF & eSign bis zur Datenvisualisierung auf Beratungsniveau.',
    explore: 'Lösungen entdecken',
    talk: 'Mit unserem Team sprechen',
    trust: [
      ['Sicher & zuverlässig', 'Für Unternehmen'],
      ['Flexible Lizenzen', 'Für jede Teamgröße'],
      ['Expertensupport', 'Wenn Sie uns brauchen'],
    ],
    contract: 'Dienstleistungsvertrag.pdf',
    signed: 'Signiert',
    market: 'Marktanteile.pptx',
    quoteSent: 'Angebotsanfrage gesendet',
    quoteText: 'Foxit PDF Editor+ × 25 Lizenzen',
    contractSigned: 'Vertrag signiert',
    via: 'mit Foxit eSign · gerade eben',
    caseTitle: '~650 Nutzer auf Foxit',
    caseText: 'Motor Presse Stuttgart · Fallstudie',
    sinceTitle: 'Seit 2012',
    sinceText: 'Autorisierter Foxit-Distributor',
  },
  fr: {
    title: [
      ['Le', 'bon', 'logiciel.'],
      ['Le', 'bon', { accent: 'partenaire.' }],
    ],
    pill: 'Partenaire en licences et distribution de logiciels',
    lead: 'Nous aidons les organisations à trouver, acquérir et exploiter pleinement des solutions logicielles fiables — du PDF et de la signature électronique à la visualisation de données de niveau conseil.',
    explore: 'Découvrir nos solutions',
    talk: 'Parler à notre équipe',
    trust: [
      ['Sûr et fiable', 'Niveau entreprise'],
      ['Licences flexibles', 'Pour toutes les tailles d’équipe'],
      ['Support expert', 'Quand vous en avez besoin'],
    ],
    contract: 'Contrat de service.pdf',
    signed: 'Signé',
    market: 'Parts de marché.pptx',
    quoteSent: 'Demande de devis envoyée',
    quoteText: 'Foxit PDF Editor+ × 25 licences',
    contractSigned: 'Contrat signé',
    via: 'via Foxit eSign · à l’instant',
    caseTitle: '~650 utilisateurs sur Foxit',
    caseText: 'Motor Presse Stuttgart · étude de cas',
    sinceTitle: 'Depuis 2012',
    sinceText: 'Distributeur agréé Foxit',
  },
  es: {
    title: [
      ['El', 'software', 'adecuado.'],
      ['El', 'socio', { accent: 'adecuado.' }],
    ],
    pill: 'Socio en licencias y distribución de software',
    lead: 'Ayudamos a las organizaciones a encontrar, licenciar y sacar el máximo partido a soluciones de software de confianza — desde PDF y firma electrónica hasta visualización de datos de nivel consultoría.',
    explore: 'Descubra nuestras soluciones',
    talk: 'Hable con nuestro equipo',
    trust: [
      ['Seguro y fiable', 'Nivel empresarial'],
      ['Licencias flexibles', 'Para equipos de cualquier tamaño'],
      ['Soporte experto', 'Cuando nos necesite'],
    ],
    contract: 'Contrato de servicio.pdf',
    signed: 'Firmado',
    market: 'Cuota de mercado.pptx',
    quoteSent: 'Solicitud de presupuesto enviada',
    quoteText: 'Foxit PDF Editor+ × 25 licencias',
    contractSigned: 'Contrato firmado',
    via: 'con Foxit eSign · ahora mismo',
    caseTitle: '~650 usuarios en Foxit',
    caseText: 'Motor Presse Stuttgart · caso de éxito',
    sinceTitle: 'Desde 2012',
    sinceText: 'Distribuidor autorizado de Foxit',
  },
  nl: {
    title: [
      ['De', 'juiste', 'software.'],
      ['De', 'juiste', { accent: 'partner.' }],
    ],
    pill: 'Partner in softwarelicenties en -distributie',
    lead: 'Wij helpen organisaties betrouwbare softwareoplossingen te vinden, te licentiëren en er het maximale uit te halen — van PDF en e-handtekening tot datavisualisatie op consultancyniveau.',
    explore: 'Ontdek onze oplossingen',
    talk: 'Spreek met ons team',
    trust: [
      ['Veilig en betrouwbaar', 'Zakelijk niveau'],
      ['Flexibele licenties', 'Voor elke teamgrootte'],
      ['Deskundige support', 'Wanneer u ons nodig hebt'],
    ],
    contract: 'Servicecontract.pdf',
    signed: 'Ondertekend',
    market: 'Marktaandeel.pptx',
    quoteSent: 'Offerteaanvraag verzonden',
    quoteText: 'Foxit PDF Editor+ × 25 licenties',
    contractSigned: 'Contract ondertekend',
    via: 'via Foxit eSign · zojuist',
    caseTitle: '~650 gebruikers op Foxit',
    caseText: 'Motor Presse Stuttgart · casestudy',
    sinceTitle: 'Sinds 2012',
    sinceText: 'Geautoriseerd Foxit-distributeur',
  },
  it: {
    title: [
      ['Il', 'software', 'giusto.'],
      ['Il', 'partner', { accent: 'giusto.' }],
    ],
    pill: 'Partner per licenze e distribuzione software',
    lead: 'Aiutiamo le organizzazioni a trovare, acquistare in licenza e sfruttare al meglio soluzioni software affidabili — dal PDF e la firma elettronica alla visualizzazione dei dati di livello consulenziale.',
    explore: 'Scopri le nostre soluzioni',
    talk: 'Parla con il nostro team',
    trust: [
      ['Sicuro e affidabile', 'Livello enterprise'],
      ['Licenze flessibili', 'Per team di ogni dimensione'],
      ['Supporto esperto', 'Quando ti serve'],
    ],
    contract: 'Contratto di servizio.pdf',
    signed: 'Firmato',
    market: 'Quote di mercato.pptx',
    quoteSent: 'Richiesta di preventivo inviata',
    quoteText: 'Foxit PDF Editor+ × 25 licenze',
    contractSigned: 'Contratto firmato',
    via: 'con Foxit eSign · proprio ora',
    caseTitle: '~650 utenti su Foxit',
    caseText: 'Motor Presse Stuttgart · caso di studio',
    sinceTitle: 'Dal 2012',
    sinceText: 'Distributore autorizzato Foxit',
  },
  pl: {
    title: [
      ['Właściwe', 'oprogramowanie.'],
      ['Właściwy', { accent: 'partner.' }],
    ],
    pill: 'Partner w licencjonowaniu i dystrybucji oprogramowania',
    lead: 'Pomagamy organizacjom znaleźć, licencjonować i w pełni wykorzystać sprawdzone oprogramowanie — od PDF i podpisu elektronicznego po wizualizację danych na poziomie firm doradczych.',
    explore: 'Poznaj nasze rozwiązania',
    talk: 'Porozmawiaj z naszym zespołem',
    trust: [
      ['Bezpiecznie i niezawodnie', 'Klasa korporacyjna'],
      ['Elastyczne licencje', 'Dla zespołów każdej wielkości'],
      ['Eksperckie wsparcie', 'Kiedy go potrzebujesz'],
    ],
    contract: 'Umowa serwisowa.pdf',
    signed: 'Podpisano',
    market: 'Udział w rynku.pptx',
    quoteSent: 'Wysłano zapytanie o wycenę',
    quoteText: 'Foxit PDF Editor+ × 25 licencji',
    contractSigned: 'Umowa podpisana',
    via: 'przez Foxit eSign · przed chwilą',
    caseTitle: '~650 użytkowników na Foxit',
    caseText: 'Motor Presse Stuttgart · case study',
    sinceTitle: 'Od 2012 roku',
    sinceText: 'Autoryzowany dystrybutor Foxit',
  },
}
const TRUST_ICONS = [Shield, Bolt, Headset]

export default function Hero() {
  const t = useT(T)
  const lang = useLang()
  const ref = useRef(null)

  // Cursor light + gentle parallax of the product windows (mouse/trackpad only).
  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        el.style.setProperty('--hx', `${e.clientX - r.left}px`)
        el.style.setProperty('--hy', `${e.clientY - r.top}px`)
        el.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
        el.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
      })
    }
    el.addEventListener('pointermove', onMove)
    return () => {
      el.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  let wi = 0
  return (
    <section className="hero" ref={ref}>
      <div className="hero__bg" aria-hidden="true">
        <span className="aurora aurora--1" />
        <span className="aurora aurora--2" />
        <span className="aurora aurora--3" />
        <span className="ribbon ribbon--1" />
        <span className="ribbon ribbon--2" />
        <span className="hero__grid" />
        <span className="hero__spot" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="pill" data-reveal>
            <span className="pill__dot" /> {t.pill}
          </span>
          <h1 className={`hero__title hero__title--${lang}`} key={lang}>
            {t.title.map((line, li) => (
              <span key={li} className="hero__line">
                {line.map((w) => {
                  const i = wi++
                  const text = typeof w === 'string' ? w : w.accent
                  return (
                    <Fragment key={i}>
                      <span className="hero__word">
                        <span
                          className={typeof w === 'string' ? '' : 'accent grad-text'}
                          style={{ '--i': i }}
                        >
                          {text}
                        </span>
                      </span>{' '}
                    </Fragment>
                  )
                })}
              </span>
            ))}
          </h1>
          <p className="hero__lead" data-reveal style={{ '--d': '0.5s' }}>{t.lead}</p>
          <div className="hero__ctas" data-reveal style={{ '--d': '0.6s' }}>
            <a href="#partners" className="btn btn-primary">{t.explore} <Arrow /></a>
            <L to="/contact" className="btn btn-ghost">{t.talk}</L>
          </div>
          <ul className="hero__trust" data-reveal style={{ '--d': '0.7s' }}>
            {t.trust.map(([title, sub], i) => {
              const Icon = TRUST_ICONS[i]
              return <li key={i}><Icon /><span><strong>{title}</strong><small>{sub}</small></span></li>
            })}
          </ul>
        </div>

        {/* Stylized, illustrative product windows: a PDF being redacted & signed, and a Mekko chart. */}
        <div className="hero__visual" aria-hidden="true">
          <span className="hero__halo" />
          <div className="glass win win--pdf float-a">
            <div className="win__bar">
              <span className="win__app win__app--pdf">PDF</span>
              <em>{t.contract}</em>
            </div>
            <div className="win__page">
              <span className="ln ln--h ln--w60" />
              <span className="ln ln--w90" />
              <span className="ln ln--w75" />
              <span className="redact-row">
                <span className="ln ln--w30" />
                <span className="redact" />
                <span className="ln ln--w20" />
              </span>
              <span className="ln ln--w80" />
              <span className="ln ln--w60" />
              <div className="sig">
                <svg viewBox="0 0 160 44">
                  <path d="M6 30c10-14 18-22 22-18s-8 22-2 22 14-26 22-24-4 20 2 20 10-12 16-12 4 10 10 10 12-8 20-10 16 2 26-2 14-6 26-6" />
                </svg>
                <small>{t.signed}</small>
              </div>
            </div>
          </div>

          <div className="glass win win--mekko float-b">
            <div className="win__bar">
              <span className="win__app win__app--mekko">M</span>
              <em>{t.market}</em>
            </div>
            <div className="mini-mekko">
              {mekko.map((c, ci) => (
                <span key={ci} className="mini-mekko__col" style={{ flexGrow: c.w }}>
                  {c.parts.map((p, pi) => (
                    <span
                      key={pi}
                      className={`mini-mekko__seg mini-mekko__seg--${pi}`}
                      style={{ flexGrow: p, '--delay': `${0.5 + 0.12 * ci + 0.06 * pi}s` }}
                    />
                  ))}
                </span>
              ))}
            </div>
          </div>

          <div className="glass chip chip--quote float-c">
            <span className="chip__ic chip__ic--blue"><Key /></span>
            <span>
              <strong>{t.quoteSent}</strong>
              <small>{t.quoteText}</small>
            </span>
          </div>

          <div className="glass chip chip--sign float-d">
            <span className="chip__ic chip__ic--orange"><Sign /></span>
            <span>
              <strong>{t.contractSigned}</strong>
              <small>{t.via}</small>
            </span>
            <Check className="chip__ok" />
          </div>

          {/* Facts from the case studies and "Why us" further down, floating with the windows. */}
          <div className="glass chip chip--case float-e">
            <span className="chip__ic chip__ic--green"><Award /></span>
            <span>
              <strong>{t.caseTitle}</strong>
              <small>{t.caseText}</small>
            </span>
          </div>

          <div className="glass chip chip--since float-f">
            <span className="chip__ic chip__ic--navy"><Handshake /></span>
            <span>
              <strong>{t.sinceTitle}</strong>
              <small>{t.sinceText}</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
