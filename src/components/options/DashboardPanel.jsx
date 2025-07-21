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
        <p className="panel-subtitle">Real-time ADs and Trackers Blocking Status</p>
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
            <h3 className="card-title">REQUESTS BLOCKED</h3>
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

    </div>
  )
}

export default DashboardPanel
