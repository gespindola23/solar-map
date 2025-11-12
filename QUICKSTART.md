# 🚀 Quick Start - 5 Minutes to Deploy

## Step 1: Get Mapbox Token (2 min)

1. Go to https://account.mapbox.com/
2. Sign up (free)
3. Copy your "Default public token" from the dashboard

## Step 2: Find Your Sheet GID (1 min)

1. Open https://docs.google.com/spreadsheets/d/1Ls6LZCmSFFNkOhzBINVZH9TBA24a2CWpev4UstEFeok/edit
2. Click on the **PM_DATABASE_CT** tab
3. Look at the URL - find the number after `gid=`
   - Example: `...edit#gid=123456789` → GID is `123456789`

## Step 3: Setup Project (30 sec)

```bash
cd solar-map
npm install
cp .env.local.example .env.local
```

Edit `.env.local` and paste your Mapbox token:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoieW91ciIsImEiOiJjbHh4eHgifQ.xxxxx
NEXT_PUBLIC_SHEET_ID=1Ls6LZCmSFFNkOhzBINVZH9TBA24a2CWpev4UstEFeok
NEXT_PUBLIC_SHEET_GID=YOUR_GID_HERE
NEXT_PUBLIC_PRIVACY_OFFSET=500
```

## Step 4: Test Locally (30 sec)

```bash
npm run dev
```

Open http://localhost:3000 - you should see the map!

## Step 5: Deploy to Vercel (1 min)

### Option A: GitHub (Easiest)

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Import your repo
5. Add the 4 environment variables from your `.env.local`
6. Click "Deploy"

### Option B: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow prompts, add environment variables when asked.

## Step 6: Embed on Ecoloop.us

Copy this code and paste on your site:

```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe 
    src="https://your-deployment.vercel.app" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    frameborder="0"
    loading="lazy">
  </iframe>
</div>
```

Replace `your-deployment.vercel.app` with your actual Vercel URL.

---

## ✅ Checklist

- [ ] Mapbox token obtained
- [ ] Sheet GID found
- [ ] `.env.local` configured
- [ ] Tested locally (`npm run dev`)
- [ ] Deployed to Vercel
- [ ] Environment variables added on Vercel
- [ ] Embed code added to ecoloop.us

## 🆘 Common Issues

**Map not showing?**
→ Check Mapbox token is correct (starts with `pk.`)

**No pins?**
→ Verify Sheet GID is for PM_DATABASE_CT tab
→ Check that column AN (ENTERINSSUB) has values

**Wrong location?**
→ That's the privacy offset working! (intentional)

---

**Need help?** Check the full README.md for detailed docs.
