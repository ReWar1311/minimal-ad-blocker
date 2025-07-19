import React from 'react'

const DashboardPanel = ({ 
  isBlocking, 
  blockedCount, 
  blockedDomains,    // New prop name
  whitelistSites, 
  famousSitesConfig 
}) => {
  const activeFamousSites = Object.values(famousSitesConfig || {}).filter(Boolean).length

  return (
    <div className="dashboard-panel">
      <div className="panel-header">
        <h2 className="panel-title">PROTECTION OVERVIEW</h2>
        <p className="panel-subtitle">Real-time security monitoring and statistics</p>
      </div>

      {/* Status Cards */}
      <div className="status-grid">
        <div className="status-card primary">
          <div className="card-icon">🛡️</div>
          <div className="card-content">
            <h3 className="card-title">PROTECTION STATUS</h3>
            <p className="card-value">{isBlocking ? 'ACTIVE' : 'DISABLED'}</p>
          </div>
        </div>

        <div className="status-card">
          <div className="card-icon">🚫</div>
          <div className="card-content">
            <h3 className="card-title">THREATS BLOCKED</h3>
            <p className="card-value">{blockedCount.toLocaleString()}</p>
          </div>
        </div>

        <div className="status-card">
          <div className="card-icon">⚙️</div>
          <div className="card-content">
            <h3 className="card-title">ACTIVE RULES</h3>
            <p className="card-value">{blockedDomains?.length}</p>
          </div>
        </div>

        <div className="status-card">
          <div className="card-icon">✅</div>
          <div className="card-content">
            <h3 className="card-title">WHITELISTED</h3>
            <p className="card-value">{whitelistSites?.length}</p>
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="activity-section">
        <h3 className="section-title">RECENT ACTIVITY</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-time">NOW</span>
            <span className="activity-text">System protection {isBlocking ? 'active' : 'disabled'}</span>
          </div>
          {blockedDomains?.length > 0 && (
            <div className="activity-item">
              <span className="activity-time">RULES</span>
              <span className="activity-text">{blockedDomains.length} blocking rules loaded</span>
            </div>
          )}
          {whitelistSites?.length > 0 && (
            <div className="activity-item">
              <span className="activity-time">ACCESS</span>
              <span className="activity-text">{whitelistSites.length} sites whitelisted</span>
            </div>
          )}
          {blockedDomains?.length > 0 && (
            <div className="activity-item">
              <span className="activity-time">RULES</span>
              <span className="activity-text">{blockedDomains.length} domains actively blocked</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPanel
