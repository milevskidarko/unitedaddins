import { Award, Key, Headset, Handshake, Arrow } from './Icons.jsx'
import CountUp from './CountUp.jsx'
import { L, useT } from '../i18n.jsx'
import './WhyUs.css'

// Only verified facts in the numbers: Foxit distributor since 2016 and ~650 users at
// Motor Presse Stuttgart (both from Foxit's case study), two vendors, one contact.
const T = {
  en: {
    eyebrow: 'Why United Addins',
    title: 'Software distribution built around',
    accent: 'your business',
    lead: 'With deep product knowledge and a partner-first approach, United Addins helps you get more from the software you trust.',
    expertise: {
      title: 'Product expertise',
      text: 'Trusted advice on the best solutions for your needs — before and after you buy.',
      statLabel: 'Authorized Foxit distributor since',
    },
    licensing: {
      title: 'Licensing support',
      text: 'Flexible licensing for organizations of any size, from a single seat to enterprise.',
      statLabel: 'users moved to Foxit at Motor Presse Stuttgart',
    },
    service: {
      title: 'Partner-first service',
      text: 'Responsive support every step of the way — onboarding, renewals and upgrades.',
      cycle: ['New purchase', 'Onboarding', 'Renewal', 'Upgrade', 'Add seats'],
    },
    contact: {
      title: 'One trusted contact',
      text: 'Multiple vendors, one partner. Simplify procurement and keep everything in one place.',
      statLabel: 'vendors · one contact',
    },
    more: 'More about United Addins',
    steps: [
      ['Tell us your needs', 'Share your team size, workflows and goals.'],
      ['Get the right fit', 'We recommend the products and licenses that match.'],
      ['Deploy & grow', 'Fast licensing, onboarding and ongoing support.'],
    ],
    casesLabel: 'Featured in Foxit case studies',
    cases: [
      {
        stat: '~650 users',
        text: 'The publisher of some of Germany’s best-known magazines replaced Adobe Acrobat with Foxit — introduced to Foxit by United Addins.',
        linkLabel: 'Read Foxit’s case study',
      },
      {
        stat: 'Selection & rollout',
        text: 'United Addins helped Miele define its PDF requirements, choose the right solution and integrate Foxit with its IT infrastructure.',
        linkLabel: 'Read the story on foxit.com',
      },
    ],
    newTab: '(opens in a new tab)',
  },
  de: {
    eyebrow: 'Warum United Addins',
    title: 'Softwarevertrieb, ausgerichtet auf',
    accent: 'Ihr Unternehmen',
    lead: 'Mit fundiertem Produktwissen und partnerschaftlichem Ansatz hilft United Addins Ihnen, mehr aus der Software herauszuholen, der Sie vertrauen.',
    expertise: {
      title: 'Produktexpertise',
      text: 'Fundierte Beratung zu den besten Lösungen für Ihren Bedarf — vor und nach dem Kauf.',
      statLabel: 'Autorisierter Foxit-Distributor seit',
    },
    licensing: {
      title: 'Lizenzberatung',
      text: 'Flexible Lizenzmodelle für Unternehmen jeder Größe — vom einzelnen Arbeitsplatz bis zum Konzern.',
      statLabel: 'Nutzer bei Motor Presse Stuttgart auf Foxit umgestellt',
    },
    service: {
      title: 'Partnerschaftlicher Service',
      text: 'Schneller Support in jeder Phase — Einführung, Verlängerungen und Upgrades.',
      cycle: ['Neukauf', 'Einführung', 'Verlängerung', 'Upgrade', 'Mehr Lizenzen'],
    },
    contact: {
      title: 'Ein Ansprechpartner',
      text: 'Mehrere Hersteller, ein Partner. Vereinfachen Sie die Beschaffung und behalten Sie alles an einem Ort.',
      statLabel: 'Hersteller · ein Ansprechpartner',
    },
    more: 'Mehr über United Addins',
    steps: [
      ['Bedarf schildern', 'Teilen Sie uns Teamgröße, Arbeitsabläufe und Ziele mit.'],
      ['Die passende Lösung', 'Wir empfehlen die passenden Produkte und Lizenzen.'],
      ['Einführen & wachsen', 'Schnelle Lizenzierung, Einführung und laufender Support.'],
    ],
    casesLabel: 'Vorgestellt in Foxit-Fallstudien',
    cases: [
      {
        stat: '~650 Nutzer',
        text: 'Der Verlag einiger der bekanntesten Zeitschriften Deutschlands ersetzte Adobe Acrobat durch Foxit — den Kontakt zu Foxit stellte United Addins her.',
        linkLabel: 'Foxit-Fallstudie lesen (EN)',
      },
      {
        stat: 'Auswahl & Einführung',
        text: 'United Addins half Miele, die PDF-Anforderungen zu definieren, die passende Lösung auszuwählen und Foxit in die IT-Infrastruktur zu integrieren.',
        linkLabel: 'Zum Bericht auf foxit.com (EN)',
      },
    ],
    newTab: '(öffnet in neuem Tab)',
  },
}

// Verified against the Foxit-hosted sources linked below (Nov 2026).
const CASES = [
  { company: 'Motor Presse Stuttgart', href: 'https://cdn01.foxitsoftware.com/pub/foxit/casestudy/en_us/MotorPresseStuttgart.pdf' },
  { company: 'Miele', href: 'https://www.foxit.com/blog/if-you-need-pdf-software-find-out-why-miele-made-the-move-to-phantompdf/' },
]
const ORBIT = ['PDF Editor', 'Editor+', 'eSign', 'Mekko Graphics']

