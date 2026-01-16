#!/usr/bin/env node

const yargs = require('yargs');
const chalk = require('chalk');
const GitHubAPI = require('./githubAPI');

const api = new GitHubAPI(process.env.GITHUB_TOKEN || '');

const argv = yargs
  .option('token', {
    alias: 't',
    describe: 'GitHub Personal Access Token',
    default: process.env.GITHUB_TOKEN,
  })
  .option('repo', {
    alias: 'r',
    describe: 'Repository (owner/repo)',
    default: 'Trancendos/secrets-portal',
  })
  .command(
    'list',
    'List all secrets in repository',
    (yargs) => yargs,
    async (argv) => {
      try {
        const [owner, repo] = argv.repo.split('/');
        const secrets = await api.getSecrets(owner, repo);
        
        console.log(chalk.blue(`\n🔐 Secrets in ${argv.repo}:\n`));
        
        if (secrets.length === 0) {
          console.log(chalk.yellow('No secrets found'));
          return;
        }
        
        secrets.forEach((secret, i) => {
          console.log(`${i + 1}. ${chalk.bold(secret.name)}`);
          console.log(`   Created: ${secret.created_at}`);
          console.log(`   Updated: ${secret.updated_at}`);
        });
      } catch (error) {
        console.error(chalk.red('Error listing secrets:', error.message));
      }
    }
  )
  .command(
    'create <name>',
    'Create a new secret',
    (yargs) => yargs
      .positional('name', {
        describe: 'Secret name',
      })
      .option('value', {
        alias: 'v',
        describe: 'Secret value',
        prompt: true,
        type: 'password',
      }),
    async (argv) => {
      try {
        const [owner, repo] = argv.repo.split('/');
        await api.createSecret(owner, repo, argv.name, argv.value);
        console.log(chalk.green(`✅ Secret ${argv.name} created successfully!`));
      } catch (error) {
        console.error(chalk.red('Error creating secret:', error.message));
      }
    }
  )
  .command(
    'delete <name>',
    'Delete a secret',
    (yargs) => yargs
      .positional('name', {
        describe: 'Secret name',
      }),
    async (argv) => {
      try {
        const [owner, repo] = argv.repo.split('/');
        await api.deleteSecret(owner, repo, argv.name);
        console.log(chalk.green(`✅ Secret ${argv.name} deleted successfully!`));
      } catch (error) {
        console.error(chalk.red('Error deleting secret:', error.message));
      }
    }
  )
  .help()
  .argv;
