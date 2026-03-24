# Secrets Portal

[![Security Gating](https://github.com/Trancendos/secrets-portal/workflows/Security%20Gating/badge.svg)](https://github.com/Trancendos/secrets-portal/actions/workflows/security-gating.yml)
[![Deploy to GitHub Pages](https://github.com/Trancendos/secrets-portal/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/Trancendos/secrets-portal/actions/workflows/deploy.yml)

Zero-cost GitHub Secrets Management Portal

## Features

- 🔐 **AES-256 Encrypted** - All secrets encrypted at rest
- 🔑 **GitHub OAuth** - Secure authentication
- 📱 **Mobile Ready** - Works on any device
- 📊 **Audit Logging** - Track all operations
- 🚀 **Zero Cost** - Hosted on GitHub Pages

## Quick Start

### Prerequisites

- Node.js 18+
- GitHub Account
- GitHub OAuth App (see setup below)

### Setup

1. Clone repository
```bash
git clone https://github.com/Trancendos/secrets-portal.git
cd secrets-portal
```

2. Install dependencies
```bash
npm install
```

3. Create GitHub OAuth App
   - Go to https://github.com/settings/developers
   - Click "New OAuth App"
   - Set Authorization callback URL to `https://trancendos.github.io/secrets-portal/callback`
   - Copy Client ID

4. Configure environment
```bash
cp .env.example .env.local
# Edit .env.local with your GitHub Client ID
```

5. Start development server
```bash
npm start
```

6. Build for production
```bash
npm run build
```

7. Deploy
```bash
npm run deploy
```

## Architecture

```
Web Portal (React)
    ↓
GitHub API Client
    ↓
GitHub Actions (API Manager)
    ↓
GitHub Secrets Vault (Encrypted)
```

## Security

- ✅ OAuth GitHub authentication
- ✅ No secrets stored locally
- ✅ HTTPS only
- ✅ Auto-masking in logs
- ✅ Audit trail for all operations
- 🔒 **CI/CD Security Gating** - Automated vulnerability scanning
  - Dependency & CVE scanning (NPM, OWASP, Trivy)
  - Docker image security scanning
  - Infrastructure as Code validation
  - OAuth2 & OWASP Top 10 compliance checks
  - Automatic merge blocking on critical issues
  - Slack alerts for security findings

See [SECURITY_GATING.md](SECURITY_GATING.md) for detailed security scanning documentation.

## Project Structure

```
src/
├── components/       # React components
├── pages/           # Page components
├── services/        # API services
├── store/           # Zustand store
├── types/           # TypeScript types
├── utils/           # Utility functions
└── App.tsx          # Main app
```

## Development

### Create a component
```bash
npm run generate component ComponentName
```

### Run tests
```bash
npm test
```

### Format code
```bash
npm run format
```

## Deployment

Automatically deployed to GitHub Pages on push to main.

View at: https://trancendos.github.io/secrets-portal

## License

MIT
