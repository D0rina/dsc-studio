import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const plans = [
  {
    title: "Pojedinačni sat",
    price: "20 €",
    unit: "/ sat",
    desc: "Za povremenu pomoć oko gradiva ili konkretnog zadatka.",
    features: ["60 minuta", "Online ili uživo", "Bez obveze paketa"],
  },
  {
    title: "Paket priprema",
    price: "18 €",
    unit: "/ sat",
    desc: "Za kontinuiran rad kroz cijelo polugodište ili do mature.",
    features: [
      "8 ili 12 sati unaprijed",
      "Plan rada po tjednima",
      "Probni testovi uključeni",
    ],
    featured: true,
  },
  {
    title: "Edukacija web dizajna",
    price: "150 €",
    unit: "/ tečaj",
    desc: "Cjelovita edukacija u više termina, sa stvarnim projektom.",
    features: ["6 susreta", "Materijali uključeni", "Gotova osobna stranica"],
  },
  {
    title: "Lektoriranje i oblikovanje",
    price: "4 €",
    unit: "/ kartica",
    desc: "Lektura, korektura i oblikovanje seminarskih i maturalnih radova.",
    features: [
      "Kartica = 1800 znakova s razmacima",
      "Provjera pravopisa, gramatike i stila",
      "Strukturiranje i usklađivanje s uputama",
    ],
  },
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
            Orijentacijske cijene niže — konačna ponuda ovisi o razini,
            učestalosti i broju termina. Cijene su okvirne i mogu se
            prilagoditi nakon uvodnog razgovora.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p) => (
            <div
              key={p.title}
              className={`rounded-3xl p-8 flex flex-col border ${
                p.featured
                  ? "bg-forest text-paper border-forest"
                  : "bg-paper-alt border-line"
              }`}
            >
              <h2 className="text-xl mb-1">{p.title}</h2>
              <p
                className={`text-sm mb-6 ${
                  p.featured ? "text-paper/75" : "text-ink-soft"
                }`}
              >
                {p.desc}
              </p>
              <p className="mono text-3xl mb-6">
                {p.price}
                <span className="text-sm opacity-70">{p.unit}</span>
              </p>
              <div className="flex flex-col gap-2 flex-1">
                {p.features.map((f) => (
                  <div key={f} className="flex gap-2 items-start text-sm">
                    <span
                      className={`mt-1.5 h-1 w-1 rounded-full shrink-0 ${
                        p.featured ? "bg-gold" : "bg-forest"
                      }`}
                    />
                    <span className={p.featured ? "text-paper/90" : "text-ink-soft"}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/kontakt"
                className={`mt-8 text-center rounded-full px-5 py-3 text-sm transition-colors ${
                  p.featured
                    ? "bg-gold text-forest-deep hover:brightness-95"
                    : "border border-line hover:border-forest hover:text-forest"
                }`}
              >
                Zatraži ponudu
              </Link>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
