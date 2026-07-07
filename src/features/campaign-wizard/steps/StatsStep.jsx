import { useState } from 'react'
import { Rocket } from 'lucide-react'
import Button from '../../../components/ui/Button'
import StatsPage from '../../stats/StatsPage'
import noStatsImg from '../../../assets/image 426.png'

export default function StatsStep({ campaignName = 'New Outreach Campaign' }) {
  const [launched, setLaunched] = useState(false)

  if (launched) {
    return <StatsPage campaignName={campaignName} embedded />
  }

  return (
    <div className="flex min-h-[420px] flex-1 flex-col items-center justify-center gap-4 text-center">
      <img src={noStatsImg} alt="No stats yet" className="w-[150px] max-w-full" />
      <div>
        <h3 className="text-xl font-semibold text-dark">No Stats Yet</h3>
        <p className="mt-1 text-sm text-muted">Once Campaign is launched, Statistics will be shown here.</p>
      </div>
      <Button onClick={() => setLaunched(true)}>
        <Rocket size={16} /> Launch Campaign
      </Button>
    </div>
  )
}
