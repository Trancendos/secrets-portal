# GitHub OAuth Setup Guide

## Step 1: Create OAuth Application

### Navigate to GitHub Settings

1. Go to: https://github.com/settings/developers
2. Click on "Developer settings" in left menu
3. Click "OAuth Apps"
4. Click "New OAuth App"

### Fill in Application Details

**Application name**:
```
Secrets Portal
```

**Homepage URL**:
```
https://trancendos.github.io/secrets-portal
```

**Application description**:
```
Zero-cost GitHub Secrets Management Portal with encryption and audit logging
```

**Authorization callback URL** (IMPORTANT - must be exact):
```
https://trancendos.github.io/secrets-portal/callback
```

⚠️ **Critical**: The callback URL must match EXACTLY, including the trailing path.

### Click "Register Application"

You'll now see:
- Client ID
- Client Secret (generate if needed)

## Step 2: Configure GitHub Repository Secrets

### Add to Repository Settings

1. Go to: https://github.com/Trancendos/secrets-portal/settings
2. Click "Secrets and variables" > "Actions"
3. Click "New repository secret"

### Add These Secrets

**Secret 1: GITHUB_CLIENT_ID**
```
Name: REACT_APP_GITHUB_CLIENT_ID
Value: [Your Client ID from OAuth app]
```

**Secret 2: GITHUB_REDIRECT_URI**
```
Name: REACT_APP_GITHUB_REDIRECT_URI
Value: https://trancendos.github.io/secrets-portal/callback
```

## Step 3: Configure GitHub Pages

### Enable GitHub Pages

1. Go to: https://github.com/Trancendos/secrets-portal/settings/pages
2. Under "Build and deployment":
   - **Source**: Deploy from a branch
   - **Branch**: main
   - **Folder**: / (root)
3. Click "Save"

### Wait for Deployment

- Check the "Actions" tab
- Wait for "Deploy to GitHub Pages" workflow to complete
- Once green ✅, your site is live!

## Step 4: Set Repository Visibility

### Make Repository Public (if needed)

1. Go to: https://github.com/Trancendos/secrets-portal/settings
2. Scroll to "Danger Zone"
3. Click "Change visibility"
4. Select "Public"
5. Confirm

## Step 5: Enable GitHub Actions

### Enable Actions for Repository

1. Go to: https://github.com/Trancendos/secrets-portal/settings/actions
2. Under "Actions permissions":
   - Select: "Allow all actions and reusable workflows"
3. Under "Workflow permissions":
   - Select: "Read and write permissions"
   - ✅ Enable: "Allow GitHub Actions to create and approve pull requests"
4. Click "Save"

## Step 6: Configure Branch Protection

### Protect Main Branch (Optional but Recommended)

1. Go to: https://github.com/Trancendos/secrets-portal/settings/branches
2. Add rule for "main":
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - ✅ Include administrators

## Step 7: Test OAuth Configuration

### Verify Setup

1. Visit: https://trancendos.github.io/secrets-portal
2. Click "Sign in with GitHub"
3. You should see OAuth permission screen
4. Grant permissions
5. You should be redirected to dashboard

✅ If you see dashboard, OAuth is working!

## Troubleshooting

### "Invalid redirect URI" Error

**Solution**:
- Check OAuth app callback URL exactly matches:
  - https://trancendos.github.io/secrets-portal/callback
- No trailing slash
- Must be HTTPS
- No query parameters

### "Not authenticated" on Dashboard

**Solution**:
- Check GitHub Actions secrets are set
- Clear browser cache
- Try incognito/private window
- Check F12 console for errors

### GitHub Pages Not Deploying

**Solution**:
- Go to Actions tab
- Check "Deploy to GitHub Pages" workflow
- Look for error messages
- Ensure main branch is set in Pages settings

## Verification Checklist

- [ ] OAuth app created at github.com/settings/developers
- [ ] Client ID obtained
- [ ] Client Secret generated (optional)
- [ ] Repository secrets set (REACT_APP_GITHUB_CLIENT_ID, REACT_APP_GITHUB_REDIRECT_URI)
- [ ] GitHub Pages enabled (main branch, /root folder)
- [ ] GitHub Actions enabled with read/write permissions
- [ ] Web portal accessible at https://trancendos.github.io/secrets-portal
- [ ] OAuth login working
- [ ] Can create test secret
- [ ] Audit log showing actions

## Next: Deploy CLI and Mobile

Once web portal is working:

```bash
# Install CLI
npm install -g secrets-portal-cli

# Download mobile APK
# Go to: https://github.com/Trancendos/secrets-portal/releases
```

## Support

If you get stuck:
1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Review [SECURITY.md](SECURITY.md)
3. Read [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md)
4. Create issue: https://github.com/Trancendos/secrets-portal/issues
