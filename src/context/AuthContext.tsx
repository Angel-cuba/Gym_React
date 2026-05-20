import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  loginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: Error | null; needsConfirmation: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const SESSION_START_KEY = "gymlab_session_start";
const SESSION_LIMIT_MS = 72 * 60 * 60 * 1000; // 72 horas

const isSessionExpired = (): boolean => {
  const stored = localStorage.getItem(SESSION_START_KEY);
  if (!stored) return false;
  return Date.now() - parseInt(stored, 10) > SESSION_LIMIT_MS;
};

/** Limpia el timestamp y cierra sesión en Supabase. El estado React se
 *  actualiza via onAuthStateChange, por eso no recibe setters. */
const expireSession = async (): Promise<void> => {
  localStorage.removeItem(SESSION_START_KEY);
  await supabase.auth.signOut();
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    // Verificar sesión al montar — forzar logout si expiró las 72 h
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && isSessionExpired()) {
        expireSession();
      } else {
        setSession(session);
        setUser(session?.user ?? null);
      }
      setLoading(false);
    });

    // Escuchar cambios de auth (refresh de token, logout desde otra pestaña, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Revisión periódica cada 30 minutos para sesiones largas abiertas
    const expiryInterval = setInterval(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && isSessionExpired()) {
        expireSession();
      }
    }, 30 * 60 * 1000);

    return () => {
      subscription.unsubscribe();
      clearInterval(expiryInterval);
    };
  }, []);

  const signUp = async (email: string, password: string, displayName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    });
    if (!error && data.session) {
      localStorage.setItem(SESSION_START_KEY, String(Date.now()));
    }
    return {
      error: error as Error | null,
      needsConfirmation: !error && !data.session,
    };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) {
      localStorage.setItem(SESSION_START_KEY, String(Date.now()));
    }
    return { error: error as Error | null };
  };

  const signOut = async () => {
    localStorage.removeItem(SESSION_START_KEY);
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        loginModalOpen,
        openLoginModal: () => setLoginModalOpen(true),
        closeLoginModal: () => setLoginModalOpen(false),
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
