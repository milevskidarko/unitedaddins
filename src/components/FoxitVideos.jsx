import { useState } from 'react'
import { useT } from '../i18n.jsx'
import './Extras.css'

// Official Foxit tutorial videos (YouTube IDs from foxit.com/pdf-editor/ "See it in action", Nov 2026).
// Only 5 of the 13 on purpose. Lite embed: only the thumbnail loads until the visitor clicks play,
// then the youtube-nocookie player is loaded.
const VIDEOS = ['dVhmFfmhY7g', 'SzVEeNm7F6c', 'TwdY5OpmPF8', 'OnvWKAv11Bo', 'lqhj2cUUsHQ']

const T = {
  en: {
    eyebrow: 'See it in action',
    title: 'Get to know',
    accent: 'Foxit PDF Editor',
    lead: 'Short official videos from Foxit — see how the everyday work is done before you buy.',
    videos: [
      ['Introduction', 'A tour of the ribbon, workspace and core editing tools.'],
      ['Edit text & images', 'Change text, images and layout directly in the PDF.'],
      ['Convert & OCR', 'Turn PDFs into Word, Excel and more — and make scans searchable.'],
      ['AI Assistant', 'Summarize, translate and automate work with Foxit AI.'],
      ['Protect & redact', 'Passwords, permissions and permanent redaction of sensitive content.'],
    ],
    play: 'Play video',
    note: 'Videos by Foxit, in English. Playing a video loads YouTube.',
  },
  de: {
    eyebrow: 'In Aktion sehen',
    title: 'Lernen Sie',
    accent: 'Foxit PDF Editor kennen',
    lead: 'Kurze offizielle Videos von Foxit — sehen Sie vor dem Kauf, wie die tägliche Arbeit funktioniert.',
    videos: [
      ['Einführung', 'Ein Rundgang durch Menüband, Arbeitsbereich und die wichtigsten Bearbeitungswerkzeuge.'],
      ['Text & Bilder bearbeiten', 'Text, Bilder und Layout direkt im PDF ändern.'],
      ['Konvertieren & OCR', 'PDFs in Word, Excel und mehr umwandeln — und Scans durchsuchbar machen.'],
      ['KI-Assistent', 'Zusammenfassen, übersetzen und automatisieren mit Foxit AI.'],
      ['Schützen & schwärzen', 'Passwörter, Berechtigungen und dauerhaftes Schwärzen sensibler Inhalte.'],
    ],
    play: 'Video abspielen',
    note: 'Videos von Foxit, auf Englisch. Beim Abspielen wird YouTube geladen.',
  },
  fr: {
    eyebrow: 'En action',
    title: 'Découvrez',
    accent: 'Foxit PDF Editor',
    lead: 'De courtes vidéos officielles de Foxit — voyez comment se fait le travail quotidien avant d’acheter.',
    videos: [
      ['Introduction', 'Une visite du ruban, de l’espace de travail et des principaux outils d’édition.'],
      ['Modifier texte et images', 'Modifiez le texte, les images et la mise en page directement dans le PDF.'],
      ['Convertir et OCR', 'Convertissez vos PDF en Word, Excel et plus — et rendez les numérisations consultables.'],
      ['Assistant IA', 'Résumez, traduisez et automatisez avec Foxit AI.'],
      ['Protéger et caviarder', 'Mots de passe, autorisations et caviardage définitif des contenus sensibles.'],
    ],
    play: 'Lire la vidéo',
    note: 'Vidéos de Foxit, en anglais. La lecture charge YouTube.',
  },
  es: {
    eyebrow: 'Véalo en acción',
    title: 'Conozca',
    accent: 'Foxit PDF Editor',
    lead: 'Vídeos oficiales breves de Foxit — vea cómo se hace el trabajo diario antes de comprar.',
    videos: [
      ['Introducción', 'Un recorrido por la cinta de opciones, el espacio de trabajo y las herramientas de edición.'],
      ['Editar texto e imágenes', 'Cambie texto, imágenes y diseño directamente en el PDF.'],
      ['Convertir y OCR', 'Convierta PDF a Word, Excel y más — y haga que los escaneos se puedan buscar.'],
      ['Asistente de IA', 'Resuma, traduzca y automatice con Foxit AI.'],
      ['Proteger y censurar', 'Contraseñas, permisos y censura definitiva de contenido sensible.'],
    ],
    play: 'Reproducir vídeo',
    note: 'Vídeos de Foxit, en inglés. Al reproducir se carga YouTube.',
  },
  nl: {
    eyebrow: 'Zie het in actie',
    title: 'Maak kennis met',
    accent: 'Foxit PDF Editor',
    lead: 'Korte officiële video’s van Foxit — zie hoe het dagelijkse werk gaat voordat u koopt.',
    videos: [
      ['Introductie', 'Een rondleiding door het lint, de werkruimte en de belangrijkste bewerkingstools.'],
      ['Tekst & afbeeldingen bewerken', 'Wijzig tekst, afbeeldingen en opmaak direct in de PDF.'],
      ['Converteren & OCR', 'Zet PDF’s om naar Word, Excel en meer — en maak scans doorzoekbaar.'],
      ['AI-assistent', 'Samenvatten, vertalen en automatiseren met Foxit AI.'],
      ['Beveiligen & redigeren', 'Wachtwoorden, rechten en definitief redigeren van gevoelige inhoud.'],
    ],
    play: 'Video afspelen',
    note: 'Video’s van Foxit, in het Engels. Bij afspelen wordt YouTube geladen.',
  },
}

export default function FoxitVideos() {
  const t = useT(T)
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const id = VIDEOS[active]
  const [name, desc] = t.videos[active]

  const pick = (i) => {
    if (i === active) return
    setActive(i)
    setPlaying(false)
  }

  return (
    <section className="section xtra" id="videos">
      <div className="container">
        <span className="eyebrow" data-reveal>{t.eyebrow}</span>
        <h2 className="section-title xtra__title" data-reveal style={{ '--d': '0.06s' }}>
          {t.title} <span className="accent grad-text">{t.accent}</span>
        </h2>
        <p className="section-lead" data-reveal style={{ '--d': '0.1s' }}>{t.lead}</p>

        <div className="vids" data-reveal style={{ '--d': '0.14s' }}>
          <div className="vids__menu" role="tablist">
            {t.videos.map(([label], i) => (
              <button
                key={VIDEOS[i]}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`vids__tab ${i === active ? 'is-active' : ''}`}
                onClick={() => pick(i)}
              >
                <span className="vids__num">{i + 1}</span>
                {label}
              </button>
            ))}
          </div>

          <div className="vids__stage">
            <div className="vids__player">
              {playing ? (
                <iframe
                  key={id}
                  src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
                  title={name}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : (
                <button type="button" className="vids__poster" onClick={() => setPlaying(true)} aria-label={`${t.play}: ${name}`}>
                  <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
                  <span className="vids__play" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
                  </span>
                </button>
              )}
            </div>
            <p className="vids__desc"><strong>{name}</strong> — {desc}</p>
          </div>
        </div>
        <p className="xtra__source">{t.note}</p>
      </div>
    </section>
  )
}
