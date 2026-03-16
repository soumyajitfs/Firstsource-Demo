import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './UploadReturnedCheck.css'
import { mockReturnedChecksCashPosting, cashPostingExtractedDataMap, mockExtractedDataCashPostingCHK001 } from '../data/mockData'

const CashPostingUpload = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const checkId = searchParams.get('checkId')
  const displayId = searchParams.get('displayId')
  const mode = searchParams.get('mode')

  const selectedCheck = mockReturnedChecksCashPosting.find(check => check.id === checkId) || mockReturnedChecksCashPosting[0]
  const basePdfUrl = selectedCheck.pdfUrl || '/Brandon Complete Dental Care.pdf'
  const pdfUrl = `${basePdfUrl}#zoom=100`
  const [step, setStep] = useState('extracted')
  const initialExtractedData = cashPostingExtractedDataMap[selectedCheck.id] || mockExtractedDataCashPostingCHK001
  const [extractedData, setExtractedData] = useState(initialExtractedData)
  const [isExtracting, setIsExtracting] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    const currentCheck = mockReturnedChecksCashPosting.find(check => check.id === checkId) || mockReturnedChecksCashPosting[0]
    const newExtractedData = cashPostingExtractedDataMap[currentCheck.id] || mockExtractedDataCashPostingCHK001
    setExtractedData(newExtractedData)
  }, [checkId])




  const handleExtractInfo = () => {
    setIsExtracting(true)
    setTimeout(() => {
      setIsExtracting(false)
      setStep('extracted')
    }, 1500)
  }



  // Cash Posting Flow 1: Navigate to provider details (no address comparison)
  const handleVerifyAries = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      navigate(`/cash-posting/provider-details?checkId=${selectedCheck.id}`)
    }, 2000)
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
        <span>Cash Posting Flow 1</span>
        <span className="separator">/</span>
        <span>{displayId || selectedCheck.id}</span>
      </div>

      <div className="split-container">
        <div className="pdf-section">
          <div className="preview-header">
              <h3>Document From Bank Lock Box</h3>
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

        <div className="extraction-section">
          {step === 'initial' && (
            <div className="extraction-initial">
              <button
                className="extract-btn"
                onClick={handleExtractInfo}
                disabled={isExtracting}
              >
                {isExtracting
                  ? 'Extracting Information...'
                  : 'Extract Info From Document'}
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
                <div className="form-field">
                  <label>Claim Number</label>
                  <input
                    type="text"
                    value={extractedData.claimNumber || ''}
                    readOnly
                    style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                  />
                </div>

                <div className="form-field">
                  <label>Check Number</label>
                  <input
                    type="text"
                    value={extractedData.checkNumber || ''}
                    readOnly
                    style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                  />
                </div>

                <div className="form-field">
                  <label>Check Date</label>
                  <input
                    type="text"
                    value={extractedData.checkDate || ''}
                    readOnly
                    style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                  />
                </div>

                <div className="form-field">
                  <label>Provider Name</label>
                  <input
                    type="text"
                    value={extractedData.providerName || ''}
                    readOnly
                    style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                  />
                </div>

                <div className="form-field">
                  <label>Payable To</label>
                  <input
                    type="text"
                    value="Humana"
                    readOnly
                    style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                  />
                </div>

                <div className="form-field">
                  <label>Over Payment Charge</label>
                  <input
                    type="text"
                    value={extractedData.overPaymentCharge || ''}
                    readOnly
                    style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                  />
                </div>

                <div className="form-field">
                  <label>Check Amount</label>
                  <input
                    type="text"
                    value={extractedData.checkAmount || ''}
                    readOnly
                    style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                  />
                </div>

                <div className="form-field">
                  <label>Recover Number</label>
                  <input
                    type="text"
                    value={extractedData.recoverNumber || ''}
                    readOnly
                    style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                  />
                </div>

                <div className="form-field">
                  <label>Given Address</label>
                  <input
                    type="text"
                    value={extractedData.givenAddress || ''}
                    readOnly
                    style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
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
                  'Next'
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default CashPostingUpload

