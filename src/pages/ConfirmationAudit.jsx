import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ConfirmationAudit.css'

const ConfirmationAudit = () => {
  const navigate = useNavigate()
  const [caseNumber] = useState('RC-321123')

  const auditTrail = [
    {
      timestamp: '2025-01-20 10:15:32',
      action: 'Check uploaded',
      user: 'System',
      details: 'PDF document uploaded successfully'
    },
    {
      timestamp: '2025-01-20 10:16:45',
      action: 'Data extraction completed',
      user: 'System',
      details: 'Check details, account information, and address extracted'
    },
    {
      timestamp: '2025-01-20 10:18:12',
      action: 'Validation performed',
      user: 'System',
      details: 'All mandatory checks completed - 7 passed, 2 warnings'
    },
    {
      timestamp: '2025-01-20 10:20:33',
      action: 'Resolution decision made',
      user: 'John Doe',
      details: 'Decision: Valid Complaint - Requires account review'
    },
    {
      timestamp: '2025-01-20 10:21:15',
      action: 'Case resolved',
      user: 'System',
      details: `Case ${caseNumber} marked as resolved`
    }
  ]

  const resolutionSummary = {
    caseNumber: caseNumber,
    checkNumber: '1234567890',
    accountHolder: 'John Smith',
    amount: 1250.00,
    returnReason: 'Insufficient Funds',
    decision: 'Valid Complaint',
    status: 'Resolved',
    reportableToFCA: 'Yes',
    resolvedDate: '2025-01-20 10:21:15'
  }

  const handleGoToAnalysis = () => {
    navigate('/analysis')
  }

  const handleClose = () => {
    navigate('/')
  }

  return (
    <div className="confirmation-audit">
      <div className="breadcrumbs">
        <span>My Work</span>
        <span className="separator">/</span>
        <span>Resolution Confirmation</span>
      </div>

      <div className="confirmation-modal">
        <div className="modal-header">
          <h2>Returned Check Resolution</h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>
        <div className="modal-content">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <div className="success-text">
              <h3>Case Resolved</h3>
              <p className="case-number">Case Number: <span>{caseNumber}</span></p>
            </div>
          </div>

          <div className="resolution-summary">
            <h4>Resolution Summary</h4>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Check Number:</span>
                <span className="summary-value">{resolutionSummary.checkNumber}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Account Holder:</span>
                <span className="summary-value">{resolutionSummary.accountHolder}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Amount:</span>
                <span className="summary-value">${resolutionSummary.amount.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Return Reason:</span>
                <span className="summary-value">{resolutionSummary.returnReason}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Decision:</span>
                <span className="summary-value decision">{resolutionSummary.decision}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Status:</span>
                <span className="summary-value status-resolved">{resolutionSummary.status}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Reportable to FCA:</span>
                <span className="summary-value">{resolutionSummary.reportableToFCA}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Resolved Date:</span>
                <span className="summary-value">{resolutionSummary.resolvedDate}</span>
              </div>
            </div>
          </div>

          <div className="audit-trail">
            <h4>Audit Trail</h4>
            <div className="trail-list">
              {auditTrail.map((entry, index) => (
                <div key={index} className="trail-item">
                  <div className="trail-timestamp">{entry.timestamp}</div>
                  <div className="trail-content">
                    <div className="trail-action">{entry.action}</div>
                    <div className="trail-details">{entry.details}</div>
                    <div className="trail-user">By: {entry.user}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button className="action-btn close-action" onClick={handleClose}>
              Close
            </button>
            <button className="action-btn analysis-action" onClick={handleGoToAnalysis}>
              Go to Case Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationAudit

