import { useT } from '../i18n.jsx'
import './Extras.css'

// More Foxit PDF Editor detail, from foxit.com/pdf-editor/ (Nov 2026): feature areas, security,
// compliance, integrations and numbers. No prices on purpose (no prices on the site).
const DOTS = ['#a78bfa', '#ff6b6b', '#4f7cff', '#36cf7a', '#ffc145', '#ff8a3d']
const COMPLIANCE = ['SOC 2 Type 2', 'GDPR', 'TAA', 'Section 508', 'VPAT', 'ADA']
const INTEGRATIONS = ['Microsoft 365', 'SharePoint', 'OneDrive', 'Google Drive', 'Box', 'Dropbox', 'Salesforce', 'Asana']

const T = {
  en: {
    eyebrow: 'Inside Foxit PDF Editor',
    title: 'More than a PDF editor —',
    accent: 'a complete document workflow',
    cards: [
      ['AI Assistant', 'Chat with your documents, get summaries, jump around with AI bookmarks, listen with Smart Podcast and generate images in place. 300 free AI credits per month on every account.'],
      ['Smart Redact', 'AI finds and removes sensitive personal data across your documents. Included with PDF Editor+.'],
      ['Document management (DMS)', 'Included with PDF Editor and PDF Editor+: shared workspaces, version control, check-in/check-out locking and unlimited cloud storage.'],
      ['eSign built in', 'PDF Editor+ includes Foxit eSign with 150 envelopes per year for signing and agreement workflows; PDF Editor includes fill & sign.'],
      ['Collaboration', 'Live sharing, comments and shared reviews — everyone works on the same document.'],
      ['Security', 'AES-256 encryption, password protection and redaction, plus single sign-on via OAuth 2.0 and Microsoft Entra ID.'],
    ],
    complianceLabel: 'Security & compliance',
    integrationsLabel: 'Works with the tools you already use',
    statsLabel: 'Foxit in numbers',
    stats: [
      ['700M+', 'users worldwide'],
      ['640,000+', 'organizations'],
      ['4.6', 'G2 rating from 55,000+ reviews'],
      ['94%', 'of Gartner reviewers recommend Foxit'],
    ],
    source: 'Source: foxit.com/pdf-editor (Nov 2026). Mobile apps (iOS & Android) are part of PDF Editor+.',
  },
  de: {
    eyebrow: 'Das steckt in Foxit PDF Editor',
    title: 'Mehr als ein PDF-Editor —',
    accent: 'ein kompletter Dokument-Workflow',
    cards: [
      ['KI-Assistent', 'Mit Dokumenten chatten, Zusammenfassungen erhalten, per KI-Lesezeichen navigieren, mit Smart Podcast zuhören und Bilder direkt erzeugen. 300 kostenlose KI-Credits pro Monat für jedes Konto.'],
      ['Smart Redact', 'KI findet und entfernt sensible personenbezogene Daten in Ihren Dokumenten. Enthalten in PDF Editor+.'],
      ['Dokumenten­management (DMS)', 'Enthalten in PDF Editor und PDF Editor+: gemeinsame Arbeitsbereiche, Versionskontrolle, Check-in/Check-out-Sperre und unbegrenzter Cloud-Speicher.'],
      ['eSign integriert', 'PDF Editor+ enthält Foxit eSign mit 150 Umschlägen pro Jahr für Signatur- und Vertrags-Workflows; PDF Editor bietet Ausfüllen & Signieren.'],
      ['Zusammenarbeit', 'Live-Freigabe, Kommentare und gemeinsame Prüfungen — alle arbeiten am selben Dokument.'],
      ['Sicherheit', 'AES-256-Verschlüsselung, Passwortschutz und Schwärzen sowie Single Sign-on über OAuth 2.0 und Microsoft Entra ID.'],
    ],
    complianceLabel: 'Sicherheit & Compliance',
    integrationsLabel: 'Funktioniert mit Ihren gewohnten Tools',
    statsLabel: 'Foxit in Zahlen',
    stats: [
      ['700 Mio.+', 'Nutzer weltweit'],
      ['640.000+', 'Organisationen'],
      ['4,6', 'G2-Bewertung aus 55.000+ Rezensionen'],
      ['94 %', 'der Gartner-Rezensenten empfehlen Foxit'],
    ],
    source: 'Quelle: foxit.com/pdf-editor (Nov. 2026). Mobile Apps (iOS & Android) sind Teil von PDF Editor+.',
  },
  fr: {
    eyebrow: 'Au cœur de Foxit PDF Editor',
    title: 'Plus qu’un éditeur PDF —',
    accent: 'un flux documentaire complet',
    cards: [
      ['Assistant IA', 'Discutez avec vos documents, obtenez des résumés, naviguez avec les signets IA, écoutez avec Smart Podcast et générez des images sur place. 300 crédits IA gratuits par mois sur chaque compte.'],
      ['Smart Redact', 'L’IA repère et supprime les données personnelles sensibles de vos documents. Inclus dans PDF Editor+.'],
      ['Gestion documentaire (DMS)', 'Incluse dans PDF Editor et PDF Editor+ : espaces partagés, gestion des versions, verrouillage check-in/check-out et stockage cloud illimité.'],
      ['eSign intégré', 'PDF Editor+ inclut Foxit eSign avec 150 enveloppes par an pour les circuits de signature et d’accords ; PDF Editor permet de remplir et signer.'],
      ['Collaboration', 'Partage en direct, commentaires et révisions partagées — tout le monde travaille sur le même document.'],
      ['Sécurité', 'Chiffrement AES-256, protection par mot de passe et caviardage, plus authentification unique via OAuth 2.0 et Microsoft Entra ID.'],
    ],
    complianceLabel: 'Sécurité et conformité',
    integrationsLabel: 'Compatible avec vos outils habituels',
    statsLabel: 'Foxit en chiffres',
    stats: [
      ['700 M+', 'utilisateurs dans le monde'],
      ['640 000+', 'organisations'],
      ['4,6', 'note G2 sur plus de 55 000 avis'],
      ['94 %', 'des évaluateurs Gartner recommandent Foxit'],
    ],
    source: 'Source : foxit.com/pdf-editor (nov. 2026). Les applications mobiles (iOS et Android) font partie de PDF Editor+.',
  },
  es: {
    eyebrow: 'Dentro de Foxit PDF Editor',
    title: 'Más que un editor de PDF —',
    accent: 'un flujo documental completo',
    cards: [
      ['Asistente de IA', 'Converse con sus documentos, obtenga resúmenes, navegue con marcadores de IA, escuche con Smart Podcast y genere imágenes en el propio documento. 300 créditos de IA gratis al mes en cada cuenta.'],
      ['Smart Redact', 'La IA encuentra y elimina datos personales sensibles en sus documentos. Incluido en PDF Editor+.'],
      ['Gestión documental (DMS)', 'Incluida en PDF Editor y PDF Editor+: espacios compartidos, control de versiones, bloqueo check-in/check-out y almacenamiento ilimitado en la nube.'],
      ['eSign integrado', 'PDF Editor+ incluye Foxit eSign con 150 sobres al año para flujos de firma y acuerdos; PDF Editor permite rellenar y firmar.'],
      ['Colaboración', 'Uso compartido en directo, comentarios y revisiones compartidas — todos trabajan en el mismo documento.'],
      ['Seguridad', 'Cifrado AES-256, protección con contraseña y censura, además de inicio de sesión único con OAuth 2.0 y Microsoft Entra ID.'],
    ],
    complianceLabel: 'Seguridad y cumplimiento',
    integrationsLabel: 'Funciona con las herramientas que ya usa',
    statsLabel: 'Foxit en cifras',
    stats: [
      ['700 M+', 'usuarios en todo el mundo'],
      ['640.000+', 'organizaciones'],
      ['4,6', 'valoración en G2 con más de 55.000 reseñas'],
      ['94 %', 'de los revisores de Gartner recomiendan Foxit'],
    ],
    source: 'Fuente: foxit.com/pdf-editor (nov. 2026). Las apps móviles (iOS y Android) forman parte de PDF Editor+.',
  },
  nl: {
    eyebrow: 'Binnen Foxit PDF Editor',
    title: 'Meer dan een PDF-editor —',
    accent: 'een complete documentworkflow',
    cards: [
      ['AI-assistent', 'Chat met uw documenten, krijg samenvattingen, navigeer met AI-bladwijzers, luister met Smart Podcast en genereer afbeeldingen ter plekke. 300 gratis AI-credits per maand voor elk account.'],
      ['Smart Redact', 'AI vindt en verwijdert gevoelige persoonsgegevens in uw documenten. Inbegrepen bij PDF Editor+.'],
      ['Documentbeheer (DMS)', 'Inbegrepen bij PDF Editor en PDF Editor+: gedeelde werkruimtes, versiebeheer, check-in/check-out-vergrendeling en onbeperkte cloudopslag.'],
      ['eSign ingebouwd', 'PDF Editor+ bevat Foxit eSign met 150 enveloppen per jaar voor onderteken- en overeenkomstworkflows; PDF Editor biedt invullen & ondertekenen.'],
      ['Samenwerken', 'Live delen, opmerkingen en gedeelde reviews — iedereen werkt in hetzelfde document.'],
      ['Beveiliging', 'AES-256-versleuteling, wachtwoordbeveiliging en redigeren, plus single sign-on via OAuth 2.0 en Microsoft Entra ID.'],
    ],
    complianceLabel: 'Beveiliging en compliance',
    integrationsLabel: 'Werkt met de tools die u al gebruikt',
    statsLabel: 'Foxit in cijfers',
    stats: [
      ['700 mln+', 'gebruikers wereldwijd'],
      ['640.000+', 'organisaties'],
      ['4,6', 'G2-score uit 55.000+ reviews'],
      ['94%', 'van de Gartner-reviewers raadt Foxit aan'],
    ],
    source: 'Bron: foxit.com/pdf-editor (nov. 2026). Mobiele apps (iOS en Android) horen bij PDF Editor+.',
  },
  it: {
    eyebrow: 'Dentro Foxit PDF Editor',
    title: 'Più di un editor PDF —',
    accent: 'un flusso documentale completo',
    cards: [
      ['AI Assistant', 'Chatta con i tuoi documenti, ottieni riassunti, spostati con i segnalibri AI, ascolta con Smart Podcast e genera immagini direttamente nel documento. 300 crediti AI gratuiti al mese su ogni account.'],
      ['Smart Redact', 'L’AI trova e rimuove i dati personali sensibili nei tuoi documenti. Incluso in PDF Editor+.'],
      ['Gestione documentale (DMS)', 'Inclusa in PDF Editor e PDF Editor+: spazi di lavoro condivisi, controllo delle versioni, blocco check-in/check-out e archiviazione cloud illimitata.'],
      ['eSign integrato', 'PDF Editor+ include Foxit eSign con 150 buste all’anno per firme e flussi di approvazione; PDF Editor include compilazione e firma.'],
      ['Collaborazione', 'Condivisione in tempo reale, commenti e revisioni condivise — tutti lavorano sullo stesso documento.'],
      ['Sicurezza', 'Crittografia AES-256, protezione con password e oscuramento, oltre al single sign-on tramite OAuth 2.0 e Microsoft Entra ID.'],
    ],
    complianceLabel: 'Sicurezza e conformità',
    integrationsLabel: 'Funziona con gli strumenti che usi già',
    statsLabel: 'Foxit in cifre',
    stats: [
      ['700 mln+', 'utenti nel mondo'],
      ['640.000+', 'organizzazioni'],
      ['4,6', 'valutazione G2 da oltre 55.000 recensioni'],
      ['94%', 'dei recensori Gartner consiglia Foxit'],
    ],
    source: 'Fonte: foxit.com/pdf-editor (nov. 2026). Le app mobili (iOS e Android) fanno parte di PDF Editor+.',
  },
  pl: {
    eyebrow: 'Wewnątrz Foxit PDF Editor',
    title: 'Więcej niż edytor PDF —',
    accent: 'kompletny obieg dokumentów',
    cards: [
      ['Asystent AI', 'Rozmawiaj z dokumentami, otrzymuj streszczenia, poruszaj się dzięki zakładkom AI, słuchaj w Smart Podcast i generuj obrazy w miejscu. 300 darmowych kredytów AI miesięcznie na każdym koncie.'],
      ['Smart Redact', 'AI wyszukuje i usuwa wrażliwe dane osobowe z Twoich dokumentów. W zestawie z PDF Editor+.'],
      ['Zarządzanie dokumentami (DMS)', 'W PDF Editor i PDF Editor+: wspólne przestrzenie robocze, kontrola wersji, blokowanie check-in/check-out i nielimitowana przestrzeń w chmurze.'],
      ['Wbudowany eSign', 'PDF Editor+ zawiera Foxit eSign ze 150 kopertami rocznie do podpisów i obiegu umów; PDF Editor oferuje wypełnianie i podpisywanie.'],
      ['Współpraca', 'Udostępnianie na żywo, komentarze i wspólne recenzje — wszyscy pracują na tym samym dokumencie.'],
      ['Bezpieczeństwo', 'Szyfrowanie AES-256, ochrona hasłem i anonimizacja, a także logowanie jednokrotne przez OAuth 2.0 i Microsoft Entra ID.'],
    ],
    complianceLabel: 'Bezpieczeństwo i zgodność',
    integrationsLabel: 'Działa z narzędziami, których już używasz',
    statsLabel: 'Foxit w liczbach',
    stats: [
      ['700 mln+', 'użytkowników na świecie'],
      ['640 000+', 'organizacji'],
      ['4,6', 'ocena w G2 z ponad 55 000 opinii'],
      ['94%', 'recenzentów Gartnera poleca Foxit'],
    ],
    source: 'Źródło: foxit.com/pdf-editor (listopad 2026). Aplikacje mobilne (iOS i Android) są częścią PDF Editor+.',
  },
}

