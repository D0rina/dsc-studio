import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <p className="display italic text-lg text-forest mb-2">DSC STUDIO</p>
          <p className="text-ink-soft max-w-xs">
            Instrukcije, priprema za državnu maturu, edukacije i pomoć u
            pisanju — uz jasan plan i mjerljiv napredak.
          </p>
        </div>
        <div>
          <p className="mono text-xs uppercase tracking-wide text-ink-soft mb-3">
            Stranice
          </p>
          <ul className="space-y-2">
            <li><Link href="/usluge" className="hover:text-forest">Usluge</Link></li>
            <li><Link href="/cjenik" className="hover:text-forest">Cjenik</Link></li>
            <li><Link href="/o-meni" className="hover:text-forest">O meni</Link></li>
            <li><Link href="/kontakt" className="hover:text-forest">Kontakt</Link></li>
            <li><Link href="/privatnost" className="hover:text-forest">Obavijest o privatnosti</Link></li>
          </ul>
        </div>
        <div>
          <p className="mono text-xs uppercase tracking-wide text-ink-soft mb-3">
            Kontakt
          </p>
          <ul className="space-y-2 text-ink-soft">
            <li>greguricdoroteja@gmail.com</li>
            <li>+385 91 9522169</li>
            <li>Rijeka, Hrvatska</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-4 text-xs text-ink-soft space-y-1">
          <p>
            DSC STUDIO obrt za obrazovanje, proizvodnju i usluge, vl. Doroteja
            Gregurić · Sjedište: Vodovodna 17, Rijeka · OIB: 87974880102
          </p>
          <p>© {new Date().getFullYear()} DSC STUDIO. Sva prava pridržana.</p>
        </div>
      </div>
    </footer>
  );
}