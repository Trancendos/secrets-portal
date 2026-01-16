import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import GitHubAPI from '@/services/githubAPI';
import { validateSecretName, validateSecretValue } from '@/utils/validation';
import { AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface SecretFormProps {
  onSuccess: () => void;
}

const SecretForm: React.FC<SecretFormProps> = ({ onSuccess }) => {
  const { token, repository, addAuditLog } = useAppStore();
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('token');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateSecretName(name)) {
      setError('Invalid secret name. Use UPPER_SNAKE_CASE (A-Z, 0-9, _)');
      return;
    }

    if (!validateSecretValue(value)) {
      setError('Secret value must be between 1 and 65536 characters');
      return;
    }

    try {
      setLoading(true);

      if (!token) {
        throw new Error('Not authenticated');
      }

      const api = new GitHubAPI(token);
      const [owner, repo] = repository.split('/');

      await api.createSecret(owner, repo, name, value);

      addAuditLog({
        action: 'create',
        actor: 'user',
        secret: name,
        timestamp: new Date().toISOString(),
        status: 'success',
      });

      setName('');
      setValue('');
      toast.success(`Secret ${name} created successfully!`);
      onSuccess();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create secret';
      setError(message);
      toast.error(message);

      addAuditLog({
        action: 'create',
        actor: 'user',
        secret: name,
        timestamp: new Date().toISOString(),
        status: 'failed',
        message: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-github-lighter border border-github-border rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold text-github-text">Create New Secret</h2>

      <div>
        <label className="block text-sm font-medium text-github-text mb-2">Secret Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value.toUpperCase())}
          placeholder="MY_API_KEY"
          required
          className="w-full bg-github-dark border border-github-border text-github-text px-3 py-2 rounded focus:outline-none focus:border-github-primary"
        />
        <p className="text-xs text-github-text/60 mt-1">Use UPPER_SNAKE_CASE format</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-github-text mb-2">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full bg-github-dark border border-github-border text-github-text px-3 py-2 rounded focus:outline-none focus:border-github-primary"
        >
          <option value="token">API Token</option>
          <option value="password">Password</option>
          <option value="key">Key</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-github-text mb-2">Secret Value</label>
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="••••••••••••••••"
          required
          className="w-full bg-github-dark border border-github-border text-github-text px-3 py-2 rounded focus:outline-none focus:border-github-primary"
        />
      </div>

      {error && (
        <div className="bg-github-danger/10 border border-github-danger rounded p-3 flex gap-2">
          <AlertCircle className="h-5 w-5 text-github-danger flex-shrink-0" />
          <p className="text-sm text-github-danger">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-github-success hover:bg-github-success/90 disabled:opacity-50 text-white font-semibold py-2 rounded transition-colors"
      >
        {loading ? 'Creating...' : 'Create Secret'}
      </button>
    </form>
  );
};

export default SecretForm;