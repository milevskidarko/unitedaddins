import { useState } from 'react'
import { Arrow, Check, Sign, Phone, Shield, Key } from './Icons.jsx'
import { useT } from '../i18n.jsx'
import './PlanFinder.css'

// Recommendation rules are based on verified Foxit plan contents (foxit.com, Nov 2026):
// PDF Editor   = Windows, macOS, Web; fill-and-sign only; AI Assistant (300 credits/month)
// PDF Editor+  = + iOS & Android apps, Smart Redact, Foxit eSign with 150 envelopes/year
// Foxit eSign  = dedicated eSignature workflows for higher volumes
const QUESTION_META = [
  { id: 'esign', icon: Sign, values: ['no', 'some', 'lots'] },
  { id: 'mobile', icon: Phone, values: ['no', 'yes'] },
  { id: 'sensitive', icon: Shield, values: ['no', 'yes'] },
  { id: 'payment', icon: Key, values: ['sub', 'once'] },
]

const T = {
  en: {
    eyebrow: 'Find your plan',
    title: 'Not sure which Foxit plan fits?',
    accent: 'Answer 4 questions.',
    lead: 'We’ll recommend the right subscription and add it to your quote request — no need to compare feature lists.',
    progress: 'Progress',
    question: (n, total) => `Question ${n} of ${total}`,
    back: '← Back',
    recommend: 'We recommend',
    add: 'Add to my quote',
    restart: 'Start over',
    questions: [
      {
        short: 'E-signature needs',
        title: 'Do you need to send documents for e-signature?',
        hint: 'Contracts, approvals, HR forms sent to others to sign.',
        options: ['No, I just fill & sign myself', 'Yes, occasionally', 'Yes, it is a core team workflow'],
      },
      {
        short: 'Working on mobile',
        title: 'Do you work with PDFs on mobile?',
        hint: 'Editing or reviewing on iPhone, iPad or Android.',
        options: ['No, desktop & web is enough', 'Yes, on iOS or Android'],
      },
      {
        short: 'Sensitive data',
        title: 'Do you handle sensitive data that must be removed?',
        hint: 'Personal data, financial or legal information to redact.',
        options: ['Rarely or never', 'Yes, regularly'],
      },
      {
        short: 'How you prefer to pay',
        title: 'How would you prefer to license it?',
        hint: 'A perpetual license is a one-time purchase for Windows & macOS.',
        options: ['Subscription — always the latest version', 'One-time purchase (perpetual license)'],
      },
    ],
    r: {
      perpetualReasons: [
        'One-time purchase — no yearly renewal',
        'Desktop editing on Windows & macOS',
        'Create, edit, convert and fill & sign PDFs',
      ],
      perpetualNote: 'The perpetual license does not include AI Assistant, Smart Redact, DMS or cloud features.',
      eSignOnlySub: 'Foxit eSign is available as a subscription only.',
      eSignHighVolume: 'Foxit eSign for team-wide, high-volume signing',
      desktopWeb: 'Desktop & web editing on Windows, macOS & Web',
      ai: 'AI Assistant with 300 free credits per month',
      editorEsignTitlePerp: 'Foxit PDF Editor (perpetual) & Foxit eSign',
      editorEsignTitle: 'Foxit PDF Editor & Foxit eSign',
      editorEsignTextPerp: 'A one-time PDF Editor license for desktop editing, plus a Foxit eSign subscription for team-wide, high-volume signature workflows.',
      editorEsignText: 'PDF Editor for desktop & web editing, plus Foxit eSign for team-wide, high-volume signature workflows.',
      editorPerpTitle: 'Foxit PDF Editor — perpetual license',
      editorPerpText: 'Buy once and keep it — professional PDF editing on Windows and macOS without a yearly subscription.',
      editorText: 'Professional PDF editing for Windows, macOS and Web — everything you need to create, edit, convert and fill & sign PDFs.',
      editorReasons: ['Desktop & web editing covers your workflow', 'Fill & sign included', 'AI Assistant with 300 free credits per month', 'Simple per-user subscription'],
      plusNote: 'PDF Editor+ is available as a subscription only — your answers need features (mobile apps, Smart Redact or eSign) that the perpetual license does not include.',
      plusEsign: 'Includes Foxit eSign with 150 envelopes per year',
      plusMobile: 'Mobile apps for iOS & Android',
      plusRedact: 'Smart Redact for removing sensitive data',
      plusAll: 'Everything in PDF Editor on Windows, macOS & Web',
      plusEsignText: 'PDF Editor+ for your team, plus Foxit eSign for high-volume signature workflows beyond the 150 envelopes included with Editor+.',
      plusText: 'Everything in PDF Editor, plus the extras your answers call for.',
    },
  },
  de: {
    eyebrow: 'Plan finden',
    title: 'Welcher Foxit-Plan passt zu Ihnen?',
    accent: 'Beantworten Sie 4 Fragen.',
    lead: 'Wir empfehlen das passende Abonnement und fügen es Ihrer Angebotsanfrage hinzu — ganz ohne Funktionslisten zu vergleichen.',
    progress: 'Fortschritt',
    question: (n, total) => `Frage ${n} von ${total}`,
    back: '← Zurück',
    recommend: 'Unsere Empfehlung',
    add: 'Zum Angebot hinzufügen',
    restart: 'Neu starten',
    questions: [
      {
        short: 'E-Signatur-Bedarf',
        title: 'Müssen Sie Dokumente zur elektronischen Signatur versenden?',
        hint: 'Verträge, Freigaben oder HR-Formulare, die andere unterschreiben.',
        options: ['Nein, ich fülle nur selbst aus & unterschreibe', 'Ja, gelegentlich', 'Ja, das ist ein zentraler Team-Workflow'],
      },
      {
        short: 'Mobiles Arbeiten',
        title: 'Arbeiten Sie mobil mit PDFs?',
        hint: 'Bearbeiten oder Prüfen auf iPhone, iPad oder Android.',
        options: ['Nein, Desktop & Web reichen', 'Ja, auf iOS oder Android'],
      },
      {
        short: 'Sensible Daten',
        title: 'Verarbeiten Sie sensible Daten, die entfernt werden müssen?',
        hint: 'Personenbezogene, finanzielle oder rechtliche Informationen, die geschwärzt werden müssen.',
        options: ['Selten oder nie', 'Ja, regelmäßig'],
      },
      {
        short: 'Bevorzugte Lizenzierung',
        title: 'Wie möchten Sie lizenzieren?',
        hint: 'Eine Dauerlizenz ist ein Einmalkauf für Windows & macOS.',
        options: ['Abonnement — immer die neueste Version', 'Einmalkauf (Dauerlizenz)'],
      },
    ],
    r: {
      perpetualReasons: [
        'Einmalkauf — keine jährliche Verlängerung',
        'Desktop-Bearbeitung unter Windows & macOS',
        'PDFs erstellen, bearbeiten, konvertieren, ausfüllen & signieren',
      ],
      perpetualNote: 'Die Dauerlizenz enthält keinen KI-Assistenten, kein Smart Redact und keine DMS- oder Cloud-Funktionen.',
      eSignOnlySub: 'Foxit eSign ist nur als Abonnement erhältlich.',
      eSignHighVolume: 'Foxit eSign für teamweites Signieren in großem Umfang',
      desktopWeb: 'Desktop- & Web-Bearbeitung für Windows, macOS & Web',
      ai: 'KI-Assistent mit 300 kostenlosen Credits pro Monat',
      editorEsignTitlePerp: 'Foxit PDF Editor (Dauerlizenz) & Foxit eSign',
      editorEsignTitle: 'Foxit PDF Editor & Foxit eSign',
      editorEsignTextPerp: 'Eine PDF-Editor-Dauerlizenz für die Desktop-Bearbeitung, dazu ein Foxit-eSign-Abonnement für teamweite Signatur-Workflows in großem Umfang.',
      editorEsignText: 'PDF Editor für Desktop- & Web-Bearbeitung, dazu Foxit eSign für teamweite Signatur-Workflows in großem Umfang.',
      editorPerpTitle: 'Foxit PDF Editor — Dauerlizenz',
      editorPerpText: 'Einmal kaufen und behalten — professionelle PDF-Bearbeitung unter Windows und macOS ohne Jahresabonnement.',
      editorText: 'Professionelle PDF-Bearbeitung für Windows, macOS und Web — alles, um PDFs zu erstellen, zu bearbeiten, zu konvertieren, auszufüllen und zu signieren.',
      editorReasons: ['Desktop- & Web-Bearbeitung deckt Ihren Workflow ab', 'Ausfüllen & Signieren inklusive', 'KI-Assistent mit 300 kostenlosen Credits pro Monat', 'Einfaches Abonnement pro Nutzer'],
      plusNote: 'PDF Editor+ ist nur als Abonnement erhältlich — Ihre Antworten erfordern Funktionen (mobile Apps, Smart Redact oder eSign), die die Dauerlizenz nicht enthält.',
      plusEsign: 'Inklusive Foxit eSign mit 150 Umschlägen pro Jahr',
      plusMobile: 'Mobile Apps für iOS & Android',
      plusRedact: 'Smart Redact zum Entfernen sensibler Daten',
      plusAll: 'Alles aus PDF Editor für Windows, macOS & Web',
      plusEsignText: 'PDF Editor+ für Ihr Team, dazu Foxit eSign für Signatur-Workflows in großem Umfang über die 150 Umschläge von Editor+ hinaus.',
      plusText: 'Alles aus PDF Editor, plus die Extras, die Ihre Antworten erfordern.',
    },
  },
  fr: {
    eyebrow: 'Trouver votre offre',
    title: 'Quelle offre Foxit vous convient ?',
    accent: 'Répondez à 4 questions.',
    lead: 'Nous vous recommandons l’abonnement adapté et l’ajoutons à votre demande de devis — inutile de comparer les listes de fonctionnalités.',
    progress: 'Progression',
    question: (n, total) => `Question ${n} sur ${total}`,
    back: '← Retour',
    recommend: 'Nous recommandons',
    add: 'Ajouter à mon devis',
    restart: 'Recommencer',
    questions: [
      {
        short: 'Signature électronique',
        title: 'Devez-vous envoyer des documents à signer électroniquement ?',
        hint: 'Contrats, validations, formulaires RH envoyés à d’autres pour signature.',
        options: ['Non, je remplis et signe moi-même', 'Oui, occasionnellement', 'Oui, c’est un processus clé de l’équipe'],
      },
      {
        short: 'Travail sur mobile',
        title: 'Travaillez-vous sur des PDF depuis un mobile ?',
        hint: 'Modifier ou relire sur iPhone, iPad ou Android.',
        options: ['Non, ordinateur et web suffisent', 'Oui, sur iOS ou Android'],
      },
      {
        short: 'Données sensibles',
        title: 'Traitez-vous des données sensibles à supprimer ?',
        hint: 'Données personnelles, informations financières ou juridiques à caviarder.',
        options: ['Rarement ou jamais', 'Oui, régulièrement'],
      },
      {
        short: 'Mode de paiement',
        title: 'Comment préférez-vous acheter la licence ?',
        hint: 'Une licence perpétuelle est un achat unique pour Windows et macOS.',
        options: ['Abonnement — toujours la dernière version', 'Achat unique (licence perpétuelle)'],
      },
    ],
    r: {
      perpetualReasons: [
        'Achat unique — pas de renouvellement annuel',
        'Édition sur ordinateur, Windows et macOS',
        'Créer, modifier, convertir, remplir et signer des PDF',
      ],
      perpetualNote: 'La licence perpétuelle n’inclut pas l’Assistant IA, Smart Redact, le DMS ni les fonctions cloud.',
      eSignOnlySub: 'Foxit eSign est disponible uniquement en abonnement.',
      eSignHighVolume: 'Foxit eSign pour des signatures à grande échelle dans toute l’équipe',
      desktopWeb: 'Édition sur ordinateur et web : Windows, macOS et Web',
      ai: 'Assistant IA avec 300 crédits gratuits par mois',
      editorEsignTitlePerp: 'Foxit PDF Editor (perpétuel) et Foxit eSign',
      editorEsignTitle: 'Foxit PDF Editor et Foxit eSign',
      editorEsignTextPerp: 'Une licence PDF Editor à achat unique pour l’édition sur ordinateur, plus un abonnement Foxit eSign pour des circuits de signature à grande échelle.',
      editorEsignText: 'PDF Editor pour l’édition sur ordinateur et web, plus Foxit eSign pour des circuits de signature à grande échelle.',
      editorPerpTitle: 'Foxit PDF Editor — licence perpétuelle',
      editorPerpText: 'Achetez une fois, gardez-le — l’édition PDF professionnelle sur Windows et macOS sans abonnement annuel.',
      editorText: 'Édition PDF professionnelle pour Windows, macOS et Web — tout ce qu’il faut pour créer, modifier, convertir, remplir et signer des PDF.',
      editorReasons: ['L’édition sur ordinateur et web couvre vos besoins', 'Remplissage et signature inclus', 'Assistant IA avec 300 crédits gratuits par mois', 'Abonnement simple par utilisateur'],
      plusNote: 'PDF Editor+ est disponible uniquement en abonnement — vos réponses demandent des fonctions (applications mobiles, Smart Redact ou eSign) que la licence perpétuelle n’inclut pas.',
      plusEsign: 'Inclut Foxit eSign avec 150 enveloppes par an',
      plusMobile: 'Applications mobiles pour iOS et Android',
      plusRedact: 'Smart Redact pour supprimer les données sensibles',
      plusAll: 'Tout PDF Editor sur Windows, macOS et Web',
      plusEsignText: 'PDF Editor+ pour votre équipe, plus Foxit eSign pour des volumes de signature au-delà des 150 enveloppes incluses avec Editor+.',
      plusText: 'Tout PDF Editor, plus les fonctions supplémentaires que vos réponses demandent.',
    },
  },
}

