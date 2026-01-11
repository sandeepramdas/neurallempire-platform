# 🚀 Deployment Guide

The NeurallEmpire platform now uses **dynamic rendering** (SSR) for the admin dashboard and blog system. This means we can't use purely static hosting.

## ✅ Recommended Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is built by the creators of Next.js and has the best support for dynamic rendering.

**Steps:**

1. **Install Vercel CLI**:
   ```bash
   pnpm add -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd apps/main-site
   vercel
   ```

4. **Add Environment Variables** in Vercel Dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your production URL)

5. **Configure Custom Domain** (optional):
   - In Vercel Dashboard → Settings → Domains
   - Add `www.neurallempire.com`
   - Update DNS in GoDaddy with provided CNAME

**Cost**: Free tier includes:
- Unlimited deployments
- Custom domains
- SSL certificates
- Perfect for this project

---

### Option 2: Railway

Railway supports Next.js SSR and has great deployment experience.

**Steps:**

1. **Install Railway CLI** (if not already installed):
   ```bash
   npm i -g @railway/cli
   ```

2. **Login**:
   ```bash
   railway login
   ```

3. **Create New Project**:
   ```bash
   railway init
   ```

4. **Add Environment Variables**:
   ```bash
   railway variables set NEXT_PUBLIC_SUPABASE_URL=https://ktcwakkpcgiusjuhlpjy.supabase.co
   railway variables set NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   railway variables set SUPABASE_SERVICE_KEY=your_service_key
   railway variables set NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

5. **Deploy**:
   ```bash
   cd apps/main-site
   railway up
   ```

**Cost**: Free tier includes $5/month credit (enough for small sites)

---

### Option 3: Cloudflare Pages with Functions

Cloudflare Pages supports Next.js via their adapter, but requires some configuration.

**Steps:**

1. **Install Next-on-Pages**:
   ```bash
   pnpm add -D @cloudflare/next-on-pages
   ```

2. **Update package.json**:
   ```json
   {
     "scripts": {
       "pages:build": "npx @cloudflare/next-on-pages",
       "pages:deploy": "wrangler pages deploy .vercel/output/static"
     }
   }
   ```

3. **Build**:
   ```bash
   pnpm pages:build
   ```

4. **Deploy**:
   ```bash
   pnpm pages:deploy
   ```

**Note**: This option is more complex and may have limitations with some Next.js features.

---

## 🎯 Which Option Should You Choose?

| Platform | Ease of Use | Next.js Support | Cost | Best For |
|----------|-------------|-----------------|------|----------|
| **Vercel** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Free | **Recommended** |
| **Railway** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | $5/mo credit | Good alternative |
| **Cloudflare** | ⭐⭐⭐ | ⭐⭐⭐ | Free | Advanced users |

**Recommendation**: Use **Vercel** for the easiest and most reliable deployment.

---

## 🔒 Environment Variables Checklist

Before deploying, make sure you have these values:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` - From Supabase Dashboard
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - From Supabase Dashboard
- [ ] `SUPABASE_SERVICE_KEY` - From Supabase Dashboard
- [ ] `NEXT_PUBLIC_SITE_URL` - Your production domain

Get Supabase keys from:
https://supabase.com/dashboard/project/ktcwakkpcgiusjuhlpjy/settings/api

---

## 🌐 Custom Domain Setup

### For Vercel:

1. In Vercel Dashboard → Settings → Domains
2. Add `www.neurallempire.com`
3. Vercel will provide DNS records
4. Add to GoDaddy:
   - **Type**: CNAME
   - **Name**: www
   - **Value**: cname.vercel-dns.com (or provided value)

### For Railway:

1. In Railway Dashboard → Settings → Domains
2. Click "Generate Domain" or "Custom Domain"
3. Add custom domain: `www.neurallempire.com`
4. Add to GoDaddy:
   - **Type**: CNAME
   - **Name**: www
   - **Value**: Provided by Railway

---

## ✅ Post-Deployment Checklist

After deployment:

- [ ] Visit your site and verify homepage loads
- [ ] Test `/blog` - should show "No Blog Posts Yet" (until you create some)
- [ ] Test `/admin/login` - should load login page
- [ ] Create admin user in Supabase
- [ ] Login and create a test blog post
- [ ] Verify blog post appears on `/blog`
- [ ] Test reading the blog post at `/blog/[slug]`

---

## 🐛 Troubleshooting

### "Cannot find module '@/lib/supabase/server'"

Make sure you're deploying from the correct directory:
```bash
cd apps/main-site
vercel
```

### "Environment variables not found"

Add them in your platform's dashboard:
- **Vercel**: Settings → Environment Variables
- **Railway**: Variables tab
- **Cloudflare**: Settings → Environment Variables

### Build fails with "output: export not supported"

This is expected! We removed static export to enable the admin dashboard.

---

## 📊 What Changed from Static Export?

**Before**:
- `next.config.js` had `output: 'export'`
- Could deploy to Cloudflare Pages as static site
- Admin dashboard didn't work (cookies error)

**After**:
- Removed `output: 'export'`
- Requires SSR-capable platform (Vercel/Railway)
- Admin dashboard fully functional
- Blog system works perfectly

**Why?**: The admin authentication system needs server-side cookie handling, which isn't possible with pure static export.

---

## 🎉 Ready to Deploy!

Recommended quick start:

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
cd apps/main-site
vercel

# Follow the prompts and you're live!
```

Then add your environment variables in the Vercel dashboard and redeploy.

---

**Questions?** Check the Vercel docs: https://vercel.com/docs/frameworks/nextjs
