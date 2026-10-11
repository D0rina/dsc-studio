import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DSC STUDIO | Instrukcije i priprema za maturu, Rijeka",
    template: "%s | DSC STUDIO",
  },
  description:
    "Instrukcije, priprema za državnu maturu iz informatike, matematike i fizike, edukacije web dizajna i pomoć u pisanju radova. DSC STUDIO, Rijeka.",
  applicationName: "DSC STUDIO",
  openGraph: {
    type: "website",
    locale: "hr_HR",
    siteName: "DSC STUDIO",
    title: "DSC STUDIO | Instrukcije i priprema za maturu, Rijeka",
    description:
      "Instrukcije, priprema za državnu maturu, edukacije i pomoć u pisanju radova uz jasan plan, korak po korak.",
    images: [{ url: "/logo.png", width: 240, height: 240, alt: "DSC STUDIO" }],
  },
  twitter: {
    card: "summary",
    title: "DSC STUDIO | Instrukcije i priprema za maturu, Rijeka",
    description:
      "Instrukcije, priprema za državnu maturu, edukacije i pomoć u pisanju radova.",
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}