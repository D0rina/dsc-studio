import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const stats = [
  { value: "6", label: "godina u nastavi" },
  { value: "3", label: "obrazovna okruženja" },
  { value: "2", label: "objavljena stručna rada" },
  { value: "CCNA 1–4", label: "mrežni certifikati" },
];

const iskustvo = [
  {
    tag: "Osnovna škola",
    title: "Prvi susret s informatikom",
    desc: "Izvođenje nastave informatike najmlađim učenicima: jasne osnove, strpljiv tempo i redovita komunikacija s roditeljima.",
  },
  {
    tag: "Srednje škole",
    title: "Računalstvo i informatika",
    desc: "Nastava u tehničkoj školi i općoj gimnaziji: programiranje, baze podataka, računalne mreže i web dizajn, uz izradu nastavnih materijala i ispita te mentoriranje učenika.",
  },
  {
    tag: "Obrazovanje odraslih",
    title: "Rad s odraslim polaznicima",
    desc: "Nastava računalstva i informatike u pučkom otvorenom učilištu: praktične vještine, učenje u vlastitom tempu i primjena digitalnih alata.",
  },
];

const obrazovanje = [
  "Stručna specijalistica IT menadžmenta (stručni specijalistički diplomski studij)",
  "Stručna prvostupnica poslovne informatike",
  "Specijalistica za digitalni marketing",
  "Cisco CCNA 1–4, specijalistica za računalne mreže",
  "Tehničarka za računalstvo",
  "Studij matematike te fizike i informatike (nastavnički smjerovi)",
];

const podrucja = [
  "Informatika i računalstvo",
  "Matematika i fizika",
  "Programiranje: Python, C, C++, C#",
  "Baze podataka: SQL",
  "Web: HTML5, CSS, WordPress",
  "Računalne mreže",
];

export default function OMeni() {
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
          <p className="mono text-xs uppercase tracking-widest text-forest mb-4">
            O meni
          </p>
          <h1 className="text-4xl md:text-5xl max-w-3xl mb-6">
            Informatičarka i nastavnica s iskustvom u radu s djecom, mladima i
            odraslima.
          </h1>
          <p className="text-ink-soft max-w-2xl text-lg mb-4">
            Zovem se Doroteja Gregurić i vlasnica sam obrta DSC STUDIO. Šest
            godina predajem računalstvo i informatiku na svim razinama
            obrazovanja, od osnovne škole do obrazovanja odraslih. Zato znam
            prilagoditi tempo, jezik i način objašnjavanja onome tko me sluša.
          </p>
          <p className="text-ink-soft max-w-2xl">
            Trenutačno radim kao nastavnica u srednjoj školi, a u DSC STUDIO-u
            nudim instrukcije, pripremu za maturu, edukacije i izradu
            materijala.
          </p>
        </section>

        <section className="border-y border-line bg-paper-alt">
          <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="mono text-2xl md:text-3xl text-forest mb-1">
                  {s.value}
                </p>
                <p className="text-sm text-ink-soft">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl md:text-3xl mb-3 max-w-xl">
            Radno iskustvo u nastavi
          </h2>
          <p className="text-ink-soft mb-10 max-w-xl">
            Poučavam u tri različita okruženja, a u svakom je cilj isti: jasan
            plan i vidljiv napredak.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {iskustvo.map((e) => (
              <div
                key={e.tag}
                className="rounded-2xl bg-paper-alt border border-line p-6 flex flex-col gap-3"
              >
                <span className="mono text-xs text-forest w-fit rounded-full bg-gold-soft px-3 py-1">
                  {e.tag}
                </span>
                <h3 className="text-xl">{e.title}</h3>
                <p className="text-ink-soft text-sm">{e.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16 grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-line bg-paper-alt p-8">
            <h2 className="text-2xl mb-4">Obrazovanje i certifikati</h2>
            <ul className="flex flex-col gap-3">
              {obrazovanje.map((o) => (
                <li key={o} className="flex gap-3 items-start">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-forest shrink-0" />
                  <span className="text-sm text-ink-soft">{o}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-line bg-paper-alt p-8">
            <h2 className="text-2xl mb-4">Autorski i stručni rad</h2>
            <ul className="flex flex-col gap-3">
              <li className="flex gap-3 items-start">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-forest shrink-0" />
                <span className="text-sm text-ink-soft">
                  Suautorica udžbenika i radne bilježnice za modul Oblikovanje
                  baza podataka za 2. razred srednje škole (izdanje 2026.)
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-forest shrink-0" />
                <span className="text-sm text-ink-soft">
                  Dva stručna rada objavljena u zborniku međunarodne konferencije
                  MIPRO (2023.): o povezanosti matematike s osnovama
                  programiranja i o utjecaju multimedijskih sadržaja na etiku i
                  održivi razvoj kod srednjoškolaca
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <h2 className="text-2xl mb-6">Područja rada</h2>
          <div className="flex flex-wrap gap-3">
            {podrucja.map((p) => (
              <span
                key={p}
                className="mono text-xs text-forest rounded-full bg-gold-soft px-4 py-2"
              >
                {p}
              </span>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="rounded-3xl bg-forest text-paper px-8 py-14 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl mb-3 max-w-md">
                Upoznajmo se.
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