// Perpetual licenses exist for PDF Editor only (Windows & macOS, no AI Assistant or
// cloud features). PDF Editor+ and Foxit eSign are subscription-only.
function recommend(a, r) {
  const reasons = []
  const lots = a.esign === 'lots'
  const once = a.payment === 'once'
  // Mobile or Smart Redact always need Editor+. Occasional signing is covered by
  // the 150 envelopes in Editor+. High-volume signing is covered by standalone
  // Foxit eSign, so it does not require Editor+ by itself.
  const plus = a.mobile === 'yes' || a.sensitive === 'yes' || a.esign === 'some'

  if (!plus && lots) {
    return {
      products: ['Foxit PDF Editor', 'Foxit eSign'],
      perpetual: once,
      title: once ? r.editorEsignTitlePerp : r.editorEsignTitle,
      tone: 'blue',
      text: once ? r.editorEsignTextPerp : r.editorEsignText,
      reasons: once
        ? [r.eSignHighVolume, ...r.perpetualReasons.slice(0, 2)]
        : [r.eSignHighVolume, r.desktopWeb, r.ai],
      note: once ? `${r.perpetualNote} ${r.eSignOnlySub}` : null,
    }
  }

  if (!plus) {
    if (once) {
      return {
        products: ['Foxit PDF Editor'],
        perpetual: true,
        title: r.editorPerpTitle,
        tone: 'orange',
        text: r.editorPerpText,
        reasons: r.perpetualReasons,
        note: r.perpetualNote,
      }
    }
    return {
      products: ['Foxit PDF Editor'],
      title: 'Foxit PDF Editor',
      tone: 'orange',
      text: r.editorText,
      reasons: r.editorReasons,
    }
  }

  const plusNote = once ? r.plusNote : null

  if (a.esign === 'some') reasons.push(r.plusEsign)
  if (a.mobile === 'yes') reasons.push(r.plusMobile)
  if (a.sensitive === 'yes') reasons.push(r.plusRedact)
  reasons.push(r.plusAll)

  if (lots) {
    return {
      products: ['Foxit PDF Editor+', 'Foxit eSign'],
      title: 'Foxit PDF Editor+ & Foxit eSign',
      tone: 'violet',
      text: r.plusEsignText,
      reasons: [r.eSignHighVolume, ...reasons.filter((x) => x !== r.plusEsign)],
      note: plusNote,
    }
  }

  return {
    products: ['Foxit PDF Editor+'],
    title: 'Foxit PDF Editor+',
    tone: 'violet',
    text: r.plusText,
    reasons,
    note: plusNote,
  }
}

