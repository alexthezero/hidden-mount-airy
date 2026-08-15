import type { Metadata } from "next";
import "./globals.css";

const siteBasePath =
  process.env.GITHUB_PAGES === "true" ? "/hidden-mount-airy" : "";

export const metadata: Metadata = {
  title: "Hidden Mount Airy, NC",
  description:
    "A field guide to unexpected things to do in Mount Airy, North Carolina—from live old-time music and local food trails to river launches and hidden art.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: `${siteBasePath}/favicon.svg`,
    shortcut: `${siteBasePath}/favicon.svg`,
  },
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
