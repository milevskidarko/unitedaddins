import Mekko from '../components/Mekko.jsx'
import { useQuote } from '../quote.js'

export default function MekkoPage() {
  const { addToQuote } = useQuote()
  return (
    <div className="page">
      <Mekko onAddToQuote={addToQuote} />
    </div>
  )
}
