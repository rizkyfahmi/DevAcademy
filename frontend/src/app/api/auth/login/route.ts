import { NextResponse } from "next/server";
import { findUserByEmail, verifyPassword, createSession } from "@/lib/auth-db";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = findUserByEmail(cleanEmail);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password. Please check your credentials." },
        { status: 401 }
      );
    }

    // Check if account was created with OAuth only (no password)
    if (!user.password_hash || !user.salt) {
      return NextResponse.json(
        { 
          error: "This account was registered using an external provider (Google, GitHub, or Facebook). Please sign in using that method or reset your password." 
        },
        { status: 400 }
      );
    }

    // Verify password
    const isValid = verifyPassword(password, user.password_hash, user.salt);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password. Please check your credentials." },
        { status: 401 }
      );
    }

    // Create session
    const { token, expiresAt } = createSession(user.id);

    const response = NextResponse.json({
      success: true,
      message: "Successfully signed in! Welcome back.",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        avatarUrl: user.avatar_url,
      },
    });

    // Set HTTP-only secure session cookie
    response.cookies.set("devacademy_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("[Login API Error]:", error);
    return NextResponse.json(
      { error: "Authentication failed. Please try again." },
      { status: 500 }
    );
  }
}
