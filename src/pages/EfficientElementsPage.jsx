import EfficientElements from '../components/EfficientElements.jsx'
import EEMore from '../components/EEMore.jsx'
import { useQuote } from '../quote.js'

export default function EfficientElementsPage() {
  const { addToQuote } = useQuote()
  return (
    <div className="page">
      <EfficientElements onAddToQuote={addToQuote} />
      <EEMore />
    </div>
  )
}
