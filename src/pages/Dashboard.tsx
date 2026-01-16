import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store/appStore';
import GitHubAPI from '@/services/githubAPI';
import SecretForm from '@/components/SecretForm';
import SecretList from '@/components/SecretList';
import AuditLog from '@/components/AuditLog';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const { token, repository, secrets, setSecrets, setLoading, setError, loading } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'secrets' | 'audit'>('secrets');

  useEffect(() => {
    if (!token) return;

    const loadSecrets = async () => {
      try {
        setLoading(true);
        const api = new GitHubAPI(token);
        const [owner, repo] = repository.split('/');
        const data = await api.getSecrets(owner, repo);
        setSecrets(data);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load secrets';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    loadSecrets();
  }, [token, repository]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-github-text">Secrets Dashboard</h1>
          <p className="text-github-text/70 mt-1">Repository: {repository}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-github-primary hover:bg-github-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          New Secret
        </button>
      </div>

      {showForm && (
        <SecretForm
          onSuccess={() => {
            setShowForm(false);
            toast.success('Secret created successfully!');
          }}
        />
      )}

      <div className="border-b border-github-border">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('secrets')}
            className={`pb-2 px-1 border-b-2 transition-colors ${
              activeTab === 'secrets'
                ? 'border-github-primary text-github-primary'
                : 'border-transparent text-github-text/70 hover:text-github-text'
            }`}
          >
            Secrets ({secrets.length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-2 px-1 border-b-2 transition-colors ${
              activeTab === 'audit'
                ? 'border-github-primary text-github-primary'
                : 'border-transparent text-github-text/70 hover:text-github-text'
            }`}
          >
            Audit Log
          </button>
        </div>
      </div>

      {activeTab === 'secrets' ? (
        <SecretList secrets={secrets} loading={loading} />
      ) : (
        <AuditLog />
      )}
    </div>
  );
};

export default Dashboard;