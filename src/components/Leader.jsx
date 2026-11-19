import { LinkedIn, Arrow } from './Icons.jsx'
import { L, useT } from '../i18n.jsx'

// Company message on the About page (United Addins as a company, not one person).
const LINKEDIN = 'https://www.linkedin.com/company/united-addins/'

const T = {
  en: {
    eyebrow: 'Who we are',
    name: 'United Addins',
    role: 'Our promise to every customer',
    // Statement provided by United Addins (Nov 2026), in the company's voice.
    text: 'At United Addins, we believe that strong business relationships are built on trust, transparency and commitment. Our goal is to make software licensing straightforward and reliable, while ensuring every customer receives the attention and support they deserve. We value every partnership and take responsibility for delivering on our promises.',
    linkedin: 'Follow us on LinkedIn',
    team: 'Talk to our sales team',
    newTab: '(opens in a new tab)',
  },
  de: {
    eyebrow: 'Wer wir sind',
    name: 'United Addins',
    role: 'Unser Versprechen an jeden Kunden',
    text: 'Bei United Addins sind wir überzeugt, dass starke Geschäftsbeziehungen auf Vertrauen, Transparenz und Engagement beruhen. Unser Ziel ist es, Softwarelizenzierung einfach und zuverlässig zu gestalten und dabei sicherzustellen, dass jeder Kunde die Aufmerksamkeit und Unterstützung erhält, die er verdient. Wir schätzen jede Partnerschaft und übernehmen Verantwortung dafür, unsere Versprechen einzuhalten.',
    linkedin: 'Folgen Sie uns auf LinkedIn',
    team: 'Mit unserem Vertriebsteam sprechen',
    newTab: '(öffnet in neuem Tab)',
  },
  fr: {
    eyebrow: 'Qui sommes-nous',
    name: 'United Addins',
    role: 'Notre engagement envers chaque client',
    text: 'Chez United Addins, nous sommes convaincus que les relations d’affaires solides reposent sur la confiance, la transparence et l’engagement. Notre objectif est de rendre l’achat de licences logicielles simple et fiable, tout en veillant à ce que chaque client reçoive l’attention et le soutien qu’il mérite. Nous accordons de la valeur à chaque partenariat et assumons la responsabilité de tenir nos promesses.',
    linkedin: 'Suivez-nous sur LinkedIn',
    team: 'Parler à notre équipe commerciale',
    newTab: '(s’ouvre dans un nouvel onglet)',
  },
  es: {
    eyebrow: 'Quiénes somos',
    name: 'United Addins',
    role: 'Nuestro compromiso con cada cliente',
    text: 'En United Addins creemos que las relaciones comerciales sólidas se construyen sobre la confianza, la transparencia y el compromiso. Nuestro objetivo es que la contratación de licencias de software sea sencilla y fiable, asegurándonos de que cada cliente reciba la atención y el apoyo que merece. Valoramos cada colaboración y asumimos la responsabilidad de cumplir lo que prometemos.',
    linkedin: 'Síganos en LinkedIn',
    team: 'Hable con nuestro equipo comercial',
    newTab: '(se abre en una pestaña nueva)',
  },
  nl: {
    eyebrow: 'Wie wij zijn',
    name: 'United Addins',
    role: 'Onze belofte aan elke klant',
    text: 'Bij United Addins geloven we dat sterke zakelijke relaties gebouwd zijn op vertrouwen, transparantie en betrokkenheid. Ons doel is softwarelicenties eenvoudig en betrouwbaar te maken, en ervoor te zorgen dat elke klant de aandacht en ondersteuning krijgt die hij verdient. We waarderen elke samenwerking en nemen de verantwoordelijkheid om onze beloftes na te komen.',
    linkedin: 'Volg ons op LinkedIn',
    team: 'Spreek met ons salesteam',
    newTab: '(opent in een nieuw tabblad)',
  },
}

export default function Leader() {
  const t = useT(T)
  return (
    <div className="leader" data-reveal>
      <div className="leader__photo leader__photo--mark" aria-hidden="true">
        {/* Same mark as the logo (Logo.jsx), on the dark disc. */}
        <span>
          <svg viewBox="-4 -4 72 52">
            <defs>
              <linearGradient id="leaderMarkG" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#60a5fa" />
                <stop offset="0.5" stopColor="#3b5bff" />
                <stop offset="1" stopColor="#7c5cff" />
              </linearGradient>
              <mask id="leaderMarkM" maskUnits="userSpaceOnUse" x="-10" y="-10" width="90" height="70">
                <rect x="-10" y="-10" width="90" height="70" fill="#fff" />
                <path d="M26 38 40 6h4l14 32" fill="none" stroke="#000" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
              </mask>
            </defs>
            <path d="M6 6v16a12 12 0 0 0 24 0V6" fill="none" stroke="#4f7cff" strokeWidth="9" strokeLinecap="round" mask="url(#leaderMarkM)" />
            <path d="M26 38 40 6h4l14 32" fill="none" stroke="url(#leaderMarkG)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div className="leader__body">
        <p className="leader__eyebrow">{t.eyebrow}</p>
        <h2 className="leader__name">{t.name}</h2>
        <p className="leader__role">{t.role}</p>
        <blockquote className="leader__quote">
          <p>{t.text}</p>
        </blockquote>
        <div className="leader__links">
          <L to="/contact#quote" className="leader__link leader__link--primary">
            {t.team} <Arrow />
          </L>
          <a className="leader__link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            <LinkedIn /> {t.linkedin}<span className="sr-only"> {t.newTab}</span>
          </a>
        </div>
      </div>
    </div>
  )
}
