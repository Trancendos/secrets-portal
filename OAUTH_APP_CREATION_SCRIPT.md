# 🔑 GitHub OAuth App Creation & Configuration

## ✅ Automatic Setup Available

I've automated as much as possible. You only need to:

1. **Create OAuth App** (5 min - manual web UI)
2. **Get Client ID** (copy/paste)
3. **Run Automated Setup** (I handle everything else)

---

## 📋 Step 1: Create OAuth App (REQUIRED - Must Do)

### Navigate to GitHub Developer Settings

```
1. Go to: https://github.com/settings/developers
2. Or:
   - Login to GitHub
   - Click profile picture (top right)
   - Settings
   - Developer settings (bottom of left sidebar)
   - OAuth Apps
```

### Create New OAuth App

```
1. Click: "New OAuth App" (or "Register a new application")
2. You'll see a form with these fields:
```

### Fill in Application Details

**Exact values (copy/paste)**:

| Field | Value |
|-------|-------|
| **Application name** | `Secrets Portal` |
| **Homepage URL** | `https://trancendos.github.io/secrets-portal` |
| **Application description** | `Zero-cost GitHub Secrets Management Portal` |
| **Authorization callback URL** | `https://trancendos.github.io/secrets-portal/callback` |

⚠️ **CRITICAL**: Callback URL must be EXACTLY:
```
https://trancendos.github.io/secrets-portal/callback
```

### Click "Register application"

You'll see a page with:
- ✅ **Client ID** (shown on page)
- ℹ️ **Client Secret** (click "Generate" if needed)

---

## 📌 Step 2: Copy Your Client ID

You'll see something like:

```
Client ID: a1b2c3d4e5f6g7h8i9j0
```

**Copy this value** - you'll need it in Step 3

---

## 🤖 Step 3: Run Automated Setup

Now that you have your Client ID, I can automate everything else!

### Option A: Fully Automated (Recommended)

```bash
# Run this command (replacing YOUR_CLIENT_ID with actual ID from Step 2)
gh secret set REACT_APP_GITHUB_CLIENT_ID --body "YOUR_CLIENT_ID" --repo Trancendos/secrets-portal
gh secret set REACT_APP_GITHUB_REDIRECT_URI --body "https://trancendos.github.io/secrets-portal/callback" --repo Trancendos/secrets-portal

# Verify secrets are set
gh secret list --repo Trancendos/secrets-portal

# Trigger deployment
gh workflow run deploy.yml --repo Trancendos/secrets-portal

# Watch deployment
gh run watch --repo Trancendos/secrets-portal
```

### Option B: Step by Step

**Add First Secret**:
```bash
gh secret set REACT_APP_GITHUB_CLIENT_ID --body "a1b2c3d4e5f6g7h8i9j0" --repo Trancendos/secrets-portal
```
Replace `a1b2c3d4e5f6g7h8i9j0` with your actual Client ID

**Add Second Secret**:
```bash
gh secret set REACT_APP_GITHUB_REDIRECT_URI --body "https://trancendos.github.io/secrets-portal/callback" --repo Trancendos/secrets-portal
```

**Verify**:
```bash
gh secret list --repo Trancendos/secrets-portal
```
Should show both secrets ✅

**Deploy**:
```bash
gh workflow run deploy.yml --repo Trancendos/secrets-portal
```

### Option C: Web Interface

If you prefer not using CLI:

1. Go to: https://github.com/Trancendos/secrets-portal/settings/secrets/actions
2. Click: "New repository secret"
3. Add secret:
   - Name: `REACT_APP_GITHUB_CLIENT_ID`
   - Value: `[Your Client ID]`
4. Click: "Add secret"
5. Repeat for second secret:
   - Name: `REACT_APP_GITHUB_REDIRECT_URI`
   - Value: `https://trancendos.github.io/secrets-portal/callback`
6. Go to: Actions tab
7. Find: "Deploy to GitHub Pages" workflow
8. Click: "Run workflow"
9. Click: "Run workflow" again

---

## ⏱️ What Happens Next

### Timeline

**Immediately**:
- ✅ Secrets stored securely in GitHub
- ✅ Deployment workflow starts
- ✅ Code builds

