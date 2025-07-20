import { STORAGE_KEYS, FAMOUS_SITES_AD_MAPPING, PREDEFINED_AD_SITES, DEFAULT_BLOCK_PATTERNS } from './constants'

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

  getBlockAllDefault: async () => {
    const data = await storage.get([STORAGE_KEYS.BLOCK_ALL_DEFAULT])
    return data[STORAGE_KEYS.BLOCK_ALL_DEFAULT] || false
  },

  setBlockAllDefault: async (enabled) => {
    return storage.set({ [STORAGE_KEYS.BLOCK_ALL_DEFAULT]: enabled })
  },

  getWhitelistSites: async () => {
    const data = await storage.get([STORAGE_KEYS.WHITELIST_SITES])
    return data[STORAGE_KEYS.WHITELIST_SITES] || []
  },

  setWhitelistSites: async (sites) => {
    return storage.set({ [STORAGE_KEYS.WHITELIST_SITES]: sites })
  },

  getBlockedCount: async () => {
    const data = await storage.get([STORAGE_KEYS.BLOCKED_COUNT])
    return data[STORAGE_KEYS.BLOCKED_COUNT] || 0
  },

  incrementBlockedCount: async () => {
    // Get the current blocked count directly within the function
    // that will update it to avoid race conditions
    return new Promise((resolve) => {
      chrome.storage.local.get([STORAGE_KEYS.BLOCKED_COUNT], (data) => {
        const currentCount = data[STORAGE_KEYS.BLOCKED_COUNT] || 0;
        const newCount = currentCount + 1;
        chrome.storage.local.set({ [STORAGE_KEYS.BLOCKED_COUNT]: newCount }, () => {
          resolve(newCount);
        });
      });
    });
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
    const [customSites, famousConfig, blockAllDefault] = await Promise.all([
      storage.getCustomAdSites(),
      storage.getFamousSitesConfig(),
      storage.getBlockAllDefault()
    ])

    if (blockAllDefault) {
      return DEFAULT_BLOCK_PATTERNS
    }

    const allSites = [...customSites]
    
    // Add ad sites from enabled famous sites
    Object.entries(famousConfig).forEach(([site, enabled]) => {
      if (enabled && FAMOUS_SITES_AD_MAPPING[site]) {
        allSites.push(...FAMOUS_SITES_AD_MAPPING[site])
      }
    })

    return [...new Set(allSites)] // Remove duplicates
  }
}