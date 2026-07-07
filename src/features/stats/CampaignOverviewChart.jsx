import { Info } from 'lucide-react'
import Badge from '../../components/ui/Badge'
import { campaignOverview } from '../../mock/statsData'

export default function CampaignOverviewChart() {
  const max = Math.max(...campaignOverview.map((item) => item.value))

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5">
      {campaignOverview.map((item, idx) => {
        const tone = item.sub ? (parseInt(item.sub, 10) >= 50 ? 'success' : 'warning') : null
        return (
          <div key={item.label} className={`flex flex-col px-4 ${idx > 0 ? 'border-l border-[#EBE9F1]' : ''}`}>
            <p className="flex items-center gap-1 text-xs text-muted">
              {item.label}
              <Info size={12} className="text-muted-light" />
            </p>
            <p className="mt-1 flex items-center gap-2 text-lg font-semibold text-dark">
              {item.value.toLocaleString()}
              {item.sub && <Badge tone={tone}>{item.sub}</Badge>}
            </p>
            <div className="mt-4 flex h-[180px] items-end">
              <div
                className="w-full rounded-t-lg"
                style={{ height: `${(item.value / max) * 100}%`, background: item.color }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
