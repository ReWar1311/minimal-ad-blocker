import { useState, useEffect } from 'react'
import { storage } from '@utils/storage'
import { RULESET_IDS } from '@utils/constants'

export const useExtensionState = () => {
  const [isBlocking, setIsBlocking] = useState(true)
  const [blockedCount, setBlockedCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadState()
  }, [])

  const loadState = async () => {
    try {
      setError(null)
      const [blockingState, count] = await Promise.all([
        storage.getBlockingState(),
        storage.getBlockedCount()
      ])
      
      setIsBlocking(blockingState)
      setBlockedCount(count)
    } catch (error) {
      console.error('Failed to load extension state:', error)
      setError('Failed to load extension state')
    } finally {
      setLoading(false)
    }
  }

  const toggleBlocking = async () => {
    try {
      const newState = !isBlocking
      setIsBlocking(newState)
      
      await storage.setBlockingState(newState)
      
      if (chrome?.declarativeNetRequest) {
        if (newState) {
          await chrome.declarativeNetRequest.updateEnabledRulesets({
            enableRulesetIds: [RULESET_IDS.DEFAULT]
          })
        } else {
          await chrome.declarativeNetRequest.updateEnabledRulesets({
            disableRulesetIds: [RULESET_IDS.DEFAULT]
          })
        }
      }
    } catch (error) {
      console.error('Failed to toggle blocking:', error)
      setIsBlocking(!isBlocking) // Revert on error
      setError('Failed to toggle blocking')
    }
  }

  const resetStats = async () => {
    try {
      await storage.resetBlockedCount()
      setBlockedCount(0)
      setError(null)
    } catch (error) {
      console.error('Failed to reset stats:', error)
      setError('Failed to reset statistics')
    }
  }

  return {
    isBlocking,
    blockedCount,
    loading,
    error,
    toggleBlocking,
    resetStats,
    refreshState: loadState
  }
}