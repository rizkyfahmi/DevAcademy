"use client";

import { useState } from "react";
import { FolderOpen, X, Trash2, Code2, Play } from "lucide-react";

export interface SnippetItem {
  id: string;
  lang: string;
  title: string;
  code: string;
  created_at: string;
  updated_at: string;
}

interface SnippetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  snippets: SnippetItem[];
  onSelectSnippet: (snippet: SnippetItem) => void;
  onDeleteSnippet: (id: string) => Promise<void>;
  theme?: "dark" | "light";
}

export function SnippetsModal({
  isOpen,
  onClose,
  snippets,
  onSelectSnippet,
  onDeleteSnippet,
  theme = "dark",
}: SnippetsModalProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const isDark = theme === "dark";

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await onDeleteSnippet(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "rgba(15, 23, 42, 0.7)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          maxHeight: "85vh",
          backgroundColor: isDark ? "#1e293b" : "#ffffff",
          color: isDark ? "#f8fafc" : "#1e293b",
          borderRadius: 16,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: isDark ? "#0f172a" : "#f8fafc",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: isDark ? "#334155" : "#e0f2fe",
                color: isDark ? "#38bdf8" : "#0284c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FolderOpen style={{ width: 20, height: 20 }} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>
                Koleksi Snippet Kode Anda
              </h2>
              <p style={{ margin: 0, fontSize: 12.5, color: isDark ? "#94a3b8" : "#64748b" }}>
                {snippets.length} kode tersimpan di akun Anda
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              padding: 6,
              borderRadius: 8,
              cursor: "pointer",
              color: isDark ? "#94a3b8" : "#64748b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X style={{ width: 20, height: 20 }} />
          </button>
        </div>

        {/* Snippets list */}
        <div
          style={{
            padding: "16px 24px",
            overflowY: "auto",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {snippets.length === 0 ? (
            <div style={{ padding: "40px 0", textAlign: "center", color: isDark ? "#94a3b8" : "#64748b" }}>
              <Code2 style={{ width: 44, height: 44, margin: "0 auto 12px", opacity: 0.5 }} />
              <p style={{ fontSize: 15, fontWeight: 600, margin: "0 0 6px" }}>Belum Ada Snippet Tersimpan</p>
              <p style={{ fontSize: 13, margin: 0 }}>
                Ketik kode di editor lalu klik tombol <strong>Simpan</strong> di toolbar atas untuk menyimpannya.
              </p>
            </div>
          ) : (
            snippets.map((snip) => {
              const isDeleting = deletingId === snip.id;
              return (
                <div
                  key={snip.id}
                  style={{
                    padding: "14px 16px",
                    borderRadius: 10,
                    border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
                    backgroundColor: isDark ? "#0f172a" : "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    opacity: isDeleting ? 0.5 : 1,
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          padding: "2px 7px",
                          borderRadius: 4,
                          backgroundColor: "#04aa6d",
                          color: "#ffffff",
                          textTransform: "uppercase",
                        }}
                      >
                        {snip.lang}
                      </span>
                      <h4
                        style={{
                          margin: 0,
                          fontSize: 14,
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {snip.title}
                      </h4>
                    </div>
                    <pre
                      style={{
                        margin: 0,
                        fontSize: 11.5,
                        fontFamily: "monospace",
                        color: isDark ? "#94a3b8" : "#64748b",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {snip.code.slice(0, 80).replace(/\n/g, " ")}
                    </pre>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectSnippet(snip);
                        onClose();
                      }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "6px 12px",
                        borderRadius: 6,
                        backgroundColor: "#04aa6d",
                        color: "#ffffff",
                        border: "none",
                        fontSize: 12.5,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      <Play style={{ width: 12, height: 12, fill: "#ffffff" }} />
                      <span>Muat</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(snip.id)}
                      disabled={isDeleting}
                      style={{
                        padding: 6,
                        borderRadius: 6,
                        backgroundColor: "transparent",
                        color: "#ef4444",
                        border: isDark ? "1px solid #7f1d1d" : "1px solid #fee2e2",
                        cursor: "pointer",
                      }}
                      title="Hapus snippet"
                    >
                      <Trash2 style={{ width: 14, height: 14 }} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "12px 24px",
            borderTop: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
            backgroundColor: isDark ? "#0f172a" : "#f8fafc",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "7px 16px",
              borderRadius: 6,
              backgroundColor: isDark ? "#334155" : "#e2e8f0",
              color: isDark ? "#f8fafc" : "#1e293b",
              border: "none",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
