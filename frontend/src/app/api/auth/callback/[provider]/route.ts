import { NextRequest, NextResponse } from "next/server";
import {
  findUserByOAuth,
  findUserByEmail,
  createUser,
  linkOAuthAccount,
  createSession,
} from "@/lib/auth-db";


function getAppOrigin(req: NextRequest): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }
  const forwardedHost = req.headers.get("x-forwarded-host") || req.headers.get("host");
  const forwardedProto = req.headers.get("x-forwarded-proto") || (forwardedHost?.includes("localhost") ? "http" : "https");
  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }
  return req.nextUrl.origin;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  const origin = getAppOrigin(req);
  const url = req.nextUrl;

  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const errorDescription = url.searchParams.get("error_description");

  // Handle user cancellation / OAuth provider error
  if (error) {
    console.warn(`[OAuth Callback] Provider error from ${provider}:`, error, errorDescription);
    const msg = error === "access_denied" 
      ? `Login with ${provider} was cancelled.` 
      : (errorDescription || `Authentication with ${provider} failed.`);
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(msg)}`);
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=Authorization+code+missing`);
  }

  try {
    let email: string = "";
    let providerAccountId: string = "";
    let name: string = "";
    let avatarUrl: string = "";

    // 1. Google OAuth
    if (provider === "google") {
      const clientId = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
      const redirectUri = `${origin}/api/auth/callback/google`;

      if (!clientId || !clientSecret) {
        return NextResponse.redirect(`${origin}/login?error=oauth_unconfigured&provider=Google`);
      }

      // Exchange code for token
      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
      });

      const tokenData = await tokenRes.json();
      if (!tokenRes.ok || !tokenData.access_token) {
        throw new Error(tokenData.error_description || "Failed to exchange Google OAuth code");
      }

      // Fetch user profile
      const userRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      const userData = await userRes.json();

      if (!userData.email) {
        throw new Error("Unable to retrieve email from Google account");
      }

      email = userData.email;
      providerAccountId = userData.sub;
      name = userData.name || userData.email.split("@")[0];
      avatarUrl = userData.picture || "";
    }

    // 2. Facebook OAuth
    else if (provider === "facebook") {
      const appId = process.env.FACEBOOK_APP_ID;
      const appSecret = process.env.FACEBOOK_APP_SECRET;
      const redirectUri = `${origin}/api/auth/callback/facebook`;

      if (!appId || !appSecret) {
        return NextResponse.redirect(`${origin}/login?error=oauth_unconfigured&provider=Facebook`);
      }

      const tokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${encodeURIComponent(
        appId
      )}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&client_secret=${encodeURIComponent(appSecret)}&code=${encodeURIComponent(code)}`;

      const tokenRes = await fetch(tokenUrl);
      const tokenData = await tokenRes.json();
      if (!tokenRes.ok || !tokenData.access_token) {
        throw new Error(tokenData.error?.message || "Failed to exchange Facebook OAuth code");
      }

      const userRes = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${tokenData.access_token}`
      );
      const userData = await userRes.json();

      if (!userData.id) {
        throw new Error("Unable to retrieve Facebook user profile");
      }

      providerAccountId = userData.id;
      name = userData.name || "Facebook User";
      email = userData.email || `${userData.id}@facebook.devacademy.id`;
      avatarUrl = userData.picture?.data?.url || "";
    }

    // 3. GitHub OAuth
    else if (provider === "github") {
      const clientId = process.env.GITHUB_CLIENT_ID;
      const clientSecret = process.env.GITHUB_CLIENT_SECRET;

      if (!clientId || !clientSecret) {
        return NextResponse.redirect(`${origin}/login?error=oauth_unconfigured&provider=GitHub`);
      }

      const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      });

      const tokenData = await tokenRes.json();
      if (!tokenRes.ok || !tokenData.access_token) {
        throw new Error(tokenData.error_description || "Failed to exchange GitHub OAuth code");
      }

      const userRes = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "User-Agent": "DevAcademy-App",
        },
      });
      const userData = await userRes.json();

      providerAccountId = String(userData.id);
      name = userData.name || userData.login || "GitHub User";
      avatarUrl = userData.avatar_url || "";

      // GitHub might have private email, fetch emails endpoint
      if (userData.email) {
        email = userData.email;
      } else {
        const emailsRes = await fetch("https://api.github.com/user/emails", {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
            "User-Agent": "DevAcademy-App",
          },
        });
        const emails = await emailsRes.json();
        if (Array.isArray(emails)) {
          const primaryEmail = emails.find((e: any) => e.primary && e.verified) || emails[0];
          email = primaryEmail?.email || `${userData.id}+github@devacademy.id`;
        } else {
          email = `${userData.id}+github@devacademy.id`;
        }
      }
    } else {
      return NextResponse.redirect(`${origin}/login?error=Unknown+OAuth+provider`);
    }

    // Account resolution & linking
    let user = findUserByOAuth(provider, providerAccountId);

    if (!user) {
      // Check if user exists with the same email address
      user = findUserByEmail(email);

      if (!user) {
        // Auto-create new user
        user = createUser({
          email,
          name,
          avatarUrl: avatarUrl || undefined,
        });
      }

      // Link provider to user
      linkOAuthAccount({
        userId: user.id,
        provider,
        providerAccountId,
      });
    }

    // Create session
    const { token, expiresAt } = createSession(user.id);

    const res = NextResponse.redirect(`${origin}/dashboard`);
    res.cookies.set("devacademy_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });
    res.cookies.delete("oauth_state");

    return res;
  } catch (err: any) {
    console.error(`[OAuth Callback Error - ${provider}]:`, err);
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(
        err.message || "Failed to complete authentication"
      )}`
    );
  }
}