export default function WhyUs({ compact = false }) {
  const t = useT(T)
  const H = compact ? 'h2' : 'h1'
  const Hc = compact ? 'h3' : 'h2'

  return (
    <section className={`section why ${compact ? 'why--compact' : ''}`} id="why">
      <div className="why__bg" aria-hidden="true">
        <span /><span />
        <i className="noise" />
      </div>
      <div className="container why__inner">
        <div className="why__head">
          <div data-reveal>
            <span className="eyebrow eyebrow--light">{t.eyebrow}</span>
            <H className="section-title">
              {t.title} <span className="accent grad-text why__accent">{t.accent}</span>
            </H>
          </div>
          <p className="section-lead why__lead" data-reveal style={{ '--d': '0.1s' }}>{t.lead}</p>
        </div>

        <div className="bento">
          {/* Big tile: expertise + orbit of the products we know inside out */}
          <article className="why-card bento__a spot" data-reveal>
            <div className="orbit" aria-hidden="true">
              <span className="orbit__ring" />
              <span className="orbit__ring orbit__ring--2" />
              <span className="orbit__core"><Award /></span>
              <div className="orbit__spin">
                {ORBIT.map((p, i) => (
                  <span key={p} className="orbit__chip" style={{ '--a': `${i * 90}deg` }}><b>{p}</b></span>
                ))}
              </div>
            </div>
            <div className="bento__stat">
              <small>{t.expertise.statLabel}</small>
              <strong className="bento__num"><CountUp to={2016} from={2000} duration={1300} /></strong>
            </div>
            <Hc>{t.expertise.title}</Hc>
            <p>{t.expertise.text}</p>
          </article>

          {/* Wide tile: licensing — seats lighting up */}
          <article className="why-card bento__b spot" data-reveal style={{ '--d': '0.08s' }}>
            <div className="bento__row">
              <div>
                <span className="why-card__icon"><Key /></span>
                <Hc>{t.licensing.title}</Hc>
                <p>{t.licensing.text}</p>
              </div>
              <div className="bento__stat bento__stat--right">
                <strong className="bento__num"><CountUp to={650} prefix="~" duration={1600} /></strong>
                <small>{t.licensing.statLabel}</small>
              </div>
            </div>
            <div className="seats" aria-hidden="true">
              {Array.from({ length: 48 }, (_, i) => <span key={i} style={{ '--i': i }} />)}
            </div>
          </article>

          {/* Service lifecycle — a highlight travels through the stages */}
          <article className="why-card bento__c spot" data-reveal style={{ '--d': '0.16s' }}>
            <span className="why-card__icon"><Headset /></span>
            <Hc>{t.service.title}</Hc>
            <p>{t.service.text}</p>
            <ol className="cycle" aria-hidden="true">
              {t.service.cycle.map((c, i) => <li key={c} style={{ '--i': i }}>{c}</li>)}
            </ol>
          </article>

          {/* Two vendors → one contact */}
          <article className="why-card bento__d spot" data-reveal style={{ '--d': '0.24s' }}>
            <svg className="merge" viewBox="0 0 220 96" aria-hidden="true">
              <path className="merge__line" d="M44 22 C110 22 110 48 176 48" />
              <path className="merge__line merge__line--2" d="M44 74 C110 74 110 48 176 48" />
              <g className="merge__node merge__node--foxit"><rect x="4" y="8" width="72" height="28" rx="14" /><text x="40" y="26.5">Foxit</text></g>
              <g className="merge__node merge__node--mekko"><rect x="4" y="60" width="72" height="28" rx="14" /><text x="40" y="78.5">Mekko</text></g>
              <g className="merge__hub"><circle cx="190" cy="48" r="22" /><text x="190" y="52.5">UA</text></g>
            </svg>
            <div className="bento__stat">
              <strong className="bento__num bento__num--sm">2 → 1</strong>
              <small>{t.contact.statLabel}</small>
            </div>
            <Hc><Handshake className="bento__inline-ic" /> {t.contact.title}</Hc>
            <p>{t.contact.text}</p>
          </article>
        </div>

        {compact ? (
          <div className="why__more" data-reveal>
            <L to="/about" className="btn btn-ghost btn-ghost--dark">{t.more} <Arrow /></L>
          </div>
        ) : (
          <>
            <ol className="steps">
              {t.steps.map(([title, text], i) => (
                <li key={title} className="step" data-reveal style={{ '--d': `${i * 0.1}s` }}>
                  <span className="step__n">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Facts quoted from Foxit's own publications — keep wording close to the sources. */}
            <div className="cases">
              <h2 className="cases__label" data-reveal>{t.casesLabel}</h2>
              <div className="cases__grid">
                {CASES.map((c, i) => (
                  <article key={c.company} className="case spot" data-reveal style={{ '--d': `${i * 0.1}s` }}>
                    <span className="case__stat">{t.cases[i].stat}</span>
                    <h3>{c.company}</h3>
                    <p>{t.cases[i].text}</p>
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="case__link">
                      {t.cases[i].linkLabel} <Arrow /><span className="sr-only"> {t.newTab}</span>
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
