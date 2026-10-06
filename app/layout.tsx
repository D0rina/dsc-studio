import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DSC STUDIO obrt za obrazovanje, proizvodnju i usluge — Instrukcije, priprema za maturu, edukacije web dizajna",
  description:
    "Instrukcije iz informatike i drugih predmeta, priprema za državnu maturu i edukacije web dizajna. Jasan plan, mjerljiv napredak.",
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
