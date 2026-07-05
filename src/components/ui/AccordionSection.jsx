import { ChevronUp, ChevronDown, Check } from 'lucide-react'

export default function AccordionSection({ title, badge, status = 'pending', open, onToggle, children }) {
  return (
    <div className="relative mb-4 pl-6">
      <span
        className={`absolute left-0 top-[18px] flex size-3.5 items-center justify-center rounded-full ${
          status === 'done'
            ? 'bg-success'
            : status === 'current'
              ? 'border-2 border-link bg-white'
              : 'border-2 border-border-input bg-white'
        }`}
      >
        {status === 'done' && <Check size={9} className="text-white" strokeWidth={3} />}
      </span>
      <div className="rounded-[5px] border border-[#E7EDF6]">
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center justify-between px-4 py-3.5 text-left"
        >
          <span className="flex items-center gap-2 text-[15px] font-medium text-[#444050]">
            {title}
            {badge && <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-normal text-muted">{badge}</span>}
          </span>
          {open ? <ChevronUp size={20} className="text-muted" /> : <ChevronDown size={20} className="text-muted" />}
        </button>
        {open && <div className="border-t border-[#E7EDF6] p-4 sm:p-6">{children}</div>}
      </div>
    </div>
  )
}
