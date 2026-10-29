import Image from "next/image";
import React from "react";

interface DevAcademyLogoProps {
  size?: number;
  variant?: "badge" | "icon" | "full";
  className?: string;
  style?: React.CSSProperties;
}

export function DevAcademyLogo({
  size = 32,
  variant = "badge",
  className = "",
  style = {},
}: DevAcademyLogoProps) {
  if (variant === "full") {
    return (
      <div
        className={`devacademy-logo-wrap ${className}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          borderRadius: 8,
          overflow: "hidden",
          ...style,
        }}
      >
        <Image
          src="/images/devacademy-logo-dark.png"
          alt="DevAcademy"
          width={Math.round(size * 1.8)}
          height={size}
          style={{ height: size, width: "auto", objectFit: "contain" }}
          priority
        />
      </div>
    );
  }

  if (variant === "icon") {
    return (
      <div
        className={`devacademy-logo-wrap ${className}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          ...style,
        }}
      >
        <Image
          src="/images/devacademy-icon.png"
          alt="DevAcademy Icon"
          width={size}
          height={size}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          priority
        />
      </div>
    );
  }

  // Default: "badge" (dark background square with rounded corners)
  return (
    <span
      className={`devacademy-logo-badge ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.24),
        overflow: "hidden",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#041d17",
        flexShrink: 0,
        boxShadow: "0 2px 8px rgba(4, 29, 23, 0.22)",
        ...style,
      }}
    >
      <Image
        src="/images/devacademy-icon-square.png"
        alt="DevAcademy Logo"
        width={size}
        height={size}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        priority
      />
    </span>
  );
}
