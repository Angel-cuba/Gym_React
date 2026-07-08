import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser, useSignIn, useSignUp, useClerk, useAuth as useClerkAuth } from "@clerk/clerk-react";
import { setTokenProvider } from "../lib/api";

export interface AppUser {
  id: string;
  email: string;
  displayName: string;
}

interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  loginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: Error | null; needsConfirmation: boolean; strategy?: "email_code" | "email_link" }>;
  verifyCode: (code: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const extractClerkError = (err: unknown): Error => {
  const message =
    (err as { errors?: { longMessage?: string }[] })?.errors?.[0]?.longMessage ??
    (err as Error).message;
  return new Error(message);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user: clerkUser, isLoaded } = useUser();
  const { signIn: clerkSignIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp: clerkSignUp, isLoaded: signUpLoaded } = useSignUp();
  const { signOut: clerkSignOut } = useClerk();
  const { getToken } = useClerkAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    setTokenProvider(() => getToken());
  }, [getToken]);

  const user: AppUser | null = clerkUser
    ? {
        id: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress ?? "",
        displayName:
          clerkUser.firstName ??
          clerkUser.primaryEmailAddress?.emailAddress?.split("@")[0] ??
          "Usuario",
      }
    : null;

  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<{ error: Error | null; needsConfirmation: boolean; strategy?: "email_code" | "email_link" }> => {
    if (!clerkSignUp || !signUpLoaded) {
      return { error: new Error("Auth not ready"), needsConfirmation: false };
    }
    try {
      const result = await clerkSignUp.create({
        emailAddress: email,
        password,
        firstName: displayName,
      });

      if (result.status === "complete") {
        return { error: null, needsConfirmation: false };
      }

      let strategy: "email_code" | "email_link" = "email_code";
      try {
        await clerkSignUp.prepareEmailAddressVerification({ strategy: "email_code" });
      } catch {
        strategy = "email_link";
        await clerkSignUp.prepareEmailAddressVerification({
          strategy: "email_link",
          redirectUrl: window.location.origin,
        });
      }
      return { error: null, needsConfirmation: true, strategy };
    } catch (err) {
      return { error: extractClerkError(err), needsConfirmation: false };
    }
  };

  const verifyCode = async (code: string): Promise<{ error: Error | null }> => {
    if (!clerkSignUp || !signUpLoaded) {
      return { error: new Error("Auth not ready") };
    }
    try {
      const result = await clerkSignUp.attemptEmailAddressVerification({ code });
      if (result.status === "complete") {
        return { error: null };
      }
      return { error: new Error("Verification incomplete") };
    } catch (err) {
      return { error: extractClerkError(err) };
    }
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<{ error: Error | null }> => {
    if (!clerkSignIn || !signInLoaded) {
      return { error: new Error("Auth not ready") };
    }
    try {
      await clerkSignIn.create({
        identifier: email,
        password,
      });
      return { error: null };
    } catch (err) {
      return { error: extractClerkError(err) };
    }
  };

  const signOut = async () => {
    await clerkSignOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: !isLoaded,
        loginModalOpen,
        openLoginModal: () => setLoginModalOpen(true),
        closeLoginModal: () => setLoginModalOpen(false),
        signUp,
        verifyCode,
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
