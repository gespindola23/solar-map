# ✅ Deployment Checklist

Print this out or keep it open while you deploy!

## Pre-Deployment

- [ ] Mapbox account created
- [ ] Mapbox token copied (starts with `pk.`)
- [ ] Google Sheet is publicly accessible
- [ ] Found GID for PM_DATABASE_CT tab
- [ ] Verified column AN (ENTERINSSUB) has data

## Local Setup

- [ ] Downloaded/cloned project
- [ ] Ran `npm install`
- [ ] Created `.env.local` from `.env.local.example`
- [ ] Added all 4 environment variables
- [ ] Ran `npm run dev`
- [ ] Opened http://localhost:3000
- [ ] Map loads without errors
- [ ] Pins appear on map
- [ ] Filters work (state/city)
- [ ] Counter shows correct number
- [ ] Tested on mobile view (Chrome DevTools)

## Vercel Deployment

- [ ] Code pushed to GitHub (or ready for CLI)
- [ ] Logged into Vercel
- [ ] Created new project
- [ ] Connected GitHub repo (or used CLI)
- [ ] Added environment variables:
  - [ ] NEXT_PUBLIC_MAPBOX_TOKEN
  - [ ] NEXT_PUBLIC_SHEET_ID
  - [ ] NEXT_PUBLIC_SHEET_GID
  - [ ] NEXT_PUBLIC_PRIVACY_OFFSET
- [ ] Deployment succeeded
- [ ] Visited deployment URL
- [ ] Map loads on production
- [ ] Pins appear correctly
- [ ] Filters work
- [ ] Tested on actual mobile device

## Website Integration

- [ ] Copied iframe embed code
- [ ] Pasted on ecoloop.us
- [ ] Map appears embedded
- [ ] Responsive on mobile
- [ ] No scroll issues
- [ ] Loading time acceptable (<3 seconds)

## Post-Deployment

- [ ] Shared with team for feedback
- [ ] Checked analytics/logs after 24 hours
- [ ] No errors in Vercel logs
- [ ] Data refreshing properly (check after 1+ hour)

## Optional Customizations

- [ ] Adjusted colors to match brand
- [ ] Changed privacy offset distance
- [ ] Modified map center/zoom
- [ ] Updated tooltips with more info
- [ ] Added custom domain

## Documentation

- [ ] Saved .env.local somewhere safe
- [ ] Documented Vercel project URL
- [ ] Noted Mapbox account credentials
- [ ] Shared access with team if needed

## Testing Scenarios

### Desktop
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Edge

### Mobile
- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] Tablet

### Functionality
- [ ] All states filter properly
- [ ] All cities filter properly
- [ ] Reset button works
- [ ] Tooltips appear on hover
- [ ] Map zoom/pan works
- [ ] Pin clicking works

## Troubleshooting Steps (If Issues)

1. Check browser console (F12) for errors
2. Verify environment variables on Vercel
3. Test Google Sheets CSV export URL directly
4. Check Vercel deployment logs
5. Review SHEETS_TROUBLESHOOTING.md
6. Clear browser cache and retry

## Success Criteria

✅ Map loads in under 3 seconds
✅ All installations show correctly
✅ Filters work smoothly
✅ Mobile experience is good
✅ No console errors
✅ Embedded properly on ecoloop.us

---

**Deployment Date:** _______________

**Vercel URL:** _______________

**Notes:** _______________
