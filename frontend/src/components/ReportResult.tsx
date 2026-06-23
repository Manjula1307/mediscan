import {
  AlertTriangle, CheckCircle, ArrowUp, ArrowDown,
  MessageSquare, FileText, X, Sparkles
} from 'lucide-react'
import type { Report, ReportFlag } from '../types'

interface ReportResultProps {
  report: Report
  onClose: () => void
}

export default function ReportResult({ report, onClose }: ReportResultProps) {

  const getFlagStyle = (status: ReportFlag['status']) => {
    switch (status) {
      case 'high': return {
        bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)',
        text: '#FCA5A5', badge: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.3)', color: '#FCA5A5' },
        icon: <ArrowUp size={11} />, label: 'HIGH'
      }
      case 'low': return {
        bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)',
        text: '#FCD34D', badge: { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)', color: '#FCD34D' },
        icon: <ArrowDown size={11} />, label: 'LOW'
      }
      default: return {
        bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)',
        text: '#6EE7B7', badge: { bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.3)', color: '#6EE7B7' },
        icon: <CheckCircle size={11} />, label: 'NORMAL'
      }
    }
  }

  return (
    <div
      className="animate-fade-in rounded-2xl overflow-hidden border"
      style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      {/* Header */}
      <div
        className="px-6 py-5 flex items-center justify-between border-b"
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(99,102,241,0.15))',
          borderColor: 'rgba(255,255,255,0.06)'
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <FileText size={16} className="text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-sm">Analysis Complete</h2>
            <p className="text-white/35 text-xs mt-0.5 truncate max-w-xs">{report.filename}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border"
            style={{ background: 'rgba(16,185,129,0.12)', borderColor: 'rgba(16,185,129,0.3)' }}
          >
            ✓ Done
          </span>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white/70 p-1.5 rounded-lg hover:bg-white/5 transition-all"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-5">

        {/* Summary */}
        <div
          className="rounded-xl p-5 border"
          style={{ background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.2)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-purple-400" />
            <h3 className="text-purple-300 text-xs font-bold uppercase tracking-wider">AI Summary</h3>
          </div>
          <p className="text-white/65 text-sm leading-relaxed">{report.ai_summary}</p>
        </div>

        {/* Flags */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={14} className="text-amber-400" />
            <h3 className="text-white/60 text-xs font-bold uppercase tracking-wider">
              {report.flags.length > 0
                ? `Values Needing Attention (${report.flags.length})`
                : 'Values Check'}
            </h3>
          </div>

          {report.flags.length > 0 ? (
            <div className="space-y-2.5">
              {report.flags.map((flag, i) => {
                const s = getFlagStyle(flag.status)
                return (
                  <div
                    key={i}
                    className="rounded-xl p-4 border"
                    style={{ background: s.bg, borderColor: s.border }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="text-white font-bold text-sm">{flag.parameter}</span>
                      <span
                        className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 border"
                        style={{ background: s.badge.bg, borderColor: s.badge.border, color: s.badge.color }}
                      >
                        {s.icon}{s.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs mb-2">
                      <span className="font-bold" style={{ color: s.text }}>
                        Your value: {flag.value}
                      </span>
                      <span className="text-white/30">Normal: {flag.normal_range}</span>
                    </div>
                    <p className="text-white/40 text-xs leading-relaxed">{flag.concern}</p>
                  </div>
                )
              })}
            </div>
          ) : (
            <div
              className="rounded-xl p-4 border flex items-center gap-3"
              style={{ background: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.25)' }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(16,185,129,0.15)' }}
              >
                <CheckCircle size={16} className="text-emerald-400" />
              </div>
              <p className="text-emerald-400 text-sm font-medium">
                All values appear to be within normal range
              </p>
            </div>
          )}
        </div>

        {/* Doctor questions */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare size={14} className="text-blue-400" />
            <h3 className="text-white/60 text-xs font-bold uppercase tracking-wider">
              Questions to Ask Your Doctor
            </h3>
          </div>
          <div className="space-y-2">
            {report.questions.map((q, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-xl p-3.5 border transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(255,255,255,0.07)'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(124,58,237,0.07)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(124,58,237,0.2)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'
                }}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #6366F1)', boxShadow: '0 2px 8px rgba(124,58,237,0.3)' }}
                >
                  {i + 1}
                </span>
                <p className="text-white/55 text-sm leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p
          className="text-center text-xs leading-relaxed pt-4 border-t"
          style={{ color: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.05)' }}
        >
          ⚠ AI-generated analysis for informational purposes only.
          Always consult a qualified medical professional for advice.
        </p>

      </div>
    </div>
  )
}