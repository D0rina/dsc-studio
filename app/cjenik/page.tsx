import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const instrukcije = [
  { grupa: "1 polaznik", osnovna: "15 €", srednja: "17 €" },
  { grupa: "2 polaznika", osnovna: "12 €", srednja: "14 €" },
  { grupa: "3+ polaznika", osnovna: "10 €", srednja: "12 €" },
];

const matura = [
  { grupa: "1 polaznik", cijena: "480 €" },
  { grupa: "2 polaznika", cijena: "350 €" },
  { grupa: "3+ polaznika", cijena: "270 €" },
];

const tekstovi = [
  { usluga: "Pisanje i uređivanje teksta", jedinica: "kartica teksta", cijena: "10 €" },
  { usluga: "Lektura i korektura teksta", jedinica: "kartica teksta", cijena: "8 €" },
  { usluga: "Izrada nastavnih materijala", jedinica: "po komadu", cijena: "20 €" },
  {
    usluga: "Izrada edukativnih materijala po narudžbi",
    jedinica: "po komadu",
    cijena: "30 €",
  },
];

export default function Cjenik() {
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
          <p className="mono text-xs uppercase tracking-widest text-forest mb-4">
            Cjenik usluga
          </p>
          <h1 className="text-4xl md:text-5xl max-w-2xl mb-4">
            Transparentne cijene, bez skrivenih troškova.
          </h1>
          <p className="text-ink-soft max-w-xl text-lg mb-3">
            Cijene za grupe su po osobi, ne za cijelu grupu — svatko plaća
            svoj dio.
          </p>
          <p className="mono text-xs text-ink-soft">
            Cijene vrijede od 10. 9. 2026.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <h2 className="text-2xl mb-2">Instrukcije</h2>
          <p className="text-ink-soft text-sm mb-6">
            Cijena po polazniku, 45 min termin
          </p>
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-paper-alt text-left">
                  <th className="px-5 py-3 font-normal text-ink-soft">Veličina grupe</th>
                  <th className="px-5 py-3 font-normal text-ink-soft">Osnovna škola</th>
                  <th className="px-5 py-3 font-normal text-ink-soft">Srednja škola</th>
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
          <h2 className="text-2xl mb-2">Priprema za maturu</h2>
          <p className="text-ink-soft text-sm mb-6">
            Paket pripreme: 20 termina × 90 min, cijena po polazniku
          </p>
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-paper-alt text-left">
                  <th className="px-5 py-3 font-normal text-ink-soft">Veličina grupe</th>
                  <th className="px-5 py-3 font-normal text-ink-soft">Cijena paketa</th>
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
          <h2 className="text-2xl mb-2">Pisanje radova</h2>
          <p className="text-ink-soft text-sm mb-6">
            Usluge pisanja i uređivanja. Kartica = 1800 znakova s razmacima.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-paper-alt text-left">
                  <th className="px-5 py-3 font-normal text-ink-soft">Usluga</th>
                  <th className="px-5 py-3 font-normal text-ink-soft">Jedinica</th>
                  <th className="px-5 py-3 font-normal text-ink-soft">Cijena</th>
                </tr>
              </thead>
              <tbody>
                {tekstovi.map((row) => (
                  <tr key={row.usluga} className="border-t border-line">
                    <td className="px-5 py-3">{row.usluga}</td>
                    <td className="px-5 py-3 text-ink-soft">{row.jedinica}</td>
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