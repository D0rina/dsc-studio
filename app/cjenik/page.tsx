import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const instrukcije = [
  { grupa: "1 osoba", osnovna: "14 €", srednja: "16 €" },
  { grupa: "2 osobe", osnovna: "12 €", srednja: "14 €" },
  { grupa: "3+ osobe", osnovna: "10 €", srednja: "12 €" },
];

const matura = [
  { grupa: "1 osoba", cijena: "480 €" },
  { grupa: "2 osobe", cijena: "350 €" },
  { grupa: "3+ osobe", cijena: "270 €" },
];

const tekstovi = [
  { usluga: "Pisanje i uređivanje teksta", cijena: "10 € po kartici" },
  { usluga: "Lektura i korektura teksta", cijena: "8 € po kartici" },
];

export default function Cjenik() {
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
          <p className="mono text-xs uppercase tracking-widest text-forest mb-4">
            Cjenik
          </p>
          <h1 className="text-4xl md:text-5xl max-w-2xl mb-4">
            Transparentne cijene, bez skrivenih troškova.
          </h1>
          <p className="text-ink-soft max-w-xl text-lg">
            Cijene za grupe su po osobi, ne za cijelu grupu — svatko plaća
            svoj dio. Konačna ponuda može se prilagoditi nakon uvodnog
            razgovora.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <h2 className="text-2xl mb-2">Instrukcije</h2>
          <p className="text-ink-soft text-sm mb-6">Cijena po osobi, za jedan školski sat (45 min)</p>
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-paper-alt text-left">
                  <th className="px-5 py-3 font-normal text-ink-soft">Veličina grupe</th>
                  <th className="px-5 py-3 font-normal text-ink-soft">Osnovna škola</th>
                  <th className="px-5 py-3 font-normal text-ink-soft">Srednja škola i dalje</th>
                </tr>
              </thead>
              <tbody>
                {instrukcije.map((row) => (
                  <tr key={row.grupa} className="border-t border-line">
                    <td className="px-5 py-3">{row.grupa}</td>
                    <td className="px-5 py-3 mono text-forest">{row.osnovna}</td>
                    <td className="px-5 py-3 mono text-forest">{row.srednja}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link href="/termini" className="inline-block mt-4 text-sm text-forest hover:underline">
            Zatraži termin →
          </Link>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <h2 className="text-2xl mb-2">Priprema za državnu maturu</h2>
          <p className="text-ink-soft text-sm mb-6">Cijena po osobi, paket od 40 školskih sati</p>
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-paper-alt text-left">
                  <th className="px-5 py-3 font-normal text-ink-soft">Veličina grupe</th>
                  <th className="px-5 py-3 font-normal text-ink-soft">Cijena (40 sati)</th>
                </tr>
              </thead>
              <tbody>
                {matura.map((row) => (
                  <tr key={row.grupa} className="border-t border-line">
                    <td className="px-5 py-3">{row.grupa}</td>
                    <td className="px-5 py-3 mono text-forest">{row.cijena}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link href="/kontakt" className="inline-block mt-4 text-sm text-forest hover:underline">
            Javi se za dogovor →
          </Link>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <h2 className="text-2xl mb-2">Pisanje i lektura tekstova</h2>
          <p className="text-ink-soft text-sm mb-6">
            Kartica = 1800 znakova s razmacima
          </p>
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-paper-alt text-left">
                  <th className="px-5 py-3 font-normal text-ink-soft">Usluga</th>
                  <th className="px-5 py-3 font-normal text-ink-soft">Cijena</th>
                </tr>
              </thead>
              <tbody>
                {tekstovi.map((row) => (
                  <tr key={row.usluga} className="border-t border-line">
                    <td className="px-5 py-3">{row.usluga}</td>
                    <td className="px-5 py-3 mono text-forest">{row.cijena}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link href="/kontakt" className="inline-block mt-4 text-sm text-forest hover:underline">
            Javi se za dogovor →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}