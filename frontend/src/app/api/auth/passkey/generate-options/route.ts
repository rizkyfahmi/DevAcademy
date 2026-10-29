import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { savePasskeyChallenge, findSession, findUserByEmail, findPasskeysByUserId } from "@/lib/auth-db";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { mode, email } = body; // mode: 'login' | 'register'
    const host = req.headers.get("host")?.split(":")[0] || "localhost";

    const challenge = crypto.randomBytes(32).toString("base64url");

    if (mode === "register") {
      // Check user session or email
      let userId: string | null = null;
      let userEmail: string = email || "";
      let userName: string = "DevAcademy User";

      const sessionToken = req.cookies.get("devacademy_session")?.value;
      if (sessionToken) {
        const sessionData = findSession(sessionToken);
        if (sessionData) {
          userId = sessionData.user.id;
          userEmail = sessionData.user.email;
          userName = sessionData.user.name;
        }
      }

      if (!userId && userEmail) {
        const existing = findUserByEmail(userEmail);
        if (existing) {
          userId = existing.id;
          userName = existing.name;
        }
      }

      if (!userId) {
        return NextResponse.json(
          { error: "Please log in or register before adding a Passkey to your account." },
          { status: 401 }
        );
      }

      savePasskeyChallenge(challenge, userId);

      // Existing passkeys to exclude from re-registration
      const existingPasskeys = findPasskeysByUserId(userId);
      const excludeCredentials = existingPasskeys.map((p) => ({
        id: p.credential_id,
        type: "public-key" as const,
        transports: ["internal", "hybrid", "usb", "ble", "nfc"],
      }));

      // WebAuthn Creation Options
      const creationOptions = {
        challenge,
        rp: {
          name: "DevAcademy",
          id: host,
        },
        user: {
          id: Buffer.from(userId).toString("base64url"),
          name: userEmail,
          displayName: userName,
        },
        pubKeyCredParams: [
          { alg: -7, type: "public-key" }, // ES256
          { alg: -257, type: "public-key" }, // RS256
        ],
        timeout: 60000,
        attestation: "none",
        authenticatorSelection: {
          residentKey: "preferred",
          userVerification: "preferred",
        },
        excludeCredentials,
      };

      return NextResponse.json({ options: creationOptions });
    }

    // Default: 'login' options
    savePasskeyChallenge(challenge);

    let allowCredentials: any[] = [];
    if (email) {
      const user = findUserByEmail(email);
      if (user) {
        const passkeys = findPasskeysByUserId(user.id);
        allowCredentials = passkeys.map((p) => ({
          id: p.credential_id,
          type: "public-key",
          transports: ["internal", "hybrid", "usb", "ble", "nfc"],
        }));
      }
    }

    const requestOptions = {
      challenge,
      timeout: 60000,
      rpId: host,
      userVerification: "preferred",
      ...(allowCredentials.length > 0 ? { allowCredentials } : {}),
    };

    return NextResponse.json({ options: requestOptions });
  } catch (error: any) {
    console.error("[Passkey Generate Options Error]:", error);
    return NextResponse.json(
      { error: "Failed to generate passkey challenge options." },
      { status: 500 }
    );
  }
}
