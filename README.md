SHECURE is a single-page, mobile-first “women safety” web app that includes onboarding (splash + login/signup), an SOS flow, risk analysis UI, guardian management, learning content, map-based safe routing, and subscription gating, all implemented in one HTML file with inline CSS and JavaScript using localStorage.​

Below is a concise README you can put as README.md (modify project name/credits as you like):

#SHECURE – Women Safety Web App​
SHECURE is a mobile-first, single-page web application designed to help women stay safe using an SOS system, AI-style risk visualization, location-based safe places, and learning resources for self-defense and safety tricks.​

Features:
​
Splash screen with animated shield icon and staged loading messages.​

Authentication flow: login and signup screens with email/phone, password validation, and a demo account fallback.​

Local persistence using localStorage for auth state, user profile, app settings, and stats.​

Main dashboard with:

AI Risk Scanner card (risk bar, percentage, message).​

Large circular SOS button with countdown and cancel flow, plus shake/tap trigger concept.​

Current location card with “Refresh Location” and geolocation usage.​

Quick actions: Fake Call, Safe Places, Safe Route (map), Guardians.​

Bottom navigation with Home, Map, Learn, Safety plus central SOS button for small screens and a floating SOS button for larger screens.​

Profile & account: profile modal, stats (SOS used, safe days, risk scans), editable profile, change password, and multiple settings modals (notifications, privacy, appearance).​

Learn & Empower section with categories (Self Defense, Safety Tricks, Learn Tricks, Videos) and card-based content, some gated as premium.​

Guardians management with free-plan guardian limit, dynamic list, and add-guardian form.​

Map modal using Leaflet and OpenStreetMap tiles for safe route navigation and safe place markers (police, hospital, pharmacy).​

Subscription system with Free, Premium with Ads, and Premium No Ads plans, affecting map access, guardian limit, and video locking.​

Theming and settings (light/dark/pink theme, notification toggles, privacy options, etc.).​

Tech Stack​
HTML5 single-page structure with multiple modals and screens.​

CSS3 for responsive, card-based, app-like UI; extensive use of gradients, shadows, and media queries for different viewport heights/widths.​

Vanilla JavaScript for app state, auth logic, SOS flow, UI interactions, settings, and integration with browser APIs.​

LocalStorage for persisting user profile, authentication state, settings, guardians, and simple stats.​

Leaflet for interactive maps and markers, using OpenStreetMap tiles.​

Font Awesome for icons and Google Fonts (Poppins) for typography.​

Getting Started​
Clone or download the project and place the HTML file  into your project folder, for example as index.html.​

Ensure you have an internet connection for the external CDNs:

Font Awesome

Google Fonts (Poppins)

Leaflet CSS/JS

OpenStreetMap tiles through Leaflet​

Open index.html directly in a modern browser, or serve it via a simple static server

The splash screen will run, then you will be taken to login or signup depending on the saved auth state.​

Usage Notes​

All data is stored locally in the browser using keys such as shesecure_authenticated, shesecure_userProfile, and shesecure_settings.​

Map-based safe routing and some learning videos are locked for the Free plan; upgrading inside the UI flips internal plan flags and unlocks features .​

SOS, map, and safe places features depend on geolocation and should be tested over HTTPS or localhost for full browser support.​

Project Status and Next Steps​
This is currently a front-end prototype focused on UX, feature exploration, and local-only state.​
Typical next enhancements include hooking authentication and profiles to a real backend, integrating SMS/call APIs for SOS and guardians, adding real AI-driven risk analysis, and wiring safe places and routes to live map/search services.
