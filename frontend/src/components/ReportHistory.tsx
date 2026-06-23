import { useEffect, useState } from 'react'
import { Clock, FileText, ChevronRight, Loader2 } from 'lucide-react'
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-1">Report History</h2>
      <p className="text-sm text-gray-400 mb-5">Your previously uploaded reports</p>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="animate-spin text-blue-600" size={24} />
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-10">
          <FileText className="mx-auto text-gray-200 mb-3" size={44} />
          <p className="text-gray-400 font-medium text-sm">No reports yet</p>
          <p className="text-gray-300 text-xs mt-1">Upload your first report above</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map((report) => (
            <button
              key={report.id}
              onClick={() => handleViewReport(report.id)}
              disabled={loadingId === report.id}
              className="w-full text-left bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 rounded-xl p-4 transition-all flex items-center gap-4 group"
            >
              <div className="bg-blue-100 p-2.5 rounded-xl flex-shrink-0">
                <FileText className="text-blue-600" size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">{report.filename}</p>
                <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{report.ai_summary}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <Clock size={11} className="text-gray-300" />
                  <span className="text-xs text-gray-300">{formatDate(report.created_at)}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                {loadingId === report.id ? (
                  <Loader2 size={18} className="text-blue-600 animate-spin" />
                ) : (
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}