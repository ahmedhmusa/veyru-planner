# VeyruKeyolhu Content Planner

An installable, offline-capable web app (PWA) for planning Maldives fishing content: a 30-day posting plan that builds each following month automatically, step-by-step video editing guides, trip and publish checklists, a 72-idea video bank (trending formats, Maldives culture, series and challenges, action, fish ID, gear, lifestyle, community, long videos), editing and caption ideas, a post tracker with a Sunday review, and a title, hook and caption writer.

No build step and no dependencies. It is plain HTML, CSS and JavaScript.

## Deploy to GitHub Pages

1. Create a new GitHub repository (for example `veyru-planner`).
2. Upload everything in this folder to the repository root, including the hidden `.github` folder, or push with git:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/veyru-planner.git
   git push -u origin main
   ```

3. In the repository go to **Settings > Pages** and set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and wait for "Deploy to GitHub Pages" to finish (about a minute).
5. Your app is live at `https://YOUR-USERNAME.github.io/veyru-planner/`.

Every push to `main` redeploys automatically.

## Install on your phone

- **Android (Chrome):** open the link, tap **Install** on the Today tab or use the browser menu > Install app.
- **iPhone (Safari):** open the link, tap Share, then **Add to Home Screen**.

After the first load it also opens without internet.

## Ship an update

Edit the files, then change `CACHE_VERSION` in `sw.js` (for example `v1` to `v2`) and push. Phones pick up the new version the next time the app opens online.

## Your data

Everything is stored in the browser on the device you use (`localStorage`). Nothing is sent anywhere. Data does not sync between devices, so use **Track > Backup and restore** to copy a backup to another device.

Clearing site data in the browser erases it, so copy a backup now and then.

## Run locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Service workers work on `localhost` and on HTTPS only.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | App shell and metadata |
| `styles.css` | Design tokens, light and dark themes, layout |
| `app.js` | All app logic and the idea, caption and editing data |
| `sw.js` | Offline caching |
| `manifest.webmanifest` | Install name, colors and icons |
| `icons/` | App icons (standard and maskable) |
| `.github/workflows/pages.yml` | GitHub Pages deployment |

## How the monthly plan works

- Pick your first Monday on the Today tab. A "month" is a 28-day cycle of four Monday-to-Sunday weeks with 12 posts (Tuesday, Thursday, Sunday).
- Month 1 is the starter plan. Tuesday is action or a trending format, Thursday is Maldives culture, fish ID, gear or community, and Sunday is a series episode, challenge or long video.
- When day 29 arrives, Month 2 is built automatically (and every month after that). It looks at the posts you logged in Track, finds your best-performing format by average views, repeats it in weeks 1 and 3, and fills the other slots with unused ideas from the bank. Ideas you already posted are only reused with a "film a fresh version" note.
- Finished a month early? Tap **Build next month now**. Log more stats first and tap **Rebuild from latest stats** on a month where nothing is ticked yet.
- Every slot has **Edit steps**, which opens the matching step-by-step editing guide (Big catch, Fish ID, Gear, GT, Montage, Quick tip, Long video, Thumbnail) with a tick-off list and time estimates.

## Customize

Ideas, caption templates, editing tips, the Month 1 plan and the editing guides live at the top of `app.js` in `IDEAS`, `CAPS`, `EDITS`, `MONTH1` and `GUIDES`. The generator for later months is `genMonth` in the same file. The brand colors are the CSS variables at the top of `styles.css`.
