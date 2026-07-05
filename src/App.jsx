import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import CampaignListPage from './features/campaign-list/CampaignListPage'
import CampaignWizardPage from './features/campaign-wizard/CampaignWizardPage'

const CampaignStatsPage = lazy(() => import('./pages/CampaignStatsPage'))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/campaign" replace />} />
          <Route path="/campaign" element={<CampaignListPage />} />
          <Route path="/campaign/new" element={<CampaignWizardPage />} />
          <Route
            path="/campaign/:id/stats"
            element={
              <Suspense fallback={null}>
                <CampaignStatsPage />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/campaign" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
