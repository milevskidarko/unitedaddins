import { useState } from 'react'
import { useT } from '../i18n.jsx'
import './Extras.css'

// Extra Mekko Graphics info, from mekkographics.com (Nov 2026):
// chart types and enhancements from /product/features/ (Gantt = #tab-id-8), customer numbers from /customers/.
// Chart images from mekkographics.com/product/features/, saved in public/mekko/ (same order as `types`).
const IMAGES = ['marimekko.png', 'bar-mekko.png', 'waterfall.png', 'bubble.png', 'bar.png', 'line.png', 'scatter.png', 'gantt.png', 'area.png', 'pie-doughnut.jpg']
const DOTS = ['#ff6b6b', '#ffc145', '#36cf7a', '#4f7cff', '#a78bfa']
const STATS = ['7', '50%', '75%', '20']

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
    trusted: 'Customer facts',
    stats: ['Top 10 consulting firms that use Mekko Graphics', 'Share of Fortune 100 companies that use Mekko Graphics', 'Share of the top 25 private equity firms that use Mekko Graphics', 'Years clients have trusted Mekko Graphics for their charts'],
    source: 'Source: mekkographics.com.',
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
    trusted: 'Kunden in Zahlen',
    stats: ['der Top-10-Beratungsunternehmen nutzen Mekko Graphics', 'Anteil der Fortune-100-Unternehmen, die Mekko Graphics nutzen', 'Anteil der Top-25-Private-Equity-Firmen, die Mekko Graphics nutzen', 'Jahre, in denen Kunden Mekko Graphics für ihre Diagramme vertrauen'],
    source: 'Quelle: mekkographics.com.',
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
    trusted: 'Les clients en chiffres',
    stats: ['des 10 premiers cabinets de conseil utilisent Mekko Graphics', 'des entreprises du Fortune 100 utilisent Mekko Graphics', 'des 25 premiers fonds de private equity utilisent Mekko Graphics', 'ans que les clients font confiance à Mekko Graphics pour leurs graphiques'],
    source: 'Source : mekkographics.com.',
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
    trusted: 'Datos de clientes',
    stats: ['de las 10 principales consultoras usan Mekko Graphics', 'de las empresas del Fortune 100 usan Mekko Graphics', 'de las 25 principales firmas de capital privado usan Mekko Graphics', 'años en que los clientes confían en Mekko Graphics para sus gráficos'],
    source: 'Fuente: mekkographics.com.',
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
    trusted: 'Klanten in cijfers',
    stats: ['van de top 10 adviesbureaus gebruiken Mekko Graphics', 'van de Fortune 100-bedrijven gebruikt Mekko Graphics', 'van de top 25 private-equityfirma’s gebruikt Mekko Graphics', 'jaar dat klanten Mekko Graphics vertrouwen voor hun grafieken'],
    source: 'Bron: mekkographics.com.',
  },
  it: {
    eyebrow: 'Tipi di grafico',
    title: 'Oltre 30 tipi di grafico,',
    accent: 'pensati per il business',
    types: [
      ['Marimekko', 'Barre in pila al 100% a larghezza variabile — dimensione e quota di mercato in un’unica vista.'],
      ['Bar Mekko', 'Barre in pila a larghezza variabile — dimensione del segmento rispetto a una seconda misura.'],
      ['Cascata', 'Come variazioni positive e negative si sommano in un totale: costruzione, variazione, in pila o orizzontale.'],
      ['Bolle', 'Valori X e Y più una terza variabile come dimensione della bolla, inclusi i grafici crescita/quota.'],
      ['Barre', 'In pila, in pila al 100%, fluttuanti, raggruppate e combinazioni barre/linee.'],
      ['Linee', 'Variazioni nel tempo di una o più variabili.'],
      ['Dispersione', 'Due variabili indipendenti, con linea di regressione opzionale.'],
      ['Gantt', 'Barre che mostrano la tempistica delle attività di un progetto.'],
      ['Aree', 'Tendenze nel tempo; la versione al 100% mostra i cambiamenti di composizione.'],
      ['Torta / Ciambella', 'La dimensione di ogni segmento rispetto al totale.'],
    ],
    trusted: 'I clienti in cifre',
    stats: ['Società di consulenza della top 10 che usano Mekko Graphics', 'Quota delle aziende Fortune 100 che usano Mekko Graphics', 'Quota delle prime 25 società di private equity che usano Mekko Graphics', 'Anni in cui i clienti si affidano a Mekko Graphics per i loro grafici'],
    source: 'Fonte: mekkographics.com.',
  },
  pl: {
    eyebrow: 'Typy wykresów',
    title: 'Ponad 30 typów wykresów',
    accent: 'stworzonych dla biznesu',
    types: [
      ['Marimekko', 'Skumulowane słupki 100% o zmiennej szerokości — wielkość rynku i udziały w jednym widoku.'],
      ['Bar Mekko', 'Skumulowane słupki o zmiennej szerokości — wielkość segmentu względem drugiej miary.'],
      ['Kaskadowy', 'Jak zmiany dodatnie i ujemne składają się na sumę: narastająco, zmiany, skumulowany lub poziomy.'],
      ['Bąbelkowy', 'Wartości X i Y oraz trzecia zmienna jako wielkość bąbelka, w tym wykresy wzrost/udział.'],
      ['Słupkowy', 'Skumulowane, skumulowane 100%, pływające, grupowane i połączenia słupków z liniami.'],
      ['Liniowy', 'Zmiany w czasie jednej lub kilku zmiennych.'],
      ['Punktowy', 'Dwie zmienne niezależne, z opcjonalną linią regresji.'],
      ['Gantt', 'Słupki pokazujące harmonogram zadań projektu.'],
      ['Warstwowy', 'Trendy w czasie; wersja 100% pokazuje zmiany struktury.'],
      ['Kołowy / pierścieniowy', 'Wielkość każdego segmentu względem całości.'],
    ],
    trusted: 'Fakty o klientach',
    stats: ['Firmy doradcze z pierwszej dziesiątki, które używają Mekko Graphics', 'Odsetek firm z listy Fortune 100 używających Mekko Graphics', 'Odsetek 25 największych funduszy private equity używających Mekko Graphics', 'Tyle lat klienci powierzają Mekko Graphics swoje wykresy'],
    source: 'Źródło: mekkographics.com.',
  },
}

