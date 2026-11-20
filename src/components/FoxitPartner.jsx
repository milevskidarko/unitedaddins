import { Arrow } from './Icons.jsx'
import { L, useT } from '../i18n.jsx'
import './Extras.css'

// Excerpts from Foxit's own articles that name United Addins (checked Nov 2026). Quotes are verbatim in English;
// the other languages show translations (the note says so); "…" marks left-out words. The partner tier named in the articles
// ("platinum distributor" 2017, "Gold Foxit Partner" 2019) is left out on purpose, like elsewhere on the site.
const STORIES = [
  {
    key: 'mps',
    href: 'https://cdn01.foxitsoftware.com/pub/foxit/casestudy/en_us/MotorPresseStuttgart.pdf',
    company: 'Motor Presse Stuttgart',
    stats: ['~650', '900', '2017'],
    quotes: [
      ['Thanks to United ADDins … Motor Presse Stuttgart came into contact with Foxit Software.', null],
      ['We were very pleased to be able to help Motor Presse Stuttgart to replace Adobe Acrobat and therefore reduce their license costs.', 'Borivoje Bogatinov, United Addins'],
      ['Our users are satisfied. They’re very happy to be able to edit documents now.', 'Achim Schäfer, Head of IT Systems, Motor Presse Stuttgart'],
    ],
  },
  {
    key: 'miele',
    href: 'https://www.foxit.com/blog/if-you-need-pdf-software-find-out-why-miele-made-the-move-to-phantompdf/',
    company: 'Miele',
    stats: ['1,200', null, '2019'],
    quotes: [
      ['United ADDIns worked closely with Miele to determine the company’s PDF software requirements, identify the best solution for them, and manage the integration of Foxit’s PDF software with Miele’s IT infrastructure.', null],
      ['For the few questions that have come up, the United ADDIns team was responsive, answering every question immediately …', 'Helmut Meissner, IT Architect, Miele'],
      ['That’s the way a software rollout should be done.', 'Helmut Meissner, IT Architect, Miele'],
    ],
  },
]

const T = {
  en: {
    thou: ',',
    eyebrow: 'United Addins & Foxit',
    title: 'Your Foxit partner',
    accent: 'since 2012',
    lead: 'United Addins has been an authorized Foxit distributor since 2012. Here is what Foxit itself has published about projects we brought to Foxit and helped roll out.',
    stories: {
      mps: {
        source: 'Foxit case study',
        headline: 'Motor Presse Stuttgart moves from Adobe Acrobat to Foxit',
        stats: ['users', 'PCs across two companies', 'rollout completed'],
        summary: 'The publisher of “auto, motor und sport” met Foxit through United Addins. The rollout went smoothly — no training sessions were required.',
      },
      miele: {
        source: 'Foxit blog',
        headline: 'Why Miele made the move to Foxit',
        stats: ['users at Miele', null, 'published'],
        summary: 'United Addins defined Miele’s PDF requirements, chose the solution and integrated Foxit with Miele’s IT infrastructure.',
      },
    },
    read: 'Read the full article on foxit.com',
    quotesNote: 'Quotes in the original English. Product then called Foxit PhantomPDF, today Foxit PDF Editor.',
    cta: 'Planning your own Foxit rollout? Talk to us',
    newTab: '(opens in a new tab)',
  },
  de: {
    thou: '.',
    quotes: {
      'mps': [
        [
          'Dank United Addins … kam Motor Presse Stuttgart mit Foxit Software in Kontakt.',
          null
        ],
        [
          'Wir haben uns sehr gefreut, Motor Presse Stuttgart dabei helfen zu können, Adobe Acrobat abzulösen und damit die Lizenzkosten zu senken.',
          'Borivoje Bogatinov, United Addins'
        ],
        [
          'Unsere Anwender sind zufrieden. Sie freuen sich sehr, Dokumente jetzt bearbeiten zu können.',
          'Achim Schäfer, Leiter IT-Systeme, Motor Presse Stuttgart'
        ]
      ],
      'miele': [
        [
          'United Addins arbeitete eng mit Miele zusammen, um die Anforderungen des Unternehmens an PDF-Software zu ermitteln, die beste Lösung zu finden und die Integration der PDF-Software von Foxit in die IT-Infrastruktur von Miele zu steuern.',
          null
        ],
        [
          'Bei den wenigen Fragen, die aufkamen, reagierte das Team von United Addins schnell und beantwortete jede Frage sofort …',
          'Helmut Meissner, IT-Architekt, Miele'
        ],
        [
          'So sollte die Einführung einer Software ablaufen.',
          'Helmut Meissner, IT-Architekt, Miele'
        ]
      ]
    },
    eyebrow: 'United Addins & Foxit',
    title: 'Ihr Foxit-Partner',
    accent: 'seit 2012',
    lead: 'United Addins ist seit 2012 autorisierter Foxit-Distributor. Das hat Foxit selbst über Projekte veröffentlicht, die wir zu Foxit gebracht und bei der Einführung begleitet haben.',
    stories: {
      mps: {
        source: 'Foxit-Fallstudie',
        headline: 'Motor Presse Stuttgart wechselt von Adobe Acrobat zu Foxit',
        stats: ['Nutzer', 'PCs in zwei Unternehmen', 'Einführung abgeschlossen'],
        summary: 'Der Verlag von „auto, motor und sport“ kam über United Addins zu Foxit. Die Einführung verlief reibungslos — Schulungen waren nicht nötig.',
      },
      miele: {
        source: 'Foxit-Blog',
        headline: 'Warum Miele zu Foxit gewechselt ist',
        stats: ['Nutzer bei Miele', null, 'veröffentlicht'],
        summary: 'United Addins hat Mieles PDF-Anforderungen ermittelt, die Lösung ausgewählt und Foxit in Mieles IT-Infrastruktur integriert.',
      },
    },
    read: 'Ganzen Artikel auf foxit.com lesen',
    quotesNote: 'Zitate aus dem englischen Original übersetzt. Das Produkt hieß damals Foxit PhantomPDF, heute Foxit PDF Editor.',
    cta: 'Sie planen Ihre eigene Foxit-Einführung? Sprechen Sie uns an',
    newTab: '(öffnet in neuem Tab)',
  },
  fr: {
    thou: ' ',
    quotes: {
      'mps': [
        [
          'Grâce à United Addins … Motor Presse Stuttgart est entré en contact avec Foxit Software.',
          null
        ],
        [
          'Nous avons été très heureux d’aider Motor Presse Stuttgart à remplacer Adobe Acrobat et ainsi à réduire ses coûts de licence.',
          'Borivoje Bogatinov, United Addins'
        ],
        [
          'Nos utilisateurs sont satisfaits. Ils sont ravis de pouvoir désormais modifier des documents.',
          'Achim Schäfer, responsable des systèmes informatiques, Motor Presse Stuttgart'
        ]
      ],
      'miele': [
        [
          'United Addins a travaillé en étroite collaboration avec Miele pour définir ses besoins en logiciel PDF, identifier la meilleure solution et piloter l’intégration du logiciel PDF de Foxit dans l’infrastructure informatique de Miele.',
          null
        ],
        [
          'Pour les quelques questions qui se sont posées, l’équipe United Addins a été réactive et a répondu immédiatement à chacune …',
          'Helmut Meissner, architecte informatique, Miele'
        ],
        [
          'C’est ainsi que devrait se dérouler un déploiement logiciel.',
          'Helmut Meissner, architecte informatique, Miele'
        ]
      ]
    },
    eyebrow: 'United Addins & Foxit',
    title: 'Votre partenaire Foxit',
    accent: 'depuis 2012',
    lead: 'United Addins est distributeur agréé Foxit depuis 2012. Voici ce que Foxit a publié sur des projets que nous lui avons apportés et accompagnés.',
    stories: {
      mps: {
        source: 'Étude de cas Foxit',
        headline: 'Motor Presse Stuttgart passe d’Adobe Acrobat à Foxit',
        stats: ['utilisateurs', 'PC dans deux sociétés', 'déploiement terminé'],
        summary: 'L’éditeur d’« auto, motor und sport » a découvert Foxit grâce à United Addins. Le déploiement s’est fait sans accroc — aucune formation n’a été nécessaire.',
      },
      miele: {
        source: 'Blog Foxit',
        headline: 'Pourquoi Miele est passé à Foxit',
        stats: ['utilisateurs chez Miele', null, 'publication'],
        summary: 'United Addins a défini les besoins PDF de Miele, choisi la solution et intégré Foxit à son infrastructure informatique.',
      },
    },
    read: 'Lire l’article complet sur foxit.com',
    quotesNote: 'Citations traduites de l’original anglais. Le produit s’appelait alors Foxit PhantomPDF, aujourd’hui Foxit PDF Editor.',
    cta: 'Vous préparez votre propre déploiement Foxit ? Parlons-en',
    newTab: '(s’ouvre dans un nouvel onglet)',
  },
  es: {
    thou: '.',
    quotes: {
      'mps': [
        [
          'Gracias a United Addins … Motor Presse Stuttgart entró en contacto con Foxit Software.',
          null
        ],
        [
          'Nos alegró mucho poder ayudar a Motor Presse Stuttgart a sustituir Adobe Acrobat y, con ello, reducir sus costes de licencias.',
          'Borivoje Bogatinov, United Addins'
        ],
        [
          'Nuestros usuarios están satisfechos. Están encantados de poder editar documentos ahora.',
          'Achim Schäfer, responsable de sistemas informáticos, Motor Presse Stuttgart'
        ]
      ],
      'miele': [
        [
          'United Addins colaboró estrechamente con Miele para determinar sus requisitos de software PDF, identificar la mejor solución y gestionar la integración del software PDF de Foxit en la infraestructura informática de Miele.',
          null
        ],
        [
          'Ante las pocas preguntas que surgieron, el equipo de United Addins respondió con rapidez y contestó cada pregunta de inmediato …',
          'Helmut Meissner, arquitecto de TI, Miele'
        ],
        [
          'Así es como debe hacerse una implantación de software.',
          'Helmut Meissner, arquitecto de TI, Miele'
        ]
      ]
    },
    eyebrow: 'United Addins & Foxit',
    title: 'Su socio de Foxit',
    accent: 'desde 2012',
    lead: 'United Addins es distribuidor autorizado de Foxit desde 2012. Esto es lo que la propia Foxit ha publicado sobre proyectos que le llevamos y ayudamos a implantar.',
    stories: {
      mps: {
        source: 'Caso de éxito de Foxit',
        headline: 'Motor Presse Stuttgart pasa de Adobe Acrobat a Foxit',
        stats: ['usuarios', 'PC en dos empresas', 'implantación completada'],
        summary: 'La editorial de «auto, motor und sport» conoció Foxit a través de United Addins. La implantación fue fluida — no hizo falta formación.',
      },
      miele: {
        source: 'Blog de Foxit',
        headline: 'Por qué Miele se pasó a Foxit',
        stats: ['usuarios en Miele', null, 'publicado'],
        summary: 'United Addins definió los requisitos PDF de Miele, eligió la solución e integró Foxit en su infraestructura informática.',
      },
    },
    read: 'Leer el artículo completo en foxit.com',
    quotesNote: 'Citas traducidas del original en inglés. El producto se llamaba entonces Foxit PhantomPDF; hoy, Foxit PDF Editor.',
    cta: '¿Planifica su propia implantación de Foxit? Hable con nosotros',
    newTab: '(se abre en una pestaña nueva)',
  },
  nl: {
    thou: '.',
    quotes: {
      'mps': [
        [
          'Dankzij United Addins … kwam Motor Presse Stuttgart in contact met Foxit Software.',
          null
        ],
        [
          'We waren erg blij dat we Motor Presse Stuttgart konden helpen Adobe Acrobat te vervangen en zo de licentiekosten te verlagen.',
          'Borivoje Bogatinov, United Addins'
        ],
        [
          'Onze gebruikers zijn tevreden. Ze zijn erg blij dat ze nu documenten kunnen bewerken.',
          'Achim Schäfer, hoofd IT-systemen, Motor Presse Stuttgart'
        ]
      ],
      'miele': [
        [
          'United Addins werkte nauw samen met Miele om de eisen voor PDF-software te bepalen, de beste oplossing te vinden en de integratie van de PDF-software van Foxit in de IT-infrastructuur van Miele te begeleiden.',
          null
        ],
        [
          'Bij de paar vragen die opkwamen, reageerde het team van United Addins snel en beantwoordde elke vraag meteen …',
          'Helmut Meissner, IT-architect, Miele'
        ],
        [
          'Zo hoort een software-uitrol te gaan.',
          'Helmut Meissner, IT-architect, Miele'
        ]
      ]
    },
    eyebrow: 'United Addins & Foxit',
    title: 'Uw Foxit-partner',
    accent: 'sinds 2012',
    lead: 'United Addins is sinds 2012 geautoriseerd Foxit-distributeur. Dit heeft Foxit zelf gepubliceerd over projecten die wij bij Foxit brachten en hielpen uitrollen.',
    stories: {
      mps: {
        source: 'Foxit-casestudy',
        headline: 'Motor Presse Stuttgart stapt over van Adobe Acrobat naar Foxit',
        stats: ['gebruikers', 'pc’s in twee bedrijven', 'uitrol afgerond'],
        summary: 'De uitgever van „auto, motor und sport” leerde Foxit kennen via United Addins. De uitrol verliep soepel — trainingen waren niet nodig.',
      },
      miele: {
        source: 'Foxit-blog',
        headline: 'Waarom Miele overstapte op Foxit',
        stats: ['gebruikers bij Miele', null, 'gepubliceerd'],
        summary: 'United Addins bepaalde de PDF-eisen van Miele, koos de oplossing en integreerde Foxit in de IT-infrastructuur van Miele.',
      },
    },
    read: 'Lees het volledige artikel op foxit.com',
    quotesNote: 'Citaten vertaald uit het Engelse origineel. Het product heette toen Foxit PhantomPDF, nu Foxit PDF Editor.',
    cta: 'Plant u uw eigen Foxit-uitrol? Neem contact op',
    newTab: '(opent in een nieuw tabblad)',
  },
}

