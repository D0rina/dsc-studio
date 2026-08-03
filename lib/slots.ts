// Radno vrijeme po danu u tjednu — uredi po potrebi (0 = nedjelja).
// Svaki termin traje 1 sat; promijeni START/END ili dodaj/makni dane.
export const WORKING_HOURS: Record<number, { start: number; end: number } | null> = {
  0: null, // nedjelja — ne radi se
  1: { start: 15, end: 20 }, // ponedjeljak 15–20h
  2: { start: 15, end: 20 },
  3: { start: 15, end: 20 },
  4: { start: 15, end: 20 },
  5: { start: 15, end: 20 },
  6: { start: 10, end: 14 }, // subota 10–14h
};

export type Slot = { date: string; time: string }; // date: YYYY-MM-DD, time: "15:00"

export function slotsForDate(date: Date): string[] {
  const hours = WORKING_HOURS[date.getDay()];
  if (!hours) return [];
  const out: string[] = [];
  for (let h = hours.start; h < hours.end; h++) {
    out.push(`${String(h).padStart(2, "0")}:00`);
  }
  return out;
}

export function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function formatWeekday(d: Date): string {
  return d.toLocaleDateString("hr-HR", { weekday: "long" });
}

export function formatDay(d: Date): string {
  return d.toLocaleDateString("hr-HR", { day: "numeric", month: "long" });
}
