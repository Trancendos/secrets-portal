# System Architecture

## 🏗️ Overview

```
┌─────────────────────────────────────────────────────────┐
│                  Secrets Portal                          │
│                   (Zero-Cost)                            │
└─────────────────────────────────────────────────────────┘
         │                    │                    │
    ┌────▼────┐         ┌─────▼─────┐        ┌────▼─────┐
    │   Web   │         │  Mobile   │        │   CLI    │
    │ Portal  │         │    App    │        │  Tools   │
    │(React)  │         │(React Native)      │(Node.js) │
    └────┬────┘         └─────┬─────┘        └────┬─────┘
         │                    │                    │
         └────────────┬───────┴────────┬───────────┘
                      │                │
                  ┌───▼────────────────▼──┐
                  │  GitHub OAuth (Auth)   │
                  └───┬────────────────┬───┘
                      │                │
         ┌────────────▼──┐    ┌───────▼────────┐
         │ GitHub API    │    │ GitHub Actions │
         │ (List/Create/ │    │ (Workflow      │
         │  Delete)      │    │  Automation)   │
         └────────┬───────┘    └───────┬────────┘
                  │                    │
                  └────────────┬───────┘
                               │
                    ┌──────────▼──────────┐
                    │ GitHub Secrets      │
                    │ (AES-256 Encrypted) │
                    └─────────────────────┘
```

## Components

### Frontend (Web Portal)
- **Framework**: React 18
- **State**: Zustand
- **Styling**: Tailwind CSS
- **Hosting**: GitHub Pages (free)
- **Performance**: < 100KB gzipped

### Authentication
- **Method**: GitHub OAuth 2.0
- **Token Storage**: SessionStorage (auto-clear)
- **Session**: Auto-logout on close
- **Security**: HTTPS enforced

### API Layer
- **Endpoint**: api.github.com
- **Authentication**: Bearer token
- **Rate Limit**: 5,000/hour (authenticated)
- **Timeout**: 30 seconds
- **Retry**: 3 attempts with exponential backoff

### Backend Services
- **GitHub Actions**: Workflow automation
- **Dispatch Events**: Trigger workflows
- **Audit Issues**: Log all operations
- **Artifact Storage**: GitHub Releases

### Data Storage
- **Location**: GitHub Secrets Vault
- **Encryption**: AES-256 (GitHub managed)
- **Access**: API only (read/delete, no direct read)
- **Visibility**: Organization/Repository level

### Mobile App
- **Framework**: React Native
- **Platform**: Android/iOS
- **Storage**: Keychain (encrypted)
- **Size**: ~40MB (APK)
- **Distribution**: GitHub Releases (free)

### CLI Tools
- **Runtime**: Node.js 18+
- **Installation**: npm global
- **Commands**: list, create, delete, extract, sync
- **Output**: JSON, YAML, CSV, ENV

## Data Flow

### Creating a Secret

```
User Input
    │
    ▼
┌──────────────────────┐
│ Validate (name/value)│
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ GitHub OAuth Check   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Dispatch Workflow    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ GitHub Actions Queue │
│ (Background)         │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Store in Vault       │
│ (AES-256 Encrypted)  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Create Audit Issue   │
└──────────┬───────────┘
           │
           ▼
     ✅ Success
```

### Listing Secrets

```
User Action
    │
    ▼
┌──────────────────────┐
│ GitHub API Request   │
│ GET /actions/secrets │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Parse Response       │
│ (Names only, no values)
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Cache in State       │
│ (Zustand)            │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Display in UI        │
│ (Masked values)      │
└──────────┬───────────┘
           │
           ▼
     ✅ Rendered
```

## Security Architecture

```
┌─────────────────────────────────────┐
│        HTTPS/TLS Layer              │
│  (All traffic encrypted in transit) │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│    GitHub OAuth (Authentication)    │
│  (User identity verification)       │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│    API Rate Limiting                │
│  (5,000 req/hour per user)          │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│    GitHub Secrets Vault             │
│  (AES-256 Encryption at Rest)       │
└─────────────────────────────────────┘
```

## Performance Metrics

| Metric | Target | Status |
|--------|--------|--------|
| Page Load | < 2s | ✅ |
| List Secrets | < 1s | ✅ |
| Create Secret | < 2s | ✅ |
| Mobile Load | < 3s | ✅ |
| Lighthouse Score | > 90 | ✅ |

## Scalability

- **Users**: Unlimited (GitHub auth)
- **Secrets**: Unlimited (GitHub vault)
- **Requests**: 5,000/hour per user (GitHub rate limit)
- **Storage**: Free (GitHub Pages + GitHub Secrets)
- **Bandwidth**: Free (GitHub Pages)

## Disaster Recovery

| Scenario | Recovery | RTO |
|----------|----------|-----|
| App crash | Reload page | < 1s |
| Token expired | Re-login | < 2s |
| API down | GitHub status page | N/A |
| Data loss | GitHub backup | 24h |

## Cost Analysis

```
Monthly Costs:
├─ GitHub Pages: $0 (included)
├─ GitHub Actions: $0 (2,000 min free)
├─ GitHub Secrets: $0 (unlimited)
├─ Custom Domain: $0 (optional)
└─ Total: $0

Yearly Cost: $0
With premium storage: $4/month
```

## Deployment Topology

```
Internet
   │
   ▼
GitHub CDN (GitHub Pages)
   │
   ├─► index.html (React app)
   ├─► JavaScript bundles
   ├─► CSS stylesheets
   └─► Assets
   │
   ▼
User Browser
   │
   └─► React renders UI
       │
       ├─► GitHub OAuth callback
       └─► GitHub API calls
```

## Technology Stack

### Frontend
- React 18.2.0
- TypeScript 5.3
- Tailwind CSS 3.4
- Zustand 4.4.0
- React Router 6.20
- Axios 1.6

### Backend
- GitHub API v3
- GitHub Actions
- GitHub Secrets Vault

### DevOps
- GitHub Pages (hosting)
- GitHub Actions (CI/CD)
- GitHub Releases (distribution)

### Mobile
- React Native 0.72
- Gradle (build system)
- React Navigation

### CLI
- Node.js 18+
- Octokit (GitHub client)
- Commander.js (CLI framework)

## Future Enhancements

- [ ] End-to-end encryption option
- [ ] Backup to AWS S3
- [ ] Slack integration
- [ ] Datadog monitoring
- [ ] SAML support
- [ ] Advanced filtering
- [ ] Scheduled rotation
- [ ] Secret versioning
