import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

const Layout = ({ children }) => {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')

  const isActive = (path) => location.pathname === path

  return (
    <div className="layout">
      <header className="header">
        <div className="header-left">
          <h1 className="app-title">Humana - Returned Check Resolution</h1>
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
        <aside className="sidebar">
          <div className="sidebar-section">
            <div className="section-title">GENERAL</div>
            <Link
              to="/my-work"
              className={`sidebar-item ${isActive('/my-work') ? 'active' : ''}`}
            >
              <span className="sidebar-icon">🖥️</span>
              <span>My Work</span>
            </Link>
          </div>

          <div className="sidebar-section">
            <div className="section-title">PROCESS</div>
            <Link
              to="/upload"
              className={`sidebar-item ${isActive('/upload') ? 'active' : ''}`}
            >
              <span className="sidebar-icon">📤</span>
              <span>Upload Returned Check</span>
            </Link>
            <Link
              to="/analysis"
              className={`sidebar-item ${isActive('/analysis') ? 'active' : ''}`}
            >
              <span className="sidebar-icon">🔍</span>
              <span>Check Analysis</span>
            </Link>
            <Link
              to="/decision"
              className={`sidebar-item ${isActive('/decision') ? 'active' : ''}`}
            >
              <span className="sidebar-icon">✅</span>
              <span>Resolution Decision</span>
            </Link>
          </div>

          <div className="sidebar-section">
            <div className="section-title">OTHERS</div>
            <Link
              to="/guidelines"
              className={`sidebar-item ${isActive('/guidelines') ? 'active' : ''}`}
            >
              <span className="sidebar-icon">📋</span>
              <span>Guidelines</span>
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

