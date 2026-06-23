import { useNavigate } from 'react-router-dom'
import {
  Stethoscope, ArrowRight, Brain, AlertTriangle,
  MessageSquare, FolderOpen, Shield, Zap, ChevronRight
} from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: <Brain size={20} />,
      color: 'from-purple-600/30 to-indigo-600/20 border-purple-500/30',
      iconColor: 'text-purple-400',
      title: 'Plain Language Summary',
      desc: 'Complex medical jargon translated into clear, easy-to-understand explanations anyone can follow.',
    },
    {
      icon: <AlertTriangle size={20} />,
      color: 'from-amber-600/30 to-orange-600/20 border-amber-500/30',
      iconColor: 'text-amber-400',
      title: 'Abnormal Value Detection',
      desc: 'Every value checked against normal ranges and flagged with colour-coded alerts.',
    },
    {
      icon: <MessageSquare size={20} />,
      color: 'from-emerald-600/30 to-teal-600/20 border-emerald-500/30',
      iconColor: 'text-emerald-400',
      title: 'Doctor Questions',
      desc: 'Personalised questions to ask your doctor, generated directly from your specific results.',
    },
    {
      icon: <FolderOpen size={20} />,
      color: 'from-violet-600/30 to-purple-600/20 border-violet-500/30',
      iconColor: 'text-violet-400',
      title: 'Report History',
      desc: 'All your past reports saved securely. Access your full analysis history anytime.',
    },
    {
      icon: <Shield size={20} />,
      color: 'from-blue-600/30 to-indigo-600/20 border-blue-500/30',
      iconColor: 'text-blue-400',
      title: 'Secure & Private',
      desc: 'JWT-authenticated accounts with bcrypt encryption. Your data stays yours, always.',
    },
    {
      icon: <Zap size={20} />,
      color: 'from-rose-600/30 to-pink-600/20 border-rose-500/30',
      iconColor: 'text-rose-400',
      title: 'Instant Analysis',
      desc: 'Results in under 30 seconds. Upload, analyse, understand — that fast.',
    },
  ]

  const steps = [
    { num: '01', title: 'Create Account', desc: 'Sign up free in seconds. No credit card needed.' },
    { num: '02', title: 'Upload Report', desc: 'Drag and drop any medical PDF file.' },
    { num: '03', title: 'Get AI Analysis', desc: 'Plain language results in under 30 seconds.' },
    { num: '04', title: 'Talk to Your Doctor', desc: 'Go informed with AI-generated questions.' },
  ]

  const stats = [
    { value: '100%', label: 'Private & Secure' },
    { value: '<30s', label: 'Analysis Time' },
    { value: 'AI', label: 'Powered by LLM' },
    { value: 'Free', label: 'Always' },
  ]

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F0C29 0%, #1a1040 50%, #0d1b3e 100%)' }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)' }} />
      <div className="absolute bottom-[100px] left-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1), transparent 70%)' }} />
      <div className="absolute top-[40%] left-[35%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.06), transparent 70%)' }} />

      {/* ===== NAVBAR ===== */}
      <nav className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center glow-purple-sm"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}>
            <Stethoscope size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold gradient-text-light tracking-tight">MediScan</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/login')}
            className="text-white/50 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-200"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-xl glow-purple-sm transition-all duration-200 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #6366F1)' }}
          >
            Get Started
            <ArrowRight size={15} />
          </button>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative z-10 text-center px-6 pt-20 pb-16">

        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border"
          style={{
            background: 'rgba(124,58,237,0.12)',
            borderColor: 'rgba(124,58,237,0.35)'
          }}>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse-glow" />
          <span className="text-purple-300 text-xs font-semibold tracking-widest uppercase">
            AI-powered · Free · Private
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up-delay-1 text-5xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Your medical reports,<br />
          <span className="gradient-text">finally explained.</span>
        </h1>

        {/* Subheading */}
        <p className="animate-fade-up-delay-2 text-white/50 text-lg max-w-xl mx-auto leading-relaxed mb-10">
          Upload any blood test, prescription, or diagnostic report.
          Our AI reads it, explains every value in plain language,
          and tells you exactly what to ask your doctor.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-delay-3 flex items-center justify-center gap-3 mb-16">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-white font-bold text-sm px-7 py-3.5 rounded-xl glow-purple transition-all duration-200 hover:scale-105 border border-white/10"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #6366F1)' }}
          >
            <Stethoscope size={17} />
            Analyse My Report
          </button>
          <button
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 text-white/60 hover:text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 border border-white/10 hover:bg-white/5"
          >
            See how it works
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Stats bar */}
        <div className="animate-fade-up-delay-4 inline-flex items-center gap-0 glass rounded-2xl overflow-hidden mx-auto">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="px-8 py-4 text-center">
                <div className="text-2xl font-extrabold gradient-text leading-none mb-1">
                  {stat.value}
                </div>
                <div className="text-white/30 text-xs uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
              {i < stats.length - 1 && (
                <div className="w-px h-10 bg-white/8" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="relative z-10 px-6 sm:px-10 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-purple-400 text-xs font-bold tracking-widest uppercase mb-3">
            ✦ What you get
          </p>
          <h2 className="text-center text-3xl font-extrabold text-white tracking-tight mb-3">
            Everything you need to understand your health
          </h2>
          <p className="text-center text-white/40 text-sm mb-12">
            No medical degree required
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`animate-fade-up-delay-${Math.min(i + 1, 4)} group rounded-2xl p-5 border bg-gradient-to-br transition-all duration-300 hover:-translate-y-1 cursor-default ${f.color}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 ${f.color} ${f.iconColor}`}>
                  {f.icon}
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{f.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="relative z-10 px-6 sm:px-10 py-10 pb-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-purple-400 text-xs font-bold tracking-widest uppercase mb-3">
            ✦ Simple process
          </p>
          <h2 className="text-center text-3xl font-extrabold text-white tracking-tight mb-14">
            Three steps to clarity
          </h2>

          <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-6">
            {/* Connector line */}
            <div className="absolute top-6 left-[12.5%] right-[12.5%] h-px hidden sm:block"
              style={{ background: 'linear-gradient(90deg, rgba(124,58,237,0.6), rgba(99,102,241,0.2))' }} />

            {steps.map((step, i) => (
              <div key={step.num} className="text-center relative">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-extrabold text-sm mx-auto mb-4 glow-purple-sm relative z-10"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #6366F1)' }}
                >
                  {i + 1}
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{step.title}</h3>
                <p className="text-white/35 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="relative z-10 px-6 sm:px-10 pb-20">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl p-12 text-center relative overflow-hidden border"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(99,102,241,0.15))',
              borderColor: 'rgba(124,58,237,0.3)'
            }}
          >
            {/* CTA orb */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2), transparent)' }} />

            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3 relative z-10">
              Ready to understand your health?
            </h2>
            <p className="text-white/50 text-sm mb-8 relative z-10">
              Upload your first report for free. No credit card required.
            </p>
            <div className="flex items-center justify-center gap-3 relative z-10">
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 text-white font-bold text-sm px-8 py-3.5 rounded-xl glow-purple transition-all duration-200 hover:scale-105 border border-white/10"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #6366F1)' }}
              >
                <Stethoscope size={16} />
                Start for Free
              </button>
              <button
                onClick={() => navigate('/login')}
                className="text-white/50 hover:text-white font-semibold text-sm px-8 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all duration-200"
              >
                Sign In →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 px-6 sm:px-10 py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}>
            <Stethoscope size={12} className="text-white" />
          </div>
          <span className="text-white/40 text-sm font-semibold">MediScan</span>
        </div>
        <p className="text-white/20 text-xs">
          © 2026 MediScan. Built by Manjula Satapathi
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Manjula1307"
            target="_blank"
            rel="noreferrer"
            className="text-white/30 hover:text-white/70 text-xs transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/manjula-satapathi"
            target="_blank"
            rel="noreferrer"
            className="text-white/30 hover:text-white/70 text-xs transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  )
}