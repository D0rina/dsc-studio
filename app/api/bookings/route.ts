import { NextRequest, NextResponse } from "next/server";
import { redis, BOOKINGS_KEY } from "@/lib/redis";
import { occupiedSlots, canFit, priceFor, toISODate, Razina } from "@/lib/slots";

export type Booking = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  grade: string; // razred
  topic: string; // gradivo / predmet
  razina: Razina;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM — početak
  duration: number; // u minutama
  price: number; // u eurima
  message?: string;
  status: "pending" | "confirmed" | "rejected";
  createdAt: string;
};

function busySlotsForDate(all: Booking[], date: string): Set<string> {
  const set = new Set<string>();
  for (const b of all) {
    if (b.date !== date || b.status === "rejected") continue;
    for (const t of occupiedSlots(b.time, b.duration)) set.add(t);
  }
  return set;
}

// GET — javno: vraća zauzete 15-minutne blokove po danu (bez osobnih podataka),
// da kalendar zna gdje se odabrano trajanje uopće može smjestiti.
export async function GET() {
  const all = ((await redis.get<Booking[]>(BOOKINGS_KEY)) ?? []) as Booking[];
  const byDate: Record<string, { time: string; status: "pending" | "confirmed" }[]> = {};
  for (const b of all) {
    if (b.status === "rejected") continue;
    byDate[b.date] = byDate[b.date] ?? [];
    for (const t of occupiedSlots(b.time, b.duration)) {
      byDate[b.date].push({ time: t, status: b.status });
    }
  }
  return NextResponse.json({ busyByDate: byDate });
}

// POST — javno: zahtjev za termin. Uvijek ide u "pending" dok se ne odobri.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firstName, lastName, phone, email, grade, topic, date, time, duration, razina, message } =
    body ?? {};

  if (
    !firstName || !lastName || !phone || !email || !grade || !topic ||
    !date || !time || !duration || !razina
  ) {
    return NextResponse.json({ error: "Nedostaju podaci." }, { status: 400 });
  }

  const all = ((await redis.get<Booking[]>(BOOKINGS_KEY)) ?? []) as Booking[];
  const busy = busySlotsForDate(all, date);
  const dateObj = new Date(`${date}T00:00:00`);

  if (toISODate(dateObj) !== date || !canFit(dateObj, time, duration, busy)) {
    return NextResponse.json(
      { error: "Taj termin (u cijelom trajanju) nije slobodan. Izaberi drugi." },
      { status: 409 }
    );
  }

  const booking: Booking = {
    id: crypto.randomUUID(),
    firstName,
    lastName,
    phone,
    email,
    grade,
    topic,
    razina,
    date,
    time,
    duration,
    price: priceFor(duration, razina),
    message,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await redis.set(BOOKINGS_KEY, [...all, booking]);

  return NextResponse.json({ ok: true, booking });
}