import { useEffect, useState } from 'react'
import { Clock, FileText, ChevronRight, History } from 'lucide-react'
import { getMyReports, getReportById } from '../api/reports'
import type { ReportSummary, Report } from '../types'

interface ReportHistoryProps {
  onViewReport: (report: Report) => void
  refreshTrigger: number
}

export default function ReportHistory({ onViewReport, refreshTrigger }: ReportHistoryProps) {
  const [reports, setReports] = useState<ReportSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingId, setLoadingId] = useState<number | null>(null)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true)
        const data = await getMyReports()
        setReports(data)
      } catch (err) {
        console.error('Failed to fetch reports:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchReports()
  }, [refreshTrigger])

  const handleViewReport = async (id: number) => {
    setLoadingId(id)
    try {
      const report = await getReportById(id)
      onViewReport(report)
    } catch (err) {
      console.error('Failed to fetch report:', err)
    } finally {
      setLoadingId(null)
    }
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    })

  return (
    <div
      className="animate-fade-up-delay-2 rounded-2xl overflow-hidden border"
      style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      {/* Card header */}
      <div
        className="px-6 py-4 border-b flex items-center justify-between"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)' }}
          >
            <History size={15} className="text-indigo-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Report History</h2>
            <p className="text-white/30 text-xs mt-0.5">
              {reports.length > 0
                ? `${reports.length} report${reports.length !== 1 ? 's' : ''} analysed`
                : 'Your previously uploaded reports'}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
            <p className="text-white/25 text-xs">Loading reports...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-14">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <FileText size={24} className="text-white/20" />
            </div>
            <p className="text-white/35 font-semibold text-sm">No reports yet</p>
            <p className="text-white/20 text-xs mt-1">Upload your first report above to get started</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {reports.map((report) => (
              <button
                key={report.id}
                onClick={() => handleViewReport(report.id)}
                disabled={loadingId === report.id}
                className="w-full text-left rounded-xl p-4 transition-all duration-200 flex items-center gap-4 group border disabled:opacity-50"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(124,58,237,0.08)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(124,58,237,0.25)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.07)'
                }}
              >
                {/* File icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 border"
                  style={{
                    background: 'rgba(124,58,237,0.12)',
                    borderColor: 'rgba(124,58,237,0.2)'
                  }}
                >
                  <FileText size={17} className="text-purple-400" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm truncate">{report.filename}</p>
                  <p className="text-white/30 text-xs mt-0.5 line-clamp-1 leading-relaxed">
                    {report.ai_summary}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Clock size={10} className="text-white/20" />
                    <span className="text-white/20 text-xs">{formatDate(report.created_at)}</span>
                  </div>
                </div>

                {/* Arrow / loader */}
                <div className="flex-shrink-0">
                  {loadingId === report.id ? (
                    <div className="w-4 h-4 rounded-full border-2 border-purple-500/30 border-t-purple-400 animate-spin" />
                  ) : (
                    <ChevronRight size={16} className="text-white/20 group-hover:text-purple-400 transition-colors" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}