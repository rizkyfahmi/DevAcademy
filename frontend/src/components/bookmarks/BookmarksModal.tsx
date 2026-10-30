"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Bookmark, X, ExternalLink, Trash2, BookOpen, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import {
  getLocalBookmarks,
  saveLocalBookmarks,
  toggleLocalBookmark,
} from "@/lib/user-progress-store";

interface BookmarkItem {
  id: string;
  tech: string;
  chapter_slug: string;
  title: string;
  url: string;
  created_at: string;
}

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TECH_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  HTML: { bg: "#fff1ee", text: "#e34c26", border: "#fed7cc" },
  CSS: { bg: "#eff6ff", text: "#2563eb", border: "#bfdbfe" },
  JAVASCRIPT: { bg: "#fefce8", text: "#b45309", border: "#fde68a" },
  PYTHON: { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
  SQL: { bg: "#faf5ff", text: "#7e22ce", border: "#e9d5ff" },
};

export function BookmarksModal({ isOpen, onClose }: BookmarksModalProps) {
  const { user } = useAuth();
  const { openSignIn } = useAuthModal();
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const fetchBookmarks = useCallback(async () => {
    if (!user) {
      setBookmarks([]);
      return;
    }
    const localList = getLocalBookmarks(user.email);
    setBookmarks(localList);

    setLoading(localList.length === 0);
    try {
      const res = await fetch("/api/bookmarks");
      const data = await res.json();
      if (data.authenticated && Array.isArray(data.bookmarks)) {
        // Merge API bookmarks with local/TiDB bookmarks
        const map = new Map<string, BookmarkItem>();
        for (const b of localList) {
          map.set(`${b.tech.toUpperCase()}_${b.chapter_slug}`, b);
        }
        for (const b of data.bookmarks) {
          const key = `${String(b.tech).toUpperCase()}_${b.chapter_slug}`;
          if (!map.has(key)) {
            map.set(key, b);
          }
        }
        const merged = Array.from(map.values());
        setBookmarks(merged);
        if (merged.length !== localList.length) {
          saveLocalBookmarks(user.email, merged, user);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch bookmarks:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      fetchBookmarks();
    }
  }, [isOpen, fetchBookmarks]);

  // Listen to global updates
  useEffect(() => {
    const handleUpdate = () => {
      fetchBookmarks();
    };
    window.addEventListener("devacademy-bookmarks-updated", handleUpdate);
    return () => {
      window.removeEventListener("devacademy-bookmarks-updated", handleUpdate);
    };
  }, [fetchBookmarks]);

  const handleRemove = async (bm: BookmarkItem) => {
    setRemovingId(bm.id);
    if (user) {
      toggleLocalBookmark(
        user.email,
        {
          tech: bm.tech,
          chapter_slug: bm.chapter_slug,
          title: bm.title,
          url: bm.url,
        },
        user
      );
    }
    setBookmarks((prev) => prev.filter((item) => item.id !== bm.id));
    if (typeof window !== "undefined") {
      localStorage.removeItem(`devacademy_bookmark_${bm.tech.toLowerCase()}_${bm.chapter_slug}`);
      window.dispatchEvent(new CustomEvent("devacademy-bookmarks-updated"));
    }
    try {
      await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tech: bm.tech,
          chapterSlug: bm.chapter_slug,
          title: bm.title,
          url: bm.url,
        }),
      });
    } catch (err) {
      console.warn("Error removing bookmark:", err);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            backgroundColor: "rgba(15, 23, 42, 0.65)",
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
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{
              type: "spring",
              damping: 26,
              stiffness: 350,
              mass: 0.85,
            }}
            style={{
              width: "100%",
              maxWidth: 580,
              maxHeight: "85vh",
              backgroundColor: "#ffffff",
              borderRadius: 16,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#f8fafc",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: "#e8f5e9",
                color: "#04aa6d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bookmark style={{ width: 20, height: 20, fill: "#04aa6d" }} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#1e293b" }}>
                Materi Tersimpan
              </h2>
              <p style={{ margin: 0, fontSize: 12.5, color: "#64748b" }}>
                {bookmarks.length > 0
                  ? `${bookmarks.length} materi telah disimpan ke akun Anda`
                  : "Daftar materi yang telah Anda simpan"}
              </p>
            </div>
          </div>
          <motion.button
            type="button"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.92 }}
            style={{
              background: "none",
              border: "none",
              padding: 6,
              borderRadius: 8,
              cursor: "pointer",
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Tutup"
          >
            <X style={{ width: 20, height: 20 }} />
          </motion.button>
        </div>

        {/* Content list */}
        <div
          style={{
            padding: "16px 24px",
            overflowY: "auto",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {!user ? (
            <div
              style={{
                padding: "48px 20px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  backgroundColor: "#ecfdf5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#04aa6d",
                }}
              >
                <Bookmark style={{ width: 26, height: 26, fill: "#04aa6d" }} />
              </div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#1e293b" }}>
                Masuk untuk Melihat Bookmark Anda
              </h3>
              <p style={{ margin: 0, fontSize: 13.5, color: "#64748b", maxWidth: 360, lineHeight: 1.5 }}>
                Materi yang Anda simpan akan terhubung secara aman dengan akun Anda. Silakan masuk terlebih dahulu untuk melihat materi tersimpan.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openSignIn();
                }}
                style={{
                  marginTop: 6,
                  padding: "10px 22px",
                  borderRadius: 8,
                  backgroundColor: "#04aa6d",
                  color: "#ffffff",
                  fontSize: 13.5,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  boxShadow: "0 2px 8px rgba(4, 170, 109, 0.3)",
                }}
              >
                <LogIn style={{ width: 16, height: 16 }} />
                <span>Masuk ke Akun »</span>
              </button>
            </div>
          ) : loading ? (
            <div style={{ padding: "40px 0", textAlign: "center", color: "#64748b" }}>
              <p style={{ fontSize: 14 }}>Memuat daftar materi...</p>
            </div>
          ) : bookmarks.length === 0 ? (
            <div
              style={{
                padding: "48px 20px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  backgroundColor: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#94a3b8",
                }}
              >
                <BookOpen style={{ width: 26, height: 26 }} />
              </div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#334155" }}>
                Belum Ada Materi Tersimpan
              </h3>
              <p style={{ margin: 0, fontSize: 13.5, color: "#64748b", maxWidth: 360, lineHeight: 1.5 }}>
                Saat Anda mempelajari bab atau tutorial, klik tombol <strong>Bookmark (Simpan)</strong> di sebelah judul bab untuk menyimpannya di sini.
              </p>
              <Link
                href="/learn/html"
                onClick={onClose}
                style={{
                  marginTop: 8,
                  padding: "9px 20px",
                  borderRadius: 8,
                  backgroundColor: "#04aa6d",
                  color: "#ffffff",
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Mulai Belajar HTML »
              </Link>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {bookmarks.map((bm) => {
                const techStyle = TECH_COLORS[bm.tech.toUpperCase()] || {
                  bg: "#f1f5f9",
                  text: "#475569",
                  border: "#cbd5e1",
                };
                const isRemoving = removingId === bm.id;

                return (
                  <motion.div
                    key={bm.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: isRemoving ? 0.4 : 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0, padding: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      borderRadius: 12,
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#ffffff",
                      gap: 12,
                      overflow: "hidden",
                    }}
                  >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        padding: "3px 8px",
                        borderRadius: 6,
                        backgroundColor: techStyle.bg,
                        color: techStyle.text,
                        border: `1px solid ${techStyle.border}`,
                        flexShrink: 0,
                      }}
                    >
                      {bm.tech.toUpperCase()}
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <Link
                        href={bm.url || `/learn/${bm.tech.toLowerCase()}/${bm.chapter_slug}`}
                        onClick={onClose}
                        style={{
                          margin: 0,
                          fontSize: 14.5,
                          fontWeight: 700,
                          color: "#1e293b",
                          textDecoration: "none",
                          display: "block",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {bm.title}
                      </Link>
                      <span style={{ fontSize: 11.5, color: "#94a3b8" }}>
                        Disimpan: {new Date(bm.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <Link
                      href={bm.url || `/learn/${bm.tech.toLowerCase()}/${bm.chapter_slug}`}
                      onClick={onClose}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "6px 12px",
                        borderRadius: 6,
                        backgroundColor: "#f0fdf4",
                        color: "#166534",
                        fontSize: 12.5,
                        fontWeight: 700,
                        textDecoration: "none",
                        border: "1px solid #bbf7d0",
                      }}
                    >
                      <span>Buka</span>
                      <ExternalLink style={{ width: 13, height: 13 }} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleRemove(bm)}
                      disabled={isRemoving}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 7,
                        borderRadius: 6,
                        backgroundColor: "transparent",
                        color: "#ef4444",
                        border: "1px solid #fee2e2",
                        cursor: "pointer",
                      }}
                      title="Hapus dari daftar tersimpan"
                    >
                      <Trash2 style={{ width: 14, height: 14 }} />
                    </button>
                  </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        {bookmarks.length > 0 && (
          <div
            style={{
              padding: "14px 24px",
              borderTop: "1px solid #e2e8f0",
              backgroundColor: "#f8fafc",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 12.5, color: "#64748b" }}>
              Total: {bookmarks.length} materi
            </span>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "7px 16px",
                borderRadius: 6,
                backgroundColor: "#e2e8f0",
                color: "#1e293b",
                border: "none",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Tutup
            </button>
          </div>
        )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
