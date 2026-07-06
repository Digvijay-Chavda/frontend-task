import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Megaphone, Sun, Moon, LogOut, PanelRightClose } from 'lucide-react'
import avatarPhoto from '../../assets/avatar-photo.png'

const NAV_ITEMS = [{ key: 'campaign', label: 'Campaign', icon: Megaphone, to: '/campaign' }]

export default function Sidebar({ open, onClose }) {
  const [theme, setTheme] = useState('light')

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[260px] shrink-0 flex-col bg-white transition-transform lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary-gradient text-white">
              <Megaphone size={16} />
            </span>
            <span className="font-heading text-[17px] font-bold text-[#00002B]">Frontend Task</span>
          </div>
          <button onClick={onClose} className="text-muted lg:hidden" aria-label="Close sidebar">
            <PanelRightClose size={18} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.key}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-sm px-4 py-2.5 text-[15px] font-medium transition ${
                  isActive ? 'bg-primary-gradient text-white' : 'text-text-secondary hover:bg-gray-100'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mx-3 mb-4 flex items-center justify-center rounded-sm bg-sidebar-card p-1">
          <button
            onClick={() => setTheme('light')}
            className={`flex w-1/2 items-center justify-center gap-2 rounded-[64px] px-4 py-2.5 text-sm font-medium ${
              theme === 'light' ? 'bg-white text-[#443f58]' : 'text-[#656178]'
            }`}
          >
            <Sun size={18} /> Light
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`flex w-1/2 items-center justify-center gap-2 rounded-sm px-4 py-2.5 text-sm font-medium ${
              theme === 'dark' ? 'bg-white text-[#443f58]' : 'text-[#656178]'
            }`}
          >
            <Moon size={18} /> Dark
          </button>
        </div>

        <div className="mx-3 mb-6 flex items-center gap-3 rounded-lg bg-sidebar-card p-3">
          <img src={avatarPhoto} alt="John Doe" className="size-[46px] shrink-0 rounded-full object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-dark">John Doe</p>
            <p className="truncate text-xs text-muted">Admin</p>
          </div>
          <button aria-label="Log out" className="shrink-0 rounded-sm bg-logout-bg p-1.5 text-text-secondary hover:opacity-80">
            <LogOut size={18} />
          </button>
        </div>
      </aside>
    </>
  )
}