export default function MekkoMore() {
  const t = useT(T)
  const [active, setActive] = useState(0)
  const [name, text] = t.types[active]
  return (
    <section className="section xtra" id="chart-types">
      <div className="container">
        <span className="eyebrow" data-reveal>{t.eyebrow}</span>
        <h2 className="section-title xtra__title" data-reveal style={{ '--d': '0.06s' }}>
          {t.title} <span className="accent grad-text">{t.accent}</span>
        </h2>

        <div className="chartv" data-reveal style={{ '--d': '0.1s' }}>
          <div className="chartv__menu" role="tablist">
            {t.types.map(([n], i) => (
              <button
                key={n}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`chartv__tab ${i === active ? 'is-active' : ''}`}
                style={{ '--c': DOTS[i % DOTS.length] }}
                onClick={() => setActive(i)}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="chartv__stage" role="tabpanel">
            <h3 className="chartv__name">{name}</h3>
            <p className="chartv__text">{text}</p>
            <div className="chartv__img">
              <img key={IMAGES[active]} src={`/mekko/${IMAGES[active]}`} alt={`${name} — Mekko Graphics`} loading="lazy" />
            </div>
          </div>
        </div>

        <p className="xtra__label" data-reveal>{t.trusted}</p>
        <dl className="xstats" data-reveal>
          {STATS.map((n, i) => (
            <div key={i}>
              <dt className="grad-text">{n}</dt>
              <dd>{t.stats[i]}</dd>
            </div>
          ))}
        </dl>
        <p className="xtra__source">{t.source}</p>
      </div>
    </section>
  )
}
