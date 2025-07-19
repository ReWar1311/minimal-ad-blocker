import React from 'react'

const PopupActions = ({ isBlocking, onToggle }) => {
  return (
    <div className="popup-actions">
      <button 
        className={`toggle-button ${isBlocking ? 'active' : 'inactive'}`}
        onClick={onToggle}
      >
        {isBlocking ? 'Disable Blocking' : 'Enable Blocking'}
      </button>
      
      <button 
        className="options-button"
        onClick={() => chrome.runtime.openOptionsPage()}
      >
        Open Options
      </button>
    </div>
  )
}

export default PopupActions