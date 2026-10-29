import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";


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

  const state = crypto.randomBytes(24).toString("hex");

  if (provider === "google") {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      return NextResponse.redirect(
        `${origin}/login?error=oauth_unconfigured&provider=Google`
      );
    }
    const redirectUri = `${origin}/api/auth/callback/google`;
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
      clientId
    )}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=${encodeURIComponent(
      "openid email profile"
    )}&state=${state}&prompt=select_account`;

    const res = NextResponse.redirect(googleAuthUrl);
    res.cookies.set("oauth_state", state, { httpOnly: true, maxAge: 600, path: "/" });
    return res;
  }

  if (provider === "facebook") {
    const appId = process.env.FACEBOOK_APP_ID;
    if (!appId) {
      return NextResponse.redirect(
        `${origin}/login?error=oauth_unconfigured&provider=Facebook`
      );
    }
    const redirectUri = `${origin}/api/auth/callback/facebook`;
    const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${encodeURIComponent(
      appId
    )}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${state}&scope=email,public_profile`;

    const res = NextResponse.redirect(facebookAuthUrl);
    res.cookies.set("oauth_state", state, { httpOnly: true, maxAge: 600, path: "/" });
    return res;
  }

  if (provider === "github") {
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId) {
      return NextResponse.redirect(
        `${origin}/login?error=oauth_unconfigured&provider=GitHub`
      );
    }
    const redirectUri = `${origin}/api/auth/callback/github`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(
      clientId
    )}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent("read:user user:email")}&state=${state}`;

    const res = NextResponse.redirect(githubAuthUrl);
    res.cookies.set("oauth_state", state, { httpOnly: true, maxAge: 600, path: "/" });
    return res;
  }

  return NextResponse.redirect(`${origin}/login?error=unknown_provider`);
}
