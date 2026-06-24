import React from 'react'
import { useNavigate } from 'react-router-dom'
import './StopPayment.css'

const CashPosting2 = () => {
  const navigate = useNavigate()

  const handleReadFromMailbox = () => {
    navigate('/cash-posting-2/work')
  }

  return (
    <div className="stop-payment">
      <div className="breadcrumbs">
        <span>Cash Posting</span>
        <span className="separator">/</span>
        <span>HPHS Solutions</span>
      </div>

      <div className="stop-payment-content">
        <div className="mailbox-card">
          <div className="mailbox-icon">📬</div>
          <button
            className="read-mailbox-btn"
            onClick={handleReadFromMailbox}
          >
            Fetch items from EFR
          </button>
          <p className="mailbox-description">
            Click to view and process returned checks from the mailbox
          </p>
        </div>
      </div>
    </div>
  )
}

export default CashPosting2

