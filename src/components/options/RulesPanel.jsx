import React, { useState, useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

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
  const [newSite, setNewSite] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    addRule: false,
    blockedDomains: true,
    popularPlatforms: false,
    commonAdSites: false
  })

  // Count domains by source
  const domainStats = useMemo(() => {
    const stats = {
      custom: 0,
      predefined: 0,
      platformSpecific: 0
    }

    blockedDomains.forEach(domain => {
      if (customAddedDomains.includes(domain)) {
        stats.custom++
      } else {
        let isFromPlatform = false
        for (const [site, domains] of Object.entries(famousSitesMapping)) {
          if (famousSitesConfig[site] && domains.includes(domain)) {
            stats.platformSpecific++
            isFromPlatform = true
            break
          }
        }
        if (!isFromPlatform) {
          stats.predefined++
        }
      }
    })
    
    return stats
  }, [blockedDomains, customAddedDomains, famousSitesConfig, famousSitesMapping])

  // Chart data
  const chartData = {
    labels: ['Custom Rules', 'Platform Rules', 'Predefined Rules'],
    datasets: [
      {
        data: [domainStats.custom, domainStats.platformSpecific, domainStats.predefined],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 12
          }
        }
      }
    },
    cutout: '70%'
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Filter domains based on search and filter type
  const filteredDomains = useMemo(() => {
    return blockedDomains.filter(domain => {
      const matchesSearch = domain.toLowerCase().includes(searchTerm.toLowerCase())
      
      if (!matchesSearch) return false
      
      switch(filterType) {
        case 'custom':
          return customAddedDomains.includes(domain)
        case 'platform':
          for (const [site, domains] of Object.entries(famousSitesMapping)) {
            if (famousSitesConfig[site] && domains.includes(domain)) {
              return true
            }
          }
          return false
        case 'predefined':
          const isCustom = customAddedDomains.includes(domain)
          if (isCustom) return false
          
          let isFromPlatform = false
          for (const [site, domains] of Object.entries(famousSitesMapping)) {
            if (famousSitesConfig[site] && domains.includes(domain)) {
              isFromPlatform = true
              break
            }
          }
          return !isFromPlatform
        default:
          return true
      }
    })
  }, [blockedDomains, searchTerm, filterType, customAddedDomains, famousSitesMapping, famousSitesConfig])

  const filteredPredefinedSites = predefinedAdSites.filter(site =>
    site.toLowerCase().includes(searchTerm.toLowerCase()) && 
    !customAddedDomains.includes(site)
  )

  const filteredPlatforms = Object.entries(famousSitesMapping).filter(([site]) =>
    site.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddSite = () => {
    if (newSite.trim() && !customAddedDomains.includes(newSite.trim())) {
      onAddCustomDomain(newSite.trim())
      setNewSite('')
    }
  }

  const getDomainSource = (domain) => {
    for (const [site, domains] of Object.entries(famousSitesMapping)) {
      if (famousSitesConfig[site] && domains.includes(domain)) {
        return site
      }
    }
    return null
  }

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
    <div className="rules-panel">
      <div className="panel-header">
        <h2 className="panel-title">RULES ENGINE</h2>
        <p className="panel-subtitle">Configure and manage domain blocking rules</p>
      </div>

      {/* Overview Section */}
      <div className="rules-card">
        <div 
          className="card-header clickable"
          onClick={() => toggleSection('overview')}
        >
          <div className="header-title">
            <span className="header-icon">📊</span>
            <h3>RULES OVERVIEW</h3>
            <span className="rules-count">{blockedDomains.length} Active Rules</span>
          </div>
          <button className={`expand-button ${expandedSections.overview ? 'expanded' : ''}`}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
        </div>
        
        {expandedSections.overview && (
          <div className="card-content">
            <div className="stats-grid">
              <div className="chart-container">
                <div className="chart-wrapper">
                  <Doughnut data={chartData} options={chartOptions} />
                  <div className="chart-center-text">
                    <div className="total-count">{blockedDomains.length}</div>
                    <div className="total-label">Total Rules</div>
                  </div>
                </div>
              </div>

              <div className="stats-breakdown">
                <div className="stat-item custom">
                  <div className="stat-header">
                    <div className="stat-icon custom">🔧</div>
                    <div className="stat-title">CUSTOM RULES</div>
                  </div>
                  <div className="stat-value">{domainStats.custom}</div>
                  <div className="stat-description">User-defined blocking rules</div>
                </div>

                <div className="stat-item platform">
                  <div className="stat-header">
                    <div className="stat-icon platform">⭐</div>
                    <div className="stat-title">PLATFORM RULES</div>
                  </div>
                  <div className="stat-value">{domainStats.platformSpecific}</div>
                  <div className="stat-description">From popular site configurations</div>
                </div>

                <div className="stat-item predefined">
                  <div className="stat-header">
                    <div className="stat-icon predefined">🛡️</div>
                    <div className="stat-title">PREDEFINED RULES</div>
                  </div>
                  <div className="stat-value">{domainStats.predefined}</div>
                  <div className="stat-description">Built-in protection rules</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add New Rule */}
      <div className="rules-card">
        <div 
          className="card-header clickable"
          onClick={() => toggleSection('addRule')}
        >
          <div className="header-title">
            <span className="header-icon">➕</span>
            <h3>ADD NEW RULE</h3>
          </div>
          <button className={`expand-button ${expandedSections.addRule ? 'expanded' : ''}`}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
        </div>
        
        {expandedSections.addRule && (
          <div className="card-content">
            <div className="add-rule-form">
              <p className="form-instruction">
                Enter a domain you want to block (e.g., ads.example.com)
              </p>
              <div className="form-row">
                <input
                  type="text"
                  value={newSite}
                  onChange={(e) => setNewSite(e.target.value)}
                  placeholder="Enter domain to block"
                  className="rule-input"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSite()}
                />
                <button 
                  onClick={handleAddSite}
                  className="action-button primary"
                  disabled={!newSite.trim() || blockedDomains.includes(newSite.trim())}
                >
                  ADD RULE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Rules Section */}
      <div className="rules-card">
        <div 
          className="card-header clickable"
          onClick={() => toggleSection('blockedDomains')}
        >
          <div className="header-title">
            <span className="header-icon">🚫</span>
            <h3>ACTIVE BLOCKING RULES</h3>
            <span className="rules-count">{blockedDomains.length} Rules</span>
          </div>
          <button className={`expand-button ${expandedSections.blockedDomains ? 'expanded' : ''}`}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
        </div>
        
        {expandedSections.blockedDomains && (
          <div className="card-content">
            <div className="filter-toolbar">
              <div className="search-container">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search rules..."
                  className="search-input"
                />
                <span className="search-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                </span>
              </div>

              <div className="filter-buttons">
                <button 
                  className={`filter-button ${filterType === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterType('all')}
                >
                  All
                </button>
                <button 
                  className={`filter-button ${filterType === 'custom' ? 'active' : ''}`}
                  onClick={() => setFilterType('custom')}
                >
                  Custom
                </button>
                <button 
                  className={`filter-button ${filterType === 'platform' ? 'active' : ''}`}
                  onClick={() => setFilterType('platform')}
                >
                  Platform
                </button>
                <button 
                  className={`filter-button ${filterType === 'predefined' ? 'active' : ''}`}
                  onClick={() => setFilterType('predefined')}
                >
                  Predefined
                </button>
              </div>
            </div>

            {filteredDomains.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <p className="empty-message">No matching rules found</p>
                <p className="empty-suggestion">
                  {searchTerm ? 'Try a different search term' : 'Add your first rule using the form above'}
                </p>
              </div>
            ) : (
              <div className="domains-grid">
                {filteredDomains.map(domain => {
                  const source = getDomainSource(domain)
                  const isCustom = customAddedDomains.includes(domain)
                  let badgeClass = 'predefined'
                  let badgeText = 'PREDEFINED'
                  
                  if (isCustom) {
                    badgeClass = 'custom'
                    badgeText = 'CUSTOM'
                  } else if (source) {
                    badgeClass = 'platform'
                    badgeText = `FROM ${source.toUpperCase()}`
                  }
                  
                  return (
                    <div key={domain} className="domain-card">
                      <div className="domain-name">{domain}</div>
                      <div className="domain-footer">
                        <span className={`domain-badge ${badgeClass}`}>
                          {badgeText}
                        </span>
                        
                        {isCustom && (
                          <button
                            onClick={() => onRemoveCustomDomain(domain)}
                            className="remove-domain-button"
                            title="Remove rule"
                          >
                            REMOVE
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {filteredDomains.length > 0 && (
              <div className="result-summary">
                Showing {filteredDomains.length} of {blockedDomains.length} rules
                {filterType !== 'all' && ' • Filtered by ' + filterType}
                {searchTerm && ' • Search: "' + searchTerm + '"'}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Popular Platforms Section */}
      <div className="rules-card">
        <div 
          className="card-header clickable"
          onClick={() => toggleSection('popularPlatforms')}
        >
          <div className="header-title">
            <span className="header-icon">⭐</span>
            <h3>POPULAR PLATFORMS</h3>
            <span className="enabled-count">
              {Object.values(famousSitesConfig).filter(Boolean).length} Enabled
            </span>
          </div>
          <button className={`expand-button ${expandedSections.popularPlatforms ? 'expanded' : ''}`}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
        </div>
        
        {expandedSections.popularPlatforms && (
          <div className="card-content">
            <p className="section-description">
              Enable blocking for popular platforms to automatically block their known ad and tracking domains.
            </p>
            
            <div className="platforms-grid">
              {filteredPlatforms.map(([site, domains]) => (
                <div 
                  key={site} 
                  className={`platform-card ${famousSitesConfig[site] ? 'enabled' : ''}`}
                >
                  <div className="platform-header">
                    <span className="platform-icon">{getSiteIcon(site)}</span>
                    <div className="platform-name">{site}</div>
                    <div className="platform-toggle">
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={famousSitesConfig[site] || false}
                          onChange={() => onToggleFamousSite(site)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="platform-details">
                    <div className="platform-domains-count">
                      {domains.length} domains will be {famousSitesConfig[site] ? 'blocked' : 'unblocked'}
                    </div>
                    
                    {famousSitesConfig[site] && (
                      <div className="platform-domains">
                        <div className="domains-preview">
                          {domains.slice(0, 2).map(domain => (
                            <div key={domain} className="domain-preview-item">
                              <span className="domain-bullet">•</span>
                              {domain}
                            </div>
                          ))}
                          {domains.length > 2 && (
                            <div className="domain-preview-more">
                              +{domains.length - 2} more domains
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="platform-status">
                      <span className={`status-indicator ${famousSitesConfig[site] ? 'active' : 'inactive'}`}>
                        {famousSitesConfig[site] ? 'ENABLED' : 'DISABLED'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="rules-card">
        <div 
          className="card-header clickable"
          onClick={() => toggleSection('commonAdSites')}
        >
          <div className="header-title">
            <span className="header-icon">📋</span>
            <h3>COMMON AD SITES</h3>
            <span className="sites-count">{predefinedAdSites.length} Available</span>
          </div>
          <button className={`expand-button ${expandedSections.commonAdSites ? 'expanded' : ''}`}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
        </div>
        
        {expandedSections.commonAdSites && (
          <div className="card-content">
            <p className="section-description">
              Quickly add known advertising and tracking domains to your blocking list.
            </p>
            
            {filteredPredefinedSites.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <p className="empty-message">No matching ad sites found</p>
                <p className="empty-suggestion">
                  {searchTerm ? 'Try a different search term' : 'All common ad sites have been added'}
                </p>
              </div>
            ) : (
              <div className="adsites-grid">
                {filteredPredefinedSites.map(site => (
                  <div key={site} className="adsite-card">
                    <div className="adsite-name">{site}</div>
                    <button
                      onClick={() => onAddCustomDomain(site)}
                      className="add-adsite-button"
                      title="Add to blocking list"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {filteredPredefinedSites.length > 0 && filteredPredefinedSites.length < predefinedAdSites.length && (
              <div className="result-summary">
                Showing {filteredPredefinedSites.length} of {predefinedAdSites.length} ad sites
                {searchTerm && ' • Search: "' + searchTerm + '"'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default RulesPanel
