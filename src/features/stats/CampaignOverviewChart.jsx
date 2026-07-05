import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts'
import { campaignOverview } from '../../mock/statsData'

export default function CampaignOverviewChart() {
  return (
    <div>
      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {campaignOverview.map((item) => (
          <div key={item.label}>
            <p className="text-xs text-muted">{item.label}</p>
            <p className="text-lg font-semibold text-dark">
              {item.value.toLocaleString()} {item.sub && <span className="text-xs font-medium text-warning">{item.sub}</span>}
            </p>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={campaignOverview} barCategoryGap="20%">
          <XAxis dataKey="label" hide />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {campaignOverview.map((item) => (
              <Cell key={item.label} fill={item.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
