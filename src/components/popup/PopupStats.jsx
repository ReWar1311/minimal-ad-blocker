import React from 'react'

const PopupStats = ({ blockedCount }) => {
  return (
    <div className="popup-stats">
      <div className="stats-item">
        <span className="stats-number">{blockedCount.toLocaleString()}</span>
        <span className="stats-label">Requests Blocked</span>
      </div>
    </div>
  )
}

export default PopupStats