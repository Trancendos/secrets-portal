import { create } from 'zustand';
import { AppState, GitHubUser, GitHubSecret, AuditLog } from '@/types';

interface AppStore extends AppState {
  setToken: (token: string | null) => void;
  setUser: (user: GitHubUser | null) => void;
  setRepository: (repo: string) => void;
  setSecrets: (secrets: GitHubSecret[]) => void;
  addAuditLog: (log: AuditLog) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState: AppState = {
  token: null,
  user: null,
  repository: 'Trancendos/trancendos-ecosystem',
  secrets: [],
  auditLog: [],
  loading: false,
  error: null,
};

export const useAppStore = create<AppStore>((set) => ({
  ...initialState,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  setRepository: (repository) => set({ repository }),
  setSecrets: (secrets) => set({ secrets }),
  addAuditLog: (log) =>
    set((state) => ({
      auditLog: [log, ...state.auditLog].slice(0, 100),
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));

export default useAppStore;