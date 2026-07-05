import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

function getBreadcrumb(pathname) {
  if (pathname === '/campaign/new') return ['Campaign', 'Advance Campaign']
  if (/^\/campaign\/[^/]+\/stats$/.test(pathname)) return ['Campaign', 'Stats']
  return ['Campaign']
}

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()
  const breadcrumb = getBreadcrumb(pathname)

  return (
    <div className="flex min-h-screen bg-bg-body">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar breadcrumb={breadcrumb} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
