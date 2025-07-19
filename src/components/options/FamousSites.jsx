import React, { useState } from 'react'

const FamousSites = ({ 
  famousSitesConfig, 
  onToggle, 
  famousSitesMapping,
  blockAllDefault
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const enabledCount = Object.values(famousSitesConfig).filter(Boolean).length
  
  const filteredSites = Object.entries(famousSitesMapping).filter(([site]) =>
    site.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getSiteIcon = (site) => {
    const icons = {
      'youtube.com': '📺',
      'facebook.com': '👥',
      'twitter.com': '🐦',
      'instagram.com': '📷',
      'reddit.com': '🤖',
      'tiktok.com': '🎵'
    }
    return icons[site] || '🌐'
  }

  return (
    <div className="rules-section">
      <div 
        className="section-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="section-title-group">
          <h3 className="section-title">
            <span className="icon">⭐</span>
            Popular Sites Ad Blocking
            <span className="count-badge">{enabledCount}</span>
          </h3>
          <p className="section-subtitle">
            {blockAllDefault 
              ? "Configure specific ad blocking for popular platforms (when not using block-all mode)" 
              : "Enable ad blocking for popular sites with pre-mapped ad domains"
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
          {blockAllDefault && (
            <div className="info-banner">
              <span className="banner-icon">ℹ️</span>
              <div>
                <strong>Block All Mode Active:</strong> These settings provide additional specific blocking rules for popular sites.
              </div>
            </div>
          )}

          {Object.keys(famousSitesMapping).length > 0 && (
            <div className="search-bar">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search popular sites..."
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          )}

          <div className="famous-sites-grid">
            {filteredSites.length === 0 ? (
              <p className="empty-state">
                {searchTerm ? 'No matching sites found' : 'No popular sites available'}
              </p>
            ) : (
              filteredSites.map(([site, adDomains]) => (
                <div key={site} className={`famous-site-card ${famousSitesConfig[site] ? 'enabled' : ''}`}>
                  <div className="site-header">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={famousSitesConfig[site] || false}
                        onChange={() => onToggle(site)}
                        className="site-checkbox"
                      />
                      <span className="site-info">
                        <span className="site-icon">{getSiteIcon(site)}</span>
                        <span className="site-name">{site}</span>
                        <span className={`status-badge ${famousSitesConfig[site] ? 'enabled' : 'disabled'}`}>
                          {famousSitesConfig[site] ? 'Enabled' : 'Disabled'}
                        </span>
                      </span>
                    </label>
                  </div>
                  
                  <div className="ad-domains">
                    <div className="domains-header">
                      <span className="domains-label">Blocks {adDomains.length} domains:</span>
                    </div>
                    <div className="domains-list">
                      {adDomains.slice(0, 3).map(domain => (
                        <span key={domain} className="domain-tag">
                          {domain}
                        </span>
                      ))}
                      {adDomains.length > 3 && (
                        <span className="domain-tag more">
                          +{adDomains.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="quick-actions">
            <button 
              onClick={() => {
                Object.keys(famousSitesMapping).forEach(site => {
                  if (!famousSitesConfig[site]) {
                    onToggle(site)
                  }
                })
              }}
              className="quick-action-button primary"
            >
              <span className="button-icon">✅</span>
              Enable All
            </button>
            <button 
              onClick={() => {
                Object.keys(famousSitesMapping).forEach(site => {
                  if (famousSitesConfig[site]) {
                    onToggle(site)
                  }
                })
              }}
              className="quick-action-button secondary"
            >
              <span className="button-icon">❌</span>
              Disable All
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FamousSites