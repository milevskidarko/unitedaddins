import { Arrow, Shield, Pen, Sign, Bolt, Check, Key } from './Icons.jsx'
import CountUp from './CountUp.jsx'
import ProductPreview from './ProductPreview.jsx'
import { L, useT } from '../i18n.jsx'
import './Foxit.css'

// Product facts verified against foxit.com (Nov 2026). Names are the same in every language
// (they are also the keys of the quote).
const products = [
  { name: 'Foxit PDF Editor', tone: 'orange', preview: 'editor', platforms: ['Windows', 'macOS', 'Web'], perpetual: true, noteIcon: Key },
  { name: 'Foxit PDF Editor+', tone: 'violet', preview: 'editorPlus', platforms: ['Windows', 'macOS', 'Web', 'iOS', 'Android'], noteIcon: Sign, featured: true },
  { name: 'Foxit eSign', tone: 'blue', preview: 'esign', platforms: ['Web', 'Mobile'], noteIcon: Sign },
]
const FEATURE_ICONS = [Pen, Shield, Bolt, Sign]

const T = {
  en: {
    eyebrow: 'Featured partner',
    title: 'Power your business with',
    lead: 'The leading alternative to Adobe Acrobat for creating, editing, converting, signing and securely managing PDFs across desktop, mobile and web — licensed and supported by United Addins.',
    features: ['Create, edit & convert', 'Smart Redact (Editor+)', 'AI Assistant', 'eSign workflows'],
    finder: 'Not sure which plan? Take the 4-question quiz',
    badge: 'Most complete',
    mobile: 'Mobile app',
    products: [
      {
        text: 'Professional PDF editing for Windows, macOS and Web. Create, edit, convert, organize, fill and sign PDFs — with built-in AI Assistant.',
        // PDF Editor is the only Foxit plan also sold as a one-time license. Exclusions as worded by Foxit.
        note: 'Perpetual license available: one-time purchase for Windows & macOS, without AI Assistant, DMS or cloud features.',
      },
      {
        text: 'The complete package: everything in PDF Editor, plus AI-powered Smart Redact and mobile apps for iOS & Android.',
        note: 'Includes Foxit eSign with 150 envelopes per year.',
      },
      {
        text: 'Standalone electronic signatures for individuals and teams — reusable templates, signing workflows, audit trails and signature certificates. ESIGN, UETA and eIDAS aligned.',
        note: 'Essentials: 250 envelopes/year, 10 templates · Business: unlimited envelopes & templates (5+ users).',
      },
    ],
    add: 'Add to quote',
    addPerpetual: 'Add perpetual',
    statsTitle: 'Proven business value',
    statsSub: 'Forrester Total Economic Impact™ study of Foxit PDF Editor',
    roi: 'ROI',
    payback: 'Payback period',
    founded: 'Foxit founded',
    mo: 'mo',
    disclaimer: 'Study commissioned by Foxit (2022). Results are based on a modeled composite organization and are not a guarantee of individual results.',
    study: 'Read the study',
  },
  de: {
    eyebrow: 'Top-Partner',
    title: 'Bringen Sie Ihr Unternehmen voran mit',
    lead: 'Die führende Alternative zu Adobe Acrobat zum Erstellen, Bearbeiten, Konvertieren, Signieren und sicheren Verwalten von PDFs auf Desktop, Mobilgerät und im Web — lizenziert und betreut von United Addins.',
    features: ['Erstellen, bearbeiten & konvertieren', 'Smart Redact (Editor+)', 'KI-Assistent', 'eSign-Workflows'],
    finder: 'Unsicher, welcher Plan passt? Machen Sie das 4-Fragen-Quiz',
    badge: 'Am umfassendsten',
    mobile: 'Mobile App',
    products: [
      {
        text: 'Professionelle PDF-Bearbeitung für Windows, macOS und Web. PDFs erstellen, bearbeiten, konvertieren, organisieren, ausfüllen und signieren — mit integriertem KI-Assistenten.',
        note: 'Dauerlizenz verfügbar: Einmalkauf für Windows & macOS, ohne KI-Assistenten, DMS- und Cloud-Funktionen.',
      },
      {
        text: 'Das Komplettpaket: alles aus PDF Editor, dazu KI-gestütztes Smart Redact und mobile Apps für iOS & Android.',
        note: 'Inklusive Foxit eSign mit 150 Umschlägen pro Jahr.',
      },
      {
        text: 'Eigenständige elektronische Signaturen für Einzelpersonen und Teams — wiederverwendbare Vorlagen, Signatur-Workflows, Prüfprotokolle und Signaturzertifikate. Konform mit ESIGN, UETA und eIDAS.',
        note: 'Essentials: 250 Umschläge/Jahr, 10 Vorlagen · Business: unbegrenzte Umschläge & Vorlagen (ab 5 Nutzern).',
      },
    ],
    add: 'Zum Angebot hinzufügen',
    addPerpetual: 'Dauerlizenz hinzufügen',
    statsTitle: 'Nachgewiesener Geschäftswert',
    statsSub: 'Forrester Total Economic Impact™-Studie zu Foxit PDF Editor',
    roi: 'ROI',
    payback: 'Amortisation', // short: "Amortisationszeit" does not fit the column on phones
    founded: 'Gründung von Foxit',
    mo: 'Mon.',
    disclaimer: 'Von Foxit beauftragte Studie (2022). Die Ergebnisse beruhen auf einer modellierten Referenzorganisation und sind keine Garantie für individuelle Ergebnisse.',
    study: 'Zur Studie',
  },
  fr: {
    eyebrow: 'Partenaire principal',
    title: 'Boostez votre activité avec',
    lead: 'L’alternative de référence à Adobe Acrobat pour créer, modifier, convertir, signer et gérer vos PDF en toute sécurité sur ordinateur, mobile et web — licences et support assurés par United Addins.',
    features: ['Créer, modifier et convertir', 'Smart Redact (Editor+)', 'Assistant IA', 'Flux de signature eSign'],
    finder: 'Vous hésitez ? Répondez à 4 questions',
    badge: 'Le plus complet',
    mobile: 'Application mobile',
    products: [
      {
        text: 'Édition PDF professionnelle pour Windows, macOS et Web. Créez, modifiez, convertissez, organisez, remplissez et signez vos PDF — avec Assistant IA intégré.',
        note: 'Licence perpétuelle disponible : achat unique pour Windows et macOS, sans Assistant IA, DMS ni fonctions cloud.',
      },
      {
        text: 'L’offre complète : tout PDF Editor, plus Smart Redact basé sur l’IA et les applications mobiles pour iOS et Android.',
        note: 'Inclut Foxit eSign avec 150 enveloppes par an.',
      },
      {
        text: 'Signature électronique autonome pour particuliers et équipes — modèles réutilisables, circuits de signature, pistes d’audit et certificats de signature. Conforme ESIGN, UETA et eIDAS.',
        note: 'Essentials : 250 enveloppes/an, 10 modèles · Business : enveloppes et modèles illimités (5 utilisateurs et plus).',
      },
    ],
    add: 'Ajouter au devis',
    addPerpetual: 'Ajouter en perpétuel',
    statsTitle: 'Une valeur prouvée',
    statsSub: 'Étude Forrester Total Economic Impact™ de Foxit PDF Editor',
    roi: 'ROI',
    payback: 'Délai d’amortis­sement',
    founded: 'Création de Foxit',
    mo: 'mois',
    disclaimer: 'Étude commandée par Foxit (2022). Les résultats reposent sur une organisation composite modélisée et ne garantissent pas des résultats individuels.',
    study: 'Lire l’étude',
  },
  es: {
    eyebrow: 'Socio destacado',
    title: 'Impulse su negocio con',
    lead: 'La alternativa líder a Adobe Acrobat para crear, editar, convertir, firmar y gestionar PDF de forma segura en ordenador, móvil y web — con licencias y soporte de United Addins.',
    features: ['Crear, editar y convertir', 'Smart Redact (Editor+)', 'Asistente de IA', 'Flujos de firma eSign'],
    finder: '¿No sabe qué plan elegir? Responda 4 preguntas',
    badge: 'El más completo',
    mobile: 'App móvil',
    products: [
      {
        text: 'Edición profesional de PDF para Windows, macOS y Web. Cree, edite, convierta, organice, rellene y firme PDF — con Asistente de IA integrado.',
        note: 'Licencia perpetua disponible: compra única para Windows y macOS, sin Asistente de IA, DMS ni funciones en la nube.',
      },
      {
        text: 'El paquete completo: todo lo de PDF Editor, más Smart Redact con IA y apps móviles para iOS y Android.',
        note: 'Incluye Foxit eSign con 150 sobres al año.',
      },
      {
        text: 'Firma electrónica independiente para particulares y equipos — plantillas reutilizables, flujos de firma, registros de auditoría y certificados de firma. Conforme a ESIGN, UETA y eIDAS.',
        note: 'Essentials: 250 sobres/año, 10 plantillas · Business: sobres y plantillas ilimitados (a partir de 5 usuarios).',
      },
    ],
    add: 'Añadir al presupuesto',
    addPerpetual: 'Añadir como perpetua',
    statsTitle: 'Valor empresarial demostrado',
    statsSub: 'Estudio Forrester Total Economic Impact™ de Foxit PDF Editor',
    roi: 'ROI',
    payback: 'Amortización',
    founded: 'Fundación de Foxit',
    mo: 'meses',
    disclaimer: 'Estudio encargado por Foxit (2022). Los resultados se basan en una organización compuesta modelada y no garantizan resultados individuales.',
    study: 'Leer el estudio',
  },
  nl: {
    eyebrow: 'Uitgelichte partner',
    title: 'Versterk uw bedrijf met',
    lead: 'Hét alternatief voor Adobe Acrobat om PDF’s te maken, bewerken, converteren, ondertekenen en veilig te beheren op desktop, mobiel en web — met licenties en support van United Addins.',
    features: ['Maken, bewerken en converteren', 'Smart Redact (Editor+)', 'AI-assistent', 'eSign-workflows'],
    finder: 'Twijfelt u over het abonnement? Beantwoord 4 vragen',
    badge: 'Meest compleet',
    mobile: 'Mobiele app',
    products: [
      {
        text: 'Professionele PDF-bewerking voor Windows, macOS en Web. PDF’s maken, bewerken, converteren, ordenen, invullen en ondertekenen — met ingebouwde AI-assistent.',
        note: 'Eeuwigdurende licentie beschikbaar: eenmalige aankoop voor Windows en macOS, zonder AI-assistent, DMS of cloudfuncties.',
      },
      {
        text: 'Het complete pakket: alles uit PDF Editor, plus Smart Redact met AI en mobiele apps voor iOS en Android.',
        note: 'Inclusief Foxit eSign met 150 enveloppen per jaar.',
      },
      {
        text: 'Zelfstandige elektronische handtekeningen voor particulieren en teams — herbruikbare sjablonen, ondertekeningsworkflows, audittrails en handtekeningcertificaten. In lijn met ESIGN, UETA en eIDAS.',
        note: 'Essentials: 250 enveloppen/jaar, 10 sjablonen · Business: onbeperkt enveloppen en sjablonen (vanaf 5 gebruikers).',
      },
    ],
    add: 'Toevoegen aan offerte',
    addPerpetual: 'Eeuwigdurend toevoegen',
    statsTitle: 'Bewezen bedrijfswaarde',
    statsSub: 'Forrester Total Economic Impact™-studie van Foxit PDF Editor',
    roi: 'ROI',
    payback: 'Terug­verdien­tijd', // soft hyphens: must fit the column on phones
    founded: 'Foxit opgericht',
    mo: 'mnd',
    disclaimer: 'Studie in opdracht van Foxit (2022). De resultaten zijn gebaseerd op een gemodelleerde samengestelde organisatie en bieden geen garantie voor individuele resultaten.',
    study: 'Lees de studie',
  },
  it: {
    eyebrow: 'Partner in evidenza',
    title: 'Dai più forza alla tua attività con',
    lead: 'L’alternativa leader ad Adobe Acrobat per creare, modificare, convertire, firmare e gestire in sicurezza i PDF su desktop, mobile e web — con licenze e supporto di United Addins.',
    features: ['Crea, modifica e converti', 'Smart Redact (Editor+)', 'AI Assistant', 'Flussi di firma eSign'],
    finder: 'Non sai quale piano scegliere? Rispondi a 4 domande',
    badge: 'Il più completo',
    mobile: 'App mobile',
    products: [
      {
        text: 'Modifica PDF professionale per Windows, macOS e Web. Crea, modifica, converti, organizza, compila e firma PDF — con AI Assistant integrato.',
        note: 'Disponibile anche con licenza perpetua: acquisto una tantum per Windows e macOS, senza AI Assistant, DMS e funzioni cloud.',
      },
      {
        text: 'Il pacchetto completo: tutto ciò che offre PDF Editor, più Smart Redact basato sull’AI e le app mobili per iOS e Android.',
        note: 'Include Foxit eSign con 150 buste all’anno.',
      },
      {
        text: 'Firma elettronica autonoma per privati e team — modelli riutilizzabili, flussi di firma, audit trail e certificati di firma. Conforme a ESIGN, UETA ed eIDAS.',
        note: 'Essentials: 250 buste/anno, 10 modelli · Business: buste e modelli illimitati (da 5 utenti).',
      },
    ],
    add: 'Aggiungi al preventivo',
    addPerpetual: 'Aggiungi licenza perpetua',
    statsTitle: 'Valore aziendale comprovato',
    statsSub: 'Studio Forrester Total Economic Impact™ su Foxit PDF Editor',
    roi: 'ROI',
    payback: 'Tempo di ritorno',
    founded: 'Anno di fondazione di Foxit',
    mo: 'mesi',
    disclaimer: 'Studio commissionato da Foxit (2022). I risultati si basano su un’organizzazione composita modellata e non garantiscono risultati individuali.',
    study: 'Leggi lo studio',
  },
  pl: {
    eyebrow: 'Wyróżniony partner',
    title: 'Rozwijaj swój biznes z',
    lead: 'Wiodąca alternatywa dla Adobe Acrobat do tworzenia, edycji, konwersji, podpisywania i bezpiecznego zarządzania plikami PDF na komputerze, urządzeniach mobilnych i w przeglądarce — z licencjami i wsparciem United Addins.',
    features: ['Tworzenie, edycja i konwersja', 'Smart Redact (Editor+)', 'Asystent AI', 'Procesy eSign'],
    finder: 'Nie wiesz, który plan wybrać? Odpowiedz na 4 pytania',
    badge: 'Najbardziej kompletny',
    mobile: 'Aplikacja mobilna',
    products: [
      {
        text: 'Profesjonalna edycja PDF dla Windows, macOS i przeglądarki. Twórz, edytuj, konwertuj, porządkuj, wypełniaj i podpisuj pliki PDF — z wbudowanym Asystentem AI.',
        note: 'Dostępna licencja wieczysta: jednorazowy zakup dla Windows i macOS, bez Asystenta AI, DMS i funkcji chmurowych.',
      },
      {
        text: 'Kompletny pakiet: wszystko z PDF Editor, a do tego Smart Redact oparty na AI i aplikacje mobilne na iOS i Androida.',
        note: 'Zawiera Foxit eSign ze 150 kopertami rocznie.',
      },
      {
        text: 'Samodzielny podpis elektroniczny dla osób i zespołów — szablony wielokrotnego użytku, procesy podpisywania, ścieżki audytu i certyfikaty podpisu. Zgodny z ESIGN, UETA i eIDAS.',
        note: 'Essentials: 250 kopert/rok, 10 szablonów · Business: nielimitowane koperty i szablony (od 5 użytkowników).',
      },
    ],
    add: 'Dodaj do wyceny',
    addPerpetual: 'Dodaj licencję wieczystą',
    statsTitle: 'Potwierdzona wartość biznesowa',
    statsSub: 'Badanie Forrester Total Economic Impact™ dotyczące Foxit PDF Editor',
    roi: 'ROI',
    payback: 'Okres zwrotu',
    founded: 'Rok założenia Foxit',
    mo: 'mies.',
    disclaimer: 'Badanie zlecone przez Foxit (2022). Wyniki opierają się na modelowej organizacji złożonej i nie gwarantują indywidualnych rezultatów.',
    study: 'Przeczytaj badanie',
  },
}

