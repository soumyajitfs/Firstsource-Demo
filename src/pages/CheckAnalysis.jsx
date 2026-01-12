import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CheckAnalysis.css'
import { mockExtractedData, mockCustomerData } from '../data/mockData'

const CheckAnalysis = () => {
  const navigate = useNavigate()
  const [extractedData, setExtractedData] = useState(mockExtractedData)
  const [customerData] = useState(mockCustomerData)

  const handleFieldChange = (field, value) => {
    setExtractedData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddressChange = (field, value) => {
    setExtractedData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }))
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return '#28a745'
    if (confidence >= 0.75) return '#ffc107'
    return '#dc3545'
  }

  const getConfidenceLabel = (confidence) => {
    if (confidence >= 0.9) return 'High'
    if (confidence >= 0.75) return 'Medium'
    return 'Low'
  }

  const handleVerifyAndContinue = () => {
    navigate('/decision')
  }

  return (
    <div className="check-analysis">
      <div className="breadcrumbs">
        <span>My Work</span>
        <span className="separator">/</span>
        <span>Check Analysis</span>
      </div>

      <div className="page-header">
        <h2>Extract Info from Returned Check</h2>
      </div>

      <div className="extraction-header">
        <div className="section-icon">📧</div>
        <h3>Extracting check details from document</h3>
      </div>

      <div className="analysis-grid">
        <div className="analysis-card">
          <div className="card-header">
            <span className="card-icon">📄</span>
            <h4>Check Details from Document</h4>
          </div>
          <div className="form-fields">
            <div className="form-field">
              <label>
                Check Number
                <span 
                  className="confidence-badge"
                  style={{ backgroundColor: getConfidenceColor(extractedData.confidence.checkNumber) }}
                >
                  {getConfidenceLabel(extractedData.confidence.checkNumber)}
                </span>
              </label>
              <input
                type="text"
                value={extractedData.checkNumber}
                onChange={(e) => handleFieldChange('checkNumber', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>
                Account Number
              </label>
              <input
                type="text"
                value={extractedData.accountNumber}
                onChange={(e) => handleFieldChange('accountNumber', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>
                Account Holder Name
                <span 
                  className="confidence-badge"
                  style={{ backgroundColor: getConfidenceColor(extractedData.confidence.accountHolder) }}
                >
                  {getConfidenceLabel(extractedData.confidence.accountHolder)}
                </span>
              </label>
              <input
                type="text"
                value={extractedData.accountHolder}
                onChange={(e) => handleFieldChange('accountHolder', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>
                Check Amount
                <span 
                  className="confidence-badge"
                  style={{ backgroundColor: getConfidenceColor(extractedData.confidence.amount) }}
                >
                  {getConfidenceLabel(extractedData.confidence.amount)}
                </span>
              </label>
              <input
                type="text"
                value={`$${extractedData.amount.toFixed(2)}`}
                onChange={(e) => {
                  const value = parseFloat(e.target.value.replace('$', '')) || 0
                  handleFieldChange('amount', value)
                }}
              />
            </div>

            <div className="form-field">
              <label>Check Date</label>
              <input
                type="date"
                value={extractedData.checkDate}
                onChange={(e) => handleFieldChange('checkDate', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Return Reason</label>
              <input
                type="text"
                value={extractedData.returnReason}
                onChange={(e) => handleFieldChange('returnReason', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Bank Name</label>
              <input
                type="text"
                value={extractedData.bankName}
                onChange={(e) => handleFieldChange('bankName', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Bank Routing Number</label>
              <input
                type="text"
                value={extractedData.bankRouting}
                onChange={(e) => handleFieldChange('bankRouting', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="analysis-card">
          <div className="card-header">
            <span className="card-icon">📍</span>
            <h4>Address Details from Document</h4>
          </div>
          <div className="form-fields">
            <div className="form-field">
              <label>
                Street Address
                <span 
                  className="confidence-badge"
                  style={{ backgroundColor: getConfidenceColor(extractedData.confidence.address) }}
                >
                  {getConfidenceLabel(extractedData.confidence.address)}
                </span>
              </label>
              <input
                type="text"
                value={extractedData.address.street}
                onChange={(e) => handleAddressChange('street', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>City</label>
              <input
                type="text"
                value={extractedData.address.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>State</label>
              <input
                type="text"
                value={extractedData.address.state}
                onChange={(e) => handleAddressChange('state', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>ZIP Code</label>
              <input
                type="text"
                value={extractedData.address.zip}
                onChange={(e) => handleAddressChange('zip', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="analysis-card">
          <div className="card-header">
            <span className="card-icon">🖥️</span>
            <h4>Customer Details from System</h4>
          </div>
          <div className="info-display">
            <div className="info-row">
              <span className="info-label">Account Exists?</span>
              <span className="info-value success">Yes</span>
            </div>
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
            <div className="info-row">
              <span className="info-label">Account Status</span>
              <span className="info-value success">{customerData.accountStatus}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="action-section">
        <button className="verify-btn" onClick={handleVerifyAndContinue}>
          Verify & Continue to Validation
        </button>
      </div>
    </div>
  )
}

export default CheckAnalysis

