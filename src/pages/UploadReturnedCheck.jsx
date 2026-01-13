import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './UploadReturnedCheck.css'
import { mockExtractedData, mockCustomerData } from '../data/mockData'

const UploadReturnedCheck = () => {
  const navigate = useNavigate()
  // Path to the actual PDF file in the public folder
  const pdfUrl = '/returned-check.pdf'
  const [step, setStep] = useState('initial') // initial, extracted, addressComparison, verified
  const [extractedData, setExtractedData] = useState(mockExtractedData)
  const [customerData] = useState(mockCustomerData)
  const [isExtracting, setIsExtracting] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isCreatingCase, setIsCreatingCase] = useState(false)
  const [returnCheckType, setReturnCheckType] = useState('') // 'Postal' or 'Non-Postal'
  const [caseFormData, setCaseFormData] = useState({
    source: 'Customer',
    dateOfReceipt: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }),
    method: 'eMail',
    accountNo: mockExtractedData.patientAccountNumber || '',
    vulnerable: false,
    initialClassification: 'FOS Eligible'
  })

  // Update account number when extracted data changes
  useEffect(() => {
    if (extractedData.patientAccountNumber) {
      setCaseFormData(prev => ({
        ...prev,
        accountNo: extractedData.patientAccountNumber
      }))
    }
  }, [extractedData.patientAccountNumber])
  const backgroundTextareaRef = useRef(null)
  const complaintTextareaRef = useRef(null)

  // Auto-resize textareas based on content
  const autoResizeTextarea = (textarea) => {
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  useEffect(() => {
    if (step === 'extracted') {
      // Auto-resize textareas when step changes to extracted
      setTimeout(() => {
        autoResizeTextarea(backgroundTextareaRef.current)
        autoResizeTextarea(complaintTextareaRef.current)
      }, 100)
    }
  }, [step, extractedData.background, extractedData.complaintDescription])

  const handleExtractInfo = () => {
    setIsExtracting(true)
    setTimeout(() => {
      setIsExtracting(false)
      setStep('extracted')
    }, 1500)
  }

  // Parse address from givenAddress string
  const parseAddressFromDocument = (addressString) => {
    // Format: "PO BOX 844658, DALLAS, TX 752844658"
    const parts = addressString.split(',').map(p => p.trim())
    let street = parts[0] || ''
    let city = parts[1] || ''
    let state = ''
    let zip = ''
    
    if (parts[2]) {
      const stateZip = parts[2].split(' ')
      state = stateZip[0] || ''
      zip = stateZip.slice(1).join(' ') || ''
    }
    
    return {
      addressLine1: street,
      addressLine2: '', // Not in the format provided
      city: city,
      state: state,
      zip: zip
    }
  }

  // Compare addresses
  const compareAddresses = () => {
    const docAddress = parseAddressFromDocument(extractedData.givenAddress)
    const ariesAddress = customerData.address
    
    const normalize = (str) => str ? str.toUpperCase().trim().replace(/\s+/g, ' ') : ''
    
    return {
      addressLine1: {
        fromDocument: docAddress.addressLine1,
        fromAries: ariesAddress.street,
        match: normalize(docAddress.addressLine1) === normalize(ariesAddress.street)
      },
      addressLine2: {
        fromDocument: docAddress.addressLine2,
        fromAries: ariesAddress.addressLine2 || '',
        match: normalize(docAddress.addressLine2) === normalize(ariesAddress.addressLine2 || '')
      },
      city: {
        fromDocument: docAddress.city,
        fromAries: ariesAddress.city,
        match: normalize(docAddress.city) === normalize(ariesAddress.city)
      },
      state: {
        fromDocument: docAddress.state,
        fromAries: ariesAddress.state,
        match: normalize(docAddress.state) === normalize(ariesAddress.state)
      },
      zip: {
        fromDocument: docAddress.zip,
        fromAries: ariesAddress.zip,
        match: normalize(docAddress.zip) === normalize(ariesAddress.zip)
      }
    }
  }

  const addressComparison = compareAddresses()
  const allAddressesMatch = Object.values(addressComparison).every(field => field.match)

  const handleVerifyAries = () => {
    if (!returnCheckType) {
      alert('Please select a Return Check Type before verifying')
      return
    }
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      setStep('addressComparison') // New step for address comparison
    }, 2000) // Show loading indicator for 2 seconds
  }

  const handleAddressMatchAction = () => {
    // If addresses match, proceed to case creation
    setStep('verified')
  }

  const handleReissueCheck = () => {
    // Handle reissue check and resend email
    alert('Reissue check and resend email functionality will be implemented')
  }

  const handleCaseFormChange = (field, value) => {
    setCaseFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCreateCase = () => {
    setIsCreatingCase(true)
    setTimeout(() => {
      setIsCreatingCase(false)
      // Case is already created, directly navigate to Check Analysis page
      navigate('/analysis')
    }, 1500)
  }


  const handleFieldChange = (field, value) => {
    setExtractedData(prev => ({
      ...prev,
      [field]: value
    }))
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
            <iframe
              src={pdfUrl}
              title="Document Preview"
              className="pdf-iframe"
              type="application/pdf"
            />
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
                <div className="form-field-row">
                  <div className="form-field">
                    <label>Claim Number</label>
                    <input
                      type="text"
                      value={extractedData.claimNumber || ''}
                      onChange={(e) => handleFieldChange('claimNumber', e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label>Check Number</label>
                    <input
                      type="text"
                      value={extractedData.checkNumber || ''}
                      onChange={(e) => handleFieldChange('checkNumber', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Name as per the Letter</label>
                  <input
                    type="text"
                    value={extractedData.nameAsPerLetter || ''}
                    onChange={(e) => handleFieldChange('nameAsPerLetter', e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Given Address</label>
                  <input
                    type="text"
                    value={extractedData.givenAddress || ''}
                    onChange={(e) => handleFieldChange('givenAddress', e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Date of Service</label>
                  <input
                    type="text"
                    value={extractedData.dateOfService || ''}
                    onChange={(e) => handleFieldChange('dateOfService', e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Type of Service</label>
                  <input
                    type="text"
                    value={extractedData.typeOfService || ''}
                    onChange={(e) => handleFieldChange('typeOfService', e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Provider Name</label>
                  <input
                    type="text"
                    value={extractedData.providerName || ''}
                    onChange={(e) => handleFieldChange('providerName', e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Patient Account Number</label>
                  <input
                    type="text"
                    value={extractedData.patientAccountNumber || ''}
                    onChange={(e) => handleFieldChange('patientAccountNumber', e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Background</label>
                  <textarea
                    ref={backgroundTextareaRef}
                    value={extractedData.background || ''}
                    onChange={(e) => {
                      handleFieldChange('background', e.target.value)
                      autoResizeTextarea(e.target)
                    }}
                    onInput={(e) => autoResizeTextarea(e.target)}
                  />
                </div>

                <div className="form-field">
                  <label>Complaint Description</label>
                  <textarea
                    ref={complaintTextareaRef}
                    value={extractedData.complaintDescription || ''}
                    onChange={(e) => {
                      handleFieldChange('complaintDescription', e.target.value)
                      autoResizeTextarea(e.target)
                    }}
                    onInput={(e) => autoResizeTextarea(e.target)}
                  />
                </div>

                <div className="form-field">
                  <label>Financial Impact on the Buyer</label>
                  <input
                    type="text"
                    value={extractedData.financialImpactOnBuyer || ''}
                    onChange={(e) => handleFieldChange('financialImpactOnBuyer', e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Return Check Type</label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="returnCheckType"
                        value="Postal"
                        checked={returnCheckType === 'Postal'}
                        onChange={(e) => setReturnCheckType(e.target.value)}
                      />
                      <span className="radio-label">Postal</span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="returnCheckType"
                        value="Non-Postal"
                        checked={returnCheckType === 'Non-Postal'}
                        onChange={(e) => setReturnCheckType(e.target.value)}
                      />
                      <span className="radio-label">Non-Postal</span>
                    </label>
                  </div>
                </div>
              </div>

              <button
                className="verify-btn"
                onClick={handleVerifyAries}
                disabled={isVerifying || !returnCheckType}
              >
                {isVerifying ? (
                  <span className="verify-btn-content">
                    <span className="loading-spinner"></span>
                    <span>Processing...</span>
                  </span>
                ) : (
                  'CONFIRM AND VERIFY AGAINST CAS'
                )}
              </button>
            </div>
          )}

          {step === 'addressComparison' && (
            <div className="address-comparison-section">
              <div className="section-header">
                <span className="section-icon">📍</span>
                <h4>Address Verification</h4>
              </div>
              
              <div className="address-comparison-container">
                <div className="address-panel">
                  <div className="address-panel-header">
                    <h5>Address from CAS/Aries</h5>
                  </div>
                  <div className="address-fields">
                    <div className="address-field-row">
                      <span className="address-label">Address Line 1:</span>
                      <span className={`address-value ${addressComparison.addressLine1.match ? 'match' : 'mismatch'}`}>
                        {addressComparison.addressLine1.fromAries}
                      </span>
                    </div>
                    <div className="address-field-row">
                      <span className="address-label">Address Line 2:</span>
                      <span className={`address-value ${addressComparison.addressLine2.match ? 'match' : 'mismatch'}`}>
                        {addressComparison.addressLine2.fromAries || 'N/A'}
                      </span>
                    </div>
                    <div className="address-field-row">
                      <span className="address-label">City:</span>
                      <span className={`address-value ${addressComparison.city.match ? 'match' : 'mismatch'}`}>
                        {addressComparison.city.fromAries}
                      </span>
                    </div>
                    <div className="address-field-row">
                      <span className="address-label">State:</span>
                      <span className={`address-value ${addressComparison.state.match ? 'match' : 'mismatch'}`}>
                        {addressComparison.state.fromAries}
                      </span>
                    </div>
                    <div className="address-field-row">
                      <span className="address-label">ZIP:</span>
                      <span className={`address-value ${addressComparison.zip.match ? 'match' : 'mismatch'}`}>
                        {addressComparison.zip.fromAries}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="address-panel">
                  <div className="address-panel-header">
                    <h5>Address from Document</h5>
                  </div>
                  <div className="address-fields">
                    <div className="address-field-row">
                      <span className="address-label">Address Line 1:</span>
                      <span className={`address-value ${addressComparison.addressLine1.match ? 'match' : 'mismatch'}`}>
                        {addressComparison.addressLine1.fromDocument}
                      </span>
                    </div>
                    <div className="address-field-row">
                      <span className="address-label">Address Line 2:</span>
                      <span className={`address-value ${addressComparison.addressLine2.match ? 'match' : 'mismatch'}`}>
                        {addressComparison.addressLine2.fromDocument || 'N/A'}
                      </span>
                    </div>
                    <div className="address-field-row">
                      <span className="address-label">City:</span>
                      <span className={`address-value ${addressComparison.city.match ? 'match' : 'mismatch'}`}>
                        {addressComparison.city.fromDocument}
                      </span>
                    </div>
                    <div className="address-field-row">
                      <span className="address-label">State:</span>
                      <span className={`address-value ${addressComparison.state.match ? 'match' : 'mismatch'}`}>
                        {addressComparison.state.fromDocument}
                      </span>
                    </div>
                    <div className="address-field-row">
                      <span className="address-label">ZIP:</span>
                      <span className={`address-value ${addressComparison.zip.match ? 'match' : 'mismatch'}`}>
                        {addressComparison.zip.fromDocument}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="address-actions">
                {allAddressesMatch ? (
                  <button
                    className="action-btn match-action"
                    onClick={handleAddressMatchAction}
                  >
                    Can Do
                  </button>
                ) : (
                  <button
                    className="action-btn mismatch-action"
                    onClick={handleReissueCheck}
                  >
                    Reissue Check and Resend Email
                  </button>
                )}
              </div>
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
                    {isCreatingCase ? (
                      <span className="verify-btn-content">
                        <span className="loading-spinner"></span>
                        <span>Creating Case...</span>
                      </span>
                    ) : (
                      'Create Case in iCaseWork'
                    )}
                  </button>
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
