import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { webPaketi } from "@/lib/webPaketi";

export const metadata: Metadata = {
    title: "Izrada web stranica – Rijeka i Kvarner",
    description:
        "Izrada web stranica za obrte, male tvrtke i iznajmljivače apartmana: posjetnica od 300 €, poslovna stranica, webshop i održavanje. Izravni upiti i rezervacije bez provizije.",
    alternates: { canonical: "/izrada-web-stranica" },
};

const zaKoga = [
    {
        tag: "Apartmani",
        naslov: "Za iznajmljivače",
        tekst:
            "Booking i Airbnb uzimaju proviziju na svaku rezervaciju. Vlastita stranica donosi izravne upite od gostiju — bez provizije i s izravnim kontaktom.",
        stavke: [
            "Kalendar dostupnosti i procjena cijene boravka",
            "Stranica na hrvatskom, engleskom i njemačkom",
            "Upiti stižu izravno na vaš e-mail",
        ],
    },
    {
        tag: "Obrti",
        naslov: "Za obrte i male tvrtke",
        tekst:
            "Frizeri, saloni, majstori, fizioterapeuti, OPG-ovi — klijenti vas prvo traže na internetu. Neka vas tamo pronađu.",
        stavke: [
            "Jasno predstavljene usluge, cijene i kontakt",
            "Online rezervacija termina, kao na ovoj stranici",
            "Webshop za prodaju vlastitih proizvoda",
        ],
    },
];

const portfelj = [
    {
        tag: "Apartmani · demo",
        naziv: "Apartmani Lumen",
        opis: "Stranica za iznajmljivače na tri jezika, s kalendarom dostupnosti, procjenom cijene i obrascem za upit.",
        href: "https://apartmani-demo.vercel.app",
        link: "Pogledaj demo",
    },
    {
        tag: "Webshop · demo",
        naziv: "Atelier Lumi",
        opis: "Webshop za ručno izrađen nakit: katalog s kategorijama, stranice proizvoda i košarica.",
        href: "https://webshop-template-three.vercel.app",
        link: "Pogledaj demo",
    },
    {
        tag: "Poslovna stranica",
        naziv: "DSC STUDIO",
        opis: "Stranica koju upravo gledate: usluge, cjenik i sustav za online rezervaciju termina s odobravanjem.",
        href: "/termini",
        link: "Isprobaj termine",
    },
];

const koraci = [
    { n: "01", naslov: "Upit i razgovor", opis: "Javite se i ukratko opišite što vam treba. Dogovorimo kratak razgovor, besplatno i bez obveze." },
    { n: "02", naslov: "Ponuda", opis: "Dobivate pisanu ponudu s fiksnom cijenom, popisom stranica i rokom izrade." },
    { n: "03", naslov: "Izrada", opis: "Izrađujem stranicu, a vi je pregledavate i šaljete izmjene. Dva kruga izmjena uključena su u cijenu." },
    { n: "04", naslov: "Objava", opis: "Stranica ide na vašu domenu. Pokažem vam kako sve radi i ostajem dostupna za pitanja." },
];

const pitanja = [
    {
        p: "Koliko traje izrada?",
        o: "Posjetnica je gotova u 1–2 tjedna, poslovna stranica u 2–4 tjedna. Točan rok upisujem u ponudu. Najviše ovisi o tome koliko brzo pripremite tekstove i fotografije.",
    },
    {
        p: "Što trebam pripremiti?",
        o: "Tekstove o sebi i svojim uslugama, fotografije i logo, ako ga imate. Ako nemate gotove tekstove, pomoći ću vam ih složiti.",
    },
    {
        p: "Tko plaća domenu i hosting?",
        o: "Pomažem vam registrirati .hr domenu. Hosting je uključen u mjesečno održavanje, a ako održavanje ne želite, dogovorimo rješenje koje plaćate sami.",
    },
    {
        p: "Mogu li sam/a mijenjati sadržaj?",
        o: "Sitne izmjene uključene su u održavanje — pošaljete mi poruku i promjena je na stranici. Za webshop dobivate upute kako sami dodavati proizvode.",
    },
    {
        p: "Je li stranica prilagođena mobitelima i GDPR-u?",
        o: "Da. Svaka stranica radi na mobitelima, tabletima i računalima, a uključujem i obavijest o privatnosti te obrasce u skladu s GDPR-om.",
    },
    {
        p: "Izdajete li račun?",
        o: "Da, DSC STUDIO je registriran obrt i za svaku uslugu izdajem račun.",
    },
];

