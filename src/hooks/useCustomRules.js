import { useState, useEffect } from 'react'
import { storage } from '@utils/storage'
import { FAMOUS_SITES_AD_MAPPING, PREDEFINED_AD_SITES } from '@utils/constants'

export const useCustomRules = () => {
  const [customAdSites, setCustomAdSites] = useState([])
  const [famousSitesConfig, setFamousSitesConfig] = useState({})
  const [blockAllDefault, setBlockAllDefault] = useState(false)
  const [whitelistSites, setWhitelistSites] = useState([])
  const [blockedDomains, setBlockedDomains] = useState([]) 
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCustomRules()
  }, [])

  const loadCustomRules = async () => {
    try {
      setError(null)
      const [sites, config, blockAll, whitelist] = await Promise.all([
        storage.getCustomAdSites(),
        storage.getFamousSitesConfig(),
        storage.getBlockAllDefault(),
        storage.getWhitelistSites()
      ])
      
      setCustomAdSites(sites)
      setFamousSitesConfig(config)
      setBlockAllDefault(blockAll)
      setWhitelistSites(whitelist)
      
      const allBlockedSites = await storage.getAllBlockedSites()
      setBlockedDomains(allBlockedSites)
    } catch (error) {
      console.error('Failed to load custom rules:', error)
      setError('Failed to load custom rules')
    } finally {
      setLoading(false)
    }
  }

  const toggleBlockAllDefault = async () => {
    try {
      const newValue = !blockAllDefault
      setBlockAllDefault(newValue)
      await storage.setBlockAllDefault(newValue)
      await updateDynamicRules()
    } catch (error) {
      console.error('Failed to toggle block all default:', error)
      setError('Failed to toggle block all default')
      setBlockAllDefault(blockAllDefault) // Revert
    }
  }

  const addWhitelistSite = async (site) => {
    try {
      const updatedSites = [...whitelistSites, site]
      setWhitelistSites(updatedSites)
      await storage.setWhitelistSites(updatedSites)
      await updateDynamicRules()
    } catch (error) {
      console.error('Failed to add whitelist site:', error)
      setError('Failed to add whitelist site')
      setWhitelistSites(whitelistSites) // Revert
    }
  }

  const removeWhitelistSite = async (site) => {
    try {
      const updatedSites = whitelistSites.filter(s => s !== site)
      setWhitelistSites(updatedSites)
      await storage.setWhitelistSites(updatedSites)
      await updateDynamicRules()
    } catch (error) {
      console.error('Failed to remove whitelist site:', error)
      setError('Failed to remove whitelist site')
      setWhitelistSites(whitelistSites) // Revert
    }
  }

  const addCustomAdSite = async (site) => {
    try {
      const updatedSites = [...customAdSites, site]
      setCustomAdSites(updatedSites)
      await storage.setCustomAdSites(updatedSites)
      await updateDynamicRules()
    } catch (error) {
      console.error('Failed to add custom ad site:', error)
      setError('Failed to add custom ad site')
      setCustomAdSites(customAdSites) // Revert
    }
  }

  const removeCustomAdSite = async (site) => {
    try {
      const updatedSites = customAdSites.filter(s => s !== site)
      setCustomAdSites(updatedSites)
      await storage.setCustomAdSites(updatedSites)
      await updateDynamicRules()
    } catch (error) {
      console.error('Failed to remove custom ad site:', error)
      setError('Failed to remove custom ad site')
      setCustomAdSites(customAdSites) // Revert
    }
  }

  const toggleFamousSite = async (site) => {
    try {
      const updatedConfig = {
        ...famousSitesConfig,
        [site]: !famousSitesConfig[site]
      }
      setFamousSitesConfig(updatedConfig)
      await storage.setFamousSitesConfig(updatedConfig)
      await updateDynamicRules()
    } catch (error) {
      console.error('Failed to toggle famous site:', error)
      setError('Failed to toggle famous site')
      setFamousSitesConfig(famousSitesConfig) // Revert
    }
  }

  const updateDynamicRules = async () => {
    if (!chrome?.declarativeNetRequest) {
      console.warn('declarativeNetRequest API not available');
      return;
    }

    try {
      const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
      const ruleIdsToRemove = existingRules.map(rule => rule.id);
      
      if (ruleIdsToRemove.length > 0) {
        await chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: ruleIdsToRemove
        });
      }

      const newRules = [];
      let ruleId = 1000;

      if (blockAllDefault) {
        const allBlockedSites = await storage.getAllBlockedSites()
        allBlockedSites.forEach(pattern => {
          newRules.push({
            id: ruleId++,
            priority: 1,
            action: { type: 'block' },
            condition: { urlFilter: pattern }
          })
        })

        whitelistSites.forEach(site => {
          newRules.push({
            id: ruleId++,
            priority: 2,
            action: { type: 'allow' },
            condition: { urlFilter: `*${site}*` }
          })
        })
      } else {
        const allBlockedSites = await storage.getAllBlockedSites()
        allBlockedSites.forEach(site => {
          newRules.push({
            id: ruleId++,
            priority: 1,
            action: { type: 'block' },
            condition: { urlFilter: `*${site}*` }
          })
        })
      }

      if (newRules.length > 0) {
        await chrome.declarativeNetRequest.updateDynamicRules({
          addRules: newRules
        });
      }
      
      const allBlockedSites = await storage.getAllBlockedSites();
      setBlockedDomains(allBlockedSites);
    } catch (error) {
      console.error('Failed to update dynamic rules:', error);
      setError('Failed to update blocking rules. Please try again.');
      throw error;
    }
  }

  const resetToDefaults = async () => {
    try {
      setCustomAdSites([])
      setFamousSitesConfig({})
      setBlockAllDefault(false)
      setWhitelistSites([])
      await Promise.all([
        storage.setCustomAdSites([]),
        storage.setFamousSitesConfig({}),
        storage.setBlockAllDefault(false),
        storage.setWhitelistSites([])
      ])
      await updateDynamicRules()
    } catch (error) {
      console.error('Failed to reset to defaults:', error)
      setError('Failed to reset to defaults')
    }
  }

  return {
    customAdSites,
    famousSitesConfig,
    blockAllDefault,
    whitelistSites,
    blockedDomains,
    loading,
    error,
    addCustomAdSite,
    removeCustomAdSite,
    toggleFamousSite,
    toggleBlockAllDefault,
    addWhitelistSite,
    removeWhitelistSite,
    resetToDefaults,
    refreshRules: loadCustomRules,
    predefinedAdSites: PREDEFINED_AD_SITES,
    famousSitesMapping: FAMOUS_SITES_AD_MAPPING
  }
}