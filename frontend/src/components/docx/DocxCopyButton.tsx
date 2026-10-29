"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface DocxCopyButtonProps {
  code: string;
  variant?: "floating" | "action";
  label?: string;
  className?: string;
}

export function DocxCopyButton({
  code,
  variant = "floating",
  label,
  className = "",
}: DocxCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = code;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (variant === "floating") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className={className}
        title={copied ? "Kode berhasil disalin!" : "Salin kode ke clipboard"}
        style={{
          position: "absolute",
          top: 10,
          right: 12,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 10px",
          borderRadius: 6,
          backgroundColor: copied ? "#04aa6d" : "#f1f5f9",
          color: copied ? "#ffffff" : "#1e293b",
          border: `1px solid ${copied ? "#04aa6d" : "#cbd5e1"}`,
          fontSize: 12,
          fontWeight: 650,
          cursor: "pointer",
          zIndex: 2,
          boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
          transition: "all 0.15s ease",
        }}
      >
        {copied ? (
          <>
            <Check style={{ width: 14, height: 14, strokeWidth: 2.5 }} />
            <span>Tersalin!</span>
          </>
        ) : (
          <>
            <Copy style={{ width: 14, height: 14 }} />
            <span>{label || "Salin"}</span>
          </>
        )}
      </button>
    );
  }

  // Variant "action" - suitable for bottom actions next to "Check Preview »"
  return (
    <button
      type="button"
      onClick={handleCopy}
      className={className}
      title={copied ? "Kode berhasil disalin!" : "Salin kode ke clipboard"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 16px",
        borderRadius: 6,
        backgroundColor: copied ? "#04aa6d" : "#ffffff",
        color: copied ? "#ffffff" : "#19232e",
        border: `1.5px solid ${copied ? "#04aa6d" : "#cbd5e1"}`,
        fontSize: 13.5,
        fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
    >
      {copied ? (
        <>
          <Check style={{ width: 15, height: 15, strokeWidth: 2.5 }} />
          <span>Tersalin!</span>
        </>
      ) : (
        <>
          <Copy style={{ width: 15, height: 15 }} />
          <span>{label || "Salin Kode"}</span>
        </>
      )}
    </button>
  );
}
