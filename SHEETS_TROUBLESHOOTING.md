# 🔧 Google Sheets Troubleshooting

## How to Make Your Sheet Accessible

The app needs to read your Google Sheet. Here's how to set it up:

### Method 1: Public Access (Easiest)

1. Open your Google Sheet
2. Click **Share** (top right)
3. Click **Change to anyone with the link**
4. Set to **Viewer**
5. Click **Done**

✅ Your sheet is now accessible via the CSV export URL

### Method 2: Link Sharing

1. Open your Google Sheet
2. Click **Share** (top right)
3. Under "Get link", click **Copy link**
4. Make sure it says "Anyone with the link can view"

## Finding the Correct GID

The GID identifies which tab/page of your spreadsheet to use.

### Step-by-step:

1. Open your Google Sheet
2. Click on the **PM_DATABASE_CT** tab (at the bottom)
3. Look at your browser's URL bar
4. Find the part that says `gid=` followed by numbers

**Example URL:**
```
https://docs.google.com/spreadsheets/d/1Ls6LZCmSFFNkOhzBINVZH9TBA24a2CWpev4UstEFeok/edit#gid=1234567890
                                                                                                    ^^^^^^^^^^
                                                                                                    This is your GID!
```

### If you can't find `gid=` in the URL:

- You're probably on the first sheet (default)
- Try using `gid=0`
- Or click on different tabs to see the gid change

## Testing Your Sheet Access

Test if your sheet is accessible:

1. Open this URL in your browser (replace SHEET_ID and GID):

```
https://docs.google.com/spreadsheets/d/SHEET_ID/export?format=csv&gid=GID
```

For your sheet:
```
https://docs.google.com/spreadsheets/d/1Ls6LZCmSFFNkOhzBINVZH9TBA24a2CWpev4UstEFeok/export?format=csv&gid=YOUR_GID
```

2. You should see a download or CSV text appear
3. If you get "Permission denied" → Sheet is not public
4. If you see CSV data → ✅ Configuration is correct!

## Common Sheet Issues

### Issue: No pins showing on map

**Possible causes:**

1. **Column AN (ENTERINSSUB) is empty**
   - Solution: Only rows with values in column AN appear
   - Check that your data has values in this column

2. **Missing coordinates**
   - Solution: Check that Latitude and Longitude columns have valid numbers
   - Format should be: `41.8240` not `41° 49' 26.4" N`

3. **Wrong GID**
   - Solution: You might be looking at the wrong sheet tab
   - Verify you're using the GID for **PM_DATABASE_CT**

### Issue: Only some pins showing

- Check which rows have empty ENTERINSSUB (column AN)
- Those rows are filtered out intentionally

### Issue: Pins in wrong location

- This is **intentional**! Privacy offset adds 300-800m random distance
- To adjust, change `NEXT_PUBLIC_PRIVACY_OFFSET` in `.env.local`

## Column Name Reference

The app expects these exact column names in your sheet:

| Column Letter | Expected Name | Must Match Exactly |
|---------------|---------------|-------------------|
| D | Street Address | ✅ |
| E | City | ✅ |
| F | State | ✅ |
| ? | Latitude | ✅ |
| ? | Longitude | ✅ |
| AN | ENTERINSSUB | ✅ |

### If column names don't match:

Edit `lib/sheets.ts` and update the column names on lines 44-53:

```typescript
address: row['Street Address'] || '',  // Change 'Street Address' to your column name
city: row['City'] || '',                // Change 'City' to your column name
state: row['State'] || '',              // Change 'State' to your column name
```

## Testing in Development

When running locally (`npm run dev`), check the browser console (F12) for errors:

**Good signs:**
```
✅ Loaded 150 installations
✅ Filtered to 45 installations
```

**Bad signs:**
```
❌ Failed to fetch data: 403
   → Sheet is not public

❌ Failed to fetch data: 404
   → Wrong Sheet ID or GID

❌ Cannot read property 'Latitude' of undefined
   → Column names don't match
```

## Still Having Issues?

1. Verify sheet is public (test the CSV export URL)
2. Double-check the GID matches PM_DATABASE_CT tab
3. Confirm column AN has values
4. Check browser console for error messages
5. Review the full README.md for additional help

## Quick Verification Checklist

- [ ] Sheet sharing is set to "Anyone with the link"
- [ ] Used correct SHEET_ID: `1Ls6LZCmSFFNkOhzBINVZH9TBA24a2CWpev4UstEFeok`
- [ ] Found GID for PM_DATABASE_CT tab
- [ ] Column AN (ENTERINSSUB) has data
- [ ] Latitude/Longitude columns exist and have numbers
- [ ] CSV export URL works in browser
