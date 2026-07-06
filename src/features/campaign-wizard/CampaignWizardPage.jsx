import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardList, UserCog, Settings as SettingsIcon, LayoutDashboard } from 'lucide-react'
import ProgressStepper from '../../components/ui/ProgressStepper'
import Button from '../../components/ui/Button'
import { WizardProvider } from './WizardContext'
import AudienceStep from './steps/AudienceStep'
import SenderProfilesStep from './steps/SenderProfilesStep'
import SettingsStep from './steps/SettingsStep'
import StatsPage from '../stats/StatsPage'

const STEPS = [
  { key: 'audience', label: 'Define Target Audience', icon: ClipboardList },
  { key: 'sender', label: 'Sender Profiles', icon: UserCog },
  { key: 'settings', label: 'Settings', icon: SettingsIcon },
  { key: 'stats', label: 'Stats', icon: LayoutDashboard },
]

function WizardBody() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [stepValid, setStepValid] = useState(false)

  const goNext = () => {
    if (activeStep < STEPS.length - 1) {
      setActiveStep((s) => s + 1)
      setStepValid(false)
    } else {
      navigate('/campaign')
    }
  }

  const goPrevious = () => {
    if (activeStep > 0) setActiveStep((s) => s - 1)
  }

  return (
    <div className="flex h-full flex-col rounded-lg bg-white p-[26px]">
      <div className="flex flex-1 flex-col gap-4">
        <ProgressStepper steps={STEPS} activeIndex={activeStep} onStepClick={setActiveStep} />

        <div className="flex-1">
          {activeStep === 0 && <AudienceStep onValidChange={setStepValid} />}
          {activeStep === 1 && <SenderProfilesStep onValidChange={setStepValid} />}
          {activeStep === 2 && <SettingsStep onValidChange={setStepValid} />}
          {activeStep === 3 && <StatsPage campaignName="New Outreach Campaign" embedded />}
        </div>

        <div className={`flex ${activeStep === 0 ? 'justify-end' : 'justify-between'}`}>
          {activeStep > 0 && (
            <Button variant="outline" onClick={goPrevious}>
              Previous
            </Button>
          )}
          <Button onClick={goNext} disabled={activeStep < 3 && !stepValid} className={activeStep < 3 && !stepValid ? 'opacity-65' : ''}>
            {activeStep === STEPS.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function CampaignWizardPage() {
  return (
    <WizardProvider>
      <WizardBody />
    </WizardProvider>
  )
}
