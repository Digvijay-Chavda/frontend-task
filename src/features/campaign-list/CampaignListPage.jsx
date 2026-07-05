import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Download, MoreVertical, Mail, Sparkles, RefreshCcw } from 'lucide-react'
import LinkedinIcon from '../../components/icons/LinkedinIcon'
import Select from '../../components/ui/Select'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import WorkflowModeModal from '../campaign-wizard/WorkflowModeModal'
import avatarPhoto from '../../assets/avatar-photo.png'
import emptyIllustration from '../../assets/empty-campaigns.png'
import { campaigns as allCampaigns } from '../../mock/campaigns'

export default function CampaignListPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [channel, setChannel] = useState('all')
  const [status, setStatus] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [openMenuId, setOpenMenuId] = useState(null)

  const filtered = useMemo(
    () => allCampaigns.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  )

  const startNewCampaign = () => setModalOpen(true)

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select className="w-full sm:w-40" value={channel} onChange={(e) => setChannel(e.target.value)}>
            <option value="all">All</option>
            <option value="linkedin">LinkedIn</option>
            <option value="email">Email</option>
          </Select>
          <div className="relative w-full sm:w-64">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <Input
              className="pl-9"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 rounded-lg bg-white py-20">
          <img src={emptyIllustration} alt="No campaigns found" className="w-48 sm:w-64" />
          <Button onClick={startNewCampaign}>New Campaign</Button>
        </div>

        <WorkflowModeModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onNext={() => navigate('/campaign/new')}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-dark">All Campaigns List</h1>
          <p className="text-sm text-body">A quick look at all of your outreach initiatives.</p>
        </div>
        <Button onClick={startNewCampaign}>New Campaign</Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          <Select className="w-full sm:w-40" value={channel} onChange={(e) => setChannel(e.target.value)}>
            <option value="all">Channel</option>
            <option value="linkedin">LinkedIn</option>
            <option value="email">Email</option>
          </Select>
          <Select className="w-full sm:w-40" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">Status</option>
            <option value="running">Running</option>
            <option value="paused">Paused</option>
          </Select>
          <Button variant="outline" size="sm" onClick={() => { setChannel('all'); setStatus('all'); setSearch('') }}>
            Clear All
          </Button>
        </div>
        <button className="flex items-center gap-2 text-sm text-link">
          <Download size={16} /> Export List
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[#EBE9F1] bg-white">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#EBE9F1] text-xs uppercase text-muted">
              <th className="w-10 p-4">
                <input type="checkbox" className="size-4 accent-link" />
              </th>
              <th className="p-4 font-medium">All Campaigns</th>
              <th className="p-4 font-medium">CRM</th>
              <th className="p-4 font-medium">Invites Sent</th>
              <th className="p-4 font-medium">Reply Rate</th>
              <th className="p-4 font-medium">Email Sent</th>
              <th className="p-4 font-medium">Sender</th>
              <th className="p-4 font-medium">Status</th>
              <th className="w-10 p-4" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-[#EBE9F1] last:border-0 hover:bg-gray-50">
                <td className="p-4">
                  <input type="checkbox" className="size-4 accent-link" />
                </td>
                <td className="p-4">
                  <p className="flex items-center gap-2 font-medium text-dark">
                    {c.name}
                    <LinkedinIcon size={14} className="text-link" />
                    <Mail size={14} className="text-muted" />
                  </p>
                  <p className="text-xs text-muted">Created On: 21 Jan, 2026</p>
                </td>
                <td className="p-4">
                  {c.crm === 'synced' ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-warning">
                      <Sparkles size={12} /> Synced
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-link">
                      <RefreshCcw size={12} /> Sync to CRM
                    </span>
                  )}
                  <p className="mt-0.5 text-xs text-muted">{c.createdAgo}</p>
                </td>
                <td className="p-4">
                  <p className="text-dark">{c.invitesSent}</p>
                  <p className="text-xs text-muted">{c.inviteAcceptedPct}% Accepted</p>
                </td>
                <td className="p-4">
                  <p className="text-dark">{c.replyRate}</p>
                  <p className="text-xs text-muted">{c.replyReceivedPct}% Received</p>
                </td>
                <td className="p-4">
                  <p className="text-dark">{c.emailSent}</p>
                  <p className="text-xs text-muted">{c.mailOpenedPct}% Mail Opened</p>
                </td>
                <td className="p-4">
                  <div className="flex -space-x-2">
                    <img src={avatarPhoto} className="size-7 rounded-full border-2 border-white object-cover" alt="" />
                    <img src={avatarPhoto} className="size-7 rounded-full border-2 border-white object-cover" alt="" />
                  </div>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => navigate(`/campaign/${c.id}/stats`)}
                    className="mb-1 block rounded-full bg-success-bg px-2.5 py-1 text-xs font-medium text-success"
                  >
                    ⏸ Running
                  </button>
                  <p className="text-xs text-muted">{c.dailyLimit} invites/day</p>
                </td>
                <td className="relative p-4">
                  <button onClick={() => setOpenMenuId(openMenuId === c.id ? null : c.id)} className="text-muted">
                    <MoreVertical size={16} />
                  </button>
                  {openMenuId === c.id && (
                    <div className="absolute right-4 top-10 z-10 w-40 rounded-md border border-[#EBE9F1] bg-white py-1 text-sm shadow-lg">
                      <button
                        onClick={() => navigate(`/campaign/${c.id}/stats`)}
                        className="block w-full px-3 py-2 text-left text-text-secondary hover:bg-gray-50"
                      >
                        View Analytics
                      </button>
                      <button className="block w-full px-3 py-2 text-left text-text-secondary hover:bg-gray-50">Edit Sequence</button>
                      <button className="block w-full px-3 py-2 text-left text-text-secondary hover:bg-gray-50">Duplicate</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <WorkflowModeModal open={modalOpen} onClose={() => setModalOpen(false)} onNext={() => navigate('/campaign/new')} />
    </div>
  )
}
