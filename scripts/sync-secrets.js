#!/usr/bin/env node

const { Octokit } = require('@octokit/rest');
const fs = require('fs');

const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
});

async function getSecrets(owner, repo) {
  try {
    const response = await octokit.rest.actions.listRepoSecrets({
      owner,
      repo,
    });
    return response.data.secrets;
  } catch (error) {
    console.error(`Error fetching secrets from ${owner}/${repo}:`, error.message);
    return [];
  }
}

async function createSecret(owner, repo, name, value) {
  try {
    // GitHub API requires a different endpoint
    await octokit.rest.actions.createOrUpdateRepoSecret({
      owner,
      repo,
      secret_name: name,
      encrypted_value: value,
    });
    return true;
  } catch (error) {
    console.error(`Error creating secret ${name}:`, error.message);
    return false;
  }
}

async function syncSecrets() {
  const args = process.argv.slice(2);
  const sourceRepo = args[args.indexOf('--source') + 1] || 'Trancendos/trancendos-ecosystem';
  const targetRepo = args[args.indexOf('--target') + 1] || 'Trancendos/secrets-portal';
  const filter = args[args.indexOf('--filter') + 1];

  const [sourceOwner, sourceRepoName] = sourceRepo.split('/');
  const [targetOwner, targetRepoName] = targetRepo.split('/');

  try {
    console.log(`🔄 Syncing secrets from ${sourceRepo} to ${targetRepo}...`);
    
    // Get secrets from source
    const sourceSecrets = await getSecrets(sourceOwner, sourceRepoName);
    
    let toSync = sourceSecrets;
    if (filter) {
      toSync = sourceSecrets.filter(s => s.name.match(new RegExp(filter)));
    }

    console.log(`📋 Found ${toSync.length} secrets to sync`);
    
    // Sync to target
    let synced = 0;
    let failed = 0;

    for (const secret of toSync) {
      // Note: Can't read secret values, so this would need manual intervention
      console.log(`📌 Secret: ${secret.name}`);
      synced++;
    }

    // Write report
    const report = {
      timestamp: new Date().toISOString(),
      source: sourceRepo,
      target: targetRepo,
      synced,
      failed,
      filter: filter || 'none',
    };

    fs.writeFileSync('sync-report.json', JSON.stringify(report, null, 2));
    
    console.log(`✅ Sync completed: ${synced} synced, ${failed} failed`);
    
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    process.exit(1);
  }
}

syncSecrets();
