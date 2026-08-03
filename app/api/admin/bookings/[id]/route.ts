import { NextRequest, NextResponse } from "next/server";
import { redis, BOOKINGS_KEY } from "@/lib/redis";
import { ADMIN_COOKIE, expectedToken } from "@/lib/adminAuth";
import type { Booking } from "@/app/api/bookings/route";

async function isAuthed(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  return token === (await expectedToken());
}

// PATCH — admin: odobri ili odbij zahtjev za termin.
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthed(req))) {
    return NextResponse.json({ error: "Neautorizirano." }, { status: 401 });
  }
  const { id } = await params;
  const { status } = await req.json();
  if (!["confirmed", "rejected", "pending"].includes(status)) {
    return NextResponse.json({ error: "Nevažeći status." }, { status: 400 });
  }

  const all = ((await redis.get<Booking[]>(BOOKINGS_KEY)) ?? []) as Booking[];
  const idx = all.findIndex((b) => b.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: "Nije pronađeno." }, { status: 404 });
  }
  all[idx].status = status;
  await redis.set(BOOKINGS_KEY, all);
  return NextResponse.json({ ok: true, booking: all[idx] });
}

// DELETE — admin: ukloni zahtjev/termin trajno.
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthed(req))) {
    return NextResponse.json({ error: "Neautorizirano." }, { status: 401 });
  }
  const { id } = await params;
  const all = ((await redis.get<Booking[]>(BOOKINGS_KEY)) ?? []) as Booking[];
  const next = all.filter((b) => b.id !== id);
  await redis.set(BOOKINGS_KEY, next);
  return NextResponse.json({ ok: true });
}
