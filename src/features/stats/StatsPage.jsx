import { Pause, Pencil, Zap } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import avatarPhoto from '../../assets/avatar-photo.png'
import ReplyAnalysisGauge from './ReplyAnalysisGauge'
import CampaignOverviewChart from './CampaignOverviewChart'
import { campaignActions, replyPerformance, recentActivity, replyAnalysis } from '../../mock/statsData'

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
                  <Badge tone="neutral">LinkedIn</Badge>
                  <Badge tone="neutral">Email</Badge>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone="success">⚡ Running</Badge>
                <Pause size={16} className="text-muted" />
                <Pencil size={16} className="text-muted" />
              </div>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[37%] rounded-full bg-primary" />
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
              <span>Created: 8 Jan, 2026</span>
              <span className="text-success">✳ CRM Connected</span>
              <span>74 / 200 prospects processed</span>
            </div>
          </Card>

          <Card title="Campaign Overview" action={<div className="flex gap-2 text-xs text-muted"><span className="rounded bg-gray-100 px-2 py-1">LinkedIn</span><span className="rounded bg-gray-100 px-2 py-1">Email</span></div>}>
            <CampaignOverviewChart />
          </Card>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card title="Campaign Actions">
              <p className="-mt-2 mb-3 text-xs text-muted">Execution stats & engagement signals</p>
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                {campaignActions.map((item) => (
                  <div key={item.label}>
                    <p className="text-muted">{item.label}:</p>
                    <p className="font-semibold text-dark">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 border-t border-[#EBE9F1] pt-4">
                <span className="text-xs text-muted">Team:</span>
                <div className="flex -space-x-2">
                  {[0, 1, 2].map((i) => (
                    <img key={i} src={avatarPhoto} className="size-7 rounded-full border-2 border-white object-cover" alt="" />
                  ))}
                </div>
              </div>
            </Card>

            <Card title="Reply Performance">
              <p className="-mt-2 mb-3 text-xs text-muted">Top reply channel</p>
              <div className="flex flex-col gap-3">
                {replyPerformance.map((item) => (
                  <div key={item.label}>
                    <div className="mb-1 flex justify-between text-xs text-text-secondary">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
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
            <div className="flex flex-col gap-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <span className="mt-1 size-2 shrink-0 rounded-full" style={{ background: item.color }} />
                  <div>
                    <p className="text-xs text-muted">{item.time}</p>
                    <p className="text-sm text-dark">{item.title}</p>
                    <p className="text-xs text-muted">by {item.by}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 text-sm text-link">Open Activity Log</button>
          </Card>
        </div>
      </div>
    </div>
  )
}
