import { useEffect, useMemo, useState } from 'react'
import { Mail, Plus, Search } from 'lucide-react'
import Button from '../../../components/ui/Button'
import Select from '../../../components/ui/Select'
import Input from '../../../components/ui/Input'
import Badge from '../../../components/ui/Badge'
import linkedinLogo from '../../../assets/linkedin icon.png'
import { linkedInProfiles, emailAccounts } from '../../../mock/senderProfiles'

function HealthRing({ value }) {
  const r = 16
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - value / 100)
  return (
    <span className="relative inline-flex size-10 items-center justify-center">
      <svg width="40" height="40" viewBox="0 0 40 40" className="-rotate-90">
        <circle cx="20" cy="20" r={r} fill="none" stroke="#EBE9F1" strokeWidth="4" />
        <circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          stroke="#FF9F43"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute text-xs font-semibold text-dark">{value}</span>
    </span>
  )
}

const TABS = [
  { key: 'linkedin', label: 'LinkedIn Profile' },
  { key: 'email', label: 'Email Accounts' },
]

export default function SenderProfilesStep({ onValidChange }) {
  const [tab, setTab] = useState('linkedin')
  const [selected, setSelected] = useState(new Set(['edgar-jones']))
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')

  useEffect(() => {
    onValidChange(selected.size > 0)
  }, [selected, onValidChange])

  const rows = tab === 'linkedin' ? linkedInProfiles : emailAccounts
  const isLinkedin = tab === 'linkedin'

  const filtered = useMemo(
    () => rows.filter((row) => row.name.toLowerCase().includes(search.toLowerCase())).slice(0, pageSize),
    [rows, search, pageSize],
  )

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

  const allSelected = filtered.length > 0 && filtered.every((row) => selected.has(row.id))
  const toggleAll = () => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (allSelected) {
        filtered.forEach((row) => next.delete(row.id))
      } else {
        filtered.forEach((row) => next.add(row.id))
      }
      return next
    })
  }

  return (
    <div className="rounded-[5px] border border-[#E7EDF6]">
      <div className="flex gap-6 border-b border-[#E7EDF6] px-4 sm:px-6">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`-mb-px border-b-2 py-3 text-sm font-medium transition ${
              tab === t.key ? 'border-link text-link' : 'border-transparent text-muted hover:text-text-secondary'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-6">
        <div className="flex items-start gap-2">
          {isLinkedin ? (
            <img src={linkedinLogo} alt="" className="mt-0.5 size-[18px] object-contain" />
          ) : (
            <Mail size={18} className="mt-0.5 text-link" />
          )}
          <div>
            <h3 className="text-[15px] font-semibold text-dark">{isLinkedin ? 'LinkedIn Profile' : 'Email Accounts'}</h3>
            <p className="mt-1 text-sm text-body">
              {isLinkedin
                ? 'Pick which LinkedIn profiles you want to use for the campaign.'
                : 'Pick which email accounts you want to use for the campaign.'}
            </p>
          </div>
        </div>
        <Button size="sm" className="shrink-0">
          <Plus size={14} /> Add Account
        </Button>
      </div>

      <div className="flex flex-col gap-3 px-4 pb-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          Show
          <Select className="w-[76px]" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </Select>
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <Input className="pl-9" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="overflow-x-auto rounded-lg border border-[#EBE9F1]">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#EBE9F1] bg-[#F3F2F7] text-[12px] font-semibold uppercase tracking-[1px] text-text-secondary">
                <th className="w-10 p-4">
                  <input
                    type="checkbox"
                    className="size-5 rounded-md border-border-input accent-link"
                    checked={allSelected}
                    onChange={toggleAll}
                  />
                </th>
                <th className="p-4">Name</th>
                <th className="p-4">Health</th>
                <th className="p-4">Daily Limits</th>
                <th className="p-4">Account Type</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="border-b border-[#EBE9F1] last:border-0 hover:bg-gray-50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="size-5 rounded-md border-border-input accent-link"
                      checked={selected.has(row.id)}
                      onChange={() => toggle(row.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={row.avatar} alt="" className="size-9 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-semibold text-text-secondary">{row.name}</p>
                        <p className="text-xs text-muted">{row.connections}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <HealthRing value={row.health} />
                  </td>
                  <td className="p-4">
                    <span className="block w-fit rounded-md border border-border-input px-3 py-1.5 text-xs text-muted">
                      Invites: {row.dailyInvites} / day
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-2 text-sm text-text-secondary">
                      {isLinkedin ? (
                        <img src={linkedinLogo} alt="" className="size-4 object-contain" />
                      ) : (
                        <Mail size={16} className="text-link" />
                      )}
                      {row.accountType}
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge tone="success">{row.status}</Badge>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-sm text-muted">
                    No accounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
