import { NextRequest, NextResponse } from "next/server";
import {
  getAndConsumePasskeyChallenge,
  savePasskey,
  findPasskeyByCredentialId,
  createSession,
  findUserById,
} from "@/lib/auth-db";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode, credential, challenge, deviceName } = body;

    if (!credential || !credential.id) {
      return NextResponse.json(
        { error: "Invalid credential data received." },
        { status: 400 }
      );
    }

    // 1. Verify Passkey Registration
    if (mode === "register") {
      const challengeRecord = getAndConsumePasskeyChallenge(challenge);
      if (!challengeRecord || !challengeRecord.userId) {
        return NextResponse.json(
          { error: "Passkey registration challenge expired or invalid. Please try again." },
          { status: 400 }
        );
      }

      const user = findUserById(challengeRecord.userId);
      if (!user) {
        return NextResponse.json({ error: "User not found." }, { status: 404 });
      }

      // Save passkey in database
      const rawPublicKey = credential.response?.publicKey || credential.id;

      savePasskey({
        userId: user.id,
        credentialId: credential.id,
        publicKey: rawPublicKey,
        deviceName: deviceName || "Security Key / Passkey",
      });

      return NextResponse.json({
        success: true,
        message: "Passkey registered successfully! You can now use it to sign in instantly.",
      });
    }

    // 2. Verify Passkey Login
    const challengeRecord = getAndConsumePasskeyChallenge(challenge);
    if (!challengeRecord) {
      return NextResponse.json(
        { error: "Passkey login session expired. Please try again." },
        { status: 400 }
      );
    }

    const passkeyData = findPasskeyByCredentialId(credential.id);
    if (!passkeyData) {
      return NextResponse.json(
        {
          error:
            "No account associated with this passkey was found on this device. Please register this passkey in your account settings first.",
        },
        { status: 401 }
      );
    }

    const user = findUserById(passkeyData.user_id);
    if (!user) {
      return NextResponse.json(
        { error: "Associated user account could not be found." },
        { status: 404 }
      );
    }

    // Passkey authentication successful -> Create session
    const { token, expiresAt } = createSession(user.id);

    const response = NextResponse.json({
      success: true,
      message: "Passkey authentication successful! Welcome back.",
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

    response.cookies.set("devacademy_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("[Passkey Verify API Error]:", error);
    return NextResponse.json(
      { error: "Passkey verification failed. Please try again." },
      { status: 500 }
    );
  }
}
