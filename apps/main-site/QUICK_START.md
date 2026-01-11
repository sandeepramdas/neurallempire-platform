# ⚡ Quick Start - Get Your Site Running in 5 Minutes

## Step 1: Install Dependencies (if not done)

```bash
npm install
```

## Step 2: Set Up Database

### Option A: Use Railway (Easiest - Free Cloud Database)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Provision PostgreSQL"
4. Click on PostgreSQL → "Connect" tab
5. Copy the `DATABASE_URL`
6. Paste into `.env.local` (create if doesn't exist):

```env
DATABASE_URL="your-railway-connection-string-here"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="development-secret-change-in-production"
ADMIN_EMAIL="your-email@example.com"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="AI Systems Architect"
```

### Option B: Use Local PostgreSQL

```bash
# macOS
brew install postgresql@16
brew services start postgresql@16
createdb ai_systems_db

# Update .env.local
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_systems_db"
```

## Step 3: Run Database Migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

## Step 4: Start the Development Server

```bash
npm run dev
```

## Step 5: Open Your Browser

Visit: http://localhost:3000

## ✅ You're Done!

Your site is now running. You should see:
- Beautiful homepage with animations
- Working navigation
- All 6 pages accessible

---

## 🧪 Test the Contact Form

1. Go to http://localhost:3000/contact
2. Fill out the form
3. Submit
4. Open Prisma Studio to see the submission:
   ```bash
   npx prisma studio
   ```

---

## 🚀 Deploy to Production (When Ready)

```bash
# Option 1: Deploy to Vercel (Recommended)
npm i -g vercel
vercel

# Option 2: Deploy to Railway
npm i -g @railway/cli
railway login
railway init
railway up
```

See `DEPLOYMENT.md` for complete deployment guide.

---

## 📝 Customize Your Site

1. Update `app/about/page.tsx` with your bio
2. Update `components/footer.tsx` with your social links
3. Change colors in `app/globals.css` if desired
4. Add your photo to `public/` folder
5. Test contact form works

---

## ❓ Having Issues?

### Database Connection Error?
- Check your DATABASE_URL is correct
- Ensure PostgreSQL is running (if local)
- Try: `npx prisma db pull` to test connection

### Build Errors?
```bash
rm -rf .next node_modules
npm install
npm run build
```

### TypeScript Errors?
```bash
npx prisma generate
```

---

## 📚 Next Steps

1. Read `PROJECT_SUMMARY.md` for complete overview
2. Read `DEPLOYMENT.md` when ready to deploy
3. Read `README.md` for detailed documentation

---

**🎉 Enjoy your new premium website!**
