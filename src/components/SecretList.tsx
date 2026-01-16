import React, { useState } from 'react';
import { GitHubSecret } from '@/types';
import { useAppStore } from '@/store/appStore';
import GitHubAPI from '@/services/githubAPI';
import { formatDate, maskSecretValue } from '@/utils/validation';
import { Trash2, Copy, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

interface SecretListProps {
  secrets: GitHubSecret[];
  loading: boolean;
}

const SecretList: React.FC<SecretListProps> = ({ secrets, loading }) => {
  const { token, repository, addAuditLog } = useAppStore();
  const [visibleSecrets, setVisibleSecrets] = useState<Set<string>>(new Set());

  const toggleVisibility = (name: string) => {
    const newSet = new Set(visibleSecrets);
    if (newSet.has(name)) {
      newSet.delete(name);
    } else {
      newSet.add(name);
    }
    setVisibleSecrets(newSet);
  };

  const handleDelete = async (name: string) => {
    if (!window.confirm(`Delete secret ${name}?`)) return;

    try {
      if (!token) throw new Error('Not authenticated');

      const api = new GitHubAPI(token);
      const [owner, repo] = repository.split('/');

      await api.deleteSecret(owner, repo, name);

      addAuditLog({
        action: 'delete',
        actor: 'user',
        secret: name,
        timestamp: new Date().toISOString(),
        status: 'success',
      });

      toast.success(`Secret ${name} deleted`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete secret';
      toast.error(message);

      addAuditLog({
        action: 'delete',
        actor: 'user',
        secret: name,
        timestamp: new Date().toISOString(),
        status: 'failed',
        message,
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-github-text/70">Loading secrets...</div>;
  }

  if (secrets.length === 0) {
    return (
      <div className="bg-github-lighter border border-github-border rounded-lg p-12 text-center">
        <p className="text-github-text/70">No secrets found. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {secrets.map((secret) => (
        <div
          key={secret.name}
          className="bg-github-lighter border border-github-border rounded-lg p-4 flex items-center justify-between hover:border-github-primary transition-colors"
        >
          <div className="flex-1">
            <h3 className="text-github-text font-mono font-semibold">{secret.name}</h3>
            <p className="text-github-text/60 text-sm mt-1">
              Created: {formatDate(secret.created_at)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleVisibility(secret.name)}
              className="p-2 hover:bg-github-dark rounded transition-colors text-github-text/70 hover:text-github-text"
              title={visibleSecrets.has(secret.name) ? 'Hide' : 'Show'}
            >
              {visibleSecrets.has(secret.name) ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => handleDelete(secret.name)}
              className="p-2 hover:bg-github-danger/10 rounded transition-colors text-github-text/70 hover:text-github-danger"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecretList;