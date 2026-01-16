import axios, { AxiosInstance } from 'axios';
import { GitHubSecret, GitHubUser } from '@/types';

const GITHUB_API = 'https://api.github.com';

export class GitHubAPI {
  private client: AxiosInstance;
  private token: string;

  constructor(token: string) {
    this.token = token;
    this.client = axios.create({
      baseURL: GITHUB_API,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
  }

  async getUser(): Promise<GitHubUser> {
    const response = await this.client.get('/user');
    return response.data;
  }

  async getSecrets(owner: string, repo: string): Promise<GitHubSecret[]> {
    try {
      const response = await this.client.get(
        `/repos/${owner}/${repo}/actions/secrets`
      );
      return response.data.secrets || [];
    } catch (error) {
      console.error('Error fetching secrets:', error);
      throw error;
    }
  }

  async createSecret(
    owner: string,
    repo: string,
    name: string,
    value: string
  ): Promise<{ status: string }> {
    // GitHub API doesn't directly support secret creation from REST API
    // This is handled via workflow dispatch
    try {
      const response = await this.client.post(
        `/repos/${owner}/${repo}/dispatches`,
        {
          event_type: 'create-secret',
          client_payload: {
            secret_name: name,
            secret_value: value,
            timestamp: new Date().toISOString(),
          },
        }
      );
      return { status: 'pending' };
    } catch (error) {
      console.error('Error creating secret:', error);
      throw error;
    }
  }

  async deleteSecret(
    owner: string,
    repo: string,
    name: string
  ): Promise<{ status: string }> {
    try {
      await this.client.delete(
        `/repos/${owner}/${repo}/actions/secrets/${name}`
      );
      return { status: 'deleted' };
    } catch (error) {
      console.error('Error deleting secret:', error);
      throw error;
    }
  }

  async createAuditIssue(
    owner: string,
    repo: string,
    action: string,
    details: string
  ): Promise<{ issue_number: number }> {
    try {
      const response = await this.client.post(
        `/repos/${owner}/${repo}/issues`,
        {
          title: `🔐 Secrets Audit: ${action}`,
          body: `**Action**: ${action}\n\n**Details**: ${details}\n\n**Timestamp**: ${new Date().toISOString()}`,
          labels: ['audit', 'secrets'],
        }
      );
      return { issue_number: response.data.number };
    } catch (error) {
      console.error('Error creating audit issue:', error);
      throw error;
    }
  }
}

export default GitHubAPI;