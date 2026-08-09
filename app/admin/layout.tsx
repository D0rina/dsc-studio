import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administracija — DSC STUDIO obrt za obrazovanje, proizvodnju i usluge",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
