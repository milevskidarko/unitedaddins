import { L } from '../i18n.jsx'
import { Arrow } from './Icons.jsx'
import './Products.css'

// Monogram tile in the product's colour (we don't use vendor logos we haven't been given).
export function Mark({ product, size = 'md' }) {
  return (
    <span className={`pmark pmark--${size}`} style={{ '--tone': product.tone }} aria-hidden="true">
      {product.mark}
    </span>
  )
}

export default function ProductCard({ product, text, href, delay = 0 }) {
  return (
    <L to={href} className="pcard spot" data-reveal style={{ '--d': `${delay}s`, '--tone': product.tone }}>
      <Mark product={product} />
      <span className="pcard__body">
        <strong>{product.name}</strong>
        <small className="pcard__vendor">{product.vendor}</small>
        <span className="pcard__text">{text}</span>
      </span>
      <Arrow className="pcard__arrow" />
    </L>
  )
}
