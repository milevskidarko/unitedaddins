import Foxit from '../components/Foxit.jsx'
import FoxitCompare from '../components/FoxitCompare.jsx'
import PlanFinder from '../components/PlanFinder.jsx'
import { useQuote } from '../quote.js'

export default function FoxitPage() {
  const { addToQuote } = useQuote()
  return (
    <div className="page">
      <Foxit onAddToQuote={addToQuote} />
      <FoxitCompare onAddToQuote={addToQuote} />
      <PlanFinder onAddToQuote={addToQuote} />
    </div>
  )
}
