# SHE-SECURE 🛡️

A women's safety companion app — built as a web app (HTML/CSS/JS) simulating a full-featured personal safety experience: SOS alerts, live journey tracking, community safety reports, an AI safety assistant, and more.

**[Live Demo →](#deployment)** https://statuesque-daffodil-e33675.netlify.app/

---

## ✨ Features

### Core Safety
- **One-Tap SOS** — 3-second countdown SOS button with cancel window, guardian alerts, vibration feedback, and an emergency history timeline.
- **🎙️ Voice SOS (Hands-Free)** — Say *"Help me"*, *"SOS"*, *"Emergency"*, or a custom code word to trigger SOS without touching the phone.
- **📳 Shake Detection** — Shake the phone rapidly 3–5 times to start an SOS countdown, even with the screen off or out of reach.
- **🎥 Automatic Video Recording** — SOS activation auto-starts front camera + audio recording and GPS logging, with encrypted evidence "uploaded" to your Evidence Vault.
- **🗺️ Live Guardian Tracking** — When Journey Mode is active, your guardian sees a live map, auto-updating ETA, battery %, network strength, and last movement time.

### Journey & Check-ins
- **Journey Mode** — Live progress tracking to a destination with automatic "are you safe?" check-in prompts.
- **Smart Check-in** — Set a destination + reach-by time; guardians are notified automatically if you don't confirm arrival.

### Community & Awareness
- **AI Safety Score** — Real-time area risk scoring with reasons and route recommendations.
- **Community Safety Map** — Crowd-sourced incident reports (harassment, poor lighting, stalking, etc.) with anonymous reporting.
- **AI Safety Assistant** — Chat-based guidance for emergencies, legal questions, and nearby help.
- **Women's Legal Help** — Quick-reference emergency laws, rights, cyber crime info, and FIR process.

### Trust & Utility
- **Guardians** — Add trusted contacts who receive live location, SOS alerts, and check-in confirmations.
- **Fake Call** — Simulate an incoming call to defuse uncomfortable situations.
- **Safe Places & Safe Routes** — Nearby police stations, hospitals, and AI-suggested safer paths.
- **Emergency Evidence Vault** — Timeline + recorded evidence for every past SOS event.
- **Achievements & Analytics** — Gamified safety habit tracking.

---

## 📁 Project Structure

```
she-secure/
├── index.html        # Page markup only
├── css/
│   └── style.css     # All styling
├── js/
│   └── script.js      # All app logic
├── LICENSE
├── .gitignore
└── README.md
```

The code itself is unchanged from the original single-file build — it's just been split into `index.html` / `css/style.css` / `js/script.js` for readability and a cleaner repo structure.

---

## 🛠️ Tech Stack

- Vanilla HTML / CSS / JavaScript (no build step required)
- [Leaflet.js](https://leafletjs.com/) for maps
- [Font Awesome](https://fontawesome.com/) for icons
- Browser APIs: Geolocation, Web Speech API, DeviceMotion, MediaRecorder/getUserMedia, Battery Status, Network Information

> This is a front-end prototype/demo. Guardian alerts, calls, and cloud uploads are simulated in the browser (no backend) — see [Notes](#-notes--limitations) below.

---

## 🚀 Getting Started

### Run locally
No build tools needed.

```bash
git clone https://github.com/<your-username>/she-secure.git
cd she-secure
# open index.html directly in a browser, or serve it:
python3 -m http.server 8000
# visit http://localhost:8000
```

### Deployment
The easiest way to get a live link is **GitHub Pages**:

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Save — your app will be live at `https://<your-username>.github.io/she-secure/`.

---

## 🔐 Browser Permissions

Some features request browser permissions the first time they're used:

| Feature | Permission | Notes |
|---|---|---|
| Voice SOS | Microphone | Uses the Web Speech API; falls back gracefully if unsupported. |
| Shake Detection | Motion sensors | iOS 13+ requires an explicit tap to grant motion access (button appears automatically in Emergency Preferences). |
| Automatic Video Recording | Camera + Microphone | Triggered only when SOS activates. |
| Location features | Geolocation | Used for current location, safety score, and journey tracking. |

All features degrade gracefully with a toast notification if a permission is denied or an API is unsupported.

---

## ⚠️ Notes & Limitations

This project is a **front-end demo/prototype**. To make it production-ready, you'd want to add:
- A real backend for guardian notifications (SMS/push), account storage, and evidence upload
- Actual encrypted cloud storage for recorded evidence
- Real-time location sharing infrastructure (e.g., WebSockets)
- Server-side auth instead of the current localStorage-based demo login

---

## 📄 License

Released under the [MIT License](LICENSE).
