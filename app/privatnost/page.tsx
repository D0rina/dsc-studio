import Link from "next/link";

export const metadata = {
    title: "Obavijest o privatnosti | DSC STUDIO",
};

export default function PrivatnostPage() {
    return (
        <main className="mx-auto max-w-3xl px-6 py-16">
            <h1 className="text-4xl mb-2">Obavijest o privatnosti</h1>
            <p className="text-ink-soft text-sm mb-10">
                Zadnja izmjena: 7. 10. 2026.
            </p>

            <div className="space-y-8 leading-relaxed">
                <section>
                    <h2 className="text-2xl mb-2">1. Tko obrađuje vaše podatke</h2>
                    <p>
                        Voditelj obrade je DSC STUDIO, paušalni obrt, vl. Doroteja Greguric,
                        Rijeka. OIB: 87974880102. Adresa sjedišta: Vodovodna 17, Rijeka.
                    </p>
                    <p className="mt-2">
                        Kontakt za sva pitanja o osobnim podacima:{" "}
                        <a className="text-forest hover:underline" href="mailto:greguricdoroteja@gmail.com">
                            greguricdoroteja@gmail.com
                        </a>
                        , 091 95 22 169.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl mb-2">2. Koje podatke prikupljamo i zašto</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <strong>Zahtjev za termin:</strong> ime i prezime, e-adresa,
                            broj telefona, odabrana razina i veličina grupe, željeni termin
                            i eventualna napomena. Koristimo ih kako bismo potvrdili ili
                            odbili termin i održali nastavu. Pravna osnova je poduzimanje
                            radnji na vaš zahtjev prije sklapanja ugovora i izvršenje
                            ugovora (čl. 6. st. 1. t. b GDPR-a).
                        </li>
                        <li>
                            <strong>Kontakt obrazac:</strong> ime i prezime, e-adresa, broj
                            mobitela, tema upita i sadržaj poruke. Koristimo ih kako bismo
                            odgovorili na vaš upit. Pravna osnova je poduzimanje radnji na
                            vaš zahtjev (čl. 6. st. 1. t. b) odnosno naš legitimni interes da
                            odgovorimo na upite (čl. 6. st. 1. t. f).
                        </li>
                        <li>
                            <strong>Izdavanje računa:</strong> podaci potrebni za račun i
                            knjigovodstvo. Pravna osnova je zakonska obveza (čl. 6. st. 1.
                            t. c).
                        </li>
                    </ul>
                    <p className="mt-2">
                        Ne prodajemo vaše podatke i ne koristimo ih za automatizirano
                        odlučivanje ni za marketing treće strane.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl mb-2">3. Polaznici mlađi od 16 godina</h2>
                    <p>
                        Ako je polaznik mlađi od 16 godina, zahtjev za termin i podatke
                        šalje roditelj ili skrbnik. Podatke djece ne prikupljamo bez
                        znanja roditelja ili skrbnika.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl mb-2">4. Tko još vidi vaše podatke</h2>
                    <p>
                        Za rad stranice koristimo pružatelje usluga koji podatke obrađuju
                        u naše ime:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                        <li>Netlify, za hosting web stranice;</li>
                        <li>Upstash, za pohranu zahtjeva za termine;</li>
                        <li>Formspree, za slanje e-poruka s obrazaca na našu e-adresu.</li>
                    </ul>
                    <p className="mt-2">
                        Neki od njih mogu obrađivati podatke izvan Europskog gospodarskog
                        prostora (npr. u SAD-u), uz odgovarajuće zaštitne mjere poput
                        standardnih ugovornih klauzula.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl mb-2">5. Koliko dugo čuvamo podatke</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Zahtjevi za termine i podaci o održanoj nastavi: do 24 mjeseca od posljednjeg termina.</li>
                        <li>Upiti s kontakt obrasca: do 12 mjeseci od posljednje poruke.</li>
                        <li>Računi i računovodstvene isprave: rokove određuju porezni i računovodstveni propisi.</li>
                    </ul>
                    <p className="mt-2">Nakon isteka roka podatke brišemo.</p>
                </section>

                <section>
                    <h2 className="text-2xl mb-2">6. Kolačići</h2>
                    <p>
                        Stranica ne koristi kolačiće za praćenje ni analitiku. Jedini
                        kolačić je tehnički kolačić za prijavu u administratorski dio,
                        koji koristi samo vlasnica obrta.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl mb-2">7. Vaša prava</h2>
                    <p>Imate pravo:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                        <li>zatražiti pristup svojim podacima;</li>
                        <li>zatražiti ispravak netočnih podataka;</li>
                        <li>zatražiti brisanje podataka;</li>
                        <li>zatražiti ograničenje obrade;</li>
                        <li>zatražiti prijenos podataka;</li>
                        <li>prigovoriti na obradu temeljenu na legitimnom interesu.</li>
                    </ul>
                    <p className="mt-2">
                        Zahtjev pošaljite na e-adresu iz točke 1. Ako smatrate da su vaša
                        prava povrijeđena, možete podnijeti pritužbu Agenciji za zaštitu
                        osobnih podataka (AZOP),{" "}
                        <a className="text-forest hover:underline" href="https://azop.hr" target="_blank" rel="noreferrer">
                            azop.hr
                        </a>
                        .
                    </p>
                </section>

                <p className="text-sm text-ink-soft pt-4">
                    <Link href="/kontakt" className="text-forest hover:underline">
                        Imate pitanje? Javite nam se →
                    </Link>
                </p>
            </div>
        </main>
    );
}