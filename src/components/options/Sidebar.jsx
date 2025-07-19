import React from 'react'

const Sidebar = ({ activePanel, onPanelChange, stats }) => {
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'DASHBOARD' },
    { id: 'rules', icon: '⚙️', label: 'RULES ENGINE' },
    { id: 'settings', icon: '🔧', label: 'SETTINGS' }
  ]

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activePanel === item.id ? 'active' : ''}`}
            onClick={() => onPanelChange(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-stats">
        <div className="stats-title">SYSTEM STATUS</div>
        <div className="stat-item">
          <span className="stat-label">BLOCKED</span>
          <span className="stat-value">{stats.blocked.toLocaleString()}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">RULES</span>
          <span className="stat-value">{stats.rules}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">ALLOWED</span>
          <span className="stat-value">{stats.whitelisted}</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
