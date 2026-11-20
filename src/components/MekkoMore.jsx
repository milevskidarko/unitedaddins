import { useT } from '../i18n.jsx'
import './Extras.css'

// Extra Mekko Graphics info, from mekkographics.com (Nov 2026):
// chart types and enhancements from /product/features/ (Gantt = #tab-id-8), customer numbers from /customers/. Slide tools (Harvey balls, agenda slides…) are Windows only.
const DOTS = ['#ff6b6b', '#ffc145', '#36cf7a', '#4f7cff', '#a78bfa']
const STATS = ['7', '50%', '75%', '20']
const CUSTOMERS = 'PepsiCo, Microsoft, Dell, Intel, Starbucks, Nestlé, Philips, Toyota, Vodafone, Novartis'

const T = {
  en: {
    eyebrow: 'Chart types',
    title: 'More than 30 chart types,',
    accent: 'built for business',
    types: [
      ['Marimekko', 'Variable-width 100% stacked bars — market size and share in one view.'],
      ['Bar Mekko', 'Variable-width stacked bars — segment size against a second measure.'],
      ['Waterfall', 'How positive and negative changes add up to a total: build-up, change, stacked or horizontal.'],
      ['Bubble', 'X and Y values plus a third variable as bubble size, incl. growth/share charts.'],
      ['Bar', 'Stacked, 100% stacked, floating, clustered and bar/line combinations.'],
      ['Line', 'Changes over time for one or more variables.'],
      ['Scatter', 'Two independent variables, with an optional regression line.'],
      ['Gantt', 'Bars that show the timing of a project’s tasks.'],
      ['Area', 'Trends over time; the 100% version shows changes in composition.'],
      ['Pie / Doughnut', 'The size of each segment relative to the total.'],
    ],
    plusLabel: 'Enhancements & productivity',
    plus: ['Axis breaks', 'CAGR columns', 'Growth & average lines', 'Regression lines', 'Excel linking', 'Chart gallery (250+ charts)', 'Preference Manager', 'Co-authoring', 'Excel PivotTable linking', 'Smart Color & palettes', 'Harvey balls', 'Agenda slides', 'Boxes & value chains'],
    trusted: 'Trusted by',
    stats: ['of the top 10 consulting firms', 'of Fortune 100 companies', 'of the top 25 private equity firms', 'years of charting for clients'],
    customers: `Customers include ${CUSTOMERS}.`,
    source: 'Source: mekkographics.com. Some tools are available in the Windows version only.',
  },
  de: {
    eyebrow: 'Diagrammtypen',
    title: 'Über 30 Diagrammtypen,',
    accent: 'gemacht für Unternehmen',
    types: [
      ['Marimekko', '100-%-gestapelte Balken mit variabler Breite — Marktgröße und Marktanteil in einer Ansicht.'],
      ['Bar Mekko', 'Gestapelte Balken mit variabler Breite — Segmentgröße im Vergleich zu einer zweiten Kennzahl.'],
      ['Wasserfall', 'Wie positive und negative Veränderungen eine Summe ergeben: Aufbau, Veränderung, gestapelt oder horizontal.'],
      ['Blasen', 'X- und Y-Werte plus eine dritte Variable als Blasengröße, inkl. Wachstum/Anteil-Diagrammen.'],
      ['Balken', 'Gestapelt, 100 % gestapelt, schwebend, gruppiert und Balken/Linien-Kombinationen.'],
      ['Linie', 'Veränderungen über die Zeit für eine oder mehrere Variablen.'],
      ['Streudiagramm', 'Zwei unabhängige Variablen, optional mit Regressionslinie.'],
      ['Gantt', 'Balken, die den zeitlichen Ablauf der Aufgaben eines Projekts zeigen.'],
      ['Fläche', 'Trends über die Zeit; die 100-%-Variante zeigt Veränderungen der Zusammensetzung.'],
      ['Kreis / Ring', 'Die Größe jedes Segments im Verhältnis zur Summe.'],
    ],
    plusLabel: 'Erweiterungen & Produktivität',
    plus: ['Achsenunterbrechungen', 'CAGR-Spalten', 'Wachstums- & Durchschnittslinien', 'Regressionslinien', 'Excel-Verknüpfung', 'Diagrammgalerie (250+ Diagramme)', 'Preference Manager', 'Gemeinsames Bearbeiten', 'Verknüpfung mit Excel-PivotTables', 'Smart Color & Farbpaletten', 'Harvey Balls', 'Agenda-Folien', 'Boxen & Wertschöpfungsketten'],
    trusted: 'Im Einsatz bei',
    stats: ['der Top-10-Beratungsunternehmen', 'der Fortune-100-Unternehmen', 'der Top-25-Private-Equity-Firmen', 'Jahre Diagramme für Kunden'],
    customers: `Zu den Kunden gehören ${CUSTOMERS}.`,
    source: 'Quelle: mekkographics.com. Einige Werkzeuge sind nur in der Windows-Version verfügbar.',
  },
  fr: {
    eyebrow: 'Types de graphiques',
    title: 'Plus de 30 types de graphiques,',
    accent: 'pensés pour l’entreprise',
    types: [
      ['Marimekko', 'Barres empilées à 100 % de largeur variable — taille et parts de marché en une seule vue.'],
      ['Bar Mekko', 'Barres empilées de largeur variable — taille des segments face à une seconde mesure.'],
      ['Cascade', 'Comment les variations positives et négatives forment un total : construction, variation, empilée ou horizontale.'],
      ['Bulles', 'Valeurs X et Y plus une troisième variable en taille de bulle, y compris croissance/part.'],
      ['Barres', 'Empilées, empilées à 100 %, flottantes, groupées et combinaisons barres/courbes.'],
      ['Courbes', 'L’évolution dans le temps d’une ou plusieurs variables.'],
      ['Nuage de points', 'Deux variables indépendantes, avec une droite de régression en option.'],
      ['Gantt', 'Des barres qui montrent le calendrier des tâches d’un projet.'],
      ['Aires', 'Les tendances dans le temps ; la version 100 % montre l’évolution de la composition.'],
      ['Secteurs / Anneau', 'La taille de chaque segment par rapport au total.'],
    ],
    plusLabel: 'Enrichissements et productivité',
    plus: ['Ruptures d’axe', 'Colonnes de TCAC', 'Lignes de croissance et de moyenne', 'Droites de régression', 'Liaison avec Excel', 'Galerie de graphiques (250+)', 'Preference Manager', 'Co-édition', 'Liaison aux tableaux croisés Excel', 'Smart Color et palettes', 'Harvey balls', 'Diapositives d’agenda', 'Encadrés et chaînes de valeur'],
    trusted: 'Ils lui font confiance',
    stats: ['des 10 premiers cabinets de conseil', 'des entreprises du Fortune 100', 'des 25 premiers fonds de private equity', 'ans de graphiques pour nos clients'],
    customers: `Parmi les clients : ${CUSTOMERS}.`,
    source: 'Source : mekkographics.com. Certains outils sont disponibles uniquement dans la version Windows.',
  },
  es: {
    eyebrow: 'Tipos de gráficos',
    title: 'Más de 30 tipos de gráficos,',
    accent: 'pensados para la empresa',
    types: [
      ['Marimekko', 'Barras apiladas al 100 % de ancho variable — tamaño y cuota de mercado en una sola vista.'],
      ['Bar Mekko', 'Barras apiladas de ancho variable — tamaño de cada segmento frente a una segunda medida.'],
      ['Cascada', 'Cómo los cambios positivos y negativos forman un total: acumulada, de variación, apilada u horizontal.'],
      ['Burbujas', 'Valores X e Y más una tercera variable como tamaño de burbuja, incl. crecimiento/cuota.'],
      ['Barras', 'Apiladas, apiladas al 100 %, flotantes, agrupadas y combinaciones de barras y líneas.'],
      ['Líneas', 'Cambios a lo largo del tiempo de una o varias variables.'],
      ['Dispersión', 'Dos variables independientes, con línea de regresión opcional.'],
      ['Gantt', 'Barras que muestran el calendario de las tareas de un proyecto.'],
      ['Áreas', 'Tendencias a lo largo del tiempo; la versión al 100 % muestra los cambios de composición.'],
      ['Circular / Anillo', 'El tamaño de cada segmento en relación con el total.'],
    ],
    plusLabel: 'Mejoras y productividad',
    plus: ['Cortes de eje', 'Columnas de TCAC', 'Líneas de crecimiento y media', 'Líneas de regresión', 'Vinculación con Excel', 'Galería de gráficos (250+)', 'Preference Manager', 'Coautoría', 'Vinculación con tablas dinámicas de Excel', 'Smart Color y paletas', 'Harvey balls', 'Diapositivas de agenda', 'Cuadros y cadenas de valor'],
    trusted: 'Confían en él',
    stats: ['de las 10 principales consultoras', 'de las empresas del Fortune 100', 'de las 25 principales firmas de capital privado', 'años creando gráficos para sus clientes'],
    customers: `Entre sus clientes: ${CUSTOMERS}.`,
    source: 'Fuente: mekkographics.com. Algunas herramientas solo están disponibles en la versión para Windows.',
  },
  nl: {
    eyebrow: 'Grafiektypen',
    title: 'Meer dan 30 grafiektypen,',
    accent: 'gemaakt voor het bedrijfsleven',
    types: [
      ['Marimekko', '100%-gestapelde staven met variabele breedte — marktomvang en marktaandeel in één weergave.'],
      ['Bar Mekko', 'Gestapelde staven met variabele breedte — segmentgrootte tegenover een tweede maatstaf.'],
      ['Waterval', 'Hoe positieve en negatieve veranderingen optellen tot een totaal: opbouw, verandering, gestapeld of horizontaal.'],
      ['Bellen', 'X- en Y-waarden plus een derde variabele als belgrootte, incl. groei/aandeel-grafieken.'],
      ['Staaf', 'Gestapeld, 100% gestapeld, zwevend, geclusterd en staaf/lijn-combinaties.'],
      ['Lijn', 'Veranderingen in de tijd voor één of meer variabelen.'],
      ['Spreiding', 'Twee onafhankelijke variabelen, met een optionele regressielijn.'],
      ['Gantt', 'Staven die de planning van de taken in een project tonen.'],
      ['Vlak', 'Trends in de tijd; de 100%-versie toont veranderingen in samenstelling.'],
      ['Cirkel / Ring', 'De grootte van elk segment ten opzichte van het totaal.'],
    ],
    plusLabel: 'Uitbreidingen en productiviteit',
    plus: ['Asonderbrekingen', 'CAGR-kolommen', 'Groei- en gemiddeldelijnen', 'Regressielijnen', 'Koppeling met Excel', 'Grafiekgalerij (250+ grafieken)', 'Preference Manager', 'Co-authoring', 'Koppeling met Excel-draaitabellen', 'Smart Color & paletten', 'Harvey balls', 'Agendadia’s', 'Kaders & waardeketens'],
    trusted: 'Vertrouwd door',
    stats: ['van de top 10 adviesbureaus', 'van de Fortune 100-bedrijven', 'van de top 25 private-equityfirma’s', 'jaar grafieken voor klanten'],
    customers: `Klanten zijn onder meer ${CUSTOMERS}.`,
    source: 'Bron: mekkographics.com. Sommige tools zijn alleen beschikbaar in de Windows-versie.',
  },
}

