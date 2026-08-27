export const WORKING_HOURS: Record<number, { start: number; end: number } | null> = {
  0: null,
  1: { start: 15, end: 20 },
  2: { start: 15, end: 20 },
  3: { start: 15, end: 20 },
  4: { start: 15, end: 20 },
  5: { start: 15, end: 20 },
  6: { start: 10, end: 14 },
};

export const SLOT_MINUTES = 15;

export type Razina = "osnovna" | "srednja";

export const PRICE_PER_SLOT: Record<Razina, number> = {
  osnovna: 4, // € po 15 min — osnovna škola
  srednja: 6, // € po 15 min — srednja škola i dalje
};

export const MIN_DURATION = 45; // minute — najkraći termin
export const MAX_DURATION = 180; // minute (3h) — gornja granica za jedan termin

export function priceFor(durationMinutes: number, razina: Razina): number {
  return (durationMinutes / SLOT_MINUTES) * PRICE_PER_SLOT[razina];
}


function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// Svi mogući 15-minutni termini početka unutar radnog vremena danog dana.
export function slotsForDate(date: Date): string[] {
  const hours = WORKING_HOURS[date.getDay()];
  if (!hours) return [];
  const out: string[] = [];
  for (let m = hours.start * 60; m < hours.end * 60; m += SLOT_MINUTES) {
    out.push(minutesToTime(m));
  }
  return out;
}

// Lista 15-minutnih blokova koje zauzima termin zadanog trajanja od "time".
export function occupiedSlots(time: string, durationMinutes: number): string[] {
  const start = timeToMinutes(time);
  const count = durationMinutes / SLOT_MINUTES;
  return Array.from({ length: count }, (_, i) => minutesToTime(start + i * SLOT_MINUTES));
}

// Je li moguće smjestiti termin od "time" u trajanju durationMinutes unutar
// radnog vremena tog dana i bez preklapanja sa zauzetim/pending terminima.
export function canFit(
  date: Date,
  time: string,
  durationMinutes: number,
  busySlots: Set<string>
): boolean {
  const available = new Set(slotsForDate(date));
  const needed = occupiedSlots(time, durationMinutes);
  return needed.every((t) => available.has(t) && !busySlots.has(t));
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