export default function Foxit({ onAddToQuote }) {
  const t = useT(T)
  return (
    <section className="section foxit" id="foxit">
      <div className="container">
        <div className="foxit__head">
          <div data-reveal>
            <span className="eyebrow">{t.eyebrow}</span>
            <h1 className="section-title">
              {t.title} <img className="foxit__logo" src="/partners/foxit.svg" alt="Foxit" width="125" height="52" />
            </h1>
            <p className="section-lead">{t.lead}</p>
          </div>
          <div className="foxit__side" data-reveal style={{ '--d': '0.1s' }}>
            <ul className="foxit__features">
              {t.features.map((label, i) => {
                const Icon = FEATURE_ICONS[i]
                return <li key={label}><Icon /> {label}</li>
              })}
            </ul>
            <a href="#plan" className="foxit__finder">{t.finder} <Arrow /></a>
          </div>
        </div>

        <div className="foxit__grid">
          {products.map((p, i) => {
            const copy = t.products[i]
            return (
              <article
                key={p.name}
                id={p.preview === 'esign' ? 'esign' : undefined}
                className={`product product--${p.tone} spot ${p.featured ? 'product--featured' : ''}`}
                data-reveal
                style={{ '--d': `${i * 0.08}s` }}
              >
                {p.featured && <span className="product__badge">{t.badge}</span>}
                <ProductPreview kind={p.preview} />
                <h2 className="product__name">{p.name}</h2>
                <p>{copy.text}</p>
                <ul className="product__platforms">
                  {p.platforms.map((pl) => <li key={pl}>{pl === 'Mobile' ? t.mobile : pl}</li>)}
                </ul>
                <p className="product__perpetual">
                  <p.noteIcon /> <span>{copy.note}</span>
                </p>
                <div className="product__links">
                  <L
                    to="/contact#quote"
                    className="product__link"
                    onClick={(e) => { e.preventDefault(); onAddToQuote([p.name], p.perpetual ? { perpetual: false } : {}) }}
                  >
                    {t.add} <Arrow />
                  </L>
                  {p.perpetual && (
                    <L
                      to="/contact#quote"
                      className="product__link product__link--alt"
                      onClick={(e) => { e.preventDefault(); onAddToQuote([p.name], { perpetual: true }) }}
                    >
                      {t.addPerpetual} <Arrow />
                    </L>
                  )}
                </div>
                <span className="product__glow" aria-hidden="true" />
              </article>
            )
          })}

          <aside className="stats" data-reveal style={{ '--d': '0.24s' }}>
            <h2 className="stats__title">{t.statsTitle}</h2>
            <p className="stats__sub">{t.statsSub}</p>
            <dl className="stats__list">
              <div><dt><CountUp to={284} suffix="%" /></dt><dd>{t.roi}</dd></div>
              <div><dt><CountUp to={6} from={24} prefix="<" suffix={t.mo} duration={1100} /></dt><dd>{t.payback}</dd></div>
              <div><dt><CountUp to={2001} from={1980} duration={1200} /></dt><dd>{t.founded}</dd></div>
            </dl>
            <p className="stats__foot">
              <Check />
              <span>
                {t.disclaimer}{' '}
                <a
                  href="https://cdn01.foxitsoftware.com/pub/foxit/whitepaper/general/en_us/tei-of-foxit-pdf-editor.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.study}
                </a>
              </span>
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
