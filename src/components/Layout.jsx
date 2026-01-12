import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

const Layout = ({ children }) => {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const isActive = (path) => location.pathname === path

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
            <div className="section-title">GENERAL</div>
            <Link
              to="/"
              className={`sidebar-item ${isActive('/') ? 'active' : ''}`}
            >
              <span>My Work</span>
            </Link>
          </div>

          <div className="sidebar-section">
            <div className="section-title">PROCESS</div>
            <Link
              to="/upload"
              className={`sidebar-item ${isActive('/upload') ? 'active' : ''}`}
            >
              <span>Upload Returned Check</span>
            </Link>
            <Link
              to="/analysis"
              className={`sidebar-item ${isActive('/analysis') ? 'active' : ''}`}
            >
              <span>Check Analysis</span>
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

