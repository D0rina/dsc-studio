import { NextRequest, NextResponse } from "next/server";
import { redis, BOOKINGS_KEY } from "@/lib/redis";
import { priceFor, toISODate, slotsForDate, SESSION_MINUTES, Razina, Grupa } from "@/lib/slots";

export type Booking = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  grade: string; // razred
  topic: string; // gradivo / predmet
  razina: Razina;
  grupa: Grupa;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM — početak
  duration: number; // uvijek 45
  price: number; // € po osobi
  message?: string;
  status: "pending" | "confirmed" | "rejected";
  createdAt: string;
};

// GET — javno: vraća zauzete termine po danu (bez osobnih podataka).
export async function GET() {
  const all = ((await redis.get<Booking[]>(BOOKINGS_KEY)) ?? []) as Booking[];
  const byDate: Record<string, { time: string; status: "pending" | "confirmed" }[]> = {};
  for (const b of all) {
    if (b.status === "rejected") continue;
    byDate[b.date] = byDate[b.date] ?? [];
    byDate[b.date].push({ time: b.time, status: b.status });
  }
  return NextResponse.json({ busyByDate: byDate });
}

// POST — javno: zahtjev za termin. Uvijek ide u "pending" dok se ne odobri.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firstName, lastName, phone, email, grade, topic, date, time, razina, grupa, message } =
    body ?? {};

  if (
    !firstName || !lastName || !phone || !email || !grade || !topic ||
    !date || !time || !razina || !grupa
  ) {
    return NextResponse.json({ error: "Nedostaju podaci." }, { status: 400 });
  }

  const validDateFormat = /^\d{4}-\d{2}-\d{2}$/.test(date);
  if (!validDateFormat) {
    return NextResponse.json({ error: "Neispravan datum." }, { status: 400 });
  }
  if (!["osnovna", "srednja"].includes(razina) || !["1", "2", "3+"].includes(grupa)) {
    return NextResponse.json({ error: "Neispravni podaci." }, { status: 400 });
  }

  // Datum mora stvarno postojati, a termin mora biti na popisu dostupnih termina po rasporedu.
  const [y, mo, d] = date.split("-").map(Number);
  const dateObj = new Date(y, mo - 1, d);
  if (toISODate(dateObj) !== date) {
    return NextResponse.json({ error: "Neispravan datum." }, { status: 400 });
  }
  if (!slotsForDate(dateObj).includes(time)) {
    return NextResponse.json({ error: "Taj termin nije dostupan." }, { status: 400 });
  }

  // Ne dopuštamo termine u prošlosti (po vremenu u Hrvatskoj).
  const now = new Date();
  const todayISO = now.toLocaleDateString("sv-SE", { timeZone: "Europe/Zagreb" });
  const nowTime = now.toLocaleTimeString("sv-SE", {
    timeZone: "Europe/Zagreb",
    hour: "2-digit",
    minute: "2-digit",
  });
  if (date < todayISO || (date === todayISO && time <= nowTime)) {
    return NextResponse.json({ error: "Taj je termin već prošao." }, { status: 400 });
  }
  const all = ((await redis.get<Booking[]>(BOOKINGS_KEY)) ?? []) as Booking[];
  const alreadyTaken = all.some(
    (b) => b.date === date && b.time === time && b.status !== "rejected"
  );
  if (alreadyTaken) {
    return NextResponse.json(
      { error: "Taj termin je već zauzet ili čeka odobrenje. Izaberi drugi." },
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
    grupa,
    date,
    time,
    duration: SESSION_MINUTES,
    price: priceFor(razina, grupa),
    message,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await redis.set(BOOKINGS_KEY, [...all, booking]);

  try {
    await fetch(process.env.FORMSPREE_BOOKING_ENDPOINT!, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `Novi zahtjev za termin — ${booking.firstName} ${booking.lastName}`,
        Ime: `${booking.firstName} ${booking.lastName}`,
        Telefon: booking.phone,
        Email: booking.email,
        Razred: booking.grade,
        Razina: booking.razina,
        Grupa: booking.grupa,
        Predmet: booking.topic,
        Termin: `${booking.date} u ${booking.time}, ${booking.duration} min`,
        Cijena: `${booking.price} € po osobi`,
        Poruka: booking.message ?? "—",
      }),
    });
  } catch {
    // Ne rušimo zahtjev ako slanje e-maila ne uspije.
  }

  return NextResponse.json({ ok: true, booking });
}