import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GradeMark } from "@/components/GradeMark";


const services = [
  {
    title: "Instrukcije",
    desc: "Informatika, matematika i srodni predmeti — individualno ili u malim grupama, prilagođeno tempu učenika.",
    tag: "OŠ / SŠ",
  },
  {
    title: "Priprema za maturu",
    desc: "Sustavna priprema za državnu maturu iz informatike, matematike i fizike uz probne ispite i praćenje napretka po ishodima.",
    tag: "4. razred",
  },
  {
    title: "Edukacije web dizajna",
    desc: "Od osnova HTML-a i CSS-a do modernih alata — za srednjoškolce, studente i sve koji žele naučiti graditi web.",
    tag: "Web",
  },
  {
    title: "Pomoć u pisanju radova",
    desc: "Lektoriranje, oblikovanje i strukturiranje seminarskih, maturalnih i drugih pisanih radova.",
    tag: "Tekst",
  },
  {
    title: "Nastavni i edukativni materijali",
    desc: "Izrada nastavnih i edukativnih materijala: radni listovi, vježbe, prezentacije i pripreme za nastavu.",
    tag: "Materijali",
  },
];

const steps = [
  {
    n: "01",
    title: "Kratki razgovor",
    desc: "Utvrdimo trenutno stanje, cilj i rok — ocjena, matura ili konkretna vještina.",
  },
  {
    n: "02",
    title: "Plan rada",
    desc: "Dobiješ jasan plan sati i tema, prilagođen tvom tempu i gradivu iz škole.",
  },
  {
    n: "03",
    title: "Rad i praćenje",
    desc: "Redoviti termini, provjere napretka i korekcija plana kad zatreba.",
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <p className="mono text-xs uppercase tracking-widest text-forest mb-6">
              Instrukcije · Pripreme za maturu · Web dizajn
            </p>

            <h1 className="text-4xl md:text-6xl leading-[1.05] mb-8">
              Znanje s{" "}
              <span className="underline decoration-gold/60 decoration-[0.35em] underline-offset-[-0.2em] [text-decoration-skip-ink:none]">
                planom
              </span>
              .
              <br />
              Rezultati s{" "}
              <span className="underline decoration-gold/60 decoration-[0.35em] underline-offset-[-0.2em] [text-decoration-skip-ink:none]">
                razlogom
              </span>
              .
            </h1>

            <p className="text-ink-soft text-lg mb-8 max-w-md">
              Područje djelovanja obrta čine instrukcije, edukacije i pomoć u učenju,
              uz jasan plan kako doći do cilja – korak po korak.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/termini"
                className="rounded-full bg-forest text-paper px-6 py-3 text-sm hover:bg-forest-deep transition-colors"
              >
                Rezerviraj termin
              </Link>
              <Link
                href="/usluge"
                className="rounded-full border border-line px-6 py-3 text-sm hover:border-forest hover:text-forest transition-colors"
              >
                Pogledaj usluge
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end reveal">
            <GradeMark from="2" to="5" size={1.3} />
          </div>
        </section>

        <section className="border-y border-line bg-paper-alt">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-2xl md:text-3xl mb-10 max-w-xl">
              Četiri načina da napredujemo zajedno
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="rounded-2xl bg-paper border border-line p-6 flex flex-col gap-3"
                >
                  <span className="mono text-xs text-forest w-fit rounded-full bg-gold-soft px-3 py-1">
                    {s.tag}
                  </span>
                  <h3 className="text-xl">{s.title}</h3>
                  <p className="text-ink-soft text-sm flex-1">{s.desc}</p>
                  <Link
                    href="/usluge"
                    className="text-sm text-forest hover:underline mt-2"
                  >
                    Saznaj više →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-2xl md:text-3xl mb-10 max-w-xl">
            Kako izgleda suradnja
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((s) => (
              <div key={s.n}>
                <p className="mono text-3xl text-sage mb-3">{s.n}</p>
                <h3 className="text-lg mb-2">{s.title}</h3>
                <p className="text-ink-soft text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="rounded-3xl bg-forest text-paper px-8 py-14 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl mb-3 max-w-md">
                Spremni za prvi korak prema boljoj ocjeni?
              </h2>
              <p className="text-paper/80 max-w-md">
                Javi se, dogovorimo besplatan uvodni razgovor i vidimo gdje
                možemo krenuti.
              </p>
            </div>
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
