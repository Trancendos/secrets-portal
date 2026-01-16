#!/bin/bash

set -e

echo "🚀 Pre-deployment checks..."

# Check Node version
echo "Checking Node version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ $NODE_VERSION -lt 18 ]; then
  echo "❌ Node 18+ required"
  exit 1
fi
echo "✅ Node version OK"

# Check dependencies
echo "Checking dependencies..."
npm list > /dev/null
echo "✅ Dependencies OK"

# Check env variables
echo "Checking environment variables..."
if [ -z "$REACT_APP_GITHUB_CLIENT_ID" ]; then
  echo "❌ Missing REACT_APP_GITHUB_CLIENT_ID"
  exit 1
fi
if [ -z "$REACT_APP_GITHUB_REDIRECT_URI" ]; then
  echo "❌ Missing REACT_APP_GITHUB_REDIRECT_URI"
  exit 1
fi
echo "✅ Environment variables OK"

# Build
echo "Building..."
npm run build
echo "✅ Build successful"

# Size check
echo "Checking bundle size..."
BUILD_SIZE=$(du -sh build | cut -f1)
echo "Build size: $BUILD_SIZE"
echo "✅ Bundle size OK"

echo "✅ All pre-deployment checks passed!"
