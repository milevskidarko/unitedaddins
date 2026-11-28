import { Arrow, Doc, Sign, Files, Ruler, Calendar, Slides } from './Icons.jsx'
import { L, useLang, useT } from '../i18n.jsx'
import { CATEGORIES, PRESENTATIONS, PRODUCTS } from '../products.js'
import './Partners.css'

// Home: Foxit on its own as our core partner, the other vendors in a row below it. Then "explore by
// need": PDF editing and eSign as separate needs (they solve different problems), Presentations
// (Mekko Graphics + Efficient Elements) and the product categories, each linking to its page/section.
const CAT_ICONS = { docs: Files, design: Ruler, plan: Calendar }

const T = {
  en: {
    title: 'Our trusted',
    accent: 'partners',
    core: 'Core partner',
    foxit: 'Authorized Foxit distributor since 2012',
    foxitText: 'PDF Editor, PDF Editor+ and eSign — licensing, onboarding and support.',
    label: 'Explore by need',
    pdf: ['PDF editing', 'Create, edit, convert and protect PDFs.'],
    esign: ['eSign', 'Send, sign and track agreements online.'],
  },
  de: {
    title: 'Unsere starken',
    accent: 'Partner',
    core: 'Kernpartner',
    foxit: 'Autorisierter Foxit-Distributor seit 2012',
    foxitText: 'PDF Editor, PDF Editor+ und eSign — Lizenzierung, Einführung und Support.',
    label: 'Nach Bedarf entdecken',
    pdf: ['PDF-Bearbeitung', 'PDFs erstellen, bearbeiten, konvertieren und schützen.'],
    esign: ['eSign', 'Verträge online versenden, signieren und nachverfolgen.'],
  },
  fr: {
    title: 'Nos partenaires',
    accent: 'de confiance',
    core: 'Partenaire principal',
    foxit: 'Distributeur agréé Foxit depuis 2012',
    foxitText: 'PDF Editor, PDF Editor+ et eSign — licences, mise en route et support.',
    label: 'Explorer par besoin',
    pdf: ['Édition PDF', 'Créer, modifier, convertir et protéger des PDF.'],
    esign: ['eSign', 'Envoyer, signer et suivre vos accords en ligne.'],
  },
  es: {
    title: 'Nuestros socios',
    accent: 'de confianza',
    core: 'Socio principal',
    foxit: 'Distribuidor autorizado de Foxit desde 2012',
    foxitText: 'PDF Editor, PDF Editor+ y eSign — licencias, puesta en marcha y soporte.',
    label: 'Explorar por necesidad',
    pdf: ['Edición de PDF', 'Cree, edite, convierta y proteja PDF.'],
    esign: ['eSign', 'Envíe, firme y haga seguimiento de acuerdos en línea.'],
  },
  nl: {
    title: 'Onze vertrouwde',
    accent: 'partners',
    core: 'Kernpartner',
    foxit: 'Geautoriseerd Foxit-distributeur sinds 2012',
    foxitText: 'PDF Editor, PDF Editor+ en eSign — licenties, implementatie en support.',
    label: 'Ontdek per behoefte',
    pdf: ['PDF bewerken', 'PDF’s maken, bewerken, converteren en beveiligen.'],
    esign: ['eSign', 'Overeenkomsten online versturen, ondertekenen en volgen.'],
  },
  it: {
    title: 'I nostri partner',
    accent: 'di fiducia',
    core: 'Partner principale',
    foxit: 'Distributore autorizzato Foxit dal 2012',
    foxitText: 'PDF Editor, PDF Editor+ ed eSign — licenze, avvio e supporto.',
    label: 'Esplora per esigenza',
    pdf: ['Modifica PDF', 'Crea, modifica, converti e proteggi i PDF.'],
    esign: ['eSign', 'Invia, firma e monitora accordi online.'],
  },
  pl: {
    title: 'Nasi zaufani',
    accent: 'partnerzy',
    core: 'Kluczowy partner',
    foxit: 'Autoryzowany dystrybutor Foxit od 2012 roku',
    foxitText: 'PDF Editor, PDF Editor+ i eSign — licencje, wdrożenie i wsparcie.',
    label: 'Wybierz według potrzeb',
    pdf: ['Edycja PDF', 'Twórz, edytuj, konwertuj i zabezpieczaj pliki PDF.'],
    esign: ['eSign', 'Wysyłaj, podpisuj i śledź umowy online.'],
  },
}

export default function Partners() {
  const t = useT(T)
  const lang = useLang()
  const cards = [
    [Doc, '/foxit', ...t.pdf],
    [Sign, '/foxit#esign', ...t.esign],
    [Slides, '/products#presentations', PRESENTATIONS[lang], 'Mekko Graphics, Efficient Elements'],
    ...Object.entries(CATEGORIES).map(([key, label]) => [
      CAT_ICONS[key],
      `/products#${key}`,
      label[lang] || label.en,
      PRODUCTS.filter((p) => p.category === key).map((p) => p.name).join(', '),
    ]),
  ]
  return (
    <section className="partners" id="partners">
      <div className="container">
        <div className="partners__card" data-reveal>
          <div className="partners__brands">
            <h2 className="partners__title">{t.title}<br /><span className="accent grad-text">{t.accent}</span></h2>
            <div className="partners__lineup">
              {/* Foxit first and on its own: our core partner. */}
              <L to="/foxit" className="partners__lead spot">
                <img src="/partners/foxit.svg" alt="Foxit" width="125" height="52" />
                <span className="partners__lead-body">
                  <small>{t.core}</small>
                  <strong>{t.foxit}</strong>
                  <span>{t.foxitText}</span>
                </span>
                <Arrow className="partners__lead-arrow" />
              </L>
              <div className="partners__logos">
                {/* Official logos as published by each vendor (Nov 2026). progesoft.com has no progeCAD
                    wordmark, so progeCAD is its app icon + name; Bluebeam likewise. */}
                <L to="/mekko-graphics" className="brand brand--mekko">
                  <img src="/partners/mekko-graphics.svg" alt="Mekko Graphics" width="326" height="68" />
                </L>
                <L to="/mindmanager" className="brand brand--mm">
                  <img src="/partners/mindmanager.svg" alt="MindManager" width="236" height="31" />
                </L>
                <L to="/progecad" className="brand brand--progecad" aria-label="progeCAD">
                  <img src="/product-icons/progecad.png" alt="" width="180" height="180" />
                  <span aria-hidden="true">proge<b>CAD</b></span>
                </L>
                <L to="/bluebeam" className="brand brand--bluebeam" aria-label="Bluebeam">
                  <img src="/product-icons/bluebeam.svg" alt="" width="42" height="43" />
                  <span aria-hidden="true">bluebeam</span>
                </L>
              </div>
            </div>
          </div>

          <div className="partners__needs">
            <p className="partners__label">{t.label}</p>
            <div className="needs">
              {cards.map(([Icon, href, title, text], i) => (
                <L key={href} to={href} className="need spot" data-reveal style={{ '--d': `${0.1 + i * 0.06}s` }}>
                  <span className="need__icon"><Icon /></span>
                  <span className="need__body">
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                  <Arrow className="need__arrow" />
                </L>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
