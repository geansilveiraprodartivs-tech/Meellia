import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  recoverPassword: (email: string) => Promise<void>;
  signOut: () => void;
  updateProfile: (name: string) => void;
  changePassword: (current: string, next: string) => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

// Visual-only auth. Supabase integration will replace this later.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = useCallback(async (email: string, _password: string) => {
    const name = email.split('@')[0]?.replace(/[._-]/g, ' ') || 'Criadora';
    setUser({ email, name: name.charAt(0).toUpperCase() + name.slice(1) });
  }, []);

  const signUp = useCallback(async (name: string, email: string, _password: string) => {
    setUser({ name, email });
  }, []);

  const recoverPassword = useCallback(async (_email: string) => {
    // placeholder for future Supabase reset flow
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  const updateProfile = useCallback((name: string) => {
    setUser((prev) => (prev ? { ...prev, name } : prev));
  }, []);

  const changePassword = useCallback(async (_current: string, _next: string) => {
    // placeholder for future Supabase update
  }, []);

  const value = useMemo<AuthState>(
    () => ({ user, signIn, signUp, recoverPassword, signOut, updateProfile, changePassword }),
    [user, signIn, signUp, recoverPassword, signOut, updateProfile, changePassword],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
