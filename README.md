# April 2026 Schedule Tracker — PWA

A Progressive Web App (PWA) for tracking your daily schedule with **push notifications** at each event.

---

## 📁 Files
```
index.html    ← Main app
sw.js         ← Service worker (offline + notifications)
manifest.json ← PWA metadata for Android install
README.md     ← This file
```

---

## 🚀 Deploy to GitHub Pages (5 steps)

1. **Create a new GitHub repo** (e.g. `schedule-tracker`)
2. **Upload all 3 files** (`index.html`, `sw.js`, `manifest.json`) to the root of the repo
3. Go to **Settings → Pages**
4. Under *Source*, select **Deploy from a branch → main → / (root)**
5. Click **Save** — your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/schedule-tracker/
   ```

> ⚠️ **Important**: The service worker (`sw.js`) requires HTTPS to work.  
> GitHub Pages serves over HTTPS automatically — so you're good.

---

## 📱 Install as Android App

1. Open your GitHub Pages URL in **Chrome on Android**
2. Tap the **three-dot menu (⋮)** → **"Add to Home screen"**
3. Tap **Add** — the app icon appears on your home screen
4. Open it — it runs like a native app (no browser chrome)

---

## 🔔 Notifications

- Tap **🔔 Reminders** in the top bar → tap **Allow**
- You'll get a notification at the **start time of each slot** for today
- The service worker keeps notifications alive **even when the app is in the background**
- On subsequent days, **open the app once** to re-register that day's notifications

### Notification times (weekday example)
| Time | Event |
|------|-------|
| 4:00 AM | Morning Routine |
| 4:30 AM | GATE Study — Block 1 |
| 6:00 AM | Gym — Weights |
| 8:00 AM | Swimming |
| 9:00 AM | Shower |
| 9:30 AM | Breakfast |
| 10:00 AM | Free Time |
| 11:00 AM | Office / WFH |
| 5:00 PM | Transition + Rest |
| 6:00 PM | GATE Study — Block 2 |
| 9:00 PM | Wind Down |

---

## 🔧 Troubleshooting

| Issue | Fix |
|-------|-----|
| Notifications not showing | Android Settings → Apps → Chrome → Notifications → Allow |
| SW not registering | Make sure you're on HTTPS (GitHub Pages is fine) |
| App not installing | Use Chrome (not Firefox/Samsung Browser) for best PWA support |
| Progress lost | Don't use Incognito — data is in localStorage |
