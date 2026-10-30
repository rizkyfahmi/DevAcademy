"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, X, Check, AlertCircle, KeyRound } from "lucide-react";
import { useAuthModal } from "@/context/AuthModalContext";
import { useAuth } from "@/context/AuthContext";
import { OAuthSetupModal } from "./OAuthSetupModal";

export function AuthModal() {
  const { isOpen, mode, closeAuthModal, setMode } = useAuthModal();
  const { login, register, loginWithPasskey, providers } = useAuth();
  const router = useRouter();

  // Form states
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newsletter, setNewsletter] = useState(true);

  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passkeyLoading, setPasskeyLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Setup modal for unconfigured OAuth
  const [setupProvider, setSetupProvider] = useState<{
    name: string;
    info: any;
  } | null>(null);

  const handleOAuthClick = (providerKey: "google" | "github") => {
    setErrorMessage(null);
    const provider = providers[providerKey];

    // If OAuth credentials are not yet added to env, show guidance modal
    if (!provider?.enabled && provider?.setupInfo) {
      setSetupProvider({
        name: provider.name,
        info: provider.setupInfo,
      });
      return;
    }

    // Direct OAuth redirect
    window.location.href = `/api/auth/oauth/${providerKey}`;
  };

  const handlePasskeyClick = async () => {
    setErrorMessage(null);
    setPasskeyLoading(true);

    try {
      const res = await loginWithPasskey(email.trim() || undefined);
      if (res.success) {
        setSuccessToast("Passkey verified successfully! Redirecting...");
        setTimeout(() => {
          setSuccessToast(null);
          closeAuthModal();
          router.push("/dashboard");
          router.refresh();
        }, 800);
      } else {
        setErrorMessage(res.error || "Passkey login failed.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Passkey authentication error.");
    } finally {
      setPasskeyLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    if (mode === "signin") {
      const res = await login(email, password);
      setIsSubmitting(false);

      if (!res.success) {
        setErrorMessage(res.error || "Invalid credentials.");
        return;
      }

      setSuccessToast("Successfully signed in! Redirecting to Dashboard...");
      setTimeout(() => {
        setSuccessToast(null);
        closeAuthModal();
        router.push("/dashboard");
        router.refresh();
      }, 700);
    } else {
      const res = await register({
        email,
        password,
        firstName,
        lastName,
        newsletter,
      });
      setIsSubmitting(false);

      if (!res.success) {
        setErrorMessage(res.error || "Registration failed.");
        return;
      }

      setSuccessToast("Account created successfully! Welcome to DevAcademy.");
      setTimeout(() => {
        setSuccessToast(null);
        closeAuthModal();
        router.push("/dashboard");
        router.refresh();
      }, 700);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="w3-auth-backdrop" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeAuthModal();
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
          >
            <motion.div 
              className="w3-auth-modal"
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{
                type: "spring",
                damping: 26,
                stiffness: 350,
                mass: 0.85,
              }}
            >
              {/* Close Button */}
              <motion.button 
                type="button" 
                className="w3-auth-close-btn" 
                onClick={closeAuthModal}
                aria-label="Close modal"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
              >
                <X style={{ width: 20, height: 20 }} />
              </motion.button>

          {/* Success Toast */}
          {successToast && (
            <div className="w3-auth-toast">
              <Check style={{ width: 16, height: 16, color: "#04aa6d" }} />
              <span>{successToast}</span>
            </div>
          )}

          {/* Error Message Box */}
          {errorMessage && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 14px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: 8,
                color: "#b91c1c",
                fontSize: 13,
                marginBottom: 14,
                lineHeight: 1.4,
              }}
            >
              <AlertCircle style={{ width: 18, height: 18, flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* ------------------------------------------------------------------ */}
          {/* SIGN IN VIEW                                                      */}
          {/* ------------------------------------------------------------------ */}
          {mode === "signin" ? (
            <div className="w3-auth-content">
              <h2 id="auth-modal-title" className="w3-auth-title">
                Sign in
              </h2>
              <p className="w3-auth-subtitle">
                Get access to more learning features
              </p>

              <div className="w3-auth-switch-box">
                <span>Don&apos;t have an account? </span>
                <button 
                  type="button" 
                  className="w3-auth-switch-link"
                  onClick={() => {
                    setErrorMessage(null);
                    setMode("register");
                  }}
                >
                  Register
                </button>
              </div>

              {/* 5 Social & Passkey Logins */}
              <div className="w3-social-auth-row">
                {/* 1. Google */}
                <button 
                  type="button" 
                  className="w3-social-btn" 
                  aria-label="Sign in with Google"
                  title="Sign in with Google"
                  onClick={() => handleOAuthClick("google")}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </button>

                {/* 3. GitHub */}
                <button 
                  type="button" 
                  className="w3-social-btn" 
                  aria-label="Sign in with GitHub"
                  title="Sign in with GitHub"
                  onClick={() => handleOAuthClick("github")}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="#24292F">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </button>

                {/* 4. Passkey Login */}
                <button 
                  type="button" 
                  className="w3-social-btn" 
                  aria-label="Sign in with Passkey / Security Key"
                  title="Sign in with Passkey / Face ID / Touch ID / Windows Hello"
                  onClick={handlePasskeyClick}
                  disabled={passkeyLoading}
                  style={{ position: "relative" }}
                >
                  <KeyRound style={{ width: 19, height: 19, color: "#0284c7" }} />
                  {passkeyLoading && (
                    <span 
                      style={{ 
                        position: "absolute", 
                        bottom: -18, 
                        fontSize: 10, 
                        fontWeight: 700, 
                        color: "#0284c7", 
                        whiteSpace: "nowrap" 
                      }}
                    >
                      Authenticating...
                    </span>
                  )}
                </button>
              </div>

              <div className="w3-auth-divider">
                <span className="w3-divider-line" />
                <span className="w3-divider-text">or</span>
                <span className="w3-divider-line" />
              </div>

              {/* 5. Email & Password Sign In Form */}
              <form onSubmit={handleSubmit} className="w3-auth-form">
                <div className="w3-auth-field">
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w3-auth-input"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="w3-auth-field w3-password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w3-auth-input"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className="w3-eye-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff style={{ width: 18, height: 18 }} /> : <Eye style={{ width: 18, height: 18 }} />}
                  </button>
                </div>

                <div className="w3-auth-forgot-row">
                  <button 
                    type="button" 
                    className="w3-forgot-link"
                    onClick={() => alert("Password reset instructions will be sent to your registered email.")}
                  >
                    Forgot your password?
                  </button>
                </div>

                <button 
                  type="submit" 
                  className="w3-auth-submit-btn" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </button>
              </form>
            </div>
          ) : (
            /* ------------------------------------------------------------------ */
            /* REGISTER / SIGN UP VIEW                                           */
            /* ------------------------------------------------------------------ */
            <div className="w3-auth-content">
              <span className="w3-reg-pre-heading">Sign up to</span>
              <h2 id="auth-modal-title" className="w3-reg-main-title">
                Unlock powerful features
              </h2>
              <span className="w3-reg-free-badge">FREE TRIAL</span>

              {/* Green Checklist Feature Box */}
              <div className="w3-reg-feature-box">
                <div className="w3-reg-feature-grid">
                  <div className="w3-reg-feature-item">
                    <span className="w3-reg-check">✓</span>
                    <span>Track your progress</span>
                  </div>
                  <div className="w3-reg-feature-item">
                    <span className="w3-reg-check">✓</span>
                    <span>Ad-free</span>
                  </div>
                  <div className="w3-reg-feature-item">
                    <span className="w3-reg-check">✓</span>
                    <span>Build & host websites</span>
                  </div>
                  <div className="w3-reg-feature-item">
                    <span className="w3-reg-check">✓</span>
                    <span>Code challenges</span>
                  </div>
                </div>
                <p className="w3-reg-feature-more">...and much more</p>
              </div>

              <div className="w3-auth-switch-box" style={{ marginTop: 14 }}>
                <span>Already have an account? </span>
                <button 
                  type="button" 
                  className="w3-auth-switch-link"
                  onClick={() => {
                    setErrorMessage(null);
                    setMode("signin");
                  }}
                >
                  Sign In
                </button>
              </div>

              {/* 5 Social & Passkey Logins */}
              <div className="w3-social-auth-row">
                <button 
                  type="button" 
                  className="w3-social-btn" 
                  aria-label="Sign up with Google"
                  title="Sign up with Google"
                  onClick={() => handleOAuthClick("google")}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </button>

                <button 
                  type="button" 
                  className="w3-social-btn" 
                  aria-label="Sign up with GitHub"
                  title="Sign up with GitHub"
                  onClick={() => handleOAuthClick("github")}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="#24292F">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </button>

                <button 
                  type="button" 
                  className="w3-social-btn" 
                  aria-label="Sign up with Passkey / Security Key"
                  title="Sign up with Passkey / Face ID / Touch ID / Windows Hello"
                  onClick={handlePasskeyClick}
                  disabled={passkeyLoading}
                >
                  <KeyRound style={{ width: 19, height: 19, color: "#0284c7" }} />
                </button>
              </div>

              <div className="w3-auth-divider">
                <span className="w3-divider-line" />
                <span className="w3-divider-text">or</span>
                <span className="w3-divider-line" />
              </div>

              {/* 5. Register Form */}
              <form onSubmit={handleSubmit} className="w3-auth-form">
                <div className="w3-auth-field">
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w3-auth-input"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="w3-auth-field">
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w3-auth-input"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="w3-auth-field">
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w3-auth-input"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="w3-auth-field w3-password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w3-auth-input"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className="w3-eye-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff style={{ width: 18, height: 18 }} /> : <Eye style={{ width: 18, height: 18 }} />}
                  </button>
                </div>

                <label className="w3-auth-checkbox-label">
                  <input
                    type="checkbox"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="w3-auth-checkbox"
                    disabled={isSubmitting}
                  />
                  <span>Email me with news and updates</span>
                </label>

                <p className="w3-auth-legal-text">
                  By signing up you agree to our{" "}
                  <a href="#terms" className="w3-legal-link">Terms of Service</a> and{" "}
                  <a href="#privacy" className="w3-legal-link">Privacy Policy</a>
                </p>

                <button 
                  type="submit" 
                  className="w3-auth-submit-btn" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                </button>

                <p className="w3-auth-recaptcha-note">
                  This site is protected by reCAPTCHA and the Google{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> and{" "}
                  <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms of Service</a> apply.
                </p>
              </form>
            </div>
          )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unconfigured OAuth Setup Guidance Modal */}
      <AnimatePresence>
        {setupProvider && (
          <OAuthSetupModal
            providerName={setupProvider.name}
            setupInfo={setupProvider.info}
            onClose={() => setSetupProvider(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
