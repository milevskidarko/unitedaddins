import { useState } from 'react'
import { useT } from '../i18n.jsx'
import { Check } from './Icons.jsx'
import './Extras.css'
import './EfficientElements.css'

// Extra Efficient Elements info from efficient-elements.com (/powerpoint/, /shop/, /deployment/), Nov 2026.
// Tool names (Agenda Wizard, Smart Elements, ...) are the vendor's own and stay in English.
// "2 hours per week": the vendor's figure, footnoted there as "Siemens Efficiency Study 2010".
// Video: "Efficient Elements - Professional PowerPoint Slides made easy" (YouTube, Efficient Elements GmbH).
const VIDEO = '0bplkbrNS_U'
const VIDEO_TITLE = 'Efficient Elements - Professional PowerPoint Slides made easy'
const DOTS = ['#4f7cff', '#36cf7a', '#ffc145', '#a78bfa', '#ff6b6b', '#22b8cf']
const TOOLS = [
  ['Agenda Wizard', 'Element Wizard', 'Text Wizard', 'Map Wizard'],
  ['Harvey Balls', 'Traffic Lights', 'Percent Bar', 'Thermometer'],
  ['Align Position', 'Dock Objects', 'Align in Matrix', 'Magic Resizer', 'Swap Objects'],
  ['Custom Color Palettes', 'Color Picker', 'Color Bar'],
  ['Check Presentations', 'Clean-up'],
  ['Master Wizard', 'Format Wizard', 'Save Selected Slides'],
]
const STATS = ['2 h', '25+', '9', '30']

