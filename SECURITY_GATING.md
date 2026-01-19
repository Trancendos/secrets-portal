# Security Gating CI/CD Documentation

## Overview

The **Security Gating** workflow provides comprehensive security scanning and enforcement for the Secrets Portal repository. It blocks merges when critical or high severity vulnerabilities are detected, ensuring that only secure code reaches production.

## Features

### ✅ Universal Scanning
- **Dependency Scanning**: NPM audit, OWASP Dependency Check, Trivy filesystem scan
- **Docker Image Scanning**: Trivy container image scanning for all Dockerfiles
- **Infrastructure as Code**: Checkov, TFSec, and Trivy for Terraform, CloudFormation, Kubernetes configs
- **CVE Database**: Checks against National Vulnerability Database (NVD)

### 🚨 Alert System
- **Persistent Markdown Report**: `SECURITY_SCAN_REPORT.md` committed to repository
- **Slack Notifications**: Real-time alerts for security issues
- **PR Comments**: Automated comments on pull requests with scan results
- **GitHub Security Tab**: SARIF uploads for code scanning alerts

### 🔒 Merge Protection
- **Automatic Blocking**: Prevents merges when critical/high issues are found
- **Required Status Check**: Configure as required check in branch protection
- **Clear Reporting**: Detailed breakdown of all security findings

### 🛠️ Technology Support
- **Docker**: Automatic detection and scanning of Docker images
- **GCP Ready**: Supports GCP Cloud Build, Artifact Registry scanning
- **Infrastructure as Code**: Terraform, CloudFormation, Kubernetes, Docker Compose
- **OAuth2 Compliance**: Validates OAuth2 implementation best practices
- **OWASP Top 10**: Checks for OWASP 2021 compliance

## Setup Instructions

### 1. Required Secrets

Add these secrets to your GitHub repository (`Settings > Secrets and variables > Actions`):

#### Optional but Recommended:
- `NVD_API_KEY`: API key for NIST National Vulnerability Database
  - Get from: https://nvd.nist.gov/developers/request-an-api-key
  - Improves CVE scanning speed and accuracy
  
- `SLACK_WEBHOOK_URL`: Webhook URL for Slack notifications
  - Create at: https://api.slack.com/messaging/webhooks
  - Format: `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX`

### 2. Enable Branch Protection

Configure branch protection for `main` and `develop` branches:

1. Go to `Settings > Branches > Branch protection rules`
2. Add rule for `main` branch:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - Add required status check: `Generate Security Report`
   - ✅ Require branches to be up to date before merging
3. Repeat for `develop` branch

### 3. Configure Dependabot (Optional)

The workflow integrates with GitHub Dependabot for automated dependency updates:

```yaml
# .github/dependabot.yml already configured
version: 2
updates:
  - package-ecosystem: npm
    directory: "/"
    schedule:
      interval: daily
```

### 4. Set Up Slack (Optional)

If you want Slack notifications:

1. Create a Slack webhook:
   - Go to https://api.slack.com/messaging/webhooks
   - Click "Create your Slack app"
   - Enable Incoming Webhooks
   - Add webhook to workspace
   - Copy webhook URL

2. Add to GitHub Secrets:
   - Repository Settings > Secrets > Actions
   - New repository secret
   - Name: `SLACK_WEBHOOK_URL`
   - Value: Your webhook URL

## Workflow Behavior

### On Pull Request
1. Runs all security scans
2. Generates security report
3. Comments on PR with results
4. Sends Slack alert if issues found
5. **Blocks merge** if critical/high issues detected

### On Push to Main/Develop
1. Runs all security scans
2. Generates and commits security report
3. Sends Slack alert if issues found
4. Updates GitHub Security tab

### Manual Trigger
- Can be triggered manually from Actions tab
- Useful for ad-hoc security audits

## Scan Types

### 1. Dependency Scan (`dependency-scan`)

**Tools:**
- NPM Audit
- OWASP Dependency Check
- Trivy Filesystem Scan

**Checks:**
- Known CVEs in dependencies
- Outdated packages with vulnerabilities
- License compliance issues
- Transitive dependencies

**Severity Levels:**
- 🔴 Critical: Immediate action required
- 🟠 High: Fix before merge
- 🟡 Moderate: Fix soon
- 🟢 Low: Monitor

### 2. Docker Image Scan (`docker-scan`)

**When it runs:**
- Only if Dockerfiles are present in repository

**Tools:**
- Trivy container scanner

**Checks:**
- OS package vulnerabilities
- Application dependencies in images
- Image configuration issues
- Exposed secrets in layers

### 3. Infrastructure as Code Scan (`iac-scan`)

**Tools:**
- Trivy Config Scanner
- Checkov
- TFSec (for Terraform)

**Checks:**
- Terraform misconfigurations
- CloudFormation security issues
- Kubernetes manifests
- Docker Compose security
- GCP deployment configs

**Examples:**
- Unencrypted storage
- Public access configurations
- Missing authentication
- Insecure network rules

### 4. OAuth2 & OWASP Checks (`oauth-owasp-scan`)

**OAuth2 Checks:**
- ❌ Client secrets in source code
- ✅ Redirect URI validation
- ✅ State parameter (CSRF protection)
- ✅ PKCE implementation

