import { useState } from 'react'
import { Pause, Pencil, Zap, ExternalLink, Asterisk } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import avatarPhoto from '../../assets/avatar-photo.png'
import ReplyAnalysisGauge from './ReplyAnalysisGauge'
import CampaignOverviewChart from './CampaignOverviewChart'
import { campaignActions, replyPerformance, recentActivity, replyAnalysis } from '../../mock/statsData'

function ChannelToggle() {
  const [active, setActive] = useState('LinkedIn')
  return (
    <div className="flex rounded-md border border-[#EBE9F1] bg-[#F3F2F7] p-0.5 text-xs">
      {['LinkedIn', 'Email'].map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => setActive(c)}
          className={`rounded px-3 py-1 font-medium transition ${
            active === c ? 'bg-white text-text-secondary shadow-sm' : 'text-muted'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  )
}

export default function StatsPage({ campaignName = 'Tech Founder', embedded = false }) {
  return (
    <div className="flex flex-col gap-4">
      {!embedded && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full max-w-xs">
            <select className="h-[38px] w-full rounded-md border border-border-input px-3 text-xs text-text-secondary">
              <option>All</option>
            </select>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-4">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-[15px] font-semibold text-dark">
                  <Zap size={14} className="text-link" /> {campaignName}
                </p>
                <div className="mt-1 flex gap-2">
                  <span className="rounded-md bg-[#EDF2FC] px-2 py-1 text-xs font-medium text-[#5269AB]">LinkedIn</span>
                  <span className="rounded-md bg-[#EDF2FC] px-2 py-1 text-xs font-medium text-[#5269AB]">Email</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone="success">⚡ Running</Badge>
                <Pause size={16} className="text-muted" />
                <Pencil size={16} className="text-muted" />
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-[#F8F8F8] p-4">
              <div className="h-2 w-full overflow-hidden rounded-full bg-white">
                <div className="h-full w-[37%] rounded-full bg-primary-gradient" />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
                <span className="font-semibold text-dark">Created: 8 Jan, 2026</span>
                <span className="h-4 w-px bg-border-input" />
                <span className="inline-flex items-center gap-1 rounded-md bg-[#E5F8EE] px-2 py-1 font-medium text-[#549A75]">
                  <Asterisk size={13} className="text-warning" /> CRM Connected
                </span>
                <span className="ml-auto font-semibold text-text-secondary">74 / 200 prospects processed</span>
              </div>
            </div>
          </Card>

          <Card title="Campaign Overview" action={<div className="flex gap-2 text-xs text-muted"><span className="rounded bg-gray-100 px-2 py-1">LinkedIn</span><span className="rounded bg-gray-100 px-2 py-1">Email</span></div>}>
            <CampaignOverviewChart />
          </Card>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.5fr_1fr]">
            <Card title="Campaign Actions" action={<ChannelToggle />}>
              <p className="-mt-2 mb-4 text-xs text-muted">Execution stats & engagement signals</p>
              <div className="grid grid-flow-col grid-cols-2 grid-rows-4 gap-x-8 gap-y-5 text-sm">
                {campaignActions.map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4">
                    <span className="font-semibold text-dark">{item.label}:</span>
                    <span className="shrink-0 text-dark">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="-mx-4 -mb-4 mt-4 flex items-center gap-3 rounded-b-lg bg-[#EAEFFF] px-4 py-3">
                <span className="text-sm font-semibold text-dark">Team:</span>
                <div className="flex -space-x-2">
                  {[0, 1, 2].map((i) => (
                    <img key={i} src={avatarPhoto} className="size-8 rounded-full border-2 border-white object-cover" alt="" />
                  ))}
                </div>
              </div>
            </Card>

            <Card title="Reply Performance">
              <p className="-mt-2 mb-3 text-xs text-muted">Top reply channel</p>
              <div className="flex flex-col gap-3">
                {replyPerformance.map((item) => (
                  <div key={item.label}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-text-secondary">{item.label}</span>
                      <span className="font-semibold text-link">{item.value}%</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full" style={{ background: `${item.color}24` }}>
                      <div className="h-full rounded-full" style={{ width: `${item.value}%`, background: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Card title="Reply Analysis">
            <ReplyAnalysisGauge {...replyAnalysis} />
          </Card>

          <Card title="Recent Campaign Activity">
            <div className="flex flex-col gap-5">
              {recentActivity.map((item, i) => (
                <div key={i} className="relative flex gap-3">
                  {i < recentActivity.length - 1 && (
                    <span className="absolute left-4 top-4 h-[calc(100%+1.25rem)] w-px -translate-x-1/2 bg-[#EBE9F1]" />
                  )}
                  <div className="relative z-10 flex size-8 shrink-0 items-center justify-center">
                    {item.icon && <img src={item.icon} alt="" className="size-8 object-contain" />}
                  </div>
                  <div className="pt-0.5">
                    <p className="text-[10px] font-bold text-text-secondary">{item.time}</p>
                    <p className="text-[14px] font-medium text-dark">{item.title}</p>
                    <p className="text-[12px] text-muted">
                      {item.prefix}{' '}
                      <span className={item.linked ? 'font-medium text-text-secondary underline' : 'text-text-secondary'}>
                        {item.name}
                      </span>
                      {item.nameSuffix && <span> {item.nameSuffix}</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 flex items-center gap-2 pl-11 text-sm font-semibold text-link">
              <ExternalLink size={14} /> Open Activity Log
            </button>
          </Card>
        </div>
      </div>
    </div>
  )
}
