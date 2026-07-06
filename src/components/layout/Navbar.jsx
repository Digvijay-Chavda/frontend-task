import { Menu, ChevronRight } from 'lucide-react'
import avatarPhoto from '../../assets/avatar-photo.png'

export default function Navbar({ breadcrumb = ['Campaign'], onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 mx-4 mt-4 flex h-[62px] items-center justify-between rounded-md bg-white px-4 shadow-navbar sm:mx-6 sm:mt-[15px] sm:px-6">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="text-text-secondary lg:hidden" aria-label="Open sidebar">
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2 text-sm font-normal leading-[1.2] tracking-normal">
          {breadcrumb.map((crumb, i) => (
            <span key={crumb} className="flex items-center gap-2">
              {i > 0 && <ChevronRight size={14} className="text-muted" />}
              <span className={i === breadcrumb.length - 1 ? 'text-body' : 'text-link'}>{crumb}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <img src={avatarPhoto} alt="John Doe" className="size-[38px] rounded-full object-cover" />
        <div className="hidden text-right sm:block">
          <p className="text-sm text-body">John Doe</p>
          <p className="text-xs text-muted-light">Admin</p>
        </div>
      </div>
    </header>
  )
}
