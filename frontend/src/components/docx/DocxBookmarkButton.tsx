"use client";

import { useState, useEffect } from "react";
import { Bookmark, Check, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import {
  isLocalChapterBookmarked,
  toggleLocalBookmark,
} from "@/lib/user-progress-store";

interface DocxBookmarkButtonProps {
  tech: string;
  chapterSlug: string;
  title: string;
  url?: string;
}

export function DocxBookmarkButton({
  tech,
  chapterSlug,
  title,
  url,
}: DocxBookmarkButtonProps) {
  const { user } = useAuth();
  const { openSignIn } = useAuthModal();
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const storageKey = `devacademy_bookmark_${tech.toLowerCase()}_${chapterSlug}`;

  // 1. Check bookmark state on mount & when user changes
  useEffect(() => {
    // Check unified store & localStorage cache first for instant feedback
    if (typeof window !== "undefined") {
      const inStore = isLocalChapterBookmarked(user?.email, tech, chapterSlug);
      const cached = localStorage.getItem(storageKey) === "true";
      if (inStore || cached) {
        setBookmarked(true);
      } else {
        setBookmarked(false);
      }
    }

    if (!user) {
      return;
    }

    let isMounted = true;
    fetch(`/api/bookmarks?tech=${encodeURIComponent(tech)}&chapterSlug=${encodeURIComponent(chapterSlug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.authenticated !== undefined) {
          const inStore = isLocalChapterBookmarked(user?.email, tech, chapterSlug);
          const isSaved = !!data.isBookmarked || inStore;
          setBookmarked(isSaved);
          if (typeof window !== "undefined") {
            if (isSaved) {
              localStorage.setItem(storageKey, "true");
            }
          }
        }
      })
      .catch((err) => {
        console.warn("[DocxBookmarkButton] Error checking bookmark status:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [user, tech, chapterSlug, storageKey]);

  useEffect(() => {
    const handleSync = () => {
      const inStore = isLocalChapterBookmarked(user?.email, tech, chapterSlug);
      setBookmarked(inStore);
    };
    window.addEventListener("devacademy-cloud-synced", handleSync);
    window.addEventListener("devacademy-bookmarks-updated", handleSync);
    return () => {
      window.removeEventListener("devacademy-cloud-synced", handleSync);
      window.removeEventListener("devacademy-bookmarks-updated", handleSync);
    };
  }, [user?.email, tech, chapterSlug]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleToggle = async () => {
    // If not logged in, prompt user to log in!
    if (!user) {
      showToast("Silakan masuk (login) untuk menyimpan materi ke akun Anda");
      openSignIn();
      return;
    }

    setLoading(true);
    const resolvedUrl =
      url || (typeof window !== "undefined" ? window.location.pathname : `/learn/${tech.toLowerCase()}`);

    // Save to unified store + TiDB Cloud immediately
    const { bookmarked: nextState } = toggleLocalBookmark(
      user.email,
      {
        tech,
        chapter_slug: chapterSlug,
        title,
        url: resolvedUrl,
      },
      user
    );
    setBookmarked(nextState);

    if (typeof window !== "undefined") {
      if (nextState) {
        localStorage.setItem(storageKey, "true");
      } else {
        localStorage.removeItem(storageKey);
      }
      window.dispatchEvent(new CustomEvent("devacademy-bookmarks-updated"));
    }

    showToast(
      nextState
        ? "Materi berhasil disimpan ke akun Anda!"
        : "Materi dihapus dari bookmark."
    );

    try {
      await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tech,
          chapterSlug,
          title,
          url: resolvedUrl,
        }),
      });
    } catch {
      // Already persisted in localStorage + TiDB Cloud via toggleLocalBookmark
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <button
        type="button"
        onClick={handleToggle}
        disabled={loading}
        className={`w3-docx-bookmark-btn ${bookmarked ? "active" : ""}`}
        aria-label={bookmarked ? "Hapus bookmark materi" : "Simpan materi ini"}
        title={
          user
            ? bookmarked
              ? "Tersimpan di akun Anda (Klik untuk hapus)"
              : "Simpan materi ini ke akun Anda"
            : "Masuk (login) untuk menyimpan materi ini"
        }
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 38,
          height: 38,
          borderRadius: "50%",
          border: bookmarked ? "1.5px solid #04aa6d" : "1px solid #e2e8f0",
          backgroundColor: bookmarked ? "#e8f5e9" : "#ffffff",
          cursor: "pointer",
          transition: "all 0.18s ease",
          boxShadow: bookmarked ? "0 2px 8px rgba(4, 170, 109, 0.25)" : "none",
        }}
      >
        <Bookmark
          style={{
            width: 20,
            height: 20,
            fill: bookmarked ? "#04aa6d" : "none",
            color: bookmarked ? "#04aa6d" : "#556270",
            transition: "all 0.18s ease",
            transform: bookmarked ? "scale(1.08)" : "scale(1)",
          }}
        />
      </button>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            backgroundColor: bookmarked ? "#04aa6d" : "#1e293b",
            color: "#ffffff",
            padding: "8px 14px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 700,
            whiteSpace: "nowrap",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: 6,
            animation: "w3FadeIn 0.15s ease-out",
          }}
        >
          {bookmarked ? (
            <Check style={{ width: 14, height: 14 }} />
          ) : (
            <AlertCircle style={{ width: 14, height: 14 }} />
          )}
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
