// Page list + per-language <title>/<meta description>.
// Plain JS (no JSX): used at runtime by usePageMeta() and at build time by the
// prerender step in vite.config.js, which writes a dist/<route>/index.html with the
// right tags for every page, so crawlers and link previews see them without JS.

export const SITE = 'https://www.unitedaddins.com'
export const LANGS = ['en', 'de']

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
  },
  about: {
    path: '/about',
    en: {
      title: 'About United Addins — Software distribution built around your business',
      description:
        'Authorized Foxit distributor since 2016 and Mekko Graphics partner. Product expertise, licensing support and one trusted contact for multiple vendors.',
    },
    de: {
      title: 'Über United Addins — Softwarevertrieb, der sich nach Ihrem Unternehmen richtet',
      description:
        'Autorisierter Foxit-Distributor seit 2016 und Mekko-Graphics-Partner. Produktexpertise, Lizenzberatung und ein Ansprechpartner für mehrere Hersteller.',
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
