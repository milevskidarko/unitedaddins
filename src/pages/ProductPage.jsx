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
    why: [
      [Key, 'Die richtige Lizenz', 'Wir helfen bei der Wahl von Edition und Lizenzart — ohne Überflüssiges.'],
      [Handshake, 'Ein Kontakt, viele Hersteller', 'Foxit, Mekko Graphics und mehr von einem Partner, in einem Angebot.'],
      [Headset, 'Verlängerungen & Lizenzen', 'Wir behalten Verlängerungen im Blick und erweitern Lizenzen, wenn Ihr Team wächst.'],
    ],
    more: 'Mehr in',
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
    why: [
      [Key, 'La bonne licence', 'Nous vous aidons à choisir l’édition et le type de licence adaptés — sans rien de superflu.'],
      [Handshake, 'Un interlocuteur, plusieurs éditeurs', 'Foxit, Mekko Graphics et d’autres auprès d’un seul partenaire, sur un seul devis.'],
      [Headset, 'Renouvellements et postes', 'Nous suivons vos renouvellements et ajoutons des licences quand votre équipe grandit.'],
    ],
    more: 'Plus dans',
    all: 'Tous les produits',
    trademark: (name, vendor) => `${name} est une marque de ${vendor}.`,
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
            <h2 className="prod__h2">{t.whyTitle} <span className="grad-text">United Addins</span>?</h2>
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
