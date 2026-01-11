# 🚂 Railway Multi-Service Setup Guide

## Quick Start Checklist

- [ ] Create Railway account at https://railway.app
- [ ] Connect GitHub account to Railway
- [ ] Deploy first service (main-site)
- [ ] Add custom domain
- [ ] Add additional services for other apps

---

## Service Configuration Reference

### Service 1: Main Marketing Site
- **Name:** `neurallempire-main-site`
- **Root Directory:** `apps/main-site`
- **Domain:** `neurallempire.com`
- **Environment Variables:**
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://ktcwakkpcgiusjuhlpjy.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0Y3dha2twY2dpdXNqdWhscGp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMTM4ODAsImV4cCI6MjA4MzY4OTg4MH0.f_DAaUO7c7tjt8jRGgsAbo0h99UKa90GxxjPYDtYKEY
  SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0Y3dha2twY2dpdXNqdWhscGp5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODExMzg4MCwiZXhwIjoyMDgzNjg5ODgwfQ.fklJJ9R_yQXTauXvKTPzjrrQSlWSU6Etdt0PIYnqvBU
  NODE_ENV=production
  ```

### Service 2: AI Platform (when ready)
- **Name:** `neurallempire-platform`
- **Root Directory:** `apps/platform`
- **Domain:** `platform.neurallempire.com`
- **Environment Variables:** (Add when implementing)

### Service 3: Milk Delivery (when ready)
- **Name:** `neurallempire-milk`
- **Root Directory:** `apps/milkdelivery`
- **Domain:** `milk.neurallempire.com`
- **Environment Variables:** (Add when implementing)

### Service 4: Nandos (when ready)
- **Name:** `neurallempire-nandos`
- **Root Directory:** `apps/nandos`
- **Domain:** `nandos.neurallempire.com`
- **Environment Variables:** (Add when implementing)

### Service 5: Construction ERP (when ready)
- **Name:** `neurallempire-construction`
- **Root Directory:** `apps/construction`
- **Domain:** `construction.neurallempire.com`
- **Environment Variables:** (Add when implementing)

### Service 6: Realty PMS (when ready)
- **Name:** `neurallempire-realty`
- **Root Directory:** `apps/realty`
- **Domain:** `realty.neurallempire.com`
- **Environment Variables:** (Add when implementing)

### Service 7: Books (when ready)
- **Name:** `neurallempire-books`
- **Root Directory:** `apps/books`
- **Domain:** `books.neurallempire.com`
- **Environment Variables:** (Add when implementing)

### Service 8: VendorNet (when ready)
- **Name:** `neurallempire-vendornet`
- **Root Directory:** `apps/vendornet`
- **Domain:** `vendornet.neurallempire.com`
- **Environment Variables:** (Add when implementing)

### Service 9: Admin Center (when ready)
- **Name:** `neurallempire-admin`
- **Root Directory:** `apps/admin-center`
- **Domain:** `admin.neurallempire.com`
- **Environment Variables:** (Add when implementing)

---

## Step-by-Step Deployment Instructions

### Phase 1: Deploy Main Site (NOW)

1. **Go to Railway Dashboard**
   - Visit https://railway.app/dashboard
   - Click "New Project"

2. **Connect GitHub**
   - Select "Deploy from GitHub repo"
   - Authorize Railway to access your repos
   - Select `sandeepramdas/neurallempire-platform`

3. **Configure Main Site Service**
   - Railway creates a service automatically
   - Click on the service
   - Go to "Settings" tab
   - Set **Root Directory**: `apps/main-site`
   - Click "Deploy" (Railway will auto-deploy)

4. **Add Environment Variables**
   - Click "Variables" tab
   - Click "New Variable"
   - Add all variables from Service 1 config above
   - Railway will auto-redeploy

5. **Get Your Railway URL**
   - Go to "Deployments" tab
   - Click on the latest deployment
   - Copy the generated URL (e.g., `neurallempire-main-site-production.up.railway.app`)
   - Test it in your browser

6. **Add Custom Domain**
   - Go to "Settings" tab
   - Scroll to "Domains" section
   - Click "Custom Domain"
   - Enter: `neurallempire.com`
   - Railway shows DNS records

7. **Configure Cloudflare DNS**
   - Go to Cloudflare Dashboard
   - Select your domain
   - Go to "DNS" section
   - Add the CNAME record Railway provided
   - Wait 5-10 minutes for DNS propagation

### Phase 2: Deploy Additional Services (WHEN READY)

**Repeat for each app when it has code:**

1. In Railway project, click "+ New" button
2. Select "GitHub Repo"
3. Choose `sandeepramdas/neurallempire-platform` again
4. Set Root Directory to the specific app (e.g., `apps/platform`)
5. Add environment variables
6. Add custom domain (e.g., `platform.neurallempire.com`)
7. Configure Cloudflare DNS

---

## Troubleshooting

### Build Fails
**Problem:** Railway can't find files
**Solution:** Check Root Directory is correct (must be `apps/APP_NAME`)

### Environment Variables Not Working
**Problem:** App can't connect to Supabase
**Solution:** Make sure variables are in the "Variables" tab, not "Settings"

### Domain Not Working
**Problem:** Custom domain shows error
**Solution:**
1. Check DNS propagation: https://dnschecker.org
2. Make sure Cloudflare proxy (orange cloud) is OFF for Railway CNAMEs
3. Wait 10-30 minutes for SSL cert generation

### Deployment Takes Forever
**Problem:** Build stuck at "Building..."
**Solution:**
1. Check Railway status: https://status.railway.app
2. Check build logs for errors
3. Try "Restart Deployment" button

---

## Railway CLI Commands (Optional)

Install Railway CLI:
```bash
npm install -g @railway/cli
```

Useful commands:
```bash
railway login                    # Login to Railway
railway link                     # Link local folder to Railway project
railway status                   # Check deployment status
railway logs                     # View service logs
railway variables                # List environment variables
railway open                     # Open project in browser
```

---

## Next Steps After Deployment

1. ✅ Main site deployed
2. ✅ Custom domain working
3. ⏳ Monitor first week of traffic
4. ⏳ Set up Railway notifications (Slack/Discord)
5. ⏳ Configure auto-scaling if needed
6. ⏳ Deploy second service when ready

---

## Important Notes

- **Only deploy apps that have code** - Empty folders will fail
- **Each service is billed separately** - Only enable when needed
- **Railway auto-deploys on git push** - Be careful with main branch
- **Free tier available** - $5 credit/month, then pay-as-you-go
- **Logs are your friend** - Check logs if something breaks

---

## Support Resources

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Railway Status: https://status.railway.app
- Your Railway Dashboard: https://railway.app/dashboard

---

**Last Updated:** 2026-01-11
**Maintained By:** Claude Code Assistant
