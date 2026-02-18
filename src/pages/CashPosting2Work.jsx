import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MyWork.css'
import { mockReturnedChecksCashPosting } from '../data/mockData'

const CashPosting2Work = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [checks] = useState(mockReturnedChecksCashPosting)

  const filteredChecks = filter === 'all'
    ? checks
    : checks.filter(check => check.status === filter)

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { class: 'status-extracted', label: 'Completed' },
      new: { class: 'status-pending', label: 'New' }
    }
    const config = statusConfig[status] || statusConfig.new
    return <span className={`status-badge ${config.class}`}>{config.label}</span>
  }

  const handlePrecheck = (checkId) => {
    navigate(`/cash-posting-2/upload?checkId=${checkId}`)
  }

  return (
    <div className="my-work">
      <div className="breadcrumbs">
        <span>Cash Posting</span>
        <span className="separator">/</span>
        <span>Items From EFR</span>
      </div>

      <div className="page-header">
        <h2>Items From EFR</h2>
        <div className="filter-tabs">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({checks.length})
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed ({checks.filter(c => c.status === 'completed').length})
          </button>
          <button
            className={filter === 'new' ? 'active' : ''}
            onClick={() => setFilter('new')}
          >
            New ({checks.filter(c => c.status === 'new').length})
          </button>
        </div>
      </div>

      <div className="checks-inbox">
        <div className="inbox-header">
          <h3>Items From EFR</h3>
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
                <th>ID</th>
                <th>Provider Account</th>
                <th>Check Number</th>
                <th>Check Amount</th>
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

                // Generate random ID for each check
                const randomId = Math.floor(Math.random() * 900000) + 100000

                return (
                  <tr key={check.id}>
                    <td>{randomId}</td>
                    <td>{check.accountHolder}</td>
                    <td>{check.checkNumber}</td>
                    <td>${check.amount.toFixed(2)}</td>
                    <td>{formatDate(check.receivedDate)}</td>
                    <td>{getStatusBadge(check.status)}</td>
                    <td>
                      <button
                        className="action-btn precheck-btn"
                        onClick={() => handlePrecheck(check.id)}
                      >
                        {check.status === 'completed' ? 'View' : 'Process'}
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

export default CashPosting2Work

