# Production Deployment Guide

## 🚀 Complete Production Setup

This guide walks you through deploying the Secrets Portal to production on GitHub Pages (zero cost).

## Prerequisites

- GitHub Account
- Node.js 18+
- GitHub OAuth App configured
- GitHub Personal Access Token (for API access)

## Step 1: Create GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in the form:
   - **Application name**: Secrets Portal
   - **Homepage URL**: https://trancendos.github.io/secrets-portal
   - **Authorization callback URL**: https://trancendos.github.io/secrets-portal/callback
4. Copy your **Client ID**

## Step 2: Configure Environment Variables

1. Clone the repository
```bash
git clone https://github.com/Trancendos/secrets-portal.git
cd secrets-portal
```

2. Create `.env.local`
```bash
cp .env.example .env.local
```

3. Update with your OAuth credentials
```env
REACT_APP_GITHUB_CLIENT_ID=your_client_id_here
REACT_APP_GITHUB_REDIRECT_URI=https://trancendos.github.io/secrets-portal/callback
```

## Step 3: Build for Production

```bash
npm install
npm run build
```

## Step 4: Deploy to GitHub Pages

Enable GitHub Pages in repository settings:

1. Go to Settings > Pages
2. Select "Deploy from a branch"
3. Select `main` branch and `/root` folder
4. Wait for deployment to complete

**OR** use the automated workflow:

```bash
npm run deploy
```

## Step 5: Configure GitHub Secrets

Add your production secrets to the repository:

```bash
gh secret set SNYK_TOKEN --body "your-snyk-token"
gh secret set GITGUARDIAN_API_KEY --body "your-gitguardian-key"
```

## Step 6: Enable Actions

1. Go to Settings > Actions
2. Ensure "All actions and reusable workflows" is enabled
3. Set workflow permissions to "Read and write permissions"

## Step 7: Verify Deployment

1. Visit: https://trancendos.github.io/secrets-portal
2. Click "Sign in with GitHub"
3. Grant permissions
4. Verify dashboard loads

## Security Checklist

- [ ] OAuth app configured with correct redirect URL
- [ ] GitHub token stored securely (never in repo)
- [ ] HTTPS enforced (automatic on GitHub Pages)
- [ ] Secrets never logged or stored locally
- [ ] Audit logging enabled
- [ ] CORS properly configured
- [ ] Rate limiting understood
- [ ] Backup strategy in place

## Monitoring & Maintenance

### View Logs
```bash
gh run list --workflow=deploy.yml
gh run view <run-id> --log
```

### Check Health
```bash
curl -s https://trancendos.github.io/secrets-portal | grep "root"
```

### Monitor Secrets
```bash
gh secret list
gh secret list --json
```

## Troubleshooting

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### GitHub Pages not updating
- Clear browser cache
- Wait 1-2 minutes for deployment
- Check GitHub Actions tab for errors

### OAuth redirect issues
- Verify callback URL exactly matches GitHub OAuth app
- Check browser console for errors
- Ensure cookies are enabled

## Cost Analysis

| Component | Cost/Month | Notes |
|-----------|-----------|-------|
| GitHub Pages | $0 | Included with GitHub |
| GitHub Actions | $0 | 2,000 min/month free |
| GitHub Secrets | $0 | Unlimited free |
| Custom Domain | ~$10 | Optional |
| **Total** | **$0** | With free tier |

## Support

For issues, create a GitHub Issue:
https://github.com/Trancendos/secrets-portal/issues
