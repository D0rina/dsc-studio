// Radno vrijeme po danu u tjednu — uredi po potrebi (0 = nedjelja).
export const WORKING_HOURS: Record<number, { start: number; end: number } | null> = {
  0: { start: 15, end: 20 },
  1: { start: 15, end: 20 },
  2: { start: 15, end: 20 },
  3: { start: 15, end: 20 },
  4: { start: 15, end: 20 },
  5: { start: 15, end: 20 },
  6: { start: 10, end: 14 },
};

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
  osnovna: { "1": 14, "2": 12, "3+": 10 },
  srednja: { "1": 16, "2": 14, "3+": 12 },
};

export function priceFor(razina: Razina, grupa: Grupa): number {
  return PRICE_PER_SESSION[razina][grupa];
}

function minutesToTime(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// Svi mogući termini početka (svaki 45 min) unutar radnog vremena danog dana.
export function slotsForDate(date: Date): string[] {
  const hours = WORKING_HOURS[date.getDay()];
  if (!hours) return [];
  const out: string[] = [];
  const endMinutes = hours.end * 60;
  for (let m = hours.start * 60; m + SESSION_MINUTES <= endMinutes; m += SESSION_MINUTES) {
    out.push(minutesToTime(m));
  }
  return out;
}

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