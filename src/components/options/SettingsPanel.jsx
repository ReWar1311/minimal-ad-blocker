import React from 'react'

const SettingsPanel = ({ onResetStats, onResetRules, isBlocking, onToggleBlocking }) => {
  return (
    <div className="settings-panel">
      <div className="panel-header">
        <h2 className="panel-title">SETTINGS</h2>
        <p className="panel-subtitle">Configure system preferences and actions</p>
      </div>

      <div className="settings-section">
        <div className="setting-card">
          <div className="setting-header">
            <h3 className="setting-title">MASTER PROTECTION</h3>
          </div>
          <p className="setting-description">
            Enable or disable the entire protection system
          </p>
          <div className="setting-action">
            <button 
              className={`toggle-action-button ${isBlocking ? 'on' : 'off'}`}
              onClick={onToggleBlocking}
            >
              {isBlocking ? 'PROTECTION ON' : 'PROTECTION OFF'}
            </button>
          </div>
        </div>
        
        <div className="setting-card">
          <div className="setting-header">
            <h3 className="setting-title">RESET STATISTICS</h3>
          </div>
          <p className="setting-description">
            Reset all blocking statistics to zero
          </p>
          <div className="setting-action">
            <button 
              className="reset-button"
              onClick={() => {
                if (window.confirm('Are you sure you want to reset all statistics?')) {
                  onResetStats()
                }
              }}
            >
              RESET STATS
            </button>
          </div>
        </div>
        
        <div className="setting-card danger">
          <div className="setting-header">
            <h3 className="setting-title">FACTORY RESET</h3>
          </div>
          <p className="setting-description">
            Reset all rules and settings to default values
          </p>
          <div className="setting-action">
            <button 
              className="danger-button"
              onClick={() => {
                if (window.confirm('WARNING: This will delete all your custom rules and settings. Are you sure?')) {
                  onResetRules()
                }
              }}
            >
              RESET ALL SETTINGS
            </button>
          </div>
        </div>
      </div>

      <div className="about-section">
        <div className="about-header">
          <h3 className="section-title">ABOUT</h3>
        </div>
        <div className="about-content">
          <p><strong>Shield</strong> - Advanced Protection System</p>
          <p>Version: 2.0.0</p>
          <p>Engine: Declarative Net Request API</p>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel
