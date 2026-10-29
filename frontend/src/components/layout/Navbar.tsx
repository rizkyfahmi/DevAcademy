"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Bot, CircleHelp, Code2, Globe, LayoutDashboard, LibraryBig, NotebookPen, Sparkles } from "lucide-react";
import { DevAcademyLogo } from "@/components/brand/DevAcademyLogo";
import { useAuth } from "@/context/AuthContext";

const primary = [
  { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/exercises", label: "Exercises", Icon: NotebookPen },
  { href: "/playground", label: "Playground", Icon: Code2 },
];
const library = [
  { href: "/glossary", label: "Glossary", Icon: LibraryBig },
  { href: "/ai-tutor", label: "AI Tutor", Icon: Bot },
  { href: "/help", label: "Help & FAQ", Icon: CircleHelp },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/") || (href === "/dashboard" && pathname.startsWith("/learn"));
  const items = (group: typeof primary) => group.map(({ href, label, Icon }) => (
    <Link key={href} href={href} className={"nav-link" + (isActive(href) ? " active" : "")} aria-current={isActive(href) ? "page" : undefined}>
      <Icon aria-hidden="true" /> <span>{label}</span>
    </Link>
  ));

  return <aside className="app-sidebar">
    <Link href="/dashboard" className="brand"><DevAcademyLogo size={30} variant="badge" /><span>DevAcademy</span></Link>
    <nav aria-label="Main Navigation">
      <div className="nav-caption">Learning Space</div>
      <div className="nav-group">{items(primary)}</div>
      <div className="nav-caption">References</div>
      <div className="nav-group">{items(library)}</div>
    </nav>
    <div className="sidebar-bottom">
      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
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
              <span style={{ fontSize: 13, fontWeight: 750, color: "#04aa6d" }}>
                {(user.firstName?.[0] || user.name?.[0] || "U").toUpperCase()}
              </span>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                style={{
                  fontWeight: 700,
                  color: "#1e293b",
                  fontSize: 12,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.name}
              </span>
              <button
                onClick={() => logout()}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#ef4444",
                  cursor: "pointer",
                  fontSize: 11,
                  fontWeight: 650,
                  padding: 0,
                  marginLeft: 6,
                }}
              >
                Log Out
              </button>
            </div>
            <span
              style={{
                fontSize: 10,
                color: "#64748b",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block",
                whiteSpace: "nowrap",
              }}
            >
              {user.email}
            </span>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>Learn step by step</span>
          <Link href="/login" style={{ color: "#04aa6d", fontWeight: 700, textDecoration: "none", fontSize: 11 }}>
            Sign In &gt;
          </Link>
        </div>
      )}
    </div>
  </aside>;
}

