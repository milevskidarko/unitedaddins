import { useState } from 'react'
import { useT } from '../i18n.jsx'
import './Extras.css'

// "Mekko Graphics Product Tour", the video in "See it in action" on mekkographics.com/product/features/.
// Lite embed like FoxitVideos: only the thumbnail until the visitor clicks play.
const VIDEO = 'zEQpezuzfVs'

const T = {
  en: {
    eyebrow: 'See it in action',
    title: 'Mekko Graphics',
    accent: 'product tour',
    lead: 'Watch how to create more compelling charts and save time with Mekko Graphics for Windows.',
    play: 'Play video',
    note: 'Video by Mekko Graphics, in English. Playing the video loads YouTube.',
  },
  de: {
    eyebrow: 'In Aktion sehen',
    title: 'Mekko Graphics',
    accent: 'Produkttour',
    lead: 'Sehen Sie, wie Sie mit Mekko Graphics für Windows überzeugendere Diagramme erstellen und Zeit sparen.',
    play: 'Video abspielen',
    note: 'Video von Mekko Graphics, auf Englisch. Beim Abspielen wird YouTube geladen.',
  },
  fr: {
    eyebrow: 'En action',
    title: 'Mekko Graphics',
    accent: 'visite du produit',
    lead: 'Découvrez comment créer des graphiques plus parlants et gagner du temps avec Mekko Graphics pour Windows.',
    play: 'Lire la vidéo',
    note: 'Vidéo de Mekko Graphics, en anglais. La lecture charge YouTube.',
  },
  es: {
    eyebrow: 'Véalo en acción',
    title: 'Mekko Graphics',
    accent: 'recorrido del producto',
    lead: 'Vea cómo crear gráficos más convincentes y ahorrar tiempo con Mekko Graphics para Windows.',
    play: 'Reproducir vídeo',
    note: 'Vídeo de Mekko Graphics, en inglés. Al reproducir se carga YouTube.',
  },
  nl: {
    eyebrow: 'Zie het in actie',
    title: 'Mekko Graphics',
    accent: 'producttour',
    lead: 'Bekijk hoe u met Mekko Graphics voor Windows overtuigendere grafieken maakt en tijd bespaart.',
    play: 'Video afspelen',
    note: 'Video van Mekko Graphics, in het Engels. Bij afspelen wordt YouTube geladen.',
  },
  it: {
    eyebrow: 'Guardalo in azione',
    title: 'Mekko Graphics',
    accent: 'tour del prodotto',
    lead: 'Scopri come creare grafici più efficaci e risparmiare tempo con Mekko Graphics per Windows.',
    play: 'Riproduci il video',
    note: 'Video di Mekko Graphics, in inglese. La riproduzione carica YouTube.',
  },
  pl: {
    eyebrow: 'Zobacz w działaniu',
    title: 'Mekko Graphics',
    accent: 'prezentacja produktu',
    lead: 'Zobacz, jak tworzyć bardziej przekonujące wykresy i oszczędzać czas z Mekko Graphics dla Windows.',
    play: 'Odtwórz wideo',
    note: 'Wideo od Mekko Graphics, w języku angielskim. Odtworzenie wczytuje YouTube.',
  },
}

export default function MekkoVideo() {
  const t = useT(T)
  const [playing, setPlaying] = useState(false)
  return (
    <section className="section xtra" id="video">
      <div className="container mvid">
        <div className="mvid__text">
          <span className="eyebrow" data-reveal>{t.eyebrow}</span>
          <h2 className="section-title xtra__title" data-reveal style={{ '--d': '0.06s' }}>
            {t.title} <span className="accent grad-text">{t.accent}</span>
          </h2>
          <p className="section-lead" data-reveal style={{ '--d': '0.1s' }}>{t.lead}</p>
          <p className="xtra__source">{t.note}</p>
        </div>
        <div className="vids__player" data-reveal style={{ '--d': '0.14s' }}>
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO}?autoplay=1&rel=0`}
              title="Mekko Graphics Product Tour"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <button type="button" className="vids__poster" onClick={() => setPlaying(true)} aria-label={`${t.play}: Mekko Graphics Product Tour`}>
              <img src={`https://i.ytimg.com/vi/${VIDEO}/hqdefault.jpg`} alt="" loading="lazy" />
              <span className="vids__play" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
