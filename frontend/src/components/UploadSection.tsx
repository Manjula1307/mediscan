import { useState, useRef } from 'react'
import { Upload, FileText, X, Loader2 } from 'lucide-react'
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
    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file only.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be under 10MB.')
      return
    }
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
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Upload failed. Please try again.')
      }
    } finally {
      setUploading(false)
    }
  }
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-1">Upload Report</h2>
      <p className="text-sm text-gray-400 mb-5">Upload a blood test, prescription, or any medical PDF</p>

      {/* Hidden real file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Custom styled drop zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-blue-400 bg-blue-50'
            : selectedFile
            ? 'border-green-400 bg-green-50'
            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
        }`}
      >
        {selectedFile ? (
          <div className="flex items-center justify-center gap-3">
            <FileText className="text-green-600" size={32} />
            <div className="text-left">
              <p className="font-semibold text-gray-800 text-sm">{selectedFile.name}</p>
              <p className="text-xs text-gray-400">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedFile(null) }}
              className="ml-2 text-gray-400 hover:text-red-500"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <div>
            <Upload className="mx-auto text-gray-300 mb-3" size={40} />
            <p className="text-gray-500 font-medium text-sm">
              Drop your PDF here, or <span className="text-blue-600">click to browse</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">PDF files only, max 10MB</p>
          </div>
        )}
      </div>
      {/* Error */}
      {error && (
        <div className="mt-3 text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* Analyse button */}
      {selectedFile && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Analysing with AI... (may take 20-30 seconds)
            </>
          ) : (
            <>
              <Upload size={18} />
              Analyse Report
            </>
          )}
        </button>
      )}
    </div>
  )
}