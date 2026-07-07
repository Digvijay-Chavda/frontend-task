import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardList, UserCog, Settings as SettingsIcon, LayoutDashboard, Undo2 } from 'lucide-react'
import ProgressStepper from '../../components/ui/ProgressStepper'
import Button from '../../components/ui/Button'
import { WizardProvider } from './WizardContext'
import AudienceStep from './steps/AudienceStep'
import SenderProfilesStep from './steps/SenderProfilesStep'
import SettingsStep from './steps/SettingsStep'
import StatsStep from './steps/StatsStep'

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
          {activeStep === 3 && <StatsStep campaignName="New Outreach Campaign" />}
        </div>

        {activeStep < 3 && (
          <div className="flex items-center justify-end gap-3">
            {activeStep > 0 && (
              <Button variant="ghost" onClick={goPrevious} className="text-link">
                <Undo2 size={16} /> Previous
              </Button>
            )}
            <Button onClick={goNext} disabled={!stepValid} className={!stepValid ? 'opacity-65' : ''}>
              Next
            </Button>
          </div>
        )}
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
