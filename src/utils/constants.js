export const STORAGE_KEYS = {
  BLOCKING_ENABLED: 'blockingEnabled',
  SHOW_NOTIFICATIONS: 'showNotifications',
  BLOCKED_COUNT: 'blockedRequestsCount',
  CUSTOM_RULES: 'customRules',
  CUSTOM_AD_SITES: 'customAdSites',
  FAMOUS_SITES_CONFIG: 'famousSitesConfig',
  BLOCK_ALL_DEFAULT: 'blockAllDefault',
  WHITELIST_SITES: 'whitelistSites'
}

export const RULE_TYPES = {
  BLOCK: 'block',
  ALLOW: 'allow',
  MODIFY_HEADERS: 'modifyHeaders'
}

export const RULESET_IDS = {
  DEFAULT: 'ruleset_1',
  CUSTOM: 'custom_rules',
  WHITELIST: 'whitelist_rules'
}

export const FAMOUS_SITES_AD_MAPPING = {
  'youtube.com': [
    'googlevideo.com/ptracking',
    'doubleclick.net',
    'googleadservices.com',
    'googlesyndication.com',
    'youtube.com/get_video_info',
    'youtube.com/api/stats'
  ],
  'facebook.com': [
    'facebook.com/tr',
    'connect.facebook.net',
    'facebook.com/plugins',
    'facebook.com/ajax/bz'
  ],
  'twitter.com': [
    'ads-twitter.com',
    'analytics.twitter.com',
    'twitter.com/i/jot'
  ],
  'instagram.com': [
    'facebook.com/tr',
    'connect.facebook.net',
    'instagram.com/logging'
  ],
  'reddit.com': [
    'redditmedia.com/ads',
    'redditstatic.com/ads',
    'reddit.com/api/v1/gold'
  ],
  'tiktok.com': [
    'tiktok.com/api/ad',
    'byteoversea.com',
    'musical.ly'
  ]
}

export const PREDEFINED_AD_SITES = [
  'doubleclick.net',
  'googlesyndication.com',
  'googleadservices.com',
  'amazon-adsystem.com',
  'adsystem.amazon.com',
  'facebook.com/tr',
  'connect.facebook.net',
  'ads.yahoo.com',
  'media.net',
  'outbrain.com',
  'taboola.com',
  'adsense.google.com',
  'googletagmanager.com',
  'google-analytics.com',
  'scorecardresearch.com',
  'quantserve.com',
  'addthis.com',
  'sharethis.com'
]

export const DEFAULT_BLOCK_PATTERNS = [
  '*://**/ads/*',
  '*://**/advertising/*',
  '*://**/analytics/*',
  '*://**/tracking/*',
  '*://**/telemetry/*',
  '*://googletagmanager.com/*',
  '*://google-analytics.com/*',
  '*://doubleclick.net/*',
  '*://googlesyndication.com/*',
  '*://googleadservices.com/*'
]