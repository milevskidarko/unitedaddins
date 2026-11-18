import { createContext, useContext } from 'react'

// Quote builder state, shared by the plan finder, the product pages and the contact form.
export const QuoteContext = createContext(null)
export const useQuote = () => useContext(QuoteContext)
