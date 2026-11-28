import { L, useLang, useT } from '../i18n.jsx'
import { useQuote } from '../quote.js'
import { Arrow, Check, Globe, Key, Handshake, Headset } from '../components/Icons.jsx'
import ProductCard, { Mark } from '../components/ProductCard.jsx'
import { CATEGORIES, PRODUCTS, productBySlug } from '../products.js'
import '../components/Products.css'

const T = {
  en: {
    add: 'Add to quote',
    vendor: 'Vendor website',
    platforms: 'Platforms',
    by: 'by',
    featuresTitle: 'What you get',
    whyTitle: 'Why buy through',
    whyEnd: '?',
    why: [
      [Key, 'The right license', 'We help you pick the edition and license type that fits — and nothing you don’t need.'],
      [Handshake, 'One contact, many vendors', 'Foxit, Mekko Graphics and more from one partner, on one quote.'],
      [Headset, 'Renewals & seats', 'We keep track of renewals and add licenses when your team grows.'],
    ],
    more: 'More in',
    all: 'All products',
    trademark: (name, vendor) => `${name} is a trademark of ${vendor}.`,
  },
  de: {
    add: 'Zum Angebot hinzufügen',
    vendor: 'Website des Herstellers',
    platforms: 'Plattformen',
    by: 'von',
    featuresTitle: 'Das bekommen Sie',
    whyTitle: 'Warum über',
    whyEnd: ' kaufen?',
    why: [
      [Key, 'Die richtige Lizenz', 'Wir helfen bei der Wahl von Edition und Lizenzart — ohne Überflüssiges.'],
      [Handshake, 'Ein Kontakt, viele Hersteller', 'Foxit, Mekko Graphics und mehr von einem Partner, in einem Angebot.'],
      [Headset, 'Verlängerungen & Lizenzen', 'Wir behalten Verlängerungen im Blick und erweitern Lizenzen, wenn Ihr Team wächst.'],
    ],
    more: 'Weitere Produkte:',
    all: 'Alle Produkte',
    trademark: (name, vendor) => `${name} ist eine Marke von ${vendor}.`,
  },
  fr: {
    add: 'Ajouter au devis',
    vendor: 'Site de l’éditeur',
    platforms: 'Plateformes',
    by: 'par',
    featuresTitle: 'Ce que vous obtenez',
    whyTitle: 'Pourquoi acheter via',
    whyEnd: ' ?',
    why: [
      [Key, 'La bonne licence', 'Nous vous aidons à choisir l’édition et le type de licence adaptés — sans rien de superflu.'],
      [Handshake, 'Un interlocuteur, plusieurs éditeurs', 'Foxit, Mekko Graphics et d’autres auprès d’un seul partenaire, sur un seul devis.'],
      [Headset, 'Renouvellements et postes', 'Nous suivons vos renouvellements et ajoutons des licences quand votre équipe grandit.'],
    ],
    more: 'Autres produits :',
    all: 'Tous les produits',
    trademark: (name, vendor) => `${name} est une marque de ${vendor}.`,
  },
  es: {
    add: 'Añadir al presupuesto',
    vendor: 'Web del fabricante',
    platforms: 'Plataformas',
    by: 'de',
    featuresTitle: 'Lo que obtiene',
    whyTitle: '¿Por qué comprar a través de',
    whyEnd: '?',
    why: [
      [Key, 'La licencia adecuada', 'Le ayudamos a elegir la edición y el tipo de licencia que encajan — sin nada que no necesite.'],
      [Handshake, 'Un contacto, varios fabricantes', 'Foxit, Mekko Graphics y más con un solo socio, en un solo presupuesto.'],
      [Headset, 'Renovaciones y puestos', 'Controlamos sus renovaciones y añadimos licencias cuando su equipo crece.'],
    ],
    more: 'Más productos:',
    all: 'Todos los productos',
    trademark: (name, vendor) => `${name} es una marca comercial de ${vendor}.`,
  },
  nl: {
    add: 'Toevoegen aan offerte',
    vendor: 'Website van de leverancier',
    platforms: 'Platforms',
    by: 'door',
    featuresTitle: 'Wat u krijgt',
    whyTitle: 'Waarom kopen via',
    whyEnd: '?',
    why: [
      [Key, 'De juiste licentie', 'Wij helpen u de editie en het licentietype te kiezen die passen — zonder overbodige extra’s.'],
      [Handshake, 'Eén contact, veel leveranciers', 'Foxit, Mekko Graphics en meer bij één partner, op één offerte.'],
      [Headset, 'Verlengingen en gebruikers', 'Wij houden verlengingen bij en voegen licenties toe als uw team groeit.'],
    ],
    more: 'Meer producten:',
    all: 'Alle producten',
    trademark: (name, vendor) => `${name} is een handelsmerk van ${vendor}.`,
  },
  it: {
    add: 'Aggiungi al preventivo',
    vendor: 'Sito del produttore',
    platforms: 'Piattaforme',
    by: 'di',
    featuresTitle: 'Cosa ottieni',
    whyTitle: 'Perché acquistare tramite',
    whyEnd: '?',
    why: [
      [Key, 'La licenza giusta', 'Ti aiutiamo a scegliere l’edizione e il tipo di licenza adatti — senza nulla di superfluo.'],
      [Handshake, 'Un referente, molti vendor', 'Foxit, Mekko Graphics e altro da un unico partner, in un unico preventivo.'],
      [Headset, 'Rinnovi e utenti', 'Teniamo traccia dei rinnovi e aggiungiamo licenze quando il tuo team cresce.'],
    ],
    more: 'Altri prodotti:',
    all: 'Tutti i prodotti',
    trademark: (name, vendor) => `${name} è un marchio di ${vendor}.`,
  },
  pl: {
    add: 'Dodaj do wyceny',
    vendor: 'Strona producenta',
    platforms: 'Platformy',
    by: 'od',
    featuresTitle: 'Co otrzymujesz',
    whyTitle: 'Dlaczego warto kupić przez',
    whyEnd: '?',
    why: [
      [Key, 'Właściwa licencja', 'Pomagamy wybrać odpowiednią edycję i typ licencji — bez zbędnych dodatków.'],
      [Handshake, 'Jeden kontakt, wielu dostawców', 'Foxit, Mekko Graphics i inne od jednego partnera, w jednej wycenie.'],
      [Headset, 'Odnowienia i stanowiska', 'Pilnujemy odnowień i dodajemy licencje, gdy Twój zespół rośnie.'],
    ],
    more: 'Więcej produktów:',
    all: 'Wszystkie produkty',
    trademark: (name, vendor) => `${name} jest znakiem towarowym firmy ${vendor}.`,
  },
}

