import { Stethoscope, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Left side — app name and logo */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Stethoscope className="text-white" size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-none">MediScan</h1>
            <p className="text-xs text-gray-400 mt-0.5">Medical Report Analyser</p>
          </div>
        </div>

        {/* Right side — user info and logout */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl">
            <div className="bg-blue-100 p-1.5 rounded-lg">
              <User size={14} className="text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-gray-700">{user?.name}</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={16} />
            <span className="hidden sm:block">Sign Out</span>
          </button>
        </div>

      </div>
    </header>
  )
}