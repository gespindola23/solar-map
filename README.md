# Solar Installations Map 🌞

Interactive map showing solar panel installations across Massachusetts, Connecticut, and Rhode Island. Built for Ecoloop.

## 🚀 Features

- **Interactive Map**: Powered by Mapbox with custom solar panel markers
- **Privacy Protection**: Automatic coordinate offsetting to protect exact addresses
- **Smart Filters**: Filter by state and city
- **Real-time Stats**: Live counter of total installations
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Auto-refresh**: Data syncs from Google Sheets hourly

## 📋 Prerequisites

1. **Mapbox Account** (Free tier is fine)
   - Go to https://account.mapbox.com/
   - Create an account
   - Get your access token from the dashboard

2. **Google Sheet Access**
   - Your sheet must be publicly accessible or "Anyone with the link can view"
   - Already configured for: `1Ls6LZCmSFFNkOhzBINVZH9TBA24a2CWpev4UstEFeok`

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Mapbox token:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbHh4eHh4eHgifQ.xxxxxxxxx
NEXT_PUBLIC_SHEET_ID=1Ls6LZCmSFFNkOhzBINVZH9TBA24a2CWpev4UstEFeok
NEXT_PUBLIC_SHEET_GID=0
NEXT_PUBLIC_PRIVACY_OFFSET=500
```

### 3. Get Your Sheet GID

The GID is the page identifier in your Google Sheet URL. For the `PM_DATABASE_CT` page:

1. Open your Google Sheet
2. Click on the `PM_DATABASE_CT` tab
3. Look at the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit#gid=123456789`
4. The number after `gid=` is your GID
5. Update `NEXT_PUBLIC_SHEET_GID` in `.env.local`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Google Sheets Data Structure

The app expects these columns in your sheet:

| Column | Name | Required | Description |
|--------|------|----------|-------------|
| D | Street Address | No | Not displayed (privacy) |
| E | City | Yes | Used in filters and tooltips |
| F | State | Yes | Used in filters |
| - | Latitude | Yes | GPS coordinate |
| - | Longitude | Yes | GPS coordinate |
| AN | ENTERINSSUB | Yes | Filter (only shows rows with values) |

**Important**: Only rows with a value in column AN (ENTERINSSUB) will be displayed on the map.

## 🚢 Deploy to Vercel

### Option 1: Via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Add environment variables:
   - `NEXT_PUBLIC_MAPBOX_TOKEN`
   - `NEXT_PUBLIC_SHEET_ID`
   - `NEXT_PUBLIC_SHEET_GID`
   - `NEXT_PUBLIC_PRIVACY_OFFSET`
6. Deploy!

### Option 2: Via Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts and add your environment variables when asked.

## 🌐 Embed on Ecoloop.us

Once deployed, embed the map on your website:

```html
<!-- Simple iframe embed -->
<iframe 
  src="https://your-map.vercel.app" 
  width="100%" 
  height="600" 
  frameborder="0"
  loading="lazy"
  title="Solar Installations Map">
</iframe>
```

### Responsive Embed (Recommended)

```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe 
    src="https://your-map.vercel.app" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    frameborder="0"
    loading="lazy"
    title="Solar Installations Map">
  </iframe>
</div>
```

### WordPress

If using WordPress, use the "Custom HTML" block and paste the iframe code above.

## 🎨 Customization

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  solar: {
    orange: '#FF6B00',  // Primary color
    yellow: '#FFA726',  // Accent
    blue: '#1E88E5',    // Buttons
  }
}
```

### Adjust Privacy Offset

In `.env.local`, change the offset distance (in meters):

```env
NEXT_PUBLIC_PRIVACY_OFFSET=800  # Increase for more privacy
```

### Change Map Center/Zoom

Edit `components/Map.tsx` line 28:

```typescript
center: [-71.8, 41.8], // [longitude, latitude]
zoom: 7.5,
```

## 🔄 Data Refresh

The app caches Google Sheets data for 1 hour. To change this, edit `lib/sheets.ts` line 34:

```typescript
next: { revalidate: 3600 } // seconds (3600 = 1 hour)
```

## 🐛 Troubleshooting

### Map not showing?
- Check that `NEXT_PUBLIC_MAPBOX_TOKEN` is set correctly
- Verify the token is a **public** token (starts with `pk.`)
- Check browser console for errors

### No pins on map?
- Verify your Google Sheet is publicly accessible
- Check that column AN (ENTERINSSUB) has values
- Ensure Latitude/Longitude columns have valid numbers
- Check browser console for data fetching errors

### Wrong page showing?
- Double-check your `NEXT_PUBLIC_SHEET_GID` matches the PM_DATABASE_CT tab
- Try the GID for different tabs if needed

### Markers in wrong location?
- This is intentional! Privacy offset adds random distance
- Adjust `NEXT_PUBLIC_PRIVACY_OFFSET` to change offset distance

## 📝 Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Yes | - | Mapbox API token |
| `NEXT_PUBLIC_SHEET_ID` | Yes | - | Google Sheets document ID |
| `NEXT_PUBLIC_SHEET_GID` | No | 0 | Sheet tab GID (page identifier) |
| `NEXT_PUBLIC_PRIVACY_OFFSET` | No | 500 | Privacy offset in meters |

## 📦 Tech Stack

- **Next.js 14** - React framework
- **Mapbox GL JS** - Interactive maps
- **Tailwind CSS** - Styling
- **PapaParse** - CSV parsing
- **TypeScript** - Type safety

## 📄 License

MIT

## 🤝 Support

Questions? Contact [your contact info]

---

Built with ☀️ for Ecoloop
