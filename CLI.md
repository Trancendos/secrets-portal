# Secrets Portal CLI

## Installation

```bash
npm install -g secrets-portal-cli
```

## Usage

### List Secrets

```bash
secrets list --repo Trancendos/trancendos-ecosystem
```

### Create Secret

```bash
secrets create MY_API_KEY \
  --value "your-secret-value" \
  --repo Trancendos/trancendos-ecosystem
```

### Delete Secret

```bash
secrets delete MY_API_KEY \
  --repo Trancendos/trancendos-ecosystem
```

### Extract from File

```bash
secrets extract --file .env --format json
```

### Sync Secrets

```bash
secrets sync \
  --source Trancendos/trancendos-ecosystem \
  --target Trancendos/secrets-portal \
  --filter "PROD_*"
```

## Environment Variables

- `GITHUB_TOKEN` - GitHub Personal Access Token (required)

## Examples

### Create from prompt

```bash
secrets create DATABASE_URL
# Enter value when prompted
```

### List with JSON output

```bash
secrets list --repo Trancendos/trancendos-ecosystem --output json
```

### Batch extract secrets

```bash
for file in *.env*; do
  secrets extract --file "$file" --format csv >> all-secrets.csv
done
```
