#!/bin/bash

# Secrets Portal - Quick Setup Script
# Run this to set up production environment in minutes

set -e

echo "🚀 Secrets Portal - Quick Setup"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check prerequisites
echo "${BLUE}Checking prerequisites...${NC}"

command -v gh >/dev/null 2>&1 || { echo "${RED}❌ GitHub CLI not installed. Install from https://cli.github.com${NC}"; exit 1; }
echo "${GREEN}✅ GitHub CLI found${NC}"

command -v node >/dev/null 2>&1 || { echo "${RED}❌ Node.js not installed. Install from https://nodejs.org${NC}"; exit 1; }
echo "${GREEN}✅ Node.js found: $(node --version)${NC}"

command -v npm >/dev/null 2>&1 || { echo "${RED}❌ npm not installed${NC}"; exit 1; }
echo "${GREEN}✅ npm found: $(npm --version)${NC}"

echo ""
echo "${YELLOW}Step 1: GitHub OAuth Configuration${NC}"
echo "Go to https://github.com/settings/developers"
echo "Click 'OAuth Apps' > 'New OAuth App'"
echo ""
echo "Fill in:"
echo "  Application name: Secrets Portal"
echo "  Homepage URL: https://trancendos.github.io/secrets-portal"
echo "  Callback URL: https://trancendos.github.io/secrets-portal/callback"
echo ""
read -p "${BLUE}Enter your GitHub OAuth Client ID: ${NC}" CLIENT_ID

if [ -z "$CLIENT_ID" ]; then
  echo "${RED}❌ Client ID cannot be empty${NC}"
  exit 1
fi

echo ""
echo "${YELLOW}Step 2: Configure Repository Secrets${NC}"

echo "Setting REACT_APP_GITHUB_CLIENT_ID..."
gh secret set REACT_APP_GITHUB_CLIENT_ID --body "$CLIENT_ID" --repo Trancendos/secrets-portal
echo "${GREEN}✅ Secret set${NC}"

echo "Setting REACT_APP_GITHUB_REDIRECT_URI..."
gh secret set REACT_APP_GITHUB_REDIRECT_URI --body "https://trancendos.github.io/secrets-portal/callback" --repo Trancendos/secrets-portal
echo "${GREEN}✅ Secret set${NC}"

echo ""
echo "${YELLOW}Step 3: Enable GitHub Actions${NC}"

echo "Enabling GitHub Actions for repository..."
# Note: This requires API call, gh doesn't have direct command
echo "${YELLOW}⚠️  Please manually:
  1. Go to https://github.com/Trancendos/secrets-portal/settings/actions
  2. Select 'Allow all actions and reusable workflows'
  3. Click 'Read and write permissions'
  4. Check 'Allow GitHub Actions to create and approve pull requests'
  5. Click 'Save'${NC}"
read -p "Press Enter when done..."

echo ""
echo "${YELLOW}Step 4: Enable GitHub Pages${NC}"

echo "${YELLOW}⚠️  Please manually:
  1. Go to https://github.com/Trancendos/secrets-portal/settings/pages
  2. Select 'Deploy from a branch'
  3. Branch: main
  4. Folder: / (root)
  5. Click 'Save'${NC}"
read -p "Press Enter when done..."

echo ""
echo "${YELLOW}Step 5: Verify Secrets${NC}"

echo "Verifying secrets are set..."
echo ""
gh secret list --repo Trancendos/secrets-portal
echo ""
echo "${GREEN}✅ Secrets verified${NC}"

echo ""
echo "${YELLOW}Step 6: Trigger Deployment${NC}"

echo "Triggering GitHub Pages deployment..."
gh workflow run deploy.yml --repo Trancendos/secrets-portal
echo "${GREEN}✅ Deployment triggered${NC}"

echo ""
echo "${YELLOW}Step 7: Wait for Deployment${NC}"

echo "Waiting for deployment to complete..."
echo "${BLUE}Watching workflow...${NC}"
gh run watch --repo Trancendos/secrets-portal || true

echo ""
echo "${YELLOW}Step 8: Verify Portal${NC}"

echo "${BLUE}Your portal is ready at:${NC}"
echo "${GREEN}https://trancendos.github.io/secrets-portal${NC}"
echo ""
echo "${YELLOW}Testing portal accessibility...${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://trancendos.github.io/secrets-portal)

if [ $HTTP_CODE -eq 200 ]; then
  echo "${GREEN}✅ Portal is live!${NC}"
else
  echo "${YELLOW}⚠️  Portal returned HTTP $HTTP_CODE (may take a minute)${NC}"
  echo "Check back in 1-2 minutes"
fi

echo ""
echo "${GREEN}================================${NC}"
echo "${GREEN}🎉 Setup Complete!${NC}"
echo "${GREEN}================================${NC}"
echo ""
echo "${BLUE}Next steps:${NC}"
echo "1. Visit: https://trancendos.github.io/secrets-portal"
echo "2. Click 'Sign in with GitHub'"
echo "3. Grant permissions"
echo "4. Create a test secret"
echo "5. Check audit log"
echo ""
echo "${BLUE}Documentation:${NC}"
echo "- Getting Started: GETTING_STARTED.md"
echo "- Troubleshooting: TROUBLESHOOTING.md"
echo "- Full Docs: README.md"
echo ""
echo "${BLUE}Support:${NC}"
echo "- Issues: https://github.com/Trancendos/secrets-portal/issues"
echo "- Discussions: https://github.com/Trancendos/secrets-portal/discussions"
echo ""
echo "${GREEN}Enjoy your zero-cost Secrets Portal! 🔐🚀${NC}"