const T = {
  en: {
    eyebrow: 'Features',
    title: 'Everything you need',
    accent: 'for professional slides',
    groups: [
      ['Agenda & slide library', 'Agendas that update themselves, plus your team’s own slides, elements and maps of every country — linkable to Excel data.'],
      ['Smart Elements', 'Status symbols for consulting-style slides that you set with a click.'],
      ['Alignment & layout', 'Align, dock, stack, resize and space objects precisely, without fiddling.'],
      ['Colors', 'Your corporate colors one click away, and any color converted to the palette.'],
      ['Check & clean up', 'More than 25 rules for corporate colors, fonts, bullets, footnotes and spaces; remove notes and animations before you send.'],
      ['Templates & sharing', 'Manage your own and your clients’ templates; e-mail or save selected slides as PPTX or PDF.'],
    ],
    trusted: 'Good to know',
    stats: ['saved per user per week on average, according to Efficient Elements', 'rules in Check Presentations', 'interface languages, in Basic or Expert mode', 'days free trial for Windows and macOS'],
    source: 'Source: efficient-elements.com. The 2-hour figure is the vendor’s, based on a Siemens efficiency study (2010). On macOS the feature set differs from Windows.',
    licTitle: 'Licensing through United Addins',
    lic: [
      'Single-user, multi-user and corporate licenses — each valid for one year, with updates and support',
      'Corporate setup: your templates, colors and team slides rolled out to every user',
      'Per-machine or per-user installation (MSI) for IT teams',
      'Free licenses for students and educational institutions',
    ],
    vEyebrow: 'See it in action',
    vAccent: 'in about 3 minutes',
    vLead: 'Watch how Efficient Elements makes professional PowerPoint slides easy.',
    play: 'Play video',
    note: 'Video by Efficient Elements, in English. Playing the video loads YouTube.',
  },
  de: {
    eyebrow: 'Funktionen',
    title: 'Alles, was Sie brauchen,',
    accent: 'für professionelle Folien',
    groups: [
      ['Agenda & Folienbibliothek', 'Agenden, die sich selbst aktualisieren, dazu die eigenen Folien, Elemente und Karten aller Länder Ihres Teams — mit Excel-Daten verknüpfbar.'],
      ['Smart Elements', 'Statussymbole für Folien im Beratungsstil, mit einem Klick gesetzt.'],
      ['Ausrichten & Layout', 'Objekte präzise ausrichten, andocken, stapeln, skalieren und verteilen — ohne Gefummel.'],
      ['Farben', 'Ihre Firmenfarben mit einem Klick, und jede Farbe in die Palette umgewandelt.'],
      ['Prüfen & bereinigen', 'Über 25 Regeln für Firmenfarben, Schriften, Aufzählungen, Fußnoten und Leerzeichen; Notizen und Animationen vor dem Versand entfernen.'],
      ['Vorlagen & Weitergabe', 'Eigene und Kundenvorlagen verwalten; ausgewählte Folien als PPTX oder PDF mailen oder speichern.'],
    ],
    trusted: 'Gut zu wissen',
    stats: ['pro Nutzer und Woche im Schnitt gespart, laut Efficient Elements', 'Regeln in Check Presentations', 'Sprachen der Oberfläche, im Basic- oder Expert-Modus', 'Tage kostenlos testen, für Windows und macOS'],
    source: 'Quelle: efficient-elements.com. Die 2 Stunden sind eine Angabe des Herstellers auf Basis einer Siemens-Effizienzstudie (2010). Unter macOS unterscheidet sich der Funktionsumfang von Windows.',
    licTitle: 'Lizenzen über United Addins',
    lic: [
      'Einzelplatz-, Mehrplatz- und Unternehmenslizenzen — jeweils ein Jahr gültig, mit Updates und Support',
      'Unternehmens-Setup: Ihre Vorlagen, Farben und Team-Folien für alle Nutzer ausgerollt',
      'Installation pro Rechner oder pro Benutzer (MSI) für IT-Teams',
      'Kostenlose Lizenzen für Studierende und Bildungseinrichtungen',
    ],
    vEyebrow: 'In Aktion sehen',
    vAccent: 'in etwa 3 Minuten',
    vLead: 'Sehen Sie, wie einfach professionelle PowerPoint-Folien mit Efficient Elements werden.',
    play: 'Video abspielen',
    note: 'Video von Efficient Elements, auf Englisch. Beim Abspielen wird YouTube geladen.',
  },
  fr: {
    eyebrow: 'Fonctionnalités',
    title: 'Tout ce qu’il faut',
    accent: 'pour des diapositives professionnelles',
    groups: [
      ['Agenda et bibliothèque', 'Des agendas qui se mettent à jour seuls, les diapositives et éléments de votre équipe et des cartes de tous les pays — reliables à Excel.'],
      ['Smart Elements', 'Des symboles de statut pour des diapositives façon conseil, réglés d’un clic.'],
      ['Alignement et mise en page', 'Alignez, ancrez, empilez, redimensionnez et espacez les objets avec précision.'],
      ['Couleurs', 'Vos couleurs d’entreprise à un clic, et toute couleur convertie dans la palette.'],
      ['Vérifier et nettoyer', 'Plus de 25 règles sur couleurs, polices, puces, notes de bas de page et espaces ; supprimez notes et animations avant l’envoi.'],
      ['Modèles et partage', 'Gérez vos modèles et ceux de vos clients ; envoyez ou enregistrez des diapositives choisies en PPTX ou PDF.'],
    ],
    trusted: 'Bon à savoir',
    stats: ['gagnées par utilisateur et par semaine en moyenne, selon Efficient Elements', 'règles dans Check Presentations', 'langues d’interface, en mode Basic ou Expert', 'jours d’essai gratuit sur Windows et macOS'],
    source: 'Source : efficient-elements.com. Les 2 heures sont un chiffre de l’éditeur, issu d’une étude d’efficacité Siemens (2010). Sur macOS, les fonctionnalités diffèrent de Windows.',
    licTitle: 'Licences via United Addins',
    lic: [
      'Licences mono-utilisateur, multi-utilisateurs et entreprise — valables un an, mises à jour et support inclus',
      'Déploiement entreprise : vos modèles, couleurs et diapositives d’équipe pour chaque utilisateur',
      'Installation par poste ou par utilisateur (MSI) pour les équipes IT',
      'Licences gratuites pour les étudiants et les établissements d’enseignement',
    ],
    vEyebrow: 'En action',
    vAccent: 'en 3 minutes environ',
    vLead: 'Découvrez comment Efficient Elements simplifie la création de diapositives PowerPoint professionnelles.',
    play: 'Lire la vidéo',
    note: 'Vidéo d’Efficient Elements, en anglais. La lecture charge YouTube.',
  },
  es: {
    eyebrow: 'Funciones',
    title: 'Todo lo que necesita',
    accent: 'para diapositivas profesionales',
    groups: [
      ['Agenda y biblioteca', 'Agendas que se actualizan solas, las diapositivas y elementos de su equipo y mapas de todos los países — vinculables a Excel.'],
      ['Smart Elements', 'Símbolos de estado para diapositivas de estilo consultoría, con un clic.'],
      ['Alineación y diseño', 'Alinee, acople, apile, redimensione y espacie objetos con precisión.'],
      ['Colores', 'Sus colores corporativos a un clic, y cualquier color convertido a la paleta.'],
      ['Revisar y limpiar', 'Más de 25 reglas sobre colores, fuentes, viñetas, notas al pie y espacios; elimine notas y animaciones antes de enviar.'],
      ['Plantillas y envío', 'Gestione sus plantillas y las de sus clientes; envíe o guarde diapositivas seleccionadas en PPTX o PDF.'],
    ],
    trusted: 'Conviene saber',
    stats: ['ahorradas por usuario y semana de media, según Efficient Elements', 'reglas en Check Presentations', 'idiomas de interfaz, en modo Basic o Expert', 'días de prueba gratuita en Windows y macOS'],
    source: 'Fuente: efficient-elements.com. Las 2 horas son un dato del fabricante, basado en un estudio de eficiencia de Siemens (2010). En macOS las funciones difieren de Windows.',
    licTitle: 'Licencias con United Addins',
    lic: [
      'Licencias de un usuario, multiusuario y corporativas — válidas un año, con actualizaciones y soporte',
      'Implantación corporativa: sus plantillas, colores y diapositivas de equipo para cada usuario',
      'Instalación por equipo o por usuario (MSI) para equipos de TI',
      'Licencias gratuitas para estudiantes e instituciones educativas',
    ],
    vEyebrow: 'Véalo en acción',
    vAccent: 'en unos 3 minutos',
    vLead: 'Vea cómo Efficient Elements facilita crear diapositivas profesionales de PowerPoint.',
    play: 'Reproducir vídeo',
    note: 'Vídeo de Efficient Elements, en inglés. Al reproducir se carga YouTube.',
  },
  nl: {
    eyebrow: 'Functies',
    title: 'Alles wat u nodig hebt',
    accent: 'voor professionele dia’s',
    groups: [
      ['Agenda en diabibliotheek', 'Agenda’s die zichzelf bijwerken, de dia’s en elementen van uw team en kaarten van elk land — te koppelen aan Excel.'],
      ['Smart Elements', 'Statussymbolen voor dia’s in consultancystijl, met één klik ingesteld.'],
      ['Uitlijnen en lay-out', 'Objecten nauwkeurig uitlijnen, koppelen, stapelen, schalen en verdelen.'],
      ['Kleuren', 'Uw huisstijlkleuren binnen één klik, en elke kleur omgezet naar het palet.'],
      ['Controleren en opschonen', 'Meer dan 25 regels voor kleuren, lettertypen, opsommingen, voetnoten en spaties; verwijder notities en animaties vóór verzending.'],
      ['Sjablonen en delen', 'Beheer uw eigen sjablonen en die van klanten; mail of bewaar geselecteerde dia’s als PPTX of PDF.'],
    ],
    trusted: 'Goed om te weten',
    stats: ['gemiddeld bespaard per gebruiker per week, volgens Efficient Elements', 'regels in Check Presentations', 'interfacetalen, in Basic- of Expert-modus', 'dagen gratis proberen op Windows en macOS'],
    source: 'Bron: efficient-elements.com. De 2 uur is een cijfer van de leverancier, gebaseerd op een efficiëntiestudie van Siemens (2010). Op macOS wijkt de functionaliteit af van Windows.',
    licTitle: 'Licenties via United Addins',
    lic: [
      'Licenties voor één gebruiker, meerdere gebruikers en organisaties — één jaar geldig, met updates en support',
      'Uitrol in uw organisatie: uw sjablonen, kleuren en teamdia’s voor elke gebruiker',
      'Installatie per computer of per gebruiker (MSI) voor IT-teams',
      'Gratis licenties voor studenten en onderwijsinstellingen',
    ],
    vEyebrow: 'Zie het in actie',
    vAccent: 'in zo’n 3 minuten',
    vLead: 'Bekijk hoe Efficient Elements professionele PowerPoint-dia’s eenvoudig maakt.',
    play: 'Video afspelen',
    note: 'Video van Efficient Elements, in het Engels. Bij afspelen wordt YouTube geladen.',
  },
  it: {
    eyebrow: 'Funzionalità',
    title: 'Tutto ciò che serve',
    accent: 'per slide professionali',
    groups: [
      ['Agenda e libreria di slide', 'Agende che si aggiornano da sole, più le slide, gli elementi e le mappe di ogni paese del tuo team — collegabili ai dati di Excel.'],
      ['Smart Elements', 'Simboli di stato per slide in stile consulenza, da impostare con un clic.'],
      ['Allineamento e layout', 'Allinea, aggancia, impila, ridimensiona e distanzia gli oggetti con precisione, senza fatica.'],
      ['Colori', 'I colori aziendali a un clic di distanza, e qualsiasi colore convertito nella palette.'],
      ['Controllo e pulizia', 'Oltre 25 regole per colori aziendali, font, elenchi puntati, note e spazi; rimuovi note e animazioni prima dell’invio.'],
      ['Modelli e condivisione', 'Gestisci i tuoi modelli e quelli dei clienti; invia via e-mail o salva le slide selezionate come PPTX o PDF.'],
    ],
    trusted: 'Buono a sapersi',
    stats: ['risparmiate in media per utente a settimana, secondo Efficient Elements', 'regole in Check Presentations', 'lingue dell’interfaccia, in modalità Basic o Expert', 'giorni di prova gratuita per Windows e macOS'],
    source: 'Fonte: efficient-elements.com. Il dato delle 2 ore è del produttore, basato su uno studio di efficienza di Siemens (2010). Su macOS le funzioni differiscono da Windows.',
    licTitle: 'Licenze tramite United Addins',
    lic: [
      'Licenze per utente singolo, multiutente e aziendali — ciascuna valida un anno, con aggiornamenti e supporto',
      'Configurazione aziendale: modelli, colori e slide del team distribuiti a ogni utente',
      'Installazione per computer o per utente (MSI) per i team IT',
      'Licenze gratuite per studenti e istituti di istruzione',
    ],
    vEyebrow: 'Guardalo in azione',
    vAccent: 'in circa 3 minuti',
    vLead: 'Scopri come Efficient Elements rende semplici le slide PowerPoint professionali.',
    play: 'Riproduci il video',
    note: 'Video di Efficient Elements, in inglese. La riproduzione carica YouTube.',
  },
  pl: {
    eyebrow: 'Funkcje',
    title: 'Wszystko, czego potrzebujesz',
    accent: 'do profesjonalnych slajdów',
    groups: [
      ['Agenda i biblioteka slajdów', 'Agendy, które aktualizują się same, a do tego własne slajdy, elementy i mapy każdego kraju — z możliwością łączenia z danymi z Excela.'],
      ['Smart Elements', 'Symbole statusu do slajdów w stylu konsultingowym, ustawiane jednym kliknięciem.'],
      ['Wyrównywanie i układ', 'Precyzyjnie wyrównuj, dokuj, układaj, skaluj i rozmieszczaj obiekty — bez żmudnego poprawiania.'],
      ['Kolory', 'Kolory firmowe na jedno kliknięcie, a każdy kolor można przekonwertować na paletę.'],
      ['Sprawdzanie i porządki', 'Ponad 25 reguł dla kolorów firmowych, czcionek, wypunktowań, przypisów i spacji; usuń notatki i animacje przed wysłaniem.'],
      ['Szablony i udostępnianie', 'Zarządzaj własnymi szablonami i szablonami klientów; wysyłaj e-mailem lub zapisuj wybrane slajdy jako PPTX lub PDF.'],
    ],
    trusted: 'Warto wiedzieć',
    stats: ['oszczędności na użytkownika tygodniowo średnio, według Efficient Elements', 'reguł w Check Presentations', 'języków interfejsu, w trybie Basic lub Expert', 'dni bezpłatnego okresu próbnego dla Windows i macOS'],
    source: 'Źródło: efficient-elements.com. Liczba 2 godzin pochodzi od producenta i opiera się na badaniu efektywności Siemensa (2010). Na macOS zestaw funkcji różni się od wersji dla Windows.',
    licTitle: 'Licencje przez United Addins',
    lic: [
      'Licencje jednostanowiskowe, wielostanowiskowe i firmowe — każda ważna rok, z aktualizacjami i wsparciem',
      'Konfiguracja firmowa: Twoje szablony, kolory i slajdy zespołu wdrożone u każdego użytkownika',
      'Instalacja na komputer lub na użytkownika (MSI) dla działów IT',
      'Bezpłatne licencje dla studentów i placówek edukacyjnych',
    ],
    vEyebrow: 'Zobacz w działaniu',
    vAccent: 'w około 3 minuty',
    vLead: 'Zobacz, jak Efficient Elements ułatwia tworzenie profesjonalnych slajdów w PowerPoint.',
    play: 'Odtwórz wideo',
    note: 'Wideo od Efficient Elements, w języku angielskim. Odtworzenie wczytuje YouTube.',
  },
}

