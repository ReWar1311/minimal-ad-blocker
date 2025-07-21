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

console.log('Debug mode available:', !!chrome.declarativeNetRequest?.onRuleMatchedDebug);

if (chrome.declarativeNetRequest?.onRuleMatchedDebug) {
  chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(async (details) => {
    // console.log('Rule matched:', details.rule.ruleId, 'for URL:', details.request.url);
    
    if (true) {
      try {
        // Use atomic operation to prevent race conditions
        const newCount = await new Promise((resolve) => {
          chrome.storage.local.get([STORAGE_KEYS.BLOCKED_COUNT], (result) => {
            // console.log('Current count:', result[STORAGE_KEYS.BLOCKED_COUNT]);
            const currentCount = result[STORAGE_KEYS.BLOCKED_COUNT] || 0;
            const newCount = currentCount + 1;
            chrome.storage.local.set({ [STORAGE_KEYS.BLOCKED_COUNT]: newCount }, () => {
              resolve(newCount);
            });
          });
        });
        
        // console.log('Blocked request:', details.request.url, 'Total blocked:', newCount);
        
        // Update badge with count for visual feedback
        chrome.action.setBadgeText({ text: newCount.toString() });
      } catch (error) {
        console.error('Failed to update blocked count:', error);
      }
    }
  });
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
