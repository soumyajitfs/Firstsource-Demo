import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MyWork.css'
import { mockReturnedChecks } from '../data/mockData'

const MyWork = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [checks] = useState(mockReturnedChecks)

  const filteredChecks = filter === 'all' 
    ? checks 
    : checks.filter(check => check.status === filter)

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { class: 'status-pending', label: 'Pending' },
      'extracted': { class: 'status-extracted', label: 'Extracted' },
      'validated': { class: 'status-validated', label: 'Validated' },
      'resolved': { class: 'status-resolved', label: 'Resolved' },
      'escalated': { class: 'status-escalated', label: 'Escalated' }
    }
    const config = statusConfig[status] || statusConfig['pending']
    return <span className={`status-badge ${config.class}`}>{config.label}</span>
  }

  const handlePrecheck = (checkId) => {
    navigate(`/upload?checkId=${checkId}`)
  }

  return (
    <div className="my-work">
      <div className="breadcrumbs">
        <span>My Work</span>
        <span className="separator">/</span>
        <span>Returned Checks</span>
      </div>

      <div className="page-header">
        <h2>Returned Checks Dashboard</h2>
        <div className="filter-tabs">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({checks.length})
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending ({checks.filter(c => c.status === 'pending').length})
          </button>
          <button 
            className={filter === 'extracted' ? 'active' : ''}
            onClick={() => setFilter('extracted')}
          >
            Extracted ({checks.filter(c => c.status === 'extracted').length})
          </button>
          <button 
            className={filter === 'resolved' ? 'active' : ''}
            onClick={() => setFilter('resolved')}
          >
            Resolved ({checks.filter(c => c.status === 'resolved').length})
          </button>
        </div>
      </div>

      <div className="checks-inbox">
        <div className="inbox-header">
          <h3>Returned Checks Inbox</h3>
          <p className="inbox-summary">
            {filteredChecks.length} {filter === 'all' ? 'total' : filter} check{filteredChecks.length !== 1 ? 's' : ''} available
          </p>
        </div>

        <div className="checks-table-container">
          <table className="checks-table">
            <thead>
              <tr>
                <th>Email From</th>
                <th>Account Holder</th>
                <th>Return Reason</th>
                <th>Attachment</th>
                <th>Received Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredChecks.map((check) => (
                <tr key={check.id}>
                  <td>{check.emailFrom}</td>
                  <td>{check.accountHolder}</td>
                  <td>{check.returnReason}</td>
                  <td>
                    {check.pdfUrl ? 'Yes' : 'No'}
                  </td>
                  <td>{check.receivedDate}</td>
                  <td>{getStatusBadge(check.status)}</td>
                  <td>
                    <button 
                      className="action-btn precheck-btn"
                      onClick={() => handlePrecheck(check.id)}
                    >
                      Process
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MyWork

