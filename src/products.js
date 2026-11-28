// Additional products we sell, each with its own page at /<slug> (Foxit and Mekko Graphics
// have their own, richer pages). Plain JS (no JSX): also read by seo.js for page titles,
// the prerender step and the sitemap.
//
// `name` is also the product's key in the quote form, so keep it the same in every language.
// `tone` colours the tile and the quote-form checkbox.
// `logo`: the vendor's own product icon, taken from its website (Nov 2026), in public/product-icons/.
//   Without one, the tile shows `mark` (initials) — NXPowerLite, SketchUp and Steelray publish no
//   usable square icon on their sites; ask the vendor (partner portal / press kit) for one.
// Copy checked against each vendor's website (18 Nov 2026). No prices or versions on purpose.
// French, Spanish, Dutch, Italian and Polish copy live in products.fr.js, .es.js, .nl.js, .it.js and .pl.js.
import { PRODUCTS_FR } from './products.fr.js'
import { PRODUCTS_ES } from './products.es.js'
import { PRODUCTS_NL } from './products.nl.js'
import { PRODUCTS_IT } from './products.it.js'
import { PRODUCTS_PL } from './products.pl.js'

export const CATEGORIES = {
  docs: { en: 'Documents & PDF', de: 'Dokumente & PDF', fr: 'Documents et PDF', es: 'Documentos y PDF', nl: 'Documenten en PDF', it: 'Documenti e PDF', pl: 'Dokumenty i PDF' },
  design: { en: 'Design, CAD & diagrams', de: 'Design, CAD & Diagramme', fr: 'Design, CAO et diagrammes', es: 'Diseño, CAD y diagramas', nl: 'Ontwerp, CAD en diagrammen', it: 'Design, CAD e diagrammi', pl: 'Projektowanie, CAD i diagramy' },
  plan: { en: 'Planning & projects', de: 'Planung & Projekte', fr: 'Planification et projets', es: 'Planificación y proyectos', nl: 'Planning en projecten', it: 'Pianificazione e progetti', pl: 'Planowanie i projekty' },
}

// Mekko Graphics and Efficient Elements share one "Presentations" section (menu, home, /products).
export const PRESENTATIONS = { en: 'Presentations', de: 'Präsentationen', fr: 'Présentations', es: 'Presentaciones', nl: 'Presentaties', it: 'Presentazioni', pl: 'Prezentacje' }

