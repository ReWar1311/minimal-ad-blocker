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
    'youtube.com/api/stats',
    'google-analytics.com',
    'googletagservices.com',
    'ggpht.com/api/stats',
    'youtube.com/pagead',
    'youtube.com/ptracking'
  ],
  'jiohotstar.com': [ 
      "hesads.akamaized.net",
  ],

  'facebook.com': [
    'facebook.com/tr',
    'connect.facebook.net',
    'facebook.com/plugins',
    'facebook.com/ajax/bz',
    'pixel.facebook.com',
    'an.facebook.com',
    'graph.facebook.com/logging_client_events',
    'business.facebook.com/pixel'
  ],
  'twitter.com': [
    'ads-twitter.com',
    'analytics.twitter.com',
    'twitter.com/i/jot',
    'static.ads-twitter.com',
    'syndication.twitter.com',
    'platform.twitter.com/widgets',
    'scribe.twitter.com'
  ],
  'instagram.com': [
    'facebook.com/tr',
    'connect.facebook.net',
    'instagram.com/logging',
    'graph.instagram.com/logging_client_events',
    'instagram.com/ajax/bz',
    'instagram.com/api/v1/ads'
  ],
  'reddit.com': [
    'redditmedia.com/ads',
    'redditstatic.com/ads',
    'reddit.com/api/v1/gold',
    'alb.reddit.com',
    'events.reddit.com',
    'reddit.com/api/share_tracking',
    'pixels.reddit.com'
  ],
  'tiktok.com': [
    'tiktok.com/api/ad',
    'byteoversea.com',
    'musical.ly',
    'ads-api.tiktok.com',
    'analytics-sg.tiktok.com',
    'business-api.tiktok.com',
    'log.byteoversea.com'
  ],
  'amazon.com': [
    'amazon-adsystem.com',
    'advertising-api.amazon.com',
    'adtago.s3.amazonaws.com',
    'aax.amazon-adsystem.com',
    'cdn.amazon-adsystem.com',
    'fls-na.amazon.com',
    'aax-us-east.amazon-adsystem.com'
  ],
  'netflix.com': [
    'netflix.com/tracking',
    'netflix.com/ichnaea',
    'prodaa.netflix.com',
    'beacon.netflix.com',
    'nrdp.prod.ftl.netflix.com'
  ],
  'spotify.com': [
    'spclient.wg.spotify.com/ad-logic',
    'spotify.com/adstudio',
    'spotify.com/api/tracking',
    'audio-ak.spotify.com/audio-akp',
    'scdn.co/ads'
  ],
  'twitch.tv': [
    'alb.twitch.tv',
    'analytics.twitch.tv',
    'science.twitch.tv',
    'aws.amazon.com/cloudfront/ravenjs',
    'api.mixpanel.com'
  ],
  'linkedin.com': [
    'px.ads.linkedin.com',
    'platform.linkedin.com/litms',
    'platform.linkedin.com/js/analytics',
    'linkedin.com/scds/common/u/lib/analytics',
    'linkedin.com/pixel'
  ],
  'pinterest.com': [
    'analytics.pinterest.com',
    'ct.pinterest.com',
    's.pinimg.com/ct',
    'log.pinterest.com',
    'ads.pinterest.com'
  ],
  'google.com': [
    'google-analytics.com',
    'googleadservices.com',
    'googlesyndication.com',
    'adservice.google.com',
    'googletagmanager.com',
    'doubleclick.net',
    'googletagservices.com'
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
  'sharethis.com',
  'criteo.com',
  'criteo.net',
  'adnxs.com',
  'pubmatic.com',
  'rubiconproject.com',
  'ads.linkedin.com',
  'pixel.adsafeprotected.com',
  'bat.bing.com',
  'cdn.krxd.net',
  'analytics.twitter.com',
  'ads.tiktok.com',
  'clarity.ms',
  'segment.com',
  'hotjar.com',
  'amplitude.com',
  'siteintercept.qualtrics.com',
  'app-measurement.com',
  'appsflyer.com',
  'moatads.com',
  'smartadserver.com',
  'adcolony.com',
  'bidswitch.net'
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
  '*://googleadservices.com/*',
  '*://**/ad-exchange/*',
  '*://**/adserver/*',
  '*://**/metrics/*',
  '*://**/pixel/*',
  '*://**/beacon/*',
  '*://**/targeting/*',
  '*://pixel.*/*',
  '*://analytics.*/*',
  '*://tracker.*/*',
  '*://ads.*/*'
]