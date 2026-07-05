import { useEffect, useState } from 'react'
import { Mail, Plus, Check } from 'lucide-react'
import Button from '../../../components/ui/Button'
import LinkedinIcon from '../../../components/icons/LinkedinIcon'

const SENDERS = [
  { id: 'linkedin-john', name: 'John Doe', type: 'LinkedIn', detail: 'johndoe@gmail.com', icon: LinkedinIcon },
  { id: 'email-john', name: 'John Doe', type: 'Email', detail: 'johndoe@gmail.com', icon: Mail },
]

export default function SenderProfilesStep({ onValidChange }) {
  const [selected, setSelected] = useState(new Set(['linkedin-john']))

  useEffect(() => {
    onValidChange(selected.size > 0)
  }, [selected, onValidChange])

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="rounded-[5px] border border-[#E7EDF6] p-4 sm:p-6">
      <h3 className="mb-1 text-[15px] font-medium text-[#444050]">Select Sender Profiles</h3>
      <p className="mb-4 text-sm text-body">Choose which connected accounts will send this campaign's outreach.</p>
      <div className="flex flex-col gap-3">
        {SENDERS.map((sender) => {
          const isSelected = selected.has(sender.id)
          return (
            <button
              key={sender.id}
              type="button"
              onClick={() => toggle(sender.id)}
              className={`flex items-center justify-between rounded-md border p-4 text-left ${
                isSelected ? 'border-link bg-[#F5F8FF]' : 'border-border-input'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-link/10 text-link">
                  <sender.icon size={16} />
                </span>
                <div>
                  <p className="text-sm font-medium text-dark">{sender.name}</p>
                  <p className="text-xs text-muted">
                    {sender.type} · {sender.detail}
                  </p>
                </div>
              </div>
              {isSelected && (
                <span className="flex size-5 items-center justify-center rounded-full bg-link text-white">
                  <Check size={12} strokeWidth={3} />
                </span>
              )}
            </button>
          )
        })}
        <Button variant="outline" className="w-fit">
          <Plus size={14} /> Connect New Account
        </Button>
      </div>
    </div>
  )
}
