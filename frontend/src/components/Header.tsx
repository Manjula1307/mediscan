import { Stethoscope, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        background: 'rgba(15,12,41,0.85)',
        backdropFilter: 'blur(20px)',
        borderColor: 'rgba(255,255,255,0.06)'
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center glow-purple-sm"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
          >
            <Stethoscope size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-extrabold gradient-text-light tracking-tight leading-none">
              MediScan
            </h1>
            <p className="text-white/25 text-xs mt-0.5 leading-none">
              Medical Report Analyser
            </p>
          </div>
        </div>

        {/* User + logout */}
        <div className="flex items-center gap-2">
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border"
            style={{
              background: 'rgba(124,58,237,0.12)',
              borderColor: 'rgba(124,58,237,0.25)'
            }}
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
            >
              <User size={12} className="text-white" />
            </div>
            <span className="text-white/70 text-sm font-semibold">{user?.name}</span>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-2 text-white/35 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 text-sm font-medium border border-transparent hover:border-red-500/20"
          >
            <LogOut size={15} />
            <span className="hidden sm:block">Sign Out</span>
          </button>
        </div>

      </div>
    </header>
  )
}