export default function PlanFinder({ onAddToQuote }) {
  const t = useT(T)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const total = QUESTION_META.length
  const done = step >= total
  const result = done ? recommend(answers, t.r) : null

  const choose = (id, value) => {
    setAnswers((a) => ({ ...a, [id]: value }))
    setTimeout(() => setStep((s) => s + 1), 180)
  }
  const restart = () => {
    setAnswers({})
    setStep(0)
  }

  const meta = QUESTION_META[step]
  const q = t.questions[step]

  return (
    <section className="section finder" id="plan">
      <div className="container finder__inner">
        <div className="finder__copy">
          <span className="eyebrow" data-reveal>{t.eyebrow}</span>
          <h2 className="section-title" data-reveal style={{ '--d': '0.06s' }}>
            {t.title} <span className="accent grad-text">{t.accent}</span>
          </h2>
          <p className="section-lead" data-reveal style={{ '--d': '0.12s' }}>{t.lead}</p>
          <ol className="finder__progress" data-reveal style={{ '--d': '0.18s' }} aria-label={t.progress}>
            {QUESTION_META.map((qq, i) => (
              <li key={qq.id} className={i < step ? 'is-done' : i === step ? 'is-current' : ''}>
                <span>{i < step ? <Check /> : i + 1}</span>
                {t.questions[i].short}
              </li>
            ))}
          </ol>
        </div>

        <div className="finder__card" data-reveal style={{ '--d': '0.1s' }}>
          {!done ? (
            <div className="finder__q" key={meta.id}>
              <div className="finder__qhead">
                <span className="finder__qicon"><meta.icon /></span>
                <small>{t.question(step + 1, total)}</small>
              </div>
              <h3>{q.title}</h3>
              <p className="finder__hint">{q.hint}</p>
              <div className="finder__options" role="radiogroup" aria-label={q.title}>
                {meta.values.map((value, i) => (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={answers[meta.id] === value}
                    className={`finder__opt ${answers[meta.id] === value ? 'is-selected' : ''}`}
                    onClick={() => choose(meta.id, value)}
                  >
                    <span className="finder__radio" />
                    {q.options[i]}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button type="button" className="finder__back" onClick={() => setStep((s) => s - 1)}>
                  {t.back}
                </button>
              )}
            </div>
          ) : (
            <div className={`finder__result finder__result--${result.tone}`}>
              <small>{t.recommend}</small>
              <h3>{result.title}</h3>
              <p>{result.text}</p>
              <ul>
                {result.reasons.map((x) => <li key={x}><Check /> {x}</li>)}
              </ul>
              {result.note && <p className="finder__note">{result.note}</p>}
              <div className="finder__actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onAddToQuote(result.products, { perpetual: Boolean(result.perpetual) })}
                >
                  {t.add} <Arrow />
                </button>
                <button type="button" className="btn btn-ghost" onClick={restart}>{t.restart}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
