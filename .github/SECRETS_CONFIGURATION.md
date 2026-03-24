# GitHub Actions Secrets for Security Gating Workflow
# Configure these in: Repository Settings > Secrets and variables > Actions

# ============================================================================
# OPTIONAL SECRETS (Recommended for enhanced functionality)
# ============================================================================

# National Vulnerability Database (NVD) API Key
# Purpose: Speeds up OWASP Dependency Check and improves CVE detection accuracy
# Get from: https://nvd.nist.gov/developers/request-an-api-key
# Free tier: 50 requests per 30 seconds
# NVD_API_KEY=your-nvd-api-key-here

# Slack Webhook URL
# Purpose: Sends security alerts to Slack channel
# Create at: https://api.slack.com/messaging/webhooks
# Steps:
#   1. Go to https://api.slack.com/apps
#   2. Create new app or select existing
#   3. Enable "Incoming Webhooks"
#   4. Add webhook to workspace
#   5. Copy webhook URL
# SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

# ============================================================================
# GITHUB TOKEN (Automatically provided - no configuration needed)
# ============================================================================

# GitHub automatically provides GITHUB_TOKEN with permissions configured in workflow
# Used for:
#   - Uploading SARIF to Security tab
#   - Commenting on pull requests
#   - Committing security reports
# No manual configuration required

# ============================================================================
# GCP INTEGRATION (Optional - for Cloud Build and Artifact Registry)
# ============================================================================

# GCP Service Account Key (JSON)
# Purpose: Authenticate with GCP for scanning Artifact Registry images
# Create at: https://console.cloud.google.com/iam-admin/serviceaccounts
# Required roles:
#   - Artifact Registry Reader
#   - Cloud Build Editor (if using Cloud Build)
# GCP_SA_KEY={"type":"service_account","project_id":"..."}

# GCP Project ID
# Purpose: Specify which GCP project to scan
# GCP_PROJECT_ID=your-project-id

# ============================================================================
# DOCKER REGISTRY (Optional - for private registry scanning)
# ============================================================================

# Docker Hub credentials (if scanning private images)
# DOCKER_USERNAME=your-docker-username
# DOCKER_PASSWORD=your-docker-password-or-token

# Private registry credentials
# REGISTRY_URL=registry.example.com
# REGISTRY_USERNAME=your-username
# REGISTRY_PASSWORD=your-password

# ============================================================================
# CONFIGURATION NOTES
# ============================================================================

# How to add secrets to GitHub:
# 1. Go to your repository on GitHub
# 2. Click "Settings"
# 3. Click "Secrets and variables" > "Actions"
# 4. Click "New repository secret"
# 5. Enter name (e.g., "SLACK_WEBHOOK_URL") and value
# 6. Click "Add secret"

# Security best practices:
# - Rotate API keys regularly (every 90 days recommended)
# - Use least-privilege access for service accounts
# - Never commit secrets to version control
# - Use GitHub's secret scanning to detect leaked secrets
# - Audit secret usage regularly

# Testing without secrets:
# The workflow will run successfully even without optional secrets.
# Some features may be disabled or run with reduced functionality:
#   - Without NVD_API_KEY: Slower OWASP checks
#   - Without SLACK_WEBHOOK_URL: No Slack notifications
#   - Without GCP credentials: No GCP-specific scanning

# ============================================================================
# ENVIRONMENT VARIABLES (Set in workflow file, not as secrets)
# ============================================================================

# These are configured in .github/workflows/security-gating.yml
# and don't need to be set as repository secrets:

# GITHUB_TOKEN - Automatically provided by GitHub Actions
# GITHUB_REPOSITORY - Automatically set to "owner/repo"
# GITHUB_REF - Automatically set to branch/tag ref
# GITHUB_SHA - Automatically set to commit SHA
# GITHUB_ACTOR - Automatically set to user who triggered workflow
# GITHUB_RUN_ID - Automatically set to workflow run ID
# GITHUB_RUN_NUMBER - Automatically set to run number
