import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const facts = [
  { label: "Obrazovanje", value: "VERN' — poslovna informatika" },
  { label: "Certifikat", value: "CCNA 1–4, računalne mreže" },
  { label: "Iskustvo", value: "Predavanje informatike u više škola" },
  { label: "Objavljeno", value: "Suautorstvo u udžbeniku iz baza podataka" },
];

export default function OMeni() {
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 grid md:grid-cols-[1.2fr_1fr] gap-12 items-start">
          <div>
            <p className="mono text-xs uppercase tracking-widest text-forest mb-4">
              O meni
            </p>
            <h1 className="text-4xl md:text-5xl mb-6">
              Predajem informatiku jer volim gledati kad gradivo napokon
              "sjedne".
            </h1>
            <p className="text-ink-soft text-lg mb-4">
              Iza mene je nekoliko godina predavanja informatike u osnovnim i
              srednjim školama, rad na programiranju, bazama podataka i
              računalnim mrežama, te suautorstvo dijela udžbenika o dizajnu
              baza podataka.
            </p>
            <p className="text-ink-soft text-lg">
              Kroz Nova Znanja taj rad nastavljam izvan učionice — kroz
              instrukcije, pripremu za maturu i edukacije web dizajna,
              prilagođene svakom učeniku posebno.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-paper-alt p-8 flex flex-col gap-5">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <span className="mono text-xs uppercase tracking-wide text-forest">
                  {f.label}
                </span>
                <span className="text-ink-soft">{f.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-2xl md:text-3xl mb-6 max-w-lg">
            Pristup koji stoji iza svakog sata
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="rounded-2xl border border-line p-6">
              <p className="text-lg mb-2">Jasnoća prije brzine</p>
              <p className="text-ink-soft">
                Ne prelazimo dalje dok gradivo stvarno nije razumljivo — brže
                rješenje danas obično znači isti problem sutra.
              </p>
            </div>
            <div className="rounded-2xl border border-line p-6">
              <p className="text-lg mb-2">Plan, ne improvizacija</p>
              <p className="text-ink-soft">
                Svaki učenik dobiva plan sati vezan uz konkretan cilj i rok, s
                jasnim koracima do njega.
              </p>
            </div>
            <div className="rounded-2xl border border-line p-6">
              <p className="text-lg mb-2">Otvorena komunikacija</p>
              <p className="text-ink-soft">
                Roditelji i učenici znaju gdje stoje — bez nagađanja, uz
                redovite kratke povratne informacije.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="rounded-3xl bg-forest text-paper px-8 py-12 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-2xl max-w-md">
              Javi se i ispričaj mi malo o tome što ti treba.
            </p>
            <Link
              href="/kontakt"
              className="rounded-full bg-gold text-forest-deep px-6 py-3 text-sm font-medium hover:brightness-95 transition-all whitespace-nowrap"
            >
              Kontaktiraj me
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
