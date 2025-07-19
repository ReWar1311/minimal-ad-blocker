import React, { useState } from 'react'
import { useExtensionState } from '@hooks/useExtensionState'
import { useCustomRules } from '@hooks/useCustomRules'
import Sidebar from './Sidebar'
import DashboardPanel from './DashboardPanel'
import RulesPanel from './RulesPanel'
import SettingsPanel from './SettingsPanel'

const OptionsApp = () => {
  const [activePanel, setActivePanel] = useState('dashboard')
  const { isBlocking, blockedCount, toggleBlocking, resetStats } = useExtensionState()
  const {
    customAdSites,
    blockedDomains,
    famousSitesConfig,
    whitelistSites,
    loading: rulesLoading,
    error: rulesError,
    addCustomAdSite,
    removeCustomAdSite,
    toggleFamousSite,
    addWhitelistSite,
    removeWhitelistSite,
    resetToDefaults,
    predefinedAdSites,
    famousSitesMapping
  } = useCustomRules()

  if (rulesLoading) {
    return (
      <div className="options-loader">
        <div className="loader-content">
          <div className="loader-spinner"></div>
          <h2>LOADING SHIELD</h2>
          <p>Initializing security protocols...</p>
        </div>
      </div>
    )
  }

  const renderPanel = () => {
    switch (activePanel) {
      case 'dashboard':
        return <DashboardPanel 
          isBlocking={isBlocking} 
          blockedCount={blockedCount}
          blockedDomains={blockedDomains}
          whitelistSites={whitelistSites}
          famousSitesConfig={famousSitesConfig}
        />
      case 'rules':
        return <RulesPanel 
          blockedDomains={blockedDomains}
          customAddedDomains={customAdSites}
          famousSitesConfig={famousSitesConfig}
          famousSitesMapping={famousSitesMapping}
          predefinedAdSites={predefinedAdSites}
          onAddCustomDomain={addCustomAdSite}
          onRemoveCustomDomain={removeCustomAdSite}
          onToggleFamousSite={toggleFamousSite}
        />
      case 'settings':
        return <SettingsPanel 
          onResetStats={resetStats}
          onResetRules={resetToDefaults}
          isBlocking={isBlocking}
          onToggleBlocking={toggleBlocking}
        />
      default:
        return <DashboardPanel 
          isBlocking={isBlocking}
          blockedCount={blockedCount}
          blockedDomains={blockedDomains}
          whitelistSites={whitelistSites}
          famousSitesConfig={famousSitesConfig}
        />
    }
  }

  return (
    <div className="options-app">
      <div className="app-header">
        <div className="header-brand">
          <div className="header-logo">⚡</div>
          <div className="header-title">SHIELD CONTROL CENTER</div>
        </div>
        <div className="header-status">
          <div className={`status-indicator ${isBlocking ? 'active' : 'inactive'}`}>
            <div className="status-dot"></div>
            <span>{isBlocking ? 'PROTECTED' : 'UNPROTECTED'}</span>
          </div>
        </div>
      </div>

      <div className="app-layout">
        <Sidebar 
          activePanel={activePanel} 
          onPanelChange={setActivePanel}
          stats={{
            blocked: blockedCount,
            rules: blockedDomains?.length || 0,
            whitelisted: whitelistSites?.length || 0
          }}
        />
        
        <div className="main-content">
          {rulesError && (
            <div className="error-alert">
              <div className="error-icon">⚠</div>
              <div className="error-message">
                <strong>SYSTEM ERROR:</strong> {rulesError}
              </div>
            </div>
          )}
          
          {renderPanel()}
        </div>
      </div>
    </div>
  )
}

export default OptionsApp