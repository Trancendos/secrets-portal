# Security Policy

## 🔒 Security Standards

This document outlines the security measures and best practices for Secrets Portal.

## Encryption

### Data at Rest
- All secrets encrypted with AES-256 by GitHub
- Keys never stored in repository
- No local secret storage

### Data in Transit
- HTTPS/TLS 1.2+ enforced
- GitHub API v3 over HTTPS
- No cleartext transmission

### In Memory
- Secrets masked in logs
- Auto-clear on page leave
- Session storage (not localStorage)
- Auto-logout on tab close

## Authentication

- GitHub OAuth 2.0 (industry standard)
- No password storage
- Token refresh on new session
- Automatic logout after inactivity

## Authorization

- Only authenticated users can access
- Repository-level permissions enforced
- No elevation of privileges
- Audit logging of all actions

## Audit Trail

All operations logged:
- Who: GitHub username
- What: Secret name, action
- When: Timestamp
- Status: Success/failure
- Details: Error messages

## Secret Rotation

1. **Monthly**: Review audit logs
2. **Quarterly**: Rotate sensitive tokens
3. **On leak**: Immediately delete and recreate

## Vulnerability Disclosure

If you discover a security vulnerability:

1. **DO NOT** create a public GitHub issue
2. Email: security@trancendos.dev
3. Include proof of concept (if safe)
4. Allow 90 days for patch before disclosure

## Compliance

- ✅ GDPR compliant (no PII storage)
- ✅ SOC 2 considerations
- ✅ HIPAA compatible
- ✅ PCI DSS compatible
- ✅ ISO 27001 aligned

## Best Practices

### DO
- Use strong, unique GitHub tokens
- Rotate secrets regularly
- Monitor audit logs
- Use specific GitHub apps for each integration
- Enable two-factor authentication
- Keep dependencies updated

### DON'T
- Share secret values
- Commit secrets to version control
- Log secret values
- Share GitHub tokens
- Use weak authentication
- Ignore security updates

## Dependencies Security

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies
npm update
```

## Rate Limiting

GitHub API rate limits:
- **Authenticated**: 5,000 requests/hour
- **Unauthenticated**: 60 requests/hour

Monitor with:
```bash
gh api rate_limit
```

## Incident Response

### If secret is compromised:

1. Immediately delete from repository
2. Rotate the actual credential (API key, token, etc.)
3. Check audit logs for unauthorized access
4. Review and update other secrets
5. Document incident

### If access is unauthorized:

1. Log out of all sessions
2. Review recent activity in audit log
3. Change GitHub password
4. Enable two-factor authentication
5. Revoke suspicious tokens

## Security Updates

Monitor for updates:
```bash
npm outdated
npm audit
gh dependabot view
```

Automate security:
```bash
# Enable Dependabot
gh secret set GITHUB_TOKEN --body "token"
```

## Third-Party Security

- GitHub (secrets storage): SOC 2 certified
- GitHub Pages (hosting): enterprise-grade security
- React (frontend): actively maintained
- Zustand (state): minimal dependencies

## Version History

| Version | Date | Changes |
|---------|------|----------|
| 1.0.0 | 2026-01-16 | Initial release |

## Questions?

Email: security@trancendos.dev
