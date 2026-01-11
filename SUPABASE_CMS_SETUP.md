# 🗄️ Supabase CMS Setup Guide

## Step 1: Create Supabase Project

1. Go to: https://supabase.com/dashboard/new/mumbai
2. **Project Name:** `neurallempire-cms`
3. **Database Password:** Choose a strong password (save it!)
4. **Region:** Mumbai (ap-south-1)
5. **Click "Create new project"**

Wait 2-3 minutes for the project to be created.

## Step 2: Run SQL Migration

Once your project is ready:

1. In Supabase Dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy the entire contents of `/packages/database/migrations/001_create_cms_tables.sql`
4. Paste into the SQL editor
5. Click **"Run"** (or press Cmd+Enter)

This will create:
- ✅ `blog_posts` table
- ✅ `case_studies` table
- ✅ `testimonials` table
- ✅ `products` table
- ✅ Row Level Security (RLS) policies
- ✅ Sample data (2 blog posts, 3 testimonials, 7 products)

## Step 3: Get API Keys

1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

## Step 4: Configure Environment Variables

Create `.env.local` in `apps/main-site/`:

```bash
# Supabase CMS Database
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_role_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Step 5: Enable Email Authentication

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. **Enable Email provider**
3. Configure:
   - ✅ Enable Email provider
   - ✅ Confirm email (recommended)
   - ✅ Disable new signups (for admin-only access)

## Step 6: Create Admin User

1. Go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - **Email:** your-admin-email@example.com
   - **Password:** Choose a strong password
   - **Auto-confirm user:** ✅ Yes
4. Click **"Create user"**

This is your admin account for managing blog posts, case studies, and testimonials.

## Step 7: Test the Connection

Run this in your terminal:

```bash
cd apps/main-site
pnpm add @supabase/supabase-js
pnpm dev
```

Visit: http://localhost:3000

The homepage should now load data from Supabase!

## Step 8: Access Admin Dashboard

Once implemented (next step), you can access:

- **Admin Login:** http://localhost:3000/admin/login
- **Admin Dashboard:** http://localhost:3000/admin

Use the email and password you created in Step 6.

## Database Schema

### Blog Posts
- Create, edit, publish blog articles
- Categories and tags
- SEO meta fields
- Featured images

### Case Studies
- Client success stories
- Industry categorization
- Results metrics (JSON)
- Featured flag

### Testimonials
- Client reviews
- 5-star ratings
- Featured testimonials for homepage

### Products
- Dynamic product catalog
- Status: live, beta, coming_soon
- Features and pricing (JSON)
- Display order

## Security Notes

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Public can only read published content
- ✅ Only authenticated users can create/edit content
- ✅ Service role key should NEVER be exposed to client
- ⚠️  Disable public signups to keep admin-only access

## Next Steps

1. Build admin dashboard UI (`/admin`)
2. Create blog post editor
3. Build case study manager
4. Create testimonial manager
5. Add image upload (Supabase Storage)
6. Deploy to production

## Useful Supabase Queries

### Check all blog posts
```sql
SELECT id, title, published, created_at FROM blog_posts ORDER BY created_at DESC;
```

### Check featured testimonials
```sql
SELECT client_name, client_company, featured FROM testimonials WHERE featured = true;
```

### View all products
```sql
SELECT name, status, "order" FROM products ORDER BY "order";
```

## Troubleshooting

**Error: relation "blog_posts" does not exist**
- Solution: Run the SQL migration again (Step 2)

**Error: permission denied**
- Solution: Check RLS policies are created
- Make sure you're logged in as admin

**Can't create user**
- Solution: Check email authentication is enabled
- Make sure you're creating user as admin in Supabase dashboard

---

Need help? Check Supabase docs: https://supabase.com/docs
