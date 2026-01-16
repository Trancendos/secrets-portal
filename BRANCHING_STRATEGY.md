# 🏷 Branching Strategy

## Overview

We use **Git Flow** with GitHub-specific adaptations.

## Branch Types

### main (Production)
```
- Always deployable
- Protected branch (PR required)
- Auto-deploys to https://trancendos.github.io/secrets-portal
- Use for releases and production
```

### feature/* (New Features)
```
Format: feature/kebab-case-name

Examples:
- feature/oauth-setup
- feature/create-secret
- feature/mobile-app
- feature/cli-tools

Create from: main
Merge back to: main (via PR)
Lifetime: Until merged
```

### bugfix/* (Bug Fixes)
```
Format: bugfix/kebab-case-name

Examples:
- bugfix/login-error
- bugfix/mobile-crash
- bugfix/ui-spacing

Create from: main
Merge back to: main (via PR)
Lifetime: Until merged
```

### docs/* (Documentation)
```
Format: docs/kebab-case-name

Examples:
- docs/oauth-guide
- docs/api-reference
- docs/deployment

Create from: main
Merge back to: main (via PR)
Lifetime: Until merged
```

## Workflow

### Creating a Feature

```bash
# 1. Start from main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Make changes
# ... edit files ...

# 4. Commit regularly
git add .
git commit -m "feat: add feature description"

# 5. Push to GitHub
git push origin feature/your-feature-name

# 6. Create PR on GitHub
gh pr create --draft

# 7. Get feedback, make changes
# ... address feedback ...

# 8. Mark as ready
gh pr ready

# 9. Merge when approved
gh pr merge --squash
```

### Branch Protection Rules

```
Branch: main
Rules:
✅ Require pull request reviews (1+)
✅ Require status checks to pass
✅ Require branches to be up to date
✅ Include administrators in restrictions
✅ Require code reviews before merging
```

## Naming Conventions

**Good**:
- feature/oauth-login
- feature/create-secret
- bugfix/null-pointer
- docs/getting-started

**Bad**:
- feature1
- WIP
- Temp
- fix-stuff

## Merging

**Squash and Merge** (recommended):
- Combines all commits into one
- Keeps history clean
- Good for features

**Create Merge Commit**:
- Preserves all commits
- Shows exact history
- Good for complex features

**Rebase and Merge**:
- Replays commits on main
- Linear history
- Use cautiously

## Cleanup

```bash
# Delete local branch
git branch -d feature/your-feature-name

# Delete remote branch (automatic with GitHub PR squash)
# Or manually:
git push origin --delete feature/your-feature-name

# List remaining branches
git branch -a
```
