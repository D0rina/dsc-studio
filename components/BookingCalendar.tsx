"use client";

import { useEffect, useMemo, useState } from "react";
import {
  slotsForDate,
  toISODate,
  formatWeekday,
  formatDay,
  priceFor,
  Razina,
  Grupa,
  GRUPA_LABEL,
  SESSION_MINUTES,
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

const GRUPE: Grupa[] = ["1", "2", "3+"];

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
  const [razina, setRazina] = useState<Razina | null>(null);
  const [grupa, setGrupa] = useState<Grupa | null>(null);
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected || !razina || !grupa) return;
    setSubmitStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: selected.date, time: selected.time, razina, grupa }),
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

  if (submitStatus === "sent" && selected && razina && grupa) {
    return (
      <div className="rounded-3xl border border-line bg-paper-alt p-8 max-w-lg">
        <p className="text-lg mb-2">Zahtjev je poslan.</p>
        <p className="text-ink-soft text-sm mb-4">
          {formatDay(new Date(selected.date))} u {selected.time}, {SESSION_MINUTES} min ·{" "}
          <span className="mono">{priceFor(razina, grupa)} € po osobi</span>
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
        <Step n={1} active={step === 1} done={step > 1} label="Razina i grupa" />
        <span>—</span>
        <Step n={2} active={step === 2} done={step > 2} label="Termin" />
        <span>—</span>
        <Step n={3} active={step === 3} done={false} label="Podaci" />
      </div>

      {/* Korak 1: razina i veličina grupe */}
      {step === 1 && (
        <div className="rounded-2xl border border-line bg-paper-alt p-6 max-w-sm flex flex-col gap-5">
          <div>
            <p className="text-sm text-ink-soft mb-3">Razina:</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRazina("osnovna")}
                className={`rounded-xl border px-4 py-3 text-sm transition-colors ${razina === "osnovna"
                  ? "border-forest bg-forest text-paper"
                  : "border-line hover:border-forest"
                  }`}
              >
                Osnovna škola
              </button>
              <button
                type="button"
                onClick={() => setRazina("srednja")}
                className={`rounded-xl border px-4 py-3 text-sm transition-colors ${razina === "srednja"
                  ? "border-forest bg-forest text-paper"
                  : "border-line hover:border-forest"
                  }`}
              >
                Srednja škola i dalje
              </button>
            </div>
          </div>

          <div>
            <p className="text-sm text-ink-soft mb-3">Veličina grupe:</p>
            <div className="grid grid-cols-3 gap-3">
              {GRUPE.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGrupa(g)}
                  className={`rounded-xl border px-3 py-3 text-sm transition-colors ${grupa === g
                    ? "border-forest bg-forest text-paper"
                    : "border-line hover:border-forest"
                    }`}
                >
                  {GRUPA_LABEL[g]}
                </button>
              ))}
            </div>
          </div>

          {razina && grupa && (
            <>
              <div className="rounded-xl bg-paper border border-line px-4 py-3 text-center">
                <p className="mono text-lg text-forest">{priceFor(razina, grupa)} € po osobi</p>
                <p className="text-xs text-ink-soft mt-1">za jedan školski sat (45 min)</p>
              </div>
              <button
                onClick={() => setStep(2)}
                className="rounded-full bg-forest text-paper px-6 py-3 text-sm hover:bg-forest-deep transition-colors"
              >
                Dalje — izaberi termin
              </button>
            </>
          )}
        </div>
      )}

      {/* Korak 2: termin */}
      {step === 2 && razina && grupa && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="text-sm text-forest hover:underline"
            >
              ← Promijeni razinu/grupu ({priceFor(razina, grupa)} € po osobi)
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
                    <div className="flex flex-col gap-1.5">
                      {allSlots.length === 0 && (
                        <p className="text-xs text-ink-soft">Ne radi se</p>
                      )}
                      {allSlots.map((time) => {
                        const isBusy = busy.has(time);
                        const isSelected = selected?.date === iso && selected?.time === time;
                        return (
                          <button
                            key={time}
                            disabled={isBusy}
                            onClick={() => {
                              setSelected({ date: iso, time });
                              setStep(3);
                            }}
                            className={`mono text-xs rounded-lg px-2 py-1.5 text-left transition-colors ${isBusy
                              ? "bg-line text-ink-soft/60 cursor-not-allowed line-through"
                              : isSelected
                                ? "bg-forest text-paper"
                                : "bg-paper border border-line hover:border-forest"
                              }`}
                            title={isBusy ? "Zauzeto" : "Slobodno"}
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
              <span className="h-3 w-3 rounded bg-line inline-block" /> Zauzeto
            </span>
          </div>
        </div>
      )}

      {/* Korak 3: podaci */}
      {step === 3 && selected && razina && grupa && (
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
              {SESSION_MINUTES} min · {priceFor(razina, grupa)} € po osobi ({GRUPA_LABEL[grupa]})
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

          <p className="text-xs text-ink-soft mt-3">
            Slanjem obrasca potvrđujete da ste pročitali{" "}
            <Link href="/privatnost" className="text-forest hover:underline">
              Obavijest o privatnosti
            </Link>

          </p>
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