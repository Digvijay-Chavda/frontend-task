import { useEffect } from 'react'
import { Bot, MessageSquare, Send, Info } from 'lucide-react'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import Button from '../../../components/ui/Button'
import { useWizard } from '../WizardContext'

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const ZAPIER_EVENTS = ['Response received', 'Invite sent', 'Invitation accepted', 'Invitation withdrawn', 'Followup Sent']

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative h-5 w-9 shrink-0 rounded-full transition ${checked ? 'bg-link' : 'bg-gray-300'}`}
    >
      <span className={`absolute top-0.5 size-4 rounded-full bg-white transition ${checked ? 'left-4' : 'left-0.5'}`} />
    </button>
  )
}

export default function SettingsStep({ onValidChange }) {
  const { data, updateSettings } = useWizard()
  const { settings } = data

  useEffect(() => {
    onValidChange(settings.campaignName.trim().length > 0)
  }, [settings.campaignName, onValidChange])

  const toggleDay = (day) => {
    const days = settings.days.includes(day) ? settings.days.filter((d) => d !== day) : [...settings.days, day]
    updateSettings({ days })
  }

  const toggleEvent = (event) => {
    const zapierEvents = settings.zapierEvents.includes(event)
      ? settings.zapierEvents.filter((e) => e !== event)
      : [...settings.zapierEvents, event]
    updateSettings({ zapierEvents })
  }

  return (
    <div className="flex flex-col gap-6">
      <Input
        label="Campaign name"
        value={settings.campaignName}
        onChange={(e) => updateSettings({ campaignName: e.target.value })}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-md border border-[#EBE9F1] p-4">
          <h4 className="text-sm font-semibold text-dark">Sending Window</h4>
          <p className="mb-3 text-xs text-muted">Define when the campaign runs</p>
          <Select
            value={settings.timezone}
            onChange={(e) => updateSettings({ timezone: e.target.value })}
            className="mb-3"
          >
            <option>USA Outreach Time</option>
            <option>EU Outreach Time</option>
            <option>APAC Outreach Time</option>
          </Select>
          <div className="mb-3 flex flex-wrap gap-2">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
                  settings.days.includes(day) ? 'border-link bg-[#EAEFFF] text-link' : 'border-border-input text-muted'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              containerClassName="flex-1"
              value={`${settings.startTime} - ${settings.endTime}`}
              readOnly
            />
            <Input containerClassName="flex-1" value={settings.timezone} readOnly />
          </div>
          <button className="mt-3 text-sm text-link">+ Add New Window</button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-md border border-[#EBE9F1] p-4">
            <div className="flex items-center gap-2">
              <Bot size={18} className="text-link" />
              <div>
                <p className="text-sm font-medium text-dark">
                  AI Assist <span className="font-normal text-muted">Optional</span>
                </p>
                <p className="text-xs text-muted">Define when the campaign runs</p>
              </div>
            </div>
            <Button size="sm">Train AI</Button>
          </div>
          <div className="flex items-center justify-between rounded-md border border-[#EBE9F1] p-4">
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-link" />
              <div>
                <p className="text-sm text-dark">Auto message after reply detected</p>
                <p className="text-xs text-muted">AI auto-replies to leads who message you back</p>
              </div>
            </div>
            <Toggle checked={settings.autoMessage} onChange={() => updateSettings({ autoMessage: !settings.autoMessage })} />
          </div>
          <div className="flex items-center justify-between rounded-md border border-[#EBE9F1] p-4">
            <div className="flex items-center gap-2">
              <Send size={16} className="text-link" />
              <div>
                <p className="text-sm text-dark">
                  Auto handle leads after <strong>{settings.followUps}</strong> Follow-ups
                </p>
                <p className="text-xs text-muted">AI takes over after two follow-ups.</p>
              </div>
            </div>
            <Toggle
              checked={settings.autoHandleLeads}
              onChange={() => updateSettings({ autoHandleLeads: !settings.autoHandleLeads })}
            />
          </div>
        </div>
      </div>

      <div className="rounded-md border border-[#EBE9F1] p-4">
        <label className="mb-3 flex items-center gap-2 text-sm font-medium text-dark">
          <input type="checkbox" checked readOnly className="size-4 accent-link" />
          Select events to trigger zapier <Info size={14} className="text-muted" />
        </label>
        <div className="flex flex-wrap gap-4">
          {ZAPIER_EVENTS.map((event) => (
            <label key={event} className="flex items-center gap-2 text-sm text-text-secondary">
              <input
                type="checkbox"
                checked={settings.zapierEvents.includes(event)}
                onChange={() => toggleEvent(event)}
                className="size-4 accent-link"
              />
              {event}
            </label>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 border-t border-[#EBE9F1] pt-4 text-sm text-muted">
          Works With
          <span className="font-semibold text-warning">zapier</span>
          <span className="font-semibold text-link">n8n</span>
          <span className="font-semibold text-dark">make</span>
        </div>
        <p className="mt-3 text-xs text-muted">
          If a lead answers your invite, message, or InMail, we stop sending further steps automatically.{' '}
          <a className="text-link underline">Learn more</a>
        </p>
      </div>
    </div>
  )
}
