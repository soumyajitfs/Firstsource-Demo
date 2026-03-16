import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()

  const handleReadFromMailbox = () => {
    navigate('/my-work')
  }

  return (
    <div className="home-page">
      <div className="breadcrumbs">
        <span>My Work</span>
        <span className="separator">/</span>
        <span>HPHS Solutions</span>
      </div>

      <div className="home-content">
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

export default Home

