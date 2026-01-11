#!/bin/bash

echo "🚂 Railway Deployment Script for NeurallEmpire"
echo "=============================================="
echo ""

# Step 1: Login to Railway
echo "Step 1: Logging into Railway..."
echo "A browser window will open. Please login to Railway."
railway login

if [ $? -ne 0 ]; then
    echo "❌ Login failed. Please try again."
    exit 1
fi

echo "✅ Logged in successfully!"
echo ""

# Step 2: Initialize project (if not already linked)
echo "Step 2: Setting up Railway project..."
cd apps/main-site

# Check if already linked
if railway status 2>/dev/null; then
    echo "ℹ️  Project already linked to Railway"
else
    echo "Creating new Railway project..."
    railway init
fi

echo ""

# Step 3: Set environment variables
echo "Step 3: Setting environment variables..."
railway variables set NEXT_PUBLIC_SUPABASE_URL="https://ktcwakkpcgiusjuhlpjy.supabase.co"
railway variables set NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0Y3dha2twY2dpdXNqdWhscGp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMTM4ODAsImV4cCI6MjA4MzY4OTg4MH0.f_DAaUO7c7tjt8jRGgsAbo0h99UKa90GxxjPYDtYKEY"
railway variables set SUPABASE_SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0Y3dha2twY2dpdXNqdWhscGp5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODExMzg4MCwiZXhwIjoyMDgzNjg5ODgwfQ.fklJJ9R_yQXTauXvKTPzjrrQSlWSU6Etdt0PIYnqvBU"
railway variables set PORT="3000"
railway variables set NODE_ENV="production"

echo "✅ Environment variables set!"
echo ""

# Step 4: Deploy
echo "Step 4: Deploying to Railway..."
railway up

echo ""
echo "🎉 Deployment initiated!"
echo ""
echo "To check deployment status:"
echo "  railway status"
echo ""
echo "To view logs:"
echo "  railway logs"
echo ""
echo "To get your deployment URL:"
echo "  railway domain"
echo ""
