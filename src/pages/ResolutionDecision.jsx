import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ResolutionDecision.css'
import { mockValidationResults } from '../data/mockData'

const ResolutionDecision = () => {
  const navigate = useNavigate()
  const [vulnerability, setVulnerability] = useState(false)
  const [decision, setDecision] = useState('Valid Complaint')
  const [reason, setReason] = useState('')
  const [reportableToFCA, setReportableToFCA] = useState('Yes')

  const validationResults = mockValidationResults

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

  return (
    <div className="resolution-decision">
      <div className="breadcrumbs">
        <span>My Work</span>
        <span className="separator">/</span>
        <span>Resolution Decision</span>
      </div>

      <div className="page-header">
        <h2>Resolution Decision</h2>
      </div>

      <div className="decision-grid">
        <div className="decision-card">
          <div className="card-header">
            <span className="card-icon">✅</span>
            <h4>Mandatory Checks & Validation Analysis</h4>
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
          </div>
        </div>

        <div className="decision-card">
          <div className="card-header">
            <span className="card-icon">📋</span>
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
    </div>
  )
}

export default ResolutionDecision

