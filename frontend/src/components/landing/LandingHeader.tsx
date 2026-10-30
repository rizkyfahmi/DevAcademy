"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bookmark,
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  FileText, 
  Home,
  Menu, 
  TerminalSquare, 
  X,
  Pencil,
  Users,
  Trash2,
  LogOut,
  Check,
  Loader2,
  ArrowLeft
} from "lucide-react";
import { useAuthModal } from "@/context/AuthModalContext";
import { useAuth } from "@/context/AuthContext";
import { DevAcademyLogo } from "@/components/brand/DevAcademyLogo";
import { TutorialsModal } from "./TutorialsModal";
import { BookmarksModal } from "@/components/bookmarks/BookmarksModal";
import { NavbarSearch } from "@/components/search/NavbarSearch";
import { normalizeTechKey } from "@/lib/w3-all-courses-catalog";
import { getLocalBookmarks } from "@/lib/user-progress-store";

const SUBNAV_LANGUAGES = [
  { name: "HTML", href: "/learn/html" },
  { name: "CSS", href: "/learn/css" },
  { name: "JAVASCRIPT", href: "/learn/javascript" },
  { name: "SQL", href: "/learn/sql" },
  { name: "PYTHON", href: "/learn/python" },
  { name: "JAVA", href: "/learn/java" },
  { name: "PHP", href: "/learn/php" },
  { name: "C", href: "/learn/c" },
  { name: "C++", href: "/learn/cpp" },
  { name: "C#", href: "/learn/csharp" },
  { name: "AWS", href: "/learn/aws" },
  { name: "W3.CSS", href: "/learn/w3css" },
  { name: "HOW TO", href: "/learn/howto" },
  { name: "BOOTSTRAP", href: "/learn/bootstrap" },
  { name: "REACT", href: "/learn/react" },
  { name: "MYSQL", href: "/learn/mysql" },
  { name: "JQUERY", href: "/learn/jquery" },
  { name: "EXCEL", href: "/learn/excel" },
  { name: "XML", href: "/learn/xml" },
  { name: "DJANGO", href: "/learn/django" },
  { name: "NUMPY", href: "/learn/numpy" },
  { name: "PANDAS", href: "/learn/pandas" },
  { name: "NODEJS", href: "/learn/nodejs" },
  { name: "DSA", href: "/learn/dsa" },
  { name: "TYPESCRIPT", href: "/learn/typescript" },
  { name: "ANGULAR", href: "/learn/angular" },
  { name: "ANGULARJS", href: "/learn/angularjs" },
  { name: "GIT", href: "/learn/git" },
  { name: "POSTGRESQL", href: "/learn/postgresql" },
  { name: "MONGODB", href: "/learn/mongodb" },
  { name: "ASP", href: "/learn/asp" },
  { name: "AI", href: "/learn/ai" },
  { name: "R", href: "/learn/r" },
  { name: "GO", href: "/learn/go" },
  { name: "KOTLIN", href: "/learn/kotlin" },
  { name: "SWIFT", href: "/learn/swift" },
  { name: "SASS", href: "/learn/sass" },
  { name: "VUE", href: "/learn/vue" },
  { name: "GEN AI", href: "/learn/gen-ai" },
  { name: "SCIPY", href: "/learn/scipy" },
  { name: "CYBERSECURITY", href: "/learn/cybersecurity" },
  { name: "DATA SCIENCE", href: "/learn/datascience" },
  { name: "INTRO TO PROGRAMMING", href: "/learn/intro-programming" },
  { name: "INTRO TO HTML & CSS", href: "/learn/intro-html-css" },
  { name: "BASH", href: "/learn/bash" },
  { name: "RUST", href: "/learn/rust" },
  { name: "TOOLS", href: "/learn/tools" },
];

interface LandingHeaderProps {
  activeTech?: string;
  onSelectTech?: (tech: string) => void;
}

