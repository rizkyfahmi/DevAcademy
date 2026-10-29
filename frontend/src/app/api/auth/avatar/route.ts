import { NextRequest, NextResponse } from "next/server";
import { findSession } from "@/lib/auth-db";

const DEFAULT_AVATAR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="50" fill="#e2e8f0"/>
  <circle cx="50" cy="40" r="20" fill="#94a3b8"/>
  <path d="M 20 85 C 20 65, 35 60, 50 60 C 65 60, 80 65, 80 85 Z" fill="#94a3b8"/>
</svg>`;

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    let targetUrl = req.nextUrl.searchParams.get("url");

    if (!targetUrl) {
      const sessionToken = req.cookies.get("devacademy_session")?.value;
      if (sessionToken) {
        const sessionData = findSession(sessionToken);
        targetUrl = sessionData?.user.avatar_url || null;
      }
    }

    if (!targetUrl) {
      return new NextResponse(DEFAULT_AVATAR_SVG, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    if (!response.ok) {
      return new NextResponse(DEFAULT_AVATAR_SVG, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (err: any) {
    console.error("[Avatar API Error]:", err);
    return new NextResponse(DEFAULT_AVATAR_SVG, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }
}

