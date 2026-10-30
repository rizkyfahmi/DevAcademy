"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { syncWithTiDBCloud } from "@/lib/user-progress-store";

export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string | null;
  lastName?: string | null;
  role: string;
  avatarUrl?: string | null;
}

export interface ProviderSetupInfo {
  envRequired: string[];
  callbackUrl: string;
  guideUrl: string;
  instructions: string;
}

export interface ProviderStatus {
  enabled: boolean;
  name: string;
  setupInfo: ProviderSetupInfo | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  providers: Record<string, ProviderStatus>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    newsletter?: boolean;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loginWithPasskey: (email?: string) => Promise<{ success: boolean; error?: string }>;
  registerPasskey: (deviceName?: string) => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to convert base64url to ArrayBuffer for WebAuthn
function base64UrlToBuffer(base64Url: string): ArrayBuffer {
  const padding = "=".repeat((4 - (base64Url.length % 4)) % 4);
  const base64 = (base64Url + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const buffer = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    buffer[i] = rawData.charCodeAt(i);
  }
  return buffer.buffer;
}

// Helper to convert ArrayBuffer to base64url for WebAuthn
function bufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

const ACTIVE_USER_KEY = "devacademy_active_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const cached = localStorage.getItem(ACTIVE_USER_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState<Record<string, ProviderStatus>>({});
  const router = useRouter();

