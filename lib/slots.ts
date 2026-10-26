// ====================== RASPORED TERMINA ======================
// Tjedni se izmjenjuju: "popodne" (škola popodne) i "ujutro" (škola ujutro).
// Tjedan koji počinje ponedjeljkom ispod je POPODNEVNI, sljedeći je jutarnji itd.
const POPODNE_TJEDAN_PONEDJELJAK = "2026-10-26";

type Window = { start: string; end: string }; // "HH:MM"
type TjedanTip = "ujutro" | "popodne";

const VIKEND: Record<number, Window[]> = {
  // Nedjelja cijeli dan (promijeni sate po želji), subota kao dosad.
  0: [{ start: "09:00", end: "20:00" }],
  6: [{ start: "10:00", end: "14:00" }],
};

const SCHEDULE: Record<TjedanTip, Record<number, Window[]>> = {
  // Škola ujutro: slobodna si od 17:00 do 20:00.
  ujutro: {
    ...VIKEND,
    1: [{ start: "17:00", end: "20:00" }],
    2: [{ start: "17:00", end: "20:00" }],
    3: [{ start: "17:00", end: "20:00" }],
    4: [{ start: "17:00", end: "20:00" }],
    5: [{ start: "17:00", end: "20:00" }],
  },
  // Škola popodne: ujutro si slobodna. Srijeda 8:30-9:15 je zauzeta.
  popodne: {
    ...VIKEND,
    1: [{ start: "08:00", end: "12:00" }],
    2: [{ start: "08:00", end: "12:00" }],
    3: [{ start: "09:15", end: "12:00" }],
    4: [{ start: "08:00", end: "15:00" }],
    5: [{ start: "08:00", end: "15:00" }],
  },
};

// Iznimke za pojedine datume (praznici, jednokratne promjene).
// Prazan popis = nema termina taj dan. Primjer:
// "2026-12-24": [],
// "2026-12-28": [{ start: "10:00", end: "18:00" }],
const EXCEPTIONS: Record<string, Window[]> = {};
// ===============================================================

export const SESSION_MINUTES = 45; // jedan "školski sat" — fiksno trajanje termina

export type Razina = "osnovna" | "srednja";
export type Grupa = "1" | "2" | "3+";

export const GRUPA_LABEL: Record<Grupa, string> = {
  "1": "1 osoba",
  "2": "2 osobe",
  "3+": "3+ osobe",
};

// € po osobi, po jednom školskom satu (45 min)
export const PRICE_PER_SESSION: Record<Razina, Record<Grupa, number>> = {
  osnovna: { "1": 15, "2": 12, "3+": 10 },
  srednja: { "1": 17, "2": 14, "3+": 12 },
};

export function priceFor(razina: Razina, grupa: Grupa): number {
  return PRICE_PER_SESSION[razina][grupa];
}

function toMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

const DAY_MS = 24 * 60 * 60 * 1000;

function utcDay(y: number, m: number, d: number): number {
  return Date.UTC(y, m, d);
}

// Je li taj datum u "popodne" ili "ujutro" tjednu.
export function tjedanTip(date: Date): TjedanTip {
  const [ay, am, ad] = POPODNE_TJEDAN_PONEDJELJAK.split("-").map(Number);
  const anchor = utcDay(ay, am - 1, ad);
  const offset = (date.getDay() + 6) % 7; // pomak do ponedjeljka
  const monday = utcDay(date.getFullYear(), date.getMonth(), date.getDate() - offset);
  const weeks = Math.round((monday - anchor) / (7 * DAY_MS));
  return ((weeks % 2) + 2) % 2 === 0 ? "popodne" : "ujutro";
}

function windowsForDate(date: Date): Window[] {
  const iso = toISODate(date);
  if (iso in EXCEPTIONS) return EXCEPTIONS[iso];
  return SCHEDULE[tjedanTip(date)][date.getDay()] ?? [];
}

// Svi mogući termini početka (svaki 45 min) unutar slobodnih vremena danog dana.
export function slotsForDate(date: Date): string[] {
  const out: string[] = [];
  for (const w of windowsForDate(date)) {
    const endMinutes = toMinutes(w.end);
    for (let m = toMinutes(w.start); m + SESSION_MINUTES <= endMinutes; m += SESSION_MINUTES) {
      out.push(minutesToTime(m));
    }
  }
  return out;
}

// Zadržano zbog kompatibilnosti ako ga neka druga datoteka uvozi.
export const WORKING_HOURS: Record<number, { start: number; end: number } | null> =
  Object.fromEntries(
    [0, 1, 2, 3, 4, 5, 6].map((day) => {
      const all = [
        ...SCHEDULE.ujutro[day],
        ...SCHEDULE.popodne[day],
      ];
      if (all.length === 0) return [day, null];
      return [
        day,
        {
          start: Math.floor(Math.min(...all.map((w) => toMinutes(w.start))) / 60),
          end: Math.ceil(Math.max(...all.map((w) => toMinutes(w.end))) / 60),
        },
      ];
    })
  );

export function toISODate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatWeekday(d: Date): string {
  return d.toLocaleDateString("hr-HR", { weekday: "long" });
}

export function formatDay(d: Date): string {
  return d.toLocaleDateString("hr-HR", { day: "numeric", month: "long" });
}