export default function FoxitMore() {
  const t = useT(T)
  return (
    <section className="section xtra" id="features">
      <div className="container">
        <span className="eyebrow" data-reveal>{t.eyebrow}</span>
        <h2 className="section-title xtra__title" data-reveal style={{ '--d': '0.06s' }}>
          {t.title} <span className="accent grad-text">{t.accent}</span>
        </h2>

        <div className="ctypes ctypes--3">
          {t.cards.map(([name, text], i) => (
            <div key={name} className="ctype spot" data-reveal style={{ '--d': `${(i % 3) * 0.05}s`, '--c': DOTS[i % DOTS.length] }}>
              <strong>{name}</strong>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <p className="xtra__label" data-reveal>{t.complianceLabel}</p>
        <ul className="xchips" data-reveal>
          {COMPLIANCE.map((c) => <li key={c}>{c}</li>)}
        </ul>

        <p className="xtra__label" data-reveal>{t.integrationsLabel}</p>
        <ul className="xchips" data-reveal>
          {INTEGRATIONS.map((c) => <li key={c}>{c}</li>)}
        </ul>

        <p className="xtra__label" data-reveal>{t.statsLabel}</p>
        <dl className="xstats" data-reveal>
          {t.stats.map(([n, label]) => (
            <div key={label}>
              <dt className="grad-text">{n}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
        <p className="xtra__source">{t.source}</p>
      </div>
    </section>
  )
}
