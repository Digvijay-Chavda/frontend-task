import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, subtitle, children, footer, width = 'max-w-[600px]' }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 sm:p-6">
      <div className={`flex max-h-full w-full ${width} flex-col overflow-hidden rounded-lg bg-white shadow-xl`}>
        <div className="flex items-start justify-between gap-4 border-b border-[#EBE9F1] bg-[#FAFAFA] px-6 py-5">
          <div>
            {title && <h2 className="text-lg font-medium text-dark">{title}</h2>}
            {subtitle && <p className="mt-1 text-sm text-body">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border-input text-muted hover:bg-gray-100"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
        {footer && <div className="flex justify-end gap-3 border-t border-[#EBE9F1] px-6 py-4">{footer}</div>}
      </div>
    </div>
  )
}
