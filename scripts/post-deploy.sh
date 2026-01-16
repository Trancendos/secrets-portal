#!/bin/bash

set -e

echo "🌎 Post-deployment verification..."

URL="https://trancendos.github.io/secrets-portal"
echo "Testing $URL..."

# Check if site is up
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $URL)
if [ $HTTP_CODE -eq 200 ]; then
  echo "✅ Site is up (HTTP $HTTP_CODE)"
else
  echo "❌ Site returned HTTP $HTTP_CODE"
  exit 1
fi

# Check for React
if curl -s $URL | grep -q "root"; then
  echo "✅ React app loaded"
else
  echo "❌ React app not found"
  exit 1
fi

# Verify assets
echo "Verifying assets..."
curl -s -I $URL/static/ | grep -q "200\|301" && echo "✅ Assets OK" || echo "⚠️  Assets warning"

echo "✅ Deployment verification complete!"
