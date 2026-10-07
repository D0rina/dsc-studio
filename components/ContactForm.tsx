"use client";

import { useState } from "react";
import Link from "next/link";

// Zamijeni ID ispod svojim Formspree endpointom (isti obrazac kao za Ring Ring Kennel).
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvkpkzok";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-line bg-paper-alt p-8 flex items-center">
        <div>
          <p className="text-xl mb-2">Poruka je poslana.</p>
          <p className="text-ink-soft text-sm">
            Hvala! Javljam se u sljedećih 24 sata na naveden e-mail ili
            telefon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-line bg-paper-alt p-8 flex flex-col gap-5"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm">
          Ime i prezime
        </label>
        <input
          id="name"
          name="name"
          required
          className="rounded-xl border border-line bg-paper px-4 py-3 text-sm focus:border-forest outline-none"
          placeholder="Ana Anić"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-xl border border-line bg-paper px-4 py-3 text-sm focus:border-forest outline-none"
          placeholder="ana@primjer.hr"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="topic" className="text-sm">
          Zanima me
        </label>
        <select
          id="topic"
          name="topic"
          className="rounded-xl border border-line bg-paper px-4 py-3 text-sm focus:border-forest outline-none"
          defaultValue="instrukcije"
        >
          <option value="instrukcije">Instrukcije</option>
          <option value="matura">Priprema za maturu</option>
          <option value="web-dizajn">Edukacija web dizajna</option>
          <option value="ostalo">Nešto drugo</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm">
          Poruka
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="rounded-xl border border-line bg-paper px-4 py-3 text-sm focus:border-forest outline-none resize-none"
          placeholder="Razred, predmet i ono što ti trenutno predstavlja najveći problem..."
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-forest text-paper px-6 py-3 text-sm hover:bg-forest-deep transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "Šaljem..." : "Pošalji poruku"}
      </button>
      <p className="text-xs text-ink-soft mt-3">
        Slanjem obrasca potvrđujete da ste pročitali{" "}
        <Link href="/privatnost" className="text-forest hover:underline">
          Obavijest o privatnosti
        </Link>
        .
      </p>
      {status === "error" && (
        <p className="text-sm text-red-700">
          Nešto je pošlo po zlu. Pokušaj ponovno ili piši izravno na e-mail.
        </p>
      )}
    </form>
  );
}