**Within 1 minute**:
- ✅ Tests run
- ✅ Bundle created
- ✅ Optimized

**Within 2 minutes**:
- ✅ Deployed to GitHub Pages
- ✅ Site goes LIVE
- ✅ HTTPS configured

### Verify Deployment

```bash
# Check if portal is live
curl -s -o /dev/null -w "HTTP %{http_code}" https://trancendos.github.io/secrets-portal
# Should return: HTTP 200
```

---

## 🧪 Step 4: Test Portal Access

### Visit the Portal

```
https://trancendos.github.io/secrets-portal
```

### What You Should See

**Login Page** with:
- "Sign in with GitHub" button
- Secrets Portal logo
- Description

### Click "Sign in with GitHub"

1. You'll see GitHub OAuth permission screen
2. Click "Authorize"
3. You'll be redirected back to dashboard

**If you see dashboard**:
- ✅ OAuth is working!
- ✅ You're ready to use the portal

---

## ✅ Verification Checklist

Before you're done:

- [ ] OAuth app created at https://github.com/settings/developers
- [ ] Client ID copied
- [ ] Secrets added to repository
- [ ] Secrets verified via `gh secret list`
- [ ] Deployment workflow triggered
- [ ] Portal accessible at HTTPS URL
- [ ] OAuth login works
- [ ] Dashboard loads
- [ ] No errors in console (F12)

✅ **All checked? You're production-ready!**

---

## 🎯 Next: Create Your First Secret

### In the Dashboard

1. Click: "Create Secret"
2. Name: `MY_FIRST_SECRET`
3. Value: `test-value-123`
4. Click: "Create Secret"
5. See: Success message

### Verify It Works

1. Go to: "Secrets" tab
2. See: `MY_FIRST_SECRET` in list
3. Go to: "Audit Log" tab
4. See: "CREATE" action for secret

---

## 🆘 Troubleshooting

### OAuth App Not Showing

**Problem**: Can't find OAuth Apps in settings

**Solution**:
```
https://github.com/settings/developers → OAuth Apps → New OAuth App
```

### "Invalid redirect URI" Error

**Problem**: After clicking login, get redirect URI error

**Solution**:
1. Go back to OAuth app settings
2. Verify callback URL is EXACTLY:
   ```
   https://trancendos.github.io/secrets-portal/callback
   ```
3. No trailing slash
4. No query parameters
5. HTTPS (not HTTP)

### Secrets Not Set

**Problem**: `gh secret list` shows nothing

**Solution**:
```bash
# Make sure you're in the right repo
gh secret set REACT_APP_GITHUB_CLIENT_ID --body "YOUR_ID" --repo Trancendos/secrets-portal

# Verify
gh secret list --repo Trancendos/secrets-portal
```

### Deployment Not Triggering

**Problem**: Workflow doesn't start

**Solution**:
1. Go to: https://github.com/Trancendos/secrets-portal/settings/actions
2. Check: "Allow all actions and reusable workflows"
3. Check: "Read and write permissions"
4. Click: "Save"
5. Try deployment again

---

## 📚 Full Documentation

- [GETTING_STARTED.md](GETTING_STARTED.md) - Quick start
- [OAUTH_SETUP.md](OAUTH_SETUP.md) - Detailed OAuth setup
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues
- [SECURITY.md](SECURITY.md) - Security info

---

## 🚀 Summary

| Step | What | Time | Who |
|------|------|------|-----|
| 1 | Create OAuth App | 5 min | **You** (GitHub web UI) |
| 2 | Copy Client ID | 1 min | **You** (copy/paste) |
| 3 | Add Secrets | 2 min | **I can do this** (or you) |
| 4 | Deploy | 30 sec | **I can do this** (or you) |
| 5 | Test | 2 min | **You** (click buttons) |

**Total manual work**: ~8 minutes
**Total automated**: ~3 minutes

---

## 💬 Ready?

Once you have your Client ID from Step 2, just paste it and I can:

✅ Add all repository secrets
✅ Enable GitHub Actions
✅ Configure GitHub Pages
✅ Trigger deployment
✅ Verify everything works

**Send me your Client ID and I'll finish the rest! 🚀**
