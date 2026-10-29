"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { X, ExternalLink, Copy, Check, ShieldAlert } from "lucide-react";
import { ProviderSetupInfo } from "@/context/AuthContext";

interface OAuthSetupModalProps {
  providerName: string;
  setupInfo: ProviderSetupInfo;
  onClose: () => void;
}

export function OAuthSetupModal({
  providerName,
  setupInfo,
  onClose,
}: OAuthSetupModalProps) {
  const [copiedCallback, setCopiedCallback] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);

  const envTemplate = setupInfo.envRequired
    .map((k) => `${k}="your_${k.toLowerCase()}_here"`)
    .join("\n");

  const copyToClipboard = (text: string, type: "callback" | "env") => {
    navigator.clipboard?.writeText(text);
    if (type === "callback") {
      setCopiedCallback(true);
      setTimeout(() => setCopiedCallback(false), 2000);
    } else {
      setCopiedEnv(true);
      setTimeout(() => setCopiedEnv(false), 2000);
    }
  };

  return (
    <motion.div
      className="w3-auth-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      style={{
        zIndex: 3500,
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        background: "rgba(15, 23, 42, 0.65)",
      }}
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
        style={{
          maxWidth: 500,
          padding: "28px 24px",
          borderRadius: 14,
          background: "#ffffff",
          boxShadow: "0 20px 45px rgba(0,0,0,0.22)",
        }}
      >
        <button
          type="button"
          className="w3-auth-close-btn"
          onClick={onClose}
          aria-label="Close"
          style={{ position: "absolute", top: 16, right: 16 }}
        >
          <X style={{ width: 20, height: 20 }} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "#fef3c7",
              color: "#d97706",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <ShieldAlert style={{ width: 22, height: 22 }} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 750, color: "#19232e" }}>
              {providerName} OAuth Setup Required
            </h3>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: "#556270" }}>
              Configuration needed to enable direct {providerName} login.
            </p>
          </div>
        </div>

        <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "#374151", margin: "0 0 16px" }}>
          To sign in with <strong>{providerName}</strong>, set up your OAuth credentials in the official developer portal and add them to your environment variables:
        </p>

        {/* 1. Callback URL */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#4b5563", marginBottom: 5 }}>
            Authorized Callback / Redirect URI:
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#f3f4f6",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: "7px 10px",
              fontSize: 12,
              fontFamily: "monospace",
              color: "#1f2937",
              justifyContent: "space-between",
            }}
          >
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {setupInfo.callbackUrl}
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(setupInfo.callbackUrl, "callback")}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                display: "inline-flex",
                alignItems: "center",
                color: copiedCallback ? "#059669" : "#6b7280",
              }}
              title="Copy redirect URI"
            >
              {copiedCallback ? <Check style={{ width: 16, height: 16 }} /> : <Copy style={{ width: 16, height: 16 }} />}
            </button>
          </div>
        </div>

        {/* 2. Environment Variables */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#4b5563", marginBottom: 5 }}>
            Required in <code>frontend/.env.local</code>:
          </label>
          <div
            style={{
              position: "relative",
              background: "#1e293b",
              borderRadius: 8,
              padding: "10px 12px",
              fontFamily: "monospace",
              fontSize: 12,
              color: "#38bdf8",
              lineHeight: 1.5,
            }}
          >
            <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{envTemplate}</pre>
            <button
              type="button"
              onClick={() => copyToClipboard(envTemplate, "env")}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                padding: "4px 8px",
                fontSize: 11,
                color: copiedEnv ? "#34d399" : "#cbd5e1",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {copiedEnv ? (
                <>
                  <Check style={{ width: 13, height: 13 }} /> Copied
                </>
              ) : (
                <>
                  <Copy style={{ width: 13, height: 13 }} /> Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <a
            href={setupInfo.guideUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: 8,
              border: "1px solid #d1d5db",
              background: "#ffffff",
              color: "#111827",
              fontSize: 13,
              fontWeight: 650,
              textDecoration: "none",
            }}
          >
            Open Developer Console <ExternalLink style={{ width: 14, height: 14 }} />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="w3-docx-btn-green"
            style={{ border: "none", cursor: "pointer", padding: "8px 18px", borderRadius: 8, fontSize: 13 }}
          >
            Got it
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