export function LandingHeader({ activeTech, onSelectTech }: LandingHeaderProps = {}) {
  const pathname = usePathname();
  const isDocx = pathname === "/dashboard" || pathname.startsWith("/docx") || pathname.startsWith("/learn");
  const { openSignIn, openRegister } = useAuthModal();
  const { user, logout, registerPasskey, refreshUser } = useAuth();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tutorialsModalOpen, setTutorialsModalOpen] = useState(false);
  const [bookmarksModalOpen, setBookmarksModalOpen] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  // User Account Management States (Chrome-style In-Dropdown)
  const [dropdownView, setDropdownView] = useState<"menu" | "rename" | "switch" | "delete">("menu");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [newName, setNewName] = useState("");
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [nameError, setNameError] = useState("");

  const [savedAccounts, setSavedAccounts] = useState<{ id: string; email: string; name: string; avatarUrl?: string | null; lastUsed: number }[]>([]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
        setDropdownView("menu");
      }
    };
    if (userDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userDropdownOpen]);

  const loadSavedAccounts = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("devacademy_saved_accounts");
      if (stored) {
        setSavedAccounts(JSON.parse(stored));
      } else {
        setSavedAccounts([]);
      }
    } catch {
      setSavedAccounts([]);
    }
  }, []);

  // Sync current user to saved accounts list
  useEffect(() => {
    if (user && typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("devacademy_saved_accounts");
        const list: any[] = stored ? JSON.parse(stored) : [];
        const filtered = list.filter((a) => a.id !== user.id && a.email.toLowerCase() !== user.email.toLowerCase());
        const updated = [
          {
            id: user.id,
            email: user.email,
            name: user.name,
            avatarUrl: user.avatarUrl,
            lastUsed: Date.now(),
          },
          ...filtered,
        ];
        localStorage.setItem("devacademy_saved_accounts", JSON.stringify(updated));
        setSavedAccounts(updated);
      } catch {
        // ignore
      }
    } else {
      loadSavedAccounts();
    }
  }, [user, loadSavedAccounts]);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      setNameError("Nama tidak boleh kosong");
      return;
    }
    setIsUpdatingName(true);
    setNameError("");
    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        await refreshUser();
        try {
          const stored = localStorage.getItem("devacademy_saved_accounts");
          if (stored) {
            const list = JSON.parse(stored);
            const updated = list.map((a: any) =>
              a.id === user?.id ? { ...a, name: newName.trim() } : a
            );
            localStorage.setItem("devacademy_saved_accounts", JSON.stringify(updated));
            setSavedAccounts(updated);
          }
        } catch {}
        setDropdownView("menu");
      } else {
        setNameError(data.error || "Gagal memperbarui nama");
      }
    } catch {
      setNameError("Terjadi kesalahan jaringan");
    } finally {
      setIsUpdatingName(false);
    }
  };

  const handleDeleteSavedAccount = (id: string) => {
    const next = savedAccounts.filter((a) => a.id !== id);
    setSavedAccounts(next);
    localStorage.setItem("devacademy_saved_accounts", JSON.stringify(next));
  };

  const handleClearAllSavedAccounts = () => {
    setSavedAccounts([]);
    localStorage.removeItem("devacademy_saved_accounts");
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Sync bookmark count
  const updateBookmarkCount = useCallback(async () => {
    if (!user) {
      setBookmarkCount(0);
      return;
    }
    const localList = getLocalBookmarks(user.email);
    setBookmarkCount(localList.length);
    try {
      const res = await fetch("/api/bookmarks");
      const data = await res.json();
      if (data.authenticated && Array.isArray(data.bookmarks)) {
        const keys = new Set<string>(
          localList.map((b) => `${b.tech.toUpperCase()}_${b.chapter_slug}`)
        );
        for (const b of data.bookmarks) {
          keys.add(`${String(b.tech).toUpperCase()}_${b.chapter_slug}`);
        }
        setBookmarkCount(keys.size);
      }
    } catch {
      // fallback to localList.length
    }
  }, [user]);

  useEffect(() => {
    updateBookmarkCount();
    window.addEventListener("devacademy-bookmarks-updated", updateBookmarkCount);
    window.addEventListener("devacademy-cloud-synced", updateBookmarkCount);
    return () => {
      window.removeEventListener("devacademy-bookmarks-updated", updateBookmarkCount);
      window.removeEventListener("devacademy-cloud-synced", updateBookmarkCount);
    };
  }, [updateBookmarkCount]);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 8);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  // Auto-scroll horizontal ticker bar to active technology
  useEffect(() => {
    const techToTarget = activeTech || (pathname?.startsWith("/learn/") ? pathname.split("/")[2] : "");
    if (!techToTarget || !scrollRef.current) return;
    const timer = setTimeout(() => {
      const bar = scrollRef.current;
      if (!bar) return;
      const activeEl = bar.querySelector<HTMLElement>(".w3-subnav-item.active");
      if (activeEl) {
        const barRect = bar.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        const relativeLeft = activeRect.left - barRect.left + bar.scrollLeft;
        const targetScrollLeft = Math.max(0, relativeLeft - bar.clientWidth / 2 + activeRect.width / 2);
        bar.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [activeTech, pathname]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="w3-header-wrap">
      {/* Top Navbar */}
      <div className="w3-top-nav">
        <div className="w3-nav-container">
          {/* Left Group: Logo (Icon Only, No Text) + Main Menu */}
          <div className="w3-nav-left-group">
            <Link href="/" className="w3-logo" aria-label="DevAcademy Home">
              <DevAcademyLogo size={36} variant="badge" />
            </Link>

            {/* Left Nav Menu */}
            <nav className="w3-nav-menu" aria-label="Main Navigation">
              <motion.button 
                type="button" 
                onClick={() => setTutorialsModalOpen(true)} 
                className="w3-menu-item"
                whileTap={{ scale: 0.96 }}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  height: "100%",
                  color: tutorialsModalOpen ? "#04aa6d" : "inherit",
                }}
              >
                <span>Tutorials</span>
                <ChevronDown className={`w3-caret ${tutorialsModalOpen ? "rotated" : ""}`} />
              </motion.button>

              <Link
                href="/exercises"
                className={`w3-menu-item ${pathname === "/exercises" ? "active" : ""}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  height: "100%",
                  textDecoration: "none",
                  color: pathname === "/exercises" ? "#04aa6d" : "inherit",
                  fontWeight: pathname === "/exercises" ? 750 : "inherit",
                }}
                title="Pilih Latihan Soal & Exercise Coding"
              >
                <span>Exercises</span>
              </Link>

              <Link
                href="/tryit?empty=true"
                className="w3-menu-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  height: "100%",
                  textDecoration: "none",
                  color: "inherit",
                }}
                title="Buka Tryit Code Editor (Editor Kosong)"
              >
                <span>Code Editor</span>
              </Link>
            </nav>
          </div>

          {/* Center Search Bar Component */}
          <NavbarSearch />

          {/* Right Action Buttons: Bookmark Check + Toggle Home/Materi + Akun */}
          <div className="w3-nav-right">
            {/* Direct Bookmark Check Button */}
            <motion.button
              type="button"
              onClick={() => setBookmarksModalOpen(true)}
              className="w3-nav-bookmark-btn"
              title="Cek Materi Tersimpan (Bookmarks)"
              aria-label="Cek Bookmark Materi Tersimpan"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 12px",
                borderRadius: 8,
                border: bookmarkCount > 0 ? "1.5px solid #04aa6d" : "1px solid #ccd3da",
                backgroundColor: bookmarkCount > 0 ? "#f0fdf4" : "#ffffff",
                color: bookmarkCount > 0 ? "#15803d" : "#334155",
                fontSize: 13,
                fontWeight: 680,
                cursor: "pointer",
                transition: "border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease",
              }}
            >
              <Bookmark
                style={{
                  width: 15,
                  height: 15,
                  fill: bookmarkCount > 0 ? "#04aa6d" : "none",
                  color: bookmarkCount > 0 ? "#04aa6d" : "#64748b",
                }}
              />
              <span className="w3-hide-mobile">Bookmark</span>
              {bookmarkCount > 0 && (
                <span
                  style={{
                    backgroundColor: "#04aa6d",
                    color: "#ffffff",
                    fontSize: 11,
                    fontWeight: 800,
                    padding: "1px 6px",
                    borderRadius: 10,
                    minWidth: 18,
                    textAlign: "center",
                    lineHeight: "15px",
                  }}
                >
                  {bookmarkCount}
                </span>
              )}
            </motion.button>

            <Link 
              href={isDocx ? "/" : "/dashboard"} 
              className="w3-dash-link"
              title={isDocx ? "Kembali ke Beranda (Landing Page)" : "Buka Halaman Materi Tutorial"}
            >
              {isDocx ? (
                <>
                  <Home style={{ width: 14, height: 14 }} />
                  <span>Home</span>
                </>
              ) : (
                <>
                  <FileText style={{ width: 14, height: 14 }} />
                  <span>Materi</span>
                </>
              )}
            </Link>

            {user ? (
              <div ref={dropdownRef} style={{ position: "relative" }}>
                <motion.button
                  type="button"
                  onClick={() => {
                    setUserDropdownOpen(!userDropdownOpen);
                    setDropdownView("menu");
                  }}
                  aria-label="User profile menu"
                  whileTap={{ scale: 0.94 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    borderRadius: "50%",
                  }}
                  title={user.name || user.email}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "2px solid #04aa6d",
                      boxShadow: "0 2px 8px rgba(4,170,109,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#e8f5e9",
                      transition: "transform 0.15s ease",
                    }}
                  >
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.name || "User Avatar"}
                        referrerPolicy="no-referrer"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    ) : (
                      <span style={{ fontSize: 15, fontWeight: 750, color: "#04aa6d" }}>
                        {(user.firstName?.[0] || user.name?.[0] || "U").toUpperCase()}
                      </span>
                    )}
                  </div>
                  <ChevronDown style={{ width: 14, height: 14, color: "#64748b" }} />
                </motion.button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        right: 0,
                        width: 280,
                        background: "#ffffff",
                        borderRadius: 14,
                        boxShadow: "0 14px 35px -4px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.06)",
                        border: "1px solid #e2e8f0",
                        padding: 0,
                        zIndex: 100,
                        transformOrigin: "top right",
                        overflow: "hidden",
                      }}
                    >
                      {/* VIEW 1: Main Menu */}
                      {dropdownView === "menu" && (
                        <div>
                          {/* User Header Profile Card */}
                          <div
                            style={{
                              padding: "14px 16px",
                              borderBottom: "1px solid #f1f5f9",
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                              backgroundColor: "#fcfdfe",
                            }}
                          >
                            <div
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                overflow: "hidden",
                                border: "1.5px solid #04aa6d",
                                flexShrink: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "#e8f5e9",
                              }}
                            >
                              {user.avatarUrl ? (
                                <img
                                  src={user.avatarUrl}
                                  alt={user.name}
                                  referrerPolicy="no-referrer"
                                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                />
                              ) : (
                                <span style={{ fontSize: 16, fontWeight: 750, color: "#04aa6d" }}>
                                  {(user.firstName?.[0] || user.name?.[0] || "U").toUpperCase()}
                                </span>
                              )}
                            </div>
                            <div style={{ overflow: "hidden", minWidth: 0, flex: 1 }}>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  color: "#0f172a",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {user.name}
                              </p>
                              <p
                                style={{
                                  margin: "2px 0 0 0",
                                  fontSize: 11,
                                  color: "#64748b",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {user.email}
                              </p>
                            </div>
                          </div>

                          <div style={{ padding: "6px 0" }}>
                            {/* 1. Ganti Nama */}
                            <button
                              type="button"
                              onClick={() => {
                                setNewName(user.name || "");
                                setNameError("");
                                setDropdownView("rename");
                              }}
                              style={{
                                width: "100%",
                                textAlign: "left",
                                padding: "10px 16px",
                                fontSize: 13,
                                color: "#0f172a",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: 600,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                transition: "background 0.15s ease",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <Pencil style={{ width: 15, height: 15, color: "#0f172a", flexShrink: 0 }} />
                                <span>Ganti Nama</span>
                              </div>
                              <ChevronRight style={{ width: 14, height: 14, color: "#94a3b8" }} />
                            </button>

                            {/* 2. Beralih Akun */}
                            <button
                              type="button"
                              onClick={() => {
                                loadSavedAccounts();
                                setDropdownView("switch");
                              }}
                              style={{
                                width: "100%",
                                textAlign: "left",
                                padding: "10px 16px",
                                fontSize: 13,
                                color: "#0f172a",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: 600,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                transition: "background 0.15s ease",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <Users style={{ width: 15, height: 15, color: "#0f172a", flexShrink: 0 }} />
                                <span>Beralih Akun</span>
                              </div>
                              <ChevronRight style={{ width: 14, height: 14, color: "#94a3b8" }} />
                            </button>

                            {/* 3. Hapus Akun */}
                            <button
                              type="button"
                              onClick={() => {
                                loadSavedAccounts();
                                setDropdownView("delete");
                              }}
                              style={{
                                width: "100%",
                                textAlign: "left",
                                padding: "10px 16px",
                                fontSize: 13,
                                color: "#0f172a",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: 600,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                transition: "background 0.15s ease",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <Trash2 style={{ width: 15, height: 15, color: "#0f172a", flexShrink: 0 }} />
                                <span>Hapus Akun</span>
                              </div>
                              <ChevronRight style={{ width: 14, height: 14, color: "#94a3b8" }} />
                            </button>

                            <div style={{ height: 1, backgroundColor: "#f1f5f9", margin: "4px 0" }} />

                            {/* 4. Log Out */}
                            <button
                              type="button"
                              onClick={() => {
                                setUserDropdownOpen(false);
                                setDropdownView("menu");
                                logout();
                              }}
                              style={{
                                width: "100%",
                                textAlign: "left",
                                padding: "10px 16px",
                                fontSize: 13,
                                color: "#0f172a",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: 600,
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                transition: "background 0.15s ease",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                            >
                              <LogOut style={{ width: 15, height: 15, color: "#0f172a", flexShrink: 0 }} />
                              <span>Log Out</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* VIEW 2: Chrome-style Ganti Nama */}
                      {dropdownView === "rename" && (
                        <div>
                          <div
                            style={{
                              padding: "10px 14px",
                              borderBottom: "1px solid #f1f5f9",
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => setDropdownView("menu")}
                              title="Kembali"
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 5,
                                borderRadius: 6,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#0f172a",
                                transition: "background 0.15s ease",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                            >
                              <ArrowLeft style={{ width: 15, height: 15 }} />
                            </button>
                            <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
                              Ganti Nama
                            </span>
                          </div>

                          <form onSubmit={handleUpdateName} style={{ padding: "14px 16px" }}>
                            <p style={{ margin: "0 0 10px 0", fontSize: 12, color: "#64748b", lineHeight: 1.4 }}>
                              Ubah nama tampilan akun Anda.
                            </p>

                            <div style={{ marginBottom: 12 }}>
                              <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Masukkan nama baru..."
                                autoFocus
                                disabled={isUpdatingName}
                                style={{
                                  width: "100%",
                                  boxSizing: "border-box",
                                  padding: "8px 10px",
                                  borderRadius: 7,
                                  border: "1px solid #cbd5e1",
                                  fontSize: 13,
                                  color: "#0f172a",
                                  outline: "none",
                                  backgroundColor: "#f8fafc",
                                }}
                              />
                              {nameError && (
                                <p style={{ margin: "4px 0 0 0", fontSize: 11, color: "#ef4444" }}>
                                  {nameError}
                                </p>
                              )}
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 14 }}>
                              <button
                                type="button"
                                onClick={() => setDropdownView("menu")}
                                disabled={isUpdatingName}
                                style={{
                                  padding: "6px 12px",
                                  borderRadius: 6,
                                  fontSize: 12,
                                  fontWeight: 600,
                                  backgroundColor: "#f1f5f9",
                                  border: "1px solid #e2e8f0",
                                  color: "#0f172a",
                                  cursor: "pointer",
                                }}
                              >
                                Batal
                              </button>
                              <button
                                type="submit"
                                disabled={isUpdatingName}
                                style={{
                                  padding: "6px 14px",
                                  borderRadius: 6,
                                  fontSize: 12,
                                  fontWeight: 600,
                                  backgroundColor: "#0f172a",
                                  border: "none",
                                  color: "#ffffff",
                                  cursor: isUpdatingName ? "not-allowed" : "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 6,
                                }}
                              >
                                {isUpdatingName && <Loader2 style={{ width: 12, height: 12, animation: "spin 1s linear infinite" }} />}
                                <span>Simpan</span>
                              </button>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* VIEW 3: Chrome-style Beralih Akun */}
                      {dropdownView === "switch" && (
                        <div>
                          <div
                            style={{
                              padding: "10px 14px",
                              borderBottom: "1px solid #f1f5f9",
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => setDropdownView("menu")}
                              title="Kembali"
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 5,
                                borderRadius: 6,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#0f172a",
                                transition: "background 0.15s ease",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                            >
                              <ArrowLeft style={{ width: 15, height: 15 }} />
                            </button>
                            <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
                              Beralih Akun
                            </span>
                          </div>

                          <div style={{ padding: "8px 12px", maxHeight: 220, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
                            {savedAccounts.length === 0 ? (
                              <p style={{ margin: 0, padding: "16px 0", fontSize: 12, color: "#94a3b8", textAlign: "center" }}>
                                Belum ada akun lain yang tersimpan
                              </p>
                            ) : (
                              savedAccounts.map((acc) => {
                                const isCurrent = user?.id === acc.id || user?.email.toLowerCase() === acc.email.toLowerCase();
                                return (
                                  <div
                                    key={acc.id || acc.email}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      padding: "8px 10px",
                                      borderRadius: 8,
                                      border: isCurrent ? "1.5px solid #0f172a" : "1px solid #e2e8f0",
                                      backgroundColor: isCurrent ? "#f8fafc" : "#ffffff",
                                    }}
                                  >
                                    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, flex: 1, marginRight: 6 }}>
                                      <div
                                        style={{
                                          width: 30,
                                          height: 30,
                                          borderRadius: "50%",
                                          backgroundColor: "#0f172a",
                                          color: "#ffffff",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          fontSize: 12,
                                          fontWeight: 700,
                                          flexShrink: 0,
                                        }}
                                      >
                                        {(acc.name || acc.email || "U").charAt(0).toUpperCase()}
                                      </div>
                                      <div style={{ minWidth: 0, flex: 1 }}>
                                        <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                          {acc.name || "Pengguna"}
                                        </p>
                                        <p style={{ margin: 0, fontSize: 10, color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                          {acc.email}
                                        </p>
                                      </div>
                                    </div>

                                    {isCurrent ? (
                                      <span
                                        style={{
                                          fontSize: 10,
                                          fontWeight: 700,
                                          color: "#0f172a",
                                          backgroundColor: "#e2e8f0",
                                          padding: "3px 7px",
                                          borderRadius: 4,
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        Aktif
                                      </span>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setUserDropdownOpen(false);
                                          setDropdownView("menu");
                                          logout();
                                          openSignIn();
                                        }}
                                        style={{
                                          padding: "4px 10px",
                                          borderRadius: 5,
                                          fontSize: 11,
                                          fontWeight: 600,
                                          backgroundColor: "#0f172a",
                                          color: "#ffffff",
                                          border: "none",
                                          cursor: "pointer",
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        Masuk
                                      </button>
                                    )}
                                  </div>
                                );
                              })
                            )}
                          </div>

                          <div style={{ borderTop: "1px solid #f1f5f9", padding: "8px 12px" }}>
                            <button
                              type="button"
                              onClick={() => {
                                setUserDropdownOpen(false);
                                setDropdownView("menu");
                                logout();
                                openSignIn();
                              }}
                              style={{
                                width: "100%",
                                padding: "8px",
                                borderRadius: 6,
                                fontSize: 12,
                                fontWeight: 600,
                                backgroundColor: "#f8fafc",
                                border: "1px solid #cbd5e1",
                                color: "#0f172a",
                                cursor: "pointer",
                                textAlign: "center",
                                transition: "background 0.15s ease",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                            >
                              + Masuk ke Akun Lain
                            </button>
                          </div>
                        </div>
                      )}

                      {/* VIEW 4: Chrome-style Hapus Akun */}
                      {dropdownView === "delete" && (
                        <div>
                          <div
                            style={{
                              padding: "10px 14px",
                              borderBottom: "1px solid #f1f5f9",
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => setDropdownView("menu")}
                              title="Kembali"
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 5,
                                borderRadius: 6,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#0f172a",
                                transition: "background 0.15s ease",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                            >
                              <ArrowLeft style={{ width: 15, height: 15 }} />
                            </button>
                            <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
                              Hapus Akun
                            </span>
                          </div>

                          <div style={{ padding: "8px 12px", maxHeight: 220, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
                            {savedAccounts.length === 0 ? (
                              <p style={{ margin: 0, padding: "16px 0", fontSize: 12, color: "#94a3b8", textAlign: "center" }}>
                                Tidak ada akun tersimpan di browser ini
                              </p>
                            ) : (
                              savedAccounts.map((acc) => (
                                <div
                                  key={acc.id || acc.email}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "8px 10px",
                                    borderRadius: 8,
                                    border: "1px solid #e2e8f0",
                                    backgroundColor: "#ffffff",
                                  }}
                                >
                                  <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, flex: 1, marginRight: 6 }}>
                                    <div
                                      style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: "50%",
                                        backgroundColor: "#f1f5f9",
                                        color: "#0f172a",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 12,
                                        fontWeight: 700,
                                        flexShrink: 0,
                                      }}
                                    >
                                      {(acc.name || acc.email || "U").charAt(0).toUpperCase()}
                                    </div>
                                    <div style={{ minWidth: 0, flex: 1 }}>
                                      <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {acc.name || "Pengguna"}
                                      </p>
                                      <p style={{ margin: 0, fontSize: 10, color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {acc.email}
                                      </p>
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => handleDeleteSavedAccount(acc.id)}
                                    title="Hapus dari browser ini"
                                    style={{
                                      padding: 6,
                                      borderRadius: 5,
                                      border: "1px solid #e2e8f0",
                                      backgroundColor: "#f8fafc",
                                      color: "#0f172a",
                                      cursor: "pointer",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      transition: "all 0.15s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor = "#fee2e2";
                                      e.currentTarget.style.borderColor = "#fca5a5";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor = "#f8fafc";
                                      e.currentTarget.style.borderColor = "#e2e8f0";
                                    }}
                                  >
                                    <Trash2 style={{ width: 14, height: 14, color: "#0f172a" }} />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>

                          {savedAccounts.length > 0 && (
                            <div style={{ borderTop: "1px solid #f1f5f9", padding: "8px 12px" }}>
                              <button
                                type="button"
                                onClick={handleClearAllSavedAccounts}
                                style={{
                                  width: "100%",
                                  padding: "8px",
                                  borderRadius: 6,
                                  fontSize: 12,
                                  fontWeight: 600,
                                  backgroundColor: "#fff1f2",
                                  border: "1px solid #fecdd3",
                                  color: "#e11d48",
                                  cursor: "pointer",
                                  textAlign: "center",
                                  transition: "background 0.15s ease",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ffe4e6")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff1f2")}
                              >
                                Hapus Semua
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button 
                type="button" 
                onClick={openSignIn} 
                className="w3-signin-btn"
                aria-label="Sign In to DevAcademy"
              >
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile toggle */}
            <button 
              type="button" 
              className="w3-mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
            </button>
          </div>
        </div>
      </div>

      {/* Subnav Technology Ticker Bar with Horizontal Scroll and Arrow Buttons */}
      <div className="w3-subnav-bar-wrapper">
        {canScrollLeft && (
          <button
            type="button"
            className="w3-subnav-arrow w3-subnav-arrow-left"
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft style={{ width: 18, height: 18 }} />
          </button>
        )}

        <div className="w3-subnav-bar" ref={scrollRef}>
          <div className="w3-subnav-track">
            {SUBNAV_LANGUAGES.map((item) => {
              const effectiveTech = activeTech || (pathname?.startsWith("/learn/") ? pathname.split("/")[2] : "");
              const currentNorm = effectiveTech ? normalizeTechKey(effectiveTech) : "";
              const itemNorm = normalizeTechKey(item.name);
              const isActive = !!currentNorm && currentNorm === itemNorm;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (onSelectTech) {
                      e.preventDefault();
                      onSelectTech(item.name);
                    }
                  }}
                  className={`w3-subnav-item ${isActive ? "active" : ""}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {canScrollRight && (
          <button
            type="button"
            className="w3-subnav-arrow w3-subnav-arrow-right"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight style={{ width: 18, height: 18 }} />
          </button>
        )}
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="w3-mobile-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
          <div className="w3-mobile-menu-list">
            {user ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  background: "#f8fafc",
                  borderRadius: 12,
                  marginBottom: 10,
                  border: "1px solid #e2e8f0",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid #04aa6d",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#e8f5e9",
                  }}
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  ) : (
                    <span style={{ fontSize: 15, fontWeight: 750, color: "#04aa6d" }}>
                      {(user.firstName?.[0] || user.name?.[0] || "U").toUpperCase()}
                    </span>
                  )}
                </div>
                <div style={{ overflow: "hidden", minWidth: 0, flex: 1 }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#1e293b",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user.name}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 11,
                      color: "#64748b",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user.email}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    logout();
                  }}
                  style={{
                    border: "none",
                    background: "none",
                    color: "#ef4444",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    padding: "4px",
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                type="button"
                className="w3-mobile-drawer-auth-btn"
                onClick={() => {
                  setMobileOpen(false);
                  openSignIn();
                }}
              >
                Sign In to DevAcademy
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setTutorialsModalOpen(true);
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                padding: "10px 14px",
                fontSize: 14,
                fontWeight: 700,
                color: "#04aa6d",
                cursor: "pointer",
              }}
            >
              📚 Pilih Materi Tutorial &raquo;
            </button>
            <Link href="/" onClick={() => setMobileOpen(false)}>Home (Beranda)</Link>
            <Link href="/exercises" onClick={() => setMobileOpen(false)}>🎯 Exercises</Link>
            <Link href="/dashboard" onClick={() => setMobileOpen(false)}>Halaman Materi</Link>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setBookmarksModalOpen(true);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                padding: "10px 14px",
                fontSize: 14,
                fontWeight: 700,
                color: "#04aa6d",
                cursor: "pointer",
              }}
            >
              <span>📑 Cek Materi Tersimpan</span>
              {bookmarkCount > 0 && (
                <span
                  style={{
                    backgroundColor: "#04aa6d",
                    color: "#ffffff",
                    fontSize: 11,
                    fontWeight: 800,
                    padding: "2px 8px",
                    borderRadius: 10,
                  }}
                >
                  {bookmarkCount}
                </span>
              )}
            </button>
            <Link href="/tryit?empty=true" onClick={() => setMobileOpen(false)}>💻 Code Editor</Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

      {/* Tutorials Mega-Modal (Free Version) */}
      <TutorialsModal 
        isOpen={tutorialsModalOpen} 
        onClose={() => setTutorialsModalOpen(false)} 
      />

      {/* Bookmarks Modal (Saved Chapters) */}
      <BookmarksModal
        isOpen={bookmarksModalOpen}
        onClose={() => setBookmarksModalOpen(false)}
      />
    </header>
  );
}
