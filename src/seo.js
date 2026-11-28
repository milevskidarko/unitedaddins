// Page list + per-language <title>/<meta description>.
// Plain JS (no JSX): used at runtime by usePageMeta() and at build time by the
// prerender step in vite.config.js, which writes a dist/<route>/index.html with the
// right tags for every page, so crawlers and link previews see them without JS.

import { PRODUCTS } from './products.js'

export const SITE = 'https://www.unitedaddins.com'
export const LANGS = ['en', 'de', 'fr', 'es', 'nl', 'it', 'pl']
export const OG_LOCALES = { en: 'en_US', de: 'de_DE', fr: 'fr_FR', es: 'es_ES', nl: 'nl_NL', it: 'it_IT', pl: 'pl_PL' }

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
    es: {
      title: 'United Addins — El software adecuado. El socio adecuado.',
      description:
        'United Addins ayuda a las organizaciones a encontrar, licenciar y sacar el máximo partido a software de confianza — Foxit PDF & eSign, Mekko Graphics y más.',
    },
    nl: {
      title: 'United Addins — De juiste software. De juiste partner.',
      description:
        'United Addins helpt organisaties betrouwbare software te vinden, te licentiëren en er het maximale uit te halen — Foxit PDF & eSign, Mekko Graphics en meer.',
    },
    it: {
      title: 'United Addins — Il software giusto. Il partner giusto.',
      description:
        'United Addins aiuta le organizzazioni a trovare, acquistare in licenza e sfruttare al meglio software affidabili — Foxit PDF & eSign, Mekko Graphics e altro.',
    },
    pl: {
      title: 'United Addins — Właściwe oprogramowanie. Właściwy partner.',
      description:
        'United Addins pomaga organizacjom znaleźć, licencjonować i w pełni wykorzystać sprawdzone oprogramowanie — Foxit PDF & eSign, Mekko Graphics i inne.',
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
    es: {
      title: 'Foxit PDF Editor, Editor+ & eSign — United Addins',
      description:
        'Licencias, renovaciones y soporte para Foxit PDF Editor, PDF Editor+ y Foxit eSign. Encuentre el plan adecuado en 4 preguntas y prepare su presupuesto en línea.',
    },
    nl: {
      title: 'Foxit PDF Editor, Editor+ & eSign — United Addins',
      description:
        'Licenties, verlengingen en support voor Foxit PDF Editor, PDF Editor+ en Foxit eSign. Vind het juiste abonnement in 4 vragen en stel uw offerte online samen.',
    },
    it: {
      title: 'Foxit PDF Editor, Editor+ & eSign — United Addins',
      description:
        'Licenze, rinnovi e supporto per Foxit PDF Editor, PDF Editor+ e Foxit eSign. Trova il piano giusto in 4 domande e componi il tuo preventivo online.',
    },
    pl: {
      title: 'Foxit PDF Editor, Editor+ & eSign — United Addins',
      description:
        'Licencje, odnowienia i wsparcie dla Foxit PDF Editor, PDF Editor+ i Foxit eSign. Znajdź odpowiedni plan w 4 pytaniach i przygotuj wycenę online.',
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
    es: {
      title: 'Mekko Graphics para PowerPoint y Excel — United Addins',
      description:
        'Marimekko, Bar Mekko, cascada y más en PowerPoint y Excel. Pruebe el gráfico interactivo y obtenga licencias de Mekko Graphics con United Addins.',
    },
    nl: {
      title: 'Mekko Graphics voor PowerPoint en Excel — United Addins',
      description:
        'Marimekko, Bar Mekko, watervaldiagrammen en meer in PowerPoint en Excel. Probeer de interactieve grafiek en koop Mekko Graphics-licenties bij United Addins.',
    },
    it: {
      title: 'Mekko Graphics per PowerPoint ed Excel — United Addins',
      description:
        'Marimekko, Bar Mekko, grafici a cascata e altro in PowerPoint ed Excel. Prova il grafico interattivo e ottieni le licenze Mekko Graphics da United Addins.',
    },
    pl: {
      title: 'Mekko Graphics dla PowerPoint i Excel — United Addins',
      description:
        'Marimekko, Bar Mekko, wykresy kaskadowe i więcej w PowerPoint i Excel. Wypróbuj interaktywny wykres i kup licencje Mekko Graphics w United Addins.',
    },
  },
  ee: {
    path: '/efficient-elements',
    en: {
      title: 'Efficient Elements for PowerPoint — United Addins',
      description:
        'The PowerPoint add-in for agendas, slide libraries, Harvey balls, alignment and presentation checks. Try the interactive demo and get Efficient Elements licenses from United Addins.',
    },
    de: {
      title: 'Efficient Elements für PowerPoint — United Addins',
      description:
        'Das PowerPoint-Add-in für Agenden, Folienbibliotheken, Harvey Balls, Ausrichtung und Präsentationsprüfung. Testen Sie die interaktive Demo und erhalten Sie Efficient-Elements-Lizenzen von United Addins.',
    },
    fr: {
      title: 'Efficient Elements pour PowerPoint — United Addins',
      description:
        'Le complément PowerPoint pour agendas, bibliothèques de diapositives, Harvey balls, alignement et vérification des présentations. Essayez la démo interactive et obtenez vos licences Efficient Elements auprès de United Addins.',
    },
    es: {
      title: 'Efficient Elements para PowerPoint — United Addins',
      description:
        'El complemento de PowerPoint para agendas, bibliotecas de diapositivas, Harvey balls, alineación y revisión de presentaciones. Pruebe la demo interactiva y obtenga licencias de Efficient Elements con United Addins.',
    },
    nl: {
      title: 'Efficient Elements voor PowerPoint — United Addins',
      description:
        'De PowerPoint-invoegtoepassing voor agenda’s, diabibliotheken, Harvey balls, uitlijnen en presentatiecontrole. Probeer de interactieve demo en koop Efficient Elements-licenties bij United Addins.',
    },
    it: {
      title: 'Efficient Elements per PowerPoint — United Addins',
      description:
        'Il componente aggiuntivo PowerPoint per agende, librerie di slide, Harvey ball, allineamento e controllo delle presentazioni. Prova la demo interattiva e ottieni le licenze Efficient Elements da United Addins.',
    },
    pl: {
      title: 'Efficient Elements dla PowerPoint — United Addins',
      description:
        'Dodatek do PowerPoint do agend, bibliotek slajdów, Harvey balls, wyrównywania i sprawdzania prezentacji. Wypróbuj interaktywne demo i kup licencje Efficient Elements w United Addins.',
    },
  },
  products: {
    path: '/products',
    en: {
      title: 'All products — United Addins',
      description:
        'Foxit, Mekko Graphics, Efficient Elements, PDF-XChange, Bluebeam Revu, NXPowerLite, progeCAD, SketchUp, MyDraw, MindManager, Project Plan 365 and Steelray Project Viewer — licensing and quotes from United Addins.',
    },
    de: {
      title: 'Alle Produkte — United Addins',
      description:
        'Foxit, Mekko Graphics, Efficient Elements, PDF-XChange, Bluebeam Revu, NXPowerLite, progeCAD, SketchUp, MyDraw, MindManager, Project Plan 365 und Steelray Project Viewer — Lizenzen und Angebote von United Addins.',
    },
    fr: {
      title: 'Tous les produits — United Addins',
      description:
        'Foxit, Mekko Graphics, Efficient Elements, PDF-XChange, Bluebeam Revu, NXPowerLite, progeCAD, SketchUp, MyDraw, MindManager, Project Plan 365 et Steelray Project Viewer — licences et devis auprès de United Addins.',
    },
    es: {
      title: 'Todos los productos — United Addins',
      description:
        'Foxit, Mekko Graphics, Efficient Elements, PDF-XChange, Bluebeam Revu, NXPowerLite, progeCAD, SketchUp, MyDraw, MindManager, Project Plan 365 y Steelray Project Viewer — licencias y presupuestos de United Addins.',
    },
    nl: {
      title: 'Alle producten — United Addins',
      description:
        'Foxit, Mekko Graphics, Efficient Elements, PDF-XChange, Bluebeam Revu, NXPowerLite, progeCAD, SketchUp, MyDraw, MindManager, Project Plan 365 en Steelray Project Viewer — licenties en offertes van United Addins.',
    },
    it: {
      title: 'Tutti i prodotti — United Addins',
      description:
        'Foxit, Mekko Graphics, Efficient Elements, PDF-XChange, Bluebeam Revu, NXPowerLite, progeCAD, SketchUp, MyDraw, MindManager, Project Plan 365 e Steelray Project Viewer — licenze e preventivi da United Addins.',
    },
    pl: {
      title: 'Wszystkie produkty — United Addins',
      description:
        'Foxit, Mekko Graphics, Efficient Elements, PDF-XChange, Bluebeam Revu, NXPowerLite, progeCAD, SketchUp, MyDraw, MindManager, Project Plan 365 i Steelray Project Viewer — licencje i wyceny od United Addins.',
    },
  },
  // One page per additional product (see products.js).
  ...Object.fromEntries(
    PRODUCTS.map((p) => [
      p.slug,
      {
        path: `/${p.slug}`,
        ...Object.fromEntries(LANGS.map((l) => [l, { title: `${p.name} — ${p[l].tagline} | United Addins`, description: p[l].lead }])),
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
    es: {
      title: 'Sobre United Addins — Distribución de software pensada para su empresa',
      description:
        'Distribuidor autorizado de Foxit desde 2012 y partner de Mekko Graphics. Experiencia en producto, asesoramiento en licencias y un único contacto de confianza para varios fabricantes.',
    },
    nl: {
      title: 'Over United Addins — Softwaredistributie rond uw organisatie',
      description:
        'Geautoriseerd Foxit-distributeur sinds 2012 en Mekko Graphics-partner. Productkennis, licentieadvies en één vertrouwd aanspreekpunt voor meerdere leveranciers.',
    },
    it: {
      title: 'Chi siamo — United Addins, distribuzione software su misura per la tua azienda',
      description:
        'Distributore autorizzato Foxit dal 2012 e partner Mekko Graphics. Competenza sui prodotti, supporto sulle licenze e un unico referente per più vendor.',
    },
    pl: {
      title: 'O United Addins — dystrybucja oprogramowania dopasowana do Twojej firmy',
      description:
        'Autoryzowany dystrybutor Foxit od 2012 roku i partner Mekko Graphics. Wiedza produktowa, wsparcie licencyjne i jeden zaufany kontakt dla wielu dostawców.',
    },
  },
  contact: {
    path: '/contact',
    en: {
      title: 'Request a quote — United Addins',
      description:
        'Pick your products and number of licenses and get a tailored quote from United Addins.',
    },
    de: {
      title: 'Angebot anfordern — United Addins',
      description:
        'Wählen Sie Produkte und Anzahl der Lizenzen und erhalten Sie ein individuelles Angebot von United Addins.',
    },
    fr: {
      title: 'Demander un devis — United Addins',
      description:
        'Choisissez vos produits et le nombre de licences et recevez un devis sur mesure de United Addins.',
    },
    es: {
      title: 'Solicitar presupuesto — United Addins',
      description:
        'Elija sus productos y el número de licencias y reciba un presupuesto a medida de United Addins.',
    },
    nl: {
      title: 'Offerte aanvragen — United Addins',
      description:
        'Kies uw producten en het aantal licenties en ontvang een offerte op maat van United Addins.',
    },
    it: {
      title: 'Richiedi un preventivo — United Addins',
      description:
        'Scegli i prodotti e il numero di licenze e ricevi un preventivo su misura da United Addins.',
    },
    pl: {
      title: 'Poproś o wycenę — United Addins',
      description:
        'Wybierz produkty i liczbę licencji, a otrzymasz indywidualną wycenę od United Addins.',
    },
  },
  partners: {
    path: '/partners',
    en: { title: 'Become a partner — United Addins', description: 'Resell, implement or recommend Foxit, Mekko Graphics and more. Apply to become a United Addins partner — resellers, IT service providers, referral partners and software vendors.' },
    de: { title: 'Partner werden — United Addins', description: 'Verkaufen, implementieren oder empfehlen Sie Foxit, Mekko Graphics und mehr. Bewerben Sie sich als Partner von United Addins — Reseller, IT-Dienstleister, Empfehlungspartner und Softwarehersteller.' },
    fr: { title: 'Devenir partenaire — United Addins', description: 'Revendez, déployez ou recommandez Foxit, Mekko Graphics et plus. Devenez partenaire de United Addins — revendeurs, prestataires IT, apporteurs d’affaires et éditeurs de logiciels.' },
    es: { title: 'Hágase partner — United Addins', description: 'Revenda, implemente o recomiende Foxit, Mekko Graphics y más. Solicite ser partner de United Addins — revendedores, proveedores de servicios de TI, partners de recomendación y fabricantes de software.' },
    nl: { title: 'Partner worden — United Addins', description: 'Verkoop, implementeer of beveel Foxit, Mekko Graphics en meer aan. Meld u aan als partner van United Addins — resellers, IT-dienstverleners, doorverwijzers en softwareleveranciers.' },
    it: { title: 'Diventa partner — United Addins', description: 'Rivendi, implementa o raccomanda Foxit, Mekko Graphics e altro. Candidati come partner di United Addins — rivenditori, fornitori di servizi IT, segnalatori e produttori di software.' },
    pl: { title: 'Zostań partnerem — United Addins', description: 'Sprzedawaj, wdrażaj lub polecaj Foxit, Mekko Graphics i inne. Zgłoś się jako partner United Addins — resellerzy, dostawcy usług IT, partnerzy polecający i producenci oprogramowania.' },
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