export default function EEMore() {
  const t = useT(T)
  const [playing, setPlaying] = useState(false)
  return (
    <>
      <section className="section xtra" id="features">
        <div className="container">
          <span className="eyebrow" data-reveal>{t.eyebrow}</span>
          <h2 className="section-title xtra__title" data-reveal style={{ '--d': '0.06s' }}>
            {t.title} <span className="accent grad-text">{t.accent}</span>
          </h2>

          <div className="ctypes ctypes--3 ee-groups">
            {t.groups.map(([name, text], i) => (
              <div key={name} className="ctype" data-reveal style={{ '--c': DOTS[i], '--d': `${0.04 * i}s` }}>
                <strong>{name}</strong>
                <p>{text}</p>
                <ul>{TOOLS[i].map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
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

          <p className="xtra__label" data-reveal>{t.licTitle}</p>
          <ul className="ee-license" data-reveal>
            {t.lic.map((x) => <li key={x}><Check /> {x}</li>)}
          </ul>
        </div>
      </section>

      <section className="section xtra" id="video">
        <div className="container mvid">
          <div className="mvid__text">
            <span className="eyebrow" data-reveal>{t.vEyebrow}</span>
            <h2 className="section-title xtra__title" data-reveal style={{ '--d': '0.06s' }}>
              Efficient Elements <span className="accent grad-text">{t.vAccent}</span>
            </h2>
            <p className="section-lead" data-reveal style={{ '--d': '0.1s' }}>{t.vLead}</p>
            <p className="xtra__source">{t.note}</p>
          </div>
          <div className="vids__player" data-reveal style={{ '--d': '0.14s' }}>
            {playing ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${VIDEO}?autoplay=1&rel=0`}
                title={VIDEO_TITLE}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              <button type="button" className="vids__poster" onClick={() => setPlaying(true)} aria-label={`${t.play}: ${VIDEO_TITLE}`}>
                <img src={`https://i.ytimg.com/vi/${VIDEO}/hqdefault.jpg`} alt="" loading="lazy" />
                <span className="vids__play" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
