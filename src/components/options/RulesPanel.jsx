import React, { useState, useMemo } from 'react'

const RulesPanel = ({ 
  blockedDomains = [],          
  customAddedDomains = [],      
  famousSitesConfig = {},       
  famousSitesMapping = {},      
  predefinedAdSites = [],       
  onAddCustomDomain,       
  onRemoveCustomDomain,    
  onToggleFamousSite       
}) => {
  const [activeTab, setActiveTab] = useState('custom')
  const [newSite, setNewSite] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBlockedDomains = useMemo(() => 
    blockedDomains.filter(domain => 
      domain.toLowerCase().includes(searchTerm.toLowerCase())
    )
  , [blockedDomains, searchTerm]);

  const handleAddSite = () => {
    if (newSite.trim() && !customAddedDomains.includes(newSite.trim())) {
      onAddCustomDomain(newSite.trim())
      setNewSite('')
    }
  }

  const filteredFamousSites = Object.entries(famousSitesMapping || {}).filter(([site]) =>
    site.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredPredefinedSites = (predefinedAdSites || []).filter(site =>
    site.toLowerCase().includes(searchTerm.toLowerCase()) && 
    !customAddedDomains.includes(site)
  )

  // if a domain is from a famous site
  const getDomainSource = (domain) => {
    for (const [site, domains] of Object.entries(famousSitesMapping || {})) {
      if (famousSitesConfig?.[site] && domains.includes(domain)) {
        return site;
      }
    }
    return null; // Not from a famous site
  };

  // if a domain is custom added
  const isCustomDomain = (domain) => {
    return customAddedDomains.includes(domain);
  };

  return (
    <div className="rules-panel">
      <div className="panel-header">
        <h2 className="panel-title">RULES ENGINE</h2>
        <p className="panel-subtitle">Manage blocking rules and site configurations</p>
      </div>

      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'custom' ? 'active' : ''}`}
          onClick={() => setActiveTab('custom')}
        >
          CURRENTLY BLOCKING DOMAINS
          <span className="domain-count">{blockedDomains.length}</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'predefined' ? 'active' : ''}`}
          onClick={() => setActiveTab('predefined')}
        >
          COMMON AD SITES
        </button>
        <button 
          className={`tab-button ${activeTab === 'famous' ? 'active' : ''}`}
          onClick={() => setActiveTab('famous')}
        >
          POPULAR PLATFORMS
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search rules..."
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="tab-content">
        {activeTab === 'custom' && (
          <div className="custom-rules-tab">
            <div className="add-site-section">
              <div className="input-row">
                <input
                  type="text"
                  value={newSite}
                  onChange={(e) => setNewSite(e.target.value)}
                  placeholder="Enter domain to block (e.g., ads.example.com)"
                  className="site-input"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSite()}
                />
                <button 
                  onClick={handleAddSite}
                  className="add-button"
                  disabled={!newSite.trim() || blockedDomains.includes(newSite.trim())}
                >
                  ADD RULE
                </button>
              </div>
            </div>

            {filteredBlockedDomains.length === 0 ? (
              <div className="empty-message">No domains currently blocked</div>
            ) : (
              <div className="sites-list">
                {filteredBlockedDomains.map(domain => {
                  const source = getDomainSource(domain);
                  const isCustom = isCustomDomain(domain);
                  
                  return (
                    <div key={domain} className={`site-row ${source ? 'from-famous' : ''}`}>
                      <span className="site-name">{domain}</span>
                      
                      {source ? (
                        <span className="source-badge">
                          FROM {source}
                        </span>
                      ) : isCustom ? (
                        <button
                          onClick={() => onRemoveCustomDomain(domain)}
                          className="remove-button"
                        >
                          REMOVE
                        </button>
                      ) : (
                        <span className="source-badge">PREDEFINED</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {filteredBlockedDomains.length > 0 && blockedDomains.length > filteredBlockedDomains.length && (
              <div className="domains-summary">
                Showing {filteredBlockedDomains.length} of {blockedDomains.length} blocked domains
              </div>
            )}
          </div>
        )}

        {activeTab === 'predefined' && (
          <div className="predefined-rules-tab">
            {filteredPredefinedSites.length === 0 ? (
              <div className="empty-message">No predefined sites available</div>
            ) : (
              <div className="predefined-sites-grid">
                {filteredPredefinedSites.map(site => (
                  <button
                    key={site}
                    onClick={() => onAddCustomSite(site)}
                    className="predefined-site-button"
                  >
                    <span>{site}</span>
                    <span className="add-icon">+</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'famous' && (
          <div className="famous-sites-tab">
            {filteredFamousSites.length === 0 ? (
              <div className="empty-message">No popular platforms found</div>
            ) : (
              <div className="famous-sites-grid">
                {filteredFamousSites.map(([site, domains]) => (
                  <div key={site} className={`famous-site-card ${famousSitesConfig?.[site] ? 'enabled' : ''}`}>
                    <div className="card-header">
                      <div className="checkbox">
                        <input
                          type="checkbox"
                          id={`site-${site}`}
                          checked={famousSitesConfig?.[site] || false}
                          onChange={() => onToggleFamousSite(site)}
                        />
                        <label className="checkbox-mark" htmlFor={`site-${site}`}></label>
                      </div>
                      <span className="site-name">{site}</span>
                      <span className={`status-badge ${famousSitesConfig?.[site] ? 'enabled' : 'disabled'}`}>
                        {famousSitesConfig?.[site] ? 'ENABLED' : 'DISABLED'}
                      </span>
                    </div>
                    
                    <div className="domains-info">
                      <div className="domains-count">Blocks {domains?.length || 0} domains</div>
                      {famousSitesConfig?.[site] && (
                        <div className="domains-list">
                          {domains.slice(0, 2).map(domain => (
                            <div key={domain} className="domain-item">{domain}</div>
                          ))}
                          {domains.length > 2 && (
                            <div className="domain-item more">+{domains.length - 2} more blocked</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default RulesPanel
