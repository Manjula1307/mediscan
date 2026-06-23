import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen grid-overlay flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #0F0C29 0%, #1a1040 50%, #0d1b3e 100%)' }}>
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 border-purple-500 border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-white/40 text-sm">Loading MediScan...</p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App