const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID || '';
const REDIRECT_URI = process.env.REACT_APP_GITHUB_REDIRECT_URI || '';

export const getGitHubAuthUrl = (): string => {
  const scopes = ['repo', 'admin:repo_hook'];
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: scopes.join(' '),
    allow_signup: 'false',
  });
  return `https://github.com/login/oauth/authorize?${params.toString()}`;
};

export const getTokenFromUrl = (): string | null => {
  const params = new URLSearchParams(window.location.search);
  return params.get('access_token');
};

export const getStoredToken = (): string | null => {
  return sessionStorage.getItem('github_token');
};

export const storeToken = (token: string): void => {
  sessionStorage.setItem('github_token', token);
  // Auto-clear on tab close
  window.addEventListener('beforeunload', () => {
    sessionStorage.removeItem('github_token');
  });
};

export const clearToken = (): void => {
  sessionStorage.removeItem('github_token');
};

export const isAuthenticated = (): boolean => {
  return !!getStoredToken();
};