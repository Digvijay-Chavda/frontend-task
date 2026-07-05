import { useState } from 'react'
import { LayoutTemplate, ListOrdered } from 'lucide-react'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'

const OPTIONS = [
  {
    id: 'advanced',
    title: 'Advanced Workflow',
    recommended: true,
    desc: 'Best for high-volume outreach',
    points: ['Conditional logic', 'Multiple paths', 'More control'],
    icon: LayoutTemplate,
  },
  {
    id: 'standard',
    title: 'Standard Workflow',
    desc: 'Best for beginners',
    points: ['Linear steps', 'No conditions', 'Easy Setup'],
    icon: ListOrdered,
  },
]

export default function WorkflowModeModal({ open, onClose, onNext }) {
  const [selected, setSelected] = useState('advanced')

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Select Workflow Mode"
      subtitle="Choose how you want your campaign to behave"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onNext(selected)}>Next</Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {OPTIONS.map((opt) => (
          <label
            key={opt.id}
            className={`flex cursor-pointer items-start justify-between gap-4 rounded-md border p-4 ${
              selected === opt.id ? 'border-link bg-[#F5F8FF]' : 'border-border-input'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="workflow-mode"
                checked={selected === opt.id}
                onChange={() => setSelected(opt.id)}
                className="mt-1 size-4 accent-link"
              />
              <div>
                <p className="flex items-center gap-2 font-medium text-dark">
                  {opt.title}
                  {opt.recommended && <Badge tone="success">Recommended</Badge>}
                </p>
                <p className="mt-1 text-sm text-body">{opt.desc}</p>
                <ul className="mt-2 flex flex-wrap gap-3 text-xs text-muted">
                  {opt.points.map((p) => (
                    <li key={p} className="flex items-center gap-1">
                      <span className="size-1 rounded-full bg-muted" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <opt.icon size={40} className="hidden shrink-0 text-link sm:block" />
          </label>
        ))}
      </div>
    </Modal>
  )
}
