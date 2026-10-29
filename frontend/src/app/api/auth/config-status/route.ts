import { NextRequest, NextResponse } from "next/server";

function getAppOrigin(req: NextRequest): string {
  const forwardedHost = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (forwardedHost && !forwardedHost.includes("localhost") && !forwardedHost.includes("127.0.0.1")) {
    const forwardedProto = req.headers.get("x-forwarded-proto") || "https";
    return `${forwardedProto}://${forwardedHost}`;
  }
  if (process.env.NEXT_PUBLIC_APP_URL && !process.env.NEXT_PUBLIC_APP_URL.includes("localhost")) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }
  return req.nextUrl.origin;
}

export async function GET(req: NextRequest) {
  const origin = getAppOrigin(req);

  const hasGoogle = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
  );
  const hasFacebook = Boolean(
    process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET
  );
  const hasGithub = Boolean(
    process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
  );

  return NextResponse.json({
    providers: {
      credentials: {
        enabled: true,
        name: "Email & Password",
      },
      passkey: {
        enabled: true,
        name: "Passkey (WebAuthn)",
      },
      google: {
        enabled: hasGoogle,
        name: "Google",
        setupInfo: hasGoogle
          ? null
          : {
              envRequired: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"],
              callbackUrl: `${origin}/api/auth/callback/google`,
              guideUrl: "https://console.cloud.google.com/apis/credentials",
              instructions: `Create an OAuth 2.0 Client ID in Google Cloud Console with Authorized Redirect URI: ${origin}/api/auth/callback/google, then add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to Vercel Environment Variables.`,
            },
      },
      facebook: {
        enabled: hasFacebook,
        name: "Facebook",
        setupInfo: hasFacebook
          ? null
          : {
              envRequired: ["FACEBOOK_APP_ID", "FACEBOOK_APP_SECRET"],
              callbackUrl: `${origin}/api/auth/callback/facebook`,
              guideUrl: "https://developers.facebook.com/apps/",
              instructions: `Create a Facebook Login App in Meta for Developers with Valid OAuth Redirect URI: ${origin}/api/auth/callback/facebook, then add FACEBOOK_APP_ID and FACEBOOK_APP_SECRET to Vercel Environment Variables.`,
            },
      },
      github: {
        enabled: hasGithub,
        name: "GitHub",
        setupInfo: hasGithub
          ? null
          : {
              envRequired: ["GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET"],
              callbackUrl: `${origin}/api/auth/callback/github`,
              guideUrl: "https://github.com/settings/developers",
              instructions: `Create an OAuth App in GitHub Developer Settings with Authorization Callback URL: ${origin}/api/auth/callback/github, then add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET to Vercel Environment Variables.`,
            },
      },
    },
  });
}
