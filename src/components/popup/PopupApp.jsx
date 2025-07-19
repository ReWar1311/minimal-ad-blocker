import React from 'react'
import { useExtensionState } from '@hooks/useExtensionState'

const PopupApp = () => {
  const { isBlocking, blockedCount, loading, toggleBlocking } = useExtensionState()

  if (loading) {
    return (
      <div className="popup-loader">
        <div className="loader-spinner"></div>
        <p>INITIALIZING...</p>
      </div>
    )
  }

  return (
    <div className="popup-main">
      <div className="brand-section">
        <div className="brand-logo">⚡</div>
        <div className="brand-info">
          <h1 className="brand-name">SHIELD</h1>
          <p className="brand-status">{isBlocking ? 'ACTIVE' : 'DISABLED'}</p>
        </div>
      </div>

      <div className="stats-display">
        <div className="stat-card">
          <div className="stat-value">{blockedCount.toLocaleString()}</div>
          <div className="stat-label">BLOCKED</div>
        </div>
        <div className="protection-indicator">
          <div className={`indicator-dot ${isBlocking ? 'active' : 'inactive'}`}></div>
          <span className="indicator-text">
            {isBlocking ? 'PROTECTION ON' : 'PROTECTION OFF'}
          </span>
        </div>
      </div>

      <div className="action-controls">
        <button 
          className={`primary-action ${isBlocking ? 'stop' : 'start'}`}
          onClick={toggleBlocking}
        >
          {isBlocking ? 'STOP PROTECTION' : 'START PROTECTION'}
        </button>
        
        <button 
          className="secondary-action"
          onClick={() => chrome.runtime.openOptionsPage()}
        >
          SETTINGS
        </button>
      </div>
    </div>
  )
}

export default PopupApp