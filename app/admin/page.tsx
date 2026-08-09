"use client";

import { useEffect, useState } from "react";
import type { Booking } from "@/app/api/bookings/route";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadBookings() {
    setLoading(true);
    const res = await fetch("/api/admin/bookings");
    if (res.status === 401) {
      setAuthed(false);
      setLoading(false);
      return;
    }
    const data = await res.json();
    setBookings(data.bookings ?? []);
    setAuthed(true);
    setLoading(false);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const d = await res.json();
      setLoginError(d.error ?? "Pogrešna lozinka.");
      return;
    }
    setPassword("");
    loadBookings();
  }

  async function updateStatus(id: string, status: "confirmed" | "rejected") {
    await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadBookings();
  }

  async function removeBooking(id: string) {
    await fetch(`/api/admin/bookings/${id}`, { method: "DELETE" });
    loadBookings();
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
    setBookings([]);
  }

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-paper px-6">
        <form
          onSubmit={handleLogin}
          className="rounded-3xl border border-line bg-paper-alt p-8 flex flex-col gap-4 w-full max-w-sm"
        >
          <p className="display italic text-xl text-forest mb-2">DSC STUDIO obrt za obrazovanje, proizvodnju i usluge</p>
          <p className="text-sm text-ink-soft mb-2">Prijava za administraciju termina.</p>
          <input
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl border border-line bg-paper px-4 py-3 text-sm focus:border-forest outline-none"
            required
          />
          {loginError && <p className="text-sm text-red-700">{loginError}</p>}
          <button className="rounded-full bg-forest text-paper px-6 py-3 text-sm hover:bg-forest-deep transition-colors">
            Prijavi se
          </button>
        </form>
      </main>
    );
  }

  const pending = bookings.filter((b) => b.status === "pending");
  const confirmed = bookings.filter((b) => b.status === "confirmed");
  const rejected = bookings.filter((b) => b.status === "rejected");

  return (
    <main className="min-h-screen bg-paper px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl">Zahtjevi za termine</h1>
          <button
            onClick={logout}
            className="rounded-full border border-line px-4 py-2 text-sm hover:border-forest"
          >
            Odjava
          </button>
        </div>

        {loading && <p className="text-ink-soft text-sm">Učitavam…</p>}

        <Section title={`Na čekanju (${pending.length})`}>
          {pending.length === 0 && <Empty text="Nema novih zahtjeva." />}
          {pending.map((b) => (
            <BookingRow key={b.id} b={b}>
              <button
                onClick={() => updateStatus(b.id, "confirmed")}
                className="rounded-full bg-forest text-paper px-4 py-1.5 text-xs hover:bg-forest-deep"
              >
                Odobri
              </button>
              <button
                onClick={() => updateStatus(b.id, "rejected")}
                className="rounded-full border border-line px-4 py-1.5 text-xs hover:border-forest"
              >
                Odbij
              </button>
            </BookingRow>
          ))}
        </Section>

        <Section title={`Potvrđeni (${confirmed.length})`}>
          {confirmed.length === 0 && <Empty text="Još nema potvrđenih termina." />}
          {confirmed.map((b) => (
            <BookingRow key={b.id} b={b}>
              <button
                onClick={() => removeBooking(b.id)}
                className="rounded-full border border-line px-4 py-1.5 text-xs hover:border-forest"
              >
                Ukloni
              </button>
            </BookingRow>
          ))}
        </Section>

        <Section title={`Odbijeni (${rejected.length})`}>
          {rejected.length === 0 && <Empty text="Nema odbijenih zahtjeva." />}
          {rejected.map((b) => (
            <BookingRow key={b.id} b={b}>
              <button
                onClick={() => removeBooking(b.id)}
                className="rounded-full border border-line px-4 py-1.5 text-xs hover:border-forest"
              >
                Ukloni
              </button>
            </BookingRow>
          ))}
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="mono text-xs uppercase tracking-wide text-forest mb-3">{title}</h2>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="text-sm text-ink-soft">{text}</p>;
}

function BookingRow({ b, children }: { b: Booking; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-paper-alt p-4 flex flex-wrap items-center justify-between gap-3">
      <div className="text-sm">
        <p>
          <span className="mono">{b.date} · {b.time}</span> — {b.service}
        </p>
        <p className="text-ink-soft">
          {b.name} · {b.contact}
        </p>
        {b.message && <p className="text-ink-soft italic mt-1">"{b.message}"</p>}
      </div>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}
