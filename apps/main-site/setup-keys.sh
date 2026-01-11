#!/bin/bash

echo "🔑 NeurallEmpire - Add Supabase API Keys"
echo "========================================"
echo ""
echo "The Supabase API settings page should be open in your browser."
echo "If not, go to: https://supabase.com/dashboard/project/ktcwakkpcgiusjuhlpjy/settings/api"
echo ""
echo "Copy both keys and paste them below:"
echo ""

# Read ANON KEY
echo -n "📋 Paste your ANON KEY (anon public): "
read ANON_KEY

echo ""
echo -n "🔐 Paste your SERVICE_ROLE KEY: "
read SERVICE_KEY

echo ""
echo "💾 Saving keys to .env.local..."

# Create .env.local with the keys
cat > /Users/sandeepramdaz/neurallempire-platform/apps/main-site/.env.local << EOF
# Supabase CMS Database
NEXT_PUBLIC_SUPABASE_URL=https://ktcwakkpcgiusjuhlpjy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=${ANON_KEY}
SUPABASE_SERVICE_KEY=${SERVICE_KEY}

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOF

echo ""
echo "✅ Keys saved successfully!"
echo ""
echo "🔄 Now restart your dev server:"
echo "   Press Ctrl+C to stop the current server"
echo "   Then run: pnpm dev"
echo ""
echo "🎉 Your site will then work with the database!"
