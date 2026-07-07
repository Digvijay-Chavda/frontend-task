import { Check } from 'lucide-react'
import linkedinIcon from '../../assets/linkedin-01.png'
import calendarIcon from '../../assets/calendar-04.png'
import userListIcon from '../../assets/user-list.png'

const METHODS = [
  {
    id: 'linkedin',
    icon: linkedinIcon,
    title: ['LinkedIn', 'Search'],
    desc: '(Basic, Sales Nav, Post, Group or Event URL)',
  },
  {
    id: 'csv',
    icon: calendarIcon,
    title: ['Upload', 'CSV File'],
    desc: 'Upload LinkedIn profiles via CSV.',
    link: 'Download Sample',
  },
  {
    id: 'lookalike',
    icon: userListIcon,
    title: ['Lookalike', 'Audience'],
    desc: 'Use Lead Finder to find audience.',
  },
  {
    id: 'webhook',
    icon: linkedinIcon,
    title: ['Inbound', 'Webhook'],
    desc: 'Sync leads from zapier, n8n make in real time',
  },
]

export default function ImportMethodCards({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {METHODS.map((method) => {
        const isSelected = selected === method.id
        return (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelect(method.id)}
            className={`relative flex h-[148px] flex-col items-start rounded-lg border bg-[#F9FBFF] p-3 text-left transition ${
              isSelected ? 'border-link ring-1 ring-link' : 'border-[#EAEFFF] hover:border-link/50'
            }`}
          >
            {isSelected && (
              <span className="absolute right-2 top-2 flex size-4 items-center justify-center rounded-sm bg-link text-white">
                <Check size={11} strokeWidth={3} />
              </span>
            )}
            <img src={method.icon} alt="" className="size-[18px] object-contain" />
            <p className="mt-4 text-sm font-semibold text-text-secondary">
              {method.title[0]} {method.title[1]}
            </p>
            <p className="mt-2 text-xs text-text-secondary">
              {method.desc}{' '}
              {method.link && <span className="bg-primary-gradient bg-clip-text font-medium text-transparent">{method.link}</span>}
            </p>
          </button>
        )
      })}
    </div>
  )
}
