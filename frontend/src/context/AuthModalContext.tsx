"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export type AuthMode = "signin" | "register";

interface AuthModalContextType {
  isOpen: boolean;
  mode: AuthMode;
  openSignIn: () => void;
  openRegister: () => void;
  closeAuthModal: () => void;
  setMode: (mode: AuthMode) => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signin");

  const openSignIn = useCallback(() => {
    setMode("signin");
    setIsOpen(true);
  }, []);

  const openRegister = useCallback(() => {
    setMode("register");
    setIsOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Listen to Escape key to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        mode,
        openSignIn,
        openRegister,
        closeAuthModal,
        setMode,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
}
