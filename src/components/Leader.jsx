import { useState } from 'react'
import { LinkedIn, Arrow } from './Icons.jsx'
import { L, useT } from '../i18n.jsx'

// The person behind United Addins (About page).
// Photo: public/team/borivoje-bogatinov.png (replace with a larger, square photo when available).
// Until it exists, the card shows the initials instead.
const LEADER = {
  name: 'Borivoje Bogatinov',
  initials: 'BB',
  photo: '/team/borivoje-bogatinov.png',
  linkedin: 'https://www.linkedin.com/in/borivoje-bogatinov-2232b34',
}

const T = {
  en: {
    eyebrow: 'The team behind United Addins',
    role: 'Owner & CEO, United Addins',
    // Statement provided by United Addins (Nov 2026).
    text: 'At United Addins, we believe that strong business relationships are built on trust, transparency and personal commitment. Our goal is to make software licensing straightforward and reliable, while ensuring every customer receives the attention and support they deserve. We value every partnership and take personal responsibility for delivering on our promises.',
    linkedin: 'Connect on LinkedIn',
    team: 'Talk to our sales team',
    newTab: '(opens in a new tab)',
  },
  de: {
    eyebrow: 'Das Team hinter United Addins',
    role: 'Inhaber & CEO, United Addins',
    text: 'Bei United Addins sind wir überzeugt, dass starke Geschäftsbeziehungen auf Vertrauen, Transparenz und persönlichem Engagement beruhen. Unser Ziel ist es, Softwarelizenzierung einfach und zuverlässig zu gestalten und dabei sicherzustellen, dass jeder Kunde die Aufmerksamkeit und Unterstützung erhält, die er verdient. Wir schätzen jede Partnerschaft und übernehmen persönlich Verantwortung dafür, unsere Versprechen einzuhalten.',
    linkedin: 'Auf LinkedIn vernetzen',
    team: 'Mit unserem Vertriebsteam sprechen',
    newTab: '(öffnet in neuem Tab)',
  },
}

export default function Leader() {
  const t = useT(T)
  const [photoOk, setPhotoOk] = useState(true)
  return (
    <div className="leader" data-reveal>
      <div className="leader__photo">
        {photoOk ? (
          <img src={LEADER.photo} alt={LEADER.name} width="160" height="160" loading="lazy" onError={() => setPhotoOk(false)} />
        ) : (
          <span aria-hidden="true">{LEADER.initials}</span>
        )}
      </div>
      <div className="leader__body">
        <p className="leader__eyebrow">{t.eyebrow}</p>
        <h2 className="leader__name">{LEADER.name}</h2>
        <p className="leader__role">{t.role}</p>
        <blockquote className="leader__quote">
          <p>{t.text}</p>
        </blockquote>
        <div className="leader__links">
          <L to="/contact#quote" className="leader__link leader__link--primary">
            {t.team} <Arrow />
          </L>
          <a className="leader__link" href={LEADER.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedIn /> {t.linkedin}<span className="sr-only"> {t.newTab}</span>
          </a>
        </div>
      </div>
    </div>
  )
}
