const STORAGE_KEYS = {
  BLOCKING_ENABLED: 'blockingEnabled',
  SHOW_NOTIFICATIONS: 'showNotifications',
  BLOCKED_COUNT: 'blockedRequestsCount',
  CUSTOM_RULES: 'customRules'
}
const RULESET_IDS = {
  DEFAULT: 'ruleset_1'
}
chrome.runtime.onInstalled.addListener(async () => {
  console.log('Extension installed')
  
  try {
    await chrome.storage.local.set({
      [STORAGE_KEYS.BLOCKING_ENABLED]: true,
      [STORAGE_KEYS.BLOCKED_COUNT]: 0,
      [STORAGE_KEYS.SHOW_NOTIFICATIONS]: true
    })

    await chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: [RULESET_IDS.DEFAULT]
    })
    updateBadge(true)
  } catch (error) {
    console.error('Failed to initialize extension:', error)
  }
})

if (chrome.declarativeNetRequest?.onRuleMatchedDebug) {
  chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(async (details) => {
    if (details.rule.rulesetId === RULESET_IDS.DEFAULT) {
      try {
        const result = await chrome.storage.local.get([STORAGE_KEYS.BLOCKED_COUNT])
        const count = (result[STORAGE_KEYS.BLOCKED_COUNT] || 0) + 1
        await chrome.storage.local.set({ [STORAGE_KEYS.BLOCKED_COUNT]: count })
        
        console.log('Blocked request:', details.request.url)
      } catch (error) {
        console.error('Failed to update blocked count:', error)
      }
    }
  })
}

chrome.storage.onChanged.addListener(async (changes, namespace) => {
  if (namespace === 'local' && changes[STORAGE_KEYS.BLOCKING_ENABLED]) {
    const isEnabled = changes[STORAGE_KEYS.BLOCKING_ENABLED].newValue
    
    try {
      if (isEnabled) {
        await chrome.declarativeNetRequest.updateEnabledRulesets({
          enableRulesetIds: [RULESET_IDS.DEFAULT]
        })
      } else {
        await chrome.declarativeNetRequest.updateEnabledRulesets({
          disableRulesetIds: [RULESET_IDS.DEFAULT]
        })
      }
      updateBadge(isEnabled)
    } catch (error) {
      console.error('Failed to update rulesets:', error)
    }
  }
})

function updateBadge(isEnabled) {
  try {
    chrome.action.setBadgeText({
      text: isEnabled ? 'ON' : 'OFF'
    })
    
    chrome.action.setBadgeBackgroundColor({
      color: isEnabled ? '#10b981' : '#ef4444'
    })
  } catch (error) {
    console.error('Failed to update badge:', error)
  }
}

chrome.runtime.onStartup.addListener(async () => {
  try {
    const result = await chrome.storage.local.get([STORAGE_KEYS.BLOCKING_ENABLED])
    const isEnabled = result[STORAGE_KEYS.BLOCKING_ENABLED] !== false
    updateBadge(isEnabled)
  } catch (error) {
    console.error('Failed to handle startup:', error)
  }
})
