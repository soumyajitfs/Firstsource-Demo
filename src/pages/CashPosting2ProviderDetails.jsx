import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './ProviderDetails.css'
import '../pages/UploadReturnedCheck.css'
import {
  mockReturnedChecksCashPosting,
  cashPostingExtractedDataMap,
  mockExtractedDataCashPostingCHK001
} from '../data/mockData'

const CashPosting2ProviderDetails = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const checkId = searchParams.get('checkId')
  const [showReissueModal, setShowReissueModal] = useState(false)

  const selectedCheck =
    mockReturnedChecksCashPosting.find((check) => check.id === checkId) ||
    mockReturnedChecksCashPosting[0]
  const extractedData =
    cashPostingExtractedDataMap[selectedCheck.id] || mockExtractedDataCashPostingCHK001

  // Normalize helper for comparison
  const normalizeValue = (str) =>
    str ? str.toString().toUpperCase().trim().replace(/\s+/g, ' ') : ''

  // Extract numeric value from currency string for comparison
  const extractNumericValue = (str) => {
    if (!str) return 0
    const cleaned = str.toString().replace(/[^0-9.]/g, '')
    return parseFloat(cleaned) || 0
  }

  // Comparison logic: Check Amount vs Recovery Amount
  const checkAmountMatch =
    extractNumericValue(extractedData.checkAmount) === extractNumericValue(extractedData.gasRecoveryAmount)
  const claimNumberMatch =
    normalizeValue(extractedData.claimNumber) === normalizeValue(extractedData.gasClaimNumber)

  const handleUpdateCheckAmount = () => {
    // Show bot modal
    setShowReissueModal(true)
  }

  const handlePushToManualQueue = () => {
    // Show bot modal
    setShowReissueModal(true)
  }

  const closeReissueModal = () => {
    setShowReissueModal(false)
    // Navigate back to work page after closing modal
    navigate('/cash-posting-2/work')
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

      <div className="comparison-section">
        <div className="comparison-grid">
          {/* Left Side - Details from Letter / Document */}
          <div className="comparison-panel">
            <div className="comparison-panel-header complaint-header">
              <span className="panel-icon">📄</span>
              <h5>Details from Letter / Document</h5>
            </div>
            <div className="comparison-fields">
              {/* Check Amount first - with comparison styling */}
              <div
                className={`comparison-field ${
                  checkAmountMatch ? 'field-match' : 'field-mismatch'
                }`}
              >
                <span className="field-label">Check Amount</span>
                <span className="field-value">{extractedData.checkAmount}</span>
              </div>
              {/* Claim Number second - with comparison styling */}
              <div
                className={`comparison-field ${
                  claimNumberMatch ? 'field-match' : 'field-mismatch'
                }`}
              >
                <span className="field-label">Claim Number</span>
                <span className="field-value">{extractedData.claimNumber}</span>
              </div>
              {/* Other fields */}
              <div className="comparison-field">
                <span className="field-label">Check Date</span>
                <span className="field-value">{extractedData.checkDate}</span>
              </div>
              <div className="comparison-field">
                <span className="field-label">Provider Name</span>
                <span className="field-value">{extractedData.providerName}</span>
              </div>
            </div>
          </div>

          {/* Right Side - Details from CAS */}
          <div className="comparison-panel">
            <div className="comparison-panel-header aries-header">
              <span className="panel-icon">🖥️</span>
              <h5>Details from Claims Adjudication System</h5>
            </div>
            <div className="comparison-fields">
              {/* Recovery Amount first - with comparison styling */}
              <div
                className={`comparison-field ${
                  checkAmountMatch ? 'field-match' : 'field-mismatch'
                }`}
              >
                <span className="field-label">Recovery Amount</span>
                <span className="field-value">{extractedData.gasRecoveryAmount}</span>
              </div>
              {/* Claim Number second - with comparison styling */}
              <div
                className={`comparison-field ${
                  claimNumberMatch ? 'field-match' : 'field-mismatch'
                }`}
              >
                <span className="field-label">Claim Number</span>
                <span className="field-value">{extractedData.gasClaimNumber}</span>
              </div>
              {/* Other fields */}
              <div className="comparison-field">
                <span className="field-label">Recover Number</span>
                <span className="field-value">{extractedData.gasRecoveryNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="cant-do-section" style={{ marginTop: '30px' }}>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            {checkAmountMatch && (
              <div style={{
                padding: '16px 40px',
                background: 'linear-gradient(135deg, #e8f1ff 0%, #d2e7fc 100%)',
                borderRadius: '12px',
                color: '#13338E',
                fontSize: '16px',
                fontWeight: '600',
                textAlign: 'center',
                border: '1px solid #D0E6FB'
              }}>
                ✅ EFR update completed
              </div>
            )}
            {!checkAmountMatch && (
              <button
                className="verify-btn"
                onClick={handlePushToManualQueue}
                style={{
                  flex: '1',
                  maxWidth: '300px',
                  background: 'linear-gradient(135deg, #13338E 0%, #0F2A74 100%)'
                }}
              >
                Push to Manual Queue
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Bot Triggered Modal */}
      {showReissueModal && (
        <div className="reissue-modal-overlay" onClick={closeReissueModal}>
          <div className="reissue-modal" onClick={(e) => e.stopPropagation()}>
            <div className="reissue-modal-header">
              <h3>Bot Triggered</h3>
              <button className="close-btn" onClick={closeReissueModal}>
                ×
              </button>
            </div>
            <div className="reissue-modal-content">
              <div className="bot-trigger-message">
                <div className="bot-icon">🤖</div>
                <div className="bot-trigger-text">
                  <span className="bot-trigger-label">Automated Process Initiated</span>
                  <p className="bot-trigger-description">
                    The bot has been triggered to process your request. 
                    The workflow will continue automatically in the background.
                  </p>
                </div>
              </div>
              <div className="reissue-modal-actions">
                <button className="action-btn close-action" onClick={closeReissueModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CashPosting2ProviderDetails

