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
  es: {
    eyebrow: 'Encuentre su plan',
    title: '¿Qué plan de Foxit le conviene?',
    accent: 'Responda 4 preguntas.',
    lead: 'Le recomendaremos la suscripción adecuada y la añadiremos a su solicitud de presupuesto — sin necesidad de comparar listas de funciones.',
    progress: 'Progreso',
    question: (n, total) => `Pregunta ${n} de ${total}`,
    back: '← Atrás',
    recommend: 'Le recomendamos',
    add: 'Añadir a mi presupuesto',
    restart: 'Empezar de nuevo',
    questions: [
      {
        short: 'Firma electrónica',
        title: '¿Necesita enviar documentos para firma electrónica?',
        hint: 'Contratos, aprobaciones o formularios de RR. HH. que firman otras personas.',
        options: ['No, solo relleno y firmo yo', 'Sí, de vez en cuando', 'Sí, es un proceso clave del equipo'],
      },
      {
        short: 'Trabajo en el móvil',
        title: '¿Trabaja con PDF en el móvil?',
        hint: 'Editar o revisar en iPhone, iPad o Android.',
        options: ['No, me basta con ordenador y web', 'Sí, en iOS o Android'],
      },
      {
        short: 'Datos sensibles',
        title: '¿Maneja datos sensibles que deban eliminarse?',
        hint: 'Datos personales o información financiera o jurídica que hay que censurar.',
        options: ['Rara vez o nunca', 'Sí, con regularidad'],
      },
      {
        short: 'Forma de pago',
        title: '¿Cómo prefiere adquirir la licencia?',
        hint: 'Una licencia perpetua es una compra única para Windows y macOS.',
        options: ['Suscripción — siempre la última versión', 'Compra única (licencia perpetua)'],
      },
    ],
    r: {
      perpetualReasons: [
        'Compra única — sin renovación anual',
        'Edición en ordenador con Windows y macOS',
        'Crear, editar, convertir, rellenar y firmar PDF',
      ],
      perpetualNote: 'La licencia perpetua no incluye Asistente de IA, Smart Redact, DMS ni funciones en la nube.',
      eSignOnlySub: 'Foxit eSign solo está disponible como suscripción.',
      eSignHighVolume: 'Foxit eSign para firmas de gran volumen en todo el equipo',
      desktopWeb: 'Edición en ordenador y web: Windows, macOS y Web',
      ai: 'Asistente de IA con 300 créditos gratuitos al mes',
      editorEsignTitlePerp: 'Foxit PDF Editor (perpetua) y Foxit eSign',
      editorEsignTitle: 'Foxit PDF Editor y Foxit eSign',
      editorEsignTextPerp: 'Una licencia de compra única de PDF Editor para editar en el ordenador, más una suscripción a Foxit eSign para flujos de firma de gran volumen en todo el equipo.',
      editorEsignText: 'PDF Editor para editar en ordenador y web, más Foxit eSign para flujos de firma de gran volumen en todo el equipo.',
      editorPerpTitle: 'Foxit PDF Editor — licencia perpetua',
      editorPerpText: 'Compre una vez y consérvelo — edición profesional de PDF en Windows y macOS sin suscripción anual.',
      editorText: 'Edición profesional de PDF para Windows, macOS y Web — todo lo necesario para crear, editar, convertir, rellenar y firmar PDF.',
      editorReasons: ['La edición en ordenador y web cubre su forma de trabajar', 'Relleno y firma incluidos', 'Asistente de IA con 300 créditos gratuitos al mes', 'Suscripción sencilla por usuario'],
      plusNote: 'PDF Editor+ solo está disponible como suscripción — sus respuestas requieren funciones (apps móviles, Smart Redact o eSign) que la licencia perpetua no incluye.',
      plusEsign: 'Incluye Foxit eSign con 150 sobres al año',
      plusMobile: 'Apps móviles para iOS y Android',
      plusRedact: 'Smart Redact para eliminar datos sensibles',
      plusAll: 'Todo lo de PDF Editor en Windows, macOS y Web',
      plusEsignText: 'PDF Editor+ para su equipo, más Foxit eSign para volúmenes de firma superiores a los 150 sobres incluidos con Editor+.',
      plusText: 'Todo lo de PDF Editor, más los extras que piden sus respuestas.',
    },
  },
  nl: {
    eyebrow: 'Vind uw abonnement',
    title: 'Welk Foxit-abonnement past bij u?',
    accent: 'Beantwoord 4 vragen.',
    lead: 'Wij adviseren het juiste abonnement en voegen het toe aan uw offerteaanvraag — u hoeft geen functielijsten te vergelijken.',
    progress: 'Voortgang',
    question: (n, total) => `Vraag ${n} van ${total}`,
    back: '← Terug',
    recommend: 'Ons advies',
    add: 'Toevoegen aan mijn offerte',
    restart: 'Opnieuw beginnen',
    questions: [
      {
        short: 'E-handtekening',
        title: 'Moet u documenten versturen voor elektronische ondertekening?',
        hint: 'Contracten, goedkeuringen of HR-formulieren die anderen ondertekenen.',
        options: ['Nee, ik vul alleen zelf in en onderteken', 'Ja, af en toe', 'Ja, het is een kernproces van het team'],
      },
      {
        short: 'Mobiel werken',
        title: 'Werkt u mobiel met PDF’s?',
        hint: 'Bewerken of controleren op iPhone, iPad of Android.',
        options: ['Nee, desktop en web volstaan', 'Ja, op iOS of Android'],
      },
      {
        short: 'Gevoelige gegevens',
        title: 'Verwerkt u gevoelige gegevens die verwijderd moeten worden?',
        hint: 'Persoonsgegevens of financiële of juridische informatie die geredigeerd moet worden.',
        options: ['Zelden of nooit', 'Ja, regelmatig'],
      },
      {
        short: 'Betaalvoorkeur',
        title: 'Hoe wilt u de licentie afnemen?',
        hint: 'Een eeuwigdurende licentie is een eenmalige aankoop voor Windows en macOS.',
        options: ['Abonnement — altijd de nieuwste versie', 'Eenmalige aankoop (eeuwigdurende licentie)'],
      },
    ],
    r: {
      perpetualReasons: [
        'Eenmalige aankoop — geen jaarlijkse verlenging',
        'Bewerken op desktop onder Windows en macOS',
        'PDF’s maken, bewerken, converteren, invullen en ondertekenen',
      ],
      perpetualNote: 'De eeuwigdurende licentie bevat geen AI-assistent, Smart Redact, DMS of cloudfuncties.',
      eSignOnlySub: 'Foxit eSign is alleen als abonnement verkrijgbaar.',
      eSignHighVolume: 'Foxit eSign voor ondertekenen op grote schaal in het hele team',
      desktopWeb: 'Bewerken op desktop en web: Windows, macOS en Web',
      ai: 'AI-assistent met 300 gratis credits per maand',
      editorEsignTitlePerp: 'Foxit PDF Editor (eeuwigdurend) en Foxit eSign',
      editorEsignTitle: 'Foxit PDF Editor en Foxit eSign',
      editorEsignTextPerp: 'Een eenmalige PDF Editor-licentie voor bewerken op de desktop, plus een Foxit eSign-abonnement voor ondertekeningsworkflows op grote schaal in het hele team.',
      editorEsignText: 'PDF Editor voor bewerken op desktop en web, plus Foxit eSign voor ondertekeningsworkflows op grote schaal in het hele team.',
      editorPerpTitle: 'Foxit PDF Editor — eeuwigdurende licentie',
      editorPerpText: 'Eenmalig kopen en houden — professionele PDF-bewerking op Windows en macOS zonder jaarabonnement.',
      editorText: 'Professionele PDF-bewerking voor Windows, macOS en Web — alles om PDF’s te maken, bewerken, converteren, invullen en ondertekenen.',
      editorReasons: ['Bewerken op desktop en web dekt uw werkwijze', 'Invullen en ondertekenen inbegrepen', 'AI-assistent met 300 gratis credits per maand', 'Eenvoudig abonnement per gebruiker'],
      plusNote: 'PDF Editor+ is alleen als abonnement verkrijgbaar — uw antwoorden vragen om functies (mobiele apps, Smart Redact of eSign) die de eeuwigdurende licentie niet bevat.',
      plusEsign: 'Inclusief Foxit eSign met 150 enveloppen per jaar',
      plusMobile: 'Mobiele apps voor iOS en Android',
      plusRedact: 'Smart Redact om gevoelige gegevens te verwijderen',
      plusAll: 'Alles uit PDF Editor op Windows, macOS en Web',
      plusEsignText: 'PDF Editor+ voor uw team, plus Foxit eSign voor ondertekeningsvolumes boven de 150 enveloppen die bij Editor+ zijn inbegrepen.',
      plusText: 'Alles uit PDF Editor, plus de extra’s waar uw antwoorden om vragen.',
    },
  },
  it: {
    eyebrow: 'Trova il tuo piano',
    title: 'Non sai quale piano Foxit fa per te?',
    accent: 'Rispondi a 4 domande.',
    lead: 'Ti consigliamo l’abbonamento giusto e lo aggiungiamo alla tua richiesta di preventivo — senza confrontare elenchi di funzioni.',
    progress: 'Avanzamento',
    question: (n, total) => `Domanda ${n} di ${total}`,
    back: '← Indietro',
    recommend: 'Ti consigliamo',
    add: 'Aggiungi al mio preventivo',
    restart: 'Ricomincia',
    questions: [
      {
        short: 'Firma elettronica',
        title: 'Devi inviare documenti per la firma elettronica?',
        hint: 'Contratti, approvazioni, moduli HR da far firmare ad altri.',
        options: ['No, compilo e firmo solo io', 'Sì, ogni tanto', 'Sì, è un flusso centrale del team'],
      },
      {
        short: 'Lavoro su mobile',
        title: 'Lavori con i PDF su dispositivi mobili?',
        hint: 'Modifica o revisione su iPhone, iPad o Android.',
        options: ['No, desktop e web bastano', 'Sì, su iOS o Android'],
      },
      {
        short: 'Dati sensibili',
        title: 'Gestisci dati sensibili da rimuovere?',
        hint: 'Dati personali, informazioni finanziarie o legali da oscurare.',
        options: ['Raramente o mai', 'Sì, regolarmente'],
      },
      {
        short: 'Come preferisci pagare',
        title: 'Come preferisci acquistare la licenza?',
        hint: 'Una licenza perpetua è un acquisto una tantum per Windows e macOS.',
        options: ['Abbonamento — sempre l’ultima versione', 'Acquisto una tantum (licenza perpetua)'],
      },
    ],
    r: {
      perpetualReasons: [
        'Acquisto una tantum — nessun rinnovo annuale',
        'Modifica su desktop per Windows e macOS',
        'Crea, modifica, converti, compila e firma PDF',
      ],
      perpetualNote: 'La licenza perpetua non include AI Assistant, Smart Redact, DMS e funzioni cloud.',
      eSignOnlySub: 'Foxit eSign è disponibile solo in abbonamento.',
      eSignHighVolume: 'Foxit eSign per firme ad alto volume in tutto il team',
      desktopWeb: 'Modifica su desktop e web per Windows, macOS e Web',
      ai: 'AI Assistant con 300 crediti gratuiti al mese',
      editorEsignTitlePerp: 'Foxit PDF Editor (perpetua) e Foxit eSign',
      editorEsignTitle: 'Foxit PDF Editor e Foxit eSign',
      editorEsignTextPerp: 'Una licenza PDF Editor una tantum per la modifica su desktop, più un abbonamento Foxit eSign per flussi di firma ad alto volume in tutto il team.',
      editorEsignText: 'PDF Editor per la modifica su desktop e web, più Foxit eSign per flussi di firma ad alto volume in tutto il team.',
      editorPerpTitle: 'Foxit PDF Editor — licenza perpetua',
      editorPerpText: 'Acquisti una volta e resta tuo — modifica PDF professionale su Windows e macOS senza abbonamento annuale.',
      editorText: 'Modifica PDF professionale per Windows, macOS e Web — tutto ciò che serve per creare, modificare, convertire, compilare e firmare PDF.',
      editorReasons: ['La modifica su desktop e web copre il tuo lavoro', 'Compila e firma incluso', 'AI Assistant con 300 crediti gratuiti al mese', 'Semplice abbonamento per utente'],
      plusNote: 'PDF Editor+ è disponibile solo in abbonamento — le tue risposte richiedono funzioni (app mobili, Smart Redact o eSign) che la licenza perpetua non include.',
      plusEsign: 'Include Foxit eSign con 150 buste all’anno',
      plusMobile: 'App mobili per iOS e Android',
      plusRedact: 'Smart Redact per rimuovere i dati sensibili',
      plusAll: 'Tutto ciò che offre PDF Editor su Windows, macOS e Web',
      plusEsignText: 'PDF Editor+ per il tuo team, più Foxit eSign per flussi di firma ad alto volume oltre le 150 buste incluse in Editor+.',
      plusText: 'Tutto ciò che offre PDF Editor, più gli extra richiesti dalle tue risposte.',
    },
  },
  pl: {
    eyebrow: 'Znajdź swój plan',
    title: 'Nie wiesz, który plan Foxit pasuje?',
    accent: 'Odpowiedz na 4 pytania.',
    lead: 'Polecimy właściwą subskrypcję i dodamy ją do zapytania o wycenę — bez porównywania list funkcji.',
    progress: 'Postęp',
    question: (n, total) => `Pytanie ${n} z ${total}`,
    back: '← Wstecz',
    recommend: 'Polecamy',
    add: 'Dodaj do mojej wyceny',
    restart: 'Zacznij od nowa',
    questions: [
      {
        short: 'Podpis elektroniczny',
        title: 'Czy wysyłasz dokumenty do podpisu elektronicznego?',
        hint: 'Umowy, akceptacje, formularze kadrowe wysyłane innym do podpisu.',
        options: ['Nie, tylko sam wypełniam i podpisuję', 'Tak, okazjonalnie', 'Tak, to kluczowy proces zespołu'],
      },
      {
        short: 'Praca mobilna',
        title: 'Czy pracujesz z PDF na urządzeniach mobilnych?',
        hint: 'Edycja lub przegląd na iPhonie, iPadzie lub Androidzie.',
        options: ['Nie, wystarczy komputer i przeglądarka', 'Tak, na iOS lub Androidzie'],
      },
      {
        short: 'Dane wrażliwe',
        title: 'Czy przetwarzasz dane wrażliwe, które trzeba usuwać?',
        hint: 'Dane osobowe, informacje finansowe lub prawne do zaczernienia.',
        options: ['Rzadko lub nigdy', 'Tak, regularnie'],
      },
      {
        short: 'Forma płatności',
        title: 'Jak wolisz kupić licencję?',
        hint: 'Licencja wieczysta to jednorazowy zakup dla Windows i macOS.',
        options: ['Subskrypcja — zawsze najnowsza wersja', 'Jednorazowy zakup (licencja wieczysta)'],
      },
    ],
    r: {
      perpetualReasons: [
        'Jednorazowy zakup — bez corocznego odnawiania',
        'Edycja na komputerze z Windows i macOS',
        'Tworzenie, edycja, konwersja, wypełnianie i podpisywanie PDF',
      ],
      perpetualNote: 'Licencja wieczysta nie obejmuje Asystenta AI, Smart Redact, DMS ani funkcji chmurowych.',
      eSignOnlySub: 'Foxit eSign jest dostępny wyłącznie w subskrypcji.',
      eSignHighVolume: 'Foxit eSign do podpisywania na dużą skalę w całym zespole',
      desktopWeb: 'Edycja na komputerze i w przeglądarce: Windows, macOS i Web',
      ai: 'Asystent AI z 300 darmowymi kredytami miesięcznie',
      editorEsignTitlePerp: 'Foxit PDF Editor (wieczysta) i Foxit eSign',
      editorEsignTitle: 'Foxit PDF Editor i Foxit eSign',
      editorEsignTextPerp: 'Jednorazowa licencja PDF Editor do edycji na komputerze oraz subskrypcja Foxit eSign do obiegu podpisów na dużą skalę w całym zespole.',
      editorEsignText: 'PDF Editor do edycji na komputerze i w przeglądarce oraz Foxit eSign do obiegu podpisów na dużą skalę w całym zespole.',
      editorPerpTitle: 'Foxit PDF Editor — licencja wieczysta',
      editorPerpText: 'Kupujesz raz i zostaje Twój — profesjonalna edycja PDF na Windows i macOS bez rocznej subskrypcji.',
      editorText: 'Profesjonalna edycja PDF dla Windows, macOS i przeglądarki — wszystko, czego potrzebujesz do tworzenia, edycji, konwersji, wypełniania i podpisywania PDF.',
      editorReasons: ['Edycja na komputerze i w przeglądarce wystarczy do Twojej pracy', 'Wypełnianie i podpisywanie w zestawie', 'Asystent AI z 300 darmowymi kredytami miesięcznie', 'Prosta subskrypcja na użytkownika'],
      plusNote: 'PDF Editor+ jest dostępny wyłącznie w subskrypcji — Twoje odpowiedzi wymagają funkcji (aplikacje mobilne, Smart Redact lub eSign), których licencja wieczysta nie obejmuje.',
      plusEsign: 'Zawiera Foxit eSign ze 150 kopertami rocznie',
      plusMobile: 'Aplikacje mobilne na iOS i Androida',
      plusRedact: 'Smart Redact do usuwania danych wrażliwych',
      plusAll: 'Wszystko z PDF Editor na Windows, macOS i Web',
      plusEsignText: 'PDF Editor+ dla Twojego zespołu oraz Foxit eSign do obiegu podpisów na dużą skalę, ponad 150 kopert zawartych w Editor+.',
      plusText: 'Wszystko z PDF Editor oraz dodatki, których wymagają Twoje odpowiedzi.',
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
