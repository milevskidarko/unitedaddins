import Mekko from '../components/Mekko.jsx'
import MekkoMore from '../components/MekkoMore.jsx'
import MekkoVideo from '../components/MekkoVideo.jsx'
import { useQuote } from '../quote.js'

export default function MekkoPage() {
  const { addToQuote } = useQuote()
  return (
    <div className="page">
      <Mekko onAddToQuote={addToQuote} />
      <MekkoMore />
      <MekkoVideo />
    </div>
  )
}
