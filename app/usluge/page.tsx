import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const groups = [
  {
    id: "instrukcije",
    tag: "OŠ / SŠ",
    title: "Instrukcije",
    lead:
      "Individualni ili grupni sati iz informatike i srodnih predmeta, prilagođeni tempu i razini učenika.",
    points: [
      "Nadoknađivanje propuštenog gradiva i priprema za pisane provjere",
      "Rad na razumijevanju, ne samo na zadatku ispred sebe",
      "Kratke povratne informacije roditeljima o napretku",
    ],
  },
  {
    id: "matura",
    tag: "4. razred",
    title: "Priprema za državnu maturu",
    lead:
      "Sustavan pregled ispitnih ishoda iz informatike uz probne ispite i rad na tipičnim greškama.",
    points: [
      "Plan priprema unatrag od datuma ispita",
      "Probni testovi po strukturi stvarnog ispita",
      "Fokus na teme koje najčešće nose bodove",
    ],
  },

  {
    id: "pisanje-radova",
    tag: "Tekst",
    title: "Pomoć u pisanju radova",
    lead:
      "Lektoriranje, oblikovanje i strukturiranje seminarskih, maturalnih i drugih pisanih radova.",
    points: [
      "Lektura i korektura — pravopis, gramatika, stil",
      "Strukturiranje rada: uvod, razrada, zaključak, popis literature",
      "Oblikovanje teksta prema zadanim uputama (fakultet, škola)",
    ],
  },
];

export default function Usluge() {
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
          <p className="mono text-xs uppercase tracking-widest text-forest mb-4">
            Usluge
          </p>
          <h1 className="text-4xl md:text-5xl max-w-2xl mb-4">
            Tri jasno definirana puta do znanja.
          </h1>
          <p className="text-ink-soft max-w-xl text-lg">
            Svaka usluga ima svoj plan i ritam — biraš ono što odgovara
            tvom trenutnom cilju.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24 flex flex-col gap-6">
          {groups.map((g) => (
            <div
              key={g.id}
              id={g.id}
              className="rounded-3xl border border-line bg-paper-alt p-8 md:p-10 grid md:grid-cols-[1fr_1.4fr] gap-8"
            >
              <div>
                <span className="mono text-xs text-forest w-fit rounded-full bg-gold-soft px-3 py-1">
                  {g.tag}
                </span>
                <h2 className="text-2xl md:text-3xl mt-4 mb-3">{g.title}</h2>
                <p className="text-ink-soft">{g.lead}</p>
              </div>
              <div className="flex flex-col justify-center gap-3">
                {g.points.map((p) => (
                  <div key={p} className="flex gap-3 items-start">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-forest shrink-0" />
                    <p className="text-sm text-ink-soft">{p}</p>
                  </div>
                ))}
                <Link
                  href="/kontakt"
                  className="mt-4 text-sm text-forest hover:underline w-fit"
                >
                  Dogovori termin →
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
