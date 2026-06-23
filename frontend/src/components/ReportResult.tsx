import { AlertTriangle, CheckCircle, ArrowUp, ArrowDown, MessageSquare, FileText, X } from 'lucide-react'
import type { Report, ReportFlag } from '../types'

interface ReportResultProps {
  report: Report
  onClose: () => void
}

export default function ReportResult({ report, onClose }: ReportResultProps) {

  const getFlagStyle = (status: ReportFlag['status']) => {
    switch (status) {
      case 'high':
        return {
          bg: 'bg-red-50 border-red-200',
          text: 'text-red-700',
          badge: 'bg-red-100 text-red-700',
          icon: <ArrowUp size={14} />,
        }
      case 'low':
        return {
          bg: 'bg-orange-50 border-orange-200',
          text: 'text-orange-700',
          badge: 'bg-orange-100 text-orange-700',
          icon: <ArrowDown size={14} />,
        }
      default:
        return {
          bg: 'bg-green-50 border-green-200',
          text: 'text-green-700',
          badge: 'bg-green-100 text-green-700',
          icon: <CheckCircle size={14} />,
        }
    }
  }
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">

      {/* Result header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2.5 rounded-xl">
            <FileText className="text-blue-600" size={22} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Analysis Complete</h2>
            <p className="text-xs text-gray-400">{report.filename}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
          <X size={20} />
        </button>
      </div>

      {/* AI Summary */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5">
        <h3 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
          <CheckCircle size={16} /> AI Summary
        </h3>
        <p className="text-sm text-blue-800 leading-relaxed">{report.ai_summary}</p>
      </div>

      {/* Flags section */}
      {report.flags.length > 0 ? (
        <div className="mb-5">
          <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <AlertTriangle size={16} className="text-orange-500" />
            Values Needing Attention ({report.flags.length})
          </h3>
          <div className="space-y-3">
            {report.flags.map((flag, index) => {
              const style = getFlagStyle(flag.status)
              return (
                <div key={index} className={`border rounded-xl p-4 ${style.bg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800 text-sm">{flag.parameter}</span>
                    <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${style.badge}`}>
                      {style.icon}
                      {flag.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs mb-2">
                    <span className={`font-bold ${style.text}`}>Your value: {flag.value}</span>
                    <span className="text-gray-400">Normal: {flag.normal_range}</span>
                  </div>
                  <p className="text-xs text-gray-600">{flag.concern}</p>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="mb-5 bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm text-green-700 font-semibold flex items-center gap-2">
            <CheckCircle size={16} /> All values appear to be within normal range
          </p>
        </div>
      )}

      {/* Doctor questions */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <MessageSquare size={16} className="text-blue-500" />
          Questions to Ask Your Doctor
        </h3>
        <div className="space-y-2">
          {report.questions.map((question, index) => (
            <div key={index} className="flex gap-3 bg-gray-50 rounded-xl p-3">
              <span className="bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <p className="text-sm text-gray-700">{question}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}