**OWASP Top 10 2021:**
- A01: Broken Access Control
- A02: Cryptographic Failures
- A03: Injection
- A05: Security Misconfiguration
- A06: Vulnerable Components
- A07: Authentication Failures
- A09: Logging & Monitoring

## Security Report

The workflow generates a comprehensive markdown report (`SECURITY_SCAN_REPORT.md`) containing:

- Timestamp and workflow details
- Dependency scan results
- Docker image scan results
- IaC scan results
- OAuth2/OWASP findings
- Overall security status
- Quick links to detailed reports

**Example Report:**

```markdown
# 🔒 Security Scan Report

**Generated:** 2026-01-19 14:30:00 UTC
**Workflow:** Security Gating
**Commit:** abc123def

---

## 📦 Dependency Scan Results

### NPM Audit
- 🔴 Critical: 0
- 🟠 High: 2
- 🟡 Moderate: 5

**❌ Action Required:** Fix critical and high severity vulnerabilities

---

## 📊 Overall Security Status

### ⚠️ WARNING - High Severity Issues Found

**High vulnerabilities:** 2
**Total issues:** 2

⚠️ **Review and fix high severity issues before merging**
```

## Error Handling

The workflow includes robust error handling:

1. **Continue on Error**: Individual scans won't block others
2. **Artifact Collection**: Results saved even if scans fail
3. **Graceful Degradation**: Missing tools won't stop the workflow
4. **Retry Logic**: Network failures are handled automatically
5. **Detailed Logging**: All errors logged for debugging

## Integration with GCP

### Cloud Build

To use with GCP Cloud Build, add to `cloudbuild.yaml`:

```yaml
steps:
  - name: 'gcr.io/cloud-builders/git'
    args: ['clone', 'https://github.com/Trancendos/secrets-portal.git']
  
  - name: 'aquasec/trivy:latest'
    args: ['image', '--severity', 'HIGH,CRITICAL', 'gcr.io/project/image:tag']
```

### Artifact Registry

Scan images in GCP Artifact Registry:

```yaml
- name: Scan GCP Artifact Registry
  run: |
    gcloud auth configure-docker us-central1-docker.pkg.dev
    docker pull us-central1-docker.pkg.dev/project/repo/image:tag
    trivy image us-central1-docker.pkg.dev/project/repo/image:tag
```

## Troubleshooting

### Issue: Workflow fails but no vulnerabilities shown

**Solution:**
- Check workflow logs for specific errors
- Verify all required secrets are configured
- Ensure npm dependencies are installable

### Issue: Docker scan skipped

**Solution:**
- Verify Dockerfiles exist in repository
- Check Dockerfile naming (must include "Dockerfile")
- Review docker build step logs

### Issue: Slack notifications not working

**Solution:**
- Verify `SLACK_WEBHOOK_URL` secret is set correctly
- Test webhook manually: `curl -X POST -H 'Content-type: application/json' --data '{"text":"Test"}' YOUR_WEBHOOK_URL`
- Check Slack app permissions

### Issue: False positives in scans

**Solution:**
- Review SARIF reports in artifacts
- Add suppressions in `.trivyignore` file
- Update to latest versions to get CVE fixes

### Issue: Branch protection not blocking

**Solution:**
- Ensure "Generate Security Report" is added as required check
- Verify branch protection rules are active
- Check if user has admin override permissions

## Performance Optimization

### Speed Up Scans

1. **Cache Dependencies:**
   - Already configured with `cache: npm`

2. **Use NVD API Key:**
   - Significantly speeds up OWASP checks
   - Add `NVD_API_KEY` secret

3. **Parallel Execution:**
   - Jobs run in parallel by default
   - Reduces total workflow time

4. **Selective Scanning:**
   - Docker scan only runs if Dockerfiles exist
   - IaC scan only checks relevant files

## Best Practices

1. **Fix Issues Promptly**: Don't let security debt accumulate
2. **Monitor Reports**: Review `SECURITY_SCAN_REPORT.md` regularly
3. **Update Dependencies**: Keep packages up to date
4. **Use Dependabot**: Enable automated security updates
5. **Test Locally**: Run scans before pushing
6. **Document Exceptions**: If suppressing issues, document why

## Local Testing

Run scans locally before pushing:

```bash
# NPM Audit
npm audit --audit-level=high

# Trivy filesystem scan
docker run --rm -v $(pwd):/scan aquasec/trivy fs --severity HIGH,CRITICAL /scan

# Trivy Docker scan
docker build -t myapp:test .
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image myapp:test

# Checkov IaC scan
pip install checkov
checkov -d .
```

## Maintenance

### Update Scanner Versions

Scanners are pinned to specific versions for stability. Update periodically:

```yaml
# In security-gating.yml
- uses: aquasecurity/trivy-action@0.28.0  # Check for newer version
- uses: bridgecrewio/checkov-action@v12   # Check for newer version
```

### Review Scan Results

Schedule regular reviews:
- **Daily**: Check new vulnerabilities via Slack
- **Weekly**: Review full security report
- **Monthly**: Audit all artifacts and trends

## Support

For issues or questions:
- GitHub Issues: https://github.com/Trancendos/secrets-portal/issues
- Security: security@trancendos.dev
- Documentation: See workflow file comments

## License

MIT License - See LICENSE file for details
