import { ProductWithSeller } from "@/services/products"

export default function FinancingBadge({ type, className }: { type: ProductWithSeller['financing_option']; className?: string }) {
  switch (type) {
    case 'cash':
      return (
        <span className={`bg-green-700 px-3 py-1 ${className ? className : 'rounded-lg text-xs font-medium'}`}>
          💰 Cash Only
        </span>
      )
    case 'finance':
      return (
        <span className={`bg-blue-700 px-3 py-1 ${className ? className : 'rounded-lg text-xs font-medium'}`}>
          🏦 Financing
        </span>
      )
    case 'both':
      return (
        <span className={`bg-purple-700 px-3 py-1 ${className ? className : 'rounded-lg text-xs font-medium'}`}>
          💰🏦 Cash/Finance
        </span>
      )
    default:
      return null
  }
}
