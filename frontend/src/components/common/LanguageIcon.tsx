import React from "react";

interface LanguageIconProps {
  lang: string;
  size?: number;
  className?: string;
}

export function LanguageIcon({ lang, size = 18, className = "" }: LanguageIconProps) {
  const normalized = (lang || "").toLowerCase().trim();

  switch (normalized) {
    case "html":
      return (
        <svg
          viewBox="0 0 32 32"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 3l2.6 25 9.4 3 9.4-3L28 3H4z" fill="#E44D26" />
          <path d="M16 28.6l7.4-2.4 2.2-20.8H16v23.2z" fill="#F16529" />
          <path
            d="M9.8 10.4h12.4l-.3 3.2h-8.8l.3 3.2h8.2l-.8 8.6-5.6 1.8-5.6-1.8-.4-4.2h3.2l.2 2 2.6.8 2.6-.8.4-4H9.4l.4-4.8z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "css":
      return (
        <svg
          viewBox="0 0 32 32"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 3l2.6 25 9.4 3 9.4-3L28 3H4z" fill="#1572B6" />
          <path d="M16 28.6l7.4-2.4 2.2-20.8H16v23.2z" fill="#33A9DC" />
          <path
            d="M9.8 10.4h12.4l-.3 3.2h-8.8l.3 3.2h8.2l-.8 8.6-5.6 1.8-5.6-1.8-.4-4.2h3.2l.2 2 2.6.8 2.6-.8.4-4H9.4l.4-4.8z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "javascript":
    case "js":
      return (
        <svg
          viewBox="0 0 32 32"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" rx="4" fill="#F7DF1E" />
          <path
            d="M18.8 25.2c.7 1.2 1.8 2 3.5 2 2 0 3.2-1 3.2-2.5 0-1.8-1.5-2.4-3.8-3.4-3.3-1.4-5.5-3.1-5.5-6.8 0-3.4 2.6-6 6.6-6 2.9 0 4.9 1.1 6.2 3.4l-3.2 2.1c-.7-1.3-1.6-1.8-3-1.8-1.4 0-2.3.9-2.3 2 0 1.4 1 2 3.3 3 3.8 1.6 6.1 3.2 6.1 7.2 0 4.1-3.2 6.6-7.5 6.6-4.1 0-6.7-2-7.8-4.6l4.2-2.2zM7.2 22.8c.4.8.9 1.4 1.8 1.9 1.2.6 2.3.5 3.1-.2 1.1-1 1-2.9 1-5.7V8.5h4.4v10.5c0 3.6-.3 5.9-2.2 7.5-1.9 1.6-4.7 1.7-7.2.7-2-.8-3.2-2.5-3.7-4.4h2.8z"
            fill="#000000"
          />
        </svg>
      );

    case "bootstrap":
      return (
        <svg
          viewBox="0 0 32 32"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" rx="6" fill="#7952B3" />
          <path
            d="M11 7h6.2c3 0 4.8 1.5 4.8 3.8 0 1.6-.9 2.9-2.4 3.4 1.9.5 3 2 3 3.8 0 2.6-2 4.2-5.3 4.2H11V7zm3.8 3.2v4h2.2c1.2 0 2-.6 2-2s-.8-2-2-2h-2.2zm0 6.8v4.2h2.5c1.4 0 2.2-.7 2.2-2.1 0-1.4-.8-2.1-2.2-2.1h-2.5z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "typescript":
    case "ts":
      return (
        <svg
          viewBox="0 0 32 32"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" rx="4" fill="#3178C6" />
          <path
            d="M7 11h9v3h-3v11h-3.2V14H7v-3zm11.5 6.6c.7-.6 1.7-1 2.8-1 1.7 0 2.8.9 2.8 2.2 0 1.2-.8 1.9-2.3 2.5l-1.1.4c-2.3.9-3.4 2-3.4 4 0 2.6 2 4.3 5.1 4.3 1.8 0 3.3-.6 4.3-1.6l-1.6-2.2c-.7.6-1.6 1-2.6 1-1.2 0-2-.6-2-1.6 0-1 .7-1.6 2.2-2.2l1.1-.4c2.5-1 3.7-2.2 3.7-4.3 0-2.8-2.1-4.3-5.2-4.3-1.7 0-3.1.5-4.2 1.4l1.4 2.1z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "python":
      return (
        <svg
          viewBox="0 0 32 32"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8 2c-6.8 0-6.4 3-6.4 3l.01 3.1h6.5v.9H6.4S2 8.5 2 15.3c0 6.9 3.8 6.6 3.8 6.6h2.3v-3.2s-.1-3.8 3.8-3.8h6.5s3.6.1 3.6-3.6V5.6S22.6 2 15.8 2zm-3.6 2.4c.7 0 1.3.6 1.3 1.3 0 .7-.6 1.3-1.3 1.3-.7 0-1.3-.6-1.3-1.3 0-.7.6-1.3 1.3-1.3z"
            fill="#387EB8"
          />
          <path
            d="M16.2 30c6.8 0 6.4-3 6.4-3l-.01-3.1h-6.5v-.9h9.5s4.4.5 4.4-6.3c0-6.9-3.8-6.6-3.8-6.6h-2.3v3.2s.1 3.8-3.8 3.8h-6.5s-3.6-.1-3.6 3.6v5.7s-.6 3.6 6.2 3.6zm3.6-2.4c-.7 0-1.3-.6-1.3-1.3 0-.7.6-1.3 1.3-1.3.7 0 1.3.6 1.3 1.3 0 .7-.6 1.3-1.3 1.3z"
            fill="#FFE873"
          />
        </svg>
      );

    case "java":
      return (
        <svg
          viewBox="0 0 32 32"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.5 25.5s-2 1.5 1.5 2c4.2.6 8.5.5 12.5-.5 0 0 1.5-.9-1.5-1.5-3.5-.7-8.5-.7-12.5 0z" fill="#EA2D2E" />
          <path d="M10.5 22.5s-2.5 2 2 2.5c5.5.6 12 .5 17-.6 0 0 1.5-1.4-2.5-2-4.5-.6-11.5-.7-16.5.1z" fill="#EA2D2E" />
          <path d="M18.5 15.5c2 .2 3.8 1.2 3.5 2.8-.4 2.2-2.8 3.5-5.5 3.5-3.8 0-6.5-1.8-4.5-4.5 1.4-1.8 4.5-2 6.5-1.8z" fill="#5382A1" />
          <path d="M21.5 8.5c1.5 1.8 0 3.5-1.5 4.5-1.5 1-3 1.8-2 3 1.2 1.5 2.5 1 4-.5 2-2 2.5-4.5-.5-7z" fill="#5382A1" />
        </svg>
      );

    case "c":
      return (
        <svg
          viewBox="0 0 32 32"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="16" r="14" fill="#64748B" />
          <path
            d="M21.5 10.5c-1.5-1.2-3.4-1.8-5.5-1.8-4.7 0-8.5 3.3-8.5 7.3s3.8 7.3 8.5 7.3c2.1 0 4-.6 5.5-1.8v-3.2c-1.4 1.2-3 1.8-4.6 1.8-3 0-5.4-2-5.4-4.1s2.4-4.1 5.4-4.1c1.6 0 3.2.6 4.6 1.8v-3.2z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "cpp":
      return (
        <svg
          viewBox="0 0 32 32"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="16" r="14" fill="#00599C" />
          <path
            d="M17 10c-1.2-.9-2.7-1.4-4.4-1.4-3.8 0-6.8 2.6-6.8 5.8s3 5.8 6.8 5.8c1.7 0 3.2-.5 4.4-1.4v-2.5c-1.1 1-2.4 1.4-3.7 1.4-2.4 0-4.3-1.6-4.3-3.3s1.9-3.3 4.3-3.3c1.3 0 2.6.4 3.7 1.4V10z"
            fill="#FFFFFF"
          />
          <path
            d="M20 13h1.5v-1.5h1V13H24v1h-1.5v1.5h-1V14H20v-1zM25 13h1.5v-1.5h1V13H29v1h-1.5v1.5h-1V14H25v-1z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "csharp":
      return (
        <svg
          viewBox="0 0 32 32"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 3l12 7v12l-12 7-12-7V10l12-7z" fill="#9B4F96" />
          <path
            d="M18 10.5c-1.1-.9-2.5-1.4-4-1.4-3.5 0-6.3 2.5-6.3 5.5s2.8 5.5 6.3 5.5c1.5 0 2.9-.5 4-1.4v-2.4c-1 .9-2.2 1.4-3.4 1.4-2.2 0-4-1.5-4-3.1s1.8-3.1 4-3.1c1.2 0 2.4.5 3.4 1.4v-2.4z"
            fill="#FFFFFF"
          />
          <path
            d="M20.5 13.5h1.2v-1.2h.9v1.2h1.2v.8h-1.2v1.2h-.9v-1.2h-1.2v-.8zM24 13.5h1.2v-1.2h.9v1.2h1.2v.8h-1.2v1.2h-.9v-1.2H24v-.8z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "php":
      return (
        <svg
          viewBox="0 0 32 32"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="16" cy="16" rx="14" ry="10" fill="#777BB4" />
          <path
            d="M10 12.5h3c1.5 0 2.5.8 2.5 2s-1 2-2.5 2h-1.5v2.5H10v-6.5zm1.5 1.2v1.6h1.5c.8 0 1.2-.3 1.2-.8s-.4-.8-1.2-.8h-1.5z"
            fill="#FFFFFF"
          />
          <path
            d="M18 12.5h1.5v2.5h2v-2.5H23v6.5h-1.5v-2.8h-2v2.8H18v-6.5z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "go":
      return (
        <svg
          viewBox="0 0 32 32"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" rx="6" fill="#00ADD8" />
          <path
            d="M8 16c0-3.5 2.5-6 6-6 2.2 0 4 1 5 2.5l-2.2 1.8c-.7-1-1.6-1.5-2.8-1.5-2 0-3.4 1.4-3.4 3.2s1.4 3.2 3.4 3.2c1.2 0 2.1-.5 2.8-1.5v-1.2h-3v-2.4h5.6v4.6C18.2 20.8 16.3 22 14 22c-3.5 0-6-2.5-6-6zm14.5-6c3 0 5.5 2.5 5.5 6s-2.5 6-5.5 6-5.5-2.5-5.5-6 2.5-6 5.5-6zm0 2.8c-1.6 0-2.8 1.4-2.8 3.2s1.2 3.2 2.8 3.2 2.8-1.4 2.8-3.2-1.2-3.2-2.8-3.2z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "rust":
      return (
        <svg
          viewBox="0 0 32 32"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="16" r="14" fill="#CE412B" />
          <path
            d="M10 9h6.5c2.8 0 4.5 1.5 4.5 3.8 0 1.6-.9 2.8-2.2 3.4L22 23h-3.4l-2.7-6.2h-2.1V23H10V9zm3.8 3v4.2h2.4c1.2 0 1.9-.7 1.9-2.1 0-1.4-.7-2.1-1.9-2.1h-2.4z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "sql":
      return (
        <svg
          viewBox="0 0 32 32"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="16" cy="7" rx="10" ry="4" fill="#0284C7" />
          <path
            d="M6 7v8c0 2.2 4.5 4 10 4s10-1.8 10-4V7"
            stroke="#0284C7"
            strokeWidth="2.5"
            fill="#E0F2FE"
          />
          <path
            d="M6 15v8c0 2.2 4.5 4 10 4s10-1.8 10-4v-8"
            stroke="#0284C7"
            strokeWidth="2.5"
            fill="#E0F2FE"
          />
        </svg>
      );

    default:
      return (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
}
