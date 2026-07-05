import { createContext, useContext, useState } from 'react'

const WizardContext = createContext(null)

const initialState = {
  importMethod: null,
  linkedInUrl: '',
  csvFile: null,
  selectedLookalikeIds: [],
  settings: {
    campaignName: 'New Outreach Campaign',
    days: ['MON', 'TUE', 'WED', 'THU', 'SAT'],
    startTime: '11:30 AM',
    endTime: '04:00 PM',
    timezone: 'USA Timezone',
    autoMessage: false,
    autoHandleLeads: false,
    followUps: 2,
    zapierEvents: ['Response received'],
  },
}

export function WizardProvider({ children }) {
  const [data, setData] = useState(initialState)

  const update = (patch) => setData((prev) => ({ ...prev, ...patch }))
  const updateSettings = (patch) => setData((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }))
  const reset = () => setData(initialState)

  return <WizardContext.Provider value={{ data, update, updateSettings, reset }}>{children}</WizardContext.Provider>
}

export function useWizard() {
  const ctx = useContext(WizardContext)
  if (!ctx) throw new Error('useWizard must be used within WizardProvider')
  return ctx
}
