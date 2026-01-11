# Deployment Guide - AI Systems Architect Website

## 🎯 Pre-Deployment Checklist

Before deploying to production, ensure you have:

- [x] Built the site successfully (`npm run build`)
- [ ] PostgreSQL database (local or cloud)
- [ ] Environment variables configured
- [ ] Domain name purchased
- [ ] Hosting account (Vercel recommended)

---

## 📋 Step-by-Step Deployment

### Option 1: Deploy to Vercel (Recommended - Free Tier)

Vercel is the creator of Next.js and offers the best integration with zero configuration.

#### 1. Create PostgreSQL Database

**Option A: Railway (Recommended - Free Tier)**
```bash
# 1. Go to https://railway.app
# 2. Sign up with GitHub
# 3. Click "New Project" > "Provision PostgreSQL"
# 4. Copy the DATABASE_URL from the Connect tab
```

**Option B: Supabase (Free Tier)**
```bash
# 1. Go to https://supabase.com
# 2. Create a new project
# 3. Go to Settings > Database
# 4. Copy the Connection String (Session mode)
```

**Option C: Neon (Free Tier)**
```bash
# 1. Go to https://neon.tech
# 2. Create a new project
# 3. Copy the connection string
```

#### 2. Push Code to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: AI Systems website"

# Create GitHub repository at https://github.com/new
# Then push your code
git remote add origin https://github.com/YOUR_USERNAME/ai-systems-website.git
git branch -M main
git push -u origin main
```

#### 3. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: ai-systems-website
# - Directory: ./
# - Override settings? No
```

Or deploy via Vercel Dashboard:
1. Go to https://vercel.com
2. Click "Add New" > "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js

#### 4. Configure Environment Variables in Vercel

In Vercel Dashboard > Your Project > Settings > Environment Variables, add:

```env
DATABASE_URL=your-postgresql-connection-string-here
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=run-this-command: openssl rand -base64 32
ADMIN_EMAIL=your-email@example.com
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=AI Systems Architect
```

#### 5. Run Database Migrations

```bash
# Connect to your deployed database
DATABASE_URL="your-production-database-url" npx prisma migrate deploy

# Or use Vercel CLI
vercel env pull .env.production
npx prisma migrate deploy
```

#### 6. Custom Domain (Optional)

In Vercel Dashboard > Your Project > Settings > Domains:
1. Click "Add Domain"
2. Enter your domain (e.g., aisystems.com)
3. Follow DNS configuration instructions
4. Update environment variables with new domain

---

### Option 2: Deploy to Railway (Alternative)

#### 1. Install Railway CLI

```bash
npm i -g @railway/cli
railway login
```

#### 2. Create New Project

```bash
railway init
```

#### 3. Add PostgreSQL Database

```bash
railway add --database postgres
```

#### 4. Set Environment Variables

```bash
railway variables set NEXTAUTH_URL=https://your-railway-domain.up.railway.app
railway variables set NEXTAUTH_SECRET=$(openssl rand -base64 32)
railway variables set ADMIN_EMAIL=your-email@example.com
```

#### 5. Deploy

```bash
railway up
```

---

## 🗄️ Database Setup

### Run Migrations on Production Database

```bash
# Using production DATABASE_URL
npx prisma migrate deploy

# Verify migrations
npx prisma migrate status
```

### Create First Admin User (Optional)

You can manually create a user in Prisma Studio or via SQL:

```bash
# Open Prisma Studio connected to production
npx prisma studio
```

Or create via SQL:
```sql
INSERT INTO "User" (id, name, email, role, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'Your Name',
  'your-email@example.com',
  'ADMIN',
  NOW(),
  NOW()
);
```

---

## 🔐 Environment Variables Reference

### Required Variables

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Authentication
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Site Configuration
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
NEXT_PUBLIC_SITE_NAME="AI Systems Architect"
ADMIN_EMAIL="your-email@example.com"
```

### Optional Variables (for future features)

```env
# Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# GitHub OAuth
GITHUB_ID=""
GITHUB_SECRET=""

# Email (for contact form notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

---

## 🎨 Post-Deployment Customization

### 1. Update Site Content

Edit these files with your information:
- `app/layout.tsx` - Site metadata and SEO
- `components/footer.tsx` - Social links, contact info
- `app/about/page.tsx` - Your bio, experience, photos
- `.env.local` and `.env.production` - Configuration

### 2. Add Your Photos

Replace placeholders in:
- `public/` folder - Add your professional photo
- `app/about/page.tsx` - Update image references

### 3. Update Social Links

In `components/footer.tsx`:
```tsx
const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/in/yourprofile", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com/yourhandle", icon: Twitter },
  { name: "GitHub", href: "https://github.com/yourusername", icon: Github },
  { name: "Email", href: "mailto:your-email@example.com", icon: Mail },
]
```

### 4. Customize Colors (Optional)

In `app/globals.css`, update the color variables:
```css
--color-primary-600: #2563eb;  /* Your primary brand color */
--color-accent-500: #0ea5e9;   /* Your accent color */
```

---

## 📊 Analytics Setup

### Google Analytics 4

1. Create GA4 property at https://analytics.google.com
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add to environment variables:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Vercel Analytics (Built-in)

Already integrated! View analytics in Vercel Dashboard > Your Project > Analytics.

---

## 🔍 SEO Configuration

### Submit to Search Engines

**Google Search Console:**
1. Go to https://search.google.com/search-console
2. Add your property
3. Verify ownership
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

**Bing Webmaster Tools:**
1. Go to https://www.bing.com/webmasters
2. Add your site
3. Submit sitemap

### Update Robots.txt (Optional)

Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

---

## 🚀 Performance Optimization

### 1. Image Optimization

- Use WebP format for images
- Compress images before uploading
- Use Next.js `<Image>` component

### 2. Monitoring

- Set up Vercel Speed Insights (free)
- Monitor Core Web Vitals
- Check Lighthouse scores

### 3. Caching

Already optimized with Next.js automatic caching.

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Database Connection Issues

```bash
# Test connection
npx prisma db pull

# Check migrations
npx prisma migrate status
```

### Environment Variables Not Working

- Ensure variables are set in Vercel Dashboard
- Redeploy after changing variables
- Check variable names match exactly

---

## 📞 Support

For deployment issues:
1. Check Vercel/Railway logs
2. Review environment variables
3. Verify database connection string
4. Test locally first with production env vars

---

## 🎉 You're Live!

Once deployed:
1. ✅ Test all pages
2. ✅ Submit contact form
3. ✅ Verify navigation works
4. ✅ Test on mobile devices
5. ✅ Set up Google Analytics
6. ✅ Submit to search engines
7. ✅ Share on social media!

---

**Deployment Checklist:**
- [ ] Database created and migrations run
- [ ] Environment variables configured
- [ ] Site deployed to Vercel/Railway
- [ ] Custom domain configured (if applicable)
- [ ] Contact form tested
- [ ] Social links updated
- [ ] Analytics configured
- [ ] Submitted to Google Search Console
- [ ] Site tested on mobile
- [ ] Professional photo added

---

**Your site is now live! 🚀**

Next steps: Start creating content, customize with your information, and begin driving traffic.
