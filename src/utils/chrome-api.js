export const chromeAPI = {
  storage: {
    get: (keys) => chrome.storage.local.get(keys),
    set: (data) => chrome.storage.local.set(data)
  },
  
  declarativeNetRequest: {
    updateEnabledRulesets: (options) => chrome.declarativeNetRequest.updateEnabledRulesets(options),
    getEnabledRulesets: () => chrome.declarativeNetRequest.getEnabledRulesets()
  },
  
  runtime: {
    openOptionsPage: () => chrome.runtime.openOptionsPage()
  }
}