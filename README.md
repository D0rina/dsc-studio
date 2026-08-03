# Nova Znanja — web stranica

Next.js 16 + Tailwind v4 stranica za obrt "Nova Znanja" (instrukcije, priprema za
državnu maturu, edukacije web dizajna).

## Pokretanje lokalno
```
npm install
npm run dev
```

## Prije objave, obavezno izmijeni:
1. **Formspree** — u `components/ContactForm.tsx` zamijeni `FORMSPREE_ENDPOINT`
   svojim endpointom (isto kao na Ring Ring Kennel stranici).
2. **Kontakt podaci** — e-mail, telefon i adresa u `components/Footer.tsx` i
   `app/kontakt/page.tsx` trenutno su placeholderi.
3. **Cijene** — u `app/cjenik/page.tsx`, prilagodi iznose stvarnima.
4. **Tekstovi** — sav sadržaj je smislen placeholder, ali provjeri svaku
   stranicu i prilagodi svom stilu.
5. **OIB / naziv obrta u footeru** — dodaj pravi naziv obrta kad ga
   registriraš (npr. "Nova Znanja, obrt za obrazovne usluge, vl. ...").

## Deploy
Isti postupak kao za prethodne projekte: push na GitHub → import u Vercel.

## Dizajn
- Boje: šumsko zelena (#1F4B43) + zlatna (#D9A52B) na svijetloj papirnatoj podlozi
- Fontovi: Fraunces (naslovi), Inter (tekst), JetBrains Mono (cijene, oznake)
- Signature element: "GradeMark" SVG (ocjena 2 → 5) na početnoj stranici,
  simbolizira ono što instrukcije stvarno rade

## Termini (kalendar + zahtjevi + admin odobravanje)

Ova funkcionalnost treba besplatnu Upstash Redis bazu (traje ~2 minute):

1. Idi na https://upstash.com → registracija (može preko GitHub računa)
2. Create Database → Redis → izaberi regiju blizu Europe
3. U bazi otvori tab **REST API** i kopiraj `UPSTASH_REDIS_REST_URL` i
   `UPSTASH_REDIS_REST_TOKEN`
4. U Vercelu, na projektu → Settings → Environment Variables, dodaj:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
   - `ADMIN_PASSWORD` (lozinka po tvom izboru, za pristup `/admin`)
5. Redeploy — nakon toga `/termini` i `/admin` rade uživo.

Radno vrijeme (koji se termini uopće nude) uređuješ u `lib/slots.ts` —
promijeni sate po danu u tjednu.

**Kako radi tok:**
- Netko na `/termini` odabere slobodan termin i pošalje zahtjev → status "na čekanju"
- Ti na `/admin` (uz lozinku) vidiš zahtjev, odobriš ili odbiješ
- Odobreni termin postaje "zauzeto" svima na `/termini`
- Odbijeni termin se oslobađa

`/admin` nije indeksiran od tražilica, ali link nigdje nije javno istaknut —
zapamti ga ili dodaj u favorite: `tvoja-domena.hr/admin`.
