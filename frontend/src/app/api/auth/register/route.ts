import { NextRequest, NextResponse } from "next/server";
import { createUser, findUserByEmail, createSession } from "@/lib/auth-db";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName, newsletter } = body;

    // Validation
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check existing
    const existing = findUserByEmail(cleanEmail);
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email address already exists. Please sign in instead." },
        { status: 409 }
      );
    }

    // Create user
    const user = createUser({
      email: cleanEmail,
      password,
      firstName,
      lastName,
      newsletter: Boolean(newsletter),
    });

    // Create session
    const { token, expiresAt } = createSession(user.id);

    const response = NextResponse.json({
      success: true,
      message: "Account created successfully! Welcome to DevAcademy.",
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
    console.error("[Register API Error]:", error);
    return NextResponse.json(
      { error: "Failed to register account. Please try again." },
      { status: 500 }
    );
  }
}
