import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MyWork.css'
import { mockReturnedChecks } from '../data/mockData'

const StopPaymentWork = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [checks] = useState(mockReturnedChecks)

  const filteredChecks = filter === 'all'
    ? checks
    : checks.filter(check => check.status === filter)

  const getStatusBadge = (status) => {
    const statusConfig = {
      inProgress: { class: 'status-pending', label: 'In Progress' },
      received: { class: 'status-extracted', label: 'Received' }
    }
    const config = statusConfig[status] || statusConfig.received
    return <span className={`status-badge ${config.class}`}>{config.label}</span>
  }

  const handlePrecheck = (checkId) => {
    navigate(`/stop-payment/upload?checkId=${checkId}`)
  }

  return (
    <div className="my-work">
      <div className="breadcrumbs">
        <span>Stop Payment</span>
        <span className="separator">/</span>
        <span>Fetch items from claim recovery tool</span>
      </div>

      <div className="page-header">
        <h2>Fetch items from claim recovery tool</h2>
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
          <h3>Fetch items from claim recovery tool</h3>
          <p className="inbox-summary">
            {filteredChecks.length}{' '}
            {filter === 'all' ? 'total' : filter} check
            {filteredChecks.length !== 1 ? 's' : ''} available
          </p>
        </div>

        <div className="checks-table-container">
          <table className="checks-table">
            <thead>
              <tr>
                <th>Provider Account</th>
                <th>Check Number</th>
                <th>Attachment</th>
                <th>Received Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredChecks.map((check) => {
                const formatDate = (dateString) => {
                  const date = new Date(dateString)
                  const day = String(date.getDate()).padStart(2, '0')
                  const month = String(date.getMonth() + 1).padStart(2, '0')
                  const year = String(date.getFullYear()).slice(-2)
                  return `${day}/${month}/${year}`
                }

                return (
                  <tr key={check.id}>
                    <td>{check.accountHolder}</td>
                    <td>{check.checkNumber}</td>
                    <td>{check.pdfUrl ? 'Yes' : 'No'}</td>
                    <td>{formatDate(check.receivedDate)}</td>
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
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StopPaymentWork


