// Page list + per-language <title>/<meta description>.
// Plain JS (no JSX): used at runtime by usePageMeta() and at build time by the
// prerender step in vite.config.js, which writes a dist/<route>/index.html with the
// right tags for every page, so crawlers and link previews see them without JS.

import { PRODUCTS } from './products.js'

export const SITE = 'https://www.unitedaddins.com'
export const LANGS = ['en', 'de', 'fr']
export const OG_LOCALES = { en: 'en_US', de: 'de_DE', fr: 'fr_FR' }

export const PAGES = {
  home: {
    path: '/',
    en: {
      title: 'United Addins — The right software. The right partnership.',
      description:
        'United Addins helps organizations find, license and get the most from trusted software — Foxit PDF & eSign, Mekko Graphics and more.',
    },
    de: {
      title: 'United Addins — Die richtige Software. Die richtige Partnerschaft.',
      description:
        'United Addins hilft Unternehmen, bewährte Software zu finden, zu lizenzieren und optimal zu nutzen — Foxit PDF & eSign, Mekko Graphics und mehr.',
    },
    fr: {
      title: 'United Addins — Le bon logiciel. Le bon partenaire.',
      description:
        'United Addins aide les organisations à trouver, acquérir et exploiter pleinement des logiciels fiables — Foxit PDF & eSign, Mekko Graphics et plus.',
    },
  },
  foxit: {
    path: '/foxit',
    en: {
      title: 'Foxit PDF Editor, Editor+ & eSign — United Addins',
      description:
        'Licensing, renewals and support for Foxit PDF Editor, PDF Editor+ and Foxit eSign. Find the right plan in 4 questions and build your quote online.',
    },
    de: {
      title: 'Foxit PDF Editor, Editor+ & eSign — United Addins',
      description:
        'Lizenzierung, Verlängerung und Support für Foxit PDF Editor, PDF Editor+ und Foxit eSign. Finden Sie den passenden Plan in 4 Fragen und stellen Sie Ihr Angebot online zusammen.',
    },
    fr: {
      title: 'Foxit PDF Editor, Editor+ & eSign — United Addins',
      description:
        'Licences, renouvellements et support pour Foxit PDF Editor, PDF Editor+ et Foxit eSign. Trouvez la bonne offre en 4 questions et composez votre devis en ligne.',
    },
  },
  mekko: {
    path: '/mekko-graphics',
    en: {
      title: 'Mekko Graphics for PowerPoint & Excel — United Addins',
      description:
        'Marimekko, Bar Mekko, waterfall and more in PowerPoint and Excel. Try the interactive chart and get Mekko Graphics licenses from United Addins.',
    },
    de: {
      title: 'Mekko Graphics für PowerPoint & Excel — United Addins',
      description:
        'Marimekko-, Bar-Mekko-, Wasserfall-Diagramme und mehr in PowerPoint und Excel. Testen Sie das interaktive Diagramm und erhalten Sie Mekko-Graphics-Lizenzen von United Addins.',
    },
    fr: {
      title: 'Mekko Graphics pour PowerPoint et Excel — United Addins',
      description:
        'Marimekko, Bar Mekko, cascade et plus dans PowerPoint et Excel. Essayez le graphique interactif et obtenez vos licences Mekko Graphics auprès de United Addins.',
    },
  },
  products: {
    path: '/products',
    en: {
      title: 'All products — United Addins',
      description:
        'Foxit, Mekko Graphics, PDF-XChange, Bluebeam Revu, NXPowerLite, progeCAD, SketchUp, MyDraw, MindManager, Project Plan 365 and Steelray Project Viewer — licensing and quotes from United Addins.',
    },
    de: {
      title: 'Alle Produkte — United Addins',
      description:
        'Foxit, Mekko Graphics, PDF-XChange, Bluebeam Revu, NXPowerLite, progeCAD, SketchUp, MyDraw, MindManager, Project Plan 365 und Steelray Project Viewer — Lizenzen und Angebote von United Addins.',
    },
    fr: {
      title: 'Tous les produits — United Addins',
      description:
        'Foxit, Mekko Graphics, PDF-XChange, Bluebeam Revu, NXPowerLite, progeCAD, SketchUp, MyDraw, MindManager, Project Plan 365 et Steelray Project Viewer — licences et devis auprès de United Addins.',
    },
  },
  // One page per additional product (see products.js).
  ...Object.fromEntries(
    PRODUCTS.map((p) => [
      p.slug,
      {
        path: `/${p.slug}`,
        en: { title: `${p.name} — ${p.en.tagline} | United Addins`, description: p.en.lead },
        de: { title: `${p.name} — ${p.de.tagline} | United Addins`, description: p.de.lead },
        fr: { title: `${p.name} — ${p.fr.tagline} | United Addins`, description: p.fr.lead },
      },
    ])
  ),
  about: {
    path: '/about',
    en: {
      title: 'About United Addins — Software distribution built around your business',
      description:
        'Authorized Foxit distributor since 2012 and Mekko Graphics partner. Product expertise, licensing support and one trusted contact for multiple vendors.',
    },
    de: {
      title: 'Über United Addins — Softwarevertrieb, der sich nach Ihrem Unternehmen richtet',
      description:
        'Autorisierter Foxit-Distributor seit 2012 und Mekko-Graphics-Partner. Produktexpertise, Lizenzberatung und ein Ansprechpartner für mehrere Hersteller.',
    },
    fr: {
      title: 'À propos de United Addins — Une distribution de logiciels pensée pour votre entreprise',
      description:
        'Distributeur agréé Foxit depuis 2012 et partenaire Mekko Graphics. Expertise produit, accompagnement licences et un seul interlocuteur pour plusieurs éditeurs.',
    },
  },
  contact: {
    path: '/contact',
    en: {
      title: 'Request a quote — United Addins',
      description:
        'Pick your products and number of licenses — new purchase, renewal, upgrade or added seats — and get a tailored quote from United Addins.',
    },
    de: {
      title: 'Angebot anfordern — United Addins',
      description:
        'Wählen Sie Produkte und Anzahl der Lizenzen — Neukauf, Verlängerung, Upgrade oder zusätzliche Lizenzen — und erhalten Sie ein individuelles Angebot von United Addins.',
    },
    fr: {
      title: 'Demander un devis — United Addins',
      description:
        'Choisissez vos produits et le nombre de licences — nouvel achat, renouvellement, mise à niveau ou postes supplémentaires — et recevez un devis sur mesure de United Addins.',
    },
  },
}

// '/foxit' + 'de' → '/de/foxit'; '/' + 'de' → '/de'
export function localize(path, lang) {
  if (lang === 'en') return path
  const i = path.indexOf('#')
  const [p, hash] = i === -1 ? [path, ''] : [path.slice(0, i), path.slice(i)]
  return (p === '/' || p === '' ? `/${lang}` : `/${lang}${p}`) + hash
}

export function langFromPath(pathname) {
  const seg = pathname.split('/')[1]
  return LANGS.includes(seg) && seg !== 'en' ? seg : 'en'
}

// '/de/foxit' → '/foxit'
export function stripLang(pathname) {
  const lang = langFromPath(pathname)
  if (lang === 'en') return pathname
  const rest = pathname.slice(lang.length + 1)
  return rest || '/'
}

export function pageKeyFromPath(pathname) {
  const p = stripLang(pathname).replace(/\/+$/, '') || '/'
  return Object.keys(PAGES).find((k) => PAGES[k].path === p) || null
}
