import { NextRequest, NextResponse } from "next/server";
import { findSession, saveSnippet, getUserSnippets } from "@/lib/auth-db";

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("devacademy_session")?.value;
    if (!sessionToken) {
      return NextResponse.json({ authenticated: false, snippets: [] }, { status: 200 });
    }

    const sessionData = findSession(sessionToken);
    if (!sessionData) {
      return NextResponse.json({ authenticated: false, snippets: [] }, { status: 200 });
    }

    const snippets = getUserSnippets(sessionData.user.id);
    return NextResponse.json({ authenticated: true, snippets });
  } catch (error: any) {
    console.error("[Get Snippets Error]:", error);
    return NextResponse.json({ error: "Gagal memuat snippet kode" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("devacademy_session")?.value;
    if (!sessionToken) {
      return NextResponse.json(
        { error: "Silakan masuk (login) terlebih dahulu untuk menyimpan kode." },
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
    const { lang, title, code } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Kode tidak boleh kosong." },
        { status: 400 }
      );
    }

    const snippet = saveSnippet({
      userId: sessionData.user.id,
      lang: lang || "html",
      title: title || `${(lang || "HTML").toUpperCase()} Snippet - ${new Date().toLocaleDateString()}`,
      code: code,
    });

    return NextResponse.json({
      success: true,
      snippet,
      message: "Kode berhasil disimpan ke akun Anda!",
    });
  } catch (error: any) {
    console.error("[Save Snippet Error]:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan snippet kode." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("devacademy_session")?.value;
    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionData = findSession(sessionToken);
    if (!sessionData) {
      return NextResponse.json({ error: "Sesi login telah berakhir." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const snippetId = searchParams.get("id");
    if (!snippetId) {
      return NextResponse.json({ error: "Parameter id diperlukan." }, { status: 400 });
    }

    const { deleteSnippet } = await import("@/lib/auth-db");
    const ok = deleteSnippet(sessionData.user.id, snippetId);

    return NextResponse.json({ success: ok });
  } catch (error: any) {
    console.error("[Delete Snippet Error]:", error);
    return NextResponse.json({ error: "Gagal menghapus snippet." }, { status: 500 });
  }
}
