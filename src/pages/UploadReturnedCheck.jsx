import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './UploadReturnedCheck.css'
import { mockExtractedData, mockExtractedDataCHK002, mockCustomerData, mockReturnedChecks } from '../data/mockData'

const UploadReturnedCheck = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const checkId = searchParams.get('checkId')
  const mode = searchParams.get('mode')
  
  // Find the check from mock data to get the correct PDF URL
  const selectedCheck = mockReturnedChecks.find(check => check.id === checkId) || mockReturnedChecks[0]
  const basePdfUrl = selectedCheck.pdfUrl || '/returned-check.pdf'
  // Set default zoom to 100% using PDF viewer parameter
  const pdfUrl = `${basePdfUrl}#zoom=100`
  const [step, setStep] = useState(mode === 'compare' ? 'addressComparison' : 'initial') // initial, extracted, addressComparison, verified
  // Use different extracted data based on which check is selected
  const initialExtractedData = selectedCheck.id === 'CHK002' ? mockExtractedDataCHK002 : mockExtractedData
  const [extractedData, setExtractedData] = useState(initialExtractedData)
  const [customerData] = useState(mockCustomerData)
  const [isExtracting, setIsExtracting] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isCreatingCase, setIsCreatingCase] = useState(false)
  const [showReissueModal, setShowReissueModal] = useState(false)
  const [cantDoReason, setCantDoReason] = useState('') // Reason for CANT DO
  const [addressSource, setAddressSource] = useState('CAS') // CAS or EHub
  const [addressNotes, setAddressNotes] = useState('')
  const [returnCheckType, setReturnCheckType] = useState('postal') // POSTAL or NON-POSTAL
  const [caseFormData, setCaseFormData] = useState({
    source: 'Customer',
    dateOfReceipt: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }),
    method: 'eMail',
    accountNo: initialExtractedData.patientAccountNumber || '',
    vulnerable: false,
    initialClassification: 'FOS Eligible'
  })

  // Update extracted data when checkId changes
  useEffect(() => {
    const currentCheck = mockReturnedChecks.find(check => check.id === checkId) || mockReturnedChecks[0]
    const newExtractedData = currentCheck.id === 'CHK002' ? mockExtractedDataCHK002 : mockExtractedData
    setExtractedData(newExtractedData)
  }, [checkId])

  // If user lands directly on compare mode, ensure we show comparison step
  useEffect(() => {
    if (mode === 'compare') {
      setStep('addressComparison')
    }
  }, [mode])

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
    // Format: "2401 N Stemmons Fwy, Suite 200, DALLAS, TX 75207"
    const parts = addressString.split(',').map(p => p.trim())
    let street = parts[0] || ''
    let addressLine2 = parts[1] || ''
    let city = parts[2] || ''
    let state = ''
    let zip = ''
    
    if (parts[3]) {
      const stateZip = parts[3].split(' ')
      state = stateZip[0] || ''
      zip = stateZip.slice(1).join(' ') || ''
    }
    
    return {
      addressLine1: street,
      addressLine2: addressLine2,
      city: city,
      state: state,
      zip: zip
    }
  }

  // Compare all fields for Customer Details and Check Details
  const compareAllFields = () => {
    const normalize = (str) => str ? str.toUpperCase().trim().replace(/\s+/g, ' ') : ''
    
    // Parse address from document for both CHK001 and CHK002
    const parsedAddress = parseAddressFromDocument(extractedData.givenAddress || '')
    
    // Customer Details comparison
    const customerDetails = {
      customerName: {
        // For CHK002, make them the same; for CHK001, compare normally
        fromDocument: extractedData.nameAsPerLetter,
        fromAries: selectedCheck.id === 'CHK002' ? extractedData.nameAsPerLetter : customerData.customerName,
        match: selectedCheck.id === 'CHK002' ? true : normalize(extractedData.nameAsPerLetter) === normalize(customerData.customerName)
      },
      emailAddress: {
        // For CHK002, make them the same; for CHK001, compare normally
        fromDocument: selectedCheck.emailFrom,
        fromAries: selectedCheck.id === 'CHK002' ? selectedCheck.emailFrom : customerData.emailAddress,
        match: selectedCheck.id === 'CHK002' ? true : normalize(selectedCheck.emailFrom) === normalize(customerData.emailAddress)
      },
      dateOfBirth: {
        fromDocument: customerData.dateOfBirth || 'N/A',
        fromAries: customerData.dateOfBirth || 'N/A',
        match: true // Both showing same value
      },
      telephoneNumber: {
        fromDocument: customerData.telephoneNumber || 'N/A',
        fromAries: customerData.telephoneNumber || 'N/A',
        match: true // Both showing same value
      },
      // For CHK001, use separate address fields with all matching; for CHK002, use separate address fields with mismatch
      address: selectedCheck.id === 'CHK002' ? {
        fromDocument: parsedAddress?.addressLine1 || '2401 N Stemmons Fwy',
        fromAries: '1500 Commerce Street', // Different address for CHK002
        match: false // Intentionally mismatch for CHK002
      } : {
        fromDocument: parsedAddress?.addressLine1 || customerData.address.street,
        fromAries: customerData.address.street || '',
        match: normalize(parsedAddress?.addressLine1 || customerData.address.street) === normalize(customerData.address.street || '')
      },
      addressLine2: selectedCheck.id === 'CHK002' ? {
        fromDocument: parsedAddress?.addressLine2 || 'Suite 200',
        fromAries: 'Floor 5', // Different address line 2 for CHK002
        match: false // Intentionally mismatch for CHK002
      } : {
        fromDocument: parsedAddress?.addressLine2 || customerData.address.addressLine2,
        fromAries: customerData.address.addressLine2 || '',
        match: normalize(parsedAddress?.addressLine2 || customerData.address.addressLine2 || '') === normalize(customerData.address.addressLine2 || '')
      },
      city: selectedCheck.id === 'CHK002' ? {
        fromDocument: parsedAddress?.city || 'DALLAS',
        fromAries: 'FORT WORTH', // Different city for CHK002
        match: false // Intentionally mismatch for CHK002
      } : {
        fromDocument: parsedAddress?.city || customerData.address.city,
        fromAries: customerData.address.city || '',
        match: normalize(parsedAddress?.city || customerData.address.city) === normalize(customerData.address.city || '')
      },
      state: selectedCheck.id === 'CHK002' ? {
        fromDocument: parsedAddress?.state || 'TX',
        fromAries: 'TX', // Same state
        match: true
      } : {
        fromDocument: parsedAddress?.state || customerData.address.state,
        fromAries: customerData.address.state || '',
        match: normalize(parsedAddress?.state || customerData.address.state) === normalize(customerData.address.state || '')
      },
      zipCode: selectedCheck.id === 'CHK002' ? {
        fromDocument: parsedAddress?.zip || '75207',
        fromAries: '76102', // Different zip for CHK002
        match: false // Intentionally mismatch for CHK002
      } : {
        fromDocument: parsedAddress?.zip || customerData.address.zip,
        fromAries: customerData.address.zip || '',
        match: normalize(parsedAddress?.zip || customerData.address.zip) === normalize(customerData.address.zip || '')
      }
    }

    // Build EHub address – for CHK001 it matches, for CHK002 it is different
    const eHubAddress = selectedCheck.id === 'CHK002'
      ? {
          name: extractedData.nameAsPerLetter,
          addressLine1: '1500 Commerce Street',
          addressLine2: 'Floor 5',
          city: 'FORT WORTH',
          state: 'TX',
          zip: '76102'
        }
      : {
          name: extractedData.nameAsPerLetter,
          addressLine1: parsedAddress.addressLine1,
          addressLine2: parsedAddress.addressLine2,
          city: parsedAddress.city,
          state: parsedAddress.state,
          zip: parsedAddress.zip
        }

    // Check Details comparison
    const checkDetails = {
      claimNumber: {
        fromDocument: extractedData.claimNumber,
        fromAries: extractedData.claimNumber, // Assuming same for now
        match: true
      },
      checkNumber: {
        fromDocument: extractedData.checkNumber,
        fromAries: selectedCheck.checkNumber,
        match: normalize(extractedData.checkNumber) === normalize(selectedCheck.checkNumber)
      },
      dateOfService: {
        fromDocument: extractedData.dateOfService,
        fromAries: extractedData.dateOfService, // Assuming same
        match: true
      },
      typeOfService: {
        fromDocument: extractedData.typeOfService,
        fromAries: extractedData.typeOfService, // Assuming same
        match: true
      },
      providerName: {
        fromDocument: extractedData.providerName,
        fromAries: extractedData.providerName, // Assuming same
        match: true
      },
      patientAccountNumber: {
        fromDocument: extractedData.patientAccountNumber,
        fromAries: customerData.accountNumber,
        match: normalize(extractedData.patientAccountNumber) === normalize(customerData.accountNumber)
      },
      // Additional fields for healthcare (mapped from vehicle example)
      medicalRecordNumber: {
        fromDocument: extractedData.patientAccountNumber, // Using Patient Account Number as Medical Record Number
        fromAries: selectedCheck.id === 'CHK002' ? extractedData.patientAccountNumber : customerData.accountNumber, // For CHK002, make it match (green)
        match: selectedCheck.id === 'CHK002' ? true : normalize(extractedData.patientAccountNumber) === normalize(customerData.accountNumber)
      },
      providerId: {
        fromDocument: 'PRV-' + extractedData.claimNumber, // Derived from claim number
        fromAries: 'PRV-' + extractedData.claimNumber,
        match: true
      },
      policyNumber: {
        fromDocument: 'POL-' + extractedData.claimNumber, // Derived from claim number
        fromAries: 'POL-' + extractedData.claimNumber,
        match: true
      },
      serviceCode: {
        fromDocument: extractedData.typeOfService, // Using Type of Service as Service Code
        fromAries: extractedData.typeOfService,
        match: true
      }
    }

    return { customerDetails, checkDetails, eHubAddress }
  }

  const comparison = compareAllFields()
  // For CHK001, check all fields match; for CHK002, only check customer name and email (addresses should mismatch)
  const allCustomerFieldsMatch = selectedCheck.id === 'CHK002' 
    ? comparison.customerDetails.customerName.match && comparison.customerDetails.emailAddress.match
    : Object.values(comparison.customerDetails).every(field => field.match)
  const allCheckFieldsMatch = Object.values(comparison.checkDetails).every(field => field.match)
  const allFieldsMatch = allCustomerFieldsMatch && allCheckFieldsMatch

  const handleVerifyAries = () => {
    // Return Check flow: go directly to comparison (no Provider Details page)
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      setStep('addressComparison')
    }, 2000)
  }

  const handleCantDo = () => {
    if (!cantDoReason) {
      alert('Please select a reason for CANT DO')
      return
    }
    // Show bot modal for CHK001
    setShowReissueModal(true)
  }

  const handleCanDo = () => {
    // Show bot modal for CHK002
    setShowReissueModal(true)
  }

  const handleReissueCheck = () => {
    // Show popup modal for bot trigger
    setShowReissueModal(true)
  }

  const closeReissueModal = () => {
    setShowReissueModal(false)
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

      <div className={step === 'addressComparison' ? 'full-width-comparison' : 'split-container'}>
        {/* Left Side - PDF Viewer - Hidden for comparison page */}
        {step !== 'addressComparison' && (
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
        )}

        {/* Right Side - Extraction Area / Comparison Area */}
        <div className={step === 'addressComparison' ? 'full-width-extraction-section' : 'extraction-section'}>
          {step === 'initial' && (
            <div className="extraction-initial">
              <button
                className="extract-btn"
                onClick={handleExtractInfo}
                disabled={isExtracting}
              >
                {isExtracting ? 'Extracting Information...' : 'Extract Info from Returned Package'}
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
                  <label>Check Date</label>
                  <input
                    type="text"
                    value={extractedData.checkDate || ''}
                    onChange={(e) => handleFieldChange('checkDate', e.target.value)}
                  />
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
                  <label>{selectedCheck.id === 'CHK002' ? 'Vehicle Identification Number' : 'Patient Account Number'}</label>
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
                  <label>Check Value</label>
                  <input
                    type="text"
                      value={extractedData.financialImpactOnBuyer || ''}
                      onChange={(e) => handleFieldChange('financialImpactOnBuyer', e.target.value)}
                  />
                </div>

                {/* Return Check Type - only for Return Check flow */}
                <div className="form-field">
                  <label>Return Check Type</label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="returnCheckType"
                        value="postal"
                        checked={returnCheckType === 'postal'}
                        onChange={(e) => setReturnCheckType(e.target.value)}
                      />
                      <span className="radio-label">POSTAL</span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="returnCheckType"
                        value="non-postal"
                        checked={returnCheckType === 'non-postal'}
                        onChange={(e) => setReturnCheckType(e.target.value)}
                      />
                      <span className="radio-label">NON-POSTAL</span>
                    </label>
                  </div>
                </div>

              </div>

              <button
                className="verify-btn"
                onClick={handleVerifyAries}
                disabled={isVerifying}
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
            <div className="comparison-section">
              {/* Customer Details panels */}
              <div className="comparison-grid">
                <div className="comparison-panel">
                  <div className="comparison-panel-header complaint-header">
                    <span className="panel-icon">📄</span>
                    <h5>Customer Details from Complaint Letter</h5>
                  </div>
                  <div className="comparison-fields">
                    <div
                      className={`comparison-field ${
                        comparison.customerDetails.customerName.match ? 'field-match' : 'field-mismatch'
                      }`}
                    >
                      <span className="field-label">Customer Name</span>
                      <span className="field-value">
                        {comparison.customerDetails.customerName.fromDocument}
                      </span>
                    </div>
                    <div
                      className={`comparison-field ${
                        comparison.customerDetails.emailAddress.match ? 'field-match' : 'field-mismatch'
                      }`}
                    >
                      <span className="field-label">Email Address</span>
                      <span className="field-value">
                        {comparison.customerDetails.emailAddress.fromDocument}
                      </span>
                    </div>
                    <div className="comparison-field field-match">
                      <span className="field-label">Date of Birth</span>
                      <span className="field-value">
                        {comparison.customerDetails.dateOfBirth.fromDocument}
                      </span>
                    </div>
                    <div className="comparison-field field-match">
                      <span className="field-label">Telephone Number</span>
                      <span className="field-value">
                        {comparison.customerDetails.telephoneNumber.fromDocument}
                      </span>
                    </div>
                    <div
                      className={`comparison-field ${
                        comparison.customerDetails.address.match ? 'field-match' : 'field-mismatch'
                      }`}
                    >
                      <span className="field-label">Address</span>
                      <span className="field-value">
                        {comparison.customerDetails.address.fromDocument}
                      </span>
                    </div>
                    <div
                      className={`comparison-field ${
                        comparison.customerDetails.addressLine2.match ? 'field-match' : 'field-mismatch'
                      }`}
                    >
                      <span className="field-label">Address 2</span>
                      <span className="field-value">
                        {comparison.customerDetails.addressLine2.fromDocument}
                      </span>
                    </div>
                    <div
                      className={`comparison-field ${
                        comparison.customerDetails.city.match ? 'field-match' : 'field-mismatch'
                      }`}
                    >
                      <span className="field-label">City</span>
                      <span className="field-value">
                        {comparison.customerDetails.city.fromDocument}
                      </span>
                    </div>
                    <div
                      className={`comparison-field ${
                        comparison.customerDetails.state.match ? 'field-match' : 'field-mismatch'
                      }`}
                    >
                      <span className="field-label">State</span>
                      <span className="field-value">
                        {comparison.customerDetails.state.fromDocument}
                      </span>
                    </div>
                    <div
                      className={`comparison-field ${
                        comparison.customerDetails.zipCode.match ? 'field-match' : 'field-mismatch'
                      }`}
                    >
                      <span className="field-label">Zip Code</span>
                      <span className="field-value">
                        {comparison.customerDetails.zipCode.fromDocument}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="comparison-panel">
                  <div className="comparison-panel-header aries-header">
                    <span className="panel-icon">🖥️</span>
                    <h5>Customer Details from CAS</h5>
                  </div>
                  <div className="comparison-fields">
                    <div
                      className={`comparison-field ${
                        comparison.customerDetails.customerName.match ? 'field-match' : 'field-mismatch'
                      }`}
                    >
                      <span className="field-label">Customer Name</span>
                      <span className="field-value">
                        {comparison.customerDetails.customerName.fromAries}
                      </span>
                    </div>
                    <div
                      className={`comparison-field ${
                        comparison.customerDetails.emailAddress.match ? 'field-match' : 'field-mismatch'
                      }`}
                    >
                      <span className="field-label">Email Address</span>
                      <span className="field-value">
                        {comparison.customerDetails.emailAddress.fromAries}
                      </span>
                    </div>
                    <div className="comparison-field field-match">
                      <span className="field-label">Date of Birth</span>
                      <span className="field-value">
                        {comparison.customerDetails.dateOfBirth.fromAries}
                      </span>
                    </div>
                    <div className="comparison-field field-match">
                      <span className="field-label">Telephone Number</span>
                      <span className="field-value">
                        {comparison.customerDetails.telephoneNumber.fromAries}
                      </span>
                    </div>
                    <div
                      className={`comparison-field ${
                        comparison.customerDetails.address.match ? 'field-match' : 'field-mismatch'
                      }`}
                    >
                      <span className="field-label">Address</span>
                      <span className="field-value">
                        {comparison.customerDetails.address.fromAries}
                      </span>
                    </div>
                    <div
                      className={`comparison-field ${
                        comparison.customerDetails.addressLine2.match ? 'field-match' : 'field-mismatch'
                      }`}
                    >
                      <span className="field-label">Address 2</span>
                      <span className="field-value">
                        {comparison.customerDetails.addressLine2.fromAries}
                      </span>
                    </div>
                    <div
                      className={`comparison-field ${
                        comparison.customerDetails.city.match ? 'field-match' : 'field-mismatch'
                      }`}
                    >
                      <span className="field-label">City</span>
                      <span className="field-value">
                        {comparison.customerDetails.city.fromAries}
                      </span>
                    </div>
                    <div
                      className={`comparison-field ${
                        comparison.customerDetails.state.match ? 'field-match' : 'field-mismatch'
                      }`}
                    >
                      <span className="field-label">State</span>
                      <span className="field-value">
                        {comparison.customerDetails.state.fromAries}
                      </span>
                    </div>
                    <div
                      className={`comparison-field ${
                        comparison.customerDetails.zipCode.match ? 'field-match' : 'field-mismatch'
                      }`}
                    >
                      <span className="field-label">Zip Code</span>
                      <span className="field-value">
                        {comparison.customerDetails.zipCode.fromAries}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Check Details panels */}
              <div className="comparison-grid" style={{ marginTop: '24px' }}>
                <div className="comparison-panel">
                  <div className="comparison-panel-header complaint-header">
                    <span className="panel-icon">📄</span>
                    <h5>Check Details from Complaint Letter</h5>
                  </div>
                  <div className="comparison-fields">
                    <div className="comparison-field field-match">
                      <span className="field-label">Claim Number</span>
                      <span className="field-value">
                        {comparison.checkDetails.claimNumber.fromDocument}
                      </span>
                    </div>
                    <div
                      className={`comparison-field ${
                        comparison.checkDetails.checkNumber.match ? 'field-match' : 'field-mismatch'
                      }`}
                    >
                      <span className="field-label">Check Number</span>
                      <span className="field-value">
                        {comparison.checkDetails.checkNumber.fromDocument}
                      </span>
                    </div>
                    <div className="comparison-field field-match">
                      <span className="field-label">
                        {selectedCheck.id === 'CHK002'
                          ? 'Vehicle Identification Number'
                          : 'Medical Record Number'}
                      </span>
                      <span className="field-value">
                        {comparison.checkDetails.medicalRecordNumber.fromDocument}
                      </span>
                    </div>
                    <div className="comparison-field field-match">
                      <span className="field-label">Provider ID</span>
                      <span className="field-value">
                        {comparison.checkDetails.providerId.fromDocument}
                      </span>
                    </div>
                    <div className="comparison-field field-match">
                      <span className="field-label">Agreement Policy Number</span>
                      <span className="field-value">
                        {comparison.checkDetails.policyNumber.fromDocument}
                      </span>
                    </div>
                    <div className="comparison-field field-match">
                      <span className="field-label">Name of Provider</span>
                      <span className="field-value">
                        {comparison.checkDetails.providerName.fromDocument}
                      </span>
                    </div>
                    <div className="comparison-field field-match">
                      <span className="field-label">Service Type</span>
                      <span className="field-value">
                        {comparison.checkDetails.typeOfService.fromDocument}
                      </span>
                    </div>
                    <div className="comparison-field field-match">
                      <span className="field-label">Date of Service</span>
                      <span className="field-value">
                        {comparison.checkDetails.dateOfService.fromDocument}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="comparison-panel">
                  <div className="comparison-panel-header aries-header">
                    <span className="panel-icon">🖥️</span>
                    <h5>Check Details from Aries</h5>
                  </div>
                  <div className="comparison-fields">
                    <div className="comparison-field field-match">
                      <span className="field-label">Claim Number</span>
                      <span className="field-value">
                        {comparison.checkDetails.claimNumber.fromAries}
                      </span>
                    </div>
                    <div
                      className={`comparison-field ${
                        comparison.checkDetails.checkNumber.match ? 'field-match' : 'field-mismatch'
                      }`}
                    >
                      <span className="field-label">Check Number</span>
                      <span className="field-value">
                        {comparison.checkDetails.checkNumber.fromAries}
                      </span>
                    </div>
                    <div className="comparison-field field-match">
                      <span className="field-label">
                        {selectedCheck.id === 'CHK002'
                          ? 'Vehicle Identification Number'
                          : 'Medical Record Number'}
                      </span>
                      <span className="field-value">
                        {comparison.checkDetails.medicalRecordNumber.fromAries}
                      </span>
                    </div>
                    <div className="comparison-field field-match">
                      <span className="field-label">Provider ID</span>
                      <span className="field-value">
                        {comparison.checkDetails.providerId.fromAries}
                      </span>
                    </div>
                    <div className="comparison-field field-match">
                      <span className="field-label">Agreement Policy Number</span>
                      <span className="field-value">
                        {comparison.checkDetails.policyNumber.fromAries}
                      </span>
                    </div>
                    <div className="comparison-field field-match">
                      <span className="field-label">Provider Name</span>
                      <span className="field-value">
                        {comparison.checkDetails.providerName.fromAries}
                      </span>
                    </div>
                    <div className="comparison-field field-match">
                      <span className="field-label">Service Type</span>
                      <span className="field-value">
                        {comparison.checkDetails.typeOfService.fromAries}
                      </span>
                    </div>
                    <div className="comparison-field field-match">
                      <span className="field-label">Date of Service</span>
                      <span className="field-value">
                        {comparison.checkDetails.dateOfService.fromAries}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom actions */}
              {allFieldsMatch && selectedCheck.id === 'CHK001' && (
                <div className="cant-do-section">
                  <div className="cant-do-dropdown-container">
                    <label className="cant-do-label">Reason for CANT DO:</label>
                    <select
                      className="cant-do-dropdown"
                      value={cantDoReason}
                      onChange={(e) => setCantDoReason(e.target.value)}
                    >
                      <option value="">Select a reason...</option>
                      <option value="No new address found on CAS">
                        No new address found on CAS
                      </option>
                      <option value="FRAUD">FRAUD</option>
                      <option value="Wrong provider selection">
                        Wrong provider selection
                      </option>
                      <option value="Work related injury">Work related injury</option>
                      <option value="Duplicate payment">Duplicate payment</option>
                    </select>
                  </div>
                  <button
                    className="action-btn cant-do-btn"
                    onClick={handleCantDo}
                    disabled={!cantDoReason}
                  >
                    CANT DO
                  </button>
                </div>
              )}

              {selectedCheck.id === 'CHK002' && (
                <div
                  className="cant-do-section"
                  style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                  <button
                    className="action-btn can-do-btn"
                    onClick={handleCanDo}
                    style={{ maxWidth: '220px' }}
                  >
                    CAN DO
                  </button>
                  <button
                    className="action-btn reissue-btn"
                    onClick={handleReissueCheck}
                    style={{ maxWidth: '320px' }}
                  >
                    Reissue Check and Resend Letter
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 'verified' && (
            <div className="verified-info">
              <div className="customer-details-section">
                <div className="section-header">
                  <span className="section-icon">🖥️</span>
                  <h4>Customer Details from CAS</h4>
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

      {/* Reissue Check Modal */}
      {showReissueModal && (
        <div className="reissue-modal-overlay" onClick={closeReissueModal}>
          <div className="reissue-modal" onClick={(e) => e.stopPropagation()}>
            <div className="reissue-modal-header">
              <h3>Bot Triggered</h3>
              <button className="close-btn" onClick={closeReissueModal}>×</button>
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

export default UploadReturnedCheck