export default function MekkoMore() {
  const t = useT(T)
  return (
    <section className="section xtra" id="chart-types">
      <div className="container">
        <span className="eyebrow" data-reveal>{t.eyebrow}</span>
        <h2 className="section-title xtra__title" data-reveal style={{ '--d': '0.06s' }}>
          {t.title} <span className="accent grad-text">{t.accent}</span>
        </h2>

        <div className="ctypes">
          {t.types.map(([name, text], i) => (
            <div key={name} className="ctype spot" data-reveal style={{ '--d': `${(i % 5) * 0.05}s`, '--c': DOTS[i % DOTS.length] }}>
              <strong>{name}</strong>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <p className="xtra__label" data-reveal>{t.plusLabel}</p>
        <ul className="xchips" data-reveal>
          {t.plus.map((p) => <li key={p}>{p}</li>)}
        </ul>

        <p className="xtra__label" data-reveal>{t.trusted}</p>
        <dl className="xstats" data-reveal>
          {STATS.map((n, i) => (
            <div key={i}>
              <dt className="grad-text">{n}</dt>
              <dd>{t.stats[i]}</dd>
            </div>
          ))}
        </dl>
        <p className="xtra__customers" data-reveal>{t.customers}</p>
        <p className="xtra__source">{t.source}</p>
      </div>
    </section>
  )
}