export const PRODUCTS = [
  {
    slug: 'pdf-xchange',
    name: 'PDF-XChange',
    vendor: 'PDF-XChange Co Ltd',
    url: 'https://www.pdf-xchange.com/',
    category: 'docs',
    tone: '#0f7bc4',
    mark: 'PX',
    logo: '/product-icons/pdf-xchange.png',
    en: {
      tagline: 'Fast, feature-rich PDF editing for Windows',
      lead: 'PDF-XChange Editor brings everything you need to create, edit, enhance and convert PDF documents into one application — with free OCR built in. Choose Editor, Editor Plus or PRO (Editor Plus with PDF-Tools and the Standard virtual printer), all sold as perpetual licenses.',
      features: [
        ['Edit PDFs', 'Change text, images and pages directly in the PDF.'],
        ['Review & markup', 'Comments, highlights, stamps and measurement tools.'],
        ['OCR included', 'Turn scanned documents into searchable, selectable text.'],
        ['Perpetual license', 'Pay once and use it indefinitely — no subscription fees.'],
      ],
      platforms: 'Windows',
      note: 'PDF editor for Windows · perpetual',
    },
    de: {
      tagline: 'Schnelle, funktionsreiche PDF-Bearbeitung für Windows',
      lead: 'PDF-XChange Editor vereint alles, um PDF-Dokumente zu erstellen, zu bearbeiten, zu optimieren und zu konvertieren, in einer Anwendung — inklusive kostenloser OCR. Wählen Sie Editor, Editor Plus oder PRO (Editor Plus mit PDF-Tools und dem virtuellen Drucker Standard), jeweils als Dauerlizenz.',
      features: [
        ['PDFs bearbeiten', 'Text, Bilder und Seiten direkt im PDF ändern.'],
        ['Prüfen & markieren', 'Kommentare, Hervorhebungen, Stempel und Messwerkzeuge.'],
        ['OCR inklusive', 'Gescannte Dokumente in durchsuchbaren Text umwandeln.'],
        ['Dauerlizenz', 'Einmal zahlen, unbegrenzt nutzen — keine Abo-Gebühren.'],
      ],
      platforms: 'Windows',
      note: 'PDF-Editor für Windows · Dauerlizenz',
    },
  },
  {
    slug: 'bluebeam',
    name: 'Bluebeam Revu',
    vendor: 'Bluebeam',
    url: 'https://www.bluebeam.com/',
    category: 'docs',
    tone: '#0067b1',
    mark: 'Bb',
    logo: '/product-icons/bluebeam.svg',
    en: {
      tagline: 'Construction software built for collaboration',
      lead: 'Bluebeam Revu is the PDF-based workspace architects, engineers and contractors use to mark up, measure and review drawings — and to work on them together on desktop, in the browser and on mobile. From drawing management and design review to takeoffs, RFIs, submittals and punch lists.',
      features: [
        ['Markups & measurements', 'Industry-standard markup and measurement tools for drawings.'],
        ['Quantity takeoffs', 'Measure lengths, areas and counts directly on plans.'],
        ['Real-time collaboration', 'Mark up the same drawings together from any device.'],
        ['Construction workflows', 'Design review, RFIs, submittals, punch lists and closeout.'],
      ],
      platforms: 'Windows, web, iOS & Android',
      note: 'PDF markup for AEC teams',
    },
    de: {
      tagline: 'Bausoftware für die Zusammenarbeit',
      lead: 'Bluebeam Revu ist der PDF-basierte Arbeitsplatz, mit dem Architekten, Ingenieure und Bauunternehmen Pläne markieren, messen und prüfen — und gemeinsam daran arbeiten, am Desktop, im Browser und mobil. Von Planverwaltung und Design-Review bis zu Mengenermittlung, RFIs, Submittals und Mängellisten.',
      features: [
        ['Markups & Messungen', 'Branchenübliche Markup- und Messwerkzeuge für Pläne.'],
        ['Mengenermittlung', 'Längen, Flächen und Stückzahlen direkt im Plan erfassen.'],
        ['Zusammenarbeit in Echtzeit', 'Dieselben Pläne gemeinsam von jedem Gerät aus markieren.'],
        ['Bau-Workflows', 'Design-Review, RFIs, Submittals, Mängellisten und Projektabschluss.'],
      ],
      platforms: 'Windows, Web, iOS & Android',
      note: 'PDF-Markup für Bau & Planung',
    },
  },
  {
    slug: 'nxpowerlite',
    name: 'NXPowerLite Desktop',
    vendor: 'Neuxpower',
    url: 'https://neuxpower.com/nxpowerlite-desktop',
    category: 'docs',
    tone: '#e5322d',
    mark: 'NX',
    en: {
      tagline: 'Simple, powerful, offline file compression',
      lead: 'NXPowerLite Desktop shrinks PDF, PowerPoint, Word, Excel, JPEG, PNG and TIFF files while they keep their original format and extension — recipients open them as usual, without NXPowerLite. Compression runs offline on your own computer.',
      features: [
        ['Same format, smaller file', 'Files stay .pdf, .pptx, .docx, .xlsx, .jpg and so on — no zipping needed.'],
        ['Batch compression', 'Compress up to 10,000 files in one go.'],
        ['Outlook attachments', 'Automatically compress email attachments as you send them.'],
        ['Perpetual license', 'One-time fee per user, no subscription.'],
      ],
      platforms: 'Windows & macOS',
      note: 'File compression · perpetual',
    },
    de: {
      tagline: 'Einfache, leistungsstarke Offline-Dateikomprimierung',
      lead: 'NXPowerLite Desktop verkleinert PDF-, PowerPoint-, Word-, Excel-, JPEG-, PNG- und TIFF-Dateien, ohne Format und Dateiendung zu ändern — Empfänger öffnen sie wie gewohnt, ohne NXPowerLite. Die Komprimierung läuft offline auf Ihrem eigenen Rechner.',
      features: [
        ['Gleiches Format, kleinere Datei', 'Dateien bleiben .pdf, .pptx, .docx, .xlsx, .jpg usw. — kein Zippen nötig.'],
        ['Stapelverarbeitung', 'Bis zu 10.000 Dateien auf einmal komprimieren.'],
        ['Outlook-Anhänge', 'E-Mail-Anhänge beim Senden automatisch komprimieren.'],
        ['Dauerlizenz', 'Einmalige Gebühr pro Nutzer, kein Abonnement.'],
      ],
      platforms: 'Windows & macOS',
      note: 'Dateikomprimierung · Dauerlizenz',
    },
  },
  {
    slug: 'progecad',
    name: 'progeCAD',
    vendor: 'Progesoft',
    url: 'https://www.progesoft.com/',
    category: 'design',
    tone: '#c8102e',
    mark: 'pC',
    logo: '/product-icons/progecad.png',
    en: {
      tagline: 'AutoCAD®-compatible 2D/3D CAD for Windows',
      lead: 'progeCAD Professional is a low-cost alternative to AutoCAD® that works natively with DWG files and uses familiar commands, so your team is productive from day one. It comes with a perpetual license — no annual subscription. For Mac, Progesoft offers iCADMac.',
      features: [
        ['Native DWG', 'Open, edit and save DWG files from all AutoCAD® versions.'],
        ['Familiar workflow', 'AutoCAD-style commands, menus and shortcuts.'],
        ['2D & 3D', 'Drafting, annotation, 3D modeling and rendering in one tool.'],
        ['Perpetual license', 'Buy once — no annual subscription.'],
      ],
      platforms: 'Windows (Mac: iCADMac)',
      note: 'DWG CAD for Windows · perpetual',
    },
    de: {
      tagline: 'AutoCAD®-kompatibles 2D/3D-CAD für Windows',
      lead: 'progeCAD Professional ist eine günstige Alternative zu AutoCAD®, arbeitet nativ mit DWG-Dateien und nutzt vertraute Befehle — Ihr Team ist vom ersten Tag an produktiv. Mit Dauerlizenz, ohne Jahresabonnement. Für den Mac bietet Progesoft iCADMac an.',
      features: [
        ['Natives DWG', 'DWG-Dateien aller AutoCAD®-Versionen öffnen, bearbeiten und speichern.'],
        ['Vertrauter Arbeitsablauf', 'Befehle, Menüs und Tastenkürzel wie in AutoCAD.'],
        ['2D & 3D', 'Zeichnen, Beschriften, 3D-Modellieren und Rendern in einem Werkzeug.'],
        ['Dauerlizenz', 'Einmal kaufen — kein Jahresabonnement.'],
      ],
      platforms: 'Windows (Mac: iCADMac)',
      note: 'DWG-CAD für Windows · Dauerlizenz',
    },
  },
  {
    slug: 'sketchup',
    name: 'SketchUp',
    vendor: 'Trimble',
    url: 'https://sketchup.trimble.com/en',
    category: 'design',
    tone: '#005f9e',
    mark: 'SU',
    en: {
      tagline: '3D modeling for architecture, interiors and construction',
      lead: 'SketchUp makes 3D design intuitive: sketch ideas, model buildings and spaces, and turn them into documentation and presentations. Plans: SketchUp Go (web and iPad), Pro (adds the desktop modeler and LayOut) and Studio (adds Revit import, point clouds and photorealistic visuals).',
      features: [
        ['Intuitive 3D modeling', 'Push, pull and shape models quickly.'],
        ['LayOut', '2D documentation and presentation drawings from your model (Pro and Studio).'],
        ['3D Warehouse', 'Millions of ready-made models, plus hundreds of extensions.'],
        ['Desktop, web & iPad', 'Work wherever your project takes you.'],
      ],
      platforms: 'Desktop, web & iPad',
      note: '3D modeling — Go, Pro, Studio',
    },
    de: {
      tagline: '3D-Modellierung für Architektur, Innenausbau und Bau',
      lead: 'SketchUp macht 3D-Design intuitiv: Ideen skizzieren, Gebäude und Räume modellieren und daraus Pläne und Präsentationen erstellen. Pläne: SketchUp Go (Web und iPad), Pro (mit Desktop-Modellierer und LayOut) und Studio (zusätzlich Revit-Import, Punktwolken und fotorealistische Visualisierung).',
      features: [
        ['Intuitive 3D-Modellierung', 'Modelle schnell drücken, ziehen und formen.'],
        ['LayOut', '2D-Pläne und Präsentationen direkt aus dem Modell (Pro und Studio).'],
        ['3D Warehouse', 'Millionen fertiger Modelle, dazu Hunderte Erweiterungen.'],
        ['Desktop, Web & iPad', 'Arbeiten, wo immer Ihr Projekt Sie hinführt.'],
      ],
      platforms: 'Desktop, Web & iPad',
      note: '3D-Modellierung — Go, Pro, Studio',
    },
  },
  {
    slug: 'mydraw',
    name: 'MyDraw',
    vendor: 'Nevron Software',
    url: 'https://www.mydraw.com/',
    category: 'design',
    tone: '#615fa8',
    mark: 'MD',
    logo: '/product-icons/mydraw.png',
    en: {
      tagline: 'Diagrams, flowcharts and mind maps — a Visio® alternative',
      lead: 'MyDraw is advanced, easy-to-use diagramming software for flowcharts, org charts, mind maps, family trees, Venn and workflow diagrams and more. It loads and saves Visio drawings and stencils, and is available as a one-time purchase or a subscription.',
      features: [
        ['Many diagram types', 'Flowcharts, org charts, mind maps, cause-and-effect, data flow and more.'],
        ['Visio files', 'Load and save Visio drawings and stencils.'],
        ['PDF & image export', 'Print or share diagrams as PDF and images.'],
        ['Flexible licensing', 'Perpetual, subscription or corporate licenses.'],
      ],
      platforms: 'Windows, macOS & web',
      note: 'Diagramming, Visio-compatible',
    },
    de: {
      tagline: 'Diagramme, Flussdiagramme und Mindmaps — eine Visio®-Alternative',
      lead: 'MyDraw ist leistungsfähige, einfach zu bedienende Diagrammsoftware für Flussdiagramme, Organigramme, Mindmaps, Stammbäume, Venn- und Workflow-Diagramme und mehr. Visio-Zeichnungen und -Schablonen lassen sich laden und speichern — erhältlich als Einmalkauf oder Abonnement.',
      features: [
        ['Viele Diagrammtypen', 'Flussdiagramme, Organigramme, Mindmaps, Ursache-Wirkungs- und Datenflussdiagramme und mehr.'],
        ['Visio-Dateien', 'Visio-Zeichnungen und -Schablonen laden und speichern.'],
        ['PDF- & Bildexport', 'Diagramme drucken oder als PDF und Bild teilen.'],
        ['Flexible Lizenzen', 'Dauerlizenz, Abonnement oder Unternehmenslizenz.'],
      ],
      platforms: 'Windows, macOS & Web',
      note: 'Diagramme, Visio-kompatibel',
    },
  },
  {
    slug: 'mindmanager',
    name: 'MindManager',
    vendor: 'MindManager',
    url: 'https://www.mindmanager.com/',
    category: 'plan',
    tone: '#2f9a9d',
    mark: 'MM',
    logo: '/product-icons/mindmanager.svg',
    en: {
      tagline: 'Turn ideas into plans, and plans into action',
      lead: 'MindManager turns ideas, information and plans into clear visual maps — mind maps, concept maps, flowcharts, timelines and Gantt charts. Editions range from MindManager Essentials on the web to Professional and Enterprise, plus MindManager for Microsoft Teams.',
      features: [
        ['Mind & concept maps', 'Capture ideas and organize information visually.'],
        ['Project planning', 'Timelines, Gantt charts and process maps in one place.'],
        ['Flowcharts & workflows', 'Map processes and decisions clearly.'],
        ['Integrations', 'Works with Microsoft Teams, SharePoint, Jira and more.'],
      ],
      platforms: 'Windows, macOS & web',
      note: 'Mind mapping & visual planning',
    },
    de: {
      tagline: 'Aus Ideen werden Pläne, aus Plänen Ergebnisse',
      lead: 'MindManager verwandelt Ideen, Informationen und Pläne in klare visuelle Maps — Mindmaps, Concept-Maps, Flussdiagramme, Zeitleisten und Gantt-Diagramme. Die Editionen reichen von MindManager Essentials im Web über Professional bis Enterprise, dazu MindManager für Microsoft Teams.',
      features: [
        ['Mind- & Concept-Maps', 'Ideen festhalten und Informationen visuell ordnen.'],
        ['Projektplanung', 'Zeitleisten, Gantt-Diagramme und Prozesslandkarten an einem Ort.'],
        ['Flussdiagramme & Workflows', 'Prozesse und Entscheidungen klar darstellen.'],
        ['Integrationen', 'Arbeitet mit Microsoft Teams, SharePoint, Jira und mehr.'],
      ],
      platforms: 'Windows, macOS & Web',
      note: 'Mindmapping & visuelle Planung',
    },
  },
  {
    slug: 'project-plan-365',
    name: 'Project Plan 365',
    vendor: 'Housatonic Software',
    url: 'https://www.projectplan365.com/',
    category: 'plan',
    tone: '#1f3c88',
    mark: 'P3',
    logo: '/product-icons/project-plan-365.png',
    en: {
      tagline: 'Open, edit and share Microsoft Project files — on any device',
      lead: 'Project Plan 365 opens, edits and saves Microsoft Project (.mpp) files without importing or exporting. Its scheduling engine calculates costs, end dates, critical paths and resource over-allocations — for traditional and Agile planning, on PC, Mac, mobile and the web.',
      features: [
        ['Microsoft Project files', 'Open, edit and save .mpp files natively.'],
        ['Full scheduling', 'Gantt charts, critical path, resources, dashboards and reports.'],
        ['Any device', 'Windows, Mac, iOS, Android and web.'],
        ['Cloud & collaboration', 'OneDrive, SharePoint, Google Drive, Dropbox, Box and more.'],
      ],
      platforms: 'Windows, macOS, iOS, Android & web',
      note: 'Edit MS Project files anywhere',
    },
    de: {
      tagline: 'Microsoft-Project-Dateien öffnen, bearbeiten und teilen — auf jedem Gerät',
      lead: 'Project Plan 365 öffnet, bearbeitet und speichert Microsoft-Project-Dateien (.mpp) ohne Import oder Export. Die Planungs-Engine berechnet Kosten, Endtermine, kritische Pfade und Ressourcenüberlastungen — für klassische und agile Planung, auf PC, Mac, Mobilgeräten und im Web.',
      features: [
        ['Microsoft-Project-Dateien', '.mpp-Dateien nativ öffnen, bearbeiten und speichern.'],
        ['Vollständige Terminplanung', 'Gantt-Diagramme, kritischer Pfad, Ressourcen, Dashboards und Berichte.'],
        ['Jedes Gerät', 'Windows, Mac, iOS, Android und Web.'],
        ['Cloud & Zusammenarbeit', 'OneDrive, SharePoint, Google Drive, Dropbox, Box und mehr.'],
      ],
      platforms: 'Windows, macOS, iOS, Android & Web',
      note: 'MS-Project-Dateien überall bearbeiten',
    },
  },
  {
    slug: 'steelray-project-viewer',
    name: 'Steelray Project Viewer',
    vendor: 'Steelray Software',
    url: 'https://steelray.com/ProjectViewer/MicrosoftProjectViewer.php',
    category: 'plan',
    tone: '#3b5b8c',
    mark: 'SR',
    en: {
      tagline: 'See your schedule — without Microsoft Project',
      lead: 'Steelray Project Viewer lets everyone who only needs to read a schedule open Microsoft Project (.mpp) files — with the same core views and data as Project, but no Project license for each of them. Files are view-only, so nobody changes the plan by accident. The Ultimate edition also opens Primavera P6 (.xer) files.',
      features: [
        ['Open .mpp files', 'No import or upload — open Microsoft Project files directly.'],
        ['Familiar views', 'The same core views and data as Microsoft Project.'],
        ['Enhanced printing', 'Page preview, scaling, page size, orientation and headers.'],
        ['Search & navigate', 'Find tasks, resources and dates in one click.'],
      ],
      platforms: 'Desktop app',
      note: 'Viewer for MS Project files',
    },
    de: {
      tagline: 'Ihr Zeitplan im Blick — ohne Microsoft Project',
      lead: 'Mit Steelray Project Viewer öffnen alle, die einen Zeitplan nur lesen müssen, Microsoft-Project-Dateien (.mpp) — mit denselben zentralen Ansichten und Daten wie in Project, aber ohne Project-Lizenz für jeden. Die Dateien sind schreibgeschützt, niemand ändert den Plan versehentlich. Die Ultimate Edition öffnet zusätzlich Primavera-P6-Dateien (.xer).',
      features: [
        ['.mpp-Dateien öffnen', 'Kein Import oder Upload — Microsoft-Project-Dateien direkt öffnen.'],
        ['Vertraute Ansichten', 'Dieselben zentralen Ansichten und Daten wie in Microsoft Project.'],
        ['Erweitertes Drucken', 'Seitenvorschau, Skalierung, Seitenformat, Ausrichtung und Kopfzeilen.'],
        ['Suchen & navigieren', 'Aufgaben, Ressourcen und Termine mit einem Klick finden.'],
      ],
      platforms: 'Desktop-App',
      note: 'Viewer für MS-Project-Dateien',
    },
  },
]

export const productBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug)

PRODUCTS.forEach((p) => {
  p.fr = PRODUCTS_FR[p.slug]
  p.es = PRODUCTS_ES[p.slug]
  p.nl = PRODUCTS_NL[p.slug]
  p.it = PRODUCTS_IT[p.slug]
  p.pl = PRODUCTS_PL[p.slug]
})
