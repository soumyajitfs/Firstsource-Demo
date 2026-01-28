import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './UploadReturnedCheck.css'
import { mockExtractedData, mockExtractedDataCHK002, mockCustomerData, mockReturnedChecks } from '../data/mockData'

const StopPaymentUpload = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const checkId = searchParams.get('checkId')
  const mode = searchParams.get('mode')

  const selectedCheck = mockReturnedChecks.find(check => check.id === checkId) || mockReturnedChecks[0]
  const basePdfUrl = selectedCheck.pdfUrl || '/returned-check.pdf'
  const pdfUrl = `${basePdfUrl}#zoom=100`
  const [step, setStep] = useState(mode === 'compare' ? 'addressComparison' : 'initial')
  const initialExtractedData = selectedCheck.id === 'CHK002' ? mockExtractedDataCHK002 : mockExtractedData
  const [extractedData, setExtractedData] = useState(initialExtractedData)
  const [customerData] = useState(mockCustomerData)
  const [isExtracting, setIsExtracting] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isCreatingCase, setIsCreatingCase] = useState(false)
  const [showReissueModal, setShowReissueModal] = useState(false)
  const [cantDoReason, setCantDoReason] = useState('')
  const [addressSource, setAddressSource] = useState('CAS')
  const [addressNotes, setAddressNotes] = useState('')
  const [caseFormData, setCaseFormData] = useState({
    source: 'Customer',
    dateOfReceipt: new Date().toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    }),
    method: 'eMail',
    accountNo: initialExtractedData.patientAccountNumber || '',
    vulnerable: false,
    initialClassification: 'FOS Eligible'
  })

  useEffect(() => {
    const currentCheck = mockReturnedChecks.find(check => check.id === checkId) || mockReturnedChecks[0]
    const newExtractedData =
      currentCheck.id === 'CHK002' ? mockExtractedDataCHK002 : mockExtractedData
    setExtractedData(newExtractedData)
  }, [checkId])

  useEffect(() => {
    if (mode === 'compare') {
      setStep('addressComparison')
    }
  }, [mode])

  useEffect(() => {
    if (extractedData.patientAccountNumber) {
      setCaseFormData((prev) => ({
        ...prev,
        accountNo: extractedData.patientAccountNumber
      }))
    }
  }, [extractedData.patientAccountNumber])

  const backgroundTextareaRef = useRef(null)
  const complaintTextareaRef = useRef(null)

  const autoResizeTextarea = (textarea) => {
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  useEffect(() => {
    if (step === 'extracted') {
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

  const parseAddressFromDocument = (addressString) => {
    const parts = addressString.split(',').map((p) => p.trim())
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
      addressLine2,
      city,
      state,
      zip
    }
  }

  const compareAllFields = () => {
    const normalize = (str) =>
      str ? str.toUpperCase().trim().replace(/\s+/g, ' ') : ''

    const parsedAddress = parseAddressFromDocument(extractedData.givenAddress || '')

    const customerDetails = {
      customerName: {
        fromDocument: extractedData.nameAsPerLetter,
        fromAries:
          selectedCheck.id === 'CHK002'
            ? extractedData.nameAsPerLetter
            : customerData.customerName,
        match:
          selectedCheck.id === 'CHK002'
            ? true
            : normalize(extractedData.nameAsPerLetter) ===
              normalize(customerData.customerName)
      },
      emailAddress: {
        fromDocument: selectedCheck.emailFrom,
        fromAries:
          selectedCheck.id === 'CHK002'
            ? selectedCheck.emailFrom
            : customerData.emailAddress,
        match:
          selectedCheck.id === 'CHK002'
            ? true
            : normalize(selectedCheck.emailFrom) ===
              normalize(customerData.emailAddress)
      },
      dateOfBirth: {
        fromDocument: customerData.dateOfBirth || 'N/A',
        fromAries: customerData.dateOfBirth || 'N/A',
        match: true
      },
      telephoneNumber: {
        fromDocument: customerData.telephoneNumber || 'N/A',
        fromAries: customerData.telephoneNumber || 'N/A',
        match: true
      },
      address:
        selectedCheck.id === 'CHK002'
          ? {
              fromDocument: parsedAddress?.addressLine1 || '2401 N Stemmons Fwy',
              fromAries: '1500 Commerce Street',
              match: false
            }
          : {
              fromDocument: parsedAddress?.addressLine1 || customerData.address.street,
              fromAries: customerData.address.street || '',
              match:
                normalize(parsedAddress?.addressLine1 || customerData.address.street) ===
                normalize(customerData.address.street || '')
            },
      addressLine2:
        selectedCheck.id === 'CHK002'
          ? {
              fromDocument: parsedAddress?.addressLine2 || 'Suite 200',
              fromAries: 'Floor 5',
              match: false
            }
          : {
              fromDocument:
                parsedAddress?.addressLine2 || customerData.address.addressLine2,
              fromAries: customerData.address.addressLine2 || '',
              match:
                normalize(
                  parsedAddress?.addressLine2 || customerData.address.addressLine2 || ''
                ) === normalize(customerData.address.addressLine2 || '')
            },
      city:
        selectedCheck.id === 'CHK002'
          ? {
              fromDocument: parsedAddress?.city || 'DALLAS',
              fromAries: 'FORT WORTH',
              match: false
            }
          : {
              fromDocument: parsedAddress?.city || customerData.address.city,
              fromAries: customerData.address.city || '',
              match:
                normalize(parsedAddress?.city || customerData.address.city) ===
                normalize(customerData.address.city || '')
            },
      state:
        selectedCheck.id === 'CHK002'
          ? {
              fromDocument: parsedAddress?.state || 'TX',
              fromAries: 'TX',
              match: true
            }
          : {
              fromDocument: parsedAddress?.state || customerData.address.state,
              fromAries: customerData.address.state || '',
              match:
                normalize(parsedAddress?.state || customerData.address.state) ===
                normalize(customerData.address.state || '')
            },
      zipCode:
        selectedCheck.id === 'CHK002'
          ? {
              fromDocument: parsedAddress?.zip || '75207',
              fromAries: '76102',
              match: false
            }
          : {
              fromDocument: parsedAddress?.zip || customerData.address.zip,
              fromAries: customerData.address.zip || '',
              match:
                normalize(parsedAddress?.zip || customerData.address.zip) ===
                normalize(customerData.address.zip || '')
            }
    }

    const eHubAddress =
      selectedCheck.id === 'CHK002'
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

    const checkDetails = {
      claimNumber: {
        fromDocument: extractedData.claimNumber,
        fromAries: extractedData.claimNumber,
        match: true
      },
      checkNumber: {
        fromDocument: extractedData.checkNumber,
        fromAries: selectedCheck.checkNumber,
        match:
          normalize(extractedData.checkNumber) === normalize(selectedCheck.checkNumber)
      },
      dateOfService: {
        fromDocument: extractedData.dateOfService,
        fromAries: extractedData.dateOfService,
        match: true
      },
      typeOfService: {
        fromDocument: extractedData.typeOfService,
        fromAries: extractedData.typeOfService,
        match: true
      },
      providerName: {
        fromDocument: extractedData.providerName,
        fromAries: extractedData.providerName,
        match: true
      },
      patientAccountNumber: {
        fromDocument: extractedData.patientAccountNumber,
        fromAries: customerData.accountNumber,
        match:
          normalize(extractedData.patientAccountNumber) ===
          normalize(customerData.accountNumber)
      },
      medicalRecordNumber: {
        fromDocument: extractedData.patientAccountNumber,
        fromAries:
          selectedCheck.id === 'CHK002'
            ? extractedData.patientAccountNumber
            : customerData.accountNumber,
        match:
          selectedCheck.id === 'CHK002'
            ? true
            : normalize(extractedData.patientAccountNumber) ===
              normalize(customerData.accountNumber)
      },
      providerId: {
        fromDocument: 'PRV-' + extractedData.claimNumber,
        fromAries: 'PRV-' + extractedData.claimNumber,
        match: true
      },
      policyNumber: {
        fromDocument: 'POL-' + extractedData.claimNumber,
        fromAries: 'POL-' + extractedData.claimNumber,
        match: true
      },
      serviceCode: {
        fromDocument: extractedData.typeOfService,
        fromAries: extractedData.typeOfService,
        match: true
      }
    }

    return { customerDetails, checkDetails, eHubAddress }
  }

  const comparison = compareAllFields()

  // For Stop Payment flow: determine if all customer address fields match
  const allAddressFieldsMatch = [
    comparison.customerDetails.address,
    comparison.customerDetails.addressLine2,
    comparison.customerDetails.city,
    comparison.customerDetails.state,
    comparison.customerDetails.zipCode
  ].every((field) => field.match)

  // Normalize helper for row-level comparison across Letter, CAS, and EHub
  const normalizeValue = (str) =>
    str ? str.toString().toUpperCase().trim().replace(/\s+/g, ' ') : ''

  // Name row: Letter vs CAS vs EHub
  const nameRowMatch =
    normalizeValue(comparison.customerDetails.customerName.fromDocument) ===
      normalizeValue(comparison.customerDetails.customerName.fromAries) &&
    normalizeValue(comparison.customerDetails.customerName.fromDocument) ===
      normalizeValue(comparison.eHubAddress.name)

  // Row-level match flags: Letter vs CAS vs EHub must all match to be green
  const addressLine1RowMatch =
    normalizeValue(comparison.customerDetails.address.fromDocument) ===
      normalizeValue(comparison.customerDetails.address.fromAries) &&
    normalizeValue(comparison.customerDetails.address.fromDocument) ===
      normalizeValue(comparison.eHubAddress.addressLine1)

  const addressLine2RowMatch =
    normalizeValue(comparison.customerDetails.addressLine2.fromDocument) ===
      normalizeValue(comparison.customerDetails.addressLine2.fromAries) &&
    normalizeValue(comparison.customerDetails.addressLine2.fromDocument) ===
      normalizeValue(comparison.eHubAddress.addressLine2)

  const cityRowMatch =
    normalizeValue(comparison.customerDetails.city.fromDocument) ===
      normalizeValue(comparison.customerDetails.city.fromAries) &&
    normalizeValue(comparison.customerDetails.city.fromDocument) ===
      normalizeValue(comparison.eHubAddress.city)

  const stateRowMatch =
    normalizeValue(comparison.customerDetails.state.fromDocument) ===
      normalizeValue(comparison.customerDetails.state.fromAries) &&
    normalizeValue(comparison.customerDetails.state.fromDocument) ===
      normalizeValue(comparison.eHubAddress.state)

  const zipRowMatch =
    normalizeValue(comparison.customerDetails.zipCode.fromDocument) ===
      normalizeValue(comparison.customerDetails.zipCode.fromAries) &&
    normalizeValue(comparison.customerDetails.zipCode.fromDocument) ===
      normalizeValue(comparison.eHubAddress.zip)

  const allCustomerFieldsMatch =
    selectedCheck.id === 'CHK002'
      ? comparison.customerDetails.customerName.match &&
        comparison.customerDetails.emailAddress.match
      : Object.values(comparison.customerDetails).every((field) => field.match)
  const allCheckFieldsMatch = Object.values(comparison.checkDetails).every(
    (field) => field.match
  )
  const allFieldsMatch = allCustomerFieldsMatch && allCheckFieldsMatch

  const handleVerifyAries = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      navigate(`/stop-payment/provider-details?checkId=${selectedCheck.id}`)
    }, 2000)
  }

  const handleCantDo = () => {
    if (!cantDoReason) {
      alert('Please select a reason for CANT DO')
      return
    }
    alert(`CANT DO action triggered. Reason: ${cantDoReason}`)
  }

  const handleReissueCheck = () => {
    setShowReissueModal(true)
  }

  const closeReissueModal = () => {
    setShowReissueModal(false)
  }

  const handleCaseFormChange = (field, value) => {
    setCaseFormData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCreateCase = () => {
    setIsCreatingCase(true)
    setTimeout(() => {
      setIsCreatingCase(false)
      navigate('/analysis')
    }, 1500)
  }

  const handleFieldChange = (field, value) => {
    setExtractedData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="upload-page">
      <div className="breadcrumbs">
        <span>Stop Payment</span>
        <span className="separator">/</span>
        <span>Returned Check Document</span>
      </div>

      <div
        className={
          step === 'addressComparison' ? 'full-width-comparison' : 'split-container'
        }
      >
        {step !== 'addressComparison' && (
          <div className="pdf-section">
            <div className="preview-header">
              <h3>Document Preview</h3>
              <div className="preview-controls">
                <button className="control-btn" disabled>
                  −
                </button>
                <span className="page-info">Page 1 of 1</span>
                <button className="control-btn" disabled>
                  +
                </button>
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

        <div
          className={
            step === 'addressComparison'
              ? 'full-width-extraction-section'
              : 'extraction-section'
          }
        >
          {step === 'initial' && (
            <div className="extraction-initial">
              <button
                className="extract-btn"
                onClick={handleExtractInfo}
                disabled={isExtracting}
              >
                {isExtracting
                  ? 'Extracting Information...'
                  : 'Extract Info from Returned Package'}
              </button>
              {isExtracting && (
                <div className="extraction-progress">
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                  <p>
                    Extracting check details, account information, and address
                    data...
                  </p>
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
                      onChange={(e) =>
                        handleFieldChange('claimNumber', e.target.value)
                      }
                    />
                  </div>
                  <div className="form-field">
                    <label>Check Number</label>
                    <input
                      type="text"
                      value={extractedData.checkNumber || ''}
                      onChange={(e) =>
                        handleFieldChange('checkNumber', e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Name as per the Letter</label>
                  <input
                    type="text"
                    value={extractedData.nameAsPerLetter || ''}
                    onChange={(e) =>
                      handleFieldChange('nameAsPerLetter', e.target.value)
                    }
                  />
                </div>

                <div className="form-field">
                  <label>Given Address</label>
                  <input
                    type="text"
                    value={extractedData.givenAddress || ''}
                    onChange={(e) =>
                      handleFieldChange('givenAddress', e.target.value)
                    }
                  />
                </div>

                <div className="form-field">
                  <label>Date of Service</label>
                  <input
                    type="text"
                    value={extractedData.dateOfService || ''}
                    onChange={(e) =>
                      handleFieldChange('dateOfService', e.target.value)
                    }
                  />
                </div>

                <div className="form-field">
                  <label>Type of Service</label>
                  <input
                    type="text"
                    value={extractedData.typeOfService || ''}
                    onChange={(e) =>
                      handleFieldChange('typeOfService', e.target.value)
                    }
                  />
                </div>

                <div className="form-field">
                  <label>
                    {selectedCheck.id === 'CHK002'
                      ? 'Vehicle Identification Number'
                      : 'Patient Account Number'}
                  </label>
                  <input
                    type="text"
                    value={extractedData.patientAccountNumber || ''}
                    onChange={(e) =>
                      handleFieldChange('patientAccountNumber', e.target.value)
                    }
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
                    onChange={(e) =>
                      handleFieldChange('financialImpactOnBuyer', e.target.value)
                    }
                  />
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
                  'Confirm and Fetch Provider Details'
                )}
              </button>
            </div>
          )}

          {step === 'addressComparison' && (
            <div className="comparison-section">
              <div className="comparison-grid">
                <div
                  className={`address-matrix-card ${
                    allAddressFieldsMatch ? 'address-match' : 'address-mismatch'
                  }`}
                >
                  <div className="address-matrix-header">
                    <h4>Customer Address Comparison</h4>
                    <span className="address-matrix-subtitle">
                      Letter vs CAS vs EHub
                    </span>
                  </div>
                  <table className="address-matrix-table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Letter</th>
                        <th>CAS</th>
                        <th>EHub</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="address-label-cell">Name</td>
                        <td
                          className={`address-value-cell ${
                            nameRowMatch ? 'match' : 'mismatch'
                          }`}
                        >
                          {comparison.customerDetails.customerName.fromDocument}
                        </td>
                        <td
                          className={`address-value-cell ${
                            nameRowMatch ? 'match' : 'mismatch'
                          }`}
                        >
                          {comparison.customerDetails.customerName.fromAries}
                        </td>
                        <td
                          className={`address-value-cell ${
                            nameRowMatch ? 'match' : 'mismatch'
                          }`}
                        >
                          {comparison.eHubAddress.name}
                        </td>
                      </tr>
                      <tr>
                        <td className="address-label-cell">Address Line 1</td>
                        <td
                          className={`address-value-cell ${
                            addressLine1RowMatch ? 'match' : 'mismatch'
                          }`}
                        >
                          {comparison.customerDetails.address.fromDocument}
                        </td>
                        <td
                          className={`address-value-cell ${
                            addressLine1RowMatch ? 'match' : 'mismatch'
                          }`}
                        >
                          {comparison.customerDetails.address.fromAries}
                        </td>
                        <td
                          className={`address-value-cell ${
                            addressLine1RowMatch ? 'match' : 'mismatch'
                          }`}
                        >
                          {comparison.eHubAddress.addressLine1}
                        </td>
                      </tr>
                      <tr>
                        <td className="address-label-cell">Address Line 2</td>
                        <td
                          className={`address-value-cell ${
                            addressLine2RowMatch ? 'match' : 'mismatch'
                          }`}
                        >
                          {comparison.customerDetails.addressLine2.fromDocument}
                        </td>
                        <td
                          className={`address-value-cell ${
                            addressLine2RowMatch ? 'match' : 'mismatch'
                          }`}
                        >
                          {comparison.customerDetails.addressLine2.fromAries}
                        </td>
                        <td
                          className={`address-value-cell ${
                            addressLine2RowMatch ? 'match' : 'mismatch'
                          }`}
                        >
                          {comparison.eHubAddress.addressLine2}
                        </td>
                      </tr>
                      <tr>
                        <td className="address-label-cell">City</td>
                        <td
                          className={`address-value-cell ${
                            cityRowMatch ? 'match' : 'mismatch'
                          }`}
                        >
                          {comparison.customerDetails.city.fromDocument}
                        </td>
                        <td
                          className={`address-value-cell ${
                            cityRowMatch ? 'match' : 'mismatch'
                          }`}
                        >
                          {comparison.customerDetails.city.fromAries}
                        </td>
                        <td
                          className={`address-value-cell ${
                            cityRowMatch ? 'match' : 'mismatch'
                          }`}
                        >
                          {comparison.eHubAddress.city}
                        </td>
                      </tr>
                      <tr>
                        <td className="address-label-cell">State</td>
                        <td
                          className={`address-value-cell ${
                            stateRowMatch ? 'match' : 'mismatch'
                          }`}
                        >
                          {comparison.customerDetails.state.fromDocument}
                        </td>
                        <td
                          className={`address-value-cell ${
                            stateRowMatch ? 'match' : 'mismatch'
                          }`}
                        >
                          {comparison.customerDetails.state.fromAries}
                        </td>
                        <td
                          className={`address-value-cell ${
                            stateRowMatch ? 'match' : 'mismatch'
                          }`}
                        >
                          {comparison.eHubAddress.state}
                        </td>
                      </tr>
                      <tr>
                        <td className="address-label-cell">Zip</td>
                        <td
                          className={`address-value-cell ${
                            zipRowMatch ? 'match' : 'mismatch'
                          }`}
                        >
                          {comparison.customerDetails.zipCode.fromDocument}
                        </td>
                        <td
                          className={`address-value-cell ${
                            zipRowMatch ? 'match' : 'mismatch'
                          }`}
                        >
                          {comparison.customerDetails.zipCode.fromAries}
                        </td>
                        <td
                          className={`address-value-cell ${
                            zipRowMatch ? 'match' : 'mismatch'
                          }`}
                        >
                          {comparison.eHubAddress.zip}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="address-actions">
                    <div className="address-choice">
                      <span className="address-choice-label">Use address from:</span>
                      <label
                        className={`radio-option ${
                          selectedCheck.id === 'CHK001' ? 'radio-option-disabled' : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name="addressSource"
                          value="CAS"
                          checked={addressSource === 'CAS'}
                          onChange={(e) => setAddressSource(e.target.value)}
                          disabled={selectedCheck.id === 'CHK001'}
                        />
                        <span className="radio-label">CAS</span>
                      </label>
                      <label
                        className={`radio-option ${
                          selectedCheck.id === 'CHK001' ? 'radio-option-disabled' : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name="addressSource"
                          value="EHub"
                          checked={addressSource === 'EHub'}
                          onChange={(e) => setAddressSource(e.target.value)}
                          disabled={selectedCheck.id === 'CHK001'}
                        />
                        <span className="radio-label">EHub</span>
                      </label>
                    </div>

                    <div className="form-field" style={{ marginTop: '12px' }}>
                      <label>Notes</label>
                      <textarea
                        value={addressNotes}
                        onChange={(e) => setAddressNotes(e.target.value)}
                        placeholder="Add any notes about the address selection..."
                      />
                    </div>
                  </div>
                </div>
              </div>

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

              {selectedCheck.id === 'CHK002' && step === 'addressComparison' && (
                <div className="cant-do-section" style={{ marginTop: '20px' }}>
                  <button
                    className="action-btn reissue-btn"
                    onClick={handleReissueCheck}
                  >
                    Reissue Check and Resend Letter
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 'verified' && (
            <div className="verified-info">
              {/* reuse verified section unchanged */}
            </div>
          )}
        </div>
      </div>

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
                    The bot has been triggered to process the reissue check and resend
                    letter request. The workflow will continue automatically in the
                    background.
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

export default StopPaymentUpload


