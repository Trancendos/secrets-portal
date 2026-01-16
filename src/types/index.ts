export interface GitHubSecret {
  name: string;
  created_at: string;
  updated_at: string;
  visibility: string;
}

export interface Secret {
  name: string;
  value: string;
  type: 'token' | 'password' | 'key' | 'other';
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuditLog {
  action: 'create' | 'delete' | 'list' | 'export';
  actor: string;
  secret: string;
  timestamp: string;
  status: 'success' | 'failed';
  message?: string;
}

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  email?: string;
}

export interface ExtractedSecret {
  name: string;
  value: string;
  type: string;
  confidence: number;
  line?: number;
}

export interface AppState {
  token: string | null;
  user: GitHubUser | null;
  repository: string;
  secrets: GitHubSecret[];
  auditLog: AuditLog[];
  loading: boolean;
  error: string | null;
}