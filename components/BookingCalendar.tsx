"use client";

import { useEffect, useMemo, useState } from "react";
import { slotsForDate, toISODate, formatWeekday, formatDay } from "@/lib/slots";

type Busy = { date: string; time: string; status: "pending" | "confirmed" };

const SERVICES = [
  "Instrukcije",
  "Priprema za maturu",
  "Edukacija web dizajna",
  "Pomoć u pisanju radova",
];

function getWeekDays(offsetWeeks: number): Date[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(today.getDate() + offsetWeeks * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export function BookingCalendar() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [busy, setBusy] = useState<Busy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<{ date: string; time: string } | null>(null);
  const [form, setForm] = useState({ name: "", contact: "", service: SERVICES[0], message: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const days = useMemo(() => getWeekDays(weekOffset), [weekOffset]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/bookings")
      .then((r) => r.json())
      .then((d) => setBusy(d.busy ?? []))
      .catch(() => setBusy([]))
      .finally(() => setLoading(false));
  }, [submitStatus]);

  function slotStatus(date: string, time: string): "free" | "pending" | "confirmed" {
    const match = busy.find((b) => b.date === date && b.time === time);
    return match ? match.status : "free";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setSubmitStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: selected.date, time: selected.time }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Došlo je do greške.");
        setSubmitStatus("error");
        return;
      }
      setSubmitStatus("sent");
      setSelected(null);
      setForm({ name: "", contact: "", service: SERVICES[0], message: "" });
    } catch {
      setErrorMsg("Došlo je do greške. Pokušaj ponovno.");
      setSubmitStatus("error");
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWeekOffset((w) => Math.max(0, w - 1))}
          disabled={weekOffset === 0}
          className="rounded-full border border-line px-4 py-2 text-sm hover:border-forest disabled:opacity-40 disabled:hover:border-line"
        >
          ← Prošli tjedan
        </button>
        <p className="mono text-xs uppercase tracking-wide text-ink-soft">
          {formatDay(days[0])} – {formatDay(days[6])}
        </p>
        <button
          onClick={() => setWeekOffset((w) => Math.min(4, w + 1))}
          disabled={weekOffset === 4}
          className="rounded-full border border-line px-4 py-2 text-sm hover:border-forest disabled:opacity-40 disabled:hover:border-line"
        >
          Sljedeći tjedan →
        </button>
      </div>

      {loading ? (
        <p className="text-ink-soft text-sm">Učitavam termine…</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-7">
          {days.map((d) => {
            const iso = toISODate(d);
            const slots = slotsForDate(d);
            return (
              <div key={iso} className="rounded-2xl border border-line bg-paper-alt p-3">
                <p className="text-sm capitalize mb-1">{formatWeekday(d)}</p>
                <p className="mono text-xs text-ink-soft mb-3">{formatDay(d)}</p>
                <div className="flex flex-col gap-1.5">
                  {slots.length === 0 && (
                    <p className="text-xs text-ink-soft">Ne radi se</p>
                  )}
                  {slots.map((time) => {
                    const status = slotStatus(iso, time);
                    const isSelected = selected?.date === iso && selected?.time === time;
                    return (
                      <button
                        key={time}
                        disabled={status !== "free"}
                        onClick={() => setSelected({ date: iso, time })}
                        className={`mono text-xs rounded-lg px-2 py-1.5 text-left transition-colors ${
                          status === "confirmed"
                            ? "bg-line text-ink-soft/60 cursor-not-allowed line-through"
                            : status === "pending"
                            ? "bg-gold-soft text-ink-soft/70 cursor-not-allowed"
                            : isSelected
                            ? "bg-forest text-paper"
                            : "bg-paper border border-line hover:border-forest"
                        }`}
                        title={
                          status === "confirmed"
                            ? "Zauzeto"
                            : status === "pending"
                            ? "Čeka odobrenje"
                            : "Slobodno — klikni za zahtjev"
                        }
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex gap-6 text-xs text-ink-soft mono">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-paper border border-line inline-block" /> Slobodno
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-gold-soft inline-block" /> Čeka odobrenje
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-line inline-block" /> Zauzeto
        </span>
      </div>

      {selected && submitStatus !== "sent" && (
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-line bg-paper-alt p-8 flex flex-col gap-5 max-w-lg"
        >
          <p className="text-lg">
            Zahtjev za termin —{" "}
            <span className="mark">
              {formatDay(new Date(selected.date))} u {selected.time}
            </span>
          </p>
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="bname">Ime i prezime</label>
            <input
              id="bname"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-xl border border-line bg-paper px-4 py-3 text-sm focus:border-forest outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="bcontact">E-mail ili telefon</label>
            <input
              id="bcontact"
              required
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              className="rounded-xl border border-line bg-paper px-4 py-3 text-sm focus:border-forest outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="bservice">Usluga</label>
            <select
              id="bservice"
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="rounded-xl border border-line bg-paper px-4 py-3 text-sm focus:border-forest outline-none"
            >
              {SERVICES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="bmessage">Poruka (nije obavezno)</label>
            <textarea
              id="bmessage"
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="rounded-xl border border-line bg-paper px-4 py-3 text-sm focus:border-forest outline-none resize-none"
            />
          </div>
          {submitStatus === "error" && (
            <p className="text-sm text-red-700">{errorMsg}</p>
          )}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitStatus === "sending"}
              className="rounded-full bg-forest text-paper px-6 py-3 text-sm hover:bg-forest-deep transition-colors disabled:opacity-60"
            >
              {submitStatus === "sending" ? "Šaljem…" : "Pošalji zahtjev"}
            </button>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="rounded-full border border-line px-6 py-3 text-sm hover:border-forest"
            >
              Odustani
            </button>
          </div>
        </form>
      )}

      {submitStatus === "sent" && (
        <div className="rounded-3xl border border-line bg-paper-alt p-8 max-w-lg">
          <p className="text-lg mb-2">Zahtjev je poslan.</p>
          <p className="text-ink-soft text-sm">
            Termin je sada označen kao "čeka odobrenje". Javljam se čim ga
            potvrdim, obično unutar 24 sata.
          </p>
        </div>
      )}
    </div>
  );
}
