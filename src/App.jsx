import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import MyWork from './pages/MyWork'
import UploadReturnedCheck from './pages/UploadReturnedCheck'
import CheckAnalysis from './pages/CheckAnalysis'
import ConfirmationAudit from './pages/ConfirmationAudit'
import ProviderDetails from './pages/ProviderDetails'
import StopPayment from './pages/StopPayment'
import StopPaymentWork from './pages/StopPaymentWork'
import StopPaymentUpload from './pages/StopPaymentUpload'
import CashPosting from './pages/CashPosting'
import CashPostingWork from './pages/CashPostingWork'
import CashPostingUpload from './pages/CashPostingUpload'
import CashPostingProviderDetails from './pages/CashPostingProviderDetails'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Return Check flow */}
          <Route path="/" element={<Home />} />
          <Route path="/my-work" element={<MyWork />} />
          <Route path="/upload" element={<UploadReturnedCheck />} />
          <Route path="/provider-details" element={<ProviderDetails />} />

          {/* Stop Payment flow (copies Return Check flow for now) */}
          <Route path="/stop-payment" element={<StopPayment />} />
          <Route path="/stop-payment/work" element={<StopPaymentWork />} />
          <Route path="/stop-payment/upload" element={<StopPaymentUpload />} />
          
          {/* Cash Posting flow (same as Stop Payment but without address comparison page) */}
          <Route path="/cash-posting" element={<CashPosting />} />
          <Route path="/cash-posting/work" element={<CashPostingWork />} />
          <Route path="/cash-posting/upload" element={<CashPostingUpload />} />
          <Route
            path="/cash-posting/provider-details"
            element={<CashPostingProviderDetails />}
          />
          
          <Route path="/analysis" element={<CheckAnalysis />} />
          <Route path="/confirmation" element={<ConfirmationAudit />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