export default function FoxitPartner() {
  const t = useT(T)
  return (
    <section className="section xtra" id="united-addins">
      <div className="container">
        <span className="eyebrow" data-reveal>{t.eyebrow}</span>
        <h2 className="section-title xtra__title" data-reveal style={{ '--d': '0.06s' }}>
          {t.title} <span className="accent grad-text">{t.accent}</span>
        </h2>
        <p className="section-lead" data-reveal style={{ '--d': '0.1s' }}>{t.lead}</p>

        <div className="stories">
          {STORIES.map((s, i) => {
            const st = t.stories[s.key]
            return (
              <article key={s.key} className="story spot" data-reveal style={{ '--d': `${0.12 + i * 0.06}s` }}>
                <p className="story__source">{st.source} · {s.company}</p>
                <h3 className="story__headline">{st.headline}</h3>
                <dl className="story__stats">
                  {s.stats.map((n, j) => n && (
                    <div key={j}>
                      <dt>{n.replace(',', t.thou)}</dt>
                      <dd>{st.stats[j]}</dd>
                    </div>
                  ))}
                </dl>
                <p className="story__summary">{st.summary}</p>
                {(t.quotes?.[s.key] || s.quotes).map(([q, who]) => (
                  <figure key={q} className={`story__quote ${who ? '' : 'story__quote--text'}`}>
                    <blockquote lang={t.quotes ? undefined : 'en'}>“{q}”</blockquote>
                    {who && <figcaption>— {who}</figcaption>}
                  </figure>
                ))}
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="story__link">
                  {t.read} <Arrow /><span className="sr-only">{t.newTab}</span>
                </a>
              </article>
            )
          })}
        </div>

        <div className="xtra__foot">
          <L to="/contact#quote" className="btn btn-primary btn-sm">{t.cta} <Arrow /></L>
          <p className="xtra__source">{t.quotesNote}</p>
        </div>
      </div>
    </section>
  )
}
