import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth-db";


export async function POST(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("devacademy_session")?.value;
    if (sessionToken) {
      deleteSession(sessionToken);
    }

    const res = NextResponse.json({ success: true, message: "Logged out successfully" });
    res.cookies.set("devacademy_session", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });
    return res;
  } catch (error: any) {
    console.error("[Logout API Error]:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
