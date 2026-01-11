# ⚡ DO THIS NOW - 2 Minutes to Complete Setup

## Step 1: Get Supabase API Keys (1 minute)

Open this URL in your browser:
https://supabase.com/dashboard/project/ktcwakkpcgiusjuhlpjy/settings/api

You'll see two keys:
1. **anon public** - Copy this (looks like: eyJhbGciOiJ...)
2. **service_role** - Copy this (looks like: eyJhbGciOiJ...)

## Step 2: Add Keys to .env.local (30 seconds)

Open this file in your editor:
`apps/main-site/.env.local`

Replace the empty values:
```bash
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
SUPABASE_SERVICE_KEY=paste_your_service_role_key_here
```

Save the file.

## Step 3: Restart Server (30 seconds)

In terminal:
```bash
cd /Users/sandeepramdaz/neurallempire-platform/apps/main-site
pnpm dev
```

## Step 4: Admire Your Work! (∞ minutes)

Open: http://localhost:3000

You should see:
✅ Professional website
✅ 7 products loaded from database
✅ 3 testimonials loaded from database
✅ Everything working perfectly!

---

That's it! Your enterprise website is DONE! 🎉
