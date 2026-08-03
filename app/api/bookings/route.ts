import { NextRequest, NextResponse } from "next/server";
import { redis, BOOKINGS_KEY } from "@/lib/redis";

export type Booking = {
  id: string;
  name: string;
  contact: string;
  service: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:00
  message?: string;
  status: "pending" | "confirmed" | "rejected";
  createdAt: string;
};

// GET — javno: vraća SAMO datum/vrijeme/status potvrđenih i na čekanju
// termina (bez imena/kontakta), da kalendar zna što je zauzeto.
export async function GET() {
  const all = ((await redis.get<Booking[]>(BOOKINGS_KEY)) ?? []) as Booking[];
  const busy = all
    .filter((b) => b.status !== "rejected")
    .map((b) => ({ date: b.date, time: b.time, status: b.status }));
  return NextResponse.json({ busy });
}

// POST — javno: netko traži termin. Uvijek ide u "pending" dok ga ne odobriš.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, contact, service, date, time, message } = body ?? {};

  if (!name || !contact || !service || !date || !time) {
    return NextResponse.json({ error: "Nedostaju podaci." }, { status: 400 });
  }

  const all = ((await redis.get<Booking[]>(BOOKINGS_KEY)) ?? []) as Booking[];

  const alreadyTaken = all.some(
    (b) => b.date === date && b.time === time && b.status !== "rejected"
  );
  if (alreadyTaken) {
    return NextResponse.json(
      { error: "Taj termin je već zauzet ili čeka odobrenje." },
      { status: 409 }
    );
  }

  const booking: Booking = {
    id: crypto.randomUUID(),
    name,
    contact,
    service,
    date,
    time,
    message,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await redis.set(BOOKINGS_KEY, [...all, booking]);

  return NextResponse.json({ ok: true, booking });
}
