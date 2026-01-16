import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { storeToken } from '@/services/auth';
import GitHubAPI from '@/services/githubAPI';
import { Shield } from 'lucide-react';

const Callback: React.FC = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useAppStore();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const error = params.get('error');

        if (error) {
          throw new Error(error);
        }

        if (!code) {
          throw new Error('No authorization code received');
        }

        // In production, exchange code for token via backend
        // For now, we'll use the token if provided
        const token = params.get('access_token');
        if (token) {
          storeToken(token);
          setToken(token);

          const api = new GitHubAPI(token);
          const user = await api.getUser();
          setUser(user);

          navigate('/');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate, setToken, setUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-github-dark via-github-lighter to-github-dark flex items-center justify-center">
      <div className="text-center">
        <Shield className="h-16 w-16 mx-auto text-github-primary mb-4 animate-pulse" />
        <h1 className="text-2xl font-bold text-github-text">Authenticating...</h1>
        <p className="text-github-text/70 mt-2">Please wait while we verify your credentials</p>
      </div>
    </div>
  );
};

export default Callback;