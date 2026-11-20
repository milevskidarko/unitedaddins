import { Award, Key, Headset, Handshake, Arrow } from './Icons.jsx'
import CountUp from './CountUp.jsx'
import Leader from './Leader.jsx'
import { L, useLang, useT } from '../i18n.jsx'
import { CATEGORIES, PRODUCTS } from '../products.js'

// "N → 1": Foxit + Mekko Graphics + every other vendor in products.js.
const VENDOR_COUNT = 2 + new Set(PRODUCTS.map((p) => p.vendor)).size
import './WhyUs.css'

// Only verified facts in the numbers: Foxit distributor since 2012 (confirmed by owner) and ~650 users at
// Motor Presse Stuttgart (from Foxit's case study), all vendors (Foxit, Mekko + products.js), one contact.
const T = {
  en: {
    eyebrow: 'Why United Addins',
    title: 'Software distribution built around',
    accent: 'your business',
    lead: 'With deep product knowledge and a partner-first approach, United Addins helps you get more from the software you trust.',
    expertise: {
      title: 'Product expertise',
      text: 'Trusted advice on the best solutions for your needs — before and after you buy.',
      statLabel: 'Authorized Foxit distributor since',
    },
    licensing: {
      title: 'Licensing support',
      text: 'Flexible licensing for organizations of any size, from a single seat to enterprise.',
      statLabel: 'users moved to Foxit at Motor Presse Stuttgart',
    },
    service: {
      title: 'Partner-first service',
      text: 'Responsive support every step of the way — onboarding, renewals and upgrades.',
      cycle: ['New purchase', 'Onboarding', 'Renewal', 'Upgrade', 'Add seats'],
    },
    contact: {
      title: 'One trusted contact',
      text: 'Multiple vendors, one partner. Simplify procurement and keep everything in one place.',
      statLabel: 'vendors · one contact',
    },
    more: 'More about United Addins',
    steps: [
      ['Tell us your needs', 'Share your team size, workflows and goals.'],
      ['Get the right fit', 'We recommend the products and licenses that match.'],
      ['Deploy & grow', 'Fast licensing, onboarding and ongoing support.'],
    ],
    casesLabel: 'Featured in Foxit case studies',
    casesMore: 'Read the quotes on the Foxit page',
    cases: [
      {
        stat: '~650 users',
        text: 'The publisher of some of Germany’s best-known magazines replaced Adobe Acrobat with Foxit — introduced to Foxit by United Addins.',
        linkLabel: 'Read Foxit’s case study',
      },
      {
        stat: 'Selection & rollout',
        text: 'United Addins helped Miele define its PDF requirements, choose the right solution and integrate Foxit with its IT infrastructure.',
        linkLabel: 'Read the story on foxit.com',
      },
    ],
    newTab: '(opens in a new tab)',
  },
  de: {
    eyebrow: 'Warum United Addins',
    title: 'Softwarevertrieb, ausgerichtet auf',
    accent: 'Ihr Unternehmen',
    lead: 'Mit fundiertem Produktwissen und partnerschaftlichem Ansatz hilft United Addins Ihnen, mehr aus der Software herauszuholen, der Sie vertrauen.',
    expertise: {
      title: 'Produktexpertise',
      text: 'Fundierte Beratung zu den besten Lösungen für Ihren Bedarf — vor und nach dem Kauf.',
      statLabel: 'Autorisierter Foxit-Distributor seit',
    },
    licensing: {
      title: 'Lizenzberatung',
      text: 'Flexible Lizenzmodelle für Unternehmen jeder Größe — vom einzelnen Arbeitsplatz bis zum Konzern.',
      statLabel: 'Nutzer bei Motor Presse Stuttgart auf Foxit umgestellt',
    },
    service: {
      title: 'Partnerschaftlicher Service',
      text: 'Schneller Support in jeder Phase — Einführung, Verlängerungen und Upgrades.',
      cycle: ['Neukauf', 'Einführung', 'Verlängerung', 'Upgrade', 'Mehr Lizenzen'],
    },
    contact: {
      title: 'Ein Ansprechpartner',
      text: 'Mehrere Hersteller, ein Partner. Vereinfachen Sie die Beschaffung und behalten Sie alles an einem Ort.',
      statLabel: 'Hersteller · ein Ansprechpartner',
    },
    more: 'Mehr über United Addins',
    steps: [
      ['Bedarf schildern', 'Teilen Sie uns Teamgröße, Arbeitsabläufe und Ziele mit.'],
      ['Die passende Lösung', 'Wir empfehlen die passenden Produkte und Lizenzen.'],
      ['Einführen & wachsen', 'Schnelle Lizenzierung, Einführung und laufender Support.'],
    ],
    casesLabel: 'Vorgestellt in Foxit-Fallstudien',
    casesMore: 'Zitate auf der Foxit-Seite lesen',
    cases: [
      {
        stat: '~650 Nutzer',
        text: 'Der Verlag einiger der bekanntesten Zeitschriften Deutschlands ersetzte Adobe Acrobat durch Foxit — den Kontakt zu Foxit stellte United Addins her.',
        linkLabel: 'Foxit-Fallstudie lesen (EN)',
      },
      {
        stat: 'Auswahl & Einführung',
        text: 'United Addins half Miele, die PDF-Anforderungen zu definieren, die passende Lösung auszuwählen und Foxit in die IT-Infrastruktur zu integrieren.',
        linkLabel: 'Zum Bericht auf foxit.com (EN)',
      },
    ],
    newTab: '(öffnet in neuem Tab)',
  },
  fr: {
    eyebrow: 'Pourquoi United Addins',
    title: 'Une distribution de logiciels pensée pour',
    accent: 'votre entreprise',
    lead: 'Grâce à une connaissance approfondie des produits et une approche centrée sur le partenariat, United Addins vous aide à tirer le meilleur des logiciels auxquels vous faites confiance.',
    expertise: {
      title: 'Expertise produit',
      text: 'Des conseils fiables sur les meilleures solutions pour vos besoins — avant et après l’achat.',
      statLabel: 'Distributeur agréé Foxit depuis',
    },
    licensing: {
      title: 'Accompagnement sur les licences',
      text: 'Des licences flexibles pour les organisations de toute taille, d’un seul poste à l’entreprise entière.',
      statLabel: 'utilisateurs passés à Foxit chez Motor Presse Stuttgart',
    },
    service: {
      title: 'Un service orienté partenaire',
      text: 'Un support réactif à chaque étape — mise en route, renouvellements et mises à niveau.',
      cycle: ['Nouvel achat', 'Mise en route', 'Renouvellement', 'Mise à niveau', 'Postes supplémentaires'],
    },
    contact: {
      title: 'Un interlocuteur de confiance',
      text: 'Plusieurs éditeurs, un seul partenaire. Simplifiez vos achats et gardez tout au même endroit.',
      statLabel: 'éditeurs · un interlocuteur',
    },
    more: 'En savoir plus sur United Addins',
    steps: [
      ['Exprimez vos besoins', 'Taille de l’équipe, processus et objectifs.'],
      ['La bonne solution', 'Nous recommandons les produits et licences adaptés.'],
      ['Déployer et évoluer', 'Licences rapides, mise en route et support continu.'],
    ],
    casesLabel: 'Présent dans les études de cas Foxit',
    casesMore: 'Lire les citations sur la page Foxit',
    cases: [
      {
        stat: '~650 utilisateurs',
        text: 'L’éditeur de certains des magazines les plus connus d’Allemagne a remplacé Adobe Acrobat par Foxit — sur recommandation de United Addins.',
        linkLabel: 'Lire l’étude de cas Foxit',
      },
      {
        stat: 'Sélection et déploiement',
        text: 'United Addins a aidé Miele à définir ses besoins PDF, à choisir la bonne solution et à intégrer Foxit à son infrastructure informatique.',
        linkLabel: 'Lire l’article sur foxit.com',
      },
    ],
    newTab: '(s’ouvre dans un nouvel onglet)',
  },
  es: {
    eyebrow: 'Por qué United Addins',
    title: 'Distribución de software pensada para',
    accent: 'su empresa',
    lead: 'Con un profundo conocimiento de los productos y un enfoque centrado en la colaboración, United Addins le ayuda a sacar más partido al software en el que confía.',
    expertise: {
      title: 'Experiencia en producto',
      text: 'Asesoramiento fiable sobre las mejores soluciones para sus necesidades — antes y después de la compra.',
      statLabel: 'Distribuidor autorizado de Foxit desde',
    },
    licensing: {
      title: 'Asesoramiento en licencias',
      text: 'Licencias flexibles para organizaciones de cualquier tamaño, desde un solo puesto hasta toda la empresa.',
      statLabel: 'usuarios migrados a Foxit en Motor Presse Stuttgart',
    },
    service: {
      title: 'Servicio centrado en el cliente',
      text: 'Soporte ágil en cada paso — puesta en marcha, renovaciones y actualizaciones.',
      cycle: ['Nueva compra', 'Puesta en marcha', 'Renovación', 'Actualización', 'Más puestos'],
    },
    contact: {
      title: 'Un único contacto de confianza',
      text: 'Varios fabricantes, un solo socio. Simplifique las compras y tenga todo en un mismo lugar.',
      statLabel: 'fabricantes · un contacto',
    },
    more: 'Más sobre United Addins',
    steps: [
      ['Cuéntenos qué necesita', 'Tamaño del equipo, flujos de trabajo y objetivos.'],
      ['La solución adecuada', 'Le recomendamos los productos y licencias que encajan.'],
      ['Implantar y crecer', 'Licencias rápidas, puesta en marcha y soporte continuo.'],
    ],
    casesLabel: 'Presentes en casos de éxito de Foxit',
    casesMore: 'Leer las citas en la página de Foxit',
    cases: [
      {
        stat: '~650 usuarios',
        text: 'La editorial de algunas de las revistas más conocidas de Alemania sustituyó Adobe Acrobat por Foxit, que conoció a través de United Addins.',
        linkLabel: 'Leer el caso de éxito de Foxit (EN)',
      },
      {
        stat: 'Selección e implantación',
        text: 'United Addins ayudó a Miele a definir sus requisitos de PDF, elegir la solución adecuada e integrar Foxit en su infraestructura de TI.',
        linkLabel: 'Leer la historia en foxit.com (EN)',
      },
    ],
    newTab: '(se abre en una pestaña nueva)',
  },
  nl: {
    eyebrow: 'Waarom United Addins',
    title: 'Softwaredistributie rond',
    accent: 'uw organisatie',
    lead: 'Met diepgaande productkennis en een partnergerichte aanpak helpt United Addins u meer te halen uit de software die u vertrouwt.',
    expertise: {
      title: 'Productkennis',
      text: 'Betrouwbaar advies over de beste oplossingen voor uw behoeften — voor en na de aankoop.',
      statLabel: 'Geautoriseerd Foxit-distributeur sinds',
    },
    licensing: {
      title: 'Licentieadvies',
      text: 'Flexibele licenties voor organisaties van elke omvang, van één gebruiker tot de hele onderneming.',
      statLabel: 'gebruikers overgestapt op Foxit bij Motor Presse Stuttgart',
    },
    service: {
      title: 'Partnergerichte service',
      text: 'Snelle ondersteuning bij elke stap — implementatie, verlengingen en upgrades.',
      cycle: ['Nieuwe aankoop', 'Implementatie', 'Verlenging', 'Upgrade', 'Extra gebruikers'],
    },
    contact: {
      title: 'Eén vertrouwd aanspreekpunt',
      text: 'Meerdere leveranciers, één partner. Vereenvoudig de inkoop en houd alles op één plek.',
      statLabel: 'leveranciers · één aanspreekpunt',
    },
    more: 'Meer over United Addins',
    steps: [
      ['Vertel ons wat u nodig hebt', 'Teamgrootte, werkprocessen en doelen.'],
      ['De juiste oplossing', 'Wij adviseren de producten en licenties die passen.'],
      ['Implementeren en groeien', 'Snelle licenties, implementatie en doorlopende support.'],
    ],
    casesLabel: 'Uitgelicht in Foxit-casestudy’s',
    casesMore: 'Lees de citaten op de Foxit-pagina',
    cases: [
      {
        stat: '~650 gebruikers',
        text: 'De uitgever van enkele van de bekendste tijdschriften van Duitsland verving Adobe Acrobat door Foxit, dat ze via United Addins leerden kennen.',
        linkLabel: 'Lees de Foxit-casestudy (EN)',
      },
      {
        stat: 'Selectie en uitrol',
        text: 'United Addins hielp Miele de PDF-eisen te bepalen, de juiste oplossing te kiezen en Foxit te integreren in de IT-infrastructuur.',
        linkLabel: 'Lees het verhaal op foxit.com (EN)',
      },
    ],
    newTab: '(opent in een nieuw tabblad)',
  },
}

