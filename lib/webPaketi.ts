// ================= PAKETI IZRADE WEB STRANICA =================
// Jedno mjesto za cijene: koriste ih stranica /izrada-web-stranica i /cjenik.
// Kad mijenjaš cijenu ovdje, promijeni je i u blagajni.
// ===============================================================

export type WebPaket = {
    id: string;
    naziv: string; // naziv kao u cjeniku i blagajni
    naslov: string; // kraći naslov za karticu paketa
    kratko: string;
    cijena: string;
    jedinica: "po komadu" | "mjesečno";
    istaknuto?: boolean;
    stavke: string[];
};

export const webPaketi: WebPaket[] = [
    {
        id: "posjetnica",
        naziv: "Web stranica – posjetnica",
        naslov: "Posjetnica",
        kratko: "Jedna pregledna stranica za obrt koji treba biti vidljiv na internetu.",
        cijena: "300 €",
        jedinica: "po komadu",
        stavke: [
            "Jedna stranica: o vama, usluge, kontakt",
            "Karta s lokacijom i radno vrijeme",
            "Prilagođeno mobitelima",
            "Pomoć oko .hr domene",
        ],
    },
    {
        id: "poslovna",
        naziv: "Web stranica – poslovna",
        naslov: "Poslovna stranica",
        kratko: "Za obrte, tvrtke i apartmane koji žele više od posjetnice.",
        cijena: "750 €",
        jedinica: "po komadu",
        istaknuto: true,
        stavke: [
            "Do 5 podstranica (usluge, galerija, cjenik…)",
            "Kontakt obrazac ili obrazac za upit",
            "Osnovni SEO: naslovi, opisi, sitemap",
            "Po želji: online termini ili kalendar dostupnosti",
            "Po želji: više jezika (HR, EN, DE)",
        ],
    },
    {
        id: "webshop",
        naziv: "Izrada webshopa",
        naslov: "Webshop",
        kratko: "Za OPG-ove, rukotvorine i male proizvođače koji prodaju online.",
        cijena: "1.200 €",
        jedinica: "po komadu",
        stavke: [
            "Katalog proizvoda s kategorijama",
            "Stranica svakog proizvoda s fotografijama",
            "Košarica i narudžba e-mailom",
            "Upute kako sami dodavati proizvode",
        ],
    },
    {
        id: "odrzavanje",
        naziv: "Održavanje web stranice",
        naslov: "Održavanje",
        kratko: "Da se o stranici ne morate brinuti nakon objave.",
        cijena: "30 €",
        jedinica: "mjesečno",
        stavke: [
            "Izmjene tekstova, cijena i fotografija",
            "Tehnička ažuriranja i sigurnost",
            "Hosting i praćenje rada stranice",
        ],
    },
];