# Getting Started Guide

## ⚡ 5-Minute Quick Start

### 1. Access the Portal

Go to: https://trancendos.github.io/secrets-portal

### 2. Sign In

Click "Sign in with GitHub" and grant permissions

### 3. Create a Secret

1. Click "New Secret"
2. Enter name: `MY_API_KEY`
3. Enter value: Your secret
4. Click "Create Secret"

### 4. Manage Secrets

- **View**: List all secrets
- **Delete**: Select secret and click delete
- **Copy**: Click copy icon
- **Audit**: Check "Audit Log" tab

---

## 📱 Mobile App Setup

### Download APK

1. Go to Releases: https://github.com/Trancendos/secrets-portal/releases
2. Download latest `.apk` file
3. Open on Android device
4. Grant permissions when prompted

### First Launch

1. App opens login screen
2. Scan QR code with another device (web portal)
3. Or copy/paste token manually
4. Dashboard loads

---

## 💻 CLI Installation

### Install

```bash
npm install -g secrets-portal-cli
```

### Verify

```bash
secrets --version
```

### Setup Token

```bash
export GITHUB_TOKEN="your-github-token"
```

### First Command

```bash
secrets list
```

---

## 🔑 Common Tasks

### List All Secrets

**Web**:
- Go to Dashboard
- View "Secrets" tab

**CLI**:
```bash
secrets list --repo Trancendos/trancendos-ecosystem
```

**Mobile**:
- Open app
- Tap "Secrets" tab

### Create a Secret

**Web**:
1. Click "New Secret"
2. Enter name and value
3. Click "Create"

**CLI**:
```bash
secrets create DATABASE_URL --value "postgresql://..."
```

### Delete a Secret

**Web**:
1. Find secret in list
2. Click trash icon
3. Confirm delete

**CLI**:
```bash
secrets delete DATABASE_URL
```

### Export Secrets

**CLI**:
```bash
# JSON
secrets list --output json > secrets.json

# YAML
secrets extract --file .env --format yaml
```

---

## 🔒 Best Practices

✅ DO:
- Use strong, unique values
- Rotate secrets quarterly
- Monitor audit log
- Use GitHub's built-in security
- Enable 2FA on GitHub

❌ DON'T:
- Share secret values
- Commit secrets to git
- Log secret values
- Disable 2FA
- Use weak passwords

---

## 🆘 Help

### Something not working?

1. Check troubleshooting: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. View GitHub Issues: https://github.com/Trancendos/secrets-portal/issues
3. Read docs: [README.md](README.md)
4. Contact support: support@trancendos.dev

### Where to find...

- **Web portal**: https://trancendos.github.io/secrets-portal
- **GitHub repo**: https://github.com/Trancendos/secrets-portal
- **API docs**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **CLI docs**: [CLI.md](CLI.md)
- **Security info**: [SECURITY.md](SECURITY.md)

---

## 📚 Next Steps

1. **Configure**: Set up GitHub OAuth app
2. **Integrate**: Add secrets to your workflows
3. **Automate**: Use GitHub Actions
4. **Monitor**: Check audit logs
5. **Scale**: Invite team members

---

## 🚀 Advanced

Ready for more? Check out:
- [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md) - Deploy to production
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical details
- [SECURITY.md](SECURITY.md) - Security hardening