export default function IzradaWebStranica() {
    return (
        <>
            <Nav />
            <main>
                {/* Uvod */}
                <section className="mx-auto max-w-6xl px-6 pt-16 pb-14">
                    <p className="mono text-xs uppercase tracking-widest text-forest mb-4">
                        Izrada web stranica · Rijeka i Kvarner
                    </p>
                    <h1 className="text-4xl md:text-6xl leading-[1.05] max-w-3xl mb-6">
                        Web stranice koje{" "}
                        <span className="underline decoration-gold/60 decoration-[0.35em] underline-offset-[-0.2em] [text-decoration-skip-ink:none]">
                            rade za vas
                        </span>
                        .
                    </h1>
                    <p className="text-ink-soft text-lg max-w-2xl mb-8">
                        Moderne, brze stranice za obrte, male tvrtke i iznajmljivače apartmana —
                        s jasnom cijenom, rokom i podrškom nakon objave. Ne samo da lijepo
                        izgledaju, nego donose upite, termine i rezervacije.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/kontakt?tema=izrada-web-stranica"
                            className="rounded-full bg-forest text-paper px-6 py-3 text-sm hover:bg-forest-deep transition-colors"
                        >
                            Pošalji upit
                        </Link>
                        <Link
                            href="#paketi"
                            className="rounded-full border border-line px-6 py-3 text-sm hover:border-forest hover:text-forest transition-colors"
                        >
                            Pogledaj pakete
                        </Link>
                    </div>
                </section>

                {/* Za koga */}
                <section className="border-y border-line bg-paper-alt">
                    <div className="mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-2 gap-6">
                        {zaKoga.map((z) => (
                            <div key={z.tag} className="rounded-3xl bg-paper border border-line p-8 flex flex-col gap-4">
                                <span className="mono text-xs text-forest w-fit rounded-full bg-gold-soft px-3 py-1">
                                    {z.tag}
                                </span>
                                <h2 className="text-2xl md:text-3xl">{z.naslov}</h2>
                                <p className="text-ink-soft">{z.tekst}</p>
                                <ul className="flex flex-col gap-2 mt-2">
                                    {z.stavke.map((s) => (
                                        <li key={s} className="flex gap-3 items-start text-sm text-ink-soft">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-forest shrink-0" />
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Paketi */}
                <section id="paketi" className="mx-auto max-w-6xl px-6 py-20 scroll-mt-24">
                    <h2 className="text-2xl md:text-3xl mb-3">Paketi i cijene</h2>
                    <p className="text-ink-soft mb-10 max-w-xl">
                        Cijena je fiksna i dogovorena unaprijed. Konačni opseg potvrđujemo u
                        pisanoj ponudi.
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {webPaketi.map((p) => (
                            <div
                                key={p.id}
                                className={`rounded-3xl border p-6 flex flex-col gap-4 ${p.istaknuto ? "border-forest bg-forest text-paper" : "border-line bg-paper-alt"
                                    }`}
                            >
                                <div>
                                    {p.istaknuto && (
                                        <span className="mono text-xs text-forest-deep w-fit rounded-full bg-gold px-3 py-1 inline-block mb-3">
                                            Najčešći izbor
                                        </span>
                                    )}
                                    <h3 className="text-xl">{p.naslov}</h3>
                                    <p className={`text-sm mt-2 ${p.istaknuto ? "text-paper/80" : "text-ink-soft"}`}>{p.kratko}</p>
                                </div>
                                <p className="mono text-3xl">
                                    {p.cijena}
                                    <span className={`text-sm ml-1 ${p.istaknuto ? "text-paper/70" : "text-ink-soft"}`}>
                                        {p.jedinica === "mjesečno" ? "/ mj" : ""}
                                    </span>
                                </p>
                                <ul className="flex flex-col gap-2 flex-1">
                                    {p.stavke.map((s) => (
                                        <li key={s} className={`flex gap-2 items-start text-sm ${p.istaknuto ? "text-paper/90" : "text-ink-soft"}`}>
                                            <span className={p.istaknuto ? "text-gold" : "text-forest"}>✓</span>
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/kontakt?tema=izrada-web-stranica"
                                    className={`rounded-full px-5 py-2.5 text-sm text-center transition-colors ${p.istaknuto
                                            ? "bg-gold text-forest-deep hover:brightness-95"
                                            : "border border-line hover:border-forest hover:text-forest"
                                        }`}
                                >
                                    Zatraži ponudu
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Portfelj */}
                <section className="border-y border-line bg-paper-alt">
                    <div className="mx-auto max-w-6xl px-6 py-16">
                        <h2 className="text-2xl md:text-3xl mb-3">Primjeri radova</h2>
                        <p className="text-ink-soft mb-10 max-w-xl">
                            Demo stranice su potpuno funkcionalne — isprobajte kalendar, košaricu
                            ili rezervaciju termina.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                            {portfelj.map((r) => {
                                const vanjski = r.href.startsWith("http");
                                return (
                                    <a
                                        key={r.naziv}
                                        href={r.href}
                                        target={vanjski ? "_blank" : undefined}
                                        rel={vanjski ? "noopener noreferrer" : undefined}
                                        className="group rounded-2xl bg-paper border border-line p-6 flex flex-col gap-3 hover:border-forest transition-colors"
                                    >
                                        <span className="mono text-xs text-forest w-fit rounded-full bg-gold-soft px-3 py-1">
                                            {r.tag}
                                        </span>
                                        <h3 className="text-xl">{r.naziv}</h3>
                                        <p className="text-ink-soft text-sm flex-1">{r.opis}</p>
                                        <span className="text-sm text-forest group-hover:underline">
                                            {r.link} {vanjski ? "↗" : "→"}
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Kako izgleda suradnja */}
                <section className="mx-auto max-w-6xl px-6 py-20">
                    <h2 className="text-2xl md:text-3xl mb-10">Kako izgleda suradnja</h2>
                    <div className="grid md:grid-cols-4 gap-10">
                        {koraci.map((k) => (
                            <div key={k.n}>
                                <p className="mono text-3xl text-sage mb-3">{k.n}</p>
                                <h3 className="text-lg mb-2">{k.naslov}</h3>
                                <p className="text-ink-soft text-sm">{k.opis}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Česta pitanja */}
                <section className="mx-auto max-w-3xl px-6 pb-20">
                    <h2 className="text-2xl md:text-3xl mb-8">Česta pitanja</h2>
                    <div className="flex flex-col gap-3">
                        {pitanja.map((q) => (
                            <details key={q.p} className="group rounded-2xl border border-line bg-paper-alt px-6 py-4">
                                <summary className="list-none cursor-pointer flex justify-between items-center gap-4">
                                    <span>{q.p}</span>
                                    <span className="mono text-forest group-open:rotate-45 transition-transform">+</span>
                                </summary>
                                <p className="text-ink-soft text-sm mt-3">{q.o}</p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* Poziv */}
                <section className="mx-auto max-w-6xl px-6 pb-24">
                    <div className="rounded-3xl bg-forest text-paper px-8 py-14 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl mb-3 max-w-md">
                                Trebate web stranicu?
                            </h2>
                            <p className="text-paper/80 max-w-md">
                                Javite se i opišite što vam treba. Odgovaram unutar 24 sata s
                                prijedlogom i okvirnom cijenom.
                            </p>
                        </div>
                        <Link
                            href="/kontakt?tema=izrada-web-stranica"
                            className="rounded-full bg-gold text-forest-deep px-6 py-3 text-sm font-medium hover:brightness-95 transition-all whitespace-nowrap"
                        >
                            Pošalji upit
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}