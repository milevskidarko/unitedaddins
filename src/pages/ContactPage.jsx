import Contact from '../components/Contact.jsx'
import { useQuote } from '../quote.js'

export default function ContactPage() {
  const { quote, setQuote } = useQuote()
  return (
    <div className="page">
      <Contact quote={quote} setQuote={setQuote} />
    </div>
  )
}
