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
      'inProgress': { class: 'status-pending', label: 'In Progress' },
      'received': { class: 'status-extracted', label: 'Received' }
    }
    const config = statusConfig[status] || statusConfig['received']
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
            className={filter === 'inProgress' ? 'active' : ''}
            onClick={() => setFilter('inProgress')}
          >
            In Progress ({checks.filter(c => c.status === 'inProgress').length})
          </button>
          <button 
            className={filter === 'received' ? 'active' : ''}
            onClick={() => setFilter('received')}
          >
            Received ({checks.filter(c => c.status === 'received').length})
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

