import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Lock, Shield } from 'lucide-react';
import { getGitHubAuthUrl } from '@/services/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleGitHubLogin = () => {
    window.location.href = getGitHubAuthUrl();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-github-dark via-github-lighter to-github-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Shield className="h-16 w-16 mx-auto text-github-primary mb-4" />
          <h1 className="text-4xl font-bold text-github-text">Secrets Portal</h1>
          <p className="text-github-text/70 mt-2">Zero-cost GitHub Secrets Management</p>
        </div>

        <div className="bg-github-lighter rounded-lg border border-github-border p-8 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-github-text">Features</h2>
            <ul className="space-y-2 text-github-text/80 text-sm">
              <li className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-github-success" />
                <span>AES-256 Encrypted Secrets</span>
              </li>
              <li className="flex items-center gap-2">
                <Github className="h-4 w-4 text-github-success" />
                <span>GitHub OAuth Authentication</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-github-success" />
                <span>Audit Logging</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleGitHubLogin}
            className="w-full bg-github-primary hover:bg-github-primary/90 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Github className="h-5 w-5" />
            Sign in with GitHub
          </button>
        </div>

        <p className="text-center text-github-text/60 text-xs">
          Secure. Private. Open Source.
        </p>
      </div>
    </div>
  );
};

export default Login;