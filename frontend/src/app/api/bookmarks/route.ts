import { NextRequest, NextResponse } from "next/server";
import { findSession, toggleBookmark, getUserBookmarks, isChapterBookmarked } from "@/lib/auth-db";

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("devacademy_session")?.value;
    if (!sessionToken) {
      return NextResponse.json({ authenticated: false, bookmarks: [], isBookmarked: false }, { status: 200 });
    }

    const sessionData = findSession(sessionToken);
    if (!sessionData) {
      return NextResponse.json({ authenticated: false, bookmarks: [], isBookmarked: false }, { status: 200 });
    }

    const { searchParams } = new URL(req.url);
    const tech = searchParams.get("tech");
    const chapterSlug = searchParams.get("chapterSlug");

    if (tech && chapterSlug) {
      const isBookmarked = isChapterBookmarked(sessionData.user.id, tech, chapterSlug);
      return NextResponse.json({ authenticated: true, isBookmarked });
    }

    const bookmarks = getUserBookmarks(sessionData.user.id);
    return NextResponse.json({ authenticated: true, bookmarks });
  } catch (error: any) {
    console.error("[Get Bookmarks API Error]:", error);
    return NextResponse.json({ error: "Gagal mengambil data bookmark" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("devacademy_session")?.value;
    if (!sessionToken) {
      return NextResponse.json(
        { error: "Silakan masuk (login) terlebih dahulu untuk menyimpan materi ke bookmark." },
        { status: 401 }
      );
    }

    const sessionData = findSession(sessionToken);
    if (!sessionData) {
      return NextResponse.json(
        { error: "Sesi login telah berakhir. Silakan masuk kembali." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { tech, chapterSlug, title, url } = body;

    if (!tech || !chapterSlug) {
      return NextResponse.json(
        { error: "Parameter tech dan chapterSlug diperlukan." },
        { status: 400 }
      );
    }

    const result = toggleBookmark({
      userId: sessionData.user.id,
      tech: String(tech),
      chapterSlug: String(chapterSlug),
      title: String(title || chapterSlug),
      url: String(url || `/learn/${tech.toLowerCase()}`),
    });

    const bookmarks = getUserBookmarks(sessionData.user.id);

    return NextResponse.json({
      success: true,
      bookmarked: result.bookmarked,
      bookmarks,
      message: result.bookmarked
        ? "Materi berhasil disimpan ke akun Anda!"
        : "Materi dihapus dari bookmark.",
    });
  } catch (error: any) {
    console.error("[Toggle Bookmark API Error]:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan bookmark." },
      { status: 500 }
    );
  }
}
