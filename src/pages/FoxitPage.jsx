import Foxit from '../components/Foxit.jsx'
import FoxitVideos from '../components/FoxitVideos.jsx'
import FoxitCompare from '../components/FoxitCompare.jsx'
import FoxitMore from '../components/FoxitMore.jsx'
import FoxitPartner from '../components/FoxitPartner.jsx'
import PlanFinder from '../components/PlanFinder.jsx'
import { useQuote } from '../quote.js'

export default function FoxitPage() {
  const { addToQuote } = useQuote()
  return (
    <div className="page">
      <Foxit onAddToQuote={addToQuote} />
      <FoxitPartner />
      <FoxitVideos />
      <FoxitCompare onAddToQuote={addToQuote} />
      <FoxitMore />
      <PlanFinder onAddToQuote={addToQuote} />
    </div>
  )
}
