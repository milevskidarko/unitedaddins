import { Arrow, Check, Close } from './Icons.jsx'
import { useT } from '../i18n.jsx'
import './Extras.css'

// Foxit PDF Editor+ vs Adobe Acrobat Pro — from foxit.com/pdf-editor/#comparison (Foxit's own
// comparison, US product information as of July 2026). Prices left out on purpose (no prices on the site).
// [Foxit, Acrobat] per row, same order as `rows` below.
const MARKS = [
  [true, true],
  [true, true],
  [true, true],
  [true, true],
  [true, true],
  [true, true],
  [true, false],
  [true, false],
  [true, false],
]

const T = {
  en: {
    eyebrow: 'Foxit vs. Adobe',
    title: 'Feature for feature with',
    accent: 'Acrobat Pro',
    lead: 'Foxit PDF Editor+ covers the everyday PDF work of Adobe Acrobat Pro — and adds features Acrobat Pro does not include, at a lower price per user.',
    feature: 'Feature',
    yes: 'Included',
    no: 'Not included',
    rows: [
      'Edit, convert and organize PDFs',
      'OCR for scanned documents',
      'Forms, redaction and password security',
      'Comments and shared reviews',
      'AI Assistant',
      'Collaborative document workspace',
      'Document management (DMS) with versioning, retention rules and audit trails',
      'AI-powered redaction (Smart Redact)',
      'Perpetual license option (Foxit PDF Editor)',
    ],
    add: 'Add PDF Editor+ to quote',
    source: 'Source: foxit.com, based on published US product information (July 2026). Adobe and Acrobat are trademarks of Adobe Inc.',
  },
  de: {
    eyebrow: 'Foxit vs. Adobe',
    title: 'Funktion für Funktion mit',
    accent: 'Acrobat Pro',
    lead: 'Foxit PDF Editor+ deckt die tägliche PDF-Arbeit von Adobe Acrobat Pro ab — und bietet Funktionen, die Acrobat Pro nicht enthält, zu einem niedrigeren Preis pro Nutzer.',
    feature: 'Funktion',
    yes: 'Enthalten',
    no: 'Nicht enthalten',
    rows: [
      'PDFs bearbeiten, konvertieren und organisieren',
      'OCR für gescannte Dokumente',
      'Formulare, Schwärzen und Passwortschutz',
      'Kommentare und gemeinsame Prüfungen',
      'KI-Assistent',
      'Gemeinsamer Dokumentarbeitsbereich',
      'Dokumentenmanagement (DMS) mit Versionierung, Aufbewahrungsregeln und Prüfprotokollen',
      'KI-gestütztes Schwärzen (Smart Redact)',
      'Dauerlizenz verfügbar (Foxit PDF Editor)',
    ],
    add: 'PDF Editor+ zum Angebot hinzufügen',
    source: 'Quelle: foxit.com, basierend auf veröffentlichten US-Produktinformationen (Juli 2026). Adobe und Acrobat sind Marken von Adobe Inc.',
  },
  fr: {
    eyebrow: 'Foxit vs Adobe',
    title: 'Fonction par fonction face à',
    accent: 'Acrobat Pro',
    lead: 'Foxit PDF Editor+ couvre le travail PDF quotidien d’Adobe Acrobat Pro — et ajoute des fonctions qu’Acrobat Pro n’inclut pas, pour un prix par utilisateur inférieur.',
    feature: 'Fonction',
    yes: 'Inclus',
    no: 'Non inclus',
    rows: [
      'Modifier, convertir et organiser des PDF',
      'OCR pour les documents numérisés',
      'Formulaires, caviardage et protection par mot de passe',
      'Commentaires et révisions partagées',
      'Assistant IA',
      'Espace de travail collaboratif',
      'Gestion documentaire (DMS) avec versions, règles de conservation et pistes d’audit',
      'Caviardage par IA (Smart Redact)',
      'Licence perpétuelle disponible (Foxit PDF Editor)',
    ],
    add: 'Ajouter PDF Editor+ au devis',
    source: 'Source : foxit.com, d’après les informations produit publiées aux États-Unis (juillet 2026). Adobe et Acrobat sont des marques d’Adobe Inc.',
  },
  es: {
    eyebrow: 'Foxit vs. Adobe',
    title: 'Función por función frente a',
    accent: 'Acrobat Pro',
    lead: 'Foxit PDF Editor+ cubre el trabajo diario con PDF de Adobe Acrobat Pro — y añade funciones que Acrobat Pro no incluye, a un precio por usuario más bajo.',
    feature: 'Función',
    yes: 'Incluido',
    no: 'No incluido',
    rows: [
      'Editar, convertir y organizar PDF',
      'OCR para documentos escaneados',
      'Formularios, censura y protección con contraseña',
      'Comentarios y revisiones compartidas',
      'Asistente de IA',
      'Espacio de trabajo colaborativo',
      'Gestión documental (DMS) con versiones, reglas de retención y registros de auditoría',
      'Censura con IA (Smart Redact)',
      'Opción de licencia perpetua (Foxit PDF Editor)',
    ],
    add: 'Añadir PDF Editor+ al presupuesto',
    source: 'Fuente: foxit.com, según la información de producto publicada en EE. UU. (julio de 2026). Adobe y Acrobat son marcas comerciales de Adobe Inc.',
  },
  nl: {
    eyebrow: 'Foxit vs. Adobe',
    title: 'Functie voor functie met',
    accent: 'Acrobat Pro',
    lead: 'Foxit PDF Editor+ dekt het dagelijkse PDF-werk van Adobe Acrobat Pro — en voegt functies toe die Acrobat Pro niet heeft, voor een lagere prijs per gebruiker.',
    feature: 'Functie',
    yes: 'Inbegrepen',
    no: 'Niet inbegrepen',
    rows: [
      'PDF’s bewerken, converteren en ordenen',
      'OCR voor gescande documenten',
      'Formulieren, redigeren en wachtwoordbeveiliging',
      'Opmerkingen en gedeelde reviews',
      'AI-assistent',
      'Gezamenlijke documentwerkruimte',
      'Documentbeheer (DMS) met versiebeheer, bewaarregels en audittrails',
      'Redigeren met AI (Smart Redact)',
      'Eeuwigdurende licentie mogelijk (Foxit PDF Editor)',
    ],
    add: 'PDF Editor+ toevoegen aan offerte',
    source: 'Bron: foxit.com, op basis van gepubliceerde Amerikaanse productinformatie (juli 2026). Adobe en Acrobat zijn handelsmerken van Adobe Inc.',
  },
  it: {
    eyebrow: 'Foxit vs. Adobe',
    title: 'Confronto funzione per funzione con',
    accent: 'Acrobat Pro',
    lead: 'Foxit PDF Editor+ copre il lavoro quotidiano sui PDF di Adobe Acrobat Pro — e aggiunge funzioni che Acrobat Pro non include, a un prezzo per utente più basso.',
    feature: 'Funzione',
    yes: 'Inclusa',
    no: 'Non inclusa',
    rows: [
      'Modifica, conversione e organizzazione dei PDF',
      'OCR per documenti scansionati',
      'Moduli, oscuramento e protezione con password',
      'Commenti e revisioni condivise',
      'AI Assistant',
      'Spazio di lavoro collaborativo sui documenti',
      'Gestione documentale (DMS) con versioni, regole di conservazione e audit trail',
      'Oscuramento basato sull’AI (Smart Redact)',
      'Opzione di licenza perpetua (Foxit PDF Editor)',
    ],
    add: 'Aggiungi PDF Editor+ al preventivo',
    source: 'Fonte: foxit.com, in base alle informazioni pubblicate sui prodotti per gli USA (luglio 2026). Adobe e Acrobat sono marchi di Adobe Inc.',
  },
  pl: {
    eyebrow: 'Foxit vs. Adobe',
    title: 'Porównanie funkcji z',
    accent: 'Acrobat Pro',
    lead: 'Foxit PDF Editor+ obejmuje codzienną pracę z PDF, którą oferuje Adobe Acrobat Pro — i dodaje funkcje, których Acrobat Pro nie ma, w niższej cenie za użytkownika.',
    feature: 'Funkcja',
    yes: 'W zestawie',
    no: 'Brak',
    rows: [
      'Edycja, konwersja i porządkowanie PDF',
      'OCR dla zeskanowanych dokumentów',
      'Formularze, anonimizacja i ochrona hasłem',
      'Komentarze i wspólne recenzje',
      'Asystent AI',
      'Wspólna przestrzeń robocza dla dokumentów',
      'Zarządzanie dokumentami (DMS) z wersjonowaniem, zasadami przechowywania i ścieżkami audytu',
      'Anonimizacja oparta na AI (Smart Redact)',
      'Opcja licencji wieczystej (Foxit PDF Editor)',
    ],
    add: 'Dodaj PDF Editor+ do wyceny',
    source: 'Źródło: foxit.com, na podstawie opublikowanych informacji o produktach na rynek USA (lipiec 2026). Adobe i Acrobat są znakami towarowymi Adobe Inc.',
  },
}

