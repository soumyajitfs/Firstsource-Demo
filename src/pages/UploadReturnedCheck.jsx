import React, { useState, useEffect } from 'react'
import './UploadReturnedCheck.css'
import { checkDocumentHtml } from '../data/checkDocumentHtml'
import { mockExtractedData, mockCustomerData } from '../data/mockData'

const UploadReturnedCheck = () => {
  const [pdfPreview, setPdfPreview] = useState(null)
  const [step, setStep] = useState('initial') // initial, extracted, verified, caseForm, caseCreated
  const [extractedData, setExtractedData] = useState(mockExtractedData)
  const [customerData] = useState(mockCustomerData)
  const [isExtracting, setIsExtracting] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isCreatingCase, setIsCreatingCase] = useState(false)
  const [caseNumber, setCaseNumber] = useState(null)
  const [caseFormData, setCaseFormData] = useState({
    source: 'Customer',
    dateOfReceipt: '1/05/2025',
    method: 'eMail',
    accountNo: '1121212',
    vulnerable: false,
    initialClassification: 'FOS Eligible'
  })

  useEffect(() => {
    const blob = new Blob([checkDocumentHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    setPdfPreview(url)
    
    return () => {
      if (url) {
        URL.revokeObjectURL(url)
      }
    }
  }, [])

  const handleExtractInfo = () => {
    setIsExtracting(true)
    setTimeout(() => {
      setIsExtracting(false)
      setStep('extracted')
    }, 1500)
  }

  const handleVerifyAries = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      setStep('verified')
    }, 1000)
  }

  const handleCreateCase = () => {
    setIsCreatingCase(true)
    setTimeout(() => {
      setIsCreatingCase(false)
      const newCaseNumber = Math.floor(100000 + Math.random() * 900000).toString()
      setCaseNumber(newCaseNumber)
      setStep('caseCreated')
    }, 1000)
  }

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

  const handleCaseFormChange = (field, value) => {
    setCaseFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCloseModal = () => {
    setStep('caseForm')
  }

  const handleGoToAnalysis = () => {
    // Navigate to analysis page or reset
    window.location.href = '/analysis'
  }

  return (
    <div className="upload-page">
      <div className="breadcrumbs">
        <span>My Work</span>
        <span className="separator">/</span>
        <span>Returned Check Document</span>
      </div>

      <div className="split-container">
        {/* Left Side - PDF Viewer */}
        <div className="pdf-section">
          <div className="preview-header">
            <h3>Document Preview</h3>
            <div className="preview-controls">
              <button className="control-btn" disabled>−</button>
              <span className="page-info">Page 1 of 1</span>
              <button className="control-btn" disabled>+</button>
            </div>
          </div>
          <div className="pdf-viewer">
            {pdfPreview && (
              <iframe
                src={pdfPreview}
                title="Document Preview"
                className="pdf-iframe"
              />
            )}
          </div>
        </div>

        {/* Right Side - Extraction Area */}
        <div className="extraction-section">
          {step === 'initial' && (
            <div className="extraction-initial">
              <button
                className="extract-btn"
                onClick={handleExtractInfo}
                disabled={isExtracting}
              >
                {isExtracting ? 'Extracting Information...' : 'Extract Info from Returned Check'}
              </button>
              {isExtracting && (
                <div className="extraction-progress">
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                  <p>Extracting check details, account information, and address data...</p>
                </div>
              )}
            </div>
          )}

          {step === 'extracted' && (
            <div className="extracted-info">
              <div className="section-header">
                <span className="section-icon">📧</span>
                <h4>Extracting check details from document</h4>
              </div>
              
              <div className="form-fields">
                <div className="form-field">
                  <label>Check Number</label>
                  <input
                    type="text"
                    value={extractedData.checkNumber}
                    onChange={(e) => handleFieldChange('checkNumber', e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Account Number</label>
                  <input
                    type="text"
                    value={extractedData.accountNumber}
                    onChange={(e) => handleFieldChange('accountNumber', e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Account Holder Name</label>
                  <input
                    type="text"
                    value={extractedData.accountHolder}
                    onChange={(e) => handleFieldChange('accountHolder', e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Check Amount</label>
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

                <div className="form-field">
                  <label>Street Address</label>
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

              <button
                className="verify-btn"
                onClick={handleVerifyAries}
                disabled={isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Verify Aries before Case Creation'}
              </button>
            </div>
          )}

          {step === 'verified' && (
            <div className="verified-info">
              <div className="customer-details-section">
                <div className="section-header">
                  <span className="section-icon">🖥️</span>
                  <h4>Customer Details from Aries</h4>
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
                </div>
              </div>

              <div className="create-case-section">
                <div className="section-header">
                  <span className="section-icon">📋</span>
                  <h4>Create Case in iCaseWork</h4>
                </div>
                <div className="case-form">
                  <div className="form-field">
                    <label>Source</label>
                    <select
                      value={caseFormData.source}
                      onChange={(e) => handleCaseFormChange('source', e.target.value)}
                      className="case-select"
                    >
                      <option value="Customer">Customer</option>
                      <option value="Internal">Internal</option>
                      <option value="External">External</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Date of Receipt</label>
                    <input
                      type="text"
                      value={caseFormData.dateOfReceipt}
                      onChange={(e) => handleCaseFormChange('dateOfReceipt', e.target.value)}
                    />
                  </div>

                  <div className="form-field">
                    <label>Method</label>
                    <select
                      value={caseFormData.method}
                      onChange={(e) => handleCaseFormChange('method', e.target.value)}
                      className="case-select"
                    >
                      <option value="eMail">eMail</option>
                      <option value="Phone">Phone</option>
                      <option value="Mail">Mail</option>
                      <option value="Online">Online</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Account No</label>
                    <input
                      type="text"
                      value={caseFormData.accountNo}
                      onChange={(e) => handleCaseFormChange('accountNo', e.target.value)}
                    />
                  </div>

                  <div className="form-field">
                    <label>Customer in Vulnerable Circumstances</label>
                    <div className="toggle-container">
                      <span className="toggle-label">Yes</span>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={caseFormData.vulnerable}
                          onChange={(e) => handleCaseFormChange('vulnerable', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Initial Classification</label>
                    <select
                      value={caseFormData.initialClassification}
                      onChange={(e) => handleCaseFormChange('initialClassification', e.target.value)}
                      className="case-select"
                    >
                      <option value="FOS Eligible">FOS Eligible</option>
                      <option value="Not FOS Eligible">Not FOS Eligible</option>
                      <option value="Pending Review">Pending Review</option>
                    </select>
                  </div>

                  <button
                    className="create-case-btn"
                    onClick={handleCreateCase}
                    disabled={isCreatingCase}
                  >
                    {isCreatingCase ? 'Creating Case...' : 'Create Case in iCaseWork'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'caseCreated' && caseNumber && (
            <div className="case-created-modal-overlay" onClick={handleCloseModal}>
              <div className="case-created-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>iCaseWork Case Creation</h3>
                  <button className="close-btn" onClick={handleCloseModal}>×</button>
                </div>
                <div className="modal-content">
                  <div className="success-message">
                    <div className="success-text">
                      <span className="success-label">Case Created</span>
                      <span className="case-number-display">:{caseNumber}</span>
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button className="action-btn close-action" onClick={handleCloseModal}>
                      Close
                    </button>
                    <button className="action-btn analysis-action" onClick={handleGoToAnalysis}>
                      Go to Case Analysis
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UploadReturnedCheck
