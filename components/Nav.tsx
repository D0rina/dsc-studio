import Link from "next/link";

const links = [
  { href: "/", label: "Početna" },
  { href: "/usluge", label: "Usluge" },
  { href: "/termini", label: "Termini" },
  { href: "/cjenik", label: "Cjenik" },
  { href: "/o-meni", label: "O meni" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="display italic text-xl text-forest">
          DSC STUDIO obrt za obrazovanje, proizvodnju i usluge
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm text-ink-soft">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-forest transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/termini"
            className="rounded-full bg-forest text-paper px-5 py-2 text-sm hover:bg-forest-deep transition-colors"
          >
            Zatraži termin
          </Link>
          <details className="lg:hidden relative">
            <summary className="list-none cursor-pointer rounded-full border border-line px-3 py-2 text-sm select-none">
              Izbornik
            </summary>
            <nav className="absolute right-0 mt-2 w-48 rounded-2xl border border-line bg-paper shadow-lg p-3 flex flex-col gap-1 text-sm">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-3 py-2 hover:bg-paper-alt transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
