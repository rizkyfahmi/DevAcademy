"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Check, AlertCircle, KeyRound, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { DevAcademyLogo } from "@/components/brand/DevAcademyLogo";
import { OAuthSetupModal } from "@/components/auth/OAuthSetupModal";

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, register, loginWithPasskey, providers } = useAuth();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passkeyLoading, setPasskeyLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const [setupProvider, setSetupProvider] = useState<{
    name: string;
    info: any;
  } | null>(null);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  // Read URL error query param
  useEffect(() => {
    const errorParam = searchParams.get("error");
    const providerParam = searchParams.get("provider");

    if (errorParam === "oauth_unconfigured" && providerParam) {
      const pKey = providerParam.toLowerCase();
      const pInfo = providers[pKey];
      if (pInfo?.setupInfo) {
        setSetupProvider({ name: providerParam, info: pInfo.setupInfo });
      } else {
        setErrorMessage(
          `OAuth for ${providerParam} is not yet configured. Please add the required credentials to frontend/.env.local.`
        );
      }
    } else if (errorParam) {
      setErrorMessage(errorParam);
    }
  }, [searchParams, providers]);

  const handleOAuthClick = (providerKey: "google" | "github") => {
    setErrorMessage(null);
    const provider = providers[providerKey];

    if (!provider?.enabled && provider?.setupInfo) {
      setSetupProvider({
        name: provider.name,
        info: provider.setupInfo,
      });
      return;
    }

    window.location.href = `/api/auth/oauth/${providerKey}`;
  };

  const handlePasskeyClick = async () => {
    setErrorMessage(null);
    setPasskeyLoading(true);

    try {
      const res = await loginWithPasskey(email.trim() || undefined);
      if (res.success) {
        setSuccessToast("Passkey verified! Redirecting to Dashboard...");
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 700);
      } else {
        setErrorMessage(
          res.error ||
            "To register with a Passkey, create your account first, then add Passkeys in your account settings."
        );
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
      router.push("/dashboard");
      router.refresh();
    }, 700);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "36px 16px",
        background: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "#19232e",
          }}
        >
          <DevAcademyLogo size={38} variant="badge" />
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>
            DevAcademy
          </span>
        </Link>
      </div>

      <div
        className="w3-auth-modal"
        style={{
          boxShadow: "0 20px 40px -15px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
          maxHeight: "none",
          width: "100%",
          maxWidth: 440,
        }}
      >
        {successToast && (
          <div className="w3-auth-toast" style={{ marginBottom: 14 }}>
            <Check style={{ width: 16, height: 16, color: "#04aa6d" }} />
            <span>{successToast}</span>
          </div>
        )}

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

        <div className="w3-auth-content">
          <div style={{ textAlign: "center" }}>
            <span className="w3-reg-pre-heading">Sign up to</span>
            <h1 id="auth-modal-title" className="w3-reg-main-title">
              Unlock powerful features
            </h1>
            <span className="w3-reg-free-badge">FREE TRIAL</span>
          </div>

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

          <div className="w3-auth-switch-box" style={{ marginTop: 14, justifyContent: "center" }}>
            <span>Already have an account? </span>
            <Link href="/login" className="w3-auth-switch-link">
              Sign In
            </Link>
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
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
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
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
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

            <button type="submit" className="w3-auth-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>

            <p className="w3-auth-recaptcha-note">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> and{" "}
              <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms of Service</a> apply.
            </p>
          </form>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "#64748b",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          <ArrowLeft style={{ width: 16, height: 16 }} /> Back to Home
        </Link>
      </div>

      {setupProvider && (
        <OAuthSetupModal
          providerName={setupProvider.name}
          setupInfo={setupProvider.info}
          onClose={() => setSetupProvider(null)}
        />
      )}
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
