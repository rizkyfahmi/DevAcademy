import { NextResponse } from "next/server";


export async function GET() {
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
              callbackUrl: "http://localhost:3000/api/auth/callback/google",
              guideUrl: "https://console.cloud.google.com/apis/credentials",
              instructions:
                "Create an OAuth 2.0 Client ID in Google Cloud Console with Authorized Redirect URI: http://localhost:3000/api/auth/callback/google, then add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to frontend/.env.local",
            },
      },
      facebook: {
        enabled: hasFacebook,
        name: "Facebook",
        setupInfo: hasFacebook
          ? null
          : {
              envRequired: ["FACEBOOK_APP_ID", "FACEBOOK_APP_SECRET"],
              callbackUrl: "http://localhost:3000/api/auth/callback/facebook",
              guideUrl: "https://developers.facebook.com/apps/",
              instructions:
                "Create a Facebook Login App in Meta for Developers with Valid OAuth Redirect URI: http://localhost:3000/api/auth/callback/facebook, then add FACEBOOK_APP_ID and FACEBOOK_APP_SECRET to frontend/.env.local",
            },
      },
      github: {
        enabled: hasGithub,
        name: "GitHub",
        setupInfo: hasGithub
          ? null
          : {
              envRequired: ["GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET"],
              callbackUrl: "http://localhost:3000/api/auth/callback/github",
              guideUrl: "https://github.com/settings/developers",
              instructions:
                "Create an OAuth App in GitHub Developer Settings with Authorization Callback URL: http://localhost:3000/api/auth/callback/github, then add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET to frontend/.env.local",
            },
      },
    },
  });
}
