# Shield Pro: Ad Blocker Chrome Extension
A modern, high-performance ad blocker Chrome extension built with React and Chrome's declarativeNetRequest API. Shield Pro efficiently blocks unwanted advertisements and tracking scripts across the web with minimal performance impact.

## Technical Overview
Shield Pro utilizes Chrome's Manifest V3 architecture and the declarativeNetRequest API to deliver a powerful ad-blocking solution without the performance drawbacks of traditional content-script based blockers.

### Core Technologies
- **Manifest V3:** Modern Chrome extension architecture
- **declarativeNetRequest API:** Chrome's efficient request-blocking mechanism
- **React:** UI framework for popup and options pages
- **Vite:** Build tool for fast development and optimized production builds
- **Chrome Storage API:** For persisting user settings and statistics

### Architecture
**Request Blocking Engine:**
The extension uses a rule-based approach to block network requests:
- **Static Ruleset:** Defined in rules.json for core blocking capabilities
- **Dynamic Rules:** Generated at runtime based on user configuration
- **Rule Priority System:** Ensures whitelist exceptions work correctly when needed

**Storage System:**
The storage system is built around **Chrome's Storage API with a wrapper in storage.js**:

```
// Core storage operations
get: (keys) => chrome.storage.local.get(keys)
set: (data) => chrome.storage.local.set(data)

// Specialized methods
getBlockingState()
getAllBlockedSites()
getFamousSitesConfig()
// ...and more
```
### React Component Architecture
The UI is organized into two main sections:

**Popup Interface** (src/components/popup/PopupApp.jsx)
- Simple controls for enabling/disabling protection
- Statistics display
- Link to settings page

**Options Page** (src/components/options/OptionsApp.jsx)

- Dashboard with statistics
- Rules management interface
- Settings configuration

**Custom Hooks**
The extension uses custom React hooks to manage state and business logic:

- `useExtensionState`: Manages the global blocking state and statistics
- `useCustomRules`: Handles rule configuration and management
- `useStorage`: Provides access to the storage system

## How It Works
Rule Processing Pipeline
1. **Rule Definition:** Rules are defined in JSON format with conditions and actions
2. **Rule Registration:** Rules are registered with the Chrome API at extension startup
3. **Request Interception:** Chrome's declarativeNetRequest API intercepts network requests
4. **Rule Matching:** Requests are matched against rules
5. **Action Execution:** Matching rules trigger defined actions (block, allow, modify)
6. **Counter Updates:** Blocked requests increment statistics via event listeners

**Rule Types**
Shield Pro supports several types of rules:
```
export const RULE_TYPES = {
  BLOCK: 'block',
  ALLOW: 'allow',
  MODIFY_HEADERS: 'modifyHeaders'
}
```