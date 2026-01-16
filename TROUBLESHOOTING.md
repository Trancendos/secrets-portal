# Troubleshooting Guide

## Common Issues & Solutions

### 🔴 OAuth Login Issues

**Problem**: "Invalid redirect URI"

**Solution**:
```bash
# Check your OAuth app settings
# Authorization callback URL must match EXACTLY:
# https://trancendos.github.io/secrets-portal/callback

# Check .env.local
echo $REACT_APP_GITHUB_REDIRECT_URI
```

**Problem**: "Not getting authenticated"

**Solution**:
- Clear browser cookies
- Disable browser extensions
- Try in incognito/private mode
- Check console for errors: F12 > Console

---

### 🔴 Secrets Not Loading

**Problem**: Empty secrets list

**Solution**:
```bash
# Verify GitHub token is valid
gh auth status

# Check repository name
echo "Checking: Trancendos/secrets-portal"

# List secrets via CLI
gh secret list
```

**Problem**: "Failed to fetch secrets"

**Solution**:
```bash
# Check API rate limit
gh api rate_limit

# Check GitHub status
curl https://www.githubstatus.com/api/v2/status.json
```

---

### 🔴 Build Failures

**Problem**: `npm install` fails

**Solution**:
```bash
# Clear cache
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Check Node version
node --version  # Should be 18+
```

**Problem**: TypeScript errors

**Solution**:
```bash
# Clear build cache
rm -rf build

# Rebuild
npm run build

# Check for type errors
npx tsc --noEmit
```

---

### 🔴 Deployment Issues

**Problem**: "GitHub Pages not deploying"

**Solution**:
1. Go to Settings > Pages
2. Ensure "Deploy from a branch" is selected
3. Select `main` branch
4. Wait 1-2 minutes
5. Check Actions tab for errors

**Problem**: Build fails in GitHub Actions

**Solution**:
```bash
# View logs
gh run list --workflow=deploy.yml
gh run view <run-id> --log

# Common fixes
# - Clear cache in Actions settings
# - Update dependencies: npm update
# - Check .env variables are set
```

---

### 🔴 Performance Issues

**Problem**: "App is slow"

**Solution**:
```bash
# Check network tab (F12)
# Look for:
# - Large bundle size (> 500KB)
# - Slow API calls (> 5s)
# - Waterfall requests

# Analyze bundle
npm run build -- --analyze

# Check dependencies
npm ls
```

**Problem**: "Secrets take long to load"

**Solution**:
- GitHub API might be slow (check status)
- Browser cache might be stale
- Try clearing cache: CTRL+Shift+Delete
- Check rate limit: `gh api rate_limit`

---

### 🔴 Mobile App Issues

**Problem**: "APK won't install"

**Solution**:
```bash
# Check Android version compatibility
# Min SDK: 21 (Android 5.0)
# Target SDK: 34 (Android 14)

# Rebuild APK
cd mobile
npm run build-android
```

**Problem**: "App crashes on start"

**Solution**:
- Check logcat: `adb logcat`
- Verify OAuth credentials
- Check storage permissions
- Clear app data and retry

---

### 🔴 CLI Issues

**Problem**: "Command not found"

**Solution**:
```bash
# Install globally
npm install -g secrets-portal-cli

# Add to PATH
export PATH="$PATH:$(npm config get prefix)/bin"

# Verify
which secrets
```

**Problem**: "Token not recognized"

**Solution**:
```bash
# Set token
export GITHUB_TOKEN="your-token"

# Or in ~/.bashrc
echo 'export GITHUB_TOKEN="your-token"' >> ~/.bashrc
source ~/.bashrc

# Verify
echo $GITHUB_TOKEN
```

---

### 🔴 Security Issues

**Problem**: "Secret exposed in logs"

**Solution**:
```bash
# Immediately delete from GitHub
gh secret delete EXPOSED_SECRET

# Rotate the actual credential
# (e.g., regenerate API key)

# View audit log
gh issue list --label audit
```

**Problem**: "Unauthorized access detected"

**Solution**:
```bash
# 1. Review audit log
gh issue list --label audit --limit 50

# 2. Check recent activity
gh api /repos/Trancendos/secrets-portal/activity

# 3. Revoke suspicious tokens
gh secret delete SUSPICIOUS_TOKEN

# 4. Enable 2FA on GitHub
https://github.com/settings/security
```

---

## Debug Mode

### Enable verbose logging

**Browser**:
```javascript
// Open DevTools (F12) > Console
localStorage.setItem('DEBUG', 'true')
location.reload()
```

**CLI**:
```bash
secrets list --verbose
secrets create MY_KEY --debug
```

**GitHub Actions**:
```yaml
- name: Enable debug
  run: echo "ACTIONS_STEP_DEBUG=true" >> $GITHUB_ENV
```

---

## Getting Help

### Check logs

```bash
# Browser console (F12)
# Look for red errors

# GitHub Actions logs
gh run list
gh run view <id> --log

# System logs
gh api /repos/Trancendos/secrets-portal/issues
```

### Create issue

https://github.com/Trancendos/secrets-portal/issues/new

Include:
- Exact error message
- Steps to reproduce
- System info (OS, Node version)
- Browser (if web issue)
- Screenshots/logs

### Contact support

- Email: support@trancendos.dev
- GitHub Discussions: https://github.com/Trancendos/secrets-portal/discussions

---

## FAQ

**Q: Can I self-host this?**
A: Yes! Use any hosting that supports React (Vercel, Netlify, your own server)

**Q: Is my data secure?**
A: Yes, secrets encrypted with AES-256 by GitHub. We never see them.

**Q: Can I use this offline?**
A: No, requires GitHub API access. But you can clone and run locally.

**Q: How do I backup secrets?**
A: GitHub automatically backups. Export via CLI:
```bash
secrets list > secrets-backup.json
```

**Q: Can I share secrets with team members?**
A: Yes, they need GitHub access to the repository.

**Q: What's the rate limit?**
A: 5,000 API calls/hour per authenticated user.

**Q: How do I delete everything?**
A: Delete each secret individually or delete the repository.

**Q: Is there a webhook?**
A: Not yet, but you can trigger workflows via GitHub Events.