export default function ProductPage({ slug }) {
  const t = useT(T)
  const lang = useLang()
  const { addToQuote } = useQuote()
  const p = productBySlug(slug)
  const c = p[lang] || p.en
  const related = PRODUCTS.filter((x) => x.category === p.category && x.slug !== p.slug)
  const category = CATEGORIES[p.category][lang] || CATEGORIES[p.category].en

  return (
    <div className="page">
      <section className="section prod" style={{ '--tone': p.tone }}>
        <span className="prod__glow" aria-hidden="true" />
        <div className="container">
          <div className="prod__hero">
            <div className="prod__copy">
              <span className="eyebrow" data-reveal>{category}</span>
              <h1 className="section-title" data-reveal style={{ '--d': '0.06s' }}>
                {p.name}
              </h1>
              <p className="prod__tagline" data-reveal style={{ '--d': '0.1s' }}>{c.tagline}</p>
              <p className="section-lead" data-reveal style={{ '--d': '0.14s' }}>{c.lead}</p>
              <div className="prod__actions" data-reveal style={{ '--d': '0.2s' }}>
                <button type="button" className="btn btn-primary" onClick={() => addToQuote([p.name])}>
                  {t.add} <Arrow />
                </button>
                <a className="btn btn-ghost" href={p.url} target="_blank" rel="noopener noreferrer">
                  <Globe /> {t.vendor}
                </a>
              </div>
            </div>

            <div className="prod__card" data-reveal style={{ '--d': '0.1s' }}>
              <Mark product={p} size="lg" />
              <p className="prod__card-name">{p.name}</p>
              <p className="prod__card-vendor">{t.by} {p.vendor}</p>
              <dl className="prod__meta">
                <dt>{t.platforms}</dt>
                <dd>{c.platforms}</dd>
              </dl>
              <ul className="prod__checks">
                {c.features.map(([title]) => <li key={title}><Check /> {title}</li>)}
              </ul>
            </div>
          </div>

          <h2 className="prod__h2" data-reveal>{t.featuresTitle}</h2>
          <div className="prod__features">
            {c.features.map(([title, text], i) => (
              <div key={title} className="feat spot" data-reveal style={{ '--d': `${i * 0.06}s` }}>
                <span className="feat__num">{String(i + 1).padStart(2, '0')}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            ))}
          </div>

          <div className="prod__why" data-reveal>
            <h2 className="prod__h2">{t.whyTitle} <span className="grad-text">United Addins</span>{t.whyEnd}</h2>
            <div className="prod__why-grid">
              {t.why.map(([Icon, title, text]) => (
                <div key={title} className="why-item">
                  <span className="why-item__icon"><Icon /></span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>

          {related.length > 0 && (
            <>
              <div className="prod__more-head" data-reveal>
                <h2 className="prod__h2">{t.more} {category}</h2>
                <L to="/products" className="prod__all">{t.all} <Arrow /></L>
              </div>
              <div className="pgrid">
                {related.map((r, i) => (
                  <ProductCard key={r.slug} product={r} href={`/${r.slug}`} text={(r[lang] || r.en).tagline} delay={i * 0.06} />
                ))}
              </div>
            </>
          )}

          <p className="prod__tm">{t.trademark(p.name, p.vendor)}</p>
        </div>
      </section>
    </div>
  )
}
