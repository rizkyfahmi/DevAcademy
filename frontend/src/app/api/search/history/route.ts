import { NextRequest, NextResponse } from "next/server";
import { 
  findSession, 
  getSearchHistory, 
  addSearchHistory, 
  deleteSearchHistoryItem, 
  clearSearchHistory 
} from "@/lib/auth-db";

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("devacademy_session")?.value;
    if (!sessionToken) {
      return NextResponse.json({ authenticated: false, history: [] }, { status: 200 });
    }

    const sessionData = findSession(sessionToken);
    if (!sessionData) {
      return NextResponse.json({ authenticated: false, history: [] }, { status: 200 });
    }

    const history = getSearchHistory(sessionData.user.id);
    return NextResponse.json({ authenticated: true, history }, { status: 200 });
  } catch (error: any) {
    console.error("[Get Search History API Error]:", error);
    return NextResponse.json({ error: "Gagal memuat riwayat pencarian" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("devacademy_session")?.value;
    if (!sessionToken) {
      return NextResponse.json({ authenticated: false, message: "Guest mode" }, { status: 200 });
    }

    const sessionData = findSession(sessionToken);
    if (!sessionData) {
      return NextResponse.json({ authenticated: false, message: "Session expired" }, { status: 200 });
    }

    const body = await req.json();
    const query = String(body.query || "").trim();
    if (query) {
      addSearchHistory(sessionData.user.id, query);
    }

    const history = getSearchHistory(sessionData.user.id);
    return NextResponse.json({ success: true, history });
  } catch (error: any) {
    console.error("[Add Search History API Error]:", error);
    return NextResponse.json({ error: "Gagal menyimpan riwayat pencarian" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("devacademy_session")?.value;
    if (!sessionToken) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const sessionData = findSession(sessionToken);
    if (!sessionData) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";
    const query = searchParams.get("query");

    if (all) {
      clearSearchHistory(sessionData.user.id);
    } else if (query) {
      deleteSearchHistoryItem(sessionData.user.id, query);
    }

    const history = getSearchHistory(sessionData.user.id);
    return NextResponse.json({ success: true, history });
  } catch (error: any) {
    console.error("[Delete Search History API Error]:", error);
    return NextResponse.json({ error: "Gagal menghapus riwayat pencarian" }, { status: 500 });
  }
}
