import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Stethoscope, Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react'

export default function AuthPage() {
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')
    if (!email || !password) { setError('Please fill in all fields.'); return }
    if (mode === 'register' && !name) { setError('Please enter your name.'); return }

    setLoading(true)
    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await register(name, email, password)
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const InputField = ({
    icon, type, value, onChange, placeholder
  }: {
    icon: React.ReactNode
    type: string
    value: string
    onChange: (v: string) => void
    placeholder: string
  }) => (
    <div className="relative">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200 border"
        style={{
          background: 'rgba(255,255,255,0.05)',
          borderColor: 'rgba(255,255,255,0.1)',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'rgba(124,58,237,0.6)'
          e.target.style.background = 'rgba(124,58,237,0.08)'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'rgba(255,255,255,0.1)'
          e.target.style.background = 'rgba(255,255,255,0.05)'
        }}
      />
    </div>
  )

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F0C29 0%, #1a1040 50%, #0d1b3e 100%)' }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="absolute top-[-150px] right-[-150px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)' }} />
      <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)' }} />

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-all duration-200 group"
      >
        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
        Back
      </button>

      {/* Card */}
      <div className="animate-fade-up w-full max-w-md relative z-10">
        <div
          className="rounded-2xl overflow-hidden border"
          style={{
            background: 'rgba(255,255,255,0.04)',
            borderColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(24px)',
          }}
        >
          {/* Card header */}
          <div
            className="px-8 py-8 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(99,102,241,0.2))' }}
          >
            <div className="absolute inset-0 grid-overlay opacity-50 pointer-events-none" />
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 glow-purple relative z-10"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
            >
              <Stethoscope size={26} className="text-white" />
            </div>
            <h1 className="text-2xl font-extrabold gradient-text-light tracking-tight relative z-10">
              MediScan
            </h1>
            <p className="text-white/40 text-xs mt-1 relative z-10">
              AI-powered medical report analyser
            </p>
          </div>

          <div className="p-7">
            {/* Mode toggle */}
            <div
              className="flex p-1 rounded-xl mb-6 border"
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderColor: 'rgba(255,255,255,0.08)'
              }}
            >
              {(['login', 'register'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError('') }}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                  style={mode === m ? {
                    background: 'linear-gradient(135deg, #7C3AED, #6366F1)',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(124,58,237,0.3)'
                  } : { color: 'rgba(255,255,255,0.35)' }}
                >
                  {m === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {mode === 'register' && (
                <div>
                  <label className="block text-white/50 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Full Name
                  </label>
                  <InputField
                    icon={<User size={15} />}
                    type="text"
                    value={name}
                    onChange={setName}
                    placeholder="Manjula Satapathi"
                  />
                </div>
              )}

              <div>
                <label className="block text-white/50 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <InputField
                  icon={<Mail size={15} />}
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-white/50 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
                    <Lock size={15} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200 border"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      borderColor: 'rgba(255,255,255,0.1)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(124,58,237,0.6)'
                      e.target.style.background = 'rgba(124,58,237,0.08)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                      e.target.style.background = 'rgba(255,255,255,0.05)'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="mt-4 px-4 py-3 rounded-xl text-xs text-red-300 border flex items-start gap-2"
                style={{ background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.25)' }}
              >
                <span className="mt-0.5">⚠</span>
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-5 py-3.5 rounded-xl text-white font-bold text-sm transition-all duration-200 glow-purple disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] flex items-center justify-center gap-2 border border-white/10"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #6366F1)' }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Please wait...
                </>
              ) : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            {/* Switch mode */}
            <p className="text-center text-white/30 text-xs mt-5">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
                className="text-purple-400 font-semibold hover:text-purple-300 transition-colors"
              >
                {mode === 'login' ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}