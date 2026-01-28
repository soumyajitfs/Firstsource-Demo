import React from 'react'
import { useNavigate } from 'react-router-dom'
import './StopPayment.css'

const StopPayment = () => {
  const navigate = useNavigate()

  const handleReadFromMailbox = () => {
    navigate('/stop-payment/work')
  }

  return (
    <div className="stop-payment">
      <div className="breadcrumbs">
        <span>Stop Payment</span>
        <span className="separator">/</span>
        <span>Returned Checks Resolution</span>
      </div>

      <div className="stop-payment-content">
        <div className="mailbox-card">
          <div className="mailbox-icon">📬</div>
          <button
            className="read-mailbox-btn"
            onClick={handleReadFromMailbox}
          >
            Read from Returned Checks MailBox
          </button>
          <p className="mailbox-description">
            Click to view and process returned checks from the mailbox
          </p>
        </div>
      </div>
    </div>
  )
}

export default StopPayment

