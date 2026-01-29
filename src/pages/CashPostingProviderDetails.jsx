import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './ProviderDetails.css'
import {
  mockExtractedDataCashPostingCHK001,
  mockExtractedDataCashPostingCHK002,
  mockReturnedChecks
} from '../data/mockData'

const CashPostingProviderDetails = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const checkId = searchParams.get('checkId')

  const selectedCheck =
    mockReturnedChecks.find((check) => check.id === checkId) ||
    mockReturnedChecks[0]
  const extractedData =
    selectedCheck.id === 'CHK002' ? mockExtractedDataCashPostingCHK002 : mockExtractedDataCashPostingCHK001

  const handleUpdateCheckAmount = () => {
    // Handle Update Check Amount On EFR action
    alert('Update Check Amount On EFR action triggered')
    // Navigate or show success message
    navigate('/cash-posting/work')
  }

  const handlePushToManualQueue = () => {
    // Handle push to Manual Queue action
    alert('Push to Manual Queue action triggered')
    // Navigate or show success message
    navigate('/cash-posting/work')
  }

  return (
    <div className="provider-details-page">
      <div className="breadcrumbs">
        <span>Cash Posting</span>
        <span className="separator">/</span>
        <span>Provider Details</span>
      </div>

      <div className="page-header">
        <h2>Provider Details</h2>
        <p className="page-subtitle">Fetched from returned package (read-only)</p>
      </div>

      <div className="provider-details-card">
        <div className="provider-grid">
          <div className="provider-field">
            <div className="provider-label">Recovery Amount</div>
            <div className="provider-value">{extractedData.recoveryAmount || extractedData.checkAmount}</div>
          </div>

          <div className="provider-field">
            <div className="provider-label">Check Number</div>
            <div className="provider-value">{extractedData.checkNumber}</div>
          </div>

          <div className="provider-field">
            <div className="provider-label">Claim Number</div>
            <div className="provider-value">{extractedData.claimNumber}</div>
          </div>
        </div>

        <div className="provider-actions" style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button className="verify-btn" onClick={handleUpdateCheckAmount} style={{ flex: '1', maxWidth: '300px' }}>
            Update Check Amount On EFR
          </button>
          <button className="verify-btn" onClick={handlePushToManualQueue} style={{ flex: '1', maxWidth: '300px', backgroundColor: '#3b82f6' }}>
            Push to Manual Queue
          </button>
        </div>
      </div>
    </div>
  )
}

export default CashPostingProviderDetails

