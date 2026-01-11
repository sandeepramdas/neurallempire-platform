#!/bin/bash

echo "🚀 NeurallEmpire - Quick Environment Setup"
echo "=========================================="
echo ""
echo "Please copy your Supabase API keys from:"
echo "https://supabase.com/dashboard/project/ktcwakkpcgiusjuhlpjy/settings/api"
echo ""
echo "Press Enter when the page is open..."
read

echo ""
echo "Now, please paste the following values:"
echo ""

# Get anon key
echo -n "📋 Paste your ANON KEY (anon public): "
read ANON_KEY

# Get service role key
echo -n "🔐 Paste your SERVICE_ROLE KEY: "
read SERVICE_KEY

# Create .env.local file
cat > apps/main-site/.env.local << ENVFILE
# Supabase CMS Database
NEXT_PUBLIC_SUPABASE_URL=https://ktcwakkpcgiusjuhlpjy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=${ANON_KEY}
SUPABASE_SERVICE_KEY=${SERVICE_KEY}

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ENVFILE

echo ""
echo "✅ Environment configured successfully!"
echo "📁 Created: apps/main-site/.env.local"
echo ""
echo "🔄 Now restart your dev server:"
echo "   cd apps/main-site"
echo "   pnpm dev"
echo ""
echo "Then visit: http://localhost:3000"
echo ""
echo "Your website will now load real data from Supabase! 🎉"
