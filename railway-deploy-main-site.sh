#!/bin/bash

# 🚂 Railway Deployment Script - Main Site
# This script helps you deploy the main-site to Railway step by step

echo "════════════════════════════════════════════════════════════"
echo "🚂 NeurallEmpire Railway Deployment - Main Site"
echo "════════════════════════════════════════════════════════════"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Check if Railway CLI is installed
echo -e "${BLUE}Step 1: Checking Railway CLI...${NC}"
if ! command -v railway &> /dev/null; then
    echo -e "${YELLOW}Railway CLI not found. Installing...${NC}"
    npm install -g @railway/cli
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install Railway CLI${NC}"
        echo "Please install manually: npm install -g @railway/cli"
        exit 1
    fi
    echo -e "${GREEN}✅ Railway CLI installed${NC}"
else
    echo -e "${GREEN}✅ Railway CLI already installed${NC}"
fi
echo ""

# Step 2: Login to Railway
echo -e "${BLUE}Step 2: Logging into Railway...${NC}"
echo "A browser window will open. Please login with your Railway account."
echo ""
railway login

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Login failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Logged in successfully${NC}"
echo ""

# Step 3: Check if we're in the right directory
echo -e "${BLUE}Step 3: Verifying project structure...${NC}"
if [ ! -d "apps/main-site" ]; then
    echo -e "${RED}❌ Error: apps/main-site directory not found${NC}"
    echo "Please run this script from the neurallempire-platform root directory"
    exit 1
fi
echo -e "${GREEN}✅ Project structure verified${NC}"
echo ""

# Step 4: Initialize Railway project
echo -e "${BLUE}Step 4: Initializing Railway project...${NC}"
echo "This will create a new Railway project linked to this repository."
echo ""

railway init

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to initialize Railway project${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Railway project created${NC}"
echo ""

# Step 5: Link to the main-site service
echo -e "${BLUE}Step 5: Important Manual Configuration Required${NC}"
echo ""
echo "Please do the following in the Railway dashboard:"
echo ""
echo "  1. Go to https://railway.app/dashboard"
echo "  2. Click on your new 'neurallempire-platform' project"
echo "  3. Click on the service that was created"
echo "  4. Go to 'Settings' tab"
echo "  5. Find 'Root Directory' and set it to: ${GREEN}apps/main-site${NC}"
echo "  6. Scroll down and click 'Deploy' to trigger deployment"
echo ""
echo "  7. Go to 'Variables' tab"
echo "  8. Add these environment variables:"
echo "     ${YELLOW}NEXT_PUBLIC_SUPABASE_URL${NC}=https://ktcwakkpcgiusjuhlpjy.supabase.co"
echo "     ${YELLOW}NEXT_PUBLIC_SUPABASE_ANON_KEY${NC}=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0Y3dha2twY2dpdXNqdWhscGp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMTM4ODAsImV4cCI6MjA4MzY4OTg4MH0.f_DAaUO7c7tjt8jRGgsAbo0h99UKa90GxxjPYDtYKEY"
echo "     ${YELLOW}SUPABASE_SERVICE_KEY${NC}=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0Y3dha2twY2dpdXNqdWhscGp5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODExMzg4MCwiZXhwIjoyMDgzNjg5ODgwfQ.fklJJ9R_yQXTauXvKTPzjrrQSlWSU6Etdt0PIYnqvBU"
echo "     ${YELLOW}NODE_ENV${NC}=production"
echo ""
echo "Press Enter when you've completed these steps..."
read

# Step 6: Open Railway dashboard
echo ""
echo -e "${BLUE}Step 6: Opening Railway dashboard...${NC}"
railway open

echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Railway Setup Complete!${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo ""
echo "Next Steps:"
echo ""
echo "  1. Wait for Railway to build and deploy (5-10 minutes)"
echo "  2. Check deployment status: ${BLUE}railway status${NC}"
echo "  3. View logs: ${BLUE}railway logs${NC}"
echo "  4. Once deployed, you'll get a URL like:"
echo "     ${GREEN}https://neurallempire-main-site-production.up.railway.app${NC}"
echo ""
echo "  5. To add your custom domain (neurallempire.com):"
echo "     - Go to Settings → Domains in Railway"
echo "     - Add custom domain: neurallempire.com"
echo "     - Configure DNS in Cloudflare as shown"
echo ""
echo "For detailed instructions, see: ${BLUE}RAILWAY_SETUP_GUIDE.md${NC}"
echo ""