// Verified against the Foxit-hosted sources linked below (Nov 2026).
const CASES = [
  { company: 'Motor Presse Stuttgart', href: 'https://cdn01.foxitsoftware.com/pub/foxit/casestudy/en_us/MotorPresseStuttgart.pdf' },
  { company: 'Miele', href: 'https://www.foxit.com/blog/if-you-need-pdf-software-find-out-why-miele-made-the-move-to-phantompdf/' },
]
export default function WhyUs({ compact = false }) {
  const t = useT(T)
  const lang = useLang()
  // Orbit chips: the same entries as the Products menu — Foxit, Mekko Graphics and the
  // product categories (full names, wrapping onto two lines where needed).
  const categories = Object.values(CATEGORIES).map((c) => c[lang] || c.en)
  const orbit = ['Foxit PDF Editor & eSign', 'Mekko Graphics', ...categories]
  const merge = [['Foxit', 'foxit'], ['Mekko Graphics'], ...categories.map((c) => [c, 'cat'])]
  const H = compact ? 'h2' : 'h1'
  const Hc = compact ? 'h3' : 'h2'

  return (
    <section className={`section why ${compact ? 'why--compact' : ''}`} id="why">
      <div className="why__bg" aria-hidden="true">
        <span /><span />
        <i className="noise" />
      </div>
      <div className="container why__inner">
        <div className="why__head">
          <div data-reveal>
            <span className="eyebrow eyebrow--light">{t.eyebrow}</span>
            <H className="section-title">
              {t.title} <span className="accent grad-text why__accent">{t.accent}</span>
            </H>
          </div>
          <p className="section-lead why__lead" data-reveal style={{ '--d': '0.1s' }}>{t.lead}</p>
        </div>

        <div className="bento">
          {/* Big tile: expertise + orbit of the areas we cover */}
          <article className="why-card bento__a spot" data-reveal>
            <div className="orbit" aria-hidden="true">
              <span className="orbit__ring" />
              <span className="orbit__ring orbit__ring--2" />
              <span className="orbit__core"><Award /></span>
              <div className="orbit__spin">
                {orbit.map((p, i) => (
                  <span key={p} className="orbit__chip" style={{ '--a': `${(i * 360) / orbit.length}deg` }}><b>{p}</b></span>
                ))}
              </div>
              <L to="/foxit#united-addins" className="case__link cases__more" data-reveal>{t.casesMore} <Arrow /></L>
            </div>
            <div className="bento__stat">
              <small>{t.expertise.statLabel}</small>
              <strong className="bento__num"><CountUp to={2012} from={2000} duration={1300} /></strong>
            </div>
            <Hc>{t.expertise.title}</Hc>
            <p>{t.expertise.text}</p>
          </article>

          {/* Wide tile: licensing — seats lighting up */}
          <article className="why-card bento__b spot" data-reveal style={{ '--d': '0.08s' }}>
            <div className="bento__row">
              <div>
                <span className="why-card__icon"><Key /></span>
                <Hc>{t.licensing.title}</Hc>
                <p>{t.licensing.text}</p>
              </div>
              <div className="bento__stat bento__stat--right">
                <strong className="bento__num"><CountUp to={650} prefix="~" duration={1600} /></strong>
                <small>{t.licensing.statLabel}</small>
              </div>
            </div>
            <div className="seats" aria-hidden="true">
              {Array.from({ length: 48 }, (_, i) => <span key={i} style={{ '--i': i }} />)}
            </div>
          </article>

          {/* Service lifecycle — a highlight travels through the stages */}
          <article className="why-card bento__c spot" data-reveal style={{ '--d': '0.16s' }}>
            <span className="why-card__icon"><Headset /></span>
            <Hc>{t.service.title}</Hc>
            <p>{t.service.text}</p>
            <ol className="cycle" aria-hidden="true">
              {t.service.cycle.map((c, i) => <li key={c} style={{ '--i': i }}>{c}</li>)}
            </ol>
          </article>

          {/* All vendors (Foxit, Mekko and the product categories) → one contact */}
          <article className="why-card bento__d spot" data-reveal style={{ '--d': '0.24s' }}>
            <div className="merge" aria-hidden="true" style={{ '--n': merge.length }}>
              <ul className="merge__list">
                {merge.map(([label, mod]) => (
                  <li key={label}><span className={`merge__node ${mod ? `merge__node--${mod}` : ''}`}>{label}</span></li>
                ))}
              </ul>
              {/* Lines from the middle of each row to the hub; stretched to fit, stroke width kept. */}
              <svg className="merge__lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                {merge.map(([label], i) => {
                  const y = ((i + 0.5) / merge.length) * 100
                  return <path key={label} className={`merge__line ${i % 2 ? 'merge__line--2' : ''}`} d={`M0 ${y} C50 ${y} 50 50 100 50`} />
                })}
              </svg>
              <span className="merge__hub">UA</span>
            </div>
            <div className="bento__stat">
              <strong className="bento__num bento__num--sm">{VENDOR_COUNT} → 1</strong>
              <small>{t.contact.statLabel}</small>
            </div>
            <Hc><Handshake className="bento__inline-ic" /> {t.contact.title}</Hc>
            <p>{t.contact.text}</p>
          </article>
        </div>

        {compact ? (
          <div className="why__more" data-reveal>
            <L to="/about" className="btn btn-ghost btn-ghost--dark">{t.more} <Arrow /></L>
          </div>
        ) : (
          <>
            <Leader />

            <ol className="steps">
              {t.steps.map(([title, text], i) => (
                <li key={title} className="step" data-reveal style={{ '--d': `${i * 0.1}s` }}>
                  <span className="step__n">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Facts quoted from Foxit's own publications — keep wording close to the sources. */}
            <div className="cases">
              <h2 className="cases__label" data-reveal>{t.casesLabel}</h2>
              <div className="cases__grid">
                {CASES.map((c, i) => (
                  <article key={c.company} className="case spot" data-reveal style={{ '--d': `${i * 0.1}s` }}>
                    <span className="case__stat">{t.cases[i].stat}</span>
                    <h3>{c.company}</h3>
                    <p>{t.cases[i].text}</p>
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="case__link">
                      {t.cases[i].linkLabel} <Arrow /><span className="sr-only"> {t.newTab}</span>
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