const Mark = ({ on, t }) =>
  on ? (
    <span className="cmp__yes"><Check /><span className="sr-only">{t.yes}</span></span>
  ) : (
    <span className="cmp__no"><Close /><span className="sr-only">{t.no}</span></span>
  )

export default function FoxitCompare({ onAddToQuote }) {
  const t = useT(T)
  return (
    <section className="section xtra" id="comparison">
      <div className="container">
        <span className="eyebrow" data-reveal>{t.eyebrow}</span>
        <h2 className="section-title xtra__title" data-reveal style={{ '--d': '0.06s' }}>
          {t.title} <span className="accent grad-text">{t.accent}</span>
        </h2>
        <p className="section-lead" data-reveal style={{ '--d': '0.1s' }}>{t.lead}</p>

        <div className="cmp" data-reveal style={{ '--d': '0.14s' }}>
          <table>
            <thead>
              <tr>
                <th scope="col">{t.feature}</th>
                <th scope="col" className="cmp__foxit">Foxit PDF Editor+</th>
                <th scope="col">Adobe Acrobat Pro</th>
              </tr>
            </thead>
            <tbody>
              {t.rows.map((row, i) => (
                <tr key={row}>
                  <th scope="row">{row}</th>
                  <td className="cmp__foxit"><Mark on={MARKS[i][0]} t={t} /></td>
                  <td><Mark on={MARKS[i][1]} t={t} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="xtra__foot">
          <button type="button" className="btn btn-primary btn-sm" onClick={() => onAddToQuote(['Foxit PDF Editor+'])}>
            {t.add} <Arrow />
          </button>
          <p className="xtra__source">{t.source}</p>
        </div>
      </div>
    </section>
  )
}
