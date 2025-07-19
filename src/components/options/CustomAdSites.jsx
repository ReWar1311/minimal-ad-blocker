import React, { useState } from 'react'

const CustomAdSites = ({ 
  customAdSites, 
  onAdd, 
  onRemove, 
  predefinedSites,
  blockAllDefault
}) => {
  const [newSite, setNewSite] = useState('')
  const [showPredefined, setShowPredefined] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleAdd = () => {
    if (newSite.trim() && !customAdSites.includes(newSite.trim())) {
      onAdd(newSite.trim())
      setNewSite('')
    }
  }

  const addPredefinedSite = (site) => {
    if (!customAdSites.includes(site)) {
      onAdd(site)
    }
  }

  const filteredCustomSites = customAdSites.filter(site =>
    site.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredPredefinedSites = predefinedSites.filter(site =>
    site.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !customAdSites.includes(site)
  )

  return (
    <div className="rules-section">
      <div 
        className="section-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="section-title-group">
          <h3 className="section-title">
            <span className="icon">🎯</span>
            Currently Blocking Domains
            <span className="count-badge">{customAdSites.length}</span>
          </h3>
          <p className="section-subtitle">
            {blockAllDefault 
              ? "Add specific sites to block (in addition to default blocking)" 
              : "Add specific domains you want to block"
            }
          </p>
        </div>
        <button className={`expand-button ${isExpanded ? 'expanded' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 12l-4-4h8l-4 4z"/>
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="section-content">
          <div className="add-site-form">
            <div className="input-group">
              <input
                type="text"
                value={newSite}
                onChange={(e) => setNewSite(e.target.value)}
                placeholder="Enter domain to block (e.g., ads.example.com)"
                className="site-input"
                onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
              />
              <button 
                onClick={handleAdd} 
                className="add-button"
                disabled={!newSite.trim() || customAdSites.includes(newSite.trim())}
              >
                <span className="button-icon">+</span>
                Add Site
              </button>
            </div>
          </div>

          {(customAdSites.length > 0 || predefinedSites.length > 0) && (
            <div className="search-bar">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search sites..."
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          )}

          <div className="action-buttons">
            <button 
              onClick={() => setShowPredefined(!showPredefined)}
              className="toggle-button"
            >
              <span className="button-icon">📋</span>
              {showPredefined ? 'Hide' : 'Show'} Common Ad Sites
            </button>
          </div>

          {showPredefined && (
            <div className="predefined-sites-section">
              <h4 className="subsection-title">
                <span className="icon">⚡</span>
                Quick Add - Common Ad Sites
              </h4>
              {filteredPredefinedSites.length === 0 ? (
                <p className="empty-state">
                  {searchTerm ? 'No matching sites found' : 'All common ad sites already added'}
                </p>
              ) : (
                <div className="predefined-grid">
                  {filteredPredefinedSites.map(site => (
                    <button
                      key={site}
                      onClick={() => addPredefinedSite(site)}
                      className="predefined-site-button"
                    >
                      <span className="site-name">{site}</span>
                      <span className="add-icon">+</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="custom-sites-section">
            <h4 className="subsection-title">
              <span className="icon">🚫</span>
              Your Currently Blocking Domains ({customAdSites.length})
            </h4>
            {filteredCustomSites.length === 0 ? (
              <p className="empty-state">
                {searchTerm ? 'No matching sites found' : 'No domains added yet'}
              </p>
            ) : (
              <div className="sites-grid">
                {filteredCustomSites.map(site => (
                  <div key={site} className="site-item">
                    <div className="site-info">
                      <span className="site-name">{site}</span>
                      <span className="site-type">Custom</span>
                    </div>
                    <button
                      onClick={() => onRemove(site)}
                      className="remove-button"
                      title="Remove site"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                        <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7z"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomAdSites