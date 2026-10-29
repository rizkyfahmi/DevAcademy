import { NextRequest, NextResponse } from "next/server";
import { findSession, updateUserName } from "@/lib/auth-db";

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("devacademy_session")?.value;

    if (!sessionToken) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    const sessionData = findSession(sessionToken);
    if (!sessionData) {
      // Token expired or invalid
      const res = NextResponse.json({ authenticated: false, user: null });
      res.cookies.delete("devacademy_session");
      return res;
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: sessionData.user.id,
        email: sessionData.user.email,
        name: sessionData.user.name,
        firstName: sessionData.user.first_name,
        lastName: sessionData.user.last_name,
        role: sessionData.user.role,
        avatarUrl: sessionData.user.avatar_url,
      },
    });
  } catch (error: any) {
    console.error("[Auth Me API Error]:", error);
    return NextResponse.json({ authenticated: false, user: null });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("devacademy_session")?.value;
    if (!sessionToken) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const sessionData = findSession(sessionToken);
    if (!sessionData) {
      return NextResponse.json({ success: false, error: "Session expired" }, { status: 401 });
    }

    const body = await req.json();
    const newName = body.name?.trim();
    if (!newName) {
      return NextResponse.json({ success: false, error: "Nama tidak boleh kosong" }, { status: 400 });
    }

    const updatedUser = updateUserName(sessionData.user.id, newName);
    if (!updatedUser) {
      return NextResponse.json({ success: false, error: "User tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        firstName: updatedUser.first_name,
        lastName: updatedUser.last_name,
        role: updatedUser.role,
        avatarUrl: updatedUser.avatar_url,
      },
    });
  } catch (error: any) {
    console.error("[Update Name API Error]:", error);
    return NextResponse.json({ success: false, error: error.message || "Gagal mengubah nama" }, { status: 500 });
  }
}
