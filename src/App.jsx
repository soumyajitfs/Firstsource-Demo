import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import MyWork from './pages/MyWork'
import UploadReturnedCheck from './pages/UploadReturnedCheck'
import CheckAnalysis from './pages/CheckAnalysis'
import ConfirmationAudit from './pages/ConfirmationAudit'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-work" element={<MyWork />} />
          <Route path="/upload" element={<UploadReturnedCheck />} />
          <Route path="/analysis" element={<CheckAnalysis />} />
          <Route path="/confirmation" element={<ConfirmationAudit />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

