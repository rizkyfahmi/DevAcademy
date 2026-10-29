"use client";

import { AuthModalProvider } from "@/context/AuthModalContext";
import { AuthProvider } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";

function AppShellInner({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthModalProvider>
        <AuthModal />
        <AppShellInner>{children}</AppShellInner>
      </AuthModalProvider>
    </AuthProvider>
  );
}

