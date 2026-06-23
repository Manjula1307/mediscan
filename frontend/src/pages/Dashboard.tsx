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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
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