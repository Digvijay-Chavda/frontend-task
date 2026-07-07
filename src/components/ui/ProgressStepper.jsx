import { ChevronRight } from 'lucide-react'

export default function ProgressStepper({ steps, activeIndex, onStepClick }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-md border border-[#EBE9F1] px-4 py-3 sm:gap-6 sm:px-6">
      {steps.map((step, index) => {
        const isActive = index === activeIndex
        const isDone = index < activeIndex
        const Icon = step.icon
        const clickable = index <= activeIndex
        return (
          <div key={step.key} className="flex items-center gap-3 sm:gap-6">
            <button
              type="button"
              disabled={!clickable}
              onClick={() => clickable && onStepClick?.(index)}
              className={`flex items-center gap-2 ${clickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
            >
              <span
                className={`flex size-[38px] shrink-0 items-center justify-center rounded-[5px] ${
                  isActive
                    ? 'bg-link text-white'
                    : isDone
                      ? 'bg-[#D0DCFF] text-link'
                      : 'bg-[#E8E8E8] text-text-secondary'
                }`}
              >
                <Icon size={18} />
              </span>
              <span className={`hidden text-[15px] font-medium sm:inline ${index <= activeIndex ? 'text-[#444050]' : 'text-text-secondary'}`}>
                {step.label}
              </span>
            </button>
            {index < steps.length - 1 && <ChevronRight size={20} className="hidden text-muted sm:block" />}
          </div>
        )
      })}
    </div>
  )
}
