import { NextRequest, NextResponse } from "next/server";
import { getDb, deterministicUserId } from "@/lib/auth-db";

function ensureSyncTable() {
  const db = getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_state_sync (
      email TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT,
      avatar_url TEXT,
      state_json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
  return db;
}

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email")?.toLowerCase().trim();
    if (!email) {
      return NextResponse.json({ success: false, state: null });
    }

    const db = ensureSyncTable();
    const stmt = db.prepare(
      "SELECT email, user_id, name, avatar_url, state_json, updated_at FROM user_state_sync WHERE email = ? COLLATE NOCASE"
    );
    const row = stmt.get(email) as any;

    if (row) {
      let parsed = {};
      try {
        parsed = JSON.parse(row.state_json || "{}");
      } catch {}
      return NextResponse.json({
        success: true,
        email: row.email,
        userId: row.user_id,
        name: row.name,
        avatarUrl: row.avatar_url,
        state: parsed,
        updatedAt: row.updated_at,
      });
    }

    return NextResponse.json({ success: true, state: null });
  } catch (err: any) {
    return NextResponse.json({ success: false, state: null, error: err?.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.email?.toLowerCase()?.trim();
    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    const db = ensureSyncTable();
    const now = new Date().toISOString();
    const userId = body.userId || deterministicUserId(email);
    const stateToSave = body.state || {};
    let mergedState = stateToSave;

    if (!body.overwrite) {
      const existingRow = db
        .prepare("SELECT state_json FROM user_state_sync WHERE email = ? COLLATE NOCASE")
        .get(email) as { state_json?: string } | undefined;

      if (existingRow?.state_json) {
        try {
          const prev = JSON.parse(existingRow.state_json);
          mergedState = {
            ...prev,
            ...stateToSave,
            completedChapters: {
              ...(prev.completedChapters || {}),
              ...(stateToSave.completedChapters || {}),
            },
            fullExercises: {
              ...(prev.fullExercises || {}),
              ...(stateToSave.fullExercises || {}),
            },
            chapterExercises: {
              ...(prev.chapterExercises || {}),
              ...(stateToSave.chapterExercises || {}),
            },
            chapterChallenges: {
              ...(prev.chapterChallenges || {}),
              ...(stateToSave.chapterChallenges || {}),
            },
            homeQuizzes: {
              ...(prev.homeQuizzes || {}),
              ...(stateToSave.homeQuizzes || {}),
            },
            lastVisited: {
              ...(prev.lastVisited || {}),
              ...(stateToSave.lastVisited || {}),
            },
          };
        } catch {}
      }
    }

    db.prepare(`
      INSERT INTO user_state_sync (email, user_id, name, avatar_url, state_json, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(email) DO UPDATE SET
        user_id = excluded.user_id,
        name = COALESCE(excluded.name, user_state_sync.name),
        avatar_url = COALESCE(excluded.avatar_url, user_state_sync.avatar_url),
        state_json = excluded.state_json,
        updated_at = excluded.updated_at
    `).run(
      email,
      userId,
      body.name || null,
      body.avatarUrl || null,
      JSON.stringify(mergedState),
      now
    );

    return NextResponse.json({
      success: true,
      state: mergedState,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}
