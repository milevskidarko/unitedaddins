// Additional products we sell, each with its own page at /<slug> (Foxit and Mekko Graphics
// have their own, richer pages). Plain JS (no JSX): also read by seo.js for page titles,
// the prerender step and the sitemap.
//
// `name` is also the product's key in the quote form, so keep it the same in every language.
// `tone` colours the monogram tile and the quote-form checkbox.
// Copy kept to general, well-known facts (Nov 2026, not yet checked line by line against the
// vendors' sites) — no prices, versions or partner status. Check with the vendor before adding those.
// French copy lives in products.fr.js.
import { PRODUCTS_FR } from './products.fr.js'

export const CATEGORIES = {
  docs: { en: 'Documents & PDF', de: 'Dokumente & PDF', fr: 'Documents et PDF' },
  design: { en: 'Design, CAD & diagrams', de: 'Design, CAD & Diagramme', fr: 'Design, CAO et diagrammes' },
  plan: { en: 'Planning & projects', de: 'Planung & Projekte', fr: 'Planification et projets' },
}

export const PRODUCTS = [
  {
    slug: 'pdf-xchange',
    name: 'PDF-XChange',
    vendor: 'PDF-XChange Co Ltd',
    url: 'https://www.pdf-xchange.com/',
    category: 'docs',
    tone: '#0f7bc4',
    mark: 'PX',
    en: {
      tagline: 'Fast, lightweight PDF editing for Windows',
      lead: 'PDF-XChange Editor is a fast, feature-rich PDF editor that runs light even on large documents. Edit text and images, annotate and review, run OCR on scans and work with forms — with Editor, Editor Plus and PRO editions to match what your team needs.',
      features: [
        ['Edit PDFs', 'Change text, images and pages directly in the PDF.'],
        ['Review & markup', 'Comments, highlights, stamps and measurement tools.'],
        ['OCR', 'Turn scanned documents into searchable, selectable text.'],
        ['Forms', 'Fill, create and edit interactive PDF forms.'],
      ],
      platforms: 'Windows',
      note: 'PDF editor for Windows',
    },
    de: {
      tagline: 'Schnelle, schlanke PDF-Bearbeitung für Windows',
      lead: 'PDF-XChange Editor ist ein schneller, funktionsreicher PDF-Editor, der auch bei großen Dokumenten flüssig läuft. Text und Bilder bearbeiten, kommentieren und prüfen, gescannte Dokumente per OCR erkennen und mit Formularen arbeiten — in den Editionen Editor, Editor Plus und PRO, passend zu Ihrem Team.',
      features: [
        ['PDFs bearbeiten', 'Text, Bilder und Seiten direkt im PDF ändern.'],
        ['Prüfen & markieren', 'Kommentare, Hervorhebungen, Stempel und Messwerkzeuge.'],
        ['OCR', 'Gescannte Dokumente in durchsuchbaren Text umwandeln.'],
        ['Formulare', 'Interaktive PDF-Formulare ausfüllen, erstellen und bearbeiten.'],
      ],
      platforms: 'Windows',
      note: 'PDF-Editor für Windows',
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
    en: {
      tagline: 'PDF markup and collaboration for construction',
      lead: 'Bluebeam Revu is the PDF workspace architects, engineers and contractors use for drawings and project documents. Mark up plans, measure and run quantity takeoffs, compare revisions and work on the same set in real time with Studio Sessions.',
      features: [
        ['Markups & tool sets', 'Mark up drawings with reusable, custom tool sets.'],
        ['Measurements & takeoffs', 'Measure lengths, areas and counts directly on plans.'],
        ['Real-time collaboration', 'Review the same documents together in Studio Sessions.'],
        ['Compare revisions', 'Spot what changed between drawing versions.'],
      ],
      platforms: 'Windows, web & iPad',
      note: 'PDF markup for AEC teams',
    },
    de: {
      tagline: 'PDF-Markup und Zusammenarbeit für das Bauwesen',
      lead: 'Bluebeam Revu ist der PDF-Arbeitsplatz für Architekten, Ingenieure und Bauunternehmen. Pläne markieren, messen und Mengen ermitteln, Revisionen vergleichen und in Studio Sessions in Echtzeit am selben Plansatz arbeiten.',
      features: [
        ['Markups & Werkzeugsätze', 'Pläne mit wiederverwendbaren, eigenen Werkzeugsätzen markieren.'],
        ['Messen & Mengenermittlung', 'Längen, Flächen und Stückzahlen direkt im Plan erfassen.'],
        ['Zusammenarbeit in Echtzeit', 'Dokumente gemeinsam in Studio Sessions prüfen.'],
        ['Revisionen vergleichen', 'Änderungen zwischen Planständen sofort erkennen.'],
      ],
      platforms: 'Windows, Web & iPad',
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
      tagline: 'Shrink Office, PDF and image files',
      lead: 'NXPowerLite Desktop compresses PowerPoint, Word, Excel, PDF and JPEG files — often dramatically — while they stay in their original format and open just as before. Smaller files are quicker to email, share and store.',
      features: [
        ['Same format, smaller file', 'Files stay as .pptx, .docx, .xlsx, .pdf or .jpg — no zipping.'],
        ['Batch compression', 'Shrink whole folders of documents in one go.'],
        ['Email attachments', 'Compress attachments as you send them from Outlook.'],
        ['Simple to use', 'Drag, drop, done — no training needed.'],
      ],
      platforms: 'Windows & macOS',
      note: 'File compression for Office & PDF',
    },
    de: {
      tagline: 'Office-, PDF- und Bilddateien verkleinern',
      lead: 'NXPowerLite Desktop komprimiert PowerPoint-, Word-, Excel-, PDF- und JPEG-Dateien — oft erheblich —, ohne das Format zu ändern: Die Dateien öffnen sich wie gewohnt. Kleinere Dateien lassen sich schneller versenden, teilen und speichern.',
      features: [
        ['Gleiches Format, kleinere Datei', 'Dateien bleiben .pptx, .docx, .xlsx, .pdf oder .jpg — kein Zippen.'],
        ['Stapelverarbeitung', 'Ganze Ordner mit Dokumenten auf einmal verkleinern.'],
        ['E-Mail-Anhänge', 'Anhänge beim Senden aus Outlook komprimieren.'],
        ['Einfach zu bedienen', 'Ziehen, ablegen, fertig — ohne Schulung.'],
      ],
      platforms: 'Windows & macOS',
      note: 'Dateikomprimierung für Office & PDF',
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
    en: {
      tagline: 'AutoCAD®-compatible 2D/3D CAD',
      lead: 'progeCAD is professional DWG CAD software with a familiar interface and commands, so AutoCAD users are productive from day one. Draft in 2D, model in 3D and exchange DWG files with partners — with perpetual licensing available.',
      features: [
        ['Native DWG', 'Open, edit and save DWG files directly.'],
        ['Familiar workflow', 'AutoCAD-style commands, menus and shortcuts.'],
        ['2D & 3D', 'Drafting, annotation and 3D modeling in one tool.'],
        ['Perpetual licenses', 'Buy once instead of a yearly subscription.'],
      ],
      platforms: 'Windows & macOS',
      note: 'DWG CAD, AutoCAD-compatible',
    },
    de: {
      tagline: 'AutoCAD®-kompatibles 2D/3D-CAD',
      lead: 'progeCAD ist professionelle DWG-CAD-Software mit vertrauter Oberfläche und Befehlen — AutoCAD-Anwender sind vom ersten Tag an produktiv. In 2D zeichnen, in 3D modellieren und DWG-Dateien mit Partnern austauschen — auch als Dauerlizenz erhältlich.',
      features: [
        ['Natives DWG', 'DWG-Dateien direkt öffnen, bearbeiten und speichern.'],
        ['Vertrauter Arbeitsablauf', 'Befehle, Menüs und Tastenkürzel wie in AutoCAD.'],
        ['2D & 3D', 'Zeichnen, Beschriften und 3D-Modellieren in einem Werkzeug.'],
        ['Dauerlizenzen', 'Einmal kaufen statt jährlichem Abonnement.'],
      ],
      platforms: 'Windows & macOS',
      note: 'DWG-CAD, AutoCAD-kompatibel',
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
      lead: 'SketchUp makes 3D design intuitive: sketch ideas, model buildings and spaces, and turn them into presentation drawings. Plans range from SketchUp Go to Pro and Studio, for individuals up to whole design teams.',
      features: [
        ['Intuitive 3D modeling', 'Push, pull and shape models quickly.'],
        ['LayOut', 'Create 2D drawings and presentation documents from your model.'],
        ['3D Warehouse', 'A huge library of ready-made models and components.'],
        ['Desktop, web & iPad', 'Work wherever your project takes you.'],
      ],
      platforms: 'Windows, macOS, web & iPad',
      note: '3D modeling — Go, Pro, Studio',
    },
    de: {
      tagline: '3D-Modellierung für Architektur, Innenausbau und Bau',
      lead: 'SketchUp macht 3D-Design intuitiv: Ideen skizzieren, Gebäude und Räume modellieren und daraus Präsentationspläne erstellen. Die Pläne reichen von SketchUp Go über Pro bis Studio — für Einzelne bis hin zu ganzen Designteams.',
      features: [
        ['Intuitive 3D-Modellierung', 'Modelle schnell drücken, ziehen und formen.'],
        ['LayOut', '2D-Pläne und Präsentationen direkt aus dem Modell erstellen.'],
        ['3D Warehouse', 'Riesige Bibliothek mit fertigen Modellen und Komponenten.'],
        ['Desktop, Web & iPad', 'Arbeiten, wo immer Ihr Projekt Sie hinführt.'],
      ],
      platforms: 'Windows, macOS, Web & iPad',
      note: '3D-Modellierung — Go, Pro, Studio',
    },
  },
  {
    slug: 'mydraw',
    name: 'MyDraw',
    vendor: 'Nevron',
    url: 'https://www.mydraw.com/',
    category: 'design',
    tone: '#2e9e4f',
    mark: 'MD',
    en: {
      tagline: 'Diagrams, flowcharts and mind maps — a Visio® alternative',
      lead: 'MyDraw is easy-to-use diagramming software for flowcharts, org charts, mind maps, floor plans, network diagrams and more. It opens and saves Visio files, so you can keep working with the diagrams you already have.',
      features: [
        ['Many diagram types', 'Flowcharts, org charts, mind maps, floor plans and more.'],
        ['Visio files', 'Open and save Visio (VSDX) drawings.'],
        ['Templates & shapes', 'Start fast with ready-made templates and shape libraries.'],
        ['Export anywhere', 'Share as PDF, images and other common formats.'],
      ],
      platforms: 'Windows & macOS',
      note: 'Diagramming, Visio-compatible',
    },
    de: {
      tagline: 'Diagramme, Flussdiagramme und Mindmaps — eine Visio®-Alternative',
      lead: 'MyDraw ist einfach zu bedienende Diagrammsoftware für Flussdiagramme, Organigramme, Mindmaps, Grundrisse, Netzwerkdiagramme und mehr. Visio-Dateien lassen sich öffnen und speichern — Sie arbeiten einfach mit Ihren bestehenden Diagrammen weiter.',
      features: [
        ['Viele Diagrammtypen', 'Flussdiagramme, Organigramme, Mindmaps, Grundrisse und mehr.'],
        ['Visio-Dateien', 'Visio-Zeichnungen (VSDX) öffnen und speichern.'],
        ['Vorlagen & Formen', 'Schnell starten mit fertigen Vorlagen und Formbibliotheken.'],
        ['Flexibler Export', 'Als PDF, Bild und in weiteren gängigen Formaten teilen.'],
      ],
      platforms: 'Windows & macOS',
      note: 'Diagramme, Visio-kompatibel',
    },
  },
  {
    slug: 'mindmanager',
    name: 'MindManager',
    vendor: 'MindManager',
    url: 'https://www.mindmanager.com/',
    category: 'plan',
    tone: '#7c3aed',
    mark: 'MM',
    en: {
      tagline: 'Mind maps, plans and visual workspaces',
      lead: 'MindManager turns ideas, information and plans into clear visual maps. Brainstorm, structure projects, build timelines and flowcharts, and keep everything connected to the Microsoft 365 tools your team already uses.',
      features: [
        ['Mind & concept maps', 'Capture ideas and organize information visually.'],
        ['Project planning', 'Timelines, Gantt charts and task tracking in one view.'],
        ['Flowcharts & diagrams', 'Map processes and decisions clearly.'],
        ['Microsoft 365', 'Works alongside Word, Excel, Outlook and Teams.'],
      ],
      platforms: 'Windows, macOS & web',
      note: 'Mind mapping & visual planning',
    },
    de: {
      tagline: 'Mindmaps, Pläne und visuelle Arbeitsbereiche',
      lead: 'MindManager verwandelt Ideen, Informationen und Pläne in klare visuelle Maps. Brainstormen, Projekte strukturieren, Zeitpläne und Flussdiagramme erstellen — verbunden mit den Microsoft-365-Tools, die Ihr Team bereits nutzt.',
      features: [
        ['Mind- & Concept-Maps', 'Ideen festhalten und Informationen visuell ordnen.'],
        ['Projektplanung', 'Zeitleisten, Gantt-Diagramme und Aufgaben in einer Ansicht.'],
        ['Flussdiagramme', 'Prozesse und Entscheidungen klar darstellen.'],
        ['Microsoft 365', 'Arbeitet mit Word, Excel, Outlook und Teams zusammen.'],
      ],
      platforms: 'Windows, macOS & Web',
      note: 'Mindmapping & visuelle Planung',
    },
  },
  {
    slug: 'project-plan-365',
    name: 'Project Plan 365',
    vendor: 'Project Plan 365',
    url: 'https://www.projectplan365.com/',
    category: 'plan',
    tone: '#1e8e3e',
    mark: 'P3',
    en: {
      tagline: 'Open, edit and share Microsoft Project files — on any device',
      lead: 'Project Plan 365 opens, edits and saves Microsoft Project (.mpp) files without Microsoft Project. Plan with Gantt charts, manage tasks and resources, and share schedules with everyone on the project — on desktop, mobile or in the browser.',
      features: [
        ['Microsoft Project files', 'Open, edit and save .mpp files natively.'],
        ['Full planning', 'Gantt charts, tasks, resources, baselines and reports.'],
        ['Any device', 'Windows, Mac, iPhone, iPad, Android and web.'],
        ['Share with the team', 'Everyone sees the same, up-to-date plan.'],
      ],
      platforms: 'Windows, macOS, iOS, Android & web',
      note: 'Edit MS Project files anywhere',
    },
    de: {
      tagline: 'Microsoft-Project-Dateien öffnen, bearbeiten und teilen — auf jedem Gerät',
      lead: 'Project Plan 365 öffnet, bearbeitet und speichert Microsoft-Project-Dateien (.mpp) ohne Microsoft Project. Mit Gantt-Diagrammen planen, Aufgaben und Ressourcen verwalten und Zeitpläne mit allen Projektbeteiligten teilen — am Desktop, mobil oder im Browser.',
      features: [
        ['Microsoft-Project-Dateien', '.mpp-Dateien nativ öffnen, bearbeiten und speichern.'],
        ['Vollständige Planung', 'Gantt-Diagramme, Aufgaben, Ressourcen, Basispläne und Berichte.'],
        ['Jedes Gerät', 'Windows, Mac, iPhone, iPad, Android und Web.'],
        ['Mit dem Team teilen', 'Alle sehen denselben, aktuellen Plan.'],
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
      tagline: 'View Microsoft Project files without Microsoft Project',
      lead: 'Steelray Project Viewer lets everyone who only needs to read a schedule open Microsoft Project (.mpp) files — without a full Microsoft Project license for each of them. Familiar views make it easy for team members and stakeholders to follow the plan.',
      features: [
        ['Open .mpp files', 'View Microsoft Project schedules as they were built.'],
        ['Familiar views', 'Gantt chart, task and resource views like in Project.'],
        ['Print & export', 'Print schedules or export them to share.'],
        ['Saves licenses', 'Viewers don’t need Microsoft Project licenses.'],
      ],
      platforms: 'Windows & macOS',
      note: 'Viewer for MS Project files',
    },
    de: {
      tagline: 'Microsoft-Project-Dateien ohne Microsoft Project anzeigen',
      lead: 'Mit Steelray Project Viewer öffnen alle, die einen Zeitplan nur lesen müssen, Microsoft-Project-Dateien (.mpp) — ohne für jeden eine volle Microsoft-Project-Lizenz. Vertraute Ansichten machen es Teammitgliedern und Stakeholdern leicht, dem Plan zu folgen.',
      features: [
        ['.mpp-Dateien öffnen', 'Microsoft-Project-Zeitpläne so ansehen, wie sie erstellt wurden.'],
        ['Vertraute Ansichten', 'Gantt-, Aufgaben- und Ressourcenansichten wie in Project.'],
        ['Drucken & Exportieren', 'Zeitpläne drucken oder zum Teilen exportieren.'],
        ['Spart Lizenzen', 'Betrachter brauchen keine Microsoft-Project-Lizenz.'],
      ],
      platforms: 'Windows & macOS',
      note: 'Viewer für MS-Project-Dateien',
    },
  },
]

export const productBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug)

PRODUCTS.forEach((p) => {
  p.fr = PRODUCTS_FR[p.slug]
})
