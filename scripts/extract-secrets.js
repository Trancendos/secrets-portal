#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const SECRET_PATTERNS = {
  apiKey: /['"]?(?:api[_-]?key|apikey)['"]?\s*[:=]\s*['"]?([^'"\s]+)['"]?/gi,
  token: /['"]?(?:token|auth[_-]?token)['"]?\s*[:=]\s*['"]?([^'"\s]+)['"]?/gi,
  password: /['"]?(?:password|passwd|pwd)['"]?\s*[:=]\s*['"]?([^'"\s]+)['"]?/gi,
  secret: /['"]?(?:secret|client[_-]?secret)['"]?\s*[:=]\s*['"]?([^'"\s]+)['"]?/gi,
  key: /['"]?(?:private[_-]?key|private_key|privatekey)['"]?\s*[:=]\s*['"]?([^'"\s]+)['"]?/gi,
  url: /(?:http|https):\/\/[^\s]+/gi,
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  env: /^([A-Z_][A-Z0-9_]*)\s*=\s*(.+)$/gm,
};

function extractSecretsFromText(content) {
  const extracted = {
    apiKeys: [],
    tokens: [],
    passwords: [],
    secrets: [],
    keys: [],
    urls: [],
    emails: [],
    envVars: [],
  };

  // Extract env variables
  let match;
  while ((match = SECRET_PATTERNS.env.exec(content)) !== null) {
    extracted.envVars.push({
      name: match[1],
      value: match[2],
      confidence: 0.9,
    });
  }

  // Extract other patterns
  for (const [type, pattern] of Object.entries(SECRET_PATTERNS)) {
    if (type === 'env') continue;
    
    while ((match = pattern.exec(content)) !== null) {
      const key = type.endsWith('s') ? type : `${type}s`;
      extracted[key].push({
        value: match[1] || match[0],
        confidence: 0.7,
        pattern: type,
      });
    }
  }

  return extracted;
}

function formatOutput(secrets, format) {
  switch (format) {
    case 'json':
      return JSON.stringify(secrets, null, 2);
    
    case 'env':
      return Object.entries(secrets)
        .filter(([k, v]) => Array.isArray(v) && v.length > 0)
        .map(([k, v]) => `${k}="${JSON.stringify(v)}"`)
        .join('\n');
    
    case 'yaml':
      return Object.entries(secrets)
        .map(([k, v]) => `${k}:\n  ${JSON.stringify(v, null, 2).split('\n').join('\n  ')}`)
        .join('\n');
    
    case 'csv':
      const headers = Object.keys(secrets);
      const rows = [headers.join(',')];
      for (const [k, v] of Object.entries(secrets)) {
        if (Array.isArray(v)) {
          rows.push(`${k},${v.length},${JSON.stringify(v).replace(/,/g, ';')}`);
        }
      }
      return rows.join('\n');
    
    default:
      return JSON.stringify(secrets, null, 2);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const filePath = args[args.indexOf('--file') + 1] || 'secrets.env';
  const format = args[args.indexOf('--format') + 1] || 'json';

  try {
    // Read file
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract secrets
    const secrets = extractSecretsFromText(content);
    
    // Create output directory
    if (!fs.existsSync('output')) {
      fs.mkdirSync('output', { recursive: true });
    }
    
    // Write output
    const ext = format === 'env' ? 'env' : format;
    const outputPath = path.join('output', `extracted-secrets.${ext}`);
    const formattedOutput = formatOutput(secrets, format);
    
    fs.writeFileSync(outputPath, formattedOutput);
    
    console.log(`✅ Secrets extracted to ${outputPath}`);
    console.log(`📊 Found:`);
    console.log(`   - API Keys: ${secrets.apiKeys.length}`);
    console.log(`   - Tokens: ${secrets.tokens.length}`);
    console.log(`   - Passwords: ${secrets.passwords.length}`);
    console.log(`   - Environment Variables: ${secrets.envVars.length}`);
    
  } catch (error) {
    console.error('❌ Error extracting secrets:', error.message);
    process.exit(1);
  }
}

main();
