#!/bin/bash

# Script to configure GitHub branch protection with security gating
# This script uses GitHub CLI (gh) to set up required status checks

set -e

REPO="${1:-Trancendos/secrets-portal}"
BRANCH="${2:-main}"

echo "🔧 Configuring branch protection for $REPO branch: $BRANCH"
echo ""

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed"
    echo "Install it from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub"
    echo "Run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is authenticated"
echo ""

# Enable branch protection
echo "📋 Setting up branch protection rules..."

# Note: GitHub CLI doesn't have full support for all branch protection settings
# Some settings may need to be configured via the web UI
echo ""
echo "⚠️  Manual configuration required:"
echo ""
echo "1. Go to: https://github.com/$REPO/settings/branches"
echo "2. Click 'Add rule' or edit existing rule for '$BRANCH'"
echo "3. Configure the following:"
echo ""
echo "   ✅ Require a pull request before merging"
echo "   ✅ Require status checks to pass before merging"
echo "      - Select: 'security-report'"
echo "      - Select: 'dependency-scan'"
echo "      - Select: 'docker-scan'"
echo "      - Select: 'iac-scan'"
echo "      - Select: 'oauth-owasp-scan'"
echo "   ✅ Require branches to be up to date before merging"
echo "   ✅ Do not allow bypassing the above settings"
echo ""
echo "4. Scroll down and click 'Create' or 'Save changes'"
echo ""

# Try to set some basic protections via API
echo "Setting basic branch protection via API..."

# This uses the GitHub API to set branch protection
# Note: This requires admin permissions on the repository
gh api \
  --method PUT \
  -H "Accept: application/vnd.github+json" \
  "/repos/$REPO/branches/$BRANCH/protection" \
  -f required_status_checks[strict]=true \
  -f required_status_checks[contexts][]="security-report" \
  -f required_status_checks[contexts][]="dependency-scan" \
  -f required_status_checks[contexts][]="docker-scan" \
  -f required_status_checks[contexts][]="iac-scan" \
  -f required_status_checks[contexts][]="oauth-owasp-scan" \
  -f enforce_admins=true \
  -f required_pull_request_reviews[required_approving_review_count]=1 \
  -f required_pull_request_reviews[dismiss_stale_reviews]=true \
  -f restrictions=null \
  2>/dev/null || {
    echo ""
    echo "⚠️  API configuration failed (may need admin access)"
    echo "Please configure manually using the web UI as described above"
  }

echo ""
echo "✅ Branch protection configuration initiated"
echo ""
echo "🔍 Verify your settings at:"
echo "   https://github.com/$REPO/settings/branch_protection_rules"
echo ""
echo "📚 For more information, see:"
echo "   https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches"
echo ""