  const persistActiveUser = useCallback((nextUser: User | null) => {
    setUser(nextUser);
    if (typeof window !== "undefined") {
      try {
        if (nextUser) {
          localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(nextUser));
          syncWithTiDBCloud(nextUser).catch(() => {});
        } else {
          localStorage.removeItem(ACTIVE_USER_KEY);
        }
      } catch {}
    }
  }, []);

  // 1. Fetch current session on mount
  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await res.json();
      if (data.authenticated && data.user) {
        persistActiveUser(data.user);
      } else {
        persistActiveUser(null);
      }
    } catch (err) {
      console.warn("[AuthContext] Failed to check user session:", err);
      persistActiveUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Fetch OAuth provider status
  const checkProviders = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/config-status");
      const data = await res.json();
      if (data.providers) {
        setProviders(data.providers);
      }
    } catch (err) {
      console.warn("[AuthContext] Failed to fetch provider status:", err);
    }
  }, []);

  useEffect(() => {
    refreshUser();
    checkProviders();
  }, [refreshUser, checkProviders]);

  // 3. Email & Password Login
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Login failed. Please try again." };
      }

      persistActiveUser(data.user);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error. Please try again." };
    }
  };

  // 4. Registration
  const register = async (data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    newsletter?: boolean;
  }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await res.json();

      if (!res.ok || !resData.success) {
        return { success: false, error: resData.error || "Registration failed." };
      }

      persistActiveUser(resData.user);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error. Please try again." };
    }
  };

  // 5. Logout
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("[Logout Error]:", err);
    } finally {
      persistActiveUser(null);
      router.push("/");
      router.refresh();
    }
  };

  // 6. Passkey Login (WebAuthn)
  const loginWithPasskey = async (email?: string): Promise<{ success: boolean; error?: string }> => {
    if (typeof window === "undefined" || !window.PublicKeyCredential) {
      return {
        success: false,
        error: "WebAuthn / Passkeys are not supported on this browser or platform.",
      };
    }

    try {
      // Step A: Get login challenge options
      const optRes = await fetch("/api/auth/passkey/generate-options", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "login", email }),
      });
      const optData = await optRes.json();

      if (!optRes.ok || !optData.options) {
        return { success: false, error: optData.error || "Failed to initialize passkey request." };
      }

      const options = optData.options;
      const publicKeyCredentialRequestOptions: CredentialRequestOptions = {
        publicKey: {
          challenge: base64UrlToBuffer(options.challenge),
          timeout: options.timeout || 60000,
          rpId: options.rpId,
          userVerification: options.userVerification || "preferred",
          allowCredentials: options.allowCredentials?.map((c: any) => ({
            id: base64UrlToBuffer(c.id),
            type: c.type,
            transports: c.transports,
          })),
        },
      };

      // Step B: Prompt browser passkey dialog
      const assertion = (await navigator.credentials.get(
        publicKeyCredentialRequestOptions
      )) as PublicKeyCredential | null;

      if (!assertion) {
        return { success: false, error: "Passkey authentication was cancelled." };
      }

      const rawResponse = assertion.response as AuthenticatorAssertionResponse;

      // Step C: Verify with backend
      const verifyRes = await fetch("/api/auth/passkey/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "login",
          challenge: options.challenge,
          credential: {
            id: assertion.id,
            rawId: bufferToBase64Url(assertion.rawId),
            type: assertion.type,
            response: {
              authenticatorData: bufferToBase64Url(rawResponse.authenticatorData),
              clientDataJSON: bufferToBase64Url(rawResponse.clientDataJSON),
              signature: bufferToBase64Url(rawResponse.signature),
              userHandle: rawResponse.userHandle
                ? bufferToBase64Url(rawResponse.userHandle)
                : null,
            },
          },
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || !verifyData.success) {
        return { success: false, error: verifyData.error || "Passkey verification failed." };
      }

      setUser(verifyData.user);
      return { success: true };
    } catch (err: any) {
      if (err.name === "NotAllowedError") {
        return { success: false, error: "Passkey prompt was cancelled or timed out." };
      }
      return { success: false, error: err.message || "Failed to authenticate with passkey." };
    }
  };

  // 7. Register new Passkey for current user
  const registerPasskey = async (
    deviceName?: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (typeof window === "undefined" || !window.PublicKeyCredential) {
      return {
        success: false,
        error: "WebAuthn / Passkeys are not supported on this browser or platform.",
      };
    }

    try {
      const optRes = await fetch("/api/auth/passkey/generate-options", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "register" }),
      });
      const optData = await optRes.json();

      if (!optRes.ok || !optData.options) {
        return { success: false, error: optData.error || "Failed to initialize passkey registration." };
      }

      const options = optData.options;
      const publicKeyCredentialCreationOptions: CredentialCreationOptions = {
        publicKey: {
          challenge: base64UrlToBuffer(options.challenge),
          rp: options.rp,
          user: {
            id: base64UrlToBuffer(options.user.id),
            name: options.user.name,
            displayName: options.user.displayName,
          },
          pubKeyCredParams: options.pubKeyCredParams,
          timeout: options.timeout,
          attestation: options.attestation || "none",
          authenticatorSelection: options.authenticatorSelection,
          excludeCredentials: options.excludeCredentials?.map((c: any) => ({
            id: base64UrlToBuffer(c.id),
            type: c.type,
            transports: c.transports,
          })),
        },
      };

      const credential = (await navigator.credentials.create(
        publicKeyCredentialCreationOptions
      )) as PublicKeyCredential | null;

      if (!credential) {
        return { success: false, error: "Passkey creation was cancelled." };
      }

      const rawResponse = credential.response as AuthenticatorAttestationResponse;

      const verifyRes = await fetch("/api/auth/passkey/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "register",
          challenge: options.challenge,
          deviceName: deviceName || "This Device",
          credential: {
            id: credential.id,
            rawId: bufferToBase64Url(credential.rawId),
            type: credential.type,
            response: {
              clientDataJSON: bufferToBase64Url(rawResponse.clientDataJSON),
              attestationObject: bufferToBase64Url(rawResponse.attestationObject),
              publicKey: rawResponse.getPublicKey
                ? bufferToBase64Url(rawResponse.getPublicKey()!)
                : credential.id,
            },
          },
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || !verifyData.success) {
        return { success: false, error: verifyData.error || "Failed to register passkey." };
      }

      return { success: true };
    } catch (err: any) {
      if (err.name === "NotAllowedError") {
        return { success: false, error: "Passkey creation was cancelled or timed out." };
      }
      return { success: false, error: err.message || "Failed to register passkey." };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        providers,
        login,
        register,
        logout,
        loginWithPasskey,
        registerPasskey,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
