import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './CheckAnalysis.css'
import { mockExtractedData, mockCustomerData, mockValidationResults } from '../data/mockData'
import { checkDocumentHtml } from '../data/checkDocumentHtml'

const CheckAnalysis = () => {
  const navigate = useNavigate()
  const [extractedData] = useState(mockExtractedData)
  const [customerData] = useState(mockCustomerData)
  const [vulnerability, setVulnerability] = useState(false)
  const [decision, setDecision] = useState('Valid Complaint')
  const [reason, setReason] = useState('')
  const [reportableToFCA, setReportableToFCA] = useState('Yes')
  const [showPdfModal, setShowPdfModal] = useState(false)
  const [pdfPreview, setPdfPreview] = useState(null)
  const validationResults = mockValidationResults

  useEffect(() => {
    if (showPdfModal) {
      const blob = new Blob([checkDocumentHtml], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      setPdfPreview(url)
      
      return () => {
        if (url) {
          URL.revokeObjectURL(url)
        }
      }
    }
  }, [showPdfModal])

  const getStatusIcon = (status) => {
    if (status === 'pass') return '✅'
    if (status === 'warning') return '⚠️'
    return '❌'
  }

  const getStatusColor = (status) => {
    if (status === 'pass') return '#28a745'
    if (status === 'warning') return '#ffc107'
    return '#dc3545'
  }

  const handleSendResults = () => {
    if (!reason.trim()) {
      alert('Please provide a reason for the final decision')
      return
    }
    navigate('/confirmation')
  }

  const handleReportToFCA = () => {
    alert('FCA reporting functionality would be triggered here (simulated)')
  }

  const handleViewDocument = (e) => {
    e.preventDefault()
    setShowPdfModal(true)
  }

  const handleClosePdfModal = () => {
    setShowPdfModal(false)
    if (pdfPreview) {
      URL.revokeObjectURL(pdfPreview)
      setPdfPreview(null)
    }
  }

  return (
    <div className="check-analysis">
      <div className="breadcrumbs">
        <span>My Work</span>
        <span className="separator">/</span>
        <span>Case Analysis</span>
      </div>

      {/* Current Complaint Section */}
      <div className="current-complaint-card">
        <div className="card-header-orange">
          <span className="card-icon">📧</span>
          <h3>Current Returned Check: {extractedData.checkNumber}</h3>
        </div>
        <div className="complaint-content">
          <div className="complaint-links">
            <a href="#background" className="complaint-link">Background</a>
            <a href="#description" className="complaint-link">Check Description</a>
            <a href="#financial" className="complaint-link">Financial Impact</a>
            <a href="#history" className="complaint-link">Past Return History</a>
          </div>
          <div className="complaint-details">
            <div className="complaint-text">
              <strong>Background:</strong> Returned check received for amount ${extractedData.amount.toFixed(2)} dated {extractedData.checkDate}
            </div>
            <div className="complaint-text">
              <strong>Check Description:</strong> {extractedData.returnReason}
            </div>
            <div className="complaint-text">
              <strong>Financial Impact:</strong> A loss of ${extractedData.amount.toFixed(2)} to the account
            </div>
            <div className="past-complaints">
              <div className="past-complaint-item">▲12-Jun-2023: Previous returned check - Insufficient Funds</div>
              <div className="past-complaint-item">▲12-Aug-2024: Account payment issue - Stop Payment</div>
            </div>
            <a href="#letter" className="view-letter-link" onClick={handleViewDocument}>📎 View Check Document</a>
          </div>
        </div>
      </div>

      {/* Customer Details Comparison */}
      <div className="comparison-row">
        <div className="comparison-card">
          <div className="card-header-orange">
            <span className="card-icon">📧</span>
            <h4>Customer Details from Check Letter</h4>
          </div>
          <div className="info-display">
            <div className="info-row">
              <span className="info-label">Customer Name</span>
              <span className="info-value">{extractedData.accountHolder}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email Address</span>
              <span className="info-value">N/A</span>
            </div>
            <div className="info-row">
              <span className="info-label">Date of Birth</span>
              <span className="info-value">N/A</span>
            </div>
            <div className="info-row">
              <span className="info-label">Telephone Number</span>
              <span className="info-value">N/A</span>
            </div>
            <div className="info-row">
              <span className="info-label">Address</span>
              <span className="info-value">
                {`${extractedData.address.street}, ${extractedData.address.city}, ${extractedData.address.state} ${extractedData.address.zip}`}
              </span>
            </div>
          </div>
        </div>

        <div className="comparison-card">
          <div className="card-header-green">
            <span className="card-icon">🖥️</span>
            <h4>Customer Details from Aries</h4>
          </div>
          <div className="info-display">
            <div className="info-row">
              <span className="info-label">Account Number</span>
              <span className="info-value">{customerData.accountNumber}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Customer Name</span>
              <span className="info-value">{customerData.customerName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email Address</span>
              <span className="info-value">{customerData.emailAddress}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Date of Birth</span>
              <span className="info-value">{customerData.dateOfBirth}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Telephone Number</span>
              <span className="info-value">{customerData.telephoneNumber}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Address</span>
              <span className="info-value">
                {`${customerData.address.street}, ${customerData.address.city}, ${customerData.address.state} ${customerData.address.zip}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Check Details Comparison */}
      <div className="comparison-row">
        <div className="comparison-card">
          <div className="card-header-orange">
            <span className="card-icon">📧</span>
            <h4>Check Details from Check Letter</h4>
          </div>
          <div className="info-display">
            <div className="info-row">
              <span className="info-label">Check Number</span>
              <span className="info-value">{extractedData.checkNumber}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Check Amount</span>
              <span className="info-value">${extractedData.amount.toFixed(2)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Check Date</span>
              <span className="info-value">{extractedData.checkDate}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Return Reason</span>
              <span className="info-value">{extractedData.returnReason}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Bank Name</span>
              <span className="info-value">{extractedData.bankName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Bank Routing</span>
              <span className="info-value">{extractedData.bankRouting}</span>
            </div>
          </div>
        </div>

        <div className="comparison-card">
          <div className="card-header-green">
            <span className="card-icon">🖥️</span>
            <h4>Check Details from Aries</h4>
          </div>
          <div className="info-display">
            <div className="info-row">
              <span className="info-label">Check Number</span>
              <span className="info-value">{extractedData.checkNumber}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Check Amount</span>
              <span className="info-value">${extractedData.amount.toFixed(2)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Check Date</span>
              <span className="info-value">{extractedData.checkDate}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Return Reason</span>
              <span className="info-value">{extractedData.returnReason}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Account Balance</span>
              <span className="info-value">${customerData.accountBalance.toFixed(2)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Last Payment Date</span>
              <span className="info-value">{customerData.lastPaymentDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Checks & Final Decision */}
      <div className="comparison-row">
        <div className="comparison-card">
          <div className="card-header-green">
            <span className="card-icon">✅</span>
            <h4>Mandatory checks & Check Analysis</h4>
          </div>
          <div className="validation-list">
            {Object.entries(validationResults).map(([key, result]) => (
              <div key={key} className="validation-item">
                <div className="validation-status">
                  <span 
                    className="status-icon"
                    style={{ color: getStatusColor(result.status) }}
                  >
                    {getStatusIcon(result.status)}
                  </span>
                  <span className="validation-label">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </div>
                <div className="validation-result">
                  <span 
                    className="result-badge"
                    style={{ 
                      backgroundColor: getStatusColor(result.status) === '#28a745' ? '#d4edda' : 
                                     getStatusColor(result.status) === '#ffc107' ? '#fff3cd' : '#f8d7da',
                      color: getStatusColor(result.status) === '#28a745' ? '#155724' : 
                             getStatusColor(result.status) === '#ffc107' ? '#856404' : '#721c24'
                    }}
                  >
                    {result.status === 'pass' ? 'Yes' : result.status === 'warning' ? 'Warning' : 'No'}
                  </span>
                </div>
              </div>
            ))}
            <div className="complaint-classification">
              <div className="classification-title">Check Classification:</div>
              <div className="classification-options">
                <div className="classification-item selected">
                  <span className="classification-icon">✓</span>
                  <span>Financial Loss</span>
                </div>
                <div className="classification-item">
                  <span className="classification-icon">✗</span>
                  <span>Material Distress</span>
                </div>
                <div className="classification-item">
                  <span className="classification-icon">✗</span>
                  <span>Material Inconvenience</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="comparison-card">
          <div className="card-header-green">
            <span className="card-icon">✅</span>
            <h4>Final Decision on Returned Check</h4>
          </div>
          <div className="decision-form">
            <div className="form-field">
              <label>Vulnerability</label>
              <div className="toggle-container">
                <span className="toggle-label">Yes</span>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={vulnerability}
                    onChange={(e) => setVulnerability(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="form-field">
              <label>Decision</label>
              <select
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                className="decision-select"
              >
                <option value="Valid Complaint">Valid Complaint</option>
                <option value="Invalid Complaint">Invalid Complaint</option>
                <option value="No Clear Evidence">No Clear Evidence</option>
                <option value="Requires Investigation">Requires Investigation</option>
              </select>
            </div>

            <div className="form-field">
              <label>Reason for Final Decision</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter the reason for your decision..."
                className="reason-textarea"
                rows="6"
              />
            </div>

            <div className="form-field">
              <label>Reportable to FCA</label>
              <select
                value={reportableToFCA}
                onChange={(e) => setReportableToFCA(e.target.value)}
                className="decision-select"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="action-buttons">
              <button className="send-results-btn" onClick={handleSendResults}>
                Send Final Resolution Results
              </button>
              {reportableToFCA === 'Yes' && (
                <button className="report-fca-btn" onClick={handleReportToFCA}>
                  Report to FCA
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PDF Modal */}
      {showPdfModal && (
        <div className="pdf-modal-overlay" onClick={handleClosePdfModal}>
          <div className="pdf-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pdf-modal-header">
              <h3>Check Document</h3>
              <button className="pdf-modal-close" onClick={handleClosePdfModal}>×</button>
            </div>
            <div className="pdf-modal-content">
              {pdfPreview && (
                <iframe
                  src={pdfPreview}
                  title="Check Document"
                  className="pdf-modal-iframe"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckAnalysis
