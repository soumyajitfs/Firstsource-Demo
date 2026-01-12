import React from 'react'
import './Guidelines.css'

const Guidelines = () => {
  return (
    <div className="guidelines">
      <div className="breadcrumbs">
        <span>My Work</span>
        <span className="separator">/</span>
        <span>Guidelines</span>
      </div>

      <div className="page-header">
        <h2>Returned Check Resolution Guidelines</h2>
      </div>

      <div className="guidelines-content">
        <div className="guideline-section">
          <h3>1. Upload Process</h3>
          <ul>
            <li>Only PDF files are accepted for returned check documents</li>
            <li>Ensure the PDF is clear and readable before uploading</li>
            <li>Maximum file size: 10MB</li>
            <li>After upload, review the PDF preview to confirm accuracy</li>
          </ul>
        </div>

        <div className="guideline-section">
          <h3>2. Data Extraction</h3>
          <ul>
            <li>Extracted data includes: check number, account holder, amount, date, and address</li>
            <li>Confidence indicators show extraction quality (High/Medium/Low)</li>
            <li>All extracted fields are editable - verify and correct as needed</li>
            <li>Compare extracted data with system records before proceeding</li>
          </ul>
        </div>

        <div className="guideline-section">
          <h3>3. Validation Checks</h3>
          <ul>
            <li>System performs automatic validation against customer database</li>
            <li>Green checkmarks indicate successful matches</li>
            <li>Amber warnings indicate partial matches requiring review</li>
            <li>Red indicators show mismatches that must be resolved</li>
            <li>All mandatory checks must pass before resolution decision</li>
          </ul>
        </div>

        <div className="guideline-section">
          <h3>4. Resolution Decision</h3>
          <ul>
            <li>Review all validation results before making a decision</li>
            <li>Select appropriate decision type: Valid Complaint, Invalid Complaint, No Clear Evidence, or Requires Investigation</li>
            <li>Provide detailed reason for the decision in the text area</li>
            <li>Mark vulnerability status if customer is in vulnerable circumstances</li>
            <li>Determine if case is reportable to FCA based on severity</li>
          </ul>
        </div>

        <div className="guideline-section">
          <h3>5. FCA Reporting</h3>
          <ul>
            <li>Cases marked as "Reportable to FCA" must be reported</li>
            <li>Use the "Report to FCA" button to initiate reporting process</li>
            <li>Ensure all required information is complete before reporting</li>
            <li>Maintain audit trail for all FCA reports</li>
          </ul>
        </div>

        <div className="guideline-section">
          <h3>6. Best Practices</h3>
          <ul>
            <li>Always verify extracted data accuracy before proceeding</li>
            <li>Document any manual corrections made to extracted fields</li>
            <li>Review past complaint history when available</li>
            <li>Ensure complete audit trail for compliance purposes</li>
            <li>Follow escalation procedures for complex cases</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Guidelines

