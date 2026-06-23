import { useState } from 'react'
import Header from '../components/Header'
import UploadSection from '../components/UploadSection'
import ReportResult from '../components/ReportResult'
import ReportHistory from '../components/ReportHistory'
import type { Report } from '../types'

export default function Dashboard() {
  const [currentReport, setCurrentReport] = useState<Report | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleReportReady = (report: Report) => {
    setCurrentReport(report)
    setRefreshTrigger(prev => prev + 1)
  }

  const handleViewReport = (report: Report) => {
    setCurrentReport(report)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      className="min-h-screen relative"
      style={{ background: 'linear-gradient(135deg, #0F0C29 0%, #1a1040 50%, #0d1b3e 100%)' }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.1), transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)' }} />

      <Header />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-5">

        {/* Welcome banner */}
        <div
          className="animate-fade-up rounded-2xl p-6 relative overflow-hidden border"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(99,102,241,0.15))',
            borderColor: 'rgba(124,58,237,0.25)'
          }}
        >
          <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2), transparent)' }} />
          <div className="relative z-10">
            <h2 className="text-xl font-extrabold text-white tracking-tight mb-1">
              Medical Report Analyser
            </h2>
            <p className="text-white/45 text-sm leading-relaxed max-w-lg">
              Upload any medical PDF and get a plain-language AI explanation,
              abnormal value detection, and personalised doctor questions — in under 30 seconds.
            </p>
            <div className="flex gap-3 mt-4">
              {['Plain language', 'Abnormal detection', 'Doctor questions'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-purple-300 px-3 py-1 rounded-full border"
                  style={{ background: 'rgba(124,58,237,0.15)', borderColor: 'rgba(124,58,237,0.3)' }}
                >
                  ✦ {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <UploadSection onReportReady={handleReportReady} />

        {currentReport && (
          <ReportResult
            report={currentReport}
            onClose={() => setCurrentReport(null)}
          />
        )}

        <ReportHistory
          onViewReport={handleViewReport}
          refreshTrigger={refreshTrigger}
        />

      </main>
    </div>
  )
}