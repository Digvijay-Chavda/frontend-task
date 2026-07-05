import { useParams } from 'react-router-dom'
import StatsPage from '../features/stats/StatsPage'
import { campaigns } from '../mock/campaigns'

export default function CampaignStatsPage() {
  const { id } = useParams()
  const campaign = campaigns.find((c) => c.id === id)

  return <StatsPage campaignName={campaign?.name ?? 'Campaign'} />
}
