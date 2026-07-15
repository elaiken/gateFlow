import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "gateFlow",
    template: "%s | gateFlow",
  },
  description: "Mobile-first access management for gated communities.",
  applicationName: "gateFlow",
  keywords: [
    "gate access",
    "visitor management",
    "community security",
    "temporary access pass",
    "QR access",
    "delivery access",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#111827",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}