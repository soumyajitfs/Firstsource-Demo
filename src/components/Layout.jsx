import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

const Layout = ({ children }) => {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const isActive = (path) => {
    // Return Check flow: home, my-work, upload, provider-details
    if (path === '/') {
      return (
        location.pathname === '/' ||
        location.pathname.startsWith('/my-work') ||
        location.pathname.startsWith('/upload') ||
        location.pathname.startsWith('/provider-details')
      )
    }
    // Stop Payment flow and others
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="layout">
      <header className="header">
        <div className="header-left">
          <div className="logo-container">
            <span className="humana-logo">Humana</span>
            <span className="app-subtitle">Returned Check Resolution</span>
          </div>
        </div>
        <div className="header-center">
          <input
            type="text"
            className="search-bar"
            placeholder="Search everywhere..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="header-right">
          <div className="user-profile">
            <div className="user-icon">👤</div>
            <span>John Doe</span>
            <span className="dropdown-arrow">▼</span>
          </div>
          <div className="header-icon">?</div>
          <div className="header-icon">🔔</div>
          <div className="header-icon">🚪</div>
        </div>
      </header>

      <div className="main-container">
        <button 
          className={`sidebar-toggle ${sidebarCollapsed ? 'collapsed' : ''}`}
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {sidebarCollapsed ? '▶' : '◀'}
        </button>
        <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-section">
            <div className="section-title">PROCESS</div>
            {/* Return Check menu hidden for now */}
            {/* <Link
              to="/"
              className={`sidebar-item ${isActive('/') ? 'active' : ''}`}
            >
              <span>Return Check</span>
            </Link> */}
            <Link
              to="/stop-payment"
              className={`sidebar-item ${isActive('/stop-payment') ? 'active' : ''}`}
            >
              <span>Stop Payment</span>
            </Link>
          <Link
            to="/cash-posting"
            className={`sidebar-item ${isActive('/cash-posting') ? 'active' : ''}`}
          >
            <span>Cash Posting</span>
          </Link>
          </div>
        </aside>

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout

