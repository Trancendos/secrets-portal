# GitHub Actions Secrets Configuration

## Overview

This guide shows you how to configure all necessary GitHub Actions secrets for production deployment.

## Step 1: Access Repository Secrets

### Navigate to Settings

1. Go to: https://github.com/Trancendos/secrets-portal/settings
2. In left menu, click: "Secrets and variables" > "Actions"

## Step 2: Add Required Secrets

### Secret #1: REACT_APP_GITHUB_CLIENT_ID

```
Name: REACT_APP_GITHUB_CLIENT_ID
Value: [Copy from OAuth app]
```

**Where to get it**:
1. Go to https://github.com/settings/developers
2. Click your OAuth app
3. Copy "Client ID"
4. Paste here

### Secret #2: REACT_APP_GITHUB_REDIRECT_URI

```
Name: REACT_APP_GITHUB_REDIRECT_URI
Value: https://trancendos.github.io/secrets-portal/callback
```

**Important**: Must be EXACTLY this URL.

## Step 3: Add Optional Secrets (Security Scanning)

### Secret #3: SNYK_TOKEN (Optional)

For vulnerability scanning:

```
Name: SNYK_TOKEN
Value: [Your Snyk token]
```

**Get it**:
1. Go to https://app.snyk.io/auth/login
2. Sign up (free tier available)
3. Get API token from settings
4. Add to secrets

### Secret #4: GITGUARDIAN_API_KEY (Optional)

For secret detection:

```
Name: GITGUARDIAN_API_KEY
Value: [Your GitGuardian API key]
```

**Get it**:
1. Go to https://dashboard.gitguardian.com
2. Sign up (free tier available)
3. Create API token
4. Add to secrets

## Step 4: Verify Secrets Are Set

### Check via CLI

```bash
# List all secrets
gh secret list --repo Trancendos/secrets-portal

# Output should show:
# REACT_APP_GITHUB_CLIENT_ID
# REACT_APP_GITHUB_REDIRECT_URI
```

### Check in Web UI

1. Go to Settings > Secrets and variables > Actions
2. You should see your secrets listed (values hidden for security)

## Step 5: Test Workflows

### Trigger Deployment Workflow

```bash
gh workflow run deploy.yml --repo Trancendos/secrets-portal
```

### Monitor Workflow

```bash
# Watch the workflow
gh run watch --repo Trancendos/secrets-portal

# View logs
gh run view <run-id> --log
```

## Step 6: Configure Production Workflow Secrets

### For API Manager Workflow

If you want to use the API Manager features:

```bash
# Set default repository for API operations
gh secret set SECRETS_REPOSITORY --body "Trancendos/trancendos-ecosystem"
```

### For Sync Automation

If you want to sync secrets across repositories:

```bash
# Set source and target repos
gh secret set SOURCE_REPO --body "Trancendos/trancendos-ecosystem"
gh secret set TARGET_REPO --body "Trancendos/secrets-portal"
```

## Step 7: Verify Deployment

### Check GitHub Pages

1. Go to: https://github.com/Trancendos/secrets-portal/settings/pages
2. You should see "Your site is published at:"
3. URL should be: https://trancendos.github.io/secrets-portal

### Access the Portal

1. Visit: https://trancendos.github.io/secrets-portal
2. You should see the login page
3. Click "Sign in with GitHub"
4. Grant permissions
5. Dashboard should load

✅ If dashboard loads, everything is working!

## Step 8: Test All Features

### Create Test Secret

1. On dashboard, click "New Secret"
2. Name: `TEST_SECRET`
3. Value: `test-value-123`
4. Click "Create Secret"
5. You should see success message

### List Secrets

1. Go to "Secrets" tab
2. You should see `TEST_SECRET` listed
3. Created date should show

### Check Audit Log

1. Go to "Audit Log" tab
2. You should see "CREATE" action for TEST_SECRET
3. Timestamp should show when created

### Delete Test Secret

1. Find TEST_SECRET in list
2. Click trash icon
3. Confirm deletion
4. Secret should disappear
5. Audit log should show DELETE action

✅ All features working!

## Step 9: Secure Your Secrets

### Best Practices

1. **Rotate Secrets Regularly**
   ```bash
   # Delete and recreate sensitive secrets quarterly
   gh secret delete REACT_APP_GITHUB_CLIENT_ID
   # Then recreate with new value
   ```

2. **Monitor Audit Log**
   ```bash
   # View all audit log entries
   gh issue list --repo Trancendos/secrets-portal --label audit
   ```

3. **Enable 2FA on GitHub**
   ```
   https://github.com/settings/security
   ```

4. **Review Secret Usage**
   - Regularly check which workflows use secrets
   - Remove unused secrets
   - Rotate compromised secrets immediately

## Environment Variables Reference

```env
# Required
REACT_APP_GITHUB_CLIENT_ID=...          # OAuth Client ID
REACT_APP_GITHUB_REDIRECT_URI=...       # OAuth Callback URL

# Optional Security
SNYK_TOKEN=...                          # Snyk vulnerability scanning
GITGUARDIAN_API_KEY=...                 # GitGuardian secret detection
OWASP_DC_TOKEN=...                      # OWASP Dependency Check

# Optional Integrations
SLACK_WEBHOOK_URL=...                   # Slack notifications
DATADOG_API_KEY=...                     # Datadog monitoring
AWS_ACCESS_KEY_ID=...                   # AWS S3 backup
AWS_SECRET_ACCESS_KEY=...               # AWS S3 backup
```

## Troubleshooting

### Workflow Can't Find Secrets

**Problem**: "Secret not found" in workflow logs

**Solution**:
```bash
# Verify secret exists
gh secret list

# If missing, add it
gh secret set REACT_APP_GITHUB_CLIENT_ID --body "your-value"
```

### GitHub Pages Not Deploying

**Problem**: GitHub Pages shows "not ready"

**Solution**:
1. Go to Settings > Pages
2. Ensure "Deploy from a branch" is selected
3. Select "main" branch
4. Check Actions tab for deploy workflow
5. If failed, check logs for errors

### OAuth Not Working

**Problem**: "Invalid redirect URI" when logging in

**Solution**:
1. Verify REACT_APP_GITHUB_REDIRECT_URI secret is set correctly
2. Check OAuth app at github.com/settings/developers
3. Callback URL must match exactly: `https://trancendos.github.io/secrets-portal/callback`
4. Clear browser cache
5. Try incognito window

## Next Steps

1. ✅ Secrets configured
2. ✅ GitHub Pages deployed
3. ✅ OAuth working
4. ✅ Features tested

**Now ready for**: CLI tool, mobile app, automated backups

## Support

- Docs: [OAUTH_SETUP.md](OAUTH_SETUP.md)
- Issues: https://github.com/Trancendos/secrets-portal/issues
- Troubleshooting: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
