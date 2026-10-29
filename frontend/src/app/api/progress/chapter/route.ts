import { NextRequest, NextResponse } from "next/server";
import { findSession, saveChapterProgress, getUserChapterProgress, getUserStats } from "@/lib/auth-db";

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("devacademy_session")?.value;
    if (!sessionToken) {
      return NextResponse.json({ authenticated: false, chapters: [] }, { status: 401 });
    }

    const sessionData = findSession(sessionToken);
    if (!sessionData) {
      return NextResponse.json({ authenticated: false, chapters: [] }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const tech = searchParams.get("tech") || undefined;

    const chapters = getUserChapterProgress(sessionData.user.id, tech);
    const stats = getUserStats(sessionData.user.id);

    return NextResponse.json({
      authenticated: true,
      chapters,
      stats,
    });
  } catch (error: any) {
    console.error("[Get Chapter Progress Error]:", error);
    return NextResponse.json({ error: "Failed to load chapter progress" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("devacademy_session")?.value;
    if (!sessionToken) {
      return NextResponse.json(
        { error: "Please sign in to save your chapter progress" },
        { status: 401 }
      );
    }

    const sessionData = findSession(sessionToken);
    if (!sessionData) {
      return NextResponse.json(
        { error: "Session expired. Please sign in again." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { tech, chapterSlug } = body;

    if (!tech || !chapterSlug) {
      return NextResponse.json(
        { error: "Missing tech or chapterSlug" },
        { status: 400 }
      );
    }

    const progress = saveChapterProgress({
      userId: sessionData.user.id,
      tech: String(tech),
      chapterSlug: String(chapterSlug),
    });

    const stats = getUserStats(sessionData.user.id);

    return NextResponse.json({
      success: true,
      saved: true,
      progress,
      stats,
    });
  } catch (error: any) {
    console.error("[Save Chapter Progress Error]:", error);
    return NextResponse.json(
      { error: "Failed to save chapter progress" },
      { status: 500 }
    );
  }
}
