import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardList, UserCog, Settings as SettingsIcon, LayoutDashboard, Users, Wand2 } from 'lucide-react'
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

const TABS = [
  { key: 'leads', label: 'Leads List', icon: ClipboardList },
  { key: 'create', label: 'Create a Campaign', icon: Wand2 },
  { key: 'campaign', label: 'Campaign', icon: Users },
]

function WizardBody() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [activeTab, setActiveTab] = useState('create')
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
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-6 rounded-md border border-[#EBE9F1] px-4 py-3 sm:px-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 text-sm font-medium ${
              activeTab === tab.key ? 'text-[#444050]' : 'text-text-secondary'
            }`}
          >
            <span
              className={`flex size-[38px] items-center justify-center rounded-[5px] ${
                activeTab === tab.key ? 'bg-link text-white' : 'bg-[#E8E8E8] text-text-secondary'
              }`}
            >
              <tab.icon size={18} />
            </span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <ProgressStepper steps={STEPS} activeIndex={activeStep} onStepClick={setActiveStep} />

      <div className="rounded-md bg-white">
        {activeStep === 0 && <AudienceStep onValidChange={setStepValid} />}
        {activeStep === 1 && <SenderProfilesStep onValidChange={setStepValid} />}
        {activeStep === 2 && <SettingsStep onValidChange={setStepValid} />}
        {activeStep === 3 && <StatsPage campaignName="New Outreach Campaign" embedded />}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={goPrevious} disabled={activeStep === 0}>
          Previous
        </Button>
        <Button onClick={goNext} disabled={activeStep < 3 && !stepValid} className={activeStep < 3 && !stepValid ? 'opacity-65' : ''}>
          {activeStep === STEPS.length - 1 ? 'Finish' : 'Next'}
        </Button>
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
