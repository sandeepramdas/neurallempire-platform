# ⚡ Quick Setup Guide - Do This Now!

I've opened two browser tabs for you:

## 1. Cloudflare Pages - Custom Domain ✅
**Tab:** https://dash.cloudflare.com/.../neurallempire-hub/domains

### Steps:
1. Click **"Set up a custom domain"** button
2. Enter: `www.neurallempire.com`
3. Click **"Continue"**
4. Cloudflare will auto-configure DNS (domain should already be in your account)
5. Wait 2-3 minutes for SSL certificate provisioning
6. Done! ✅

---

## 2. Supabase - Central Auth Database 🔐
**Tab:** https://supabase.com/dashboard/new

### Steps:
1. Click **"New Project"**
2. **Name:** `neurallempire-central`
3. **Database Password:** Generate a strong password (save it!)
4. **Region:** Select `South Asia (Mumbai)` - closest to India
5. **Pricing Plan:** Free (for now, upgrade later)
6. Click **"Create new project"**
7. Wait ~2 minutes for database provisioning

### After Creation:
1. Go to **Settings** → **API**
2. Copy these values:

```
Project URL: https://xxxxx.supabase.co
anon/public key: eyJhbGc...
service_role key: eyJhbGc... (keep secret!)
```

3. Add to `/Users/sandeepramdaz/neurallempire-platform/.env`:

```env
# Central Supabase (Auth & Billing)
SUPABASE_CENTRAL_URL=https://xxxxx.supabase.co
SUPABASE_CENTRAL_ANON_KEY=eyJhbGc...
SUPABASE_CENTRAL_SERVICE_KEY=eyJhbGc...

# Database direct connection
DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

4. Go to **SQL Editor**
5. Run this schema:

```sql
-- Organizations
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product Access
CREATE TABLE product_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  product_slug TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, organization_id, product_slug)
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  product_slug TEXT NOT NULL,
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  plan TEXT NOT NULL CHECK (plan IN ('free', 'starter', 'pro', 'enterprise')),
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  trial_ends_at TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for organizations
CREATE POLICY "Users can view their organizations"
  ON organizations FOR SELECT
  USING (
    owner_id = auth.uid() OR
    id IN (
      SELECT organization_id FROM product_access
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create organizations"
  ON organizations FOR INSERT
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Owners can update their organizations"
  ON organizations FOR UPDATE
  USING (owner_id = auth.uid());

-- RLS Policies for product_access
CREATE POLICY "Users can view their product access"
  ON product_access FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Organization owners can manage access"
  ON product_access FOR ALL
  USING (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  );

-- RLS Policies for subscriptions
CREATE POLICY "Organization members can view subscriptions"
  ON subscriptions FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM product_access
      WHERE user_id = auth.uid()
    )
  );

-- Indexes for performance
CREATE INDEX idx_product_access_user ON product_access(user_id);
CREATE INDEX idx_product_access_org ON product_access(organization_id);
CREATE INDEX idx_subscriptions_org ON subscriptions(organization_id);
CREATE INDEX idx_subscriptions_stripe ON subscriptions(stripe_subscription_id);
```

6. Done! ✅

---

## 3. Update Environment Variables

Create `/Users/sandeepramdaz/neurallempire-platform/.env`:

```env
# === CENTRAL SUPABASE (Auth & Billing) ===
SUPABASE_CENTRAL_URL=https://your-project.supabase.co
SUPABASE_CENTRAL_ANON_KEY=your-anon-key
SUPABASE_CENTRAL_SERVICE_KEY=your-service-role-key
DATABASE_URL=your-database-url

# === JWT ===
JWT_SECRET=generate-a-random-secret-here

# === RAILWAY ===
# Will add after Railway setup

# === STRIPE ===
# Will add when setting up billing
```

---

## What I'm Doing Now

While you set those up, I'm creating:

1. ✅ Auth package structure (`packages/auth/`)
2. ✅ Database package (`packages/database/`)
3. ✅ Prisma schema for central database
4. ✅ Basic auth utilities

---

## After You're Done

Come back and tell me:
1. ✅ Custom domain configured
2. ✅ Supabase project created
3. ✅ Environment variables added

Then I'll help you:
- Test the auth database
- Deploy a backend service to Railway
- Start migrating VendorNet

---

## Need Help?

If you get stuck on any step, just let me know which one and I'll guide you through it!

**Let's do this! 🚀**
