"use client";

import { useEffect, useMemo, useState } from "react";
import {
  slotsForDate,
  occupiedSlots,
  toISODate,
  formatWeekday,
  formatDay,
  MIN_DURATION,
  MAX_DURATION,
  SLOT_MINUTES,
  priceFor,
} from "@/lib/slots";

type BusyByDate = Record<string, { time: string; status: "pending" | "confirmed" }[]>;

const GRADES = [
  "5. razred OŠ",
  "6. razred OŠ",
  "7. razred OŠ",
  "8. razred OŠ",
  "1. razred SŠ",
  "2. razred SŠ",
  "3. razred SŠ",
  "4. razred SŠ",
  "Student/ica",
  "Odrasla osoba",
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
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [duration, setDuration] = useState<number>(MIN_DURATION);
  const [weekOffset, setWeekOffset] = useState(0);
  const [busyByDate, setBusyByDate] = useState<BusyByDate>({});
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<{ date: string; time: string } | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    grade: GRADES[0],
    topic: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const days = useMemo(() => getWeekDays(weekOffset), [weekOffset]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/bookings")
      .then((r) => r.json())
      .then((d) => setBusyByDate(d.busyByDate ?? {}))
      .catch(() => setBusyByDate({}))
      .finally(() => setLoading(false));
  }, [submitStatus]);

  function busySetFor(iso: string): Set<string> {
    return new Set((busyByDate[iso] ?? []).map((b) => b.time));
  }

  function canStartHere(date: Date, time: string): boolean {
    if (!duration) return false;
    const iso = toISODate(date);
    const available = new Set(slotsForDate(date));
    const busy = busySetFor(iso);
    const needed = occupiedSlots(time, duration);
    return needed.every((t) => available.has(t) && !busy.has(t));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected || !duration) return;
    setSubmitStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: selected.date, time: selected.time, duration }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Došlo je do greške.");
        setSubmitStatus("error");
        return;
      }
      setSubmitStatus("sent");
    } catch {
      setErrorMsg("Došlo je do greške. Pokušaj ponovno.");
      setSubmitStatus("error");
    }
  }

  function resetAll() {
    setStep(1);
    setDuration(MIN_DURATION);
    setSelected(null);
    setSubmitStatus("idle");
    setForm({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      grade: GRADES[0],
      topic: "",
      message: "",
    });
  }

  if (submitStatus === "sent" && selected && duration) {
    return (
      <div className="rounded-3xl border border-line bg-paper-alt p-8 max-w-lg">
        <p className="text-lg mb-2">Zahtjev je poslan.</p>
        <p className="text-ink-soft text-sm mb-4">
          {formatDay(new Date(selected.date))} u {selected.time}, {duration} min ·{" "}
          <span className="mono">{priceFor(duration)} €</span>
          <br />
          Termin je sada označen kao "čeka odobrenje". Javljam se čim ga potvrdim,
          obično unutar 24 sata, na e-mail ili broj koji si ostavila/ostavio.
        </p>
        <button
          onClick={resetAll}
          className="rounded-full border border-line px-5 py-2 text-sm hover:border-forest"
        >
          Zatraži još jedan termin
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Koraci */}
      <div className="flex items-center gap-2 mono text-xs text-ink-soft">
        <Step n={1} active={step === 1} done={step > 1} label="Trajanje" />
        <span>—</span>
        <Step n={2} active={step === 2} done={step > 2} label="Termin" />
        <span>—</span>
        <Step n={3} active={step === 3} done={false} label="Podaci" />
      </div>

      {/* Korak 1: trajanje */}
      {step === 1 && (
        <div className="rounded-2xl border border-line bg-paper-alt p-6 max-w-sm flex flex-col gap-5">
          <p className="text-sm text-ink-soft">
            Trajanje termina, po {SLOT_MINUTES} minuta:
          </p>
          <div className="flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => setDuration((d) => Math.max(MIN_DURATION, d - SLOT_MINUTES))}
              disabled={duration <= MIN_DURATION}
              className="h-11 w-11 rounded-full border border-line text-xl hover:border-forest disabled:opacity-30 disabled:hover:border-line"
              aria-label="Skrati za 15 minuta"
            >
              −
            </button>
            <div className="text-center min-w-[6rem]">
              <p className="text-2xl">{duration} min</p>
              <p className="mono text-sm text-forest">{priceFor(duration)} €</p>
            </div>
            <button
              type="button"
              onClick={() => setDuration((d) => Math.min(MAX_DURATION, d + SLOT_MINUTES))}
              disabled={duration >= MAX_DURATION}
              className="h-11 w-11 rounded-full border border-line text-xl hover:border-forest disabled:opacity-30 disabled:hover:border-line"
              aria-label="Produlji za 15 minuta"
            >
              +
            </button>
          </div>
          <button
            onClick={() => setStep(2)}
            className="rounded-full bg-forest text-paper px-6 py-3 text-sm hover:bg-forest-deep transition-colors"
          >
            Dalje — izaberi termin
          </button>
        </div>
      )}

      {/* Korak 2: termin */}
      {step === 2 && duration && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="text-sm text-forest hover:underline"
            >
              ← Promijeni trajanje ({duration} min · {priceFor(duration)} €)
            </button>
          </div>

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
                const allSlots = slotsForDate(d);
                const busy = busySetFor(iso);
                return (
                  <div key={iso} className="rounded-2xl border border-line bg-paper-alt p-3">
                    <p className="text-sm capitalize mb-1">{formatWeekday(d)}</p>
                    <p className="mono text-xs text-ink-soft mb-3">{formatDay(d)}</p>
                    <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto pr-1">
                      {allSlots.length === 0 && (
                        <p className="text-xs text-ink-soft">Ne radi se</p>
                      )}
                      {allSlots.map((time) => {
                        const fits = canStartHere(d, time);
                        const isBusyStart = busy.has(time);
                        const isSelected = selected?.date === iso && selected?.time === time;
                        return (
                          <button
                            key={time}
                            disabled={!fits}
                            onClick={() => {
                              setSelected({ date: iso, time });
                              setStep(3);
                            }}
                            className={`mono text-xs rounded-lg px-2 py-1.5 text-left transition-colors ${
                              !fits
                                ? isBusyStart
                                  ? "bg-line text-ink-soft/60 cursor-not-allowed line-through"
                                  : "bg-paper text-ink-soft/40 cursor-not-allowed"
                                : isSelected
                                ? "bg-forest text-paper"
                                : "bg-paper border border-line hover:border-forest"
                            }`}
                            title={!fits ? "Nema dovoljno slobodnog prostora za odabrano trajanje" : "Slobodno"}
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
              <span className="h-3 w-3 rounded bg-line inline-block" /> Zauzeto / prekratko za trajanje
            </span>
          </div>
        </div>
      )}

      {/* Korak 3: podaci */}
      {step === 3 && selected && duration && (
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-line bg-paper-alt p-8 flex flex-col gap-5 max-w-lg"
        >
          <div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-sm text-forest hover:underline mb-3"
            >
              ← Promijeni termin
            </button>
            <p className="text-lg">
              Zahtjev za termin —{" "}
              <span className="mark">
                {formatDay(new Date(selected.date))} u {selected.time}
              </span>
            </p>
            <p className="mono text-sm text-forest mt-1">
              {duration} min · {priceFor(duration)} €
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm" htmlFor="firstName">Ime</label>
              <input
                id="firstName"
                required
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="rounded-xl border border-line bg-paper px-4 py-3 text-sm focus:border-forest outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm" htmlFor="lastName">Prezime</label>
              <input
                id="lastName"
                required
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="rounded-xl border border-line bg-paper px-4 py-3 text-sm focus:border-forest outline-none"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm" htmlFor="phone">Broj mobitela</label>
              <input
                id="phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="rounded-xl border border-line bg-paper px-4 py-3 text-sm focus:border-forest outline-none"
                placeholder="091 234 5678"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm" htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-xl border border-line bg-paper px-4 py-3 text-sm focus:border-forest outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="grade">Razred</label>
            <select
              id="grade"
              value={form.grade}
              onChange={(e) => setForm({ ...form, grade: e.target.value })}
              className="rounded-xl border border-line bg-paper px-4 py-3 text-sm focus:border-forest outline-none"
            >
              {GRADES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="topic">Predmet / gradivo</label>
            <input
              id="topic"
              required
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              className="rounded-xl border border-line bg-paper px-4 py-3 text-sm focus:border-forest outline-none"
              placeholder="npr. Informatika — baze podataka"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="message">Poruka (nije obavezno)</label>
            <textarea
              id="message"
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="rounded-xl border border-line bg-paper px-4 py-3 text-sm focus:border-forest outline-none resize-none"
            />
          </div>

          {submitStatus === "error" && (
            <p className="text-sm text-red-700">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={submitStatus === "sending"}
            className="rounded-full bg-forest text-paper px-6 py-3 text-sm hover:bg-forest-deep transition-colors disabled:opacity-60"
          >
            {submitStatus === "sending" ? "Šaljem…" : "Pošalji zahtjev"}
          </button>
        </form>
      )}
    </div>
  );
}

function Step({ n, active, done, label }: { n: number; active: boolean; done: boolean; label: string }) {
  return (
    <span className={active ? "text-forest" : done ? "text-ink-soft" : "text-ink-soft/50"}>
      {n}. {label}
    </span>
  );
}
