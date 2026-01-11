#!/bin/bash

echo "🌐 Cloudflare Custom Domain Setup Script"
echo "=========================================="
echo ""
echo "Opening Cloudflare Pages domains page..."
echo ""

# Open the Cloudflare Pages domains page
open "https://dash.cloudflare.com/3412fc592e6ceddce7292c41e35f91cd/pages/view/neurallempire-hub/domains"

echo "✅ Browser opened!"
echo ""
echo "📋 Follow these steps:"
echo ""
echo "1. Click the blue 'Set up a custom domain' button"
echo "2. In the input field, enter: www.neurallempire.com"
echo "3. Click 'Continue'"
echo ""
echo "Cloudflare will automatically:"
echo "  - Check if you own the domain"
echo "  - Create DNS records (CNAME: www → neurallempire-hub.pages.dev)"
echo "  - Provision SSL certificate (2-3 minutes)"
echo ""
echo "4. Wait for 'Active' status"
echo "5. Done! ✅"
echo ""
echo "The site will be live at: https://www.neurallempire.com"
echo ""
echo "Press Enter when done to verify..."
read

echo ""
echo "🔍 Verifying deployment..."
sleep 5

if curl -s -I https://www.neurallempire.com 2>&1 | grep -q "200\|301\|302"; then
    echo "✅ SUCCESS! Domain is configured and responding!"
    echo "🌐 Your site is live at: https://www.neurallempire.com"
else
    echo "⏳ Still propagating... This can take 2-5 minutes."
    echo "💡 You can check status in the Cloudflare dashboard"
fi

echo ""
echo "Done! 🎉"
