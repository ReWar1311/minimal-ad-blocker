import React from 'react'

const StatusIndicator = ({ isActive }) => {
  return (
    <div className="status-indicator">
      <div className={`status-light ${isActive ? 'active' : 'inactive'}`}></div>
      <span className="status-text">
        {isActive ? 'Protection Active' : 'Protection Disabled'}
      </span>
    </div>
  )
}

export default StatusIndicator