import React from 'react';
import { useAppStore } from '@/store/appStore';
import { useNavigate } from 'react-router-dom';
import { LogOut, Github } from 'lucide-react';
import { clearToken } from '@/services/auth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, reset } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    reset();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-github-dark">
      <nav className="border-b border-github-border bg-github-lighter/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Github className="h-6 w-6 text-github-primary" />
              <span className="text-github-text font-semibold">Secrets Portal</span>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <>
                  <div className="flex items-center gap-2">
                    <img
                      src={user.avatar_url}
                      alt={user.login}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="text-github-text text-sm">{user.login}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-github-text/70 hover:text-github-text transition-colors flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;