import { ChevronDown } from 'lucide-react'

export default function Select({ className = '', children, ...props }) {
  return (
    <div className={`relative ${className}`}>
      <select
        className="h-[38px] w-full appearance-none rounded-md border border-border-input bg-white pl-3 pr-8 text-xs text-text-secondary outline-none focus:border-primary"
        {...props}
      >
        {children}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted" />
    </div>
  )
}
