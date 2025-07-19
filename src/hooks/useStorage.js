import { STORAGE_KEYS, FAMOUS_SITES_AD_MAPPING, PREDEFINED_AD_SITES } from './constants'

export const storage = {
  get: (keys) => {
    return new Promise((resolve) => {
      chrome.storage.local.get(keys, resolve)
    })
  },

  set: (data) => {
    return new Promise((resolve) => {
      chrome.storage.local.set(data, resolve)
    })
  },

  getBlockingState: async () => {
    const data = await storage.get([STORAGE_KEYS.BLOCKING_ENABLED])
    return data[STORAGE_KEYS.BLOCKING_ENABLED] !== false
  },

  setBlockingState: async (enabled) => {
    return storage.set({ [STORAGE_KEYS.BLOCKING_ENABLED]: enabled })
  },

  getBlockedCount: async () => {
    const data = await storage.get([STORAGE_KEYS.BLOCKED_COUNT])
    return data[STORAGE_KEYS.BLOCKED_COUNT] || 0
  },

  incrementBlockedCount: async () => {
    const count = await storage.getBlockedCount()
    return storage.set({ [STORAGE_KEYS.BLOCKED_COUNT]: count + 1 })
  },

  resetBlockedCount: async () => {
    return storage.set({ [STORAGE_KEYS.BLOCKED_COUNT]: 0 })
  },

  getCustomAdSites: async () => {
    const data = await storage.get([STORAGE_KEYS.CUSTOM_AD_SITES])
    return data[STORAGE_KEYS.CUSTOM_AD_SITES] || []
  },

  setCustomAdSites: async (sites) => {
    return storage.set({ [STORAGE_KEYS.CUSTOM_AD_SITES]: sites })
  },

  getFamousSitesConfig: async () => {
    const data = await storage.get([STORAGE_KEYS.FAMOUS_SITES_CONFIG])
    return data[STORAGE_KEYS.FAMOUS_SITES_CONFIG] || {}
  },

  setFamousSitesConfig: async (config) => {
    return storage.set({ [STORAGE_KEYS.FAMOUS_SITES_CONFIG]: config })
  },

  getAllBlockedSites: async () => {
    const [customSites, famousConfig] = await Promise.all([
      storage.getCustomAdSites(),
      storage.getFamousSitesConfig()
    ])

    const allSites = [...customSites]
    
    Object.entries(famousConfig).forEach(([site, enabled]) => {
      if (enabled && FAMOUS_SITES_AD_MAPPING[site]) {
        allSites.push(...FAMOUS_SITES_AD_MAPPING[site])
      }
    })

    return [...new Set(allSites)] 
  }
}