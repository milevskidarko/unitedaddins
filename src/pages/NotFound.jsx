import { L, useT } from '../i18n.jsx'
import { Arrow } from '../components/Icons.jsx'

const T = {
  en: { title: 'Page not found', text: 'The page you are looking for does not exist or has moved.', home: 'Back to home', contact: 'Contact us' },
  de: { title: 'Seite nicht gefunden', text: 'Die gesuchte Seite existiert nicht oder wurde verschoben.', home: 'Zur Startseite', contact: 'Kontakt' },
  fr: { title: 'Page introuvable', text: 'La page que vous cherchez n’existe pas ou a été déplacée.', home: 'Retour à l’accueil', contact: 'Nous contacter' },
}

export default function NotFound() {
  const t = useT(T)
  return (
    <div className="page">
      <section className="section notfound">
        <div className="container">
          <p className="notfound__code grad-text">404</p>
          <h1 className="section-title">{t.title}</h1>
          <p className="section-lead">{t.text}</p>
          <div className="notfound__actions">
            <L to="/" className="btn btn-primary">{t.home} <Arrow /></L>
            <L to="/contact" className="btn btn-ghost">{t.contact}</L>
          </div>
        </div>
      </section>
    </div>
  )
}
