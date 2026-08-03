import { NextRequest, NextResponse } from "next/server";
import { redis, BOOKINGS_KEY } from "@/lib/redis";
import { ADMIN_COOKIE, expectedToken } from "@/lib/adminAuth";
import type { Booking } from "@/app/api/bookings/route";

async function isAuthed(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  return token === (await expectedToken());
}

// GET — admin: sve rezervacije, uključujući imena/kontakte, za pregled.
export async function GET(req: NextRequest) {
  if (!(await isAuthed(req))) {
    return NextResponse.json({ error: "Neautorizirano." }, { status: 401 });
  }
  const all = ((await redis.get<Booking[]>(BOOKINGS_KEY)) ?? []) as Booking[];
  all.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  return NextResponse.json({ bookings: all });
}
