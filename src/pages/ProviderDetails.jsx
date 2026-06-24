import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './ProviderDetails.css'
import { mockExtractedData, mockExtractedDataCHK002, mockReturnedChecks } from '../data/mockData'

const ProviderDetails = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const checkId = searchParams.get('checkId')

  const selectedCheck = mockReturnedChecks.find(check => check.id === checkId) || mockReturnedChecks[0]
  const extractedData = selectedCheck.id === 'CHK002' ? mockExtractedDataCHK002 : mockExtractedData

  const providerNumber = `PRV-${extractedData.claimNumber || ''}`
  const providerAddress = extractedData.givenAddress || ''

  const handleVerify = () => {
    navigate(`/upload?checkId=${selectedCheck.id}&mode=compare`)
  }

  return (
    <div className="provider-details-page">
      <div className="breadcrumbs">
        <span>My Work</span>
        <span className="separator">/</span>
        <span>Provider Details</span>
      </div>

      <div className="page-header">
        <h2>Provider Details</h2>
        <p className="page-subtitle">Fetched from returned package (read-only)</p>
      </div>

      <div className="provider-details-card">
        <div className="provider-grid">
          <div className="provider-field">
            <div className="provider-label">Claim Number</div>
            <div className="provider-value">{extractedData.claimNumber}</div>
          </div>

          <div className="provider-field">
            <div className="provider-label">Check Number</div>
            <div className="provider-value">{extractedData.checkNumber}</div>
          </div>

          <div className="provider-field">
            <div className="provider-label">Provider Name</div>
            <div className="provider-value">{extractedData.providerName}</div>
          </div>

          <div className="provider-field">
            <div className="provider-label">Provider Number</div>
            <div className="provider-value">{providerNumber}</div>
          </div>

          <div className="provider-field provider-field-wide">
            <div className="provider-label">Provider Address</div>
            <div className="provider-value">{providerAddress}</div>
          </div>
        </div>

        <div className="provider-actions">
          <button className="verify-btn" onClick={handleVerify}>
            Verify against CAS and Ehub
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProviderDetails


