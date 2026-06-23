import { useState, useRef } from 'react'
import { Upload, FileText, X, CloudUpload } from 'lucide-react'
import { uploadReport } from '../api/reports'
import type { Report } from '../types'

interface UploadSectionProps {
  onReportReady: (report: Report) => void
}

export default function UploadSection({ onReportReady }: UploadSectionProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file.type !== 'application/pdf') { setError('Please select a PDF file only.'); return }
    if (file.size > 10 * 1024 * 1024) { setError('File size must be under 10MB.'); return }
    setSelectedFile(file)
    setError('')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    setUploading(true)
    setError('')
    try {
      const report = await uploadReport(selectedFile)
      onReportReady(report)
      setSelectedFile(null)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed. Try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div
      className="animate-fade-up-delay-1 rounded-2xl overflow-hidden border"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.08)'
      }}
    >
      {/* Card header */}
      <div
        className="px-6 py-4 border-b flex items-center gap-3"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.3)' }}
        >
          <CloudUpload size={16} className="text-purple-400" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">Upload Medical Report</h2>
          <p className="text-white/30 text-xs mt-0.5">Blood tests, prescriptions, any medical PDF</p>
        </div>
      </div>

      <div className="p-6">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleInputChange}
          className="hidden"
        />

        {/* Drop zone */}
        <div
          onClick={() => !uploading && fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className="rounded-xl p-8 text-center transition-all duration-200 border-2 border-dashed cursor-pointer"
          style={{
            background: dragOver
              ? 'rgba(124,58,237,0.1)'
              : selectedFile
              ? 'rgba(16,185,129,0.05)'
              : 'rgba(255,255,255,0.02)',
            borderColor: dragOver
              ? 'rgba(124,58,237,0.7)'
              : selectedFile
              ? 'rgba(16,185,129,0.4)'
              : 'rgba(255,255,255,0.1)',
            transform: dragOver ? 'scale(1.01)' : 'scale(1)',
          }}
        >
          {selectedFile ? (
            <div className="flex items-center justify-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}
              >
                <FileText size={22} className="text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="font-semibold text-white text-sm truncate">{selectedFile.name}</p>
                <p className="text-white/35 text-xs mt-0.5">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB · PDF
                </p>
                <p className="text-emerald-400 text-xs font-semibold mt-1">✓ Ready to analyse</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedFile(null) }}
                className="text-white/25 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10 flex-shrink-0"
              >
                <X size={15} />
              </button>
            </div>
          ) : (
            <div>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(99,102,241,0.1))',
                  border: '1px solid rgba(124,58,237,0.25)'
                }}
              >
                <Upload size={22} className="text-purple-400" />
              </div>
              <p className="text-white/60 font-semibold text-sm mb-1">Drop your PDF here</p>
              <p className="text-white/30 text-xs">
                or{' '}
                <span className="text-purple-400 underline underline-offset-2 font-semibold">
                  click to browse
                </span>
              </p>
              <p className="text-white/20 text-xs mt-3">PDF only · Max 10MB</p>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div
            className="mt-3 flex items-start gap-2 px-4 py-3 rounded-xl text-xs text-red-300 border"
            style={{ background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.2)' }}
          >
            <span>⚠</span><span>{error}</span>
          </div>
        )}

        {/* Analyse button */}
        {selectedFile && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full mt-4 py-3.5 rounded-xl text-white font-bold text-sm transition-all duration-200 glow-purple disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] flex items-center justify-center gap-2.5 border border-white/10"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #6366F1)' }}
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Analysing with AI
                <span className="text-purple-300 text-xs font-normal">(20–30 seconds)</span>
              </>
            ) : (
              <>
                <Upload size={16} />
                Analyse Report
              </>
            )}
          </button>
        )}

        {/* Feature hints */}
        {!selectedFile && !uploading && (
          <div className="mt-4 flex items-center justify-center gap-6">
            {['Plain language', 'Abnormal detection', 'Doctor questions'].map((t) => (
              <div key={t} className="flex items-center gap-1.5 text-xs text-white/25">
                <span className="text-purple-500">✦</span>{